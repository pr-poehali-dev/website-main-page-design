import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

export default DeleteSection;