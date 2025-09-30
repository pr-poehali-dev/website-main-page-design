import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

interface Administrator {
  id: number;
  login: string;
  full_name: string;
  last_login: string;
}

const Administrators = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [administrators, setAdministrators] = useState<Administrator[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Administrator | null>(null);
  
  const [formLogin, setFormLogin] = useState('');
  const [formFullName, setFormFullName] = useState('');
  const [formPassword, setFormPassword] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    loadAdministrators();
  }, [isAuthenticated, navigate]);

  const loadAdministrators = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API_URL}?type=administrators`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setAdministrators(data.administrators || []);
      } else {
        showMessage('Ошибка загрузки администраторов', 'error');
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
    setEditingAdmin(null);
    setFormLogin('');
    setFormFullName('');
    setFormPassword('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (admin: Administrator) => {
    setEditingAdmin(admin);
    setFormLogin(admin.login);
    setFormFullName(admin.full_name);
    setFormPassword('');
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formLogin.trim()) {
      showMessage('Введите логин', 'error');
      return;
    }

    if (!editingAdmin && !formPassword) {
      showMessage('Введите пароль для нового администратора', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: editingAdmin ? 'edit_administrator' : 'add_administrator',
          id: editingAdmin?.id,
          login: formLogin,
          full_name: formFullName,
          password: formPassword
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        setIsDialogOpen(false);
        loadAdministrators();
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
    if (!confirm('Действительно удалить администратора?')) return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'delete_administrator',
          id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        loadAdministrators();
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка удаления', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h2 className="text-2xl font-semibold">Администраторы сайта</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить администратора
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingAdmin ? 'Редактировать администратора' : 'Добавить администратора'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="login">Логин</Label>
                    <Input
                      id="login"
                      value={formLogin}
                      onChange={(e) => setFormLogin(e.target.value)}
                      placeholder="admin123"
                      disabled={!!editingAdmin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName">ФИО</Label>
                    <Input
                      id="fullName"
                      value={formFullName}
                      onChange={(e) => setFormFullName(e.target.value)}
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">
                      {editingAdmin ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль'}
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
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
              <span>Список администраторов</span>
              <span className="text-sm font-normal text-gray-600">
                Всего администраторов: {administrators.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && administrators.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Загрузка...</div>
            ) : administrators.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Нет администраторов</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="pb-3 px-4 font-semibold text-gray-700">ID</th>
                      <th className="pb-3 px-4 font-semibold text-gray-700">Логин</th>
                      <th className="pb-3 px-4 font-semibold text-gray-700">ФИО</th>
                      <th className="pb-3 px-4 font-semibold text-gray-700">Заходил</th>
                      <th className="pb-3 px-4 font-semibold text-gray-700">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {administrators.map((admin) => (
                      <tr key={admin.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-700">{admin.id}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{admin.login}</td>
                        <td className="py-3 px-4 text-gray-700">{admin.full_name || '-'}</td>
                        <td className="py-3 px-4 text-gray-700">{formatDate(admin.last_login)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditDialog(admin)}
                              className="text-blue-600 hover:underline text-sm"
                            >
                              редактировать
                            </button>
                            <button
                              onClick={() => handleDelete(admin.id)}
                              className="text-red-600 hover:underline text-sm"
                            >
                              удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Administrators;