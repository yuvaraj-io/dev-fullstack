"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroLanding() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <Image
          src="/assets/profile/yuvaraj.png"
          alt="Yuvaraj"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.9)_0%,rgba(49,46,129,0.62)_45%,rgba(15,23,42,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(124,58,237,0.42),transparent_42%),radial-gradient(circle_at_12%_80%,rgba(20,184,166,0.22),transparent_36%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:pb-24">
          <p
            className="landing-rise font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.04em] text-white"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="bg-gradient-to-r from-violet-200 via-white to-teal-200 bg-clip-text text-transparent">
              YUVARAJ
            </span>
          </p>

          <div className="mt-8 max-w-xl">
            <h1
              className="landing-rise text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ animationDelay: "0.18s" }}
            >
              Full-stack engineer who ships product-ready web apps.
            </h1>
            <p
              className="landing-rise mt-4 text-base leading-relaxed text-white/75 md:text-lg"
              style={{ animationDelay: "0.28s" }}
            >
              React, Angular, Vue, and Node — built for clarity, speed, and
              long-term maintainability.
            </p>

            <div
              className="landing-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "0.38s" }}
            >
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
        </div>
      </div>
    </section>
  );
}
