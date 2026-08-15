"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { medium, socials } from "@/constants/commons/constants";
import { FaMedium, FaJs, FaReact, FaAngular, FaSearch, FaExternalLinkAlt, FaBolt, FaBookOpen, FaClock, FaTags, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface ArticleItem {
  id: string;
  category: "javascript" | "react" | "angular" | "rxjs";
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  categoryIcon: any;
  title: string;
  content: string;
  medium: string;
  stackblitz?: string;
  readTime: string;
}

const CATEGORY_META = {
  javascript: {
    label: "JavaScript",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: FaJs,
    listUrl: "https://medium.com/@yuvaraj.io/list/javascript-by-yuvaraj-1fc7ba9201f2",
  },
  react: {
    label: "React",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    icon: FaReact,
    listUrl: "https://medium.com/@yuvidev/",
  },
  angular: {
    label: "Angular",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    icon: FaAngular,
    listUrl: "https://medium.com/@yuvayuvaraj720444/angular-intermediate-lessons-acbea2dfc9b",
  },
  rxjs: {
    label: "RxJS Streams",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    icon: FaBolt,
    listUrl: "https://medium.com/@yuvidev/rxjs-operators-section-c965d3690dd4",
  },
};

export default function MediumArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Aggregate all articles into a single typed list
  const allArticles = useMemo<ArticleItem[]>(() => {
    const list: ArticleItem[] = [];

    medium.javascript.forEach((item, idx) => {
      list.push({
        id: `js-${idx}`,
        category: "javascript",
        categoryLabel: CATEGORY_META.javascript.label,
        categoryColor: CATEGORY_META.javascript.color,
        categoryBg: CATEGORY_META.javascript.bg,
        categoryBorder: CATEGORY_META.javascript.border,
        categoryIcon: CATEGORY_META.javascript.icon,
        title: item.title,
        content: item.content,
        medium: item.medium,
        stackblitz: item.stackblitz,
        readTime: "4 min read",
      });
    });

    medium.react.forEach((item, idx) => {
      list.push({
        id: `react-${idx}`,
        category: "react",
        categoryLabel: CATEGORY_META.react.label,
        categoryColor: CATEGORY_META.react.color,
        categoryBg: CATEGORY_META.react.bg,
        categoryBorder: CATEGORY_META.react.border,
        categoryIcon: CATEGORY_META.react.icon,
        title: item.title,
        content: item.content,
        medium: item.medium,
        stackblitz: item.stackblitz,
        readTime: "5 min read",
      });
    });

    medium.angular.forEach((item, idx) => {
      list.push({
        id: `ng-${idx}`,
        category: "angular",
        categoryLabel: CATEGORY_META.angular.label,
        categoryColor: CATEGORY_META.angular.color,
        categoryBg: CATEGORY_META.angular.bg,
        categoryBorder: CATEGORY_META.angular.border,
        categoryIcon: CATEGORY_META.angular.icon,
        title: item.title,
        content: item.content,
        medium: item.medium,
        stackblitz: item.stackblitz,
        readTime: "4 min read",
      });
    });

    medium.rxjs.forEach((item, idx) => {
      list.push({
        id: `rxjs-${idx}`,
        category: "rxjs",
        categoryLabel: CATEGORY_META.rxjs.label,
        categoryColor: CATEGORY_META.rxjs.color,
        categoryBg: CATEGORY_META.rxjs.bg,
        categoryBorder: CATEGORY_META.rxjs.border,
        categoryIcon: CATEGORY_META.rxjs.icon,
        title: item.title,
        content: item.content,
        medium: item.medium,
        stackblitz: item.stackblitz,
        readTime: "3 min read",
      });
    });

    return list;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return allArticles.filter((item) => {
      const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  const featuredArticle = allArticles[1]; // React Components and Props

  return (
    <div className="relative min-h-screen py-10 md:py-16">
      {/* Ambient Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-5xl bg-gradient-to-b from-violet-500/10 via-teal-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200/80 pb-10 dark:border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:border-violet-700/50 dark:bg-violet-950/60 dark:text-violet-300">
              <FaBookOpen className="text-xs" /> Technical Publications
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Engineering Notes on{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Medium.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              In-depth, practical guides exploring React architecture, Angular decorators, RxJS reactive stream pipelines, and modern JavaScript internals.
            </p>
          </div>

          {/* Medium Profile Direct Link */}
          <div className="shrink-0">
            <a
              href={socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-400 hover:shadow-md dark:border-white/10 dark:bg-slate-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <FaMedium className="text-xl" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Read &amp; Follow on</div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  @yuvidev <FaExternalLinkAlt className="text-[0.65rem] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Featured Article Banner */}
        {featuredArticle && selectedCategory === "ALL" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-r from-violet-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-white shadow-2xl"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet-500/30 border border-violet-400/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-violet-200">
                  Featured Publication
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300">
                  <FaClock className="text-[0.65rem]" /> {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 line-clamp-3">
                {featuredArticle.content}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={featuredArticle.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100 hover:-translate-y-0.5"
                >
                  <FaMedium className="text-base" /> Read Full Article
                </a>

                {featuredArticle.stackblitz && (
                  <a
                    href={featuredArticle.stackblitz}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    <FaBolt className="text-amber-400" /> Interactive Sandbox
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Toolbar: Category Badges + Instant Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { key: "ALL", label: `All Topics (${allArticles.length})` },
              { key: "javascript", label: `JavaScript (${medium.javascript.length})`, icon: FaJs, color: "text-amber-500" },
              { key: "react", label: `React (${medium.react.length})`, icon: FaReact, color: "text-cyan-500" },
              { key: "angular", label: `Angular (${medium.angular.length})`, icon: FaAngular, color: "text-rose-500" },
              { key: "rxjs", label: `RxJS (${medium.rxjs.length})`, icon: FaBolt, color: "text-pink-500" },
            ].map((tab) => {
              const isSelected = selectedCategory === tab.key;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {Icon && <Icon className={tab.color} />}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title or keyword..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 shadow-2xs focus:border-violet-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Articles Grid — Grouped by Category with View All */}
        <div className="space-y-12">
          {filteredArticles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center text-sm text-slate-400 dark:border-white/10">
              No articles found matching &ldquo;{searchQuery}&rdquo;. Try another keyword or switch category tab.
            </div>
          ) : selectedCategory === "ALL" && !searchQuery ? (
            // Grouped View: Show each category with a section header + View All button
            Object.entries({
              javascript: {
                articles: filteredArticles.filter((a) => a.category === "javascript"),
                label: "JavaScript",
                icon: FaJs,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
                listUrl: CATEGORY_META.javascript.listUrl,
              },
              react: {
                articles: filteredArticles.filter((a) => a.category === "react"),
                label: "React",
                icon: FaReact,
                color: "text-cyan-500",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
                listUrl: CATEGORY_META.react.listUrl,
              },
              angular: {
                articles: filteredArticles.filter((a) => a.category === "angular"),
                label: "Angular",
                icon: FaAngular,
                color: "text-rose-500",
                bg: "bg-rose-500/10",
                border: "border-rose-500/20",
                listUrl: CATEGORY_META.angular.listUrl,
              },
              rxjs: {
                articles: filteredArticles.filter((a) => a.category === "rxjs"),
                label: "RxJS Streams",
                icon: FaBolt,
                color: "text-pink-500",
                bg: "bg-pink-500/10",
                border: "border-pink-500/20",
                listUrl: CATEGORY_META.rxjs.listUrl,
              },
            })
              .filter(([, group]) => group.articles.length > 0)
              .map(([key, group]) => {
                const SectionIcon = group.icon;
                return (
                  <div key={key}>
                    {/* Section header with View All */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${group.border} ${group.bg}`}>
                          <SectionIcon className={`text-base ${group.color}`} />
                        </div>
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                            {group.label}
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {group.articles.length} article{group.articles.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <a
                        href={group.listUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5 ${group.border} ${group.bg} ${group.color}`}
                      >
                        <span>View All</span>
                        <FaExternalLinkAlt className="text-[0.6rem]" />
                      </a>
                    </div>

                    {/* Articles row */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <AnimatePresence>
                        {group.articles.map((article, idx) => {
                          const Icon = article.categoryIcon;
                          return (
                            <motion.div
                              key={article.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-violet-500/40"
                            >
                              <div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider ${article.categoryBg} ${article.categoryColor} ${article.categoryBorder}`}>
                                    <Icon className="text-[0.6rem]" />
                                    <span>{article.categoryLabel}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-[0.65rem] text-slate-400">
                                    <FaClock className="text-[0.55rem]" /> {article.readTime}
                                  </span>
                                </div>
                                <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-sm font-bold leading-snug text-slate-900 transition group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 line-clamp-2">
                                  <a href={article.medium} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                  </a>
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                                  {article.content}
                                </p>
                              </div>
                              <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-white/5">
                                {article.stackblitz ? (
                                  <a
                                    href={article.stackblitz}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                                  >
                                    <FaBolt className="text-amber-500 text-[0.6rem]" /> Sandbox
                                  </a>
                                ) : (
                                  <span />
                                )}
                                <a
                                  href={article.medium}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700 transition hover:bg-violet-100 dark:bg-violet-950/60 dark:text-violet-300"
                                >
                                  Read <FaArrowRight className="text-[0.55rem]" />
                                </a>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })
          ) : (
            // Filtered view (specific category or search) — flat grid with View All header
            <div>
              {selectedCategory !== "ALL" && (
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const meta = CATEGORY_META[selectedCategory as keyof typeof CATEGORY_META];
                      const SIcon = meta?.icon;
                      return (
                        <>
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl border border-${selectedCategory === "javascript" ? "amber" : selectedCategory === "react" ? "cyan" : selectedCategory === "angular" ? "rose" : "pink"}-500/20 bg-${selectedCategory === "javascript" ? "amber" : selectedCategory === "react" ? "cyan" : selectedCategory === "angular" ? "rose" : "pink"}-500/10`}>
                            {SIcon && <SIcon className={`text-base ${meta.icon === FaJs ? "text-amber-500" : meta.icon === FaReact ? "text-cyan-500" : meta.icon === FaAngular ? "text-rose-500" : "text-pink-500"}`} />}
                          </div>
                          <div>
                            <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                              {meta?.label}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <a
                    href={CATEGORY_META[selectedCategory as keyof typeof CATEGORY_META]?.listUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-100 dark:border-violet-700/40 dark:bg-violet-950/50 dark:text-violet-300"
                  >
                    <span>View All on Medium</span>
                    <FaExternalLinkAlt className="text-[0.6rem]" />
                  </a>
                </div>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {filteredArticles.map((article, idx) => {
                    const Icon = article.categoryIcon;
                    return (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                        className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-violet-500/40"
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-white/5">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider ${article.categoryBg} ${article.categoryColor} ${article.categoryBorder}`}>
                              <Icon className="text-xs" />
                              <span>{article.categoryLabel}</span>
                            </span>
                            <span className="flex items-center gap-1 text-[0.7rem] font-medium text-slate-400">
                              <FaClock className="text-[0.6rem]" /> {article.readTime}
                            </span>
                          </div>
                          <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 leading-snug transition group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400 line-clamp-2">
                            <a href={article.medium} target="_blank" rel="noopener noreferrer">
                              {article.title}
                            </a>
                          </h3>
                          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                            {article.content}
                          </p>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-white/5">
                          {article.stackblitz ? (
                            <a href={article.stackblitz} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                              <FaBolt className="text-amber-500 text-[0.65rem]" /> Sandbox
                            </a>
                          ) : (
                            <span className="text-[0.7rem] text-slate-400">Read on Medium</span>
                          )}
                          <a href={article.medium} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-xl bg-violet-50 px-3.5 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900/60">
                            <span>Read</span>
                            <FaArrowRight className="text-[0.65rem] transition-transform group-hover:translate-x-1" />
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* Curated Medium Publication Lists Banner */}
        <div className="rounded-3xl border border-slate-200 bg-linear-to-b from-slate-50 to-white p-8 sm:p-10 shadow-sm dark:border-white/10 dark:from-slate-900 dark:to-slate-950">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-white/10">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-slate-900 dark:text-white">
                Curated Series on Medium
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore complete learning tracks organized chapter-by-chapter.
              </p>
            </div>
            <a
              href={socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 hover:underline dark:text-violet-400"
            >
              <span>View all lists</span>
              <FaExternalLinkAlt className="text-[0.65rem]" />
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "JavaScript Complete Track",
                desc: "Syntax, closures, event loop, and asynchronous patterns.",
                url: CATEGORY_META.javascript.listUrl,
                icon: FaJs,
                color: "text-amber-500",
              },
              {
                title: "Angular Intermediate Lessons",
                desc: "Component architecture, decorators, signals, and RxJS.",
                url: CATEGORY_META.angular.listUrl,
                icon: FaAngular,
                color: "text-rose-500",
              },
              {
                title: "RxJS Operators Deep-Dive",
                desc: "Creation operators, pipables, and real-time streams.",
                url: CATEGORY_META.rxjs.listUrl,
                icon: FaBolt,
                color: "text-pink-500",
              },
            ].map((track, i) => {
              const TrackIcon = track.icon;
              return (
                <a
                  key={i}
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-violet-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60"
                >
                  <div className="flex items-center justify-between">
                    <TrackIcon className={`text-xl ${track.color}`} />
                    <FaExternalLinkAlt className="text-xs text-slate-400 opacity-60 group-hover:opacity-100 transition" />
                  </div>
                  <h4 className="mt-3 font-[family-name:var(--font-display)] text-base font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition">
                    {track.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {track.desc}
                  </p>
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Connect / Retainer Prompt */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-white/10 dark:bg-slate-900/80">
          <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Have a Technical Question or Want to Collaborate?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Whether you are building an engineering team, need legacy migration, or want consulting on frontend architecture, let&apos;s build together.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-violet-700 hover:-translate-y-0.5"
            >
              <span>Get a Sprint Quote</span>
              <FaBolt className="text-amber-400 text-xs" />
            </Link>
            <Link
              href="/connect"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
