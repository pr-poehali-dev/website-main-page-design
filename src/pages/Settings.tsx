import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Settings = () => {
  const [storeName, setStoreName] = useState('Мой интернет-магазин');
  const [storeEmail, setStoreEmail] = useState('info@mystore.ru');
  const [storePhone, setStorePhone] = useState('+7 (999) 123-45-67');
  const [currency, setCurrency] = useState('RUB');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-poiret">Настройки</h1>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-poiret shadow-lg">
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-poiret">
                <Icon name="Store" size={24} className="text-purple-600" />
                Основная информация
              </CardTitle>
              <CardDescription>
                Настройте основные параметры вашего магазина
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Название магазина</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Введите название"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    placeholder="info@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Телефон</Label>
                  <Input
                    id="storePhone"
                    type="tel"
                    value={storePhone}
                    onChange={(e) => setStorePhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Валюта</Label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 font-poiret"
                >
                  <option value="RUB">Российский рубль (₽)</option>
                  <option value="USD">Доллар США ($)</option>
                  <option value="EUR">Евро (€)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-poiret">
                <Icon name="Bell" size={24} className="text-pink-600" />
                Уведомления
              </CardTitle>
              <CardDescription>
                Управление уведомлениями о заказах и событиях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email уведомления</Label>
                  <p className="text-sm text-gray-500">Получать уведомления на email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS уведомления</Label>
                  <p className="text-sm text-gray-500">Получать SMS о новых заказах</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-poiret">
                <Icon name="Settings" size={24} className="text-orange-600" />
                Системные настройки
              </CardTitle>
              <CardDescription>
                Дополнительные параметры системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">Автоматическое резервное копирование</Label>
                  <p className="text-sm text-gray-500">Ежедневное создание бэкапов</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
                  <p className="text-sm text-gray-500">Временно закрыть магазин для посетителей</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Icon name="AlertTriangle" size={24} />
                Опасная зона
              </CardTitle>
              <CardDescription>
                Необратимые действия с данными
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Очистить все данные</p>
                  <p className="text-sm text-gray-500">Удалить все товары, заказы и клиентов</p>
                </div>
                <Button variant="destructive">
                  <Icon name="Trash2" size={20} className="mr-2" />
                  Очистить
                </Button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-semibold">Удалить магазин</p>
                  <p className="text-sm text-gray-500">Полное удаление магазина без возможности восстановления</p>
                </div>
                <Button variant="destructive">
                  <Icon name="XCircle" size={20} className="mr-2" />
                  Удалить магазин
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;