import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default TelegramSection;