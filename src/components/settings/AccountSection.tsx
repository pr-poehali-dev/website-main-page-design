import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AccountSectionProps {
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  phoneVerified: boolean;
  userLogin?: string;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

const AccountSection = ({
  email,
  setEmail,
  phone,
  phoneVerified,
  userLogin,
  loading,
  collapsed,
  onToggle,
  onSave
}: AccountSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Настройки аккаунта
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-4">
          <div>
            <Label>Логин</Label>
            <p className="text-gray-600 mt-1">{userLogin || 'N/A'}</p>
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
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default AccountSection;