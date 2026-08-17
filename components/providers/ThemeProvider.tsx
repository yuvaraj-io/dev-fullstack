"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";

export type PaletteId =
  | "blue-violet"
  | "amber-orange"
  | "forest-emerald"
  | "monochrome"
  | "crimson-red"
  | "ocean-cyan";

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  subtitle: string;
  primaryColor: string;
  secondaryColor: string;
  lightTint: string;
  light: {
    background: string;
    paper: string;
    surface: string;
    card: string;
    ink: string;
    inkSoft: string;
    line: string;
    signal: string;
    signalDeep: string;
    signalSoft: string;
    signalText: string;
    accent: string;
    selectionBg: string;
    selectionText: string;
    headerGrad: string;
  };
  dark: {
    background: string;
    paper: string;
    surface: string;
    card: string;
    ink: string;
    inkSoft: string;
    line: string;
    signal: string;
    signalDeep: string;
    signalSoft: string;
    signalText: string;
    accent: string;
    selectionBg: string;
    selectionText: string;
    headerGrad: string;
  };
}

export const PALETTES: Record<PaletteId, PaletteConfig> = {
  "blue-violet": {
    id: "blue-violet",
    name: "Blue & Violet",
    subtitle: "Classic electric indigo & vivid violet",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    lightTint: "#ede9fe",
    light: {
      background: "#f8fafc",
      paper: "#f8fafc",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#0f172a",
      inkSoft: "#64748b",
      line: "#e2e8f0",
      signal: "#6366f1",
      signalDeep: "#4f46e5",
      signalSoft: "#ede9fe",
      signalText: "#ffffff",
      accent: "#8b5cf6",
      selectionBg: "#ddd6fe",
      selectionText: "#3b0764",
      headerGrad: "linear-gradient(135deg, #4f46e5, #7c3aed, #06b6d4)",
    },
    dark: {
      background: "#080b14",
      paper: "#080b14",
      surface: "#0d1122",
      card: "#13182c",
      ink: "#f8fafc",
      inkSoft: "#94a3b8",
      line: "#1f2942",
      signal: "#818cf8",
      signalDeep: "#6366f1",
      signalSoft: "rgba(99, 102, 241, 0.18)",
      signalText: "#ffffff",
      accent: "#a78bfa",
      selectionBg: "#3730a3",
      selectionText: "#e0e7ff",
      headerGrad: "linear-gradient(135deg, #818cf8, #a78bfa, #38bdf8)",
    },
  },
  "amber-orange": {
    id: "amber-orange",
    name: "Yellow & Orange",
    subtitle: "Warm solar amber & vibrant sunset orange",
    primaryColor: "#f59e0b",
    secondaryColor: "#f97316",
    lightTint: "#fef3c7",
    light: {
      background: "#fdfbf7",
      paper: "#fdfbf7",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#0f172a",
      inkSoft: "#64748b",
      line: "#e7e0d6",
      signal: "#d97706",
      signalDeep: "#b45309",
      signalSoft: "#fef3c7",
      signalText: "#ffffff",
      accent: "#ea580c",
      selectionBg: "#fde68a",
      selectionText: "#78350f",
      headerGrad: "linear-gradient(135deg, #d97706, #ea580c, #e11d48)",
    },
    dark: {
      background: "#0e0a05",
      paper: "#0e0a05",
      surface: "#18120b",
      card: "#231c12",
      ink: "#f8fafc",
      inkSoft: "#a8a29e",
      line: "#3d2e1c",
      signal: "#fbbf24",
      signalDeep: "#f59e0b",
      signalSoft: "rgba(251, 191, 36, 0.18)",
      signalText: "#09090b",
      accent: "#fb923c",
      selectionBg: "#78350f",
      selectionText: "#fffbeb",
      headerGrad: "linear-gradient(135deg, #fbbf24, #fb923c, #f43f5e)",
    },
  },
  "forest-emerald": {
    id: "forest-emerald",
    name: "Misty Forest & Emerald",
    subtitle: "Organic deep forest green with fresh mint accents",
    primaryColor: "#059669",
    secondaryColor: "#10b981",
    lightTint: "#ecfdf5",
    light: {
      background: "#f6fbf8",
      paper: "#f6fbf8",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#090d16",
      inkSoft: "#64748b",
      line: "#d8e7e0",
      signal: "#059669",
      signalDeep: "#047857",
      signalSoft: "#ecfdf5",
      signalText: "#ffffff",
      accent: "#10b981",
      selectionBg: "#a7f3d0",
      selectionText: "#064e3b",
      headerGrad: "linear-gradient(135deg, #047857, #059669, #0d9488)",
    },
    dark: {
      background: "#060e0a",
      paper: "#060e0a",
      surface: "#0b1812",
      card: "#11231a",
      ink: "#f8fafc",
      inkSoft: "#94a3b8",
      line: "#1b3c2c",
      signal: "#34d399",
      signalDeep: "#10b981",
      signalSoft: "rgba(16, 185, 129, 0.18)",
      signalText: "#060e0a",
      accent: "#2dd4bf",
      selectionBg: "#065f46",
      selectionText: "#ecfdf5",
      headerGrad: "linear-gradient(135deg, #34d399, #10b981, #2dd4bf)",
    },
  },
  "monochrome": {
    id: "monochrome",
    name: "Pure Monochrome",
    subtitle: "Modern Swiss minimalism with stark high-contrast",
    primaryColor: "#18181b",
    secondaryColor: "#71717a",
    lightTint: "#f4f4f5",
    light: {
      background: "#fafafa",
      paper: "#fafafa",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#09090b",
      inkSoft: "#71717a",
      line: "#e4e4e7",
      signal: "#18181b",
      signalDeep: "#09090b",
      signalSoft: "#f4f4f5",
      signalText: "#ffffff",
      accent: "#52525b",
      selectionBg: "#e4e4e7",
      selectionText: "#09090b",
      headerGrad: "linear-gradient(135deg, #09090b, #3f3f46, #71717a)",
    },
    dark: {
      background: "#080808",
      paper: "#080808",
      surface: "#111111",
      card: "#171717",
      ink: "#fafafa",
      inkSoft: "#a1a1aa",
      line: "#2b2b2b",
      signal: "#fafafa",
      signalDeep: "#e4e4e7",
      signalSoft: "rgba(255, 255, 255, 0.12)",
      signalText: "#09090b",
      accent: "#d4d4d8",
      selectionBg: "#3f3f46",
      selectionText: "#fafafa",
      headerGrad: "linear-gradient(135deg, #ffffff, #d4d4d8, #a1a1aa)",
    },
  },
  "crimson-red": {
    id: "crimson-red",
    name: "Crimson & Rose Red",
    subtitle: "Bold ruby red with vivid pink rose accents",
    primaryColor: "#e11d48",
    secondaryColor: "#f43f5e",
    lightTint: "#ffe4e6",
    light: {
      background: "#fdf8f8",
      paper: "#fdf8f8",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#0f172a",
      inkSoft: "#64748b",
      line: "#ebd8dc",
      signal: "#e11d48",
      signalDeep: "#be123c",
      signalSoft: "#ffe4e6",
      signalText: "#ffffff",
      accent: "#f43f5e",
      selectionBg: "#fecdd3",
      selectionText: "#881337",
      headerGrad: "linear-gradient(135deg, #be123c, #e11d48, #f43f5e)",
    },
    dark: {
      background: "#0f0507",
      paper: "#0f0507",
      surface: "#1a0b0f",
      card: "#261217",
      ink: "#f8fafc",
      inkSoft: "#94a3b8",
      line: "#421d27",
      signal: "#fb7185",
      signalDeep: "#f43f5e",
      signalSoft: "rgba(251, 113, 133, 0.18)",
      signalText: "#0f0507",
      accent: "#fda4af",
      selectionBg: "#881337",
      selectionText: "#fff1f2",
      headerGrad: "linear-gradient(135deg, #fb7185, #f43f5e, #fda4af)",
    },
  },
  "ocean-cyan": {
    id: "ocean-cyan",
    name: "Oceanic Cyan & Sky",
    subtitle: "Crisp dev-tool cyan with deep oceanic navy",
    primaryColor: "#0284c7",
    secondaryColor: "#06b6d4",
    lightTint: "#e0f2fe",
    light: {
      background: "#f6fafc",
      paper: "#f6fafc",
      surface: "#ffffff",
      card: "#ffffff",
      ink: "#090d16",
      inkSoft: "#64748b",
      line: "#d8e6ee",
      signal: "#0284c7",
      signalDeep: "#0369a1",
      signalSoft: "#e0f2fe",
      signalText: "#ffffff",
      accent: "#06b6d4",
      selectionBg: "#bae6fd",
      selectionText: "#082f49",
      headerGrad: "linear-gradient(135deg, #0369a1, #0284c7, #06b6d4)",
    },
    dark: {
      background: "#050d16",
      paper: "#050d16",
      surface: "#0b1725",
      card: "#112338",
      ink: "#f8fafc",
      inkSoft: "#94a3b8",
      line: "#1a3b5c",
      signal: "#38bdf8",
      signalDeep: "#0284c7",
      signalSoft: "rgba(56, 189, 248, 0.18)",
      signalText: "#050d16",
      accent: "#22d3ee",
      selectionBg: "#0c4a6e",
      selectionText: "#f0f9ff",
      headerGrad: "linear-gradient(135deg, #38bdf8, #0ea5e9, #22d3ee)",
    },
  },
};

interface ThemeContextType {
  mode: ThemeMode;
  palette: PaletteId;
  paletteConfig: PaletteConfig;
  toggleMode: () => void;
  setMode: (m: ThemeMode) => void;
  setPalette: (p: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [palette, setPaletteState] = useState<PaletteId>("blue-violet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = (localStorage.getItem("yuvi-theme-mode") as ThemeMode) || "light";
    const savedPalette = (localStorage.getItem("yuvi-theme-palette") as PaletteId) || "blue-violet";

    if (savedMode === "dark" || savedMode === "light") {
      setModeState(savedMode);
    }
    if (PALETTES[savedPalette]) {
      setPaletteState(savedPalette);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const config = PALETTES[palette] || PALETTES["blue-violet"];
    const values = mode === "dark" ? config.dark : config.light;

    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    root.style.setProperty("--background", values.background);
    root.style.setProperty("--paper", values.paper);
    root.style.setProperty("--surface", values.surface);
    root.style.setProperty("--card", values.card);
    root.style.setProperty("--foreground", values.ink);
    root.style.setProperty("--ink", values.ink);
    root.style.setProperty("--ink-soft", values.inkSoft);
    root.style.setProperty("--line", values.line);
    root.style.setProperty("--signal", values.signal);
    root.style.setProperty("--signal-deep", values.signalDeep);
    root.style.setProperty("--signal-soft", values.signalSoft);
    root.style.setProperty("--signal-text", values.signalText);
    root.style.setProperty("--accent", values.accent);
    root.style.setProperty("--selection-bg", values.selectionBg);
    root.style.setProperty("--selection-text", values.selectionText);
    root.style.setProperty("--header-grad", values.headerGrad);

    localStorage.setItem("yuvi-theme-mode", mode);
    localStorage.setItem("yuvi-theme-palette", palette);
  }, [mode, palette, mounted]);

  const toggleMode = () => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setMode = (m: ThemeMode) => {
    setModeState(m);
  };

  const setPalette = (p: PaletteId) => {
    setPaletteState(p);
  };

  const paletteConfig = PALETTES[palette] || PALETTES["blue-violet"];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        palette,
        paletteConfig,
        toggleMode,
        setMode,
        setPalette,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
