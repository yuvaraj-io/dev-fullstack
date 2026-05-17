"use client";

type MediumCardProps = {
  title?: string;
  content?: string;
  medium?: string;
  stackblitz?: string;
  border?: "purple" | "yellow" | "red" | "pink";
};

const BORDER_STYLES: Record<
  NonNullable<MediumCardProps["border"]>,
  string
> = {
  purple: "border-blue-200 hover:bg-blue-50",
  yellow: "border-amber-200 hover:bg-amber-50",
  red: "border-rose-200 hover:bg-rose-50",
  pink: "border-teal-200 hover:bg-teal-50",
};

export default function MediumCard({
  title,
  content,
  medium,
  stackblitz,
  border = "purple",
}: MediumCardProps) {
  const borderClass = BORDER_STYLES[border];

  return (
    <div className={`w-full rounded-lg border bg-white shadow-sm ${borderClass}`}>
      {/* Title */}
      {title && medium && (
        <h4
          onClick={() => window.open(medium, "_blank")}
          className="cursor-pointer border-b border-slate-200 p-3 text-lg font-medium text-slate-950"
        >
          {title}
        </h4>
      )}

      {/* Content */}
      {content && (
        <div className="p-4 text-sm leading-snug text-slate-600">
          {content.slice(0, 200)}...
          {medium && (
            <a
              href={medium}
              target="_blank"
              className="ml-1 text-blue-700 hover:underline"
            >
              Read more
            </a>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 p-4 pt-0">
        {stackblitz && (
          <button
            onClick={() => window.open(stackblitz, "_blank")}
            className="rounded-md border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-700 hover:bg-blue-600 hover:text-white"
          >
            Stackblitz
          </button>
        )}

        {medium && (
          <button
            onClick={() => window.open(medium, "_blank")}
            className="rounded-md border border-blue-200 bg-blue-50 px-4 py-1 text-sm text-blue-700 hover:bg-blue-600 hover:text-white"
          >
            Medium
          </button>
        )}
      </div>
    </div>
  );
}
