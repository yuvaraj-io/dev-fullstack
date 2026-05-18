"use client";

type MediumCardProps = {
  title?: string;
  content?: string;
  medium?: string;
  stackblitz?: string;
  border?: "purple" | "yellow" | "red" | "pink";
};

const ACCENT: Record<NonNullable<MediumCardProps["border"]>, { bar: string; btn: string }> = {
  purple: { bar: "bg-violet-500",  btn: "bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white" },
  yellow: { bar: "bg-amber-400",   btn: "bg-amber-50  text-amber-700  hover:bg-amber-500  hover:text-white" },
  red:    { bar: "bg-rose-500",    btn: "bg-rose-50   text-rose-700   hover:bg-rose-600   hover:text-white" },
  pink:   { bar: "bg-teal-500",    btn: "bg-teal-50   text-teal-700   hover:bg-teal-600   hover:text-white" },
};

export default function MediumCard({ title, content, medium, stackblitz, border = "purple" }: MediumCardProps) {
  const { bar, btn } = ACCENT[border];

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]">

      {/* Colour top bar */}
      <div className={`h-1 w-full rounded-t-2xl ${bar}`} />

      {title && medium && (
        <h4
          onClick={() => window.open(medium, "_blank")}
          className="cursor-pointer border-b border-slate-100 p-3 text-sm font-semibold text-slate-800 transition hover:text-violet-600 line-clamp-2"
        >
          {title}
        </h4>
      )}

      {content && (
        <div className="flex-1 p-4 text-xs leading-relaxed text-slate-500">
          {content.slice(0, 180)}…
          {medium && (
            <a href={medium} target="_blank" className="ml-1 text-violet-600 hover:underline">
              Read more
            </a>
          )}
        </div>
      )}

      <div className="flex gap-2 px-4 pb-4">
        {stackblitz && (
          <button
            onClick={() => window.open(stackblitz, "_blank")}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition ${btn}`}
          >
            Stackblitz
          </button>
        )}
        {medium && (
          <button
            onClick={() => window.open(medium, "_blank")}
            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
          >
            Medium →
          </button>
        )}
      </div>
    </div>
  );
}
