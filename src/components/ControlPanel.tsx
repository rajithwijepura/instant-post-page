import { PostConfig, POST_SIZES, ZOOM_LEVELS, MARGIN_OPTIONS, BACKGROUND_COLORS, FOOTER_COLORS, FOOTER_POSITIONS, GRADIENT_DIRECTIONS, GRADIENT_PRESETS } from '@/types/post';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FontSelector } from '@/components/FontSelector';

interface ControlPanelProps {
  config: PostConfig;
  onConfigChange: (config: PostConfig) => void;
  onExport: (format: 'jpg' | 'png') => void;
}

export const ControlPanel = ({ config, onConfigChange, onExport }: ControlPanelProps) => {
  const updateConfig = (updates: Partial<PostConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  return (
    <Card className="p-6 space-y-6 bg-control-bg border-control-border">
      <div className="space-y-4">
        <div>
          <Label htmlFor="post-size" className="text-sm font-medium">Post size</Label>
          <Select
            value={config.size.name}
            onValueChange={(value) => {
              const size = POST_SIZES.find(s => s.name === value);
              if (size) updateConfig({ size });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {POST_SIZES.map((size) => (
                <SelectItem key={size.name} value={size.name}>
                  {size.name} ({size.width}x{size.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zoom" className="text-sm font-medium">Zoom</Label>
            <Select
              value={config.zoom.toString()}
              onValueChange={(value) => updateConfig({ zoom: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ZOOM_LEVELS.map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {level}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="margin" className="text-sm font-medium">Margin</Label>
            <Select
              value={config.margin}
              onValueChange={(value: 'narrow' | 'medium' | 'wide') => updateConfig({ margin: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MARGIN_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Background Type */}
        <div>
          <Label className="text-sm font-medium">Background Type</Label>
          <Select value={config.backgroundType} onValueChange={(value: 'solid' | 'gradient') => updateConfig({ backgroundType: value })}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solid">Solid Color</SelectItem>
              <SelectItem value="gradient">Gradient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Background Color (Solid) */}
        {config.backgroundType === 'solid' && (
          <div>
            <Label className="text-sm font-medium">Background Color</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {BACKGROUND_COLORS.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    config.backgroundColor === color 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => updateConfig({ backgroundColor: color })}
                />
              ))}
            </div>
            <Input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
              className="mt-2 h-10"
            />
          </div>
        )}

        {/* Gradient Options */}
        {config.backgroundType === 'gradient' && (
          <div className="space-y-4">
            {/* Gradient Direction */}
            <div>
              <Label className="text-sm font-medium">Gradient Direction</Label>
              <Select value={config.gradientDirection} onValueChange={(value: string) => updateConfig({ gradientDirection: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GRADIENT_DIRECTIONS.map((direction) => (
                    <SelectItem key={direction.value} value={direction.value}>
                      {direction.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gradient Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Start Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={config.gradientStart}
                    onChange={(e) => updateConfig({ gradientStart: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={config.gradientStart}
                    onChange={(e) => updateConfig({ gradientStart: e.target.value })}
                    placeholder="#667eea"
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">End Color</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="color"
                    value={config.gradientEnd}
                    onChange={(e) => updateConfig({ gradientEnd: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={config.gradientEnd}
                    onChange={(e) => updateConfig({ gradientEnd: e.target.value })}
                    placeholder="#764ba2"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Gradient Presets */}
            <div>
              <Label className="text-sm font-medium">Gradient Presets</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {GRADIENT_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    className="h-10 rounded border border-border cursor-pointer hover:scale-105 transition-transform text-xs font-medium text-white"
                    style={{
                      background: `linear-gradient(to right, ${preset.start}, ${preset.end})`
                    }}
                    onClick={() => updateConfig({ 
                      gradientStart: preset.start, 
                      gradientEnd: preset.end 
                    })}
                    title={preset.name}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="main-text" className="text-sm font-medium">Main text</Label>
          <Textarea
            id="main-text"
            placeholder="Type your text. Use Enter for a new line."
            value={config.mainText}
            onChange={(e) => updateConfig({ mainText: e.target.value })}
            className="mt-2 min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Line breaks are preserved. Text wraps inside the canvas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FontSelector
              value={config.font}
              onChange={(font) => updateConfig({ font })}
            />
          </div>

          <div>
            <Label htmlFor="font-size" className="text-sm font-medium">Font size (px)</Label>
            <Input
              id="font-size"
              type="number"
              min="12"
              max="200"
              value={config.fontSize}
              onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) || 36 })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="text-color" className="text-sm font-medium">Text color</Label>
          <div className="flex items-center gap-3 mt-2">
            <Input
              id="text-color"
              type="color"
              value={config.textColor}
              onChange={(e) => updateConfig({ textColor: e.target.value })}
              className="w-16 h-10 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={config.textColor}
              onChange={(e) => updateConfig({ textColor: e.target.value })}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="footer-text" className="text-sm font-medium">Footer / watermark</Label>
          <Input
            id="footer-text"
            placeholder="instasoar.com"
            value={config.footerText}
            onChange={(e) => updateConfig({ footerText: e.target.value })}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="footer-color" className="text-sm font-medium">Footer color</Label>
            <Select
              value={config.footerColor}
              onValueChange={(value) => updateConfig({ footerColor: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FOOTER_COLORS.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="footer-size" className="text-sm font-medium">Footer size (px)</Label>
            <Input
              id="footer-size"
              type="number"
              min="8"
              max="100"
              value={config.footerSize}
              onChange={(e) => updateConfig({ footerSize: parseInt(e.target.value) || 16 })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="footer-position" className="text-sm font-medium">Footer position</Label>
            <Select
              value={config.footerPosition}
              onValueChange={(value: any) => updateConfig({ footerPosition: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FOOTER_POSITIONS.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="footer-padding" className="text-sm font-medium">Footer padding (px)</Label>
            <Input
              id="footer-padding"
              type="number"
              min="0"
              max="100"
              value={config.footerPadding}
              onChange={(e) => updateConfig({ footerPadding: parseInt(e.target.value) || 20 })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button
          onClick={() => onExport('jpg')}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Export JPG
        </Button>
        <Button
          onClick={() => onExport('png')}
          variant="outline"
          className="flex-1"
        >
          Export PNG
        </Button>
      </div>
    </Card>
  );
};
