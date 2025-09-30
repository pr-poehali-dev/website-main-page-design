import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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

export default PanelSection;