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
            <p className="text-sm text-gray-600 mt-1 mb-2">
              Изображение, которое автоматически наносится поверх всех фотографий на сайте для их защиты от копирования. Рекомендуется использовать полупрозрачную картинку в формате PNG.
            </p>
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
                  <img src={watermarkPreview} alt="Watermark" className="mt-2 max-w-xs border rounded" />
                </div>
              )}
              <div>
                <Label htmlFor="watermarkFile">Файл картинки</Label>
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Рекомендуется делать полупрозрачную картинку в формате PNG с прозрачным фоном
                </p>
                <Input
                  id="watermarkFile"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) => setWatermarkFile(e.target.files?.[0] || null)}
                />
                {watermarkFile && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Выбран файл: {watermarkFile.name}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="watermarkMinWidth">Мин. ширина (px)</Label>
                  <Input
                    id="watermarkMinWidth"
                    type="number"
                    value={watermarkMinWidth}
                    onChange={(e) => setWatermarkMinWidth(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="watermarkMinHeight">Мин. высота (px)</Label>
                  <Input
                    id="watermarkMinHeight"
                    type="number"
                    value={watermarkMinHeight}
                    onChange={(e) => setWatermarkMinHeight(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Водяной знак будет наноситься, если фото больше этих размеров и больше картинки со знаком
              </p>
            </>
          )}
          <div>
            <Label htmlFor="imageQuality">Качество (1-100)</Label>
            <p className="text-sm text-gray-600 mt-1 mb-2">
              Чем ниже качество, тем меньше вес картинок. Оптимальное значение = 80-90
            </p>
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
            <div className="flex-1">
              <Label>Формат WebP включен</Label>
              <p className="text-sm text-gray-600 mt-1">
                Современный формат изображений для веб-сайтов с уменьшением размера без потери качества
              </p>
            </div>
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