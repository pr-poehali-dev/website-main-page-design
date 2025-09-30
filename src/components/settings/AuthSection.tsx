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
                  onCheckedChange={(checked) => onAuthMethodToggle('1', checked)}
                />
                <Label>Код по SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={authMethods.includes('2')}
                  onCheckedChange={(checked) => onAuthMethodToggle('2', checked)}
                />
                <Label>Код на емейл</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={authMethods.includes('3')}
                  onCheckedChange={(checked) => onAuthMethodToggle('3', checked)}
                />
                <Label>Код в Telegram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={authMethods.includes('4')}
                  onCheckedChange={(checked) => onAuthMethodToggle('4', checked)}
                />
                <Label>Google Authenticator</Label>
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