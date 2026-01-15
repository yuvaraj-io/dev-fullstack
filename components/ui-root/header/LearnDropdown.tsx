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
  onSelect: (id: number) => void;
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
    <div ref={ref} className="relative">
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
              : "mt-2 space-y-2 pl-4"
          }
        >
          {topics.map(topic => (
            <li
              key={topic.id}
              onClick={() => onSelect(topic.id)}
              className="cursor-pointer px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
            >
              {topic.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
