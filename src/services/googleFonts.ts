export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
}

export interface GoogleFontsResponse {
  items: GoogleFont[];
}

// Popular Google Fonts for quick loading
export const POPULAR_GOOGLE_FONTS = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro', 
  'Roboto Condensed', 'Oswald', 'Raleway', 'Poppins', 'Merriweather',
  'PT Sans', 'Playfair Display', 'Lora', 'Nunito', 'Ubuntu',
  'Roboto Slab', 'Slabo 27px', 'Fjalla One', 'Work Sans', 'Crimson Text',
  'Dancing Script', 'Pacifico', 'Lobster', 'Great Vibes', 'Indie Flower'
];

const GOOGLE_FONTS_API_KEY = 'AIzaSyBBJotRqt7JQu5lrOHgskhcsV-3mVerG70';

let fontCache: GoogleFont[] | null = null;

export const fetchGoogleFonts = async (): Promise<GoogleFont[]> => {
  if (fontCache) return fontCache;
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=popularity`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch fonts');
    }
    
    const data: GoogleFontsResponse = await response.json();
    fontCache = data.items;
    return data.items;
  } catch (error) {
    console.error('Error fetching Google Fonts:', error);
    // Fallback to popular fonts
    return POPULAR_GOOGLE_FONTS.map(family => ({
      family,
      variants: ['400', '700'],
      subsets: ['latin'],
      category: 'sans-serif'
    }));
  }
};

export const loadGoogleFont = (fontFamily: string, variants: string[] = ['400', '700']) => {
  // Check if font is already loaded
  const existingLink = document.querySelector(`link[data-font="${fontFamily}"]`);
  if (existingLink) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-font', fontFamily);
    
    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@${variants.join(';')}&display=swap`;
    link.href = fontUrl;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load font: ${fontFamily}`));
    
    document.head.appendChild(link);
  });
};

export const getFontDisplayName = (fontFamily: string) => {
  // Convert from CSS font family to display name
  return fontFamily.replace(/['"]/g, '').replace(/\+/g, ' ');
};

export const getFontCSSName = (fontFamily: string) => {
  // Convert to CSS-safe font family name
  return fontFamily.includes(' ') ? `"${fontFamily}"` : fontFamily;
};
