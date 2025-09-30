import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [balance] = useState(42);
  const [ordersCount] = useState(1);
  const [commentsCount] = useState(0);
  const [showStepsHelp, setShowStepsHelp] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const menuItems = [
    { 
      title: 'Общие настройки', 
      icon: 'Settings', 
      description: 'Общие настройки сайта: смена пароля, перенос на отдельный домен, настройки панели управления и т.д.',
      link: '/settings',
      image: '⚙️'
    },
    { 
      title: 'Модули сайта', 
      icon: 'Layers', 
      description: 'Подключение отдельных модулей для сайта - интернет-магазин, лента новостей, каталог статей, форма обратной связи и т.д.',
      link: '/dashboard/modules',
      image: '🧩'
    },
    { 
      title: 'Страницы сайта', 
      icon: 'FileText', 
      description: 'Управление страницами сайта. Здесь можно добавить новые страницы и отредактировать уже имеющиеся на сайте.',
      link: '/dashboard/pages',
      image: '📄'
    },
    { 
      title: 'Меню сайта', 
      icon: 'Menu', 
      description: 'Управление меню сайта. Создание новых меню, управление пунктами меню, добавление в меню страниц и управление порядком их отображения.',
      link: '/dashboard/menu',
      image: '📋'
    },
    { 
      title: 'Файлы', 
      icon: 'Folder', 
      description: 'В этом разделе на сайт можно загрузить файлы для скачивания - прайс-листы, архивы, документы и любые другие.',
      link: '/dashboard/files',
      image: '📁'
    },
    { 
      title: 'Резервные копии', 
      icon: 'Database', 
      description: 'В этом разделе можно восстановить состояние сайта за несколько предыдущих дней. Сайт восстанавливается полностью вместе с настройками, страницами, товарами, заказами и т.д.',
      link: '/dashboard/backups',
      image: '💾'
    },
    { 
      title: 'Тех. поддержка', 
      icon: 'HelpCircle', 
      description: 'Здесь вы можете задать вопрос технической поддержке. Для получения скорейшего ответа опишите проблему как можно более полно и точно.',
      link: '/dashboard/support',
      image: '❓'
    },
    { 
      title: 'Варианты оформления', 
      icon: 'Palette', 
      description: 'Здесь можно целиком поменять оформление сайта на один из встроенных вариантов. Товары, заказы, страницы и другая информация при этом не теряются.',
      link: '/dashboard/design',
      image: '🎨'
    },
    { 
      title: 'Шаблоны', 
      icon: 'Layout', 
      description: 'Здесь можно отредактировать внешний вид сайта. Редактировать можно либо при помощи визуального редактора, либо напрямую изменяя HTML-кода шаблона.',
      link: '/dashboard/templates',
      image: '🖼️'
    },
    { 
      title: 'Изображения', 
      icon: 'Image', 
      description: 'Здесь можно загрузить на сайт изображения. Их можно использовать в качестве элементов дизайна или просто разместить на страницах сайта.',
      link: '/dashboard/images',
      image: '🖼️'
    },
    { 
      title: 'Пополнить счет', 
      icon: 'CreditCard', 
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2c4161] text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 h-12 px-3"
              >
                <Icon name="Menu" size={20} />
              </Button>
              <div className="text-sm text-[#9bb3cd]">
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
                <span className="text-[#9bb3cd]">Магазин</span>{' '}
                <a href="https://balooirk.ru" target="_blank" className="text-white hover:underline">
                  balooirk.ru
                </a>
              </div>
              <div className="text-sm">
                <span className="text-white">на счету: </span>
                <a href="/dashboard/payment" className="text-[#3ABEE8] hover:underline">
                  {balance} руб
                </a>
                <a 
                  href="/dashboard/payment" 
                  className="ml-2 px-2 py-1 bg-red-600 text-white text-xs hover:bg-red-700 rounded"
                >
                  пополнить
                </a>
              </div>
              <button
                onClick={() => setShowStepsHelp(!showStepsHelp)}
                className="text-[#9bb3cd] hover:text-white text-sm"
              >
                Инструкция
              </button>
              <a href="/" className="text-[#9bb3cd] hover:text-white text-sm">
                Выход
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Steps Progress Bar */}
      {showStepsHelp && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
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
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                          : step.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Панель управления интернет-магазином</h1>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
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

        {/* Sidebar Info */}
        <Card className="mt-8 border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <a href="/orders" className="text-blue-600 hover:underline">
                Всего заказов: <strong>{ordersCount}</strong>
              </a>
            </p>
            <p>
              <a href="/dashboard/comments" className="text-blue-600 hover:underline">
                Комментариев: <strong>{commentsCount}</strong>
              </a>
            </p>
            <p>На счету: <strong>{balance} руб</strong></p>
            <p className="text-red-600 font-bold">
              Тариф: 2100 руб/мес
            </p>
            <p className="text-red-600">Необходимо пополнить счет</p>
            <p>
              <a href="/dashboard/payment" className="text-[#26A69A] hover:underline">
                Пополнить счет
              </a>
            </p>
            <p className="pt-4">
              <span className="text-green-600 flex items-center gap-2">
                <Icon name="Lock" size={16} />
                Защищено SSL
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;