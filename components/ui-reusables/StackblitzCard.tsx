"use client";

import { ReactNode } from "react";

import { StackblitzItem } from "@/types/content";

export const redirect = (url: string) => {
    window.open(url);
}
type StackblitzCardProps = {
  icon: ReactNode;
  color: "yellow-400" | "red-400" | "pink-400" | "blue-400" | "green-400";
  props: StackblitzItem;
};

function StackblitzCard({ icon, color, props }: StackblitzCardProps) {
  return (
    <div
      className={`group relative cursor-pointer rounded-lg border bg-white p-3 shadow-sm border-${color}`}
      onClick={() => redirect(props.url)}
    >
      <div className="hidden group-hover:block absolute right-3">
        {icon}
      </div>

      <div className="cursor-pointer text-2.5r text-slate-950 hover:text-blue-700 hover:underline">
        {props.title}
      </div>

      <div className="pt-4 text-1.5r leading-tight text-slate-600">
        {props.description}
      </div>
    </div>
  );
}

export default StackblitzCard;
