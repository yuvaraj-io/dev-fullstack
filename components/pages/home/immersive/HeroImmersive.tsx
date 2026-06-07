"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaReact, FaAngular, FaVuejs, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";
import type { IconType } from "react-icons";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { useMousePosition } from "@/hooks/useMousePosition";

/* 3D sphere is lazy + client-only so Three.js never ships in the
   initial/SSR bundle. A plain gradient stands in until it loads. */
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-full bg-gradient-to-br from-violet-300/40 via-indigo-200/30 to-cyan-200/30 blur-xl" />
  ),
});

const ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "Angular Expert",
  "Node.js Engineer",
  "Vue Developer",
];

/* Orbit rings: [icon, color], distributed around two counter-rotating rings */
const RING_INNER: { Icon: IconType; color: string }[] = [
  { Icon: FaReact, color: "#38bdf8" },
  { Icon: SiTypescript, color: "#3178c6" },
  { Icon: FaNodeJs, color: "#539e43" },
];
const RING_OUTER: { Icon: IconType; color: string }[] = [
  { Icon: FaAngular, color: "#dd0031" },
  { Icon: FaVuejs, color: "#42b883" },
  { Icon: SiMongodb, color: "#47a248" },
];

function OrbitRing({
  items,
  radius,
  duration,
  direction,
}: {
  items: { Icon: IconType; color: string }[];
  radius: number;
  duration: number;
  direction: "cw" | "ccw";
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        animation: `orbit-${direction} ${duration}s linear infinite`,
      }}
    >
      {items.map(({ Icon, color }, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <span
            key={i}
            className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/80 shadow-md backdrop-blur"
            style={{
              left: `calc(50% + ${x}px - 22px)`,
              top: `calc(50% + ${y}px - 22px)`,
              animation: `orbit-${direction}-counter ${duration}s linear infinite`,
            }}
          >
            <Icon size={22} color={color} />
          </span>
        );
      })}
    </div>
  );
}

export default function HeroImmersive() {
  const reduced = useReducedMotionPref();
  const { x, y } = useMousePosition(!reduced);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden py-12 perspective-1000">
      {/* Soft aurora wash (kept from light theme) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,#c4b5fd_0%,transparent_65%)] opacity-20" />
        <div className="absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#a5f3fc_0%,transparent_65%)] opacity-20" />
      </div>

      <div className="grid w-full items-center gap-10 md:grid-cols-2">
        {/* ── Left: copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={
            reduced
              ? undefined
              : { transform: `translate3d(${x * -12}px, ${y * -8}px, 0)` }
          }
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Yuvaraj
            </span>
          </h1>

          <div className="mt-3 h-9 overflow-hidden">
            <motion.p
              key={roleIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-semibold text-violet-600"
            >
              {ROLES[roleIdx]}
            </motion.p>
          </div>

          <p className="mt-5 max-w-md text-base font-light leading-relaxed text-slate-500">
            Full-stack engineer with{" "}
            <span className="font-semibold text-slate-700">7+ years</span> building
            production web apps with React, Angular, Vue and Node.js.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/connect">
              <button className="btn-shimmer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02]">
                Let&apos;s Connect
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="rounded-xl border border-slate-200 bg-white/70 px-7 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur transition hover:border-violet-200 hover:text-violet-700">
                View Portfolio →
              </button>
            </Link>
          </div>
        </motion.div>

        {/* ── Right: profile + 3D sphere + orbit rings ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
          style={
            reduced ? undefined : { transform: `translate3d(${x * 18}px, ${y * 12}px, 0)` }
          }
        >
          <div className="relative h-80 w-80 md:h-[420px] md:w-[420px]">
            {/* 3D sphere layer (skipped entirely when reduced-motion) */}
            {!reduced && (
              <div className="absolute inset-[-18%] -z-10">
                <HeroCanvas className="!h-full !w-full" />
              </div>
            )}

            {/* Orbit rings (hidden on small screens to avoid clutter) */}
            <div className="absolute inset-0 hidden md:block">
              <OrbitRing items={RING_INNER} radius={170} duration={22} direction="cw" />
              <OrbitRing items={RING_OUTER} radius={230} duration={32} direction="ccw" />
            </div>

            {/* Profile photo with gradient ring */}
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 md:h-72 md:w-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-300/40 via-indigo-200/30 to-cyan-300/30 blur-2xl" />
              <div
                className="absolute inset-0 rounded-full p-[3px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #7c3aed, #6366f1, #06b6d4, #7c3aed)",
                  animation: reduced ? undefined : "spin-ring 10s linear infinite",
                }}
              >
                <div className="h-full w-full rounded-full bg-[#fafafa]" />
              </div>
              <Image
                src="/assets/profile/yuvaraj.png"
                alt="Yuvaraj"
                fill
                sizes="288px"
                className="rounded-full object-cover p-3"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-300">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="h-5 w-px bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    </section>
  );
}
