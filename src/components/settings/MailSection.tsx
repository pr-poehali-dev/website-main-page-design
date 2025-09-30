import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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

export default MailSection;