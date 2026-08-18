"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import TableOfContents from "@/components/pages/learn/TableOfContents";
import type { TocItem } from "@/lib/blogToc";
import type { GroupedSection } from "@/lib/contentQueries";
import { FaBookOpen, FaFolder, FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  const handleSelect = (encodedId: string) => {
    startTransition(() => {
      router.push(`/learn?id=${encodedLearnId}&blog=${encodedId}`);
    });
  };

  const loadingBlog = (
    <div className="learn-article-surface p-6 sm:p-8">
      <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={`blog-line-${i}`}
            className="h-4 w-full animate-pulse rounded bg-slate-100"
          />
        ))}
      </div>
    </div>
  );

  const collectionsList = (
    <div className="max-h-[55vh] overflow-y-auto pr-1.5 space-y-4 lg:max-h-[72vh]">
      {sections.map((c) => (
        <div key={`${c.sectionId}-${c.section_name}`} className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-2 py-1">
            <FaFolder className="text-violet-500 text-[0.7rem]" />
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-slate-500">
              {c.section_name}
            </h2>
          </div>

          <div className="space-y-1">
            {c.collections &&
              c.collections.map((s) => {
                const encodedId = btoa(String(s.collectionId));
                const isActive = encodedId === selectedBlogEncoded;

                return (
                  <button
                    key={s.collectionId}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition flex items-center justify-between gap-2 ${
                      isActive
                        ? "bg-violet-600 text-white shadow-xs font-semibold"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
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
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-12 lg:flex-row items-start">
      {/* Left — collections nav sidebar */}
      <aside className="w-full lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-24 rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-xs">
          <div className="mb-2.5 hidden items-center justify-between px-2 pb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500 lg:flex">
            <div className="flex items-center gap-1.5">
              <FaBookOpen className="text-violet-600 text-xs" />
              <span>Articles</span>
            </div>
            <span className="text-[0.65rem] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
              {sections.reduce((acc, s) => acc + (s.collections?.length || 0), 0)}
            </span>
          </div>

          {/* Mobile Collapsible Header */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileCollectionsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700"
            >
              <div className="flex items-center gap-2">
                <FaBookOpen className="text-violet-600" />
                <span className="uppercase tracking-wider">Browse Articles</span>
              </div>
              {isMobileCollectionsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isMobileCollectionsOpen && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                {collectionsList}
              </div>
            )}
          </div>

          <div className="hidden lg:block">{collectionsList}</div>
        </div>
      </aside>

      {/* Centre — article content */}
      <main className="min-w-0 flex-1 w-full">
        {isPending ? loadingBlog : children}
      </main>

      {/* Right — table of contents */}
      {tocItems.length > 0 && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <TableOfContents items={tocItems} />
        </aside>
      )}
    </div>
  );
}

