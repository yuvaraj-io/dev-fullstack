"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { usePathname } from "next/navigation";
import { I18nextProvider, useTranslation as useReactI18nTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LanguageOption,
} from "@/lib/i18n/languages";
import { FaGlobe, FaCheck, FaSyncAlt } from "react-icons/fa";

interface I18nContextType {
  currentLanguage: string;
  languageOption: LanguageOption;
  changeLanguage: (langCode: string) => Promise<void>;
  languages: LanguageOption[];
  isRTL: boolean;
  t: (key: string, defaultValue?: string, options?: Record<string, unknown>) => string;
  translateText: (text: string) => Promise<string>;
  translateBatch: (texts: string[]) => Promise<string[]>;
  isAutoTranslating: boolean;
  isTranslated: boolean;
  toggleTranslation: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

const CACHE_PREFIX = "app_trans_v3_";

const getLocalCache = (lang: string): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${lang}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const setLocalCache = (lang: string, cache: Record<string, string>) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${CACHE_PREFIX}${lang}`, JSON.stringify(cache));
  } catch {}
};

function InnerI18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t: i18nT } = useReactI18nTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language || DEFAULT_LANGUAGE);
  const [isAutoTranslating, setIsAutoTranslating] = useState<boolean>(false);
  const [isTranslated, setIsTranslated] = useState<boolean>(false);

  // WeakMap or Map to keep track of original text of DOM text nodes
  const nodeOriginalsRef = useRef<Map<Node, string>>(new Map());
  const localCacheRef = useRef<Record<string, Record<string, string>>>({});
  const isTranslatingRef = useRef<boolean>(false);

  const languageOption = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) ||
      SUPPORTED_LANGUAGES[0]
    );
  }, [currentLanguage]);

  const isRTL = useMemo(() => {
    return languageOption.direction === "rtl";
  }, [languageOption]);

  const applyLanguageAttributes = useCallback((langCode: string) => {
    if (typeof document !== "undefined") {
      const opt = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
      document.documentElement.lang = langCode;
      document.documentElement.dir = opt?.direction || "ltr";
    }
  }, []);

  // Restore all original DOM text
  const restoreOriginalDom = useCallback(() => {
    if (nodeOriginalsRef.current.size > 0) {
      nodeOriginalsRef.current.forEach((originalText, node) => {
        try {
          if (node && node.nodeValue !== originalText) {
            node.nodeValue = originalText;
          }
        } catch {}
      });
      nodeOriginalsRef.current.clear();
    }
    setIsTranslated(false);
  }, []);

  // Batch translate texts with localStorage cache and API fallback
  const translateBatchInternal = useCallback(
    async (texts: string[], targetLang: string): Promise<string[]> => {
      if (targetLang === "en" || texts.length === 0) return texts;

      if (!localCacheRef.current[targetLang]) {
        localCacheRef.current[targetLang] = getLocalCache(targetLang);
      }
      const cache = localCacheRef.current[targetLang];

      const results: string[] = new Array(texts.length).fill("");
      const toFetchTexts: string[] = [];
      const toFetchIndices: number[] = [];

      texts.forEach((txt, idx) => {
        const trimmed = txt.trim();
        if (!trimmed || /^[\d\s\-_.,#/:\\()]+$/.test(trimmed)) {
          results[idx] = txt;
          return;
        }
        if (cache[trimmed] && cache[trimmed] !== trimmed) {
          results[idx] = cache[trimmed];
        } else {
          toFetchTexts.push(trimmed);
          toFetchIndices.push(idx);
        }
      });

      if (toFetchTexts.length > 0) {
        try {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              texts: toFetchTexts,
              targetLang,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.translatedTexts)) {
              data.translatedTexts.forEach((trans: string, i: number) => {
                const orig = toFetchTexts[i];
                const originalIndex = toFetchIndices[i];
                const cleanTrans = trans && trans.trim() ? trans.trim() : orig;
                results[originalIndex] = cleanTrans;
                if (cleanTrans !== orig) {
                  cache[orig] = cleanTrans;
                }
              });
              setLocalCache(targetLang, cache);
            }
          }
        } catch (err) {
          console.warn("Translation request error:", err);
          toFetchTexts.forEach((orig, i) => {
            results[toFetchIndices[i]] = orig;
          });
        }
      }

      return results;
    },
    []
  );

  // Traverse and translate all visible text nodes in the DOM
  const translatePageDom = useCallback(
    async (targetLang: string) => {
      if (typeof window === "undefined" || targetLang === "en") {
        restoreOriginalDom();
        return;
      }

      if (isTranslatingRef.current) return;
      isTranslatingRef.current = true;
      setIsAutoTranslating(true);

      try {
        const root = document.body;
        const walker = document.createTreeWalker(
          root,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;

              // Skip code blocks, pre tags, shiki syntax highlighting, inputs, SVGs
              const tag = parent.tagName.toLowerCase();
              if (
                tag === "script" ||
                tag === "style" ||
                tag === "pre" ||
                tag === "code" ||
                tag === "textarea" ||
                tag === "input" ||
                tag === "svg" ||
                tag === "path" ||
                parent.closest("pre") ||
                parent.closest("code") ||
                parent.closest(".shiki") ||
                parent.closest(".notranslate") ||
                parent.closest("[data-no-translate]") ||
                parent.closest("[data-language-dropdown]")
              ) {
                return NodeFilter.FILTER_REJECT;
              }

              const val = node.nodeValue?.trim();
              if (!val || val.length < 2) return NodeFilter.FILTER_REJECT;
              if (/^[\d\s\-_.,#/:\\()]+$/.test(val)) return NodeFilter.FILTER_REJECT;

              return NodeFilter.FILTER_ACCEPT;
            },
          }
        );

        const nodesToTranslate: Node[] = [];
        const originalTexts: string[] = [];

        let currentNode = walker.nextNode();
        while (currentNode) {
          const rawVal = currentNode.nodeValue || "";
          if (rawVal.trim()) {
            // Save initial untranslated text
            if (!nodeOriginalsRef.current.has(currentNode)) {
              nodeOriginalsRef.current.set(currentNode, rawVal);
            }
            const orig = nodeOriginalsRef.current.get(currentNode) || rawVal;
            nodesToTranslate.push(currentNode);
            originalTexts.push(orig.trim());
          }
          currentNode = walker.nextNode();
        }

        if (nodesToTranslate.length > 0) {
          const translatedList = await translateBatchInternal(originalTexts, targetLang);

          nodesToTranslate.forEach((node, i) => {
            const translated = translatedList[i];
            if (translated && node.nodeValue !== undefined) {
              const orig = nodeOriginalsRef.current.get(node) || node.nodeValue || "";
              const leading = orig.match(/^\s*/)?.[0] || "";
              const trailing = orig.match(/\s*$/)?.[0] || "";
              node.nodeValue = leading + translated + trailing;
            }
          });

          setIsTranslated(true);
        }
      } catch (err) {
        console.error("DOM translation error:", err);
      } finally {
        isTranslatingRef.current = false;
        setIsAutoTranslating(false);
      }
    },
    [translateBatchInternal, restoreOriginalDom]
  );

  // Initialize language from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      if (saved !== i18n.language) {
        i18n.changeLanguage(saved).then(() => {
          setCurrentLanguage(saved);
          applyLanguageAttributes(saved);
        });
      } else {
        applyLanguageAttributes(saved);
      }
    } else {
      applyLanguageAttributes(DEFAULT_LANGUAGE);
    }
  }, [applyLanguageAttributes]);

  // Run auto translation when language or route changes
  useEffect(() => {
    if (currentLanguage !== "en") {
      const timer = setTimeout(() => {
        translatePageDom(currentLanguage);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      restoreOriginalDom();
    }
  }, [currentLanguage, pathname, translatePageDom, restoreOriginalDom]);

  const changeLanguage = useCallback(
    async (langCode: string) => {
      try {
        restoreOriginalDom();
        await i18n.changeLanguage(langCode);
        setCurrentLanguage(langCode);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, langCode);
        applyLanguageAttributes(langCode);
        window.dispatchEvent(
          new CustomEvent("app:languageChange", { detail: { language: langCode } })
        );

        if (langCode !== "en") {
          setTimeout(() => {
            translatePageDom(langCode);
          }, 100);
        }
      } catch (err) {
        console.error("Failed to change language:", err);
      }
    },
    [applyLanguageAttributes, restoreOriginalDom, translatePageDom]
  );

  const toggleTranslation = useCallback(() => {
    if (isTranslated) {
      restoreOriginalDom();
    } else if (currentLanguage !== "en") {
      translatePageDom(currentLanguage);
    }
  }, [isTranslated, currentLanguage, restoreOriginalDom, translatePageDom]);

  const t = useCallback(
    (key: string, defaultValue?: string, options?: Record<string, unknown>): string => {
      const result = i18nT(key, options);
      if (result === key && defaultValue) {
        return defaultValue;
      }
      return typeof result === "string" ? result : defaultValue || key;
    },
    [i18nT]
  );

  const translateText = useCallback(
    async (text: string): Promise<string> => {
      if (!text || currentLanguage === "en") return text;
      const res = await translateBatchInternal([text], currentLanguage);
      return res[0] || text;
    },
    [currentLanguage, translateBatchInternal]
  );

  const translateBatch = useCallback(
    async (texts: string[]): Promise<string[]> => {
      return translateBatchInternal(texts, currentLanguage);
    },
    [currentLanguage, translateBatchInternal]
  );

  const value = useMemo(
    () => ({
      currentLanguage,
      languageOption,
      changeLanguage,
      languages: SUPPORTED_LANGUAGES,
      isRTL,
      t,
      translateText,
      translateBatch,
      isAutoTranslating,
      isTranslated,
      toggleTranslation,
    }),
    [
      currentLanguage,
      languageOption,
      changeLanguage,
      isRTL,
      t,
      translateText,
      translateBatch,
      isAutoTranslating,
      isTranslated,
      toggleTranslation,
    ]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}

      {/* Floating Global Translation Toast / Status indicator */}
      {currentLanguage !== "en" && (
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--card)]/95 backdrop-blur-xl px-3.5 py-2 text-xs font-semibold shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-2">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
              style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
            >
              <FaGlobe size={11} />
            </span>
            <div className="text-[11px]">
              <span className="font-bold text-[var(--ink)]">
                {languageOption.nativeName} ({languageOption.code.toUpperCase()})
              </span>
              <span className="mx-1 text-[var(--ink-soft)]">•</span>
              {isAutoTranslating ? (
                <span className="inline-flex items-center gap-1 text-[var(--signal)] font-bold">
                  <FaSyncAlt className="animate-spin text-[10px]" /> Translating...
                </span>
              ) : isTranslated ? (
                <span className="text-emerald-500 font-bold inline-flex items-center gap-1">
                  <FaCheck size={9} /> Translated
                </span>
              ) : (
                <span className="text-[var(--ink-soft)]">Original EN</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTranslation}
            className="ml-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-bold text-[var(--ink)] hover:border-[var(--signal)] hover:text-[var(--signal)] transition cursor-pointer"
          >
            {isTranslated ? "Show EN" : "Translate"}
          </button>
        </div>
      )}
    </I18nContext.Provider>
  );
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <InnerI18nProvider>{children}</InnerI18nProvider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLanguage must be used within an I18nProvider");
  }
  return context;
}
