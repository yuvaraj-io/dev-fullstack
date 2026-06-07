"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/ui-reusables/Heading";
import TiltCard from "@/components/motion/TiltCard";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { portfolios } from "@/constants/commons/constants";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SKILL_COLOUR: Record<string, string> = {
  HTML: "bg-orange-50 text-orange-700",
  CSS: "bg-indigo-50 text-indigo-700",
  JAVASCRIPT: "bg-amber-50 text-amber-700",
  BOOTSTRAP: "bg-purple-50 text-purple-700",
};

export default function PortfolioTilt() {
  const reduced = useReducedMotionPref();
  const containerRef = useRef<HTMLDivElement>(null);
  const items = portfolios.slice(0, 5);

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // top card never shrinks
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="py-8">
      <Link href="/portfolio">
        <Heading icon="#" text="Portfolio" line arrowText="View all" variant="gradient" />
      </Link>

      <div ref={containerRef} className="relative mx-auto max-w-3xl">
        {items.map((p, i) => (
          <div
            key={p.mainHeading}
            className="stack-card sticky mb-8 origin-top will-change-transform"
            style={{ top: `${96 + i * 16}px` }}
          >
            <TiltCard max={8} lift={50}>
              <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(99,102,241,0.18)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.mainHeading}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                    style={{ transform: "translateZ(30px)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </div>

                <div
                  className="flex flex-col gap-3 p-6"
                  style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {p.skills.map((s) => (
                      <span
                        key={s}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          SKILL_COLOUR[s] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">{p.mainHeading}</h4>
                  <p className="text-sm leading-relaxed text-slate-500">{p.subtitle}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer mt-1 w-fit rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-500/20"
                  >
                    Live →
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}
