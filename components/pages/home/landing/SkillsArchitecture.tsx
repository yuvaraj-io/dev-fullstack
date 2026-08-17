"use client";

import { useState } from "react";
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaTools, 
  FaArrowRight, 
  FaCheckCircle, 
  FaLayerGroup, 
  FaNetworkWired,
  FaBolt
} from "react-icons/fa";
import { 
  SiReact, 
  SiAngular, 
  SiVuedotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiRedux, 
  SiReactivex, 
  SiGit, 
  SiFigma, 
  SiHtml5 
} from "react-icons/si";
import type { IconType } from "react-icons";

interface SkillPillar {
  id: string;
  title: string;
  badge: string;
  icon: IconType;
  accent: string;
  glow: string;
  description: string;
  architecturalRole: string;
  skills: {
    name: string;
    icon: IconType;
    level: "Core" | "Advanced" | "Proficient";
    detail: string;
    color?: string;
  }[];
  keyCapabilities: string[];
}

const PILLARS: SkillPillar[] = [
  {
    id: "frontend",
    title: "Frontend & Reactive UIs",
    badge: "Client Layer",
    icon: FaCode,
    accent: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.25)",
    description:
      "Crafting performant, accessible, and fluid component architectures that respond dynamically to user input.",
    architecturalRole:
      "Client-side state management, reactive event handling, component lifecycle optimization, and accessible responsive design.",
    skills: [
      { name: "React", icon: SiReact, level: "Core", detail: "Hooks, Suspense, Next.js, component architecture", color: "#38bdf8" },
      { name: "Angular", icon: SiAngular, level: "Core", detail: "Services, Dependency Injection, signals & templates", color: "#ef4444" },
      { name: "Vue 3", icon: SiVuedotjs, level: "Advanced", detail: "Composition API, reactivity, state store", color: "#4ade80" },
      { name: "TypeScript", icon: SiTypescript, level: "Core", detail: "Strict type safety, generics, schema definitions", color: "#60a5fa" },
      { name: "JavaScript", icon: SiJavascript, level: "Core", detail: "ESNext, event loop, async/await, closures", color: "#facc15" },
      { name: "RxJS", icon: SiReactivex, level: "Advanced", detail: "Observable streams, operators, reactive state", color: "#f43f5e" },
      { name: "HTML5 / CSS3", icon: SiHtml5, level: "Core", detail: "Semantic HTML, Flex/Grid, bespoke animation", color: "#fb923c" },
    ],
    keyCapabilities: [
      "Modular design systems & component libraries",
      "Sub-second First Contentful Paint & Core Web Vitals",
      "Seamless client routing & deep linking",
    ],
  },
  {
    id: "backend",
    title: "Backend & Service Layer",
    badge: "Services & APIs",
    icon: FaServer,
    accent: "#6366f1",
    glow: "rgba(99, 102, 241, 0.25)",
    description:
      "Building resilient REST APIs, authentication pipelines, and structured services designed for high throughput.",
    architecturalRole:
      "Request lifecycle validation, JWT/session authentication, route controllers, and clean middleware layers.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "Core", detail: "Non-blocking event I/O, streams, clusters", color: "#4ade80" },
      { name: "Express", icon: SiExpress, level: "Core", detail: "Routing, error handling, rate limiting middleware", color: "#e2e8f0" },
      { name: "RESTful APIs", icon: FaNetworkWired, level: "Core", detail: "Resource modeling, idempotency, status codes", color: "#38bdf8" },
      { name: "Auth & Security", icon: FaCheckCircle, level: "Advanced", detail: "JWT, bcrypt, secure HTTP cookies, RBAC", color: "#a855f7" },
    ],
    keyCapabilities: [
      "Secure token authentication & RBAC models",
      "Sanitized data validation pipelines",
      "Modular microservice controller patterns",
    ],
  },
  {
    id: "database",
    title: "Data Persistence & Storage",
    badge: "Data Layer",
    icon: FaDatabase,
    accent: "#14b8a6",
    glow: "rgba(20, 184, 166, 0.25)",
    description:
      "Structuring durable data models, indexes, relational schemas, and fast aggregation pipelines.",
    architecturalRole:
      "Data consistency, document & table indexing, transaction safety, and persistent application state.",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: "Core", detail: "Aggregation pipelines, schema design, indexes", color: "#22c55e" },
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", detail: "Relational modeling, foreign keys, ACID", color: "#38bdf8" },
      { name: "SQL / MySQL", icon: FaDatabase, level: "Proficient", detail: "Complex queries, joins, transactions", color: "#f59e0b" },
    ],
    keyCapabilities: [
      "Schema normalization & index optimization",
      "Fast aggregation pipelines for analytics",
      "Zero-downtime data migrations",
    ],
  },
  {
    id: "ecosystem",
    title: "State, Tooling & Workflows",
    badge: "Toolchain",
    icon: FaTools,
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
    description:
      "Predictable state stores, reactive data streams, telemetry charts, and modern version-controlled delivery.",
    architecturalRole:
      "Developer productivity, state synchronization, analytics visualization, and design system fidelity.",
    skills: [
      { name: "Redux Toolkit", icon: SiRedux, level: "Core", detail: "Slices, immutable updates, RTK Query", color: "#a855f7" },
      { name: "Git & GitHub", icon: SiGit, level: "Core", detail: "Branching strategies, CI/CD, code review", color: "#f97316" },
      { name: "Figma", icon: SiFigma, level: "Advanced", detail: "Design systems, wireframing, UX handoff", color: "#ec4899" },
      { name: "Chart.js / Visuals", icon: FaBolt, level: "Advanced", detail: "Interactive metrics, canvas graphing", color: "#eab308" },
    ],
    keyCapabilities: [
      "Immutable predictable store state trees",
      "Streamlined Git flow and PR workflows",
      "Pixel-perfect translation from Figma designs",
    ],
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    label: "Client Interface",
    detail: "User action in React / Angular / Vue UI",
    tech: "TypeScript · Components · RxJS",
    accent: "text-violet-400",
    border: "hover:border-violet-500/50",
  },
  {
    step: "02",
    label: "State & Validation",
    detail: "State dispatch & optimistic UI update",
    tech: "Redux / NgRx · Schema checks",
    accent: "text-amber-400",
    border: "hover:border-amber-500/50",
  },
  {
    step: "03",
    label: "API Gateway",
    detail: "Secure middleware & controller routing",
    tech: "Node.js · Express · JWT Auth",
    accent: "text-indigo-400",
    border: "hover:border-indigo-500/50",
  },
  {
    step: "04",
    label: "Data Persistence",
    detail: "Indexed query & reliable ACID store",
    tech: "MongoDB · PostgreSQL · SQL",
    accent: "text-teal-400",
    border: "hover:border-teal-500/50",
  },
];

export default function SkillsArchitecture() {
  const [selectedPillar, setSelectedPillar] = useState<string>("frontend");
  const current = PILLARS.find((p) => p.id === selectedPillar) || PILLARS[0];

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl bg-[#090d16] p-6 text-white shadow-2xl md:my-24 md:p-12" id="skills">
      
      {/* ── Background Glow Elements ── */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/15 blur-[100px]" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-teal-500/10 blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-indigo-600/15 blur-[90px]" />
      </div>

      <div className="relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col gap-4 border-b border-slate-800/90 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-mono tracking-wider uppercase text-[11px]">System Architecture // Stack</span>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Engineering Architecture
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm font-light leading-relaxed text-slate-400 md:text-base">
              A comprehensive blueprint of how I design, construct, and scale production applications across the entire stack.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Full Stack Synergy</span>
          </div>
        </div>

        {/* ── 1. Execution Flowchart (Request to Render) ── */}
        <div className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-md md:p-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                <FaLayerGroup className="text-sm" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-white md:text-base">
                System Data Flow &amp; Execution Pipeline
              </h3>
            </div>
            <span className="hidden sm:inline-block rounded-full border border-slate-700 bg-slate-800/70 px-3 py-0.5 font-mono text-[11px] text-slate-400">
              Interactive Blueprint
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4.5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/80 ${item.border} cursor-pointer`}
                onClick={() => {
                  if (idx === 0) setSelectedPillar("frontend");
                  if (idx === 1) setSelectedPillar("ecosystem");
                  if (idx === 2) setSelectedPillar("backend");
                  if (idx === 3) setSelectedPillar("database");
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold ${item.accent}`}>
                      STEP {item.step}
                    </span>
                    {idx < FLOW_STEPS.length - 1 && (
                      <FaArrowRight className="hidden text-xs text-slate-600 lg:block group-hover:text-slate-300 transition-colors" />
                    )}
                  </div>
                  <h4 className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-white">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-4 border-t border-slate-800/80 pt-2.5">
                  <span className="font-mono text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
                    {item.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. 4 Architectural Pillar Tabs ── */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = selectedPillar === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                type="button"
                className={`group flex flex-col text-left rounded-2xl p-5 transition-all duration-300 border ${
                  isSelected
                    ? "border-violet-500/80 bg-slate-900/90 shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-violet-500/40 -translate-y-1"
                    : "border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: `${pillar.accent}20`, color: pillar.accent }}
                  >
                    <Icon className="text-lg" />
                  </div>
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      borderColor: `${pillar.accent}40`,
                      backgroundColor: `${pillar.accent}15`,
                      color: pillar.accent,
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold text-white transition-colors group-hover:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── 3. Selected Pillar Deep Dive Card ── */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="flex flex-col gap-6 border-b border-slate-800/90 pb-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block rounded-md px-2.5 py-0.5 font-mono text-xs font-bold"
                  style={{
                    backgroundColor: `${current.accent}20`,
                    color: current.accent,
                    border: `1px solid ${current.accent}40`,
                  }}
                >
                  {current.badge}
                </span>
                <span className="font-mono text-xs text-slate-500">Architectural Role</span>
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                {current.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 font-light">
                {current.architecturalRole}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shrink-0 md:max-w-xs">
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Core Implementation Principles
              </p>
              <ul className="space-y-2 text-xs text-slate-300 font-light">
                {current.keyCapabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FaCheckCircle className="text-teal-400 mt-0.5 shrink-0 text-xs" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Grid */}
          <div className="mt-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Technologies &amp; Deep Implementation
            </h4>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {current.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group flex items-start gap-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-950 transition-transform duration-200 group-hover:scale-105"
                      style={{ color: skill.color || "#ffffff" }}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {skill.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed font-light">
                        {skill.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
