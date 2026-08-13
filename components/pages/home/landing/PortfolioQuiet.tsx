"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaLayerGroup, FaCode, FaRocket, FaCheckCircle } from "react-icons/fa";
import { portfolios, projects } from "@/constants/commons/constants";

type CategoryType = "all" | "featured" | "tools" | "client";

interface ProjectItem {
  link: string;
  img: string;
  skills: string[];
  mainHeading: string;
  subtitle: string;
  category?: string;
  status?: string;
  highlight?: string;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    ...portfolios[0], // Pitchpro
    category: "featured",
    status: "Live Platform",
    highlight: "Pitch deck & startup networking hub",
  },
  {
    ...projects[4], // Tred
    category: "tools",
    status: "Web Application",
    highlight: "Real-time localStorage attendance tracker",
  },
  {
    ...projects[0], // Debugger
    category: "tools",
    status: "Developer Tool",
    highlight: "JS execution & benchmark visualizer",
  },
  {
    ...portfolios[2], // Fotofactory
    category: "client",
    status: "Client Production",
    highlight: "Photography studio portfolio & bookings",
  },
  {
    ...portfolios[3], // Ganesh Idols
    category: "client",
    status: "E-Commerce UI",
    highlight: "High-conversion seasonal storefront",
  },
  {
    ...projects[3], // Snake and Ladders
    category: "tools",
    status: "Interactive Game",
    highlight: "Multiplayer Vue 3 board engine",
  },
];

const SKILL_THEMES: Record<string, { bg: string; text: string; border: string }> = {
  REACT: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  ANGULAR: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  "VUE 3.0": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  VUE: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  TYPESCRIPT: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  JAVASCRIPT: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  HTML: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  CSS: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  BOOTSTRAP: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
};

function getSkillStyle(skill: string) {
  const normalized = skill.toUpperCase().trim();
  return (
    SKILL_THEMES[normalized] ?? {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
    }
  );
}

export default function PortfolioQuiet() {
  const [activeTab, setActiveTab] = useState<CategoryType>("all");

  const filteredProjects =
    activeTab === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 md:py-28" id="selected-work">
      {/* Header with Title & Filter Tabs */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-slate-200/80 pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-600">
              Selected Work
            </p>
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Featured Projects
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Engineered for responsiveness, performance, and intuitive user workflows.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Projects", icon: FaLayerGroup },
            { id: "featured", label: "Featured", icon: FaRocket },
            { id: "tools", label: "Apps & Tools", icon: FaCode },
            { id: "client", label: "Client Systems", icon: FaCheckCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CategoryType)}
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <Icon className="text-[0.7rem]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.mainHeading}
            className="work-card group flex flex-col justify-between"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <div>
              {/* Browser Mockup Window Header */}
              <div className="work-mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot mockup-dot-red" />
                  <span className="mockup-dot mockup-dot-yellow" />
                  <span className="mockup-dot mockup-dot-green" />
                </div>
                <span className="font-mono text-[0.68rem] tracking-tight text-slate-400 truncate max-w-[140px]">
                  {project.link.replace("https://", "")}
                </span>
                <span className="rounded bg-violet-100/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-violet-700">
                  {project.status || "Live"}
                </span>
              </div>

              {/* Preview Image Container with Hover Scale */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.img}
                  alt={project.mainHeading}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Live Trigger Overlay on Hover */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-violet-600 hover:text-white"
                >
                  <span>Launch Live</span>
                  <FaExternalLinkAlt className="text-[0.65rem]" />
                </a>
              </div>

              {/* Project Details */}
              <div className="p-6">
                {project.highlight && (
                  <p className="text-xs font-semibold text-violet-600 tracking-wide uppercase">
                    {project.highlight}
                  </p>
                )}

                <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">
                  {project.mainHeading}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {project.subtitle}
                </p>

                {/* Tech Stack Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => {
                    const style = getSkillStyle(skill);
                    return (
                      <span
                        key={skill}
                        className={`work-tag-pill border ${style.bg} ${style.text} ${style.border}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="border-t border-slate-100 px-6 py-3.5 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Responsive build
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors"
              >
                <span>Explore App</span>
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Archive Footer Action */}
      <div className="mt-14 flex items-center justify-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md"
        >
          <span>View all archives &amp; small projects</span>
          <span className="text-violet-600 font-bold">→</span>
        </Link>
      </div>
    </section>
  );
}
