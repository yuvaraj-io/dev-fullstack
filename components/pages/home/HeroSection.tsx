"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaReact, FaAngular, FaVuejs, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";

/* ── Cycling roles ───────────────────────────────────────── */
const ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "Angular Expert",
  "Node.js Engineer",
  "Vue Developer",
];

/* ── Stats ───────────────────────────────────────────────── */
const STATS = [
  { value: 7,  suffix: "+", label: "Years Exp." },
  { value: 50, suffix: "+", label: "Projects"   },
  { value: 3,  suffix: "",  label: "Frameworks"  },
];

/* ── Floating tech chips ─────────────────────────────────── */
const TECH = [
  { Icon: FaReact,      color: "#38bdf8", label: "React",      style: { top: "4%",  left: "-14%"  }, dur: "4.2s", delay: "0s"    },
  { Icon: FaAngular,    color: "#ef4444", label: "Angular",    style: { top: "2%",  right: "-12%" }, dur: "5.1s", delay: "0.8s"  },
  { Icon: FaVuejs,      color: "#4ade80", label: "Vue",        style: { bottom: "22%", left: "-16%" }, dur: "6s",   delay: "1.5s"  },
  { Icon: FaNodeJs,     color: "#86efac", label: "Node.js",    style: { bottom: "6%",  right: "-10%"}, dur: "4.8s", delay: "2.2s"  },
  { Icon: SiTypescript, color: "#3b82f6", label: "TypeScript", style: { top: "44%", left: "-18%"  }, dur: "5.5s", delay: "0.4s"  },
  { Icon: SiMongodb,    color: "#22c55e", label: "MongoDB",    style: { top: "42%", right: "-14%" }, dur: "3.9s", delay: "1.9s"  },
];

/* ── Eased counter hook ──────────────────────────────────── */
function useCountUp(target: number, delay = 800, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay, duration]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value);
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-3xl font-extrabold text-transparent">
        {count}{suffix}
      </div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[88vh] overflow-hidden py-12 flex items-center">

      {/* ── Pastel aurora blobs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, #c4b5fd 0%, transparent 65%)",
            opacity: 0.18,
            animation: "aurora-1 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-40 top-1/4 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, #99f6e4 0%, transparent 65%)",
            opacity: 0.14,
            animation: "aurora-2 28s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #a5b4fc 0%, transparent 65%)",
            opacity: 0.10,
            animation: "aurora-3 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="grid w-full items-center gap-10 md:grid-cols-2">

        {/* ── Left column ── */}
        <div style={{ animation: "fade-up 0.8s ease-out both" }}>

          {/* Available badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" style={{ animationDuration: "1.4s" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>

          {/* Name */}
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Yuvaraj
            </span>
          </h1>

          {/* Cycling role */}
          <div className="mt-3 h-9 overflow-hidden">
            <p
              className="text-xl font-semibold text-violet-600 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
              }}
            >
              {ROLES[roleIdx]}
            </p>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-slate-500">
            Full-stack engineer with{" "}
            <span className="font-semibold text-slate-700">7+ years</span> building production web apps with{" "}
            <span className="font-medium text-[#38bdf8]">React</span>,{" "}
            <span className="font-medium text-[#ef4444]">Angular</span>,{" "}
            <span className="font-medium text-[#4ade80]">Vue</span> and{" "}
            <span className="font-medium text-[#86efac]">Node.js</span>.
          </p>

          {/* Stats */}
          <div
            className="mt-8 flex gap-8 border-t border-slate-100 pt-6"
            style={{ animation: "fade-up 0.8s 0.35s ease-out both", opacity: 0 }}
          >
            {STATS.map((s) => <StatItem key={s.label} {...s} />)}
          </div>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            style={{ animation: "fade-up 0.8s 0.55s ease-out both", opacity: 0 }}
          >
            <Link href="/connect">
              <button className="btn-shimmer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] hover:shadow-violet-500/40">
                Let&apos;s Connect
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="rounded-xl border border-slate-200 bg-white px-7 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">
                View Portfolio →
              </button>
            </Link>
          </div>
        </div>

        {/* ── Right column — image + floating logos ── */}
        <div
          className="flex justify-center"
          style={{ animation: "fade-up 0.8s 0.15s ease-out both", opacity: 0 }}
        >
          <div className="relative">
            {/* Floating tech chips — hidden on mobile */}
            {TECH.map((t) => (
              <div
                key={t.label}
                className="absolute hidden md:flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-md"
                style={{
                  ...t.style,
                  animation: `float-logo ${t.dur} ${t.delay} ease-in-out infinite`,
                }}
                title={t.label}
              >
                <t.Icon size={22} color={t.color} />
              </div>
            ))}

            {/* Profile image with spinning gradient ring */}
            <div className="relative h-72 w-72 md:h-[380px] md:w-[380px]">
              {/* Glow behind ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-300/30 via-indigo-200/20 to-teal-300/20 blur-2xl" />

              {/* Spinning ring */}
              <div
                className="absolute inset-1 rounded-full p-[3px]"
                style={{
                  background: "conic-gradient(from 0deg, #7c3aed, #6366f1, #14b8a6, #7c3aed)",
                  animation: "spin-ring 10s linear infinite",
                }}
              >
                <div className="h-full w-full rounded-full bg-[#fafafa]" />
              </div>

              {/* Photo */}
              <Image
                src="/assets/profile/yuvaraj.png"
                alt="Yuvaraj"
                fill
                className="rounded-full object-cover p-3"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="h-5 w-px bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    </section>
  );
}
