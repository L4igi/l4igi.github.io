import { useState } from 'react';
import { CONSOLE_VARIANTS } from '../data/content';
import { createThemeColors } from '../utils/themeHelpers';
import type { ConsoleColor, Theme } from "../types";

const DEFAULT_THEME: Theme = {
    id: 'default',
    pattern: 'dots',
    isDark: false,
    scanlines: false,
    colors: createThemeColors('#f9a8d4', false, CONSOLE_VARIANTS.white)
};

export const useThemeSystem = () => {
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

    const updateTheme = (newTheme: Theme) => setTheme(newTheme);

    const toggleDarkMode = () => {
        const newMode = !theme.isDark;

        // 1. Identify current console color key
        let currentConsoleKey = (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[])
            .find(k => CONSOLE_VARIANTS[k].base === theme.colors.console) || 'white';

        // 2. Smart Switching Logic:
        // If we are currently in the "Default" color for the active mode, switch to the "Default" for the new mode.
        // Otherwise (if custom color like Pink/Indigo), keep it.
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