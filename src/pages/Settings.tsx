import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Общие настройки сайта',
      description: 'Настройки аккаунта, безопасность, домены, изображения',
      icon: 'Settings',
      path: '/general-settings',
      color: 'text-blue-600'
    },
    {
      title: 'Администраторы сайта',
      description: 'Управление пользователями с доступом к панели администрирования',
      icon: 'Users',
      path: '/administrators',
      color: 'text-purple-600'
    },
    {
      title: 'Уведомления по SMS',
      description: 'Настройка SMS уведомлений о заказах, статусах, сообщениях',
      icon: 'MessageSquare',
      path: '/sms-notifications',
      color: 'text-green-600'
    },
    {
      title: 'Уведомления в Telegram',
      description: 'Подключение бота и настройка уведомлений в Telegram',
      icon: 'Send',
      path: '/telegram-notifications',
      color: 'text-cyan-600'
    },
    {
      title: 'Уведомления по е-мейл',
      description: 'Настройка Email уведомлений для администраторов',
      icon: 'Mail',
      path: '/email-notifications',
      color: 'text-orange-600'
    },
    {
      title: 'Отправители е-мейл',
      description: 'Управление SMTP отправителями и настройками почты',
      icon: 'MailOpen',
      path: '/email-senders',
      color: 'text-red-600'
    },
    {
      title: 'Копирование данных',
      description: 'Копирование товаров, заказов и настроек на другие аккаунты',
      icon: 'Copy',
      path: '/data-copy',
      color: 'text-indigo-600'
    },
    {
      title: 'Резервные копии',
      description: 'Создание и управление резервными копиями данных',
      icon: 'Archive',
      path: '/backups',
      color: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/" className="text-blue-600 hover:underline flex items-center gap-2 mb-4">
            <Icon name="ArrowLeft" size={20} />
            Назад к дашборду
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Настройки</h1>
          <p className="text-gray-600">Управление всеми параметрами вашего сайта</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gray-50 ${section.color}`}>
                      <Icon name={section.icon} size={28} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{section.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {section.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Настроить
                    <Icon name="ChevronRight" size={16} className="ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Icon name="Info" size={24} />
              Важная информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Все изменения сохраняются автоматически при нажатии кнопки "Сохранить"</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Для безопасности важных операций требуется подтверждение паролем</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Рекомендуется регулярно создавать резервные копии данных</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;