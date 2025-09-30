import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/utils/api';
import SettingsNav from '@/components/SettingsNav';
import AccountSection from '@/components/settings/AccountSection';
import PasswordSection from '@/components/settings/PasswordSection';
import AuthSection from '@/components/settings/AuthSection';
import DomainSection from '@/components/settings/DomainSection';
import ImageSection from '@/components/settings/ImageSection';
import {
  TelegramSection,
  MailSection,
  RedirectSection,
  SitemapSection,
  PanelSection,
  LinkedAccountsSection,
  SapeSection,
  DeleteSection
} from '@/components/settings/MiscSections';

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

        <AccountSection
          email={email}
          setEmail={setEmail}
          phone={phone}
          phoneVerified={phoneVerified}
          userLogin={user?.login}
          loading={loading}
          collapsed={collapsedSections.account}
          onToggle={() => toggleSection('account')}
          onSave={saveAccountSettings}
        />

        <PasswordSection
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          loading={loading}
          collapsed={collapsedSections.password}
          onToggle={() => toggleSection('password')}
          onSave={changePassword}
        />

        <AuthSection
          authMethod={authMethod}
          setAuthMethod={setAuthMethod}
          authMethods={authMethods}
          onAuthMethodToggle={handleAuthMethodToggle}
          loading={loading}
          collapsed={collapsedSections.auth}
          onToggle={() => toggleSection('auth')}
          onSave={saveAuthSettings}
        />

        <TelegramSection
          telegramAccount={telegramAccount}
          telegramConnected={telegramConnected}
          onDisconnect={disconnectTelegram}
          loading={loading}
          collapsed={collapsedSections.telegram}
          onToggle={() => toggleSection('telegram')}
        />

        <DomainSection
          domain={domain}
          setDomain={setDomain}
          domainConnected={domainConnected}
          dnsRecords={dnsRecords}
          onAddDnsRecord={addDnsRecord}
          onRemoveDnsRecord={removeDnsRecord}
          onUpdateDnsRecord={updateDnsRecord}
          loading={loading}
          collapsed={collapsedSections.domain}
          onToggle={() => toggleSection('domain')}
          onSave={saveDomainSettings}
        />

        <MailSection
          mailSystem={mailSystem}
          setMailSystem={setMailSystem}
          loading={loading}
          collapsed={collapsedSections.mail}
          onToggle={() => toggleSection('mail')}
          onSave={saveMailSettings}
        />

        <RedirectSection
          redirectDomains={redirectDomains}
          setRedirectDomains={setRedirectDomains}
          redirectPages={redirectPages}
          setRedirectPages={setRedirectPages}
          loading={loading}
          collapsed={collapsedSections.redirect}
          onToggle={() => toggleSection('redirect')}
          onSave={saveRedirectSettings}
        />

        <SitemapSection
          sitemapEnabled={sitemapEnabled}
          setSitemapEnabled={setSitemapEnabled}
          sitemapUrl={sitemapUrl}
          onRefreshSitemap={refreshSitemap}
          loading={loading}
          collapsed={collapsedSections.sitemap}
          onToggle={() => toggleSection('sitemap')}
          onSave={saveSitemapSettings}
        />

        <ImageSection
          watermarkPosition={watermarkPosition}
          setWatermarkPosition={setWatermarkPosition}
          watermarkPreview={watermarkPreview}
          watermarkFile={watermarkFile}
          setWatermarkFile={setWatermarkFile}
          watermarkMinWidth={watermarkMinWidth}
          setWatermarkMinWidth={setWatermarkMinWidth}
          watermarkMinHeight={watermarkMinHeight}
          setWatermarkMinHeight={setWatermarkMinHeight}
          imageQuality={imageQuality}
          setImageQuality={setImageQuality}
          webpEnabled={webpEnabled}
          setWebpEnabled={setWebpEnabled}
          loading={loading}
          collapsed={collapsedSections.image}
          onToggle={() => toggleSection('image')}
          onSave={saveImageSettings}
        />

        <PanelSection
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          notifyOrders={notifyOrders}
          setNotifyOrders={setNotifyOrders}
          notifyMessages={notifyMessages}
          setNotifyMessages={setNotifyMessages}
          timezone={timezone}
          setTimezone={setTimezone}
          loading={loading}
          collapsed={collapsedSections.panel}
          onToggle={() => toggleSection('panel')}
          onSave={savePanelSettings}
        />

        <LinkedAccountsSection
          linkedAccounts={linkedAccounts}
          newAccountLogin={newAccountLogin}
          setNewAccountLogin={setNewAccountLogin}
          newAccountPassword={newAccountPassword}
          setNewAccountPassword={setNewAccountPassword}
          onLinkAccount={linkAccount}
          loading={loading}
          collapsed={collapsedSections.linked}
          onToggle={() => toggleSection('linked')}
        />

        <SapeSection
          sapeCode={sapeCode}
          setSapeCode={setSapeCode}
          loading={loading}
          collapsed={collapsedSections.sape}
          onToggle={() => toggleSection('sape')}
          onSave={saveSapeSettings}
        />

        <DeleteSection
          deletePassword={deletePassword}
          setDeletePassword={setDeletePassword}
          onDelete={deleteSite}
          loading={loading}
          collapsed={collapsedSections.delete}
          onToggle={() => toggleSection('delete')}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;