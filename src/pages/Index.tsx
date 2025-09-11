import { useState, useRef } from 'react';
import { PostCanvas } from '@/components/PostCanvas';
import { ControlPanel } from '@/components/ControlPanel';
import { usePostExport } from '@/hooks/usePostExport';
import { PostConfig, POST_SIZES } from '@/types/post';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { exportCanvas } = usePostExport();

  const [config, setConfig] = useState<PostConfig>({
    size: POST_SIZES[0], // Instagram Square
    zoom: 100,
    margin: 'medium',
    backgroundColor: '#ffffff',
    mainText: 'Type your text. Use Enter for a new line.',
    font: 'Arial',
    fontSize: 36,
    footerText: 'ibenps.com | PPC',
    footerColor: '#6b7280',
    footerSize: 16,
    footerPosition: 'bottom-center',
    footerPadding: 20,
  });

  const handleCanvasReady = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  };

  const handleExport = (format: 'jpg' | 'png') => {
    if (!canvasRef.current) {
      toast({
        title: "Export Error",
        description: "Canvas not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    exportCanvas(canvasRef.current, format, `social-post-${Date.now()}.${format}`);
    toast({
      title: "Export Successful",
      description: `Your post has been exported as ${format.toUpperCase()}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Postly
              </h1>
              <p className="text-sm text-muted-foreground">
                Create stunning social media posts
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="order-2 lg:order-1">
            <ControlPanel
              config={config}
              onConfigChange={setConfig}
              onExport={handleExport}
            />
          </div>

          {/* Preview */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <PostCanvas
                config={config}
                onCanvasReady={handleCanvasReady}
              />
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Tip: You can also take a screenshot of the preview.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
