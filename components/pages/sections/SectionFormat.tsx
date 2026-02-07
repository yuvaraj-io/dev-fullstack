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
              (c.id === sectionId ? "text-purple-500" : "")
            }
            onClick={() => setSection(c.id)}
          >
            {c.id} {c.name}
          </div>
        ))}
      <div className="pt-8">
        <input
          type="text"
          className="w-full text-2.5r text-purple-500"
          value={sectionValue}
          onChange={(e) => setSectionValue(e.target.value)}
        />
        <br />

        <button
          className="ml-5 mt-5 border border-solid border-purple-500 p-1r px-5 text-1.5r"
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
