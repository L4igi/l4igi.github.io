import type { ThemeColors } from "../types";

export const getContrastColor = (hex: string): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0f172a" : "#ffffff";
};

// Helper to generate a complementary color for the background blobs
export const getComplementaryColor = (hex: string): string => {
  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Shift Hue by 180 degrees (0.5 in 0-1 range) for complementary
  h = (h + 0.5) % 1;

  // Convert HSL back to RGB
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  r = hue2rgb(p, q, h + 1 / 3);
  g = hue2rgb(p, q, h);
  b = hue2rgb(p, q, h - 1 / 3);

  // Convert to Hex
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const createThemeColors = (
  accent: string,
  isDark: boolean,
  consoleVariant: { base: string; edge: string },
): ThemeColors => {
  const lightColors = {
    primary: "#f8fafc",
    secondary: "#e2e8f0",
    text: "#0f172a",
    textLight: "#475569",
    cardBg: "#ffffff",
    console: consoleVariant.base,
    consoleEdge: consoleVariant.edge,
    contrastAccent: getContrastColor(accent),
  };

  const darkColors = {
    primary: "#020617",
    cardBg: "#0f172a",
    secondary: "#1e293b",
    text: "#f8fafc",
    textLight: "#94a3b8",
    console: consoleVariant.base,
    consoleEdge: consoleVariant.edge,
    contrastAccent: getContrastColor(accent),
  };

  const colors = isDark ? darkColors : lightColors;

  return {
    ...colors,
    accent: accent,
  };
};
