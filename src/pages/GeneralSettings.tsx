import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const GeneralSettings = () => {
  const [email, setEmail] = useState('spirid.iv@yandex.ru');
  const [phone] = useState('+79086668824');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [domain, setDomain] = useState('balooirk.ru');
  const [sitemapEnabled, setSitemapEnabled] = useState(true);
  const [imageQuality, setImageQuality] = useState('90');
  const [watermarkPosition, setWatermarkPosition] = useState('5');
  const [authMethod, setAuthMethod] = useState('0');
  const [timezone, setTimezone] = useState('Europe/Moscow');
  const [itemsPerPage, setItemsPerPage] = useState('100');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);

  const [activeSubmenu, setActiveSubmenu] = useState('conf');

  const submenuItems = [
    { id: 'conf', label: 'Общие настройки' },
    { id: 'administrators', label: 'Администраторы сайта' },
    { id: 'sms', label: 'Уведомления по SMS' },
    { id: 'telegram', label: 'Уведомления в Telegram' },
    { id: 'm_emails', label: 'Уведомления по е-мейл' },
    { id: 'm_emails_senders', label: 'Отправители е-мейл' },
    { id: 'copy', label: 'Копирование данных на другие аккаунты' },
    { id: 'backups', label: 'Резервные копии' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-cream via-primary-light/20 to-accent-light-blue/30">
      <header className="bg-white/90 backdrop-blur-sm border-b border-primary-light/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-accent-blue bg-clip-text text-transparent font-poiret">
                Общие настройки
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Submenu */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary-light/30">
          {submenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubmenu(item.id)}
              className={`px-4 py-2 rounded-md text-sm font-poiret transition-colors ${
                activeSubmenu === item.id
                  ? 'bg-gradient-primary text-white'
                  : 'bg-white text-neutral-dark hover:bg-primary-light/20 border border-primary-light/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {/* Настройки аккаунта */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="User" size={20} className="text-primary-dark" />
                Настройки аккаунта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-poiret">Логин</Label>
                <div className="text-neutral-dark">balooirk138</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-poiret">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-poiret">Телефон моб.</Label>
                <Input
                  type="text"
                  value={phone}
                  disabled
                  className="border-primary-light/50 font-poiret text-neutral-dark/70"
                />
                <span className="text-sm text-green-600">номер подтвержден</span>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Смена пароля */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Lock" size={20} className="text-primary-dark" />
                Смена пароля
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="font-poiret">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-poiret">Пароль еще раз</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="font-poiret">Старый пароль</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Двухэтапная авторизация */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-accent-blue" />
                Двухэтапная авторизация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-poiret">Основной метод</Label>
                <select
                  value={authMethod}
                  onChange={(e) => setAuthMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-light/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark font-poiret"
                >
                  <option value="0">Отключен</option>
                  <option value="1">Код по SMS</option>
                  <option value="2">Код на емейл</option>
                  <option value="3">Код в Telegram</option>
                  <option value="4">Google Authenticator</option>
                </select>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Привязать телеграм-аккаунт */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="MessageCircle" size={20} className="text-accent-blue" />
                Привязать телеграм-аккаунт
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-poiret">Аккаунт в Telegram</Label>
                <div className="text-neutral-dark">
                  Воздушные шары и сувениры Иркутск (balooirk38){' '}
                  <a href="#" className="text-primary-dark hover:text-accent-blue font-poiret">
                    отвязать
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Отдельный домен */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Globe" size={20} className="text-primary-dark" />
                Отдельный домен
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain" className="font-poiret">Отдельный домен</Label>
                <Input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
                <span className="text-sm text-green-600">подключен</span>
              </div>
              <Button 
                disabled 
                className="bg-gray-300 text-gray-500 font-poiret cursor-not-allowed"
              >
                Сохранить
              </Button>
              <p className="text-sm text-neutral-dark/70">
                если необходимо поменять домен или почтовую службу, пожалуйста{' '}
                <a href="#" className="text-primary-dark hover:text-accent-blue font-poiret">
                  обращайтесь в техподдержку
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Файл SITEMAP */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Map" size={20} className="text-primary-dark" />
                Файл SITEMAP (для поисковых систем)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-poiret">Файл sitemap</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={sitemapEnabled}
                    onCheckedChange={setSitemapEnabled}
                  />
                  <span className="text-sm font-poiret">
                    {sitemapEnabled ? 'Создавать файл' : 'Не создавать файл'}
                  </span>
                </div>
              </div>
              {sitemapEnabled && (
                <div className="space-y-2">
                  <Label className="font-poiret">Адрес файла SITEMAP</Label>
                  <div className="text-neutral-dark flex items-center gap-2">
                    <span>https://balooirk.ru/sitemap.xml</span>
                    <a href="#" className="text-primary-dark hover:text-accent-blue font-poiret text-sm">
                      обновить файл
                    </a>
                  </div>
                  <p className="text-sm text-neutral-dark/60">
                    Файл обновляется автоматически один раз в сутки. При необходимости можно обновить файл вручную.
                  </p>
                </div>
              )}
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Качество изображений и водяной знак */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Image" size={20} className="text-primary-dark" />
                Качество изображений и водяной знак
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-poiret">Водяной знак</Label>
                <select
                  value={watermarkPosition}
                  onChange={(e) => setWatermarkPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-light/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark font-poiret"
                >
                  <option value="0">Нет</option>
                  <option value="1">В левом верхнем углу</option>
                  <option value="2">В правом верхнем углу</option>
                  <option value="3">В левом нижнем углу</option>
                  <option value="4">В правом нижнем углу</option>
                  <option value="5">В центре</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quality" className="font-poiret">Качество (1-100)</Label>
                <Input
                  id="quality"
                  type="text"
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Настройки панели управления */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2">
                <Icon name="Settings" size={20} className="text-primary-dark" />
                Настройки панели управления
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemsPerPage" className="font-poiret">Элементов на странице</Label>
                <Input
                  id="itemsPerPage"
                  type="text"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                  className="border-primary-light/50 focus:border-primary-dark font-poiret"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-poiret">Уведомления от браузера</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={notifyOrders}
                      onCheckedChange={setNotifyOrders}
                    />
                    <span className="text-sm font-poiret">о новых заказах</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={notifyMessages}
                      onCheckedChange={setNotifyMessages}
                    />
                    <span className="text-sm font-poiret">о новых сообщениях</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-poiret">Часовой пояс</Label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-light/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-dark font-poiret"
                >
                  <option value="Europe/Moscow">Europe/Moscow</option>
                  <option value="Asia/Irkutsk">Asia/Irkutsk</option>
                  <option value="Europe/Kaliningrad">Europe/Kaliningrad</option>
                  <option value="Europe/Samara">Europe/Samara</option>
                  <option value="Asia/Yekaterinburg">Asia/Yekaterinburg</option>
                </select>
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-white font-poiret">
                Сохранить
              </Button>
            </CardContent>
          </Card>

          {/* Удаление сайта */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="font-poiret flex items-center gap-2 text-red-600">
                <Icon name="Trash2" size={20} />
                Удаление сайта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deletePassword" className="font-poiret">Текущий пароль</Label>
                <Input
                  id="deletePassword"
                  type="password"
                  className="border-red-200 focus:border-red-600 font-poiret"
                />
                <p className="text-sm text-red-600">
                  Внимание! Интернет-магазин удаляется из системы полностью без возможности последующего восстановления данных!
                </p>
              </div>
              <Button 
                variant="destructive"
                className="font-poiret"
                onClick={() => confirm('Действительно удалить сайт? Восстановление сайта будет невозможно!')}
              >
                Удалить сайт
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GeneralSettings;