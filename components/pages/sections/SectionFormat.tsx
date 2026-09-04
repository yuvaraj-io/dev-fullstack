"use client";

import { useState } from "react";
import { FaTrash, FaPlus, FaSpinner } from "react-icons/fa";

type SectionItem = {
  id: number;
  name: string;
};

type SectionFormatProps = {
  sectionData: SectionItem[] | undefined;
  sectionId: number | undefined;
  activeSectionId: (id: number) => void;
  topicId: string | undefined;
  onRefresh?: () => void;
};

export default function SectionFormat({
  sectionData,
  sectionId,
  activeSectionId,
  topicId,
  onRefresh,
}: SectionFormatProps) {
  const [sectionValue, setSectionValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const setSection = (id: number) => {
    activeSectionId(id);
  };

  const submit = async () => {
    if (!sectionValue.trim() || !topicId) return;
    try {
      setSaving(true);
      let rawTopicId = topicId;
      try {
        rawTopicId = atob(topicId);
      } catch {
        rawTopicId = topicId;
      }

      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sectionValue.trim(),
          order_no: (sectionData?.length || 0) + 1,
          topicId: rawTopicId,
        }),
      });

      if (res.ok) {
        setSectionValue("");
        onRefresh?.();
      }
    } catch (error) {
      console.error("Failed to add section:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete section "${name}"? This will unlink its assigned collections.`)) {
      return;
    }

    try {
      setDeletingId(id);
      const res = await fetch(`/api/sections?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onRefresh?.();
      } else {
        alert("Failed to delete section.");
      }
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Error deleting section.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {sectionData && sectionData.length > 0 ? (
          sectionData.map((c) => {
            const isSelected = c.id === sectionId;
            const isDeleting = deletingId === c.id;

            return (
              <div
                key={c.id}
                className={
                  "group flex items-center justify-between p-2.5 px-3 text-sm rounded-lg cursor-pointer transition border " +
                  (isSelected
                    ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold shadow-xs"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50")
                }
                onClick={() => setSection(c.id)}
              >
                <span className="truncate flex-1 mr-2">
                  {c.id}. {c.name}
                </span>

                <button
                  type="button"
                  title="Delete section"
                  disabled={isDeleting}
                  onClick={(e) => handleDelete(c.id, c.name, e)}
                  className="shrink-0 p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition opacity-70 group-hover:opacity-100 disabled:opacity-40"
                >
                  {isDeleting ? (
                    <FaSpinner className="animate-spin text-xs text-red-500" />
                  ) : (
                    <FaTrash className="text-xs" />
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-xs text-slate-400 italic">No sections created yet.</p>
        )}
      </div>

      <div className="pt-4 border-t border-slate-200">
        <input
          type="text"
          placeholder="New Section Name..."
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sectionValue}
          onChange={(e) => setSectionValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />

        <button
          className="mt-2.5 flex items-center justify-center gap-1.5 w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
          onClick={submit}
          disabled={saving || !sectionValue.trim() || !topicId}
          type="button"
        >
          {saving ? (
            <>
              <FaSpinner className="animate-spin text-xs" /> Adding...
            </>
          ) : (
            <>
              <FaPlus className="text-[10px]" /> Add Section
            </>
          )}
        </button>
      </div>
    </div>
  );
}
