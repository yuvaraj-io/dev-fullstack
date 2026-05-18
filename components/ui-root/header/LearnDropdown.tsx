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
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:scale-[1.02]"
      >
        Learn
        {isOpen ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
      </button>

      {isOpen && (
        <ul
          className={`${
            variant === "desktop"
              ? "absolute left-0 mt-2 w-48"
              : "absolute right-0 top-full z-[60] mt-2 w-56"
          } rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-200/80`}
        >
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                type="button"
                onMouseDown={() => onSelect(topic.id)}
                onClick={() => onSelect(topic.id)}
                className="w-full px-4 py-2.5 text-left text-sm text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
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
