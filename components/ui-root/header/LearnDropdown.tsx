import { useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type Topic = {
  id: number;
  name: string;
};

type Props = {
  topics: Topic[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: any) => void;
  variant?: "desktop" | "mobile";
};

export default function LearnDropdown({
  topics,
  isOpen,
  onToggle,
  onSelect,
  variant = "desktop",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (isOpen) onToggle();
  });

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 rounded-md bg-purple-600 px-3 py-1.5 text-white hover:bg-purple-700"
      >
        Learn
        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </button>

      {isOpen && (
        <ul
          className={
            variant === "desktop"
              ? "absolute left-0 mt-2 w-48 rounded-md bg-slate-800 shadow-lg"
              : "absolute right-0 top-full mt-2 w-56 rounded-md bg-slate-900 shadow-lg border border-slate-800 z-[60] pointer-events-auto"
          }
        >
          {topics.map(topic => (
            <li key={topic.id}>
              <button
                type="button"
                onMouseDown={() => onSelect(topic.id)}
                onClick={() => onSelect(topic.id)}
                className="w-full text-left cursor-pointer px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
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
