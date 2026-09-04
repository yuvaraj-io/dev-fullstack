"use client";

import { useEffect, useState } from "react";
import { FaGlobe, FaCheck, FaSyncAlt } from "react-icons/fa";
import { useLanguage } from "@/components/providers/I18nProvider";

interface ArticleTranslateBarProps {
  heading: string;
}

export default function ArticleTranslateBar({ heading }: ArticleTranslateBarProps) {
  const { currentLanguage, languageOption, t } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [originalNodes, setOriginalNodes] = useState<Map<Element, string>>(new Map());

  // Reset or apply when language changes
  useEffect(() => {
    if (currentLanguage === "en") {
      restoreOriginal();
      setIsTranslated(false);
    }
  }, [currentLanguage]);

  const restoreOriginal = () => {
    if (originalNodes.size > 0) {
      originalNodes.forEach((origHtml, element) => {
        if (element) {
          element.innerHTML = origHtml;
        }
      });
      setIsTranslated(false);
    }
  };

  const handleTranslate = async () => {
    if (currentLanguage === "en") return;

    if (isTranslated) {
      restoreOriginal();
      return;
    }

    setIsTranslating(true);

    try {
      // Find all text and heading elements inside .blog-article-body
      const articleEl = document.querySelector(".blog-article-body");
      if (!articleEl) {
        setIsTranslating(false);
        return;
      }

      // Collect target elements (paragraphs, list items, headings, blockquotes)
      const targets = articleEl.querySelectorAll<HTMLElement>(
        "p, h1, h2, h3, h4, li, blockquote > p, .blog-content p"
      );

      const elementsToTranslate: HTMLElement[] = [];
      const textsToTranslate: string[] = [];
      const newOriginals = new Map<Element, string>();

      targets.forEach((el) => {
        // Skip code blocks, pre tags, and shiki containers
        if (el.closest("pre") || el.closest(".shiki") || el.closest("code")) return;
        const text = el.innerText.trim();
        if (text && text.length > 1) {
          elementsToTranslate.push(el);
          textsToTranslate.push(text);
          newOriginals.set(el, el.innerHTML);
        }
      });

      setOriginalNodes(newOriginals);

      // Check cache in localStorage
      const cacheKey = `article_trans_${heading.slice(0, 30)}_${currentLanguage}`;
      let translatedTexts: string[] = [];

      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length === textsToTranslate.length) {
            translatedTexts = parsed;
          }
        }
      } catch (e) {
        console.warn("Cache parse error:", e);
      }

      if (translatedTexts.length === 0) {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texts: textsToTranslate,
            targetLang: currentLanguage,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.translatedTexts)) {
            translatedTexts = data.translatedTexts;
            try {
              localStorage.setItem(cacheKey, JSON.stringify(translatedTexts));
            } catch {}
          }
        }
      }

      if (translatedTexts.length > 0) {
        elementsToTranslate.forEach((el, idx) => {
          if (translatedTexts[idx]) {
            el.innerText = translatedTexts[idx];
          }
        });
        setIsTranslated(true);
      }
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  if (currentLanguage === "en") return null;

  return (
    <div
      className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 sm:p-4 transition-all"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--line)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm"
          style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
        >
          <FaGlobe />
        </span>
        <div>
          <div className="text-xs font-bold text-[var(--ink)] flex items-center gap-1.5">
            <span>
              {isTranslated
                ? `${t("learn.translatedTo", "Translated to")} ${languageOption.nativeName}`
                : `${t("learn.translateArticle", "Translate Article to")} ${languageOption.nativeName}`}
            </span>
            {isTranslated && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                <FaCheck />
              </span>
            )}
          </div>
          <div className="text-[10px] text-[var(--ink-soft)] font-mono">
            {isTranslated
              ? "Cached in local storage • AI translated"
              : "Read this full tutorial in your selected language"}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleTranslate}
        disabled={isTranslating}
        className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all shadow-2xs hover:opacity-95 active:scale-95 cursor-pointer disabled:opacity-60"
        style={{
          backgroundColor: isTranslated ? "var(--surface)" : "var(--signal)",
          color: isTranslated ? "var(--signal)" : "#ffffff",
          border: isTranslated ? "1px solid var(--signal)" : "none",
        }}
      >
        {isTranslating ? (
          <>
            <FaSyncAlt className="animate-spin text-xs" />
            <span>{t("learn.translating", "Translating...")}</span>
          </>
        ) : isTranslated ? (
          <span>{t("learn.originalLanguage", "Show Original (EN)")}</span>
        ) : (
          <>
            <FaGlobe size={11} />
            <span>Translate to {languageOption.nativeName}</span>
          </>
        )}
      </button>
    </div>
  );
}
