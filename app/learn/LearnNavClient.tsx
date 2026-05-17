"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

interface SectionCollectionRow {
  sectionId: number;
  section_name: string;
  collectionId: number;
  collection_title: string;
  topic_title: string;
  topicId: number;
  [key: string]: any;
}

interface GroupedSection {
  sectionId: number;
  section_name: string;
  collections: SectionCollectionRow[];
}

interface LearnNavClientProps {
  sections: GroupedSection[];
  encodedLearnId: string;
  selectedBlogEncoded: string | null;
  children: React.ReactNode;
}

export default function LearnNavClient({
  sections,
  encodedLearnId,
  selectedBlogEncoded,
  children,
}: LearnNavClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] =
    useState(false);

  const handleSelect = (encodedId: string) => {
    startTransition(() => {
      router.push(`/learn?id=${encodedLearnId}&blog=${encodedId}`);
    });
  };

  const loadingBlog = (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
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
    <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-3 lg:max-h-[70vh]">
      {sections.map((c) => (
        <div
          key={`${c.sectionId}-${c.section_name}`}
          className="mt-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {c.section_name}
            </div>
          </div>

          <div className="space-y-3">
            {c.collections &&
              c.collections.map((s) => {
                const encodedId = btoa(String(s.collectionId));
                const isActive =
                  encodedId === selectedBlogEncoded;

                return (
                  <button
                    key={s.id}
                    className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition ring-1 ring-transparent ${
                      isActive
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                    onClick={() => handleSelect(encodedId)}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <span className="line-clamp-2">
                        {s.collection_title}
                      </span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 pb-12 lg:flex-row">
      <aside className="w-full border-b border-slate-200 pb-4 lg:w-1/4 lg:max-w-xs lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
        <div className="lg:sticky lg:top-24">
          <div className="mb-3 hidden text-xs uppercase tracking-[0.3em] text-slate-500 lg:block">
            Collections
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() =>
                setIsMobileCollectionsOpen((v) => !v)
              }
              className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Collections
              </span>
              <span className="text-slate-500">
                {isMobileCollectionsOpen ? "−" : "+"}
              </span>
            </button>
            {isMobileCollectionsOpen && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                {collectionsList}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            {collectionsList}
          </div>
        </div>
      </aside>
      <div className="w-full lg:w-3/4">
        {isPending ? loadingBlog : children}
      </div>
    </div>
  );
}
