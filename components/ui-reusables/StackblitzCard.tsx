"use client";

import { ReactNode } from "react";

import { StackblitzItem } from "@/types/content";

export const redirect = (url:any) => {
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
      className={`group border p-3 relative cursor-pointer border-${color}`}
      onClick={() => redirect(props.url)}
    >
      <div className="hidden group-hover:block absolute right-3">
        {icon}
      </div>

      <div className="text-2.5r hover:text-purple-400 hover:underline cursor-pointer">
        {props.title}
      </div>

      <div className="text-1.5r text-slate-300 pt-4 leading-tight">
        {props.description}
      </div>
    </div>
  );
}

export default StackblitzCard;
