import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Симуляция успешного входа
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-secondary to-primary-light flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <div className="w-32 h-32 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-poiret font-bold text-white">AT</span>
            </div>
          </a>
        </div>

        <Card className="border-primary/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="font-poiret text-3xl mb-2">Вход в систему</CardTitle>
            <CardDescription className="text-base">
              Войдите в панель управления магазином
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-neutral-dark font-medium">
                  Логин
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваш логин"
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-dark font-medium">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите ваш пароль"
                  className="border-primary/20 focus:border-primary"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-8"
                >
                  Войти
                </Button>
                <a
                  href="#"
                  className="text-sm text-neutral-dark/70 hover:text-primary transition-colors"
                >
                  Забыли пароль?
                </a>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-neutral-dark/60">или</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary-light hover:border-primary"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Войти через Telegram
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-dark/70">
                Нет аккаунта?{' '}
                <a href="/#create-account" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Создать магазин
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-neutral-dark/70 hover:text-primary transition-colors inline-flex items-center"
          >
            <Icon name="ArrowLeft" size={16} className="mr-1" />
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;