import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';

const API_URL = 'https://functions.poehali.dev/9f11f70c-7220-45b8-849f-375ef1e6c2e4';

const GeneralSettings = () => {
  const { accessToken, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [telegramAccount, setTelegramAccount] = useState('');
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [domainConnected, setDomainConnected] = useState(false);
  const [dnsRecords, setDnsRecords] = useState<Array<{name: string, value: string}>>([]);
  const [redirectDomains, setRedirectDomains] = useState('');
  const [redirectPages, setRedirectPages] = useState('');
  const [mailSystem, setMailSystem] = useState('0');
  const [sitemapEnabled, setSitemapEnabled] = useState(true);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [imageQuality, setImageQuality] = useState('90');
  const [watermarkPosition, setWatermarkPosition] = useState('0');
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [watermarkMinWidth, setWatermarkMinWidth] = useState('0');
  const [watermarkMinHeight, setWatermarkMinHeight] = useState('0');
  const [watermarkPreview, setWatermarkPreview] = useState('');
  const [webpEnabled, setWebpEnabled] = useState(true);
  const [authMethod, setAuthMethod] = useState('0');
  const [authMethods, setAuthMethods] = useState<string[]>([]);
  const [timezone, setTimezone] = useState('Europe/Moscow');
  const [itemsPerPage, setItemsPerPage] = useState('100');
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]);
  const [newAccountLogin, setNewAccountLogin] = useState('');
  const [newAccountPassword, setNewAccountPassword] = useState('');
  const [sapeCode, setSapeCode] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    loadSettings();
  }, [isAuthenticated, navigate]);

  const loadSettings = async () => {
    if (!accessToken) return;
    
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'GET'
      });
      const data = await response.json();
      
      setEmail(data.email || '');
      setPhone(data.phone || '');
      setPhoneVerified(data.phone_verified || false);
      setTelegramAccount(data.telegram_account || '');
      setTelegramConnected(data.telegram_connected || false);
      setDomain(data.domain || '');
      setDomainConnected(data.domain_connected || false);
      setDnsRecords(data.dns_records || []);
      setRedirectDomains(data.redirect_domains || '');
      setRedirectPages(data.redirect_pages || '');
      setMailSystem(String(data.mail_system || '0'));
      setSitemapEnabled(data.sitemap_enabled || false);
      setSitemapUrl(data.sitemap_url || '');
      setImageQuality(String(data.image_quality || 90));
      setWatermarkPosition(String(data.watermark_position || '0'));
      setWatermarkMinWidth(String(data.watermark_min_width || 0));
      setWatermarkMinHeight(String(data.watermark_min_height || 0));
      setWatermarkPreview(data.watermark_preview || '');
      setWebpEnabled(data.webp_enabled !== false);
      setAuthMethod(String(data.auth_method || '0'));
      setAuthMethods(data.auth_methods || []);
      setTimezone(data.timezone || 'Europe/Moscow');
      setItemsPerPage(String(data.items_per_page || 100));
      setNotifyOrders(data.notify_orders || false);
      setNotifyMessages(data.notify_messages || false);
      setLinkedAccounts(data.linked_accounts || []);
      setSapeCode(data.sape_code || '');
    } catch (error) {
      showMessage('Ошибка загрузки настроек', 'error');
    }
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const saveAccountSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'account', email })
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

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      showMessage('Пароли не совпадают', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'change_password', 
          new_password: newPassword, 
          old_password: oldPassword 
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка смены пароля', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveAuthSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'auth', 
          auth_method: authMethod,
          auth_methods: authMethods
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
    if (!confirm('Действительно отвязать аккаунт?')) return;
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'telegram_disconnect' })
      });
      const data = await response.json();
      
      if (data.success) {
        setTelegramConnected(false);
        setTelegramAccount('');
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

  const saveDomainSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'domain', 
          domain,
          dns_records: dnsRecords
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

  const saveRedirectSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'redirects', 
          redirect_domains: redirectDomains,
          redirect_pages: redirectPages
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

  const saveMailSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'mail_system', 
          mail_system: mailSystem
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

  const saveSitemapSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'sitemap', 
          sitemap_enabled: sitemapEnabled 
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        if (data.sitemap_url) {
          setSitemapUrl(data.sitemap_url);
        }
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка сохранения', 'error');
    } finally {
      setLoading(false);
    }
  };

  const refreshSitemap = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'refresh_sitemap' })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('Файл sitemap обновлен', 'success');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка обновления', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveImageSettings = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'image');
      formData.append('watermark_position', watermarkPosition);
      formData.append('image_quality', imageQuality);
      formData.append('watermark_min_width', watermarkMinWidth);
      formData.append('watermark_min_height', watermarkMinHeight);
      formData.append('webp_enabled', String(webpEnabled));
      if (watermarkFile) {
        formData.append('watermark_file', watermarkFile);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'X-Auth-Token': accessToken || ''
        },
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        if (data.watermark_preview) {
          setWatermarkPreview(data.watermark_preview);
        }
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка сохранения', 'error');
    } finally {
      setLoading(false);
    }
  };

  const savePanelSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'panel', 
          items_per_page: itemsPerPage,
          notify_orders: notifyOrders,
          notify_messages: notifyMessages,
          timezone
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

  const linkAccount = async () => {
    if (!newAccountLogin || !newAccountPassword) {
      showMessage('Заполните логин и пароль', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'link_account', 
          login: newAccountLogin,
          password: newAccountPassword
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage(data.message, 'success');
        setLinkedAccounts([...linkedAccounts, newAccountLogin]);
        setNewAccountLogin('');
        setNewAccountPassword('');
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка привязки аккаунта', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveSapeSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'sape', 
          sape_code: sapeCode
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

  const deleteSite = async () => {
    if (!confirm('Действительно удалить сайт? Восстановление сайта будет невозможно!')) return;
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_URL, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'delete_site', 
          password: deletePassword
        })
      });
      const data = await response.json();
      
      if (data.success) {
        showMessage('Сайт удален', 'success');
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      } else {
        showMessage(data.message, 'error');
      }
    } catch (error) {
      showMessage('Ошибка удаления', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addDnsRecord = () => {
    setDnsRecords([...dnsRecords, { name: '', value: '' }]);
  };

  const removeDnsRecord = (index: number) => {
    setDnsRecords(dnsRecords.filter((_, i) => i !== index));
  };

  const updateDnsRecord = (index: number, field: 'name' | 'value', value: string) => {
    const updated = [...dnsRecords];
    updated[index][field] = value;
    setDnsRecords(updated);
  };

  const handleAuthMethodToggle = (method: string, checked: boolean) => {
    if (checked) {
      setAuthMethods([...authMethods, method]);
    } else {
      setAuthMethods(authMethods.filter(m => m !== method));
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
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('account')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.account ? "ChevronRight" : "ChevronDown"} size={20} />
              Настройки аккаунта
            </CardTitle>
          </CardHeader>
          {!collapsedSections.account && (
            <CardContent className="space-y-4">
              <div>
                <Label>Логин</Label>
                <p className="text-gray-600 mt-1">{user?.login || 'N/A'}</p>
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон моб.</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  disabled={phoneVerified}
                  placeholder="+70000000000"
                />
                {phoneVerified && (
                  <p className="text-green-600 text-sm mt-1">✓ номер подтвержден</p>
                )}
              </div>
              <Button onClick={saveAccountSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('password')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.password ? "ChevronRight" : "ChevronDown"} size={20} />
              Смена пароля
            </CardTitle>
          </CardHeader>
          {!collapsedSections.password && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Пароль еще раз</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="oldPassword">Старый пароль</Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <Button onClick={changePassword} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('auth')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.auth ? "ChevronRight" : "ChevronDown"} size={20} />
              Двухэтапная авторизация
            </CardTitle>
          </CardHeader>
          {!collapsedSections.auth && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="authMethod">Основной метод</Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Отключен</SelectItem>
                    <SelectItem value="1">Код по SMS</SelectItem>
                    <SelectItem value="2">Код на емейл</SelectItem>
                    <SelectItem value="3">Код в Telegram</SelectItem>
                    <SelectItem value="4">Google Authenticator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Методы авторизации</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={authMethods.includes('1')}
                      onCheckedChange={(checked) => handleAuthMethodToggle('1', checked)}
                    />
                    <Label>Код по SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={authMethods.includes('2')}
                      onCheckedChange={(checked) => handleAuthMethodToggle('2', checked)}
                    />
                    <Label>Код на емейл</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={authMethods.includes('3')}
                      onCheckedChange={(checked) => handleAuthMethodToggle('3', checked)}
                    />
                    <Label>Код в Telegram</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={authMethods.includes('4')}
                      onCheckedChange={(checked) => handleAuthMethodToggle('4', checked)}
                    />
                    <Label>Google Authenticator</Label>
                  </div>
                </div>
              </div>
              <Button onClick={saveAuthSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('telegram')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.telegram ? "ChevronRight" : "ChevronDown"} size={20} />
              Привязать телеграм-аккаунт
            </CardTitle>
          </CardHeader>
          {!collapsedSections.telegram && (
            <CardContent>
              <div>
                <Label>Аккаунт в Telegram</Label>
                {telegramConnected ? (
                  <div className="mt-2">
                    <p className="text-gray-700">
                      {telegramAccount}{' '}
                      <button
                        onClick={disconnectTelegram}
                        className="text-blue-600 hover:underline"
                      >
                        отвязать
                      </button>
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 mt-2">Аккаунт не привязан</p>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('domain')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.domain ? "ChevronRight" : "ChevronDown"} size={20} />
              Отдельный домен
            </CardTitle>
          </CardHeader>
          {!collapsedSections.domain && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain">Отдельный домен</Label>
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                />
                {domainConnected && (
                  <p className="text-green-600 text-sm mt-1">✓ подключен</p>
                )}
              </div>
              <div>
                <Label>DNS-записи</Label>
                <div className="space-y-2 mt-2">
                  {dnsRecords.map((record, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Название"
                        value={record.name}
                        onChange={(e) => updateDnsRecord(index, 'name', e.target.value)}
                        className="w-32"
                      />
                      <Input
                        placeholder="Значение"
                        value={record.value}
                        onChange={(e) => updateDnsRecord(index, 'value', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDnsRecord(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addDnsRecord}>
                    Добавить запись
                  </Button>
                </div>
              </div>
              <Button onClick={saveDomainSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('mail')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.mail ? "ChevronRight" : "ChevronDown"} size={20} />
              Почта на домене
            </CardTitle>
          </CardHeader>
          {!collapsedSections.mail && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mailSystem">Почтовая служба</Label>
                <Select value={mailSystem} onValueChange={setMailSystem}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Не подключена</SelectItem>
                    <SelectItem value="4">Яндекс 360</SelectItem>
                    <SelectItem value="1">Zoho Mail</SelectItem>
                    <SelectItem value="2">VK WorkMail</SelectItem>
                    <SelectItem value="3">Google Workspace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveMailSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('redirect')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.redirect ? "ChevronRight" : "ChevronDown"} size={20} />
              Переадресация (redirect)
            </CardTitle>
          </CardHeader>
          {!collapsedSections.redirect && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="redirectDomains">Переадресация доменов</Label>
                <Textarea
                  id="redirectDomains"
                  value={redirectDomains}
                  onChange={(e) => setRedirectDomains(e.target.value)}
                  placeholder="domain1 domain2&#10;domain3 domain4"
                  rows={4}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Формат: domain1 domain2 (каждая пара на новой строке)
                </p>
              </div>
              <div>
                <Label htmlFor="redirectPages">Переадресация страниц</Label>
                <Textarea
                  id="redirectPages"
                  value={redirectPages}
                  onChange={(e) => setRedirectPages(e.target.value)}
                  placeholder="URL1 URL2&#10;URL3 URL4"
                  rows={4}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Формат: URL1 URL2 (каждая пара на новой строке)
                </p>
              </div>
              <Button onClick={saveRedirectSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('sitemap')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.sitemap ? "ChevronRight" : "ChevronDown"} size={20} />
              Файл SITEMAP
            </CardTitle>
          </CardHeader>
          {!collapsedSections.sitemap && (
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={sitemapEnabled}
                  onCheckedChange={setSitemapEnabled}
                />
                <Label>Создавать файл sitemap</Label>
              </div>
              {sitemapEnabled && sitemapUrl && (
                <div>
                  <Label>Адрес файла SITEMAP</Label>
                  <p className="text-gray-700 mt-1">
                    {sitemapUrl}{' '}
                    <button
                      onClick={refreshSitemap}
                      className="text-blue-600 hover:underline"
                    >
                      обновить файл
                    </button>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Файл обновляется автоматически один раз в сутки
                  </p>
                </div>
              )}
              <Button onClick={saveSitemapSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('image')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.image ? "ChevronRight" : "ChevronDown"} size={20} />
              Качество изображений и водяной знак
            </CardTitle>
          </CardHeader>
          {!collapsedSections.image && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="watermarkPosition">Водяной знак</Label>
                <Select value={watermarkPosition} onValueChange={setWatermarkPosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Нет</SelectItem>
                    <SelectItem value="1">В левом верхнем углу</SelectItem>
                    <SelectItem value="2">В правом верхнем углу</SelectItem>
                    <SelectItem value="3">В левом нижнем углу</SelectItem>
                    <SelectItem value="4">В правом нижнем углу</SelectItem>
                    <SelectItem value="9">Слева по центру</SelectItem>
                    <SelectItem value="8">Справа по центру</SelectItem>
                    <SelectItem value="5">В центре</SelectItem>
                    <SelectItem value="6">В центре вверху</SelectItem>
                    <SelectItem value="7">В центре внизу</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {watermarkPosition !== '0' && (
                <>
                  {watermarkPreview && (
                    <div>
                      <Label>Текущий водяной знак</Label>
                      <img src={watermarkPreview} alt="Watermark" className="mt-2 max-w-xs" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="watermarkFile">Файл картинки</Label>
                    <Input
                      id="watermarkFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setWatermarkFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label htmlFor="watermarkMinWidth">Мин. ширина (px)</Label>
                      <Input
                        id="watermarkMinWidth"
                        type="number"
                        value={watermarkMinWidth}
                        onChange={(e) => setWatermarkMinWidth(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="watermarkMinHeight">Мин. высота (px)</Label>
                      <Input
                        id="watermarkMinHeight"
                        type="number"
                        value={watermarkMinHeight}
                        onChange={(e) => setWatermarkMinHeight(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="imageQuality">Качество (1-100)</Label>
                <Input
                  id="imageQuality"
                  type="number"
                  min="1"
                  max="100"
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={webpEnabled}
                  onCheckedChange={setWebpEnabled}
                />
                <Label>Формат WebP включен</Label>
              </div>
              <Button onClick={saveImageSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('panel')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.panel ? "ChevronRight" : "ChevronDown"} size={20} />
              Настройки панели управления
            </CardTitle>
          </CardHeader>
          {!collapsedSections.panel && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemsPerPage">Элементов на странице</Label>
                <Input
                  id="itemsPerPage"
                  type="number"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                />
              </div>
              <div>
                <Label>Уведомления от браузера</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={notifyOrders}
                      onCheckedChange={setNotifyOrders}
                    />
                    <Label>о новых заказах</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={notifyMessages}
                      onCheckedChange={setNotifyMessages}
                    />
                    <Label>о новых сообщениях</Label>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Moscow">Europe/Moscow</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={savePanelSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('linked')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.linked ? "ChevronRight" : "ChevronDown"} size={20} />
              Привязать аккаунты
            </CardTitle>
          </CardHeader>
          {!collapsedSections.linked && (
            <CardContent className="space-y-4">
              <div>
                <Label>Привязанные аккаунты</Label>
                {linkedAccounts.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {linkedAccounts.map((account, index) => (
                      <li key={index} className="text-gray-700">{account}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 mt-2">Нет привязанных аккаунтов</p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Логин"
                  value={newAccountLogin}
                  onChange={(e) => setNewAccountLogin(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Пароль"
                  value={newAccountPassword}
                  onChange={(e) => setNewAccountPassword(e.target.value)}
                />
                <Button onClick={linkAccount} disabled={loading}>
                  Привязать
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('sape')}
          >
            <CardTitle className="flex items-center gap-2">
              <Icon name={collapsedSections.sape ? "ChevronRight" : "ChevronDown"} size={20} />
              Подключение рекламы SAPE
            </CardTitle>
          </CardHeader>
          {!collapsedSections.sape && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sapeCode">Код SAPE</Label>
                <Input
                  id="sapeCode"
                  value={sapeCode}
                  onChange={(e) => setSapeCode(e.target.value)}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Для отображения ссылок добавьте метки &lt;!--sape_links(n)--&gt; в шаблон
                </p>
              </div>
              <Button onClick={saveSapeSettings} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </CardContent>
          )}
        </Card>

        <Card className="mb-6 border-red-200">
          <CardHeader 
            className="cursor-pointer flex flex-row items-center justify-between"
            onClick={() => toggleSection('delete')}
          >
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Icon name={collapsedSections.delete ? "ChevronRight" : "ChevronDown"} size={20} />
              Удаление сайта
            </CardTitle>
          </CardHeader>
          {!collapsedSections.delete && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deletePassword">Текущий пароль</Label>
                <Input
                  id="deletePassword"
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
                <p className="text-sm text-red-600 mt-1">
                  ⚠️ Внимание! Сайт удаляется полностью без возможности восстановления!
                </p>
              </div>
              <Button 
                variant="destructive" 
                onClick={deleteSite} 
                disabled={loading}
              >
                {loading ? 'Удаление...' : 'Удалить сайт'}
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default GeneralSettings;