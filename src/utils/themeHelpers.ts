import type { ThemeColors } from "../types";

export const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#0f172a' : '#ffffff'; // Return Dark Slate for light backgrounds, White for dark
};

export const createThemeColors = (
    accent: string,
    isDark: boolean,
    consoleVariant: { base: string, edge: string }
): ThemeColors => {
    const primary = isDark ? '#0f172a' : '#f1f5f9'; // Slate-900 vs Slate-100
    const secondary = isDark ? '#1e293b' : '#e2e8f0'; // Slate-800 vs Slate-200

    const text = isDark ? '#f8fafc' : '#0f172a'; // Slate-50 vs Slate-900 (High Contrast)
    const textLight = isDark ? '#cbd5e1' : '#475569'; // Slate-300 vs Slate-600

    const cardBg = isDark ? '#1e293b' : '#ffffff'; // Slate-800 vs White
    const contrastAccent = getContrastColor(accent);

    return {
        primary,
        secondary,
        accent,
        text,
        textLight,
        console: consoleVariant.base,
        consoleEdge: consoleVariant.edge,
        cardBg,
        contrastAccent
    };
};