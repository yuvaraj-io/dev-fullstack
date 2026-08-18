"use client";

import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

type CardProps = {
  heading?: string;
  img?: string;
  skills?: string[];
  mainHeading?: string;
  subtitle?: string;
  link?: string;
};

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
  MONGODB: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

function getSkillStyle(s: string) {
  const norm = s.toUpperCase().trim();
  return (
    SKILL_THEMES[norm] ?? {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
    }
  );
}

export default function Card({ heading, img, skills = [], mainHeading, subtitle, link }: CardProps) {
  return (
    <div className="work-card group flex h-full flex-col justify-between">
      <div>
        {/* Mockup Header */}
        <div className="work-mockup-header">
          <div className="mockup-dots">
            <span className="mockup-dot mockup-dot-red" />
            <span className="mockup-dot mockup-dot-yellow" />
            <span className="mockup-dot mockup-dot-green" />
          </div>
          {link ? (
            <span className="font-mono text-[0.68rem] tracking-tight text-slate-400 truncate max-w-[150px]">
              {link.replace("https://", "")}
            </span>
          ) : (
            <span className="text-[0.68rem] text-slate-400">Project</span>
          )}
          <span className="rounded bg-violet-100/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-violet-700">
            Live
          </span>
        </div>

        {/* Thumbnail preview */}
        {img && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
            <Image
              src={img}
              alt={mainHeading || heading || "card"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-violet-600 hover:text-white"
              >
                <span>Launch</span>
                <FaExternalLinkAlt className="text-[0.65rem]" />
              </a>
            )}
          </div>
        )}

        {/* Heading & description */}
        <div className="p-5">
          {heading && (
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-1">
              {heading}
            </p>
          )}

          {mainHeading && (
            <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 transition-colors group-hover:text-violet-600">
              {mainHeading}
            </h4>
          )}

          {subtitle && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {subtitle}
            </p>
          )}

          {/* Skill tags */}
          {skills.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((s, i) => {
                const style = getSkillStyle(s);
                return (
                  <span
                    key={i}
                    className={`work-tag-pill border ${style.bg} ${style.text} ${style.border}`}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer link */}
      {link && (
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">Interactive Build</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 hover:text-violet-800 transition-colors"
          >
            <span>Visit App</span>
            <span>→</span>
          </a>
        </div>
      )}
    </div>
  );
}

