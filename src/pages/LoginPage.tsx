import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AUTH_API = 'https://functions.poehali.dev/6de59b39-03c4-416a-8b30-10b3b16b1051';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          email,
          password,
          ...((!isLogin && phone) && { phone }),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Произошла ошибка');
        setLoading(false);
        return;
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/dashboard');
    } catch (err) {
      setError('Ошибка подключения к серверу');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-primary-light/20 to-accent-light-blue/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Icon name="Rocket" size={24} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center font-poiret bg-gradient-to-r from-primary-dark to-accent-blue bg-clip-text text-transparent">
            {isLogin ? 'Вход в систему' : 'Регистрация'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? 'Введите свои данные для входа'
              : 'Создайте новый аккаунт для доступа'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-poiret">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-poiret"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-poiret">Телефон (необязательно)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-poiret"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="font-poiret">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="font-poiret"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-poiret">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="font-poiret"
                />
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-100 border border-red-200 text-red-800 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-poiret disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  {isLogin ? 'Вход...' : 'Регистрация...'}
                </span>
              ) : (
                isLogin ? 'Войти' : 'Зарегистрироваться'
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm text-primary-dark hover:underline font-poiret"
              >
                {isLogin
                  ? 'Нет аккаунта? Зарегистрируйтесь'
                  : 'Уже есть аккаунт? Войдите'}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}