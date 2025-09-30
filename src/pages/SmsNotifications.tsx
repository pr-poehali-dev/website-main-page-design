import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

const SmsNotifications = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [notifyNewOrders, setNotifyNewOrders] = useState(true);
  const [notifyStatusChange, setNotifyStatusChange] = useState(true);
  const [notifyNewMessages, setNotifyNewMessages] = useState(false);
  const [notifyLowStock, setNotifyLowStock] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [balance, setBalance] = useState('0.00');

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
      const response = await fetchWithAuth(`${API_URL}?type=sms_notifications`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setSmsEnabled(data.sms_enabled || false);
        setNotifyNewOrders(data.notify_new_orders || false);
        setNotifyStatusChange(data.notify_status_change || false);
        setNotifyNewMessages(data.notify_new_messages || false);
        setNotifyLowStock(data.notify_low_stock || false);
        setPhoneNumber(data.phone_number || '');
        setBalance(data.balance || '0.00');
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
          type: 'sms_notifications',
          sms_enabled: smsEnabled,
          notify_new_orders: notifyNewOrders,
          notify_status_change: notifyStatusChange,
          notify_new_messages: notifyNewMessages,
          notify_low_stock: notifyLowStock,
          phone_number: phoneNumber
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
            <CardTitle>Уведомления по SMS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 SMS уведомления платные. Стоимость одного SMS: 3 руб. Текущий баланс: <strong>{balance} руб.</strong>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Включить SMS уведомления</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Получайте важные уведомления на мобильный телефон
                </p>
              </div>
              <Switch
                checked={smsEnabled}
                onCheckedChange={setSmsEnabled}
              />
            </div>

            {smsEnabled && (
              <>
                <div>
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+79001234567"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Формат: +7XXXXXXXXXX
                  </p>
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
                  </div>
                </div>
              </>
            )}

            <Button onClick={saveSettings} disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmsNotifications;