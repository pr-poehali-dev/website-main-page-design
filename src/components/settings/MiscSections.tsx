import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface TelegramSectionProps {
  telegramAccount: string;
  telegramConnected: boolean;
  onDisconnect: () => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

export const TelegramSection = ({
  telegramAccount,
  telegramConnected,
  onDisconnect,
  loading,
  collapsed,
  onToggle
}: TelegramSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Привязать телеграм-аккаунт
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent>
          <div>
            <Label>Аккаунт в Telegram</Label>
            {telegramConnected ? (
              <div className="mt-2">
                <p className="text-gray-700">
                  {telegramAccount}{' '}
                  <button
                    onClick={onDisconnect}
                    className="text-blue-600 hover:underline"
                    disabled={loading}
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
  );
};

interface MailSectionProps {
  mailSystem: string;
  setMailSystem: (value: string) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const MailSection = ({
  mailSystem,
  setMailSystem,
  loading,
  collapsed,
  onToggle,
  onSave
}: MailSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Почта на домене
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

interface RedirectSectionProps {
  redirectDomains: string;
  setRedirectDomains: (value: string) => void;
  redirectPages: string;
  setRedirectPages: (value: string) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const RedirectSection = ({
  redirectDomains,
  setRedirectDomains,
  redirectPages,
  setRedirectPages,
  loading,
  collapsed,
  onToggle,
  onSave
}: RedirectSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Переадресация (redirect)
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

interface SitemapSectionProps {
  sitemapEnabled: boolean;
  setSitemapEnabled: (value: boolean) => void;
  sitemapUrl: string;
  onRefreshSitemap: () => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const SitemapSection = ({
  sitemapEnabled,
  setSitemapEnabled,
  sitemapUrl,
  onRefreshSitemap,
  loading,
  collapsed,
  onToggle,
  onSave
}: SitemapSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Файл SITEMAP
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
                  onClick={onRefreshSitemap}
                  className="text-blue-600 hover:underline"
                  disabled={loading}
                >
                  обновить файл
                </button>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Файл обновляется автоматически один раз в сутки
              </p>
            </div>
          )}
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

interface PanelSectionProps {
  itemsPerPage: string;
  setItemsPerPage: (value: string) => void;
  notifyOrders: boolean;
  setNotifyOrders: (value: boolean) => void;
  notifyMessages: boolean;
  setNotifyMessages: (value: boolean) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const PanelSection = ({
  itemsPerPage,
  setItemsPerPage,
  notifyOrders,
  setNotifyOrders,
  notifyMessages,
  setNotifyMessages,
  timezone,
  setTimezone,
  loading,
  collapsed,
  onToggle,
  onSave
}: PanelSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Настройки панели управления
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

interface LinkedAccountsSectionProps {
  linkedAccounts: string[];
  newAccountLogin: string;
  setNewAccountLogin: (value: string) => void;
  newAccountPassword: string;
  setNewAccountPassword: (value: string) => void;
  onLinkAccount: () => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

export const LinkedAccountsSection = ({
  linkedAccounts,
  newAccountLogin,
  setNewAccountLogin,
  newAccountPassword,
  setNewAccountPassword,
  onLinkAccount,
  loading,
  collapsed,
  onToggle
}: LinkedAccountsSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Привязать аккаунты
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
            <Button onClick={onLinkAccount} disabled={loading}>
              Привязать
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

interface SapeSectionProps {
  sapeCode: string;
  setSapeCode: (value: string) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const SapeSection = ({
  sapeCode,
  setSapeCode,
  loading,
  collapsed,
  onToggle,
  onSave
}: SapeSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Подключение рекламы SAPE
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

interface DeleteSectionProps {
  deletePassword: string;
  setDeletePassword: (value: string) => void;
  onDelete: () => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
}

export const DeleteSection = ({
  deletePassword,
  setDeletePassword,
  onDelete,
  loading,
  collapsed,
  onToggle
}: DeleteSectionProps) => {
  return (
    <Card className="mb-6 border-red-200">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2 text-red-600">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Удаление сайта
        </CardTitle>
      </CardHeader>
      {!collapsed && (
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
            onClick={onDelete} 
            disabled={loading}
          >
            {loading ? 'Удаление...' : 'Удалить сайт'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};