import { useState, useEffect } from 'react';
import { fetchGoogleFonts, loadGoogleFont, GoogleFont, POPULAR_GOOGLE_FONTS } from '@/services/googleFonts';

export const useGoogleFonts = () => {
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const googleFonts = await fetchGoogleFonts();
        // Limit to first 100 popular fonts for performance
        setFonts(googleFonts.slice(0, 100));
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Fallback to popular fonts
        setFonts(POPULAR_GOOGLE_FONTS.map(family => ({
          family,
          variants: ['400', '700'],
          subsets: ['latin'],
          category: 'sans-serif'
        })));
      } finally {
        setLoading(false);
      }
    };

    loadFonts();
  }, []);

  const loadFont = async (fontFamily: string, variants?: string[]) => {
    if (loadedFonts.has(fontFamily)) return;

    try {
      await loadGoogleFont(fontFamily, variants);
      setLoadedFonts(prev => new Set(prev).add(fontFamily));
    } catch (error) {
      console.error(`Failed to load font ${fontFamily}:`, error);
    }
  };

  const isFontLoaded = (fontFamily: string) => {
    return loadedFonts.has(fontFamily);
  };

  return {
    fonts,
    loading,
    loadFont,
    isFontLoaded,
    loadedFonts
  };
};