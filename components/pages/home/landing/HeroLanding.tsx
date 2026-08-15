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
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.82)_0%,rgba(49,46,129,0.48)_45%,rgba(22,22,24,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.35),transparent_42%),radial-gradient(circle_at_12%_80%,rgba(20,184,166,0.18),transparent_36%)]" />

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
                  <stop offset="0%" stopColor="#ddd6fe" />
                  <stop offset="50%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#99f6e4" />
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
                fill="rgba(255,255,255,0.72)"
                fontSize="14.5"
                fontWeight="600"
                letterSpacing="1.4"
              >
                <textPath
                  href={`#${bottomArcId}`}
                  startOffset="50%"
                  textAnchor="middle"
                  textLength="470"
                  lengthAdjust="spacing"
                >
                  Full-stack engineer • React • Angular • Vue • Node
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-[23.5%] overflow-hidden rounded-full border border-white/20 bg-white/5 shadow-[0_24px_80px_rgba(124,58,237,0.28)]">
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
              href="/pricing"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:shadow-amber-500/45 hover:-translate-y-0.5"
            >
              <span>Get a Quote</span>
              <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[0.65rem] font-extrabold uppercase">
                ⚡ Instant
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
            >
              View work
            </Link>
            <Link
              href="/connect"
              className="rounded-xl border border-white/35 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-teal-300/60 hover:bg-white/10"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}
