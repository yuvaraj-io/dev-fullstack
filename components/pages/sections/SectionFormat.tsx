"use client";

import { useState } from "react";
import { refreshApp } from "@/constants/commons/common-method";

type SectionItem = {
  id: number;
  name: string;
};

type SectionFormatProps = {
  sectionData: SectionItem[] | undefined;
  sectionId: number | undefined;
  activeSectionId: (id: number) => void;
  topicId: string | undefined;
};

export default function SectionFormat({
  sectionData,
  sectionId,
  activeSectionId,
  topicId,
}: SectionFormatProps) {
  const [sectionValue, setSectionValue] = useState("");
  const [saving, setSaving] = useState(false);

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
        refreshApp();
      }
    } catch (error) {
      console.error("Failed to add section:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
        {sectionData && sectionData.length > 0 ? (
          sectionData.map((c) => (
            <div
              key={c.id}
              className={
                "text-left p-2.5 px-3 text-sm rounded-lg cursor-pointer transition border " +
                (c.id === sectionId
                  ? "bg-blue-50 border-blue-300 text-blue-700 font-semibold shadow-xs"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50")
              }
              onClick={() => setSection(c.id)}
            >
              {c.id}. {c.name}
            </div>
          ))
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
          className="mt-2.5 w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
          onClick={submit}
          disabled={saving || !sectionValue.trim() || !topicId}
          type="button"
        >
          {saving ? "Adding..." : "+ Add Section"}
        </button>
      </div>
    </div>
  );
}
