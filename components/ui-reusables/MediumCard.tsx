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
  purple: "border-purple-400 hover:bg-purple-900/30",
  yellow: "border-yellow-400 hover:bg-yellow-900/30",
  red: "border-red-400 hover:bg-red-900/30",
  pink: "border-pink-400 hover:bg-pink-900/30",
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
    <div className={`w-full border ${borderClass}`}>
      {/* Title */}
      {title && medium && (
        <h4
          onClick={() => window.open(medium, "_blank")}
          className="cursor-pointer border-b border-slate-400 p-3 text-lg font-medium"
        >
          {title}
        </h4>
      )}

      {/* Content */}
      {content && (
        <div className="p-4 text-sm leading-snug text-slate-300">
          {content.slice(0, 200)}...
          {medium && (
            <a
              href={medium}
              target="_blank"
              className="ml-1 text-purple-400 hover:underline"
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
            className="border border-purple-500 px-4 py-1 text-sm hover:bg-purple-600"
          >
            Stackblitz
          </button>
        )}

        {medium && (
          <button
            onClick={() => window.open(medium, "_blank")}
            className="border border-purple-500 px-4 py-1 text-sm hover:bg-purple-600"
          >
            Medium
          </button>
        )}
      </div>
    </div>
  );
}
