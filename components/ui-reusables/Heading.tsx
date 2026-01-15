"use client";

import { BsArrowRight } from "react-icons/bs";
import clsx from "clsx";

type HeadingProps = {
  icon?: React.ReactNode;
  text: string;
  line?: boolean;
  arrowText?: string;
  onClick?: () => void;
  className?: string;
};

export default function Heading({
  icon,
  text,
  line = false,
  arrowText,
  onClick,
  className,
}: HeadingProps) {
  return (
    <div className={clsx("flex items-center justify-between py-8", className)}>
      {/* Left */}
      <div className="flex items-center gap-6">
        <h2 className="flex items-center gap-3 text-4xl md:text-5xl">
          {icon && <span className="text-purple-500">{icon}</span>}
          {text}
        </h2>

        {line && (
          <div className="hidden h-1 w-96 rounded bg-slate-300 md:block" />
        )}
      </div>

      {/* Right CTA */}
      {arrowText && (
        <button
          className="hidden items-center gap-3 text-xl text-slate-300 hover:text-purple-400 md:flex"
        >
          <span>{arrowText}</span>
          <BsArrowRight size={28} />
        </button>
      )}
    </div>
  );
}
