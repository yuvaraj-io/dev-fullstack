import Link from "next/link";
import { socials } from "@/constants/commons/constants";

export default function ConnectSimple() {
  return (
    <section className="relative left-1/2 mb-8 w-screen -translate-x-1/2 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">
            Connect
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Have a product to ship?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Open to full-time roles, freelance builds, and focused consulting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/connect"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
          >
            Get in touch
          </Link>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
