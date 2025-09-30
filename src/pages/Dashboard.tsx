import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [balance] = useState(42);
  const [ordersCount] = useState(1);
  const [commentsCount] = useState(0);

  const menuItems = [
    { title: 'Общие настройки', icon: 'Settings', description: 'Общие настройки сайта: смена пароля, перенос на отдельный домен', link: '/settings' },
    { title: 'Товары', icon: 'Package', description: 'Управление товарами магазина. Добавление и редактирование', link: '/products' },
    { title: 'Заказы', icon: 'ShoppingCart', description: 'Список заказов и их обработка', link: '/orders' },
    { title: 'Модули сайта', icon: 'Layers', description: 'Подключение отдельных модулей - магазин, новости, статьи, формы', link: '/dashboard/modules' },
    { title: 'Страницы сайта', icon: 'FileText', description: 'Управление страницами сайта. Добавление и редактирование', link: '/dashboard/pages' },
    { title: 'Меню сайта', icon: 'Menu', description: 'Управление меню сайта. Создание меню и пунктов', link: '/dashboard/menu' },
    { title: 'Файлы', icon: 'Folder', description: 'Загрузка файлов для скачивания - прайс-листы, документы', link: '/dashboard/files' },
    { title: 'Резервные копии', icon: 'Database', description: 'Восстановление состояния сайта за предыдущие дни', link: '/dashboard/backups' },
    { title: 'Тех. поддержка', icon: 'HelpCircle', description: 'Задайте вопрос технической поддержке', link: '/dashboard/support' },
    { title: 'Варианты оформления', icon: 'Palette', description: 'Смена оформления сайта на встроенные варианты', link: '/dashboard/design' },
    { title: 'Шаблоны', icon: 'Layout', description: 'Редактирование внешнего вида сайта', link: '/dashboard/templates' },
    { title: 'Изображения', icon: 'Image', description: 'Загрузка изображений для дизайна и страниц', link: '/dashboard/images' },
    { title: 'Пополнить счет', icon: 'CreditCard', description: 'Пополнение баланса магазина', link: '/dashboard/payment' },
  ];

  const quickStats = [
    { label: 'Всего заказов', value: ordersCount, icon: 'ShoppingBag', color: 'text-primary' },
    { label: 'Комментариев', value: commentsCount, icon: 'MessageSquare', color: 'text-primary-light' },
    { label: 'На счету', value: `${balance} ₽`, icon: 'Wallet', color: 'text-primary-dark' },
  ];

  const setupSteps = [
    { step: 1, title: 'Активация магазина', completed: false },
    { step: 2, title: 'Выбор дизайна', completed: false },
    { step: 3, title: 'Контактная информация', completed: false },
    { step: 4, title: 'Наполнение каталога', completed: false },
    { step: 5, title: 'Привлечение покупателей', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-secondary to-primary-light">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-poiret font-bold text-primary">
                AllTrades
              </a>
              <span className="text-neutral-dark/60">|</span>
              <span className="text-neutral-dark font-medium">Панель управления</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-sm">
                  <span className="text-neutral-dark/70">Магазин:</span>{' '}
                  <a href="https://balooirk.ru" target="_blank" className="text-primary hover:text-primary-dark font-medium">
                    balooirk.ru
                  </a>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-dark/70">Баланс:</span>{' '}
                  <span className="text-primary font-bold">{balance} ₽</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="border-primary/20 text-neutral-dark hover:bg-primary-light"
                onClick={() => window.location.href = '/'}
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 border-primary/20 bg-gradient-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-poiret font-bold mb-2 text-slate-800">Добро пожаловать в панель управления!</h1>
                <p className="text-lg text-slate-800">
                  Начните с настройки вашего магазина. Следуйте пошаговой инструкции ниже.
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 border-0"
                onClick={() => window.location.href = '/dashboard/payment'}
              >
                <Icon name="CreditCard" size={20} className="mr-2" />
                Пополнить счет
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Setup Progress */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="font-poiret text-2xl">Начало работы с магазином</CardTitle>
            <CardDescription>Выполните эти шаги для полной настройки вашего интернет-магазина</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {setupSteps.map((item) => (
                <div key={item.step} className="flex items-center space-x-4 p-4 rounded-lg bg-neutral/30 hover:bg-primary-light/20 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    item.completed ? 'bg-primary text-white' : 'bg-white border-2 border-primary text-primary'
                  }`}>
                    {item.completed ? <Icon name="Check" size={20} /> : item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-dark">{item.title}</h3>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-neutral-dark/40" />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2 text-sm text-neutral-dark/70">
                <span>Прогресс настройки</span>
                <span>0 из {setupSteps.length}</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-dark/70 mb-1">{stat.label}</p>
                    <p className="text-3xl font-poiret font-bold text-neutral-dark">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center`}>
                    <Icon name={stat.icon as any} size={28} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Menu Grid */}
        <div>
          <h2 className="text-2xl font-poiret font-bold text-neutral-dark mb-6">Управление магазином</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className="border-primary/20 hover:border-primary hover:shadow-xl transition-all cursor-pointer hover-scale group"
                onClick={() => window.location.href = item.link}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={item.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="font-poiret text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <Card className="mt-8 border-primary/20 bg-white/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={20} className="text-primary" />
                <span className="text-sm text-neutral-dark/70">Защищено SSL</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/dashboard/help" className="text-sm text-primary hover:text-primary-dark transition-colors">
                  Справка
                </a>
                <a href="/dashboard/support" className="text-sm text-primary hover:text-primary-dark transition-colors">
                  Техподдержка
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;