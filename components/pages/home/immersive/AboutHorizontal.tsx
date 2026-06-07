"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "@/components/ui-reusables/Heading";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

type Panel = {
  kicker: string;
  title: string;
  body: string;
  img: string;
};

const PANELS: Panel[] = [
  {
    kicker: "01 — Who I am",
    title: "Full-stack engineer, product-minded.",
    body: "MERN / MEAN developer who ties every line of code back to product and business goals — strong UI/UX thinking paired with solid backend engineering.",
    img: "/assets/profile/yuvaraj.png",
  },
  {
    kicker: "02 — What I build",
    title: "Frontend depth, backend reliability.",
    body: "On the frontend I specialise in Angular, Vue.js and React. On the backend I work with Node.js, Express, MongoDB and SQL to ship dependable APIs and architecture.",
    img: "/assets/profile/about.png",
  },
  {
    kicker: "03 — How I work",
    title: "Performance, quality, smooth delivery.",
    body: "Beyond features I obsess over performance, QA and clean CI/CD — whether improving an existing product or delivering a new application end-to-end.",
    img: "/assets/profile/image.png",
  },
];

function PanelCard({ p }: { p: Panel }) {
  return (
    <div className="flex h-full w-[85vw] flex-shrink-0 items-center justify-center px-4 md:w-[80vw]">
      <div className="grid w-full max-w-4xl items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <span className="text-sm font-bold uppercase tracking-widest text-violet-500">
            {p.kicker}
          </span>
          <h3 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            {p.title}
          </h3>
          <p className="max-w-md text-base leading-relaxed text-slate-500">{p.body}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-white/70 shadow-[0_20px_60px_rgba(99,102,241,0.18)]">
          <Image src={p.img} alt={p.title} fill sizes="320px" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function AboutHorizontal() {
  const reduced = useReducedMotionPref();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate the track from 0 to -(N-1) panels' worth of width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(PANELS.length - 1) * 80}vw`]);

  /* Reduced motion → simple stacked layout, no pin/horizontal scroll. */
  if (reduced) {
    return (
      <section className="py-16">
        <Heading icon="#" text="About me" line variant="gradient" />
        <div className="mt-4 space-y-12">
          {PANELS.map((p) => (
            <PanelCard key={p.title} p={p} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="px-6">
          <Heading icon="#" text="About me" line variant="gradient" />
        </div>
        <motion.div style={{ x }} className="flex h-[70vh] items-center">
          {PANELS.map((p) => (
            <PanelCard key={p.title} p={p} />
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="mx-auto h-1 w-40 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />
        </div>
      </div>
    </section>
  );
}
