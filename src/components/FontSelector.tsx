import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { SYSTEM_FONTS } from '@/types/post';
import { getFontCSSName, getFontDisplayName } from '@/services/googleFonts';
import { Search, Loader2 } from 'lucide-react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector = ({ value, onChange }: FontSelectorProps) => {
  const { fonts, loading, loadFont, isFontLoaded } = useGoogleFonts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Filter fonts based on search
  const filteredFonts = fonts.filter(font =>
    font.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFontSelect = async (fontFamily: string) => {
    // If it's not a system font, load it first
    if (!SYSTEM_FONTS.includes(fontFamily)) {
      await loadFont(fontFamily);
    }
    onChange(getFontCSSName(fontFamily));
  };

  const handleSearch = () => {
    setShowSearch(!showSearch);
    setSearchTerm('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="font" className="text-sm font-medium">Font</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSearch}
          className="h-8 w-8 p-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {showSearch && (
        <Input
          placeholder="Search fonts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2"
        />
      )}

      <Select value={value} onValueChange={handleFontSelect}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {/* System Fonts */}
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            System Fonts
          </div>
          {SYSTEM_FONTS.map((font) => (
            <SelectItem 
              key={font} 
              value={font}
              style={{ fontFamily: font }}
            >
              {font}
            </SelectItem>
          ))}
          
          <Separator className="my-1" />
          
          {/* Google Fonts */}
          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground flex items-center gap-2">
            Google Fonts
            {loading && <Loader2 className="h-3 w-3 animate-spin" />}
          </div>
          
          {loading ? (
            <div className="px-2 py-4 text-center text-sm text-muted-foreground">
              Loading fonts...
            </div>
          ) : (
            <>
              {(searchTerm ? filteredFonts : fonts.slice(0, 50)).map((font) => (
                <SelectItem 
                  key={font.family} 
                  value={font.family}
                  style={{ 
                    fontFamily: isFontLoaded(font.family) ? getFontCSSName(font.family) : 'inherit'
                  }}
                  className="transition-all duration-200"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{getFontDisplayName(font.family)}</span>
                    {!isFontLoaded(font.family) && (
                      <span className="text-xs text-muted-foreground ml-2">
                        {font.category}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
              
              {searchTerm && filteredFonts.length === 0 && (
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                  No fonts found matching "{searchTerm}"
                </div>
              )}
            </>
          )}
        </SelectContent>
      </Select>
      
      {value && !SYSTEM_FONTS.includes(value) && !isFontLoaded(value) && (
        <p className="text-xs text-muted-foreground">
          Font will load when selected...
        </p>
      )}
    </div>
  );
};