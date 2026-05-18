"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  heading?: string;
  img?: string;
  skills?: string[];
  mainHeading?: string;
  subtitle?: string;
  link?: string;
};

const SKILL_COLOUR: Record<string, string> = {
  REACT: "bg-sky-50 text-sky-700",
  ANGULAR: "bg-rose-50 text-rose-700",
  VUE: "bg-emerald-50 text-emerald-700",
  "NODE.JS": "bg-lime-50 text-lime-700",
  TYPESCRIPT: "bg-blue-50 text-blue-700",
  JAVASCRIPT: "bg-amber-50 text-amber-700",
  HTML: "bg-orange-50 text-orange-700",
  CSS: "bg-indigo-50 text-indigo-700",
  BOOTSTRAP: "bg-purple-50 text-purple-700",
  MONGODB: "bg-green-50 text-green-700",
};

function skillClass(s: string) {
  return SKILL_COLOUR[s.toUpperCase()] ?? "bg-slate-100 text-slate-600";
}

export default function Card({ heading, img, skills = [], mainHeading, subtitle, link }: CardProps) {
  const router = useRouter();

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)]">

      {heading && (
        <h4 className="border-b border-slate-100 px-4 py-3 text-base font-semibold text-slate-800">
          {heading}
        </h4>
      )}

      {img && (
        <div className="overflow-hidden rounded-t-2xl">
          <div className="relative w-full pb-[56.25%]">
            <Image
              src={img}
              alt="card"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 px-4 py-3">
          {skills.map((s, i) => (
            <span key={i} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${skillClass(s)}`}>
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        {mainHeading && (
          <h4 className="text-lg font-bold text-slate-900">{mainHeading}</h4>
        )}
        {subtitle && (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">{subtitle}</p>
        )}
        {link && (
          <button
            onClick={() => router.push(link)}
            className="btn-shimmer mt-auto w-fit rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/20 transition hover:shadow-violet-500/40"
          >
            Live →
          </button>
        )}
      </div>
    </div>
  );
}
