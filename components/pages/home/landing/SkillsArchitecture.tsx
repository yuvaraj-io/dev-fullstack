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
  color: {
    bg: string;
    text: string;
    border: string;
    lightBg: string;
  };
  description: string;
  architecturalRole: string;
  skills: {
    name: string;
    icon: IconType;
    level: "Core" | "Advanced" | "Proficient";
    detail: string;
  }[];
  keyCapabilities: string[];
}

const PILLARS: SkillPillar[] = [
  {
    id: "frontend",
    title: "Frontend & Reactive UIs",
    badge: "Client Layer",
    icon: FaCode,
    color: {
      bg: "bg-violet-600",
      text: "text-violet-700",
      border: "border-violet-200",
      lightBg: "bg-violet-50/70",
    },
    description:
      "Crafting performant, accessible, and fluid component architectures that respond dynamically to user input.",
    architecturalRole:
      "Client-side state management, reactive event handling, component lifecycle optimization, and accessible responsive design.",
    skills: [
      { name: "React", icon: SiReact, level: "Core", detail: "Hooks, Suspense, Next.js, component architecture" },
      { name: "Angular", icon: SiAngular, level: "Core", detail: "Services, Dependency Injection, signals & templates" },
      { name: "Vue 3", icon: SiVuedotjs, level: "Advanced", detail: "Composition API, reactivity, state store" },
      { name: "TypeScript", icon: SiTypescript, level: "Core", detail: "Strict type safety, generics, schema definitions" },
      { name: "JavaScript", icon: SiJavascript, level: "Core", detail: "ESNext, event loop, async/await, closures" },
      { name: "RxJS", icon: SiReactivex, level: "Advanced", detail: "Observable streams, operators, reactive state" },
      { name: "HTML5 / CSS3", icon: SiHtml5, level: "Core", detail: "Semantic HTML, Flex/Grid, bespoke animation" },
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
    color: {
      bg: "bg-indigo-600",
      text: "text-indigo-700",
      border: "border-indigo-200",
      lightBg: "bg-indigo-50/70",
    },
    description:
      "Building resilient REST APIs, authentication pipelines, and structured services designed for high throughput.",
    architecturalRole:
      "Request lifecycle validation, JWT/session authentication, route controllers, and clean middleware layers.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: "Core", detail: "Non-blocking event I/O, streams, clusters" },
      { name: "Express", icon: SiExpress, level: "Core", detail: "Routing, error handling, rate limiting middleware" },
      { name: "RESTful APIs", icon: FaNetworkWired, level: "Core", detail: "Resource modeling, idempotency, status codes" },
      { name: "Auth & Security", icon: FaCheckCircle, level: "Advanced", detail: "JWT, bcrypt, secure HTTP cookies, RBAC" },
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
    color: {
      bg: "bg-teal-600",
      text: "text-teal-700",
      border: "border-teal-200",
      lightBg: "bg-teal-50/70",
    },
    description:
      "Structuring durable data models, indexes, relational schemas, and fast aggregation pipelines.",
    architecturalRole:
      "Data consistency, document & table indexing, transaction safety, and persistent application state.",
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: "Core", detail: "Aggregation pipelines, schema design, indexes" },
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", detail: "Relational modeling, foreign keys, ACID" },
      { name: "SQL / MySQL", icon: FaDatabase, level: "Proficient", detail: "Complex queries, joins, transactions" },
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
    color: {
      bg: "bg-amber-600",
      text: "text-amber-700",
      border: "border-amber-200",
      lightBg: "bg-amber-50/70",
    },
    description:
      "Predictable state stores, reactive data streams, telemetry charts, and modern version-controlled delivery.",
    architecturalRole:
      "Developer productivity, state synchronization, analytics visualization, and design system fidelity.",
    skills: [
      { name: "Redux Toolkit", icon: SiRedux, level: "Core", detail: "Slices, immutable updates, RTK Query" },
      { name: "Git & GitHub", icon: SiGit, level: "Core", detail: "Branching strategies, CI/CD, code review" },
      { name: "Figma", icon: SiFigma, level: "Advanced", detail: "Design systems, wireframing, UX handoff" },
      { name: "Chart.js / Visuals", icon: FaBolt, level: "Advanced", detail: "Interactive metrics, canvas graphing" },
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
  },
  {
    step: "02",
    label: "State & Validation",
    detail: "State dispatch & optimistic UI update",
    tech: "Redux / NgRx · Schema checks",
  },
  {
    step: "03",
    label: "API Gateway",
    detail: "Secure middleware & controller routing",
    tech: "Node.js · Express · JWT Auth",
  },
  {
    step: "04",
    label: "Data Persistence",
    detail: "Indexed query & reliable ACID store",
    tech: "MongoDB · PostgreSQL · SQL",
  },
];

export default function SkillsArchitecture() {
  const [selectedPillar, setSelectedPillar] = useState<string>("frontend");
  const current = PILLARS.find((p) => p.id === selectedPillar) || PILLARS[0];

  return (
    <section className="py-20 md:py-28" id="skills">
      {/* Section Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal-600">
              Capabilities &amp; Stack
            </p>
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Engineering Architecture
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Not just a list of keywords — an integrated map of how I design, construct, and scale end-to-end applications.
          </p>
        </div>
      </div>

      {/* Visual Pipeline Flowchart: Request-to-Render Architecture */}
      <div className="mt-12 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-violet-600" />
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-slate-900">
              System Data Flow &amp; Stack Synergy
            </h3>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            End-to-End Execution Flow
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW_STEPS.map((item, idx) => (
            <div
              key={item.step}
              className="flow-step-node flex flex-col justify-between relative group cursor-pointer"
              onClick={() => {
                if (idx === 0) setSelectedPillar("frontend");
                if (idx === 1) setSelectedPillar("ecosystem");
                if (idx === 2) setSelectedPillar("backend");
                if (idx === 3) setSelectedPillar("database");
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-violet-600">
                    STEP {item.step}
                  </span>
                  {idx < FLOW_STEPS.length - 1 && (
                    <FaArrowRight className="hidden text-xs text-slate-300 lg:block group-hover:text-violet-500 transition-colors" />
                  )}
                </div>
                <h4 className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold text-slate-900">
                  {item.label}
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {item.detail}
                </p>
              </div>
              <div className="mt-4 border-t border-slate-100 pt-2.5">
                <span className="font-mono text-[0.68rem] text-slate-600">
                  {item.tech}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Architectural Pillar Selector Tabs */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          const isSelected = selectedPillar === pillar.id;

          return (
            <button
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar.id)}
              type="button"
              className={`flex flex-col text-left rounded-2xl p-5 transition-all duration-300 border ${
                isSelected
                  ? `border-violet-500 bg-white shadow-lg ring-2 ring-violet-500/20 -translate-y-1`
                  : `border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white hover:-translate-y-0.5`
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-white ${pillar.color.bg}`}
                >
                  <Icon className="text-lg" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider ${pillar.color.lightBg} ${pillar.color.text}`}
                >
                  {pillar.badge}
                </span>
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {pillar.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between border-b border-slate-100 pb-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-bold ${current.color.lightBg} ${current.color.text}`}>
                {current.badge}
              </span>
              <span className="text-xs font-medium text-slate-400">Architectural Role</span>
            </div>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-slate-900">
              {current.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {current.architecturalRole}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 shrink-0 md:max-w-xs">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Engineering Focus
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {current.keyCapabilities.map((cap, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <FaCheckCircle className="text-teal-500 mt-0.5 shrink-0 text-[0.7rem]" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Badges with Details */}
        <div className="mt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Technologies &amp; Deep Implementation
          </h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {current.skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition hover:border-violet-200 hover:bg-violet-50/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-200 text-slate-700">
                    <Icon className="text-base" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-display)] text-sm font-bold text-slate-900">
                        {skill.name}
                      </span>
                      <span className="text-[0.65rem] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {skill.level}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 leading-snug">
                      {skill.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

