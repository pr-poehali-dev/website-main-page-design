import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';

const AUTH_API = 'https://functions.poehali.dev/6de59b39-03c4-416a-8b30-10b3b16b1051';

interface User {
  id: number;
  email: string;
  phone?: string;
  phone_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshingRef = useRef(false);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    if (refreshingRef.current) {
      return false;
    }

    refreshingRef.current = true;

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        refreshingRef.current = false;
        return false;
      }

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
        setAccessToken(null);
        setUser(null);
        refreshingRef.current = false;
        return false;
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAccessToken(data.access_token);
      setUser(data.user);
      refreshingRef.current = false;
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      refreshingRef.current = false;
      return false;
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setAccessToken(token);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken) {
        refreshAccessToken();
      }
    }, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, refreshAccessToken]);

  const login = (newAccessToken: string, refreshToken: string, newUser: User) => {
    localStorage.setItem('access_token', newAccessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setAccessToken(newAccessToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!accessToken && !!user,
    login,
    logout,
    refreshAccessToken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}