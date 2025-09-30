import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

const DataCopy = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [targetLogin, setTargetLogin] = useState('');
  const [targetPassword, setTargetPassword] = useState('');
  const [copyProducts, setCopyProducts] = useState(true);
  const [copyCategories, setCopyCategories] = useState(true);
  const [copyOrders, setCopyOrders] = useState(false);
  const [copyCustomers, setCopyCustomers] = useState(false);
  const [copySettings, setCopySettings] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
  }, [isAuthenticated, navigate]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleCopy = async () => {
    if (!targetLogin.trim() || !targetPassword.trim()) {
      showMessage('Введите логин и пароль целевого аккаунта', 'error');
      return;
    }

    if (!copyProducts && !copyCategories && !copyOrders && !copyCustomers && !copySettings) {
      showMessage('Выберите хотя бы один тип данных для копирования', 'error');
      return;
    }

    if (!confirm('Вы уверены? Данные будут скопированы в целевой аккаунт.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'copy_data',
          target_login: targetLogin,
          target_password: targetPassword,
          copy_products: copyProducts,
          copy_categories: copyCategories,
          copy_orders: copyOrders,
          copy_customers: copyCustomers,
          copy_settings: copySettings
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        setTargetLogin('');
        setTargetPassword('');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка копирования данных', 'error');
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
            <CardTitle>Копирование данных на другие аккаунты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Внимание!</strong> Данные будут скопированы в целевой аккаунт. 
                Существующие данные с совпадающими ID будут перезаписаны.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="targetLogin">Логин целевого аккаунта</Label>
                <Input
                  id="targetLogin"
                  value={targetLogin}
                  onChange={(e) => setTargetLogin(e.target.value)}
                  placeholder="target_account"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Аккаунт, в который будут скопированы данные
                </p>
              </div>

              <div>
                <Label htmlFor="targetPassword">Пароль целевого аккаунта</Label>
                <Input
                  id="targetPassword"
                  type="password"
                  value={targetPassword}
                  onChange={(e) => setTargetPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="border-t pt-4">
                <Label className="text-base mb-4 block">Выберите данные для копирования:</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copyProducts"
                      checked={copyProducts}
                      onCheckedChange={(checked) => setCopyProducts(checked as boolean)}
                    />
                    <Label htmlFor="copyProducts" className="cursor-pointer">
                      Товары (включая изображения и характеристики)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copyCategories"
                      checked={copyCategories}
                      onCheckedChange={(checked) => setCopyCategories(checked as boolean)}
                    />
                    <Label htmlFor="copyCategories" className="cursor-pointer">
                      Категории товаров
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copyOrders"
                      checked={copyOrders}
                      onCheckedChange={(checked) => setCopyOrders(checked as boolean)}
                    />
                    <Label htmlFor="copyOrders" className="cursor-pointer">
                      Заказы
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copyCustomers"
                      checked={copyCustomers}
                      onCheckedChange={(checked) => setCopyCustomers(checked as boolean)}
                    />
                    <Label htmlFor="copyCustomers" className="cursor-pointer">
                      Клиенты
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="copySettings"
                      checked={copySettings}
                      onCheckedChange={(checked) => setCopySettings(checked as boolean)}
                    />
                    <Label htmlFor="copySettings" className="cursor-pointer">
                      Настройки магазина
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Совет:</strong> Перед копированием убедитесь, что у вас есть доступ 
                  к целевому аккаунту и права на изменение данных.
                </p>
              </div>

              <Button onClick={handleCopy} disabled={loading} className="w-full">
                {loading ? 'Копирование...' : 'Скопировать данные'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataCopy;