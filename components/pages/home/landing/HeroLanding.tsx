"use client";

import { useId } from "react";
import Image from "next/image";
import Link from "next/link";
import KineticGrid from "@/components/ui/kinetic-grid";

export default function HeroLanding() {
  const uid = useId().replace(/:/g, "");
  const topArcId = `hero-top-arc-${uid}`;
  const bottomArcId = `hero-bottom-arc-${uid}`;
  const nameGradId = `hero-name-grad-${uid}`;

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      <KineticGrid contained className="min-h-[calc(100vh-4rem)]">
        {/* Dynamic Palette Mesh Glow Overlay */}
        <div 
          className="pointer-events-none absolute inset-0 transition-all duration-500 opacity-55"
          style={{
            backgroundImage: `
              radial-gradient(circle at 80% 20%, var(--signal) 0%, transparent 45%),
              radial-gradient(circle at 18% 75%, var(--accent) 0%, transparent 42%),
              linear-gradient(135deg, rgba(8, 11, 20, 0.90) 0%, rgba(15, 23, 42, 0.75) 100%)
            `,
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col items-center justify-center px-5 py-24 sm:px-6">
          <h1 className="sr-only">
            YUVARAJ. Full-stack engineer. React, Angular, Vue, and Node.
          </h1>

          <div
            className="landing-rise relative w-[min(92vw,34rem)] aspect-square"
            style={{ animationDelay: "0.06s" }}
          >
            <svg
              viewBox="0 0 500 500"
              className="absolute inset-0 h-full w-full overflow-visible font-[family-name:var(--font-display)]"
              aria-hidden
            >
              <defs>
                <linearGradient id={nameGradId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--signal)" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <path
                  id={topArcId}
                  d="M 72,250 A 178,178 0 0 1 428,250"
                  fill="none"
                />
                <path
                  id={bottomArcId}
                  d="M 72,250 A 178,178 0 0 0 428,250"
                  fill="none"
                />
              </defs>

              <circle
                cx="250"
                cy="250"
                r="142"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.25"
              />

              <text
                fill={`url(#${nameGradId})`}
                fontSize="44"
                fontWeight="800"
                letterSpacing="10"
              >
                <textPath
                  href={`#${topArcId}`}
                  startOffset="50%"
                  textAnchor="middle"
                  textLength="360"
                  lengthAdjust="spacing"
                >
                  YUVARAJ
                </textPath>
              </text>

              <text
                fontSize="14.5"
                fontWeight="700"
                letterSpacing="1.4"
              >
                <textPath
                  href={`#${bottomArcId}`}
                  startOffset="50%"
                  textAnchor="middle"
                  textLength="470"
                  lengthAdjust="spacing"
                >
                  <tspan fill="#fbbf24">Full-Stack Engineer</tspan>
                  <tspan fill="rgba(255,255,255,0.4)"> • </tspan>
                  <tspan fill="#38bdf8">React</tspan>
                  <tspan fill="rgba(255,255,255,0.4)"> • </tspan>
                  <tspan fill="#f43f5e">Angular</tspan>
                  <tspan fill="rgba(255,255,255,0.4)"> • </tspan>
                  <tspan fill="#10b981">Vue</tspan>
                  <tspan fill="rgba(255,255,255,0.4)"> • </tspan>
                  <tspan fill="#34d399">Node</tspan>
                </textPath>
              </text>
            </svg>

            <div 
              className="absolute inset-[23.5%] overflow-hidden rounded-full border border-white/20 bg-white/5"
              style={{
                boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45), 0 0 35px var(--signal-soft)",
              }}
            >
              <Image
                src="/assets/profile/yuvaraj.png"
                alt="Yuvaraj"
                fill
                priority
                sizes="(min-width: 768px) 22rem, 70vw"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>

          <div
            className="landing-rise mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
            style={{ animationDelay: "0.28s" }}
          >
            <Link
              href="/portfolio"
              className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-95"
              style={{
                backgroundColor: "var(--signal)",
              }}
            >
              View work
            </Link>
            <Link
              href="/connect"
              className="rounded-xl border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[var(--signal)] hover:bg-white/10 hover:text-[var(--signal)]"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}
