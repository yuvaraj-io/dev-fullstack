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
        <h2 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight md:text-4xl">
          {icon && <span style={{ color: "var(--signal)" }}>{icon}</span>}
          {variant === "gradient" ? (
            <span
              className="bg-clip-text text-transparent transition-all duration-300"
              style={{ backgroundImage: "var(--header-grad)" }}
            >
              {text}
            </span>
          ) : (
            <span className="text-slate-900 dark:text-white">{text}</span>
          )}
        </h2>

        {line && (
          <div
            className="hidden h-px w-64 md:block transition-all duration-300"
            style={{
              background:
                variant === "gradient"
                  ? "linear-gradient(to right, var(--line), transparent)"
                  : "var(--line)",
            }}
          />
        )}
      </div>

      {arrowText && (
        <button
          onClick={onClick}
          className="hidden items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[var(--signal)] md:flex dark:text-slate-400"
        >
          {arrowText}
          <BsArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
