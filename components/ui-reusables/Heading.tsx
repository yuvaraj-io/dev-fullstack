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

export default function Heading({
  icon,
  text,
  line = false,
  arrowText,
  onClick,
  className,
  variant = "default",
}: HeadingProps) {
  return (
    <div className={clsx("flex items-center justify-between py-6 md:py-8", className)}>
      {/* Left */}
      <div className="flex items-center gap-6">
        <h2 className="flex items-center gap-3 text-3xl md:text-4xl">
          {icon && <span className="text-teal-600">{icon}</span>}
          {variant === "gradient" ? (
            <span className="text-slate-950">
              {text}
            </span>
          ) : (
            <span className="text-slate-950">{text}</span>
          )}
        </h2>

        {line && (
          <div
            className={clsx(
              "hidden h-1 w-96 rounded md:block",
              variant === "gradient"
                ? "bg-blue-200"
                : "bg-slate-300"
            )}
          />
        )}
      </div>

      {/* Right CTA */}
      {arrowText && (
        <button
          className="hidden items-center gap-3 text-xl text-slate-500 hover:text-blue-700 md:flex"
        >
          <span>{arrowText}</span>
          <BsArrowRight size={28} />
        </button>
      )}
    </div>
  );
}
