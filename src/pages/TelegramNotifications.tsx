import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

const TelegramNotifications = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [botUsername, setBotUsername] = useState('@YourShopBot');
  const [notifyNewOrders, setNotifyNewOrders] = useState(true);
  const [notifyStatusChange, setNotifyStatusChange] = useState(true);
  const [notifyNewMessages, setNotifyNewMessages] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(false);
  const [notifyNewReviews, setNotifyNewReviews] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    loadSettings();
  }, [isAuthenticated, navigate]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API_URL}?type=telegram_notifications`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setTelegramConnected(data.telegram_connected || false);
        setTelegramUsername(data.telegram_username || '');
        setBotUsername(data.bot_username || '@YourShopBot');
        setNotifyNewOrders(data.notify_new_orders || false);
        setNotifyStatusChange(data.notify_status_change || false);
        setNotifyNewMessages(data.notify_new_messages || false);
        setNotifyLowStock(data.notify_low_stock || false);
        setNotifyNewReviews(data.notify_new_reviews || false);
      }
    } catch (error) {
      showMessage('Ошибка загрузки настроек', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'telegram_notifications',
          notify_new_orders: notifyNewOrders,
          notify_status_change: notifyStatusChange,
          notify_new_messages: notifyNewMessages,
          notify_low_stock: notifyLowStock,
          notify_new_reviews: notifyNewReviews
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка сохранения', 'error');
    } finally {
      setLoading(false);
    }
  };

  const disconnectTelegram = async () => {
    if (!confirm('Действительно отключить уведомления в Telegram?')) return;
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'telegram_disconnect_notifications' })
      });
      const data = await response.json();
      
      if (data.success) {
        setTelegramConnected(false);
        setTelegramUsername('');
        showMessage(data.message, 'success');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка отключения', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Link to="/" className="text-blue-600 hover:underline flex items-center gap-2 mb-4">
            <Icon name="ArrowLeft" size={20} />
            Назад к дашборду
          </Link>
          <h1 className="text-3xl font-bold mb-4">Настройки</h1>
          <SettingsNav />
        </div>

        {message && (
          <div 
            className={`mb-6 p-4 rounded-lg ${
              messageType === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
            onClick={() => setMessage('')}
          >
            {message}
          </div>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Уведомления в Telegram</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!telegramConnected ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <Icon name="Send" size={48} className="mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold mb-2">Подключите Telegram</h3>
                <p className="text-gray-700 mb-4">
                  Для получения уведомлений отправьте команду <code className="bg-white px-2 py-1 rounded">/start</code> боту {botUsername}
                </p>
                <Button asChild>
                  <a href={`https://t.me/${botUsername.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Icon name="ExternalLink" size={18} className="mr-2" />
                    Открыть бота
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">✓ Telegram подключен</p>
                      <p className="text-sm text-green-700 mt-1">Аккаунт: {telegramUsername}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={disconnectTelegram}>
                      Отключить
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-base mb-4 block">Отправлять уведомления о:</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyNewOrders">Новых заказах</Label>
                      <Switch
                        id="notifyNewOrders"
                        checked={notifyNewOrders}
                        onCheckedChange={setNotifyNewOrders}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyStatusChange">Изменении статуса заказа</Label>
                      <Switch
                        id="notifyStatusChange"
                        checked={notifyStatusChange}
                        onCheckedChange={setNotifyStatusChange}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyNewMessages">Новых сообщениях от клиентов</Label>
                      <Switch
                        id="notifyNewMessages"
                        checked={notifyNewMessages}
                        onCheckedChange={setNotifyNewMessages}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyLowStock">Низком остатке товара</Label>
                      <Switch
                        id="notifyLowStock"
                        checked={notifyLowStock}
                        onCheckedChange={setNotifyLowStock}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyNewReviews">Новых отзывах</Label>
                      <Switch
                        id="notifyNewReviews"
                        checked={notifyNewReviews}
                        onCheckedChange={setNotifyNewReviews}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings} disabled={loading}>
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TelegramNotifications;