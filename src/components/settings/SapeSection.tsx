import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

export default SapeSection;