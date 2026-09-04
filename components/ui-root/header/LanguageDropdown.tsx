"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { FaGlobe, FaSearch, FaCheck, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/components/providers/I18nProvider";
import { LanguageOption } from "@/lib/i18n/languages";

interface LanguageDropdownProps {
  variant?: "desktop" | "mobile";
}

export default function LanguageDropdown({ variant = "desktop" }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { currentLanguage, languageOption, changeLanguage, languages, t } = useLanguage();

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

  // Close on Escape & focus search on open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return languages;

    return languages.filter((lang) => {
      return (
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q) ||
        (lang.region && lang.region.toLowerCase().includes(q))
      );
    });
  }, [languages, searchQuery]);

  const handleSelectLanguage = (lang: LanguageOption) => {
    changeLanguage(lang.code);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={dropdownRef} data-language-dropdown="true">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3 py-1.5 text-xs font-semibold shadow-2xs backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer ${
          variant === "mobile" ? "h-9 w-9 p-0 justify-center rounded-xl" : ""
        }`}
        style={{
          backgroundColor: "var(--surface)",
          borderColor: isOpen ? "var(--signal)" : "var(--line)",
          color: "var(--ink)",
        }}
        aria-label="Select Language"
        title="Select Language / Globalize"
        aria-expanded={isOpen}
      >
        <FaGlobe
          className="text-xs transition-transform group-hover:rotate-12"
          style={{ color: "var(--signal)" }}
        />
        {variant !== "mobile" && (
          <>
            <span className="font-mono text-[11px] font-bold uppercase tracking-tight">
              {languageOption.code.toUpperCase()}
            </span>
            <span className="hidden xl:inline text-[11px] text-[var(--ink-soft)] font-normal">
              ({languageOption.name})
            </span>
          </>
        )}
      </button>

      {/* Language Selection Modal / Dropdown */}
      {isOpen && (
        <div
          className="fixed left-3 right-3 top-18 z-50 rounded-3xl border p-4 shadow-2xl backdrop-blur-2xl transition-all sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2.5 sm:w-[420px] max-h-[85vh] flex flex-col"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--line)",
            color: "var(--ink)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <div className="flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
              >
                <FaGlobe size={11} />
              </span>
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                  {t("common.languages", "Global Languages")}
                </h3>
                <p className="text-[10px] text-[var(--ink-soft)]">
                  {languages.length} languages supported
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
            >
              <FaTimes size={10} />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative my-3 shrink-0">
            <FaSearch className="absolute left-3 top-2.5 text-xs text-[var(--ink-soft)] pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("common.searchLanguage", "Search language (e.g. Spanish, Tamil, Hindi, French...)")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] pl-8 pr-8 py-2 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)]"
              >
                <FaTimes size={10} />
              </button>
            )}
          </div>

          {/* Languages Scroll List */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1 max-h-[320px]">
            {filteredLanguages.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--ink-soft)] font-mono">
                No languages found matching "{searchQuery}"
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`group flex w-full items-center justify-between rounded-2xl p-2.5 text-left transition-all border ${
                      isSelected
                        ? "border-[var(--signal)] bg-[var(--surface)] shadow-2xs"
                        : "border-transparent hover:border-[var(--line)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Language Code Badge */}
                      <span
                        className={`flex h-8 w-11 shrink-0 items-center justify-center rounded-xl border text-[11px] font-mono font-bold tracking-wider uppercase transition-colors ${
                          isSelected
                            ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                            : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] group-hover:border-[var(--signal)]/40"
                        }`}
                      >
                        {lang.code}
                      </span>

                      {/* Language Names */}
                      <div>
                        <div className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xs font-bold text-[var(--ink)]">
                          <span>{lang.nativeName}</span>
                          {lang.nativeName !== lang.name && (
                            <span className="text-[11px] font-normal text-[var(--ink-soft)]">
                              • {lang.name}
                            </span>
                          )}
                        </div>
                        {lang.region && (
                          <div className="text-[10px] text-[var(--ink-soft)] font-light truncate max-w-[200px]">
                            {lang.region}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Checkmark indicator */}
                    {isSelected ? (
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white shadow-xs"
                        style={{ backgroundColor: "var(--signal)" }}
                      >
                        <FaCheck className="text-[9px]" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--ink-soft)] opacity-0 group-hover:opacity-100 transition-opacity">
                        Select
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="mt-3 border-t border-[var(--line)] pt-2.5 text-center text-[10px] text-[var(--ink-soft)] font-mono shrink-0">
            {t("common.savedLocally", "Saved locally • Applied across all pages")}
          </div>
        </div>
      )}
    </div>
  );
}
