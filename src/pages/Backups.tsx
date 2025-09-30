import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

interface Backup {
  id: number;
  name: string;
  size: string;
  created_at: string;
  type: string;
}

const Backups = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [backups, setBackups] = useState<Backup[]>([]);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [backupRetention, setBackupRetention] = useState('30');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    loadBackups();
    loadSettings();
  }, [isAuthenticated, navigate]);

  const loadBackups = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API_URL}?type=backups`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setBackups(data.backups || []);
      }
    } catch (error) {
      showMessage('Ошибка загрузки резервных копий', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}?type=backup_settings`, {
        method: 'GET'
      });
      const data = await response.json();
      
      if (data.success) {
        setAutoBackupEnabled(data.auto_backup_enabled !== false);
        setBackupFrequency(data.backup_frequency || 'daily');
        setBackupRetention(data.backup_retention || '30');
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек');
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
          type: 'backup_settings',
          auto_backup_enabled: autoBackupEnabled,
          backup_frequency: backupFrequency,
          backup_retention: backupRetention
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

  const createBackup = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'create_backup'
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        loadBackups();
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка создания резервной копии', 'error');
    } finally {
      setLoading(false);
    }
  };

  const downloadBackup = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${API_URL}?type=download_backup&id=${id}`, {
        method: 'GET'
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${id}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showMessage('Резервная копия загружена', 'success');
      } else {
        showMessage('Ошибка загрузки', 'error');
      }
    } catch (error) {
      showMessage('Ошибка загрузки резервной копии', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteBackup = async (id: number) => {
    if (!confirm('Действительно удалить резервную копию?')) return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          type: 'delete_backup',
          id
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        loadBackups();
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
            <CardTitle>Настройки резервного копирования</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Автоматическое резервное копирование</Label>
                <p className="text-sm text-gray-600 mt-1">
                  Создавать резервные копии автоматически по расписанию
                </p>
              </div>
              <Switch
                checked={autoBackupEnabled}
                onCheckedChange={setAutoBackupEnabled}
              />
            </div>

            {autoBackupEnabled && (
              <>
                <div>
                  <Label htmlFor="backupFrequency">Частота создания копий</Label>
                  <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Каждый час</SelectItem>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="backupRetention">Хранить копии (дней)</Label>
                  <Select value={backupRetention} onValueChange={setBackupRetention}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 дней</SelectItem>
                      <SelectItem value="14">14 дней</SelectItem>
                      <SelectItem value="30">30 дней</SelectItem>
                      <SelectItem value="60">60 дней</SelectItem>
                      <SelectItem value="90">90 дней</SelectItem>
                      <SelectItem value="365">1 год</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">
                    Старые копии будут автоматически удаляться
                  </p>
                </div>
              </>
            )}

            <Button onClick={saveSettings} disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить настройки'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Резервные копии</span>
              <Button onClick={createBackup} disabled={loading}>
                <Icon name="Plus" size={18} className="mr-2" />
                Создать резервную копию
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && backups.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Загрузка...</div>
            ) : backups.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icon name="Database" size={48} className="mx-auto mb-4 text-gray-400" />
                <p>Нет резервных копий</p>
                <p className="text-sm mt-2">Создайте первую резервную копию для защиты ваших данных</p>
              </div>
            ) : (
              <div className="space-y-3">
                {backups.map((backup) => (
                  <div 
                    key={backup.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Icon name="Archive" size={32} className="text-blue-600" />
                      <div>
                        <h4 className="font-semibold">{backup.name}</h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(backup.created_at)} • {backup.size} • {backup.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadBackup(backup.id)}
                      >
                        <Icon name="Download" size={16} className="mr-1" />
                        Скачать
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBackup(backup.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="Trash2" size={16} className="mr-1" />
                        Удалить
                      </Button>
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

export default Backups;