"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stackblitz, socials } from "@/constants/commons/constants";
import { 
  FaReact, 
  FaAngular, 
  FaVuejs, 
  FaJs, 
  FaBolt, 
  FaSearch, 
  FaExternalLinkAlt, 
  FaCode, 
  FaPlay, 
  FaArrowRight 
} from "react-icons/fa";
import { SiStackblitz, SiTypescript } from "react-icons/si";

interface CollectionItem {
  id: string;
  category: "angular" | "react" | "vue" | "rxjs" | "js";
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  categoryBorder: string;
  categoryIcon: any;
  title: string;
  description: string;
  url: string;
}

const CATEGORY_META = {
  angular: {
    label: "Angular",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    icon: FaAngular,
    collectionUrl: "https://stackblitz.com/@yuvaraj.io/collections/angular-v17-features",
  },
  react: {
    label: "React",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    icon: FaReact,
    collectionUrl: "https://stackblitz.com/@yuvaraj.io/collections/react",
  },
  vue: {
    label: "Vue.js",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: FaVuejs,
    collectionUrl: "https://stackblitz.com/@yuvaraj.io/collections/vue-js",
  },
  rxjs: {
    label: "RxJS Streams",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
    icon: FaBolt,
    collectionUrl: "https://stackblitz.com/@yuvaraj.io/collections/rxjs-fundamentals",
  },
  js: {
    label: "JavaScript",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: FaJs,
    collectionUrl: "https://stackblitz.com/@yuvaraj.io/collections/javascript-learn",
  },
};

export default function StackblitzCollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Aggregate all collections into a single structured list
  const allCollections = useMemo<CollectionItem[]>(() => {
    const list: CollectionItem[] = [];

    stackblitz.angular.forEach((item, idx) => {
      list.push({
        id: `ng-${idx}`,
        category: "angular",
        categoryLabel: CATEGORY_META.angular.label,
        categoryColor: CATEGORY_META.angular.color,
        categoryBg: CATEGORY_META.angular.bg,
        categoryBorder: CATEGORY_META.angular.border,
        categoryIcon: CATEGORY_META.angular.icon,
        title: item.title,
        description: item.description,
        url: item.url,
      });
    });

    stackblitz.react.forEach((item, idx) => {
      list.push({
        id: `react-${idx}`,
        category: "react",
        categoryLabel: CATEGORY_META.react.label,
        categoryColor: CATEGORY_META.react.color,
        categoryBg: CATEGORY_META.react.bg,
        categoryBorder: CATEGORY_META.react.border,
        categoryIcon: CATEGORY_META.react.icon,
        title: item.title,
        description: item.description,
        url: item.url,
      });
    });

    stackblitz.vue.forEach((item, idx) => {
      list.push({
        id: `vue-${idx}`,
        category: "vue",
        categoryLabel: CATEGORY_META.vue.label,
        categoryColor: CATEGORY_META.vue.color,
        categoryBg: CATEGORY_META.vue.bg,
        categoryBorder: CATEGORY_META.vue.border,
        categoryIcon: CATEGORY_META.vue.icon,
        title: item.title,
        description: item.description,
        url: item.url,
      });
    });

    stackblitz.rxjs.forEach((item, idx) => {
      list.push({
        id: `rxjs-${idx}`,
        category: "rxjs",
        categoryLabel: CATEGORY_META.rxjs.label,
        categoryColor: CATEGORY_META.rxjs.color,
        categoryBg: CATEGORY_META.rxjs.bg,
        categoryBorder: CATEGORY_META.rxjs.border,
        categoryIcon: CATEGORY_META.rxjs.icon,
        title: item.title,
        description: item.description,
        url: item.url,
      });
    });

    stackblitz.js.forEach((item, idx) => {
      list.push({
        id: `js-${idx}`,
        category: "js",
        categoryLabel: CATEGORY_META.js.label,
        categoryColor: CATEGORY_META.js.color,
        categoryBg: CATEGORY_META.js.bg,
        categoryBorder: CATEGORY_META.js.border,
        categoryIcon: CATEGORY_META.js.icon,
        title: item.title,
        description: item.description,
        url: item.url,
      });
    });

    return list;
  }, []);

  // Filtered collections
  const filteredCollections = useMemo(() => {
    return allCollections.filter((item) => {
      const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [allCollections, selectedCategory, searchQuery]);

  const featuredCollection = allCollections[0]; // Angular v17 Features

  return (
    <div className="relative min-h-screen py-10 md:py-16">
      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-5xl bg-gradient-to-b from-blue-500/10 via-violet-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--line)] pb-10">
          <div className="max-w-3xl">
            <div 
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all"
              style={{
                backgroundColor: "var(--signal-soft)",
                color: "var(--signal)",
                borderColor: "var(--line)",
              }}
            >
              <SiStackblitz className="text-xs" /> Interactive Cloud Sandboxes
            </div>

            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
              Engineering Code on{" "}
              <span 
                className="bg-clip-text text-transparent transition-all duration-300"
                style={{ backgroundImage: "var(--header-grad)" }}
              >
                StackBlitz.
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg font-light">
              Live, browser-executable code repositories and component sandboxes exploring Angular, React, Vue 3, RxJS reactive streams, and core JavaScript patterns.
            </p>
          </div>

          {/* StackBlitz Profile Link Card */}
          <div className="shrink-0">
            <a
              href="https://stackblitz.com/@yuvaraj.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3.5 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-2xs transition hover:border-[var(--signal)] hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1389FD] text-white shadow-md">
                <SiStackblitz className="text-xl" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-[var(--ink-soft)]">View Collections on</div>
                <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] flex items-center gap-1 group-hover:text-[var(--signal)] transition-colors">
                  @yuvaraj.io <FaExternalLinkAlt className="text-[0.65rem] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Featured Collection Hero Banner */}
        {featuredCollection && selectedCategory === "ALL" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 p-8 sm:p-12 text-white shadow-2xl"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-500/30 border border-blue-400/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-blue-200">
                  Featured Collection
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 font-mono">
                  <SiStackblitz className="text-[0.7rem] text-blue-400" /> Instant Dev Environment
                </span>
              </div>

              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {featuredCollection.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300 font-light line-clamp-3">
                {featuredCollection.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={featuredCollection.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100 hover:-translate-y-0.5"
                >
                  <FaPlay className="text-xs text-blue-600" /> Launch Workspace
                </a>

                <a
                  href="https://stackblitz.com/@yuvaraj.io/collections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 font-[family-name:var(--font-display)] text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  <FaCode className="text-teal-400" /> Browse All 26 Sandboxes
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Toolbar: Category Badges + Instant Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { key: "ALL", label: `All Topics (${allCollections.length})` },
              { key: "angular", label: `Angular (${stackblitz.angular.length})`, icon: FaAngular, color: "text-rose-500" },
              { key: "react", label: `React (${stackblitz.react.length})`, icon: FaReact, color: "text-cyan-500" },
              { key: "vue", label: `Vue (${stackblitz.vue.length})`, icon: FaVuejs, color: "text-emerald-500" },
              { key: "rxjs", label: `RxJS (${stackblitz.rxjs.length})`, icon: FaBolt, color: "text-pink-500" },
              { key: "js", label: `JavaScript (${stackblitz.js.length})`, icon: FaJs, color: "text-amber-500" },
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
                      ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
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
              placeholder="Search sandboxes by keyword..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 shadow-2xs focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Collections Grid — Grouped by Category with View All */}
        <div className="space-y-14">
          {filteredCollections.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center text-sm text-slate-400 dark:border-white/10">
              No sandboxes found matching &ldquo;{searchQuery}&rdquo;. Try another keyword or switch category tab.
            </div>
          ) : selectedCategory === "ALL" && !searchQuery ? (
            // Grouped View: Show each category with a section header + View All button
            Object.entries({
              angular: {
                items: filteredCollections.filter((c) => c.category === "angular"),
                label: "Angular Sandboxes",
                icon: FaAngular,
                color: "text-rose-500",
                bg: "bg-rose-500/10",
                border: "border-rose-500/20",
                collectionUrl: CATEGORY_META.angular.collectionUrl,
              },
              react: {
                items: filteredCollections.filter((c) => c.category === "react"),
                label: "React Sandboxes",
                icon: FaReact,
                color: "text-cyan-500",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
                collectionUrl: CATEGORY_META.react.collectionUrl,
              },
              vue: {
                items: filteredCollections.filter((c) => c.category === "vue"),
                label: "Vue 3 Sandboxes",
                icon: FaVuejs,
                color: "text-emerald-500",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
                collectionUrl: CATEGORY_META.vue.collectionUrl,
              },
              rxjs: {
                items: filteredCollections.filter((c) => c.category === "rxjs"),
                label: "RxJS Stream Sandboxes",
                icon: FaBolt,
                color: "text-pink-500",
                bg: "bg-pink-500/10",
                border: "border-pink-500/20",
                collectionUrl: CATEGORY_META.rxjs.collectionUrl,
              },
              js: {
                items: filteredCollections.filter((c) => c.category === "js"),
                label: "JavaScript Sandboxes",
                icon: FaJs,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
                collectionUrl: CATEGORY_META.js.collectionUrl,
              },
            })
              .filter(([, group]) => group.items.length > 0)
              .map(([key, group]) => {
                const SectionIcon = group.icon;
                return (
                  <div key={key}>
                    {/* Section header with View All */}
                    <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${group.border} ${group.bg}`}>
                          <SectionIcon className={`text-base ${group.color}`} />
                        </div>
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                            {group.label}
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {group.items.length} interactive build{group.items.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <a
                        href={group.collectionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-bold transition hover:-translate-y-0.5 ${group.border} ${group.bg} ${group.color}`}
                      >
                        <span>View Collection</span>
                        <FaExternalLinkAlt className="text-[0.6rem]" />
                      </a>
                    </div>

                    {/* Sandboxes row */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <AnimatePresence>
                        {group.items.map((item, idx) => {
                          const Icon = item.categoryIcon;
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3, delay: idx * 0.05 }}
                              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-blue-500/40"
                            >
                              <div>
                                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider ${item.categoryBg} ${item.categoryColor} ${item.categoryBorder}`}>
                                    <Icon className="text-[0.6rem]" />
                                    <span>{item.categoryLabel}</span>
                                  </span>
                                  <span className="flex items-center gap-1 font-mono text-[0.65rem] text-blue-500">
                                    <SiStackblitz className="text-[0.6rem]" /> Sandbox
                                  </span>
                                </div>

                                <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-sm font-bold leading-snug text-slate-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">
                                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                  </a>
                                </h3>

                                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3 font-light">
                                  {item.description}
                                </p>
                              </div>

                              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5">
                                <span className="font-mono text-[10px] text-slate-400">Live Workspace</span>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                                >
                                  <span>Run</span>
                                  <FaArrowRight className="text-[0.55rem]" />
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
            // Filtered view (specific category or search) — flat grid
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-mono text-slate-500">
                  Showing {filteredCollections.length} sandbox{filteredCollections.length !== 1 ? "es" : ""}
                </p>
                <a
                  href="https://stackblitz.com/@yuvaraj.io/collections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
                >
                  <span>StackBlitz Profile</span>
                  <FaExternalLinkAlt className="text-[0.6rem]" />
                </a>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <AnimatePresence>
                  {filteredCollections.map((item, idx) => {
                    const Icon = item.categoryIcon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                        className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-blue-500/40"
                      >
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-white/5">
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider ${item.categoryBg} ${item.categoryColor} ${item.categoryBorder}`}>
                              <Icon className="text-[0.6rem]" />
                              <span>{item.categoryLabel}</span>
                            </span>
                            <span className="flex items-center gap-1 font-mono text-[0.65rem] text-blue-500">
                              <SiStackblitz className="text-[0.6rem]" /> Sandbox
                            </span>
                          </div>

                          <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-sm font-bold leading-snug text-slate-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              {item.title}
                            </a>
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3 font-light">
                            {item.description}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/5">
                          <span className="font-mono text-[10px] text-slate-400">Live Workspace</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                          >
                            <span>Run</span>
                            <FaArrowRight className="text-[0.55rem]" />
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

        {/* Footer Profile Banner */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-slate-900/60">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate-900 dark:text-white">
            Looking for all StackBlitz sandboxes?
          </h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-light">
            Explore 26+ interactive code sandboxes across Angular Signals, NGRX, React Redux Toolkit, Vue 3.0, and RxJS pipelines on StackBlitz.
          </p>
          <div className="mt-6">
            <a
              href="https://stackblitz.com/@yuvaraj.io/collections"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              <SiStackblitz />
              <span>Visit @yuvaraj.io on StackBlitz</span>
              <FaExternalLinkAlt className="text-[0.65rem]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
