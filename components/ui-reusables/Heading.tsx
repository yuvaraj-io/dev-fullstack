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
    <div
      className={clsx(
        "py-2r flex items-center justify-between",
        className
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <h2 className="flex items-center gap-3 text-4r mob:text-3r">
          {icon && <span className="text-purple-500">{icon}</span>}
          {text}
        </h2>

        {line && (
          <div className="h-1 w-96 rounded-sm bg-slate-200 mob:hidden" />
        )}
      </div>

      {/* Right CTA */}
      {arrowText && onClick && (
        <button
          onClick={onClick}
          className="hidden items-center gap-3 text-2r hover:text-purple-400 md:flex"
        >
          <span>{arrowText}</span>
          <BsArrowRight size={28} />
        </button>
      )}
    </div>
  );
}
