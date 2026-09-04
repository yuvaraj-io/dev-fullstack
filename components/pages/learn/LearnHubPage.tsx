"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaGraduationCap,
  FaBookOpen,
  FaArrowRight,
  FaSearch,
  FaFolder,
  FaCode,
  FaCheckCircle,
} from "react-icons/fa";
import LearnBreadcrumbs from "./LearnBreadcrumbs";
import type { TopicWithStats } from "@/lib/contentQueries";

interface LearnHubPageProps {
  topics: TopicWithStats[];
}

export default function LearnHubPage({ topics }: LearnHubPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return topics;
    return topics.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.sampleArticles.some((a) => a.toLowerCase().includes(query))
    );
  }, [topics, searchQuery]);

  const totalArticles = useMemo(
    () => topics.reduce((acc, t) => acc + t.articleCount, 0),
    [topics]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <LearnBreadcrumbs />

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 sm:p-12 shadow-2xs">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gradient-to-b from-violet-500/10 via-teal-500/5 to-transparent blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--signal-soft)",
              color: "var(--signal)",
              borderColor: "var(--line)",
            }}
          >
            <FaGraduationCap className="text-sm" /> Learning Tracks
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Interactive Full-Stack Architecture &amp; Engineering Guides
          </h1>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--ink-soft)] font-light">
            Select a specialized track below to dive into structured, chapter-by-chapter tutorials, code implementations, and software architecture patterns.
          </p>

          {/* Quick Metrics */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--ink-soft)]">
            <span className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono">
              <FaFolder className="text-amber-500" /> {topics.length} Tracks
            </span>
            <span className="flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono">
              <FaBookOpen className="text-cyan-500" /> {totalArticles} Interactive Articles
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-8 max-w-md">
          <FaSearch className="absolute left-3.5 top-3.5 text-xs text-[var(--ink-soft)]" />
          <input
            type="text"
            placeholder="Search tracks, topics, or lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-xs text-[var(--ink)] shadow-2xs focus:border-[var(--signal)] focus:outline-none"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] mb-6">
          Available Tracks ({filteredTopics.length})
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/learn/${topic.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--signal)] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: "var(--signal-soft)",
                      borderColor: "var(--line)",
                      color: "var(--signal)",
                    }}
                  >
                    <FaCode className="text-[0.6rem]" /> Track
                  </span>
                  <span className="text-[0.7rem] font-mono text-[var(--ink-soft)] font-medium">
                    {topic.articleCount} article{topic.articleCount !== 1 ? "s" : ""}
                  </span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--ink)] group-hover:text-[var(--signal)] transition-colors">
                  {topic.name}
                </h3>

                {topic.sampleArticles.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)] font-mono">
                      Chapters Preview:
                    </div>
                    {topic.sampleArticles.map((sample, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)] font-light truncate"
                      >
                        <FaCheckCircle className="text-[0.55rem] text-emerald-500 shrink-0" />
                        <span className="truncate">{sample}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4 text-xs font-bold transition-colors group-hover:text-[var(--signal)]">
                <span>Start Learning Track</span>
                <FaArrowRight className="text-[0.65rem] transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
