import Image from "next/image";
import Link from "next/link";
import { portfolios } from "@/constants/commons/constants";

export default function PortfolioQuiet() {
  const items = portfolios.slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="mb-12 flex flex-col gap-4 border-b border-[var(--line)] pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--signal)]">
            Selected work
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
            Portfolio
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--signal)]"
        >
          View all projects →
        </Link>
      </div>

      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((project, index) => (
          <a
            key={project.mainHeading}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-6 py-8 transition md:grid-cols-[4.5rem_1.1fr_0.9fr] md:items-center md:gap-10"
          >
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--ink-soft)]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="space-y-3">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] transition group-hover:text-[var(--signal)] md:text-3xl">
                {project.mainHeading}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] md:text-base">
                {project.subtitle}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                {project.skills.join(" · ")}
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-violet-50">
              <Image
                src={project.img}
                alt={project.mainHeading}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
