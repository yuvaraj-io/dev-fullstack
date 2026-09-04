"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/I18nProvider";
import type { TocItem } from "@/lib/blogToc";

export type { TocItem };

const levelStyles: Record<TocItem["level"], string> = {
  1: "pl-3 font-semibold",
  2: "pl-3",
  3: "pl-6 text-xs",
};

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const updateActive = () => {
      const scrollY = window.scrollY + 120; // offset for sticky header
      let current = items[0].id;

      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-2xs"
    >
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--ink-soft)] border-b border-[var(--line)] pb-2">
        {t("learn.onThisPage", "On this page")}
      </div>
      <ul className="space-y-1 border-l border-[var(--line)]">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                type="button"
                className={`w-full py-1 text-left text-xs transition-colors line-clamp-2 ${levelStyles[item.level]} ${
                  isActive
                    ? "-ml-px border-l-2 font-bold"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
                style={{
                  borderColor: isActive ? "var(--signal)" : undefined,
                  color: isActive ? "var(--signal)" : undefined,
                }}
              >
                {item.level === 1 ? "H1 · " : item.level === 2 ? "H2 · " : "H3 · "}
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
