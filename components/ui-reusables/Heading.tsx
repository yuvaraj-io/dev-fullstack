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
  variant?: "default" | "gradient";
};

export default function Heading({ icon, text, line = false, arrowText, onClick, className, variant = "default" }: HeadingProps) {
  return (
    <div className={clsx("flex items-center justify-between py-6 md:py-8", className)}>
      <div className="flex items-center gap-5">
        <h2 className="flex items-center gap-3 text-3xl font-extrabold md:text-4xl">
          {icon && <span className="text-violet-500">{icon}</span>}
          {variant === "gradient" ? (
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              {text}
            </span>
          ) : (
            <span className="text-slate-900">{text}</span>
          )}
        </h2>

        {line && (
          <div className={clsx(
            "hidden h-px w-64 md:block",
            variant === "gradient"
              ? "bg-gradient-to-r from-violet-200 to-transparent"
              : "bg-slate-200"
          )} />
        )}
      </div>

      {arrowText && (
        <button
          onClick={onClick}
          className="hidden items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600 md:flex"
        >
          {arrowText}
          <BsArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
