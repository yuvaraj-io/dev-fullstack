"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  FiArrowUpRight, 
  FiExternalLink, 
  FiArrowRight 
} from "react-icons/fi";
import { 
  FaCalendarAlt, 
  FaBug, 
  FaSmile 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ─── 1. UI Pages (Large Editorial Cards) ─────────────────── */
const UI_PAGES = [
  {
    id: "pitchpro",
    title: "Pitch Pro",
    tag: "Next.js · SaaS Platform",
    tagColor: "text-amber-500",
    desc: "AI-driven pitch deck builder and startup presentation canvas with dynamic slide layout generation and real-time design editing.",
    url: "https://pitchpro.yuvaraj.io",
    displayUrl: "pitchpro.yuvaraj.io",
    img: "/assets/portfolio/pitchpro.png",
    context: "Startup Pitch Platform",
  },
  {
    id: "fotofactory",
    title: "Foto Factory",
    tag: "React · Studio Experience",
    tagColor: "text-pink-500",
    desc: "Bespoke photography portfolio and studio client booking platform featuring full-bleed gallery grids and dark editorial typography.",
    url: "https://fotofactory.yuvaraj.io",
    displayUrl: "fotofactory.yuvaraj.io",
    img: "/assets/portfolio/fotofactory.png",
    context: "Photography Studio",
  },
];

/* ─── 2. Developer Tools & Trackers (Horizontal Rows) ─────── */
const DEV_TOOLS = [
  {
    id: "rem-app",
    title: "REM App",
    tag: "Daily Log",
    desc: "Minimalist task notes, daily event logging, and reminder board designed for rapid dev capturing.",
    url: "https://rem.yuvaraj.io",
    displayUrl: "rem.yuvaraj.io",
    icon: FaCalendarAlt,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    pill: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
  },
  {
    id: "debugger",
    title: "JS Debugger",
    tag: "Utility Tool",
    desc: "Interactive JavaScript execution trace visualizer, expression evaluator, and AST playground.",
    url: "https://debugger.yuvaraj.io",
    displayUrl: "debugger.yuvaraj.io",
    icon: FaBug,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
    pill: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  },
  {
    id: "moodboard",
    title: "Moodboard App",
    tag: "Firebase Live",
    desc: "Real-time canvas with live multi-user sync, reactive mood logging, and visual board generation.",
    url: "https://mood.yuvaraj.io",
    displayUrl: "mood.yuvaraj.io",
    icon: FaSmile,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
    pill: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  },
];

/* ─── 3. Collage Projects (Compact Image-Strip Cards) ─────── */
const COLLAGE_PROJECTS = [
  {
    id: "snake-ladders",
    title: "Snake & Ladders",
    tag: "Vue 3 · Game Engine",
    desc: "Interactive multiplayer board game engine with physics animations, turn state machine, and audio effects.",
    url: "https://snake.yuvaraj.io",
    displayUrl: "snake.yuvaraj.io",
    img: "/assets/small-projects/snake.png",
    pill: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  },
  {
    id: "tred",
    title: "Tred Tracker",
    tag: "Zero-Backend PWA",
    desc: "Offline-first attendance management app with persistent browser records and clean zero-backend state.",
    url: "https://tred.yuvaraj.io",
    displayUrl: "tred.yuvaraj.io",
    img: "/assets/small-projects/tred.png",
    pill: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400",
  },
];

/* ─── Main Component ──────────────────────────────────────── */
export default function FeaturedProjectsSection() {
  return (
    <section className="relative py-12 md:py-16" id="featured-projects">
      
      {/* ── Section Header ── */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[var(--line)] pb-8">
        <div>
          {/* Eyebrow badge */}
          <div 
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold shadow-xs backdrop-blur-sm transition-all"
            style={{
              backgroundColor: "var(--signal-soft)",
              color: "var(--signal)",
              borderColor: "var(--line)",
            }}
          >
            <HiSparkles className="text-sm" style={{ color: "var(--signal)" }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
              Selected Work // 2024 — 2026
            </span>
          </div>

          {/* Main Title with Display Font */}
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Featured{" "}
            <span 
              className="bg-clip-text text-transparent transition-all duration-300"
              style={{ backgroundImage: "var(--header-grad)" }}
            >
              Projects.
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-[var(--ink-soft)] md:text-base">
            Curated selection of production web experiences, developer tools, and interactive builds.
          </p>
        </div>

        {/* View All */}
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--card)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--ink)] shadow-2xs transition-all hover:border-[var(--signal)] hover:text-[var(--signal)] md:self-end"
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
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: "var(--signal)" }}>01</span>
            <span className="h-3.5 w-px bg-[var(--line)]" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">
              UI Pages
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--ink-soft)]">2 Live Experiences</span>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {UI_PAGES.map((card) => (
            <a
              key={card.id}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--signal)] hover:shadow-xl shadow-2xs"
            >
              <div>
                {/* Full-Bleed Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-60" />

                  {/* Live Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-md backdrop-blur-md dark:bg-slate-900/95 dark:text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-300 truncate max-w-[140px]">{card.displayUrl}</span>
                  </div>

                  {/* "Open App" Reveal on Hover */}
                  <div 
                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ backgroundColor: "var(--signal)" }}
                  >
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
                    <span className="font-mono text-xs text-[var(--ink-soft)]">{card.context}</span>
                  </div>

                  <h4 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]">
                    {card.title}
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-soft)] font-light">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action Link */}
              <div className="border-t border-[var(--line)] bg-[var(--surface)] px-6 py-3.5 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--ink-soft)]">Explore Production Build</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--ink)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--signal)]">
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
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: "var(--signal)" }}>02</span>
            <span className="h-3.5 w-px bg-[var(--line)]" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">
              Developer Tools &amp; Trackers --ho
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--ink-soft)]">3 Live Tools</span>
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
                className="group flex items-start gap-3.5 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4.5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--signal)] hover:shadow-lg shadow-2xs"
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
                    <h4 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]">
                      {tool.title}
                    </h4>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${tool.pill}`}
                    >
                      {tool.tag}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-[var(--ink-soft)] line-clamp-2 font-light">
                    {tool.desc}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[var(--line)]">
                    <span className="font-mono text-[10px] text-[var(--ink-soft)] truncate max-w-[130px]">
                      {tool.displayUrl}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[var(--ink)] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--signal)]">
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
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: "var(--signal)" }}>03</span>
            <span className="h-3.5 w-px bg-[var(--line)]" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--ink)] md:text-2xl">
              Collage Projects
            </h3>
          </div>
          <span className="font-mono text-xs text-[var(--ink-soft)]">2 Interactive Builds</span>
        </div>

        {/* Compact Image-Strip 2-Col Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {COLLAGE_PROJECTS.map((proj) => (
            <a
              key={proj.id}
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--signal)] hover:shadow-lg shadow-2xs"
            >
              {/* Image Strip */}
              <div className="relative h-40 sm:h-auto sm:w-44 flex-shrink-0 overflow-hidden bg-[var(--surface)]">
                <Image
                  src={proj.img}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>

              {/* Text / Meta */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]">
                      {proj.title}
                    </h4>
                    <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${proj.pill}`}>
                      {proj.tag}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)] line-clamp-2 font-light">
                    {proj.desc}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3">
                  <span className="font-mono text-[10px] text-[var(--ink-soft)]">{proj.displayUrl}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-bold transition-colors group-hover:text-[var(--signal)]" style={{ color: "var(--signal)" }}>
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
