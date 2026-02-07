"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

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

  const handleSelect = (encodedId: string) => {
    startTransition(() => {
      router.push(`/learn?id=${encodedLearnId}&blog=${encodedId}`);
    });
  };

  const loadingBlog = (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="mb-4 h-8 w-2/3 animate-pulse rounded bg-slate-700/60" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={`blog-line-${i}`}
            className="h-4 w-full animate-pulse rounded bg-slate-800/60"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex gap-6 pb-12">
      <aside className="w-1/4 max-w-xs border-r border-slate-800 pr-4">
        <div className="sticky top-24">
          <div className="mb-3 text-xs uppercase tracking-[0.3em] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
            Collections
          </div>
          <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-3">
            {sections.map((c: any) => (
              <div
                key={`${c.sectionId}-${c.section_name}`}
                className="mt-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-purple-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent">
                    {c.section_name}
                  </div>
                </div>

                <div className="space-y-3">
                  {c.collections &&
                    c.collections.map((s: any) => {
                      const encodedId = btoa(
                        String(s.collectionId)
                      );
                      const isActive =
                        encodedId === selectedBlogEncoded;

                      return (
                        <button
                          key={s.id}
                          className={`w-full rounded-md px-3 py-2.5 text-left text-sm transition ring-1 ring-transparent ${
                            isActive
                              ? "bg-purple-500/20 text-white ring-1 ring-purple-400/70"
                              : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
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
        </div>
      </aside>
      <div className="w-3/4">
        {isPending ? loadingBlog : children}
      </div>
    </div>
  );
}
