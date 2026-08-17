"use client";

import { useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type Topic = { id: number; name: string };
type Props = {
  topics: Topic[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: string | number) => void;
  variant?: "desktop" | "mobile";
};

export default function LearnDropdown({ topics, isOpen, onToggle, onSelect, variant = "desktop" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => { if (isOpen) onToggle(); });

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-xs transition hover:opacity-90 hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--signal)",
          color: "var(--signal-text, #ffffff)",
        }}
      >
        <span>Learn</span>
        {isOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
      </button>

      {isOpen && (
        <ul
          className={`${
            variant === "desktop"
              ? "absolute left-0 mt-2 w-48"
              : "absolute right-0 top-full z-[60] mt-2 w-56"
          } rounded-2xl border border-[var(--line)] bg-[var(--card)] py-1.5 shadow-2xl backdrop-blur-xl transition-all`}
        >
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onMouseDown={() => onSelect(topic.id)}
                onClick={() => onSelect(topic.id)}
                className="w-full px-4 py-2.5 text-left text-xs font-semibold text-[var(--ink)] transition hover:bg-[var(--signal-soft)] hover:text-[var(--signal)]"
              >
                {topic.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
