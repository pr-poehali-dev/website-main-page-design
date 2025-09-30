import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

const EmailNotifications = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [notifyNewOrders, setNotifyNewOrders] = useState(true);
  const [notifyStatusChange, setNotifyStatusChange] = useState(false);
  const [notifyNewMessages, setNotifyNewMessages] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyNewReviews, setNotifyNewReviews] = useState(false);
  const [notifyPayments, setNotifyPayments] = useState(true);
  const [recipientEmails, setRecipientEmails] = useState('');
  const [emailSubjectPrefix, setEmailSubjectPrefix] = useState('[Магазин]');

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
      const response = await fetchWithAuth(`${API_URL}?type=email_notifications`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setEmailEnabled(data.email_enabled !== false);
        setNotifyNewOrders(data.notify_new_orders || false);
        setNotifyStatusChange(data.notify_status_change || false);
        setNotifyNewMessages(data.notify_new_messages || false);
        setNotifyLowStock(data.notify_low_stock || false);
        setNotifyNewReviews(data.notify_new_reviews || false);
        setNotifyPayments(data.notify_payments || false);
        setRecipientEmails(data.recipient_emails || '');
        setEmailSubjectPrefix(data.email_subject_prefix || '[Магазин]');
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
          type: 'email_notifications',
          email_enabled: emailEnabled,
          notify_new_orders: notifyNewOrders,
          notify_status_change: notifyStatusChange,
          notify_new_messages: notifyNewMessages,
          notify_low_stock: notifyLowStock,
          notify_new_reviews: notifyNewReviews,
          notify_payments: notifyPayments,
          recipient_emails: recipientEmails,
          email_subject_prefix: emailSubjectPrefix
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
            <CardTitle>Уведомления по е-мейл</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Включить Email уведомления</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Получайте уведомления о важных событиях на почту
                </p>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={setEmailEnabled}
              />
            </div>

            {emailEnabled && (
              <>
                <div>
                  <Label htmlFor="recipientEmails">Адреса получателей</Label>
                  <Textarea
                    id="recipientEmails"
                    value={recipientEmails}
                    onChange={(e) => setRecipientEmails(e.target.value)}
                    placeholder="admin@example.com&#10;manager@example.com"
                    rows={3}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Каждый адрес на новой строке
                  </p>
                </div>

                <div>
                  <Label htmlFor="emailSubjectPrefix">Префикс темы письма</Label>
                  <Input
                    id="emailSubjectPrefix"
                    value={emailSubjectPrefix}
                    onChange={(e) => setEmailSubjectPrefix(e.target.value)}
                    placeholder="[Магазин]"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Будет добавлен в начало темы каждого письма
                  </p>
                </div>

                <div className="border-t pt-4">
                  <Label className="text-base mb-4 block">Отправлять уведомления о:</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyNewOrders">Новых заказах</Label>
                        <p className="text-sm text-gray-600">Мгновенное уведомление о новом заказе</p>
                      </div>
                      <Switch
                        id="notifyNewOrders"
                        checked={notifyNewOrders}
                        onCheckedChange={setNotifyNewOrders}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyStatusChange">Изменении статуса заказа</Label>
                        <p className="text-sm text-gray-600">Когда статус заказа меняется</p>
                      </div>
                      <Switch
                        id="notifyStatusChange"
                        checked={notifyStatusChange}
                        onCheckedChange={setNotifyStatusChange}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyNewMessages">Новых сообщениях от клиентов</Label>
                        <p className="text-sm text-gray-600">Вопросы и обращения клиентов</p>
                      </div>
                      <Switch
                        id="notifyNewMessages"
                        checked={notifyNewMessages}
                        onCheckedChange={setNotifyNewMessages}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyLowStock">Низком остатке товара</Label>
                        <p className="text-sm text-gray-600">Когда товар заканчивается на складе</p>
                      </div>
                      <Switch
                        id="notifyLowStock"
                        checked={notifyLowStock}
                        onCheckedChange={setNotifyLowStock}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyNewReviews">Новых отзывах</Label>
                        <p className="text-sm text-gray-600">Отзывы и оценки товаров</p>
                      </div>
                      <Switch
                        id="notifyNewReviews"
                        checked={notifyNewReviews}
                        onCheckedChange={setNotifyNewReviews}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifyPayments">Успешных платежах</Label>
                        <p className="text-sm text-gray-600">Подтверждение оплаты заказа</p>
                      </div>
                      <Switch
                        id="notifyPayments"
                        checked={notifyPayments}
                        onCheckedChange={setNotifyPayments}
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

export default EmailNotifications;