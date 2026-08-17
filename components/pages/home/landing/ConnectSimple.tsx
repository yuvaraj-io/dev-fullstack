import Link from "next/link";
import { socials } from "@/constants/commons/constants";

export default function ConnectSimple() {
  return (
    <section className="relative left-1/2 mb-8 w-screen -translate-x-1/2 border-t border-[var(--line)] bg-[var(--surface)] transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:py-24">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--signal)" }}>
            Connect
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
            Have a product to ship?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] font-light">
            Open to full-time roles, freelance builds, and focused technical consulting.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/connect"
            className="rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-95"
            style={{
              backgroundColor: "var(--signal)",
            }}
          >
            Get in touch
          </Link>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-6 py-3.5 text-sm font-bold text-[var(--ink)] shadow-2xs transition-all hover:border-[var(--signal)] hover:text-[var(--signal)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
