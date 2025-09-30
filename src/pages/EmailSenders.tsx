import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

interface EmailSender {
  id: number;
  name: string;
  email: string;
  smtp_host: string;
  smtp_port: number;
  is_default: boolean;
}

const EmailSenders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [senders, setSenders] = useState<EmailSender[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSender, setEditingSender] = useState<EmailSender | null>(null);
  
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSmtpHost, setFormSmtpHost] = useState('');
  const [formSmtpPort, setFormSmtpPort] = useState('587');
  const [formSmtpUser, setFormSmtpUser] = useState('');
  const [formSmtpPassword, setFormSmtpPassword] = useState('');
  const [formEncryption, setFormEncryption] = useState('tls');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    loadSenders();
  }, [isAuthenticated, navigate]);

  const loadSenders = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API_URL}?type=email_senders`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setSenders(data.senders || []);
      } else {
        showMessage('Ошибка загрузки отправителей', 'error');
      }
    } catch (error) {
      showMessage('Ошибка загрузки данных', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const openAddDialog = () => {
    setEditingSender(null);
    setFormName('');
    setFormEmail('');
    setFormSmtpHost('');
    setFormSmtpPort('587');
    setFormSmtpUser('');
    setFormSmtpPassword('');
    setFormEncryption('tls');
    setIsDialogOpen(true);
  };

  const openEditDialog = (sender: EmailSender) => {
    setEditingSender(sender);
    setFormName(sender.name);
    setFormEmail(sender.email);
    setFormSmtpHost(sender.smtp_host);
    setFormSmtpPort(String(sender.smtp_port));
    setFormSmtpUser('');
    setFormSmtpPassword('');
    setFormEncryption('tls');
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formName.trim() || !formEmail.trim()) {
      showMessage('Заполните имя и email', 'error');
      return;
    }

    if (!formSmtpHost.trim()) {
      showMessage('Укажите SMTP сервер', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: editingSender ? 'edit_email_sender' : 'add_email_sender',
          id: editingSender?.id,
          name: formName,
          email: formEmail,
          smtp_host: formSmtpHost,
          smtp_port: parseInt(formSmtpPort),
          smtp_user: formSmtpUser,
          smtp_password: formSmtpPassword,
          encryption: formEncryption
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        setIsDialogOpen(false);
        loadSenders();
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка сохранения', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Действительно удалить отправителя?')) return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'delete_email_sender',
          id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        loadSenders();
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка удаления', 'error');
    } finally {
      setLoading(false);
    }
  };

  const setAsDefault = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'set_default_sender',
          id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        loadSenders();
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка', 'error');
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
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-2xl font-semibold">Отправители е-мейл</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить отправителя
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingSender ? 'Редактировать отправителя' : 'Добавить отправителя'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
                  <div>
                    <Label htmlFor="name">Имя отправителя</Label>
                    <Input
                      id="name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Магазин"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email адрес</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="noreply@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpHost">SMTP сервер</Label>
                    <Input
                      id="smtpHost"
                      value={formSmtpHost}
                      onChange={(e) => setFormSmtpHost(e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpPort">SMTP порт</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={formSmtpPort}
                        onChange={(e) => setFormSmtpPort(e.target.value)}
                        placeholder="587"
                      />
                    </div>
                    <div>
                      <Label htmlFor="encryption">Шифрование</Label>
                      <Select value={formEncryption} onValueChange={setFormEncryption}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Нет</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtpUser">SMTP логин</Label>
                    <Input
                      id="smtpUser"
                      value={formSmtpUser}
                      onChange={(e) => setFormSmtpUser(e.target.value)}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">SMTP пароль</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={formSmtpPassword}
                      onChange={(e) => setFormSmtpPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                      {loading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Список отправителей</span>
              <span className="text-sm font-normal text-gray-600">
                Всего: {senders.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && senders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Загрузка...</div>
            ) : senders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Нет настроенных отправителей
              </div>
            ) : (
              <div className="space-y-4">
                {senders.map((sender) => (
                  <div 
                    key={sender.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{sender.name}</h3>
                          {sender.is_default && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              По умолчанию
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{sender.email}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {sender.smtp_host}:{sender.smtp_port}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!sender.is_default && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAsDefault(sender.id)}
                          >
                            Сделать основным
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(sender)}
                        >
                          Редактировать
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(sender.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailSenders;