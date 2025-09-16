export interface PostSize {
  name: string;
  width: number;
  height: number;
}

export interface PostConfig {
  size: PostSize;
  zoom: number;
  margin: 'narrow' | 'medium' | 'wide';
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  gradientDirection: string;
  gradientStart: string;
  gradientEnd: string;
  mainText: string;
  font: string;
  fontSize: number;
  textColor: string;
  footerText: string;
  footerColor: string;
  footerSize: number;
  footerPosition: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right';
  footerPadding: number;
}

export const POST_SIZES: PostSize[] = [
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Facebook Link', width: 1200, height: 628 },
  { name: 'LinkedIn Post', width: 1200, height: 627 },
  { name: 'Story / Portrait', width: 1080, height: 1920 },
];

export const ZOOM_LEVELS = [50, 75, 100, 125, 150];

export const MARGIN_OPTIONS = [
  { value: 'narrow' as const, label: 'Narrow' },
  { value: 'medium' as const, label: 'Medium' },
  { value: 'wide' as const, label: 'Wide' },
];

export const BACKGROUND_COLORS = [
  '#000000', '#ffffff', '#dc2626', '#2563eb', '#16a34a', 
  '#eab308', '#ea580c', '#9333ea', '#ec4899', '#6b7280',
  '#06b6d4', '#84cc16', '#991b1b', '#1e3a8a', '#365314',
  '#f5deb3', '#ffc0cb', '#dda0dd', '#90ee90'
];

export const FONTS = [
  'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Garamond',
  'Trebuchet MS', 'Verdana', 'Courier New', 'Lucida Sans', 'Palatino',
  'Tahoma', 'Impact', 'Segoe UI'
];

// System fonts that don't need loading
export const SYSTEM_FONTS = [
  'Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Garamond',
  'Trebuchet MS', 'Verdana', 'Courier New', 'Lucida Sans', 'Palatino',
  'Tahoma', 'Impact', 'Segoe UI'
];

export const FOOTER_COLORS = [
  { value: '#6b7280', label: 'Grey' },
  { value: '#ffffff', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#dc2626', label: 'Red' },
  { value: '#16a34a', label: 'Green' },
  { value: '#2563eb', label: 'Blue' },
  { value: '#ea580c', label: 'Orange' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#9333ea', label: 'Purple' },
  { value: '#06b6d4', label: 'Cyan' },
];

export const FOOTER_POSITIONS = [
  { value: 'bottom-center' as const, label: 'Bottom Center' },
  { value: 'bottom-left' as const, label: 'Bottom Left' },
  { value: 'bottom-right' as const, label: 'Bottom Right' },
  { value: 'top-center' as const, label: 'Top Center' },
  { value: 'top-left' as const, label: 'Top Left' },
  { value: 'top-right' as const, label: 'Top Right' },
];

export const GRADIENT_DIRECTIONS = [
  { value: 'to-r', label: 'Left to Right' },
  { value: 'to-l', label: 'Right to Left' },
  { value: 'to-b', label: 'Top to Bottom' },
  { value: 'to-t', label: 'Bottom to Top' },
  { value: 'to-br', label: 'Top-Left to Bottom-Right' },
  { value: 'to-bl', label: 'Top-Right to Bottom-Left' },
  { value: 'to-tr', label: 'Bottom-Left to Top-Right' },
  { value: 'to-tl', label: 'Bottom-Right to Top-Left' },
];

export const GRADIENT_PRESETS = [
  { name: 'Ocean', start: '#667eea', end: '#764ba2' },
  { name: 'Sunset', start: '#f093fb', end: '#f5576c' },
  { name: 'Forest', start: '#4facfe', end: '#00f2fe' },
  { name: 'Purple', start: '#a8edea', end: '#fed6e3' },
  { name: 'Fire', start: '#ff9a9e', end: '#fecfef' },
  { name: 'Sky', start: '#a1c4fd', end: '#c2e9fb' },
];
