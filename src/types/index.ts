import React from "react";

export type Language = "en" | "de";

export type Category = "ALL" | "WORK" | "PERSONAL" | "UNI" | "LIKED";
export type ViewMode = "GRID" | "LIST";
export type Pattern =
  | "dots"
  | "triangles"
  | "lines"
  | "checkers"
  | "cross"
  | "zigzag";
export type ConsoleColor = "white" | "black" | "indigo" | "pink";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textLight: string;
  console: string;
  consoleEdge: string;
  cardBg: string;
  contrastAccent: string;
}

export interface Theme {
  id: string;
  colors: ThemeColors;
  pattern: Pattern;
  isDark: boolean;
  scanlines: boolean;
  gbcFilter: boolean;
}

export interface Project {
  id: string;
  title: string;
  role: { en: string; de: string };
  year: string;
  description: { en: string; de: string };
  details: { en: string; de: string };
  tech: string[];
  color: string;
  icon: React.ReactNode;
  category: Category;
  placeholder?: boolean;
  screenshots: string[];
  features: { en: string[]; de: string[] };
}

export interface ExperienceItem {
  year: string;
  title: string;
  role: { en: string; de: string };
  desc: { en: string; de: string };
}

export interface LikeItem {
  id: string;
  title: string;
  role: { en: string; de: string };
  description: { en: string; de: string };
  color: string;
  icon: React.ReactNode;
}

export type SkillLevel = "PROFICIENT" | "ADVANCED" | "BASIC";

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: SkillLevel;
  label: { en: string; de: string };
  description: { en: string; de: string };
  skills: SkillItem[];
}
