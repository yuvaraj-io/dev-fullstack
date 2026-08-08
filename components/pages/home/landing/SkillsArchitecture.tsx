"use client";

import { skills } from "@/constants/commons/constants";

const LAYERS = [
  {
    key: "language",
    label: "Foundation",
    note: "The materials every interface is cut from.",
    items: skills.language.skills,
  },
  {
    key: "framework",
    label: "Interfaces",
    note: "Where product logic meets the screen.",
    items: skills.framework.skills,
  },
  {
    key: "database",
    label: "Systems",
    note: "Data stores and durable application cores.",
    items: skills.database.skills,
  },
  {
    key: "npm",
    label: "Wiring",
    note: "Libraries that keep complex flows simple.",
    items: skills.npm.skills,
  },
  {
    key: "tools",
    label: "Craft desk",
    note: "Daily instruments for design and delivery.",
    items: skills.tools.skills,
  },
] as const;

const MARQUEE = Object.values(skills)
  .flatMap((group) => group.skills)
  .join("   /   ");

export default function SkillsArchitecture() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-950 py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.35),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(20,184,166,0.18),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">
            Capability map
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            Skills as architecture
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 md:text-lg">
            Not a badge wall — a cross-section of how I assemble products, from
            language foundations up to shipping tools.
          </p>
        </div>

        <div className="mt-14 space-y-0 border border-white/10">
          {LAYERS.map((layer, index) => (
            <div
              key={layer.key}
              className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[10rem_1fr]"
            >
              <div className="flex items-start gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-5 md:border-b-0 md:border-r md:border-white/10">
                <span className="font-[family-name:var(--font-display)] text-sm text-violet-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
                    {layer.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">{layer.note}</p>
                </div>
              </div>

              <div className="relative px-5 py-6 md:px-8">
                <svg
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 text-violet-400/40 md:block"
                  aria-hidden
                >
                  <line
                    className="landing-draw"
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="1"
                    style={{ animationDelay: `${index * 0.12}s` }}
                  />
                </svg>

                <div className="relative flex flex-wrap gap-x-6 gap-y-3">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white/90 transition hover:text-teal-300 md:text-3xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-16 border-y border-white/10 bg-black/20 py-4">
        <div className="overflow-hidden">
          <div className="landing-marquee flex w-max gap-0 whitespace-nowrap font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em] text-white/40">
            <span className="px-8">{MARQUEE}</span>
            <span className="px-8" aria-hidden>
              {MARQUEE}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
