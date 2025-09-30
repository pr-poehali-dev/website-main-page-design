import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface SitemapSectionProps {
  sitemapEnabled: boolean;
  setSitemapEnabled: (value: boolean) => void;
  sitemapUrl: string;
  onRefreshSitemap: () => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export const SitemapSection = ({
  sitemapEnabled,
  setSitemapEnabled,
  sitemapUrl,
  onRefreshSitemap,
  loading,
  collapsed,
  onToggle,
  onSave
}: SitemapSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Файл SITEMAP
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={sitemapEnabled}
              onCheckedChange={setSitemapEnabled}
            />
            <Label>Создавать файл sitemap</Label>
          </div>
          {sitemapEnabled && sitemapUrl && (
            <div>
              <Label>Адрес файла SITEMAP</Label>
              <p className="text-gray-700 mt-1">
                {sitemapUrl}{' '}
                <button
                  onClick={onRefreshSitemap}
                  className="text-blue-600 hover:underline"
                  disabled={loading}
                >
                  обновить файл
                </button>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Файл обновляется автоматически один раз в сутки
              </p>
            </div>
          )}
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default SitemapSection;