import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AuthSectionProps {
  authMethod: string;
  setAuthMethod: (value: string) => void;
  authMethods: string[];
  onAuthMethodToggle: (method: string, checked: boolean) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

const AuthSection = ({
  authMethod,
  setAuthMethod,
  authMethods,
  onAuthMethodToggle,
  loading,
  collapsed,
  onToggle,
  onSave
}: AuthSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Двухэтапная авторизация
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            Авторизация в два этапа: после введения логина и пароля будет запрошен одноразовый код авторизации по SMS, емейл или другим способом
          </p>
          
          <div>
            <Label htmlFor="authMethod">Основной метод</Label>
            <p className="text-sm text-gray-600 mt-1 mb-2">
              Метод получения кода авторизации по умолчанию
            </p>
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
            <p className="text-sm text-gray-600 mt-1 mb-3">
              Доступные способы получения кода для двухэтапной авторизации
            </p>
            
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    checked={authMethods.includes('1')}
                    onCheckedChange={(checked) => onAuthMethodToggle('1', checked)}
                  />
                  <Label>Код по SMS</Label>
                </div>
                {authMethods.includes('1') && (
                  <p className="text-sm text-gray-600 ml-11">
                    Для подключения необходимо подтвердить номер мобильного телефона. SMS с кодами платные.
                  </p>
                )}
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    checked={authMethods.includes('2')}
                    onCheckedChange={(checked) => onAuthMethodToggle('2', checked)}
                  />
                  <Label>Код на емейл</Label>
                </div>
                {authMethods.includes('2') && (
                  <p className="text-sm text-gray-600 ml-11">
                    Коды авторизации будут приходить на емейл администратора
                  </p>
                )}
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    checked={authMethods.includes('3')}
                    onCheckedChange={(checked) => onAuthMethodToggle('3', checked)}
                  />
                  <Label>Код в Telegram</Label>
                </div>
                {authMethods.includes('3') && (
                  <p className="text-sm text-gray-600 ml-11">
                    Коды будут приходить от специального бота в Telegram. Необходимо включить уведомления в Telegram.
                  </p>
                )}
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Switch
                    checked={authMethods.includes('4')}
                    onCheckedChange={(checked) => onAuthMethodToggle('4', checked)}
                  />
                  <Label>Google Authenticator</Label>
                </div>
                {authMethods.includes('4') && (
                  <div className="text-sm text-gray-600 ml-11 space-y-2">
                    <p>Коды авторизации будут отображаться в мобильном приложении Google Authenticator</p>
                    <a 
                      href="https://support.google.com/accounts/answer/1066447?hl=ru" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-block"
                    >
                      Инструкция по установке Google Authenticator →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AuthSection;