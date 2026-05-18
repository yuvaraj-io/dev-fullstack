"use client";

import { ReactNode } from "react";
import { StackblitzItem } from "@/types/content";

type Props = {
  icon: ReactNode;
  color: "yellow-400" | "red-400" | "pink-400" | "blue-400" | "green-400";
  props: StackblitzItem;
};

const BAR: Record<Props["color"], string> = {
  "yellow-400": "bg-amber-400",
  "red-400":    "bg-rose-500",
  "pink-400":   "bg-pink-500",
  "blue-400":   "bg-blue-500",
  "green-400":  "bg-emerald-500",
};

export default function StackblitzCard({ icon, color, props }: Props) {
  return (
    <div
      onClick={() => window.open(props.url, "_blank")}
      className="group relative cursor-pointer rounded-2xl border border-slate-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
    >
      <div className={`h-1 w-full rounded-t-2xl ${BAR[color]}`} />

      <div className="p-4">
        <div className="absolute right-4 top-5 opacity-0 transition group-hover:opacity-100">
          {icon}
        </div>

        <div className="pr-6 text-sm font-bold text-slate-800 transition group-hover:text-violet-600">
          {props.title}
        </div>

        <p className="mt-2 text-xs leading-relaxed text-slate-500">{props.description}</p>

        <div className="mt-3 text-xs font-medium text-violet-600 opacity-0 transition group-hover:opacity-100">
          Open collection →
        </div>
      </div>
    </div>
  );
}
