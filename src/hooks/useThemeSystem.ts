import { useState } from 'react';
import { CONSOLE_VARIANTS, PASTEL_PALETTE } from '../data/content';
import { createThemeColors } from '../utils/themeHelpers';
import type { ConsoleColor, Theme } from "../types";

// --- CONFIGURATION ---
const IS_DARK_DEFAULT = true; // Change this single value to switch default mode

// Select appropriate default console color based on mode
const DEFAULT_CONSOLE = IS_DARK_DEFAULT ? CONSOLE_VARIANTS.black : CONSOLE_VARIANTS.white;

const DEFAULT_THEME: Theme = {
    id: 'default',
    pattern: 'dots',
    isDark: IS_DARK_DEFAULT,
    scanlines: false,
    colors: createThemeColors(PASTEL_PALETTE[3].value, IS_DARK_DEFAULT, DEFAULT_CONSOLE)
};

export const useThemeSystem = () => {
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

    const updateTheme = (newTheme: Theme) => setTheme(newTheme);

    const toggleDarkMode = () => {
        const newMode = !theme.isDark;

        // 1. Identify current console color key to preserve custom selections (e.g. Pink)
        let currentConsoleKey = (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[])
            .find(k => CONSOLE_VARIANTS[k].base === theme.colors.console) || 'white';

        // 2. Smart Switching Logic:
        // If using a "default" console color (White/Black), switch it to match the new mode.
        // If using a "custom" color (Pink/Indigo), keep it.
        if (!theme.isDark && currentConsoleKey === 'white') {
            currentConsoleKey = 'black'; // Light (White) -> Dark (Black)
        } else if (theme.isDark && currentConsoleKey === 'black') {
            currentConsoleKey = 'white'; // Dark (Black) -> Light (White)
        }

        const colors = createThemeColors(
            theme.colors.accent,
            newMode,
            CONSOLE_VARIANTS[currentConsoleKey]
        );

        setTheme({ ...theme, isDark: newMode, colors });
    };

    return { theme, updateTheme, toggleDarkMode };
};