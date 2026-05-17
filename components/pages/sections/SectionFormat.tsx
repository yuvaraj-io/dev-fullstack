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
    if (!sectionValue || !topicId) return;
    try {
      setSaving(true);
      await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sectionValue,
          order_no: sectionData?.length || 0,
          topicId: atob(topicId),
        }),
      });
      refreshApp();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {sectionData &&
        sectionData.map((c) => (
          <div
            key={c.id}
            className={
              "text-left mt-4 p-1 px-4 text-2.5r mob:text-1.5r rounded-lg " +
              (c.id === sectionId ? "bg-blue-50 text-blue-700" : "text-slate-700")
            }
            onClick={() => setSection(c.id)}
          >
            {c.id} {c.name}
          </div>
        ))}
      <div className="pt-8">
        <input
          type="text"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-2.5r text-slate-900"
          value={sectionValue}
          onChange={(e) => setSectionValue(e.target.value)}
        />
        <br />

        <button
          className="ml-5 mt-5 rounded-md border border-blue-200 bg-blue-50 p-1r px-5 text-1.5r text-blue-700 hover:bg-blue-600 hover:text-white"
          onClick={submit}
          disabled={saving}
          type="button"
        >
          Submit
        </button>
      </div>
    </>
  );
}
