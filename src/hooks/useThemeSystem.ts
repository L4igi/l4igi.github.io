import { useState } from 'react';
import { CONSOLE_VARIANTS } from '../data/content';
import { createThemeColors } from '../utils/themeHelpers';
import type {ConsoleColor, Theme} from "../types";

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
        const consoleKey = (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[])
            .find(k => CONSOLE_VARIANTS[k].base === theme.colors.console) || 'white';

        const colors = createThemeColors(
            theme.colors.accent,
            newMode,
            CONSOLE_VARIANTS[consoleKey]
        );

        setTheme({ ...theme, isDark: newMode, colors });
    };

    return { theme, updateTheme, toggleDarkMode };
};