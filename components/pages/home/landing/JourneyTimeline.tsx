"use client";

import { useEffect, useRef } from "react";

const MILESTONES = [
  {
    year: "Start",
    title: "Frontend first",
    body: "Began by crafting interfaces people could feel — layout, interaction, and clarity before complexity.",
  },
  {
    year: "Grow",
    title: "Framework depth",
    body: "Went deep on Angular, React, and Vue — learning how component systems scale across real products.",
  },
  {
    year: "Expand",
    title: "Full-stack range",
    body: "Added Node, Express, MongoDB, and SQL so ideas could travel from UI all the way to durable APIs.",
  },
  {
    year: "Now",
    title: "Product-minded shipping",
    body: "Today I connect engineering to business goals — performance, quality, and calm CI/CD delivery.",
  },
];

export default function JourneyTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = trackRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!nodes?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.35 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--signal)]">
          Path
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
          Journey
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">
          A straight line through the work that shaped how I build — less
          spectacle, more progression.
        </p>
      </div>

      <div ref={trackRef} className="relative mt-16">
        <div className="absolute bottom-0 left-[0.55rem] top-0 w-px bg-[var(--line)] md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-14">
          {MILESTONES.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={step.title}
                data-step
                className={`relative grid opacity-0 translate-y-6 transition duration-700 md:grid-cols-2 ${
                  isLeft ? "" : "md:text-right"
                }`}
              >
                <div
                  className={`absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-[var(--signal)] bg-[var(--paper)] md:left-1/2 md:-translate-x-1/2 ${
                    index === MILESTONES.length - 1 ? "bg-[var(--signal)]" : ""
                  }`}
                />

                <div
                  className={`pl-10 md:pl-0 ${
                    isLeft ? "md:pr-16" : "md:col-start-2 md:pl-16 md:text-left"
                  }`}
                >
                  <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.24em] text-[var(--signal)]">
                    {step.year}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
                    {step.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
