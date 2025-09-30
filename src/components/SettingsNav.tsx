import { Link, useLocation } from 'react-router-dom';

const SettingsNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/general-settings', label: 'Общие настройки' },
    { path: '/administrators', label: 'Администраторы сайта' },
    { path: '/sms-notifications', label: 'Уведомления по SMS' },
    { path: '/telegram-notifications', label: 'Уведомления в Telegram' },
    { path: '/email-notifications', label: 'Уведомления по е-мейл' },
    { path: '/email-senders', label: 'Отправители е-мейл' },
    { path: '/data-copy', label: 'Копирование данных на другие аккаунты' },
    { path: '/backups', label: 'Резервные копии' }
  ];

  return (
    <div className="bg-white border-b mb-6 -mx-6 px-6 py-3 overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsNav;