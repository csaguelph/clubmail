/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG guidelines
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
}

/**
 * Calculate contrast ratio between two colors
 * Based on WCAG guidelines
 */
function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determine if a color is dark or light
 * Returns true if the color is dark (needs white text)
 * Returns false if the color is light (needs black text)
 */
export function isColorDark(hexColor: string): boolean {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return false;

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
  
  // If luminance is less than 0.5, it's a dark color
  return luminance < 0.5;
}

/**
 * Get the best text color (black or white) for a given background color
 * Returns the color with the best contrast ratio
 */
export function getTextColorForBackground(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return "#000000"; // Default to black if invalid color

  const bgLuminance = getLuminance(rgb.r, rgb.g, rgb.b);
  const whiteLuminance = 1; // White has luminance of 1
  const blackLuminance = 0; // Black has luminance of 0

  const contrastWithWhite = getContrastRatio(bgLuminance, whiteLuminance);
  const contrastWithBlack = getContrastRatio(bgLuminance, blackLuminance);

  // Return white if it has better contrast, otherwise black
  return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
}
