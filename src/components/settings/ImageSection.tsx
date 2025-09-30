import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface ImageSectionProps {
  watermarkPosition: string;
  setWatermarkPosition: (value: string) => void;
  watermarkPreview: string;
  watermarkFile: File | null;
  setWatermarkFile: (file: File | null) => void;
  watermarkMinWidth: string;
  setWatermarkMinWidth: (value: string) => void;
  watermarkMinHeight: string;
  setWatermarkMinHeight: (value: string) => void;
  imageQuality: string;
  setImageQuality: (value: string) => void;
  webpEnabled: boolean;
  setWebpEnabled: (value: boolean) => void;
  loading: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onSave: () => void;
}

const ImageSection = ({
  watermarkPosition,
  setWatermarkPosition,
  watermarkPreview,
  watermarkFile,
  setWatermarkFile,
  watermarkMinWidth,
  setWatermarkMinWidth,
  watermarkMinHeight,
  setWatermarkMinHeight,
  imageQuality,
  setImageQuality,
  webpEnabled,
  setWebpEnabled,
  loading,
  collapsed,
  onToggle,
  onSave
}: ImageSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader 
        className="cursor-pointer flex flex-row items-center justify-between"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center gap-2">
          <Icon name={collapsed ? "ChevronRight" : "ChevronDown"} size={20} />
          Качество изображений и водяной знак
        </CardTitle>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="watermarkPosition">Водяной знак</Label>
            <Select value={watermarkPosition} onValueChange={setWatermarkPosition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Нет</SelectItem>
                <SelectItem value="1">В левом верхнем углу</SelectItem>
                <SelectItem value="2">В правом верхнем углу</SelectItem>
                <SelectItem value="3">В левом нижнем углу</SelectItem>
                <SelectItem value="4">В правом нижнем углу</SelectItem>
                <SelectItem value="9">Слева по центру</SelectItem>
                <SelectItem value="8">Справа по центру</SelectItem>
                <SelectItem value="5">В центре</SelectItem>
                <SelectItem value="6">В центре вверху</SelectItem>
                <SelectItem value="7">В центре внизу</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {watermarkPosition !== '0' && (
            <>
              {watermarkPreview && (
                <div>
                  <Label>Текущий водяной знак</Label>
                  <img src={watermarkPreview} alt="Watermark" className="mt-2 max-w-xs" />
                </div>
              )}
              <div>
                <Label htmlFor="watermarkFile">Файл картинки</Label>
                <Input
                  id="watermarkFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setWatermarkFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="watermarkMinWidth">Мин. ширина (px)</Label>
                  <Input
                    id="watermarkMinWidth"
                    type="number"
                    value={watermarkMinWidth}
                    onChange={(e) => setWatermarkMinWidth(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="watermarkMinHeight">Мин. высота (px)</Label>
                  <Input
                    id="watermarkMinHeight"
                    type="number"
                    value={watermarkMinHeight}
                    onChange={(e) => setWatermarkMinHeight(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="imageQuality">Качество (1-100)</Label>
            <Input
              id="imageQuality"
              type="number"
              min="1"
              max="100"
              value={imageQuality}
              onChange={(e) => setImageQuality(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={webpEnabled}
              onCheckedChange={setWebpEnabled}
            />
            <Label>Формат WebP включен</Label>
          </div>
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ImageSection;