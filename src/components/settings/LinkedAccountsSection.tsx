import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

export default LinkedAccountsSection;