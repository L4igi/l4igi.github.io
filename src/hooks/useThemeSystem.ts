import { useState } from "react";
import { CONSOLE_VARIANTS, PASTEL_PALETTE } from "../data/content";
import { createThemeColors } from "../utils/themeHelpers";
import type { ConsoleColor, Theme } from "../types";

const IS_DARK_DEFAULT = true; // Change this single value to switch default mode

const DEFAULT_CONSOLE = IS_DARK_DEFAULT
  ? CONSOLE_VARIANTS.black
  : CONSOLE_VARIANTS.white;

const DEFAULT_THEME: Theme = {
  id: "default",
  pattern: "dots",
  isDark: IS_DARK_DEFAULT,
  scanlines: false,
  colors: createThemeColors(
    PASTEL_PALETTE[3].value,
    IS_DARK_DEFAULT,
    DEFAULT_CONSOLE,
  ),
};

export const useThemeSystem = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  const updateTheme = (newTheme: Theme) => setTheme(newTheme);

  const toggleDarkMode = () => {
    const newMode = !theme.isDark;

    let currentConsoleKey =
      (Object.keys(CONSOLE_VARIANTS) as ConsoleColor[]).find(
        (k) => CONSOLE_VARIANTS[k].base === theme.colors.console,
      ) || "white";

    if (!theme.isDark && currentConsoleKey === "white") {
      currentConsoleKey = "black";
    } else if (theme.isDark && currentConsoleKey === "black") {
      currentConsoleKey = "white";
    }

    const colors = createThemeColors(
      theme.colors.accent,
      newMode,
      CONSOLE_VARIANTS[currentConsoleKey],
    );

    setTheme({ ...theme, isDark: newMode, colors });
  };

  return { theme, updateTheme, toggleDarkMode };
};
