"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; text: string };

export default function TableOfContents({ items }: { items: TocItem[] }) {
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
    <aside className="hidden w-52 shrink-0 xl:block">
      <div className="sticky top-24">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          On this page
        </div>
        <ul className="space-y-1 border-l border-slate-200">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  type="button"
                  className={`w-full py-1 pl-3 text-left text-sm transition-colors line-clamp-2 ${
                    isActive
                      ? "-ml-px border-l-2 border-blue-500 font-medium text-blue-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
