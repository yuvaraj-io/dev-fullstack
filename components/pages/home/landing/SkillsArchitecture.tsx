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
    accent: "#38bdf8",
    description:
      "Crafting performant, accessible, and fluid component architectures that respond dynamically to user input.",
    architecturalRole:
      "Client-side state management, reactive event handling, component lifecycle optimization, and accessible responsive design.",
    skills: [
      { name: "React", icon: SiReact, level: "Core", detail: "Hooks, Suspense, Next.js, component architecture", color: "#38bdf8" },
      { name: "Angular", icon: SiAngular, level: "Core", detail: "Services, Dependency Injection, signals & templates", color: "#ef4444" },
      { name: "Vue 3", icon: SiVuedotjs, level: "Advanced", detail: "Composition API, reactivity, state store", color: "#10b981" },
      { name: "TypeScript", icon: SiTypescript, level: "Core", detail: "Strict type safety, generics, schema definitions", color: "#3b82f6" },
      { name: "JavaScript", icon: SiJavascript, level: "Core", detail: "ESNext, event loop, async/await, closures", color: "#eab308" },
      { name: "RxJS", icon: SiReactivex, level: "Advanced", detail: "Observable streams, operators, reactive state", color: "#f43f5e" },
      { name: "HTML5 / CSS3", icon: SiHtml5, level: "Core", detail: "Semantic HTML, Flex/Grid, bespoke animation", color: "#f97316" },
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
    description:
      "Building resilient REST APIs, authentication pipelines, and structured services designed for high throughput.",
    architecturalRole:
      "Request lifecycle validation, JWT/session authentication, route controllers, and clean middleware layers.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "Core", detail: "Non-blocking event I/O, streams, clusters", color: "#22c55e" },
      { name: "Express", icon: SiExpress, level: "Core", detail: "Routing, error handling, rate limiting middleware", color: "#64748b" },
      { name: "RESTful APIs", icon: FaNetworkWired, level: "Core", detail: "Resource modeling, idempotency, status codes", color: "#06b6d4" },
      { name: "Auth & Security", icon: FaCheckCircle, level: "Advanced", detail: "JWT, bcrypt, secure HTTP cookies, RBAC", color: "#8b5cf6" },
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
    accent: "#10b981",
    description:
      "Structuring durable data models, indexes, relational schemas, and fast aggregation pipelines.",
    architecturalRole:
      "Data consistency, document & table indexing, transaction safety, and persistent application state.",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: "Core", detail: "Aggregation pipelines, schema design, indexes", color: "#10b981" },
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", detail: "Relational modeling, foreign keys, ACID", color: "#38bdf8" },
      { name: "SQL / MySQL", icon: FaDatabase, level: "Proficient", detail: "Complex queries, joins, transactions", color: "#f59e0b" },
    ],
    keyCapabilities: [
      "Schema normalization & index optimization",
      "Fast aggregation pipelines for analytics",
      "Durable transaction lifecycles",
    ],
  },
  {
    id: "ecosystem",
    title: "Tooling & Architecture",
    badge: "Ecosystem",
    icon: FaTools,
    accent: "#f59e0b",
    description:
      "Modern development workflows, state orchestration frameworks, build pipelines, and cloud sandboxes.",
    architecturalRole:
      "Global state management, Git branching models, component design tokens, and live interactive playgrounds.",
    skills: [
      { name: "Redux / Toolkit", icon: SiRedux, level: "Core", detail: "Predictable state container, middleware, slices", color: "#7c3aed" },
      { name: "Git / GitHub", icon: SiGit, level: "Core", detail: "Version control, PR reviews, merge workflows", color: "#f97316" },
      { name: "Figma to Code", icon: SiFigma, level: "Advanced", detail: "Pixel-perfect token fidelity, spacing & grids", color: "#ec4899" },
      { name: "StackBlitz", icon: FaBolt, level: "Core", detail: "Cloud reproduction sandboxes, live code sharing", color: "#0ea5e9" },
    ],
    keyCapabilities: [
      "Predictable unidirectional state orchestration",
      "High-fidelity design token implementation",
      "Rapid interactive prototype validation",
    ],
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    label: "Client Interface",
    detail: "User action in React / Angular / Vue UI",
    tech: "TypeScript · Components · RxJS",
    accent: "#38bdf8",
  },
  {
    step: "02",
    label: "State & Validation",
    detail: "State dispatch & optimistic UI update",
    tech: "Redux / NgRx · Schema checks",
    accent: "#f59e0b",
  },
  {
    step: "03",
    label: "API Gateway",
    detail: "Secure middleware & controller routing",
    tech: "Node.js · Express · JWT Auth",
    accent: "#6366f1",
  },
  {
    step: "04",
    label: "Data Persistence",
    detail: "Indexed query & reliable ACID store",
    tech: "MongoDB · PostgreSQL · SQL",
    accent: "#10b981",
  },
];

export default function SkillsArchitecture() {
  const [selectedPillar, setSelectedPillar] = useState<string>("frontend");
  const current = PILLARS.find((p) => p.id === selectedPillar) || PILLARS[0];

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 text-[var(--ink)] shadow-xl transition-all duration-300 md:my-24 md:p-12" id="skills">
      
      {/* ── Background Glow Elements ── */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-[100px]" style={{ backgroundColor: "var(--signal)" }} />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full opacity-15 blur-[100px]" style={{ backgroundColor: "var(--accent)" }} />
      </div>

      <div className="relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div 
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold backdrop-blur-md transition-all"
              style={{
                backgroundColor: "var(--signal-soft)",
                color: "var(--signal)",
                borderColor: "var(--line)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--signal)" }} />
              <span className="font-mono tracking-wider uppercase text-[11px]">System Architecture // Stack</span>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
              Engineering{" "}
              <span 
                className="bg-clip-text text-transparent transition-all duration-300"
                style={{ backgroundImage: "var(--header-grad)" }}
              >
                Architecture.
              </span>
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm font-light leading-relaxed text-[var(--ink-soft)] md:text-base">
              A comprehensive blueprint of how I design, construct, and scale production applications across the entire stack.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--ink-soft)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Full Stack Synergy</span>
          </div>
        </div>

        {/* ── 1. Execution Flowchart (Request to Render) ── */}
        <div className="mt-10 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 backdrop-blur-md md:p-8 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="flex h-7 w-7 items-center justify-center rounded-lg shadow-2xs"
                style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
              >
                <FaLayerGroup className="text-sm" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)] md:text-base">
                System Data Flow &amp; Execution Pipeline
              </h3>
            </div>
            <span className="hidden sm:inline-block rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-0.5 font-mono text-[11px] text-[var(--ink-soft)]">
              Interactive Blueprint
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--signal)] hover:shadow-md cursor-pointer"
                onClick={() => {
                  if (idx === 0) setSelectedPillar("frontend");
                  if (idx === 1) setSelectedPillar("ecosystem");
                  if (idx === 2) setSelectedPillar("backend");
                  if (idx === 3) setSelectedPillar("database");
                }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: item.accent }}>
                      STEP {item.step}
                    </span>
                    {idx < FLOW_STEPS.length - 1 && (
                      <FaArrowRight className="hidden text-xs text-[var(--ink-soft)] lg:block group-hover:translate-x-0.5 transition-transform" />
                    )}
                  </div>
                  <h4 className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)]">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-soft)] font-light">
                    {item.detail}
                  </p>
                </div>
                <div className="mt-4 border-t border-[var(--line)] pt-2.5">
                  <span className="font-mono text-[11px] text-[var(--ink-soft)]">
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
                    ? "-translate-y-1 shadow-lg ring-1"
                    : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--signal)] hover:-translate-y-0.5"
                }`}
                style={{
                  backgroundColor: isSelected ? "var(--card)" : undefined,
                  borderColor: isSelected ? "var(--signal)" : undefined,
                  boxShadow: isSelected ? "0 10px 30px var(--signal-soft)" : undefined,
                }}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
                  >
                    <Icon className="text-lg" />
                  </div>
                  <span
                    className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-soft)]"
                  >
                    {pillar.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
                    {pillar.title}
                  </h4>
                  <p className="mt-1 text-xs text-[var(--ink-soft)] line-clamp-2 font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3 w-full">
                  <span className="font-mono text-[11px] text-[var(--ink-soft)]">
                    {pillar.skills.length} core technologies
                  </span>
                  <span 
                    className="font-mono text-xs font-bold transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--signal)" }}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── 3. Selected Pillar Interactive Inspector ── */}
        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-md md:p-8 transition-all duration-300">
          <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-xs"
                style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)" }}
              >
                {<current.icon className="text-2xl" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                    {current.title}
                  </h3>
                  <span 
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)", borderColor: "var(--line)" }}
                  >
                    {current.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--ink-soft)] font-light max-w-2xl">
                  {current.architecturalRole}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--ink-soft)]">
                {current.skills.length} Frameworks &amp; Tools
              </span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="mt-8">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink-soft)] mb-4">
              Frameworks &amp; Deep Technical Stack
            </h4>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {current.skills.map((skill) => {
                const SkillIcon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--signal)] hover:shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--card)] border border-[var(--line)] text-lg shadow-2xs transition-transform group-hover:scale-105"
                        style={{ color: skill.color }}
                      >
                        <SkillIcon />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--ink)]">
                          {skill.name}
                        </div>
                        <div className="text-[11px] text-[var(--ink-soft)] font-light">
                          {skill.detail}
                        </div>
                      </div>
                    </div>

                    <span 
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: "var(--signal-soft)", color: "var(--signal)", borderColor: "var(--line)" }}
                    >
                      {skill.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Architectural Capabilities */}
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--ink-soft)] mb-3">
              Key Engineering Capabilities &amp; Architecture Standards
            </h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {current.keyCapabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-xs text-[var(--ink)]"
                >
                  <FaCheckCircle className="text-sm shrink-0" style={{ color: "var(--signal)" }} />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
