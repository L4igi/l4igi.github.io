import type { ThemeColors } from "../types";

export const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#0f172a' : '#ffffff';
};

export const createThemeColors = (
    accent: string,
    isDark: boolean,
    consoleVariant: { base: string, edge: string }
): ThemeColors => {
    // --- LIGHT MODE ---
    // Clean, airy, crisp borders.
    const lightColors = {
        primary: '#f8fafc',   // Slate-50 (App Background)
        secondary: '#e2e8f0', // Slate-200 (Buttons/Borders)
        text: '#0f172a',      // Slate-900 (Text)
        textLight: '#475569', // Slate-600 (Subtext)
        cardBg: '#ffffff',    // White (Cards/Modals)
        console: consoleVariant.base,
        consoleEdge: consoleVariant.edge,
        contrastAccent: getContrastColor(accent)
    };

    // --- DARK MODE ---
    // Depth-based: Lighter = Higher/Interactive.
    const darkColors = {
        primary: '#020617',   // Slate-950 (Deepest Background)
        cardBg: '#0f172a',    // Slate-900 (Cards/Modals)
        secondary: '#1e293b', // Slate-800 (Buttons - Lighter than card to pop)
        text: '#f8fafc',      // Slate-50 (Text)
        textLight: '#94a3b8', // Slate-400 (Subtext)
        console: consoleVariant.base,
        consoleEdge: consoleVariant.edge,
        contrastAccent: getContrastColor(accent)
    };

    const colors = isDark ? darkColors : lightColors;

    return {
        ...colors,
        accent: accent
    };
};