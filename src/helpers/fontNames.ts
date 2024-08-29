import { savedFonts } from '~assets';
import type { FontType } from '~types';

const getFontNames = (): Record<FontType, string> => {
  const fonts: Record<FontType, string> = {} as any;
  for (const key in savedFonts) {
    fonts[key as FontType] = key;
  }
  return fonts;
};

export const fontNames = getFontNames();
