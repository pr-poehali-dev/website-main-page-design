import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

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

export default RedirectSection;