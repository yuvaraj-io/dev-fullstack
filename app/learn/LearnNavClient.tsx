"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState, useMemo } from "react";
import TableOfContents from "@/components/pages/learn/TableOfContents";
import AdPromotionCard from "@/components/pages/learn/AdPromotionCard";
import type { TocItem } from "@/lib/blogToc";
import type { GroupedSection } from "@/lib/contentQueries";
import {
  FaBookOpen,
  FaFolder,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

interface LearnNavClientProps {
  sections: GroupedSection[];
  encodedLearnId: string;
  selectedBlogEncoded: string | null;
  tocItems: TocItem[];
  children: React.ReactNode;
}

export default function LearnNavClient({
  sections,
  encodedLearnId,
  selectedBlogEncoded,
  tocItems,
  children,
}: LearnNavClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (encodedId: string) => {
    startTransition(() => {
      router.push(`/learn?id=${encodedLearnId}&blog=${encodedId}`);
    });
  };

  // Filter sections and collections based on search query
  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sections;

    return sections
      .map((sec) => {
        const matchesSection = sec.section_name.toLowerCase().includes(query);
        const filteredCollections = sec.collections.filter((col) =>
          col.collection_title.toLowerCase().includes(query)
        );

        if (matchesSection || filteredCollections.length > 0) {
          return {
            ...sec,
            collections: matchesSection ? sec.collections : filteredCollections,
          };
        }
        return null;
      })
      .filter((s): s is GroupedSection => s !== null);
  }, [sections, searchQuery]);

  const totalArticles = useMemo(() => {
    return sections.reduce((acc, s) => acc + (s.collections?.length || 0), 0);
  }, [sections]);

  const loadingBlog = (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8">
      <div className="mb-4 h-9 w-2/3 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={`blog-line-${i}`}
            className="h-4 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/60"
          />
        ))}
      </div>
    </div>
  );

  const collectionsList = (
    <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-3.5 lg:max-h-[calc(100vh-17rem)]">
      {filteredSections.length === 0 ? (
        <div className="p-4 text-center text-xs text-[var(--ink-soft)] font-mono">
          No articles match "{searchQuery}"
        </div>
      ) : (
        filteredSections.map((c) => (
          <div key={`${c.sectionId}-${c.section_name}`} className="space-y-1">
            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <FaFolder
                className="text-[0.68rem]"
                style={{ color: "var(--signal)" }}
              />
              <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--ink-soft)] truncate">
                {c.section_name}
              </h2>
            </div>

            <div className="space-y-0.5">
              {c.collections &&
                c.collections.map((s) => {
                  const encodedId = btoa(String(s.collectionId));
                  const isActive = encodedId === selectedBlogEncoded;

                  return (
                    <button
                      key={s.collectionId}
                      className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition flex items-center justify-between gap-2 border ${
                        isActive
                          ? "border-[var(--signal)] bg-[var(--signal)] text-white shadow-xs font-semibold"
                          : "border-transparent text-[var(--ink)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? "var(--signal)"
                          : undefined,
                        color: isActive ? "var(--signal-text, #ffffff)" : undefined,
                      }}
                      onClick={() => {
                        handleSelect(encodedId);
                        setIsMobileCollectionsOpen(false);
                      }}
                      type="button"
                    >
                      <span className="line-clamp-2 leading-snug">
                        {s.collection_title}
                      </span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white shrink-0" />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="w-full">
      {/* 3-Column Layout: Stagnant Left, Scrolling Middle, Stagnant Right */}
      <div className="flex flex-col gap-5 pb-12 lg:flex-row items-start">
        {/* Left — stagnant collections nav sidebar */}
        <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-3.5 shadow-2xs flex flex-col">
            {/* Header with count */}
            <div className="mb-2.5 hidden items-center justify-between px-2 pb-2 border-b border-[var(--line)] text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] lg:flex shrink-0">
              <div className="flex items-center gap-1.5">
                <FaBookOpen
                  className="text-xs"
                  style={{ color: "var(--signal)" }}
                />
                <span className="text-[var(--ink)]">Articles</span>
              </div>
              <span className="text-[0.65rem] bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-soft)] px-2 py-0.5 rounded-full font-mono font-bold">
                {totalArticles}
              </span>
            </div>

            {/* Instant Search Bar */}
            <div className="relative mb-2.5 shrink-0">
              <FaSearch className="absolute left-3 top-2.5 text-xs text-[var(--ink-soft)]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] pl-8 pr-7 py-1.5 text-xs text-[var(--ink)] placeholder-[var(--ink-soft)] focus:border-[var(--signal)] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)]"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Mobile Collapsible Header */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileCollectionsOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--ink)] border border-[var(--line)]"
              >
                <div className="flex items-center gap-2">
                  <FaBookOpen style={{ color: "var(--signal)" }} />
                  <span className="uppercase tracking-wider">Browse Articles ({totalArticles})</span>
                </div>
                {isMobileCollectionsOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isMobileCollectionsOpen && (
                <div className="mt-3 pt-2 border-t border-[var(--line)]">
                  {collectionsList}
                </div>
              )}
            </div>

            {/* Desktop list */}
            <div className="hidden lg:block flex-1 min-h-0">{collectionsList}</div>
          </div>
        </aside>

        {/* Centre — article content (the ONLY section that scrolls vertically with the page) */}
        <main className="min-w-0 flex-1 w-full">
          {isPending ? loadingBlog : children}

          {/* Mobile bottom ad banner (Separate from article & TOC) */}
          <div className="mt-8 xl:hidden">
            <AdPromotionCard />
          </div>
        </main>

        {/* Right — Table of Contents and Separate Promotional Section */}
        <aside className="hidden w-64 shrink-0 xl:flex xl:flex-col xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto space-y-4">
          {tocItems.length > 0 && (
            <TableOfContents items={tocItems} />
          )}

          {/* Standalone Promotional Section */}
          <AdPromotionCard />
        </aside>
      </div>
    </div>
  );
}
