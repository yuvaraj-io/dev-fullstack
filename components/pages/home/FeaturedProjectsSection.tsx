"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight, FiExternalLink, FiCalendar, FiSmile } from "react-icons/fi";
import { TbBug } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";

/* ─── 1. UI Pages Data ────────────────────────────────────── */
const UI_PAGES = [
  {
    id: "pitchpro",
    title: "Pitch Pro",
    tag: "STARTUP · PITCH DECK",
    context: "Startup pitch proposal & investor narrative platform",
    desc: "Interactive pitch presentation platform designed to help founders craft compelling company decks and connect directly with targeted angel & VC investors.",
    url: "https://pitchpro.yuvaraj.io",
    displayUrl: "pitchpro.yuvaraj.io",
    img: "/assets/portfolio/pitchpro.png",
    accent: "#7c3aed",
    accentHoverBorder: "group-hover:border-violet-400",
    accentGlow: "group-hover:shadow-[0_20px_45px_-12px_rgba(124,58,237,0.22)]",
    tagColor: "text-violet-600",
  },
  {
    id: "fotofactory",
    title: "Foto Factory",
    tag: "PHOTOGRAPHY · STUDIO",
    context: "Photography studio showcase & client booking portal",
    desc: "Commercial photoshoot showcase engineered for visual photographers to display high-resolution client albums, package tiers, and streamline photoshoot bookings.",
    url: "https://fotofactory.yuvaraj.io",
    displayUrl: "fotofactory.yuvaraj.io",
    img: "/assets/portfolio/fotofactory.png",
    accent: "#0284c7",
    accentHoverBorder: "group-hover:border-sky-400",
    accentGlow: "group-hover:shadow-[0_20px_45px_-12px_rgba(2,132,199,0.22)]",
    tagColor: "text-sky-600",
  },
];

/* ─── 2. Dev Tools & Trackers Data ────────────────────────── */
const DEV_TOOLS = [
  {
    id: "rem",
    title: "REM App",
    tag: "Tracker",
    url: "https://rem.yuvaraj.io",
    displayUrl: "rem.yuvaraj.io",
    desc: "Contextual task & to-do tracker with local group categorization.",
    icon: FiCalendar,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100/80 group-hover:bg-violet-600 group-hover:text-white",
    pill: "bg-violet-50 text-violet-700 border-violet-200/80",
    hoverBorder: "hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10",
  },
  {
    id: "debugger",
    title: "JS Debugger",
    tag: "Dev Tool",
    url: "https://debug.yuvaraj.io",
    displayUrl: "debug.yuvaraj.io",
    desc: "Generates runtime execution debuggers for JavaScript functions.",
    icon: TbBug,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-100/80 group-hover:bg-rose-600 group-hover:text-white",
    pill: "bg-rose-50 text-rose-700 border-rose-200/80",
    hoverBorder: "hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/10",
  },
  {
    id: "mood",
    title: "Moodboard",
    tag: "Firebase Live",
    url: "https://mood.yuvaraj.io",
    displayUrl: "mood.yuvaraj.io",
    desc: "Realtime moodboard canvas with color palettes, notes & pins.",
    icon: FiSmile,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100/80 group-hover:bg-amber-500 group-hover:text-white",
    pill: "bg-amber-50 text-amber-800 border-amber-200/80",
    hoverBorder: "hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10",
  },
];

/* ─── 3. Collage Projects Data ────────────────────────────── */
const COLLAGE_PROJECTS = [
  {
    id: "snake",
    title: "Snake & Ladders",
    tag: "Vue 3 · Game",
    desc: "Multiplayer turn-based board game with animated dice rolls, ladder shortcuts, and reactive Vue state.",
    url: "https://snake.yuvaraj.io",
    displayUrl: "snake.yuvaraj.io",
    img: "/assets/small-projects/snake.png",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "tred",
    title: "Tred",
    tag: "JS · LocalStorage",
    desc: "Offline-first attendance management app with persistent browser records and clean zero-backend state.",
    url: "https://tred.yuvaraj.io",
    displayUrl: "tred.yuvaraj.io",
    img: "/assets/small-projects/tred.png",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
];

/* ─── Main Component ──────────────────────────────────────── */
export default function FeaturedProjectsSection() {
  return (
    <section className="relative py-12 md:py-16" id="featured-projects">
      
      {/* ── Section Header ── */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200/80 pb-8">
        <div>
          {/* Eyebrow badge */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-3.5 py-1 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur-sm">
            <HiSparkles className="text-violet-500 text-sm" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
              Selected Work // 2024 — 2026
            </span>
          </div>

          {/* Main Title with Display Font */}
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Projects.
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-slate-500 md:text-base">
            Curated selection of production web experiences, developer tools, and interactive builds.
          </p>
        </div>

        {/* View All */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 md:self-end"
        >
          <span>All Portfolio</span>
          <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* =======================================================
          1. UI PAGES (Large Editorial Cards — 2 Column)
      ======================================================= */}
      <div className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-600">01</span>
            <span className="h-3.5 w-px bg-slate-300" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              UI Pages
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">2 Live Experiences</span>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {UI_PAGES.map((card) => (
            <a
              key={card.id}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-400 hover:-translate-y-1.5 ${card.accentHoverBorder} ${card.accentGlow}`}
            >
              <div>
                {/* Full-Bleed Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />

                  {/* Live Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-800 shadow-md backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 truncate max-w-[140px]">{card.displayUrl}</span>
                  </div>

                  {/* "Open App" Reveal on Hover */}
                  <div className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-xl backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-slate-900 hover:text-white">
                    <span>Open App</span>
                    <FiExternalLink className="text-xs" />
                  </div>
                </div>

                {/* Tight Typographic Meta */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${card.tagColor}`}>
                      {card.tag}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{card.context}</span>
                  </div>

                  <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-violet-600">
                    {card.title}
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action Link */}
              <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3.5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Explore Production Build</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-slate-800 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-violet-600">
                  <span>Visit site</span>
                  <span>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* =======================================================
          2. DEVELOPER TOOLS & TRACKERS (Horizontal List Rows — 3 Col)
      ======================================================= */}
      <div className="mb-14">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-600">02</span>
            <span className="h-3.5 w-px bg-slate-300" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              Developer Tools &amp; Trackers
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">3 Live Tools</span>
        </div>

        {/* Compact, Scannable 3-Col Horizontal Rows */}
        <div className="grid gap-4 md:grid-cols-3">
          {DEV_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4.5 transition-all duration-200 ${tool.hoverBorder}`}
              >
                {/* Icon Box */}
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${tool.iconBg} ${tool.iconColor}`}
                >
                  <Icon className="text-xl" />
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-slate-950">
                      {tool.title}
                    </h4>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${tool.pill}`}
                    >
                      {tool.tag}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {tool.desc}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100/80">
                    <span className="font-mono text-[10px] text-slate-400 truncate max-w-[130px]">
                      {tool.displayUrl}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-slate-700 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-slate-950">
                      <span>Launch</span>
                      <FiArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* =======================================================
          3. COLLAGE PROJECTS (Compact Image-Strip Cards — 2 Col)
      ======================================================= */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-600">03</span>
            <span className="h-3.5 w-px bg-slate-300" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
              Collage Projects
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">2 Interactive Builds</span>
        </div>

        {/* Compact Image-Strip 2-Col Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {COLLAGE_PROJECTS.map((proj) => (
            <a
              key={proj.id}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              {/* Image Strip */}
              <div className="relative h-40 sm:h-auto sm:w-44 flex-shrink-0 overflow-hidden bg-slate-100">
                <Image
                  src={proj.img}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />
              </div>

              {/* Text / Meta */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600">
                      {proj.title}
                    </h4>
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${proj.pill}`}>
                      {proj.tag}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {proj.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="font-mono text-[10px] text-slate-400">{proj.displayUrl}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                    <span>Try App</span>
                    <FiArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
