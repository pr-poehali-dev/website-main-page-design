import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const [balance] = useState(42);
  const [ordersCount] = useState(1);
  const [commentsCount] = useState(0);
  const [showStepsHelp, setShowStepsHelp] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const toggleMenu = (menuId: number) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const sidebarMenus = [
    {
      id: 1,
      title: 'Главная',
      icon: 'Home',
      items: [
        { title: 'Общие настройки', link: '/settings' },
        { title: 'Страницы сайта', link: '/dashboard/pages' },
        { title: 'Меню сайта', link: '/dashboard/menu' },
        { title: 'Файлы', link: '/dashboard/files' },
      ]
    },
    {
      id: 2,
      title: 'Дизайн сайта',
      icon: 'Paintbrush',
      items: [
        { title: 'Варианты оформления', link: '/dashboard/design' },
        { title: 'Изображения', link: '/dashboard/images' },
        { title: 'Шаблоны сайта', link: '/dashboard/templates' },
        { title: 'Визуальный редактор', link: '/dashboard/visual-editor' },
      ]
    },
    {
      id: 3,
      title: 'Мой магазин',
      icon: 'ShoppingCart',
      items: [
        { title: 'Разделы каталога', link: '/products' },
        { title: 'Товары', link: '/products' },
        { title: 'Заказы', link: '/orders' },
        { title: 'Импорт/Экспорт', link: '/dashboard/import-export' },
        { title: 'Настройки магазина', link: '/settings' },
      ]
    },
    {
      id: 4,
      title: 'Доп. модули',
      icon: 'Package',
      items: [
        { title: 'Лента новостей', link: '/dashboard/news' },
        { title: 'Каталог статей', link: '/dashboard/articles' },
        { title: 'Поиск', link: '/dashboard/search' },
        { title: 'Формы обратной связи', link: '/dashboard/forms' },
        { title: 'Пользователи', link: '/dashboard/users' },
        { title: 'Опросы', link: '/dashboard/polls' },
        { title: 'Фотогалерея', link: '/dashboard/gallery' },
        { title: 'Онлайн-консультант', link: '/dashboard/chat' },
        { title: 'Магазин в Telegram', link: '/dashboard/telegram' },
        { title: 'Мобильное приложение', link: '/dashboard/mobile-app' },
        { title: 'Магазины на поддоменах', link: '/dashboard/subdomains' },
        { title: 'Мультиязычность', link: '/dashboard/multilang' },
      ]
    },
    {
      id: 5,
      title: 'Реклама',
      icon: 'TrendingUp',
      items: [
        { title: 'Соцсети', link: '/dashboard/social' },
        { title: 'Маркетплейсы', link: '/dashboard/marketplaces' },
        { title: 'E-mail рассылки', link: '/dashboard/email' },
        { title: 'Заказать рекламу', link: '/dashboard/advertising' },
      ]
    },
    {
      id: 6,
      title: 'Помощь',
      icon: 'HelpCircle',
      items: [
        { title: 'Техподдержка', link: '/dashboard/support' },
        { title: 'Отдел доработки', link: '/dashboard/customization' },
        { title: 'Справка', link: '/dashboard/help' },
      ]
    },
  ];

  const menuCardsItems = [
    { 
      title: 'Общие настройки', 
      description: 'Общие настройки сайта: смена пароля, перенос на отдельный домен, настройки панели управления и т.д.',
      link: '/settings',
      image: '⚙️'
    },
    { 
      title: 'Модули сайта', 
      description: 'Подключение отдельных модулей для сайта - интернет-магазин, лента новостей, каталог статей, форма обратной связи и т.д.',
      link: '/dashboard/modules',
      image: '🧩'
    },
    { 
      title: 'Страницы сайта', 
      description: 'Управление страницами сайта. Здесь можно добавить новые страницы и отредактировать уже имеющиеся на сайте.',
      link: '/dashboard/pages',
      image: '📄'
    },
    { 
      title: 'Меню сайта', 
      description: 'Управление меню сайта. Создание новых меню, управление пунктами меню, добавление в меню страниц и управление порядком их отображения.',
      link: '/dashboard/menu',
      image: '📋'
    },
    { 
      title: 'Файлы', 
      description: 'В этом разделе на сайт можно загрузить файлы для скачивания - прайс-листы, архивы, документы и любые другие.',
      link: '/dashboard/files',
      image: '📁'
    },
    { 
      title: 'Резервные копии', 
      description: 'В этом разделе можно восстановить состояние сайта за несколько предыдущих дней. Сайт восстанавливается полностью вместе с настройками, страницами, товарами, заказами и т.д.',
      link: '/dashboard/backups',
      image: '💾'
    },
    { 
      title: 'Тех. поддержка', 
      description: 'Здесь вы можете задать вопрос технической поддержке. Для получения скорейшего ответа опишите проблему как можно более полно и точно.',
      link: '/dashboard/support',
      image: '❓'
    },
    { 
      title: 'Варианты оформления', 
      description: 'Здесь можно целиком поменять оформление сайта на один из встроенных вариантов. Товары, заказы, страницы и другая информация при этом не теряются.',
      link: '/dashboard/design',
      image: '🎨'
    },
    { 
      title: 'Шаблоны', 
      description: 'Здесь можно отредактировать внешний вид сайта. Редактировать можно либо при помощи визуального редактора, либо напрямую изменяя HTML-кода шаблона.',
      link: '/dashboard/templates',
      image: '🖼️'
    },
    { 
      title: 'Изображения', 
      description: 'Здесь можно загрузить на сайт изображения. Их можно использовать в качестве элементов дизайна или просто разместить на страницах сайта.',
      link: '/dashboard/images',
      image: '🖼️'
    },
    { 
      title: 'Пополнить счет', 
      description: 'Здесь вы можете пополнить счет.',
      link: '/dashboard/payment',
      image: '💳'
    },
  ];

  const setupSteps = [
    { step: 1, title: 'Активация магазина. Прикрепление отдельного домена', completed: false },
    { step: 2, title: 'Выбор и настройка дизайна', completed: false },
    { step: 3, title: 'Указание контактной и справочной информации', completed: false },
    { step: 4, title: 'Наполнение каталога товаров', completed: false },
    { step: 5, title: 'Привлечение покупателей', completed: false },
    { step: 6, title: 'Обработка заказов', completed: false },
    { step: 7, title: 'Отслеживание и анализ посещаемости', completed: false },
    { step: 8, title: 'Поисковые системы и развитие сайта', completed: false },
    { step: 9, title: 'Мобильное приложение и магазин в Telegram', completed: false },
    { step: 10, title: 'Регистрация ИП и открытие расчетного счета', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full gradient-sidebar text-white transition-all duration-300 z-20 shadow-2xl ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <div className="w-64">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-white/10">
            <img 
              src="https://alltrades.ru/cp/images/logo.png" 
              alt="Logo" 
              className="max-w-[180px] h-auto"
            />
          </div>

          {/* Menu */}
          <nav className="overflow-y-auto h-[calc(100vh-16rem)]">
            {sidebarMenus.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={menu.icon as any} size={18} />
                    <span className="text-sm font-medium">{menu.title}</span>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`transition-transform ${openMenus.includes(menu.id) ? 'rotate-90' : ''}`}
                  />
                </button>
                {openMenus.includes(menu.id) && (
                  <div className="bg-primary-dark/30">
                    {menu.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.link}
                        className="block px-4 py-2.5 pl-12 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Info Block */}
          <div className="absolute bottom-0 w-64 bg-primary-dark/40 border-t border-white/10 p-4 text-sm">
            <p className="font-semibold mb-2 text-gray-300">Информация</p>
            <p className="mb-1">
              <a href="/orders" className="text-gray-400 hover:text-white">
                Всего заказов: <strong className="text-white">{ordersCount}</strong>
              </a>
            </p>
            <p className="mb-1">
              <a href="/dashboard/comments" className="text-gray-400 hover:text-white">
                Комментариев: <strong className="text-white">{commentsCount}</strong>
              </a>
            </p>
            <p className="mb-2 text-gray-400">
              На счету: <strong className="text-white">{balance} руб</strong>
            </p>
            <p className="text-red-400 font-bold text-xs mb-1">
              Тариф: 2100 руб/мес
            </p>
            <p className="text-red-400 text-xs mb-2">Необходимо пополнить счет</p>
            <p className="mb-3">
              <a href="/dashboard/payment" className="text-accent-cream hover:text-primary-light text-xs font-semibold">
                Пополнить счет
              </a>
            </p>
            <p className="text-green-500 flex items-center gap-2 text-xs">
              <Icon name="Lock" size={14} />
              Защищено SSL
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="gradient-header text-white shadow-lg sticky top-0 z-10">
          <div className="px-4">
            <div className="flex items-center justify-between h-12">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-white hover:bg-white/10 h-12 px-3 border-r border-white/20"
                >
                  <Icon name="Menu" size={20} />
                </Button>
                <div className="text-sm text-white/70">
                  {ordersCount > 0 ? (
                    <span>
                      <a href="/orders" className="text-white hover:underline">Новых заказов: {ordersCount}</a>
                    </span>
                  ) : (
                    <span>Новых заказов пока нет</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-white/80">Магазин</span>{' '}
                  <a href="https://balooirk.ru" target="_blank" className="text-white hover:underline">
                    balooirk.ru
                  </a>
                </div>
                <div className="text-sm">
                  <span className="text-white">на счету: </span>
                  <a href="/dashboard/payment" className="text-accent-blue hover:underline">
                    {balance} руб
                  </a>
                  <a 
                    href="/dashboard/payment" 
                    className="ml-2 px-2 py-1 bg-accent-cream text-primary-dark text-xs hover:bg-primary-light rounded shadow-md"
                  >
                    пополнить
                  </a>
                </div>
                <button
                  onClick={() => setShowStepsHelp(!showStepsHelp)}
                  className="text-white/80 hover:text-white text-sm"
                >
                  Инструкция
                </button>
                <a href="/" className="text-white/80 hover:text-white text-sm">
                  Выход
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Steps Progress Bar */}
        {showStepsHelp && (
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-sm font-semibold text-gray-700">
                    Начало работы с магазином:
                  </span>
                  <div className="flex gap-2">
                    {setupSteps.map((step) => (
                      <button
                        key={step.step}
                        onClick={() => setCurrentStep(step.step)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          currentStep === step.step
                            ? 'bg-accent-blue text-white ring-2 ring-accent-blue/30 shadow-lg'
                            : step.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-primary-light hover:text-white'
                        }`}
                      >
                        {step.completed ? '✓' : step.step}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowStepsHelp(false)}
                  className="text-gray-400 hover:text-gray-600 ml-4"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Главная</div>
            <h1 className="text-2xl font-bold text-gray-800">Панель управления интернет-магазином</h1>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuCardsItems.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                onClick={() => window.location.href = item.link}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="w-24 h-24 flex items-center justify-center text-6xl">
                      {item.image}
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;