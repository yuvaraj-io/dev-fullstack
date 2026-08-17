"use client";

import { useState, useRef, useEffect } from "react";
import { FaSun, FaMoon, FaCheck, FaPalette } from "react-icons/fa";
import { useTheme, PALETTES, PaletteId } from "@/components/providers/ThemeProvider";

export default function ThemeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { mode, palette, toggleMode, setMode, setPalette, paletteConfig } = useTheme();

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const paletteList = Object.values(PALETTES);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Header Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-2xs backdrop-blur-md transition-all hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
        aria-label="Customize Theme & Palette"
        title="Customize Theme & Palette"
      >
        {/* Dual color swatch preview */}
        <div className="flex items-center -space-x-1.5">
          <span
            className="h-3.5 w-3.5 rounded-full border border-white shadow-2xs dark:border-slate-800"
            style={{ backgroundColor: paletteConfig.primaryColor }}
          />
          <span
            className="h-3.5 w-3.5 rounded-full border border-white shadow-2xs dark:border-slate-800"
            style={{ backgroundColor: paletteConfig.secondaryColor }}
          />
        </div>

        {/* Mode Icon */}
        {mode === "dark" ? (
          <FaMoon className="text-xs text-amber-400" />
        ) : (
          <FaSun className="text-xs text-amber-500" />
        )}

        <span className="hidden lg:inline text-[11px] font-mono tracking-tight font-bold">
          Theme
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2.5 z-50 w-80 rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl transition-all sm:w-96"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--line)",
            color: "var(--ink)",
          }}
        >
          
          {/* Header & Mode Switcher Toggle */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3.5">
            <div className="flex items-center gap-2">
              <FaPalette className="text-xs text-[var(--ink-soft)]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                Theme Studio
              </span>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-0.5">
              <button
                type="button"
                onClick={() => setMode("light")}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
                  mode === "light"
                    ? "bg-[var(--card)] text-[var(--ink)] shadow-xs"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <FaSun className="text-[10px] text-amber-500" />
                <span>Light</span>
              </button>

              <button
                type="button"
                onClick={() => setMode("dark")}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
                  mode === "dark"
                    ? "bg-[var(--card)] text-[var(--ink)] shadow-xs"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                <FaMoon className="text-[10px] text-indigo-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* Palette Selector List */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between mb-2.5 px-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--ink-soft)]">
                Color Palettes (6 Presets)
              </span>
              <span className="text-[10px] text-[var(--ink-soft)] font-medium">Global Sync</span>
            </div>

            <div className="grid gap-1.5 max-h-[340px] overflow-y-auto pr-1">
              {paletteList.map((item) => {
                const isSelected = palette === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPalette(item.id);
                    }}
                    className={`group flex w-full items-center justify-between rounded-2xl p-2.5 text-left transition-all border ${
                      isSelected
                        ? "border-[var(--signal)] bg-[var(--surface)] shadow-2xs"
                        : "border-transparent hover:border-[var(--line)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Swatch Trio Preview: Primary, Secondary, and Light Tint */}
                      <div className="flex items-center -space-x-2">
                        <span
                          className="h-5 w-5 rounded-full border-2 border-[var(--card)] shadow-xs"
                          style={{ backgroundColor: item.primaryColor }}
                        />
                        <span
                          className="h-5 w-5 rounded-full border-2 border-[var(--card)] shadow-xs"
                          style={{ backgroundColor: item.secondaryColor }}
                        />
                        <span
                          className="h-5 w-5 rounded-full border-2 border-[var(--card)] shadow-xs"
                          style={{ backgroundColor: item.lightTint }}
                        />
                      </div>

                      {/* Name & Subtitle */}
                      <div>
                        <div className="font-[family-name:var(--font-display)] text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
                          <span>{item.name}</span>
                        </div>
                        <div className="text-[10px] text-[var(--ink-soft)] font-light truncate max-w-[190px]">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Checkmark */}
                    {isSelected && (
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-xs"
                        style={{ backgroundColor: item.primaryColor }}
                      >
                        <FaCheck className="text-[9px]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-3.5 border-t border-[var(--line)] pt-2.5 text-center text-[10px] text-[var(--ink-soft)] font-mono">
            Settings saved locally • Applied across all pages
          </div>

        </div>
      )}
    </div>
  );
}
