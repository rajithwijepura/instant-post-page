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

  const getGradientCoordinates = (direction: string, width: number, height: number): [number, number, number, number] => {
    const coords: Record<string, [number, number, number, number]> = {
      'to-r': [0, 0, width, 0],
      'to-l': [width, 0, 0, 0],
      'to-b': [0, 0, 0, height],
      'to-t': [0, height, 0, 0],
      'to-br': [0, 0, width, height],
      'to-bl': [width, 0, 0, height],
      'to-tr': [0, height, width, 0],
      'to-tl': [width, height, 0, 0],
    };
    return coords[direction] || coords['to-r'];
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

    // Set canvas size with zoom - responsive to screen size
    const baseDisplayWidth = window.innerWidth >= 1024 ? Math.min(800, window.innerWidth * 0.5) : 400;
    const displayWidth = (baseDisplayWidth * config.zoom) / 100;
    const aspectRatio = config.size.height / config.size.width;
    const displayHeight = displayWidth * aspectRatio;
    
    canvas.width = config.size.width;
    canvas.height = config.size.height;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Clear canvas and apply background
    if (config.backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(
        ...getGradientCoordinates(config.gradientDirection, canvas.width, canvas.height)
      );
      gradient.addColorStop(0, config.gradientStart);
      gradient.addColorStop(1, config.gradientEnd);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = config.backgroundColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate margins
    const margin = getMarginPixels(config.margin, canvas.width, canvas.height);

    // Draw main text
    if (config.mainText.trim()) {
      ctx.fillStyle = config.textColor;
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
