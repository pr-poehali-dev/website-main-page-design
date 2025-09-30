const AUTH_API = 'https://functions.poehali.dev/6de59b39-03c4-416a-8b30-10b3b16b1051';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(AUTH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'refresh',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
      return null;
    }

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data.access_token;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = localStorage.getItem('access_token');

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(accessToken && { 'X-Auth-Token': accessToken }),
  };

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && !isRefreshing) {
    isRefreshing = true;

    const newToken = await refreshAccessToken();

    if (newToken) {
      isRefreshing = false;
      onTokenRefreshed(newToken);

      const newHeaders = {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-Auth-Token': newToken,
      };

      response = await fetch(url, {
        ...options,
        headers: newHeaders,
      });
    } else {
      isRefreshing = false;
      window.location.href = '/auth';
    }
  } else if (response.status === 401 && isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((token: string) => {
        const newHeaders = {
          ...options.headers,
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        };

        fetch(url, {
          ...options,
          headers: newHeaders,
        }).then(resolve);
      });
    });
  }

  return response;
}