import { useRef, useEffect } from 'react';
import { PostConfig } from '@/types/post';

interface PostCanvasProps {
  config: PostConfig;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const PostCanvas = ({ config, onCanvasReady }: PostCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMarginPixels = (margin: string, canvasWidth: number, canvasHeight: number) => {
    const baseMargin = Math.min(canvasWidth, canvasHeight);
    switch (margin) {
      case 'narrow': return baseMargin * 0.05;
      case 'medium': return baseMargin * 0.08;
      case 'wide': return baseMargin * 0.12;
      default: return baseMargin * 0.08;
    }
  };

  const getFooterPosition = (position: string, canvasWidth: number, canvasHeight: number, padding: number) => {
    const positions = {
      'bottom-center': { x: canvasWidth / 2, y: canvasHeight - padding, align: 'center' },
      'bottom-left': { x: padding, y: canvasHeight - padding, align: 'left' },
      'bottom-right': { x: canvasWidth - padding, y: canvasHeight - padding, align: 'right' },
      'top-center': { x: canvasWidth / 2, y: padding + 20, align: 'center' },
      'top-left': { x: padding, y: padding + 20, align: 'left' },
      'top-right': { x: canvasWidth - padding, y: padding + 20, align: 'right' },
    };
    return positions[position as keyof typeof positions] || positions['bottom-center'];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const displayWidth = 400;
    const aspectRatio = config.size.height / config.size.width;
    const displayHeight = displayWidth * aspectRatio;
    
    canvas.width = config.size.width;
    canvas.height = config.size.height;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Clear canvas
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate margins
    const margin = getMarginPixels(config.margin, canvas.width, canvas.height);

    // Draw main text
    if (config.mainText.trim()) {
      ctx.fillStyle = config.backgroundColor === '#ffffff' ? '#000000' : '#ffffff';
      ctx.font = `${config.fontSize}px ${config.font}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lines = config.mainText.split('\n');
      const lineHeight = config.fontSize * 1.2;
      const totalTextHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2;

      lines.forEach((line, index) => {
        const y = startY + (index * lineHeight) + (lineHeight / 2);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }

    // Draw footer/watermark
    if (config.footerText.trim()) {
      ctx.fillStyle = config.footerColor;
      ctx.font = `${config.footerSize}px ${config.font}`;
      
      const footerPos = getFooterPosition(
        config.footerPosition,
        canvas.width,
        canvas.height,
        config.footerPadding
      );

      ctx.textAlign = footerPos.align as CanvasTextAlign;
      ctx.textBaseline = config.footerPosition.startsWith('top') ? 'top' : 'bottom';
      ctx.fillText(config.footerText, footerPos.x, footerPos.y);
    }

    // Notify parent component that canvas is ready
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [config, onCanvasReady]);

  return (
    <div className="flex items-center justify-center p-6 bg-canvas-bg border border-canvas-border rounded-lg">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full border border-canvas-border rounded shadow-md"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};