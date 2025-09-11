import { useCallback } from 'react';

export const usePostExport = () => {
  const exportCanvas = useCallback((canvas: HTMLCanvasElement, format: 'jpg' | 'png', filename?: string) => {
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.95 : undefined;
    
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `social-post.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      mimeType,
      quality
    );
  }, []);

  return { exportCanvas };
};