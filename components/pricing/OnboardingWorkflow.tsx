"use client";

import { FaSearch, FaFileContract, FaLaptopCode, FaCheckDouble, FaArrowRight } from "react-icons/fa";

const STEPS = [
  {
    step: "01",
    icon: FaSearch,
    title: "Discovery & Tech Audit",
    duration: "Day 0 · Free Intake",
    description:
      "We discuss your product requirements, review Figma designs or inspect your legacy repository to define exact deliverables.",
    highlight: "Clear scope clarity before any commitment.",
  },
  {
    step: "02",
    icon: FaFileContract,
    title: "Transparent Quote & Sprint Plan",
    duration: "Day 1 · Alignment",
    description:
      "We agree on a sprint roadmap (e.g., 20 days @ 4h/day). You get a fixed weekly/monthly budget without hidden charges.",
    highlight: "Milestone-backed delivery roadmap.",
  },
  {
    step: "03",
    icon: FaLaptopCode,
    title: "Daily 4h Focused Execution",
    duration: "Sprint Phase · Daily PRs",
    description:
      "Deep, uninterrupted engineering work every business day. You receive clean Git commits, PRs, and staging preview URLs.",
    highlight: "Live staging environment after every commit.",
  },
  {
    step: "04",
    icon: FaCheckDouble,
    title: "Weekly Sync & Production Launch",
    duration: "Ongoing & Final Handover",
    description:
      "Regular async video walkthroughs, documentation handoff, performance checks, and zero-downtime production deployment.",
    highlight: "100% intellectual property & code ownership.",
  },
];

export default function OnboardingWorkflow() {
  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-400">
          How We Quote &amp; Collaborate
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          The 4-Step Frictionless Onboarding
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          No endless meetings or confusing agency layers. Here is how your project moves from idea to production code.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-300 hover:shadow-lg hover:-translate-y-1 dark:border-white/10 dark:bg-slate-900/80 dark:hover:border-violet-500/50"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-950/70 dark:text-violet-400">
                    <Icon className="text-lg" />
                  </div>
                  <span className="font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                    STEP {step.step}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[0.65rem] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    {step.duration}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-3 dark:border-white/10">
                <p className="text-[0.7rem] font-semibold text-emerald-600 dark:text-emerald-400">
                  ✓ {step.highlight}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
