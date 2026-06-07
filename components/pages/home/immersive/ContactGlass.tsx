"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Heading from "@/components/ui-reusables/Heading";
import Reveal from "@/components/motion/Reveal";

/* Deterministic pseudo-random so render stays pure and SSR/client
   markup match exactly (no hydration mismatch). */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function useGlowParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: rand(i + 1) * 100,
        size: 4 + rand(i + 2) * 10,
        delay: rand(i + 3) * 8,
        dur: 7 + rand(i + 4) * 7,
        hue: ["#a78bfa", "#818cf8", "#22d3ee"][i % 3],
      })),
    [count]
  );
}

export default function ContactGlass() {
  const particles = useGlowParticles(18);

  return (
    <section className="py-16">
      <Heading icon="#" text="Connect me" line variant="gradient" />

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl p-[1px]">
          {/* animated gradient-mesh backdrop */}
          <div className="gradient-mesh absolute inset-0" />

          {/* floating glow particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((p) => (
              <span
                key={p.id}
                className="glow-particle absolute bottom-0 rounded-full"
                style={{
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  background: p.hue,
                  filter: "blur(1px)",
                  boxShadow: `0 0 12px 2px ${p.hue}`,
                  animation: `glow-float ${p.dur}s ${p.delay}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* the glass card */}
          <div className="glass-light relative rounded-3xl p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
                  Let&apos;s build something{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    great
                  </span>{" "}
                  together.
                </p>
                <p className="mt-3 max-w-sm text-sm text-slate-600">
                  Open to full-time roles, freelance projects and consulting
                  engagements.
                </p>
                <Link href="/connect">
                  <button className="btn-shimmer mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition hover:scale-[1.02]">
                    Get in touch →
                  </button>
                </Link>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:+917204447908"
                  className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-violet-200 hover:text-violet-700"
                >
                  <MdEmail className="text-xl text-violet-500" />
                  +91 72044 47908
                </a>
                <a
                  href="https://wa.me/917204447908"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-emerald-200 hover:text-emerald-600"
                >
                  <FaWhatsapp className="text-xl text-emerald-500" />
                  WhatsApp
                </a>
                <a
                  href="mailto:developer@yuvidev.in"
                  className="flex items-center gap-3 rounded-xl border border-white/60 bg-white/50 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-violet-200 hover:text-violet-700"
                >
                  <MdEmail className="text-xl text-indigo-500" />
                  developer@yuvidev.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
