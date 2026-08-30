"use client";

import { useEffect, useMemo, useState } from "react";
import Heading from "@/components/ui-reusables/Heading";
import SectionFormat from "./SectionFormat";
import Collections from "./Collections";

type Topic = { id: number; name: string };
type SectionItem = { id: number; name: string };
type CollectionItem = { id: number; title: string };
type SectionCollection = {
  id?: number;
  sectionId: number;
  section_name: string;
  collections: { id?: number; collectionId: number; collection_title: string }[];
};

export default function SectionsPage() {
  const [learnId, setLearnId] = useState<string | undefined>(undefined);
  const [sectionId, setActiveSectionId] = useState<number | undefined>(undefined);

  const [topics, setTopics] = useState<Topic[]>([]);
  const [sectionData, setSectionData] = useState<SectionItem[]>([]);
  const [sectionCollectionData, setSectionCollectionData] = useState<SectionCollection[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);

  const [localSectionCollections, setLocalSectionCollections] = useState<Record<number, number[]>>({});
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        const validTopics = Array.isArray(data) ? data : [];
        setTopics(validTopics);
        if (validTopics.length > 0) {
          setLearnId(btoa(String(validTopics[0].id)));
        }
      } catch (err) {
        console.error("Error loading topics:", err);
        setTopics([]);
      } finally {
        setLoadingTopics(false);
      }
    };
    loadTopics();
  }, []);

  useEffect(() => {
    if (!learnId) return;
    let topicId = "";
    try {
      topicId = atob(learnId);
    } catch {
      topicId = learnId;
    }

    const load = async () => {
      try {
        setLoadingData(true);
        const [sectionsRes, sectionCollectionsRes, collectionsRes] = await Promise.all([
          fetch(`/api/sections/${topicId}`),
          fetch(`/api/section/collections/${topicId}`),
          fetch(`/api/collectionsById/${topicId}`),
        ]);

        const [sectionsJson, sectionCollectionsJson, collectionsJson] = await Promise.all([
          sectionsRes.ok ? sectionsRes.json() : [],
          sectionCollectionsRes.ok ? sectionCollectionsRes.json() : [],
          collectionsRes.ok ? collectionsRes.json() : [],
        ]);

        const validSections: SectionItem[] = Array.isArray(sectionsJson) ? sectionsJson : [];
        setSectionData(validSections);
        setSectionCollectionData(
          Array.isArray(sectionCollectionsJson) ? sectionCollectionsJson : []
        );
        setCollections(Array.isArray(collectionsJson) ? collectionsJson : []);

        if (validSections.length > 0) {
          setActiveSectionId((prev) => (prev && validSections.some((s) => s.id === prev) ? prev : validSections[0].id));
        } else {
          setActiveSectionId(undefined);
        }
      } catch (err) {
        console.error("Error loading section details:", err);
      } finally {
        setLoadingData(false);
      }
    };

    load();
  }, [learnId]);

  const selectedCollections = useMemo(() => {
    if (!sectionId) return [];

    if (localSectionCollections[sectionId]) {
      return localSectionCollections[sectionId];
    }

    const section = sectionCollectionData?.find((s) => s.sectionId === sectionId);
    return Array.isArray(section?.collections)
      ? section.collections.map((c) => c?.collectionId).filter((id): id is number => typeof id === "number")
      : [];
  }, [sectionId, sectionCollectionData, localSectionCollections]);

  const markCollections = (collectionId: number) => {
    if (!sectionId) return;
    setLocalSectionCollections((prev) => {
      const current = prev[sectionId] || selectedCollections;
      const updated = current.includes(collectionId)
        ? current.filter((id) => id !== collectionId)
        : [...current, collectionId];

      return {
        ...prev,
        [sectionId]: updated,
      };
    });
  };

  const saveCollections = async () => {
    if (!learnId || !sectionId) return;
    try {
      setSaving(true);
      setStatusMessage(null);
      let topicId = "";
      try {
        topicId = atob(learnId);
      } catch {
        topicId = learnId;
      }

      const res = await fetch("/api/section/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId,
          sectionId,
          collections: selectedCollections,
        }),
      });

      if (res.ok) {
        setStatusMessage("Saved successfully!");
        setTimeout(() => setStatusMessage(null), 3000);
        const sectionCollectionsRes = await fetch(`/api/section/collections/${topicId}`);
        if (sectionCollectionsRes.ok) {
          const sectionCollectionsJson = await sectionCollectionsRes.json();
          setSectionCollectionData(
            Array.isArray(sectionCollectionsJson) ? sectionCollectionsJson : []
          );
        }
      } else {
        setStatusMessage("Failed to save.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Error saving collections.");
    } finally {
      setSaving(false);
    }
  };

  const selectedTopicId = useMemo(() => {
    if (!learnId) return null;
    try {
      return Number(atob(learnId));
    } catch {
      return Number(learnId);
    }
  }, [learnId]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Sections &amp; Collections</h1>
          <p className="text-sm text-slate-500">Configure topic sections and link collections to each section.</p>
        </div>
        <div className="flex items-center gap-3">
          {statusMessage && (
            <span className="text-sm font-medium text-emerald-600 transition">{statusMessage}</span>
          )}
          <button
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
            onClick={saveCollections}
            disabled={saving || !learnId || !sectionId}
            type="button"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Topics Column */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <Heading text="1. Topics" className="!py-2" />
          {loadingTopics ? (
            <div className="flex items-center gap-2 py-4 text-sm text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              Loading topics...
            </div>
          ) : (
            <ul className="mt-3 space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
              {topics.map((n) => {
                const isSelected = selectedTopicId === n.id;
                return (
                  <li
                    key={n.id}
                    onClick={() => setLearnId(btoa(String(n.id)))}
                    className={`cursor-pointer rounded-lg p-2.5 text-sm font-medium transition ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                    }`}
                  >
                    {n.id}. {n.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Sections Column */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <Heading text="2. Sections" className="!py-2" />
          {loadingData ? (
            <div className="flex items-center gap-2 py-4 text-sm text-slate-500">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
              Loading sections...
            </div>
          ) : (
            <SectionFormat
              sectionData={sectionData}
              sectionId={sectionId}
              activeSectionId={setActiveSectionId}
              topicId={learnId}
            />
          )}
        </div>

        {/* Preview Column */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <Heading text="3. Preview" className="!py-2" />
          <div className="mt-3 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {sectionCollectionData && sectionCollectionData.length > 0 ? (
              sectionCollectionData.map((c) => (
                <div
                  key={`${c.sectionId}-${c.section_name}`}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-xs"
                >
                  <div className="font-semibold text-blue-700 text-sm">
                    {c.sectionId}. {c.section_name}
                  </div>

                  <div className="mt-2 space-y-1">
                    {Array.isArray(c?.collections) && c.collections.length > 0 ? (
                      c.collections.map((s) => (
                        <div
                          key={`${s.collectionId}-${s.collection_title}`}
                          className={
                            "rounded p-1.5 px-2 text-xs transition " +
                            (selectedCollections.includes(s.collectionId)
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-slate-600 bg-slate-50")
                          }
                        >
                          • {s.collection_title}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 italic">No collections assigned</div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No grouped sections found for this topic.</p>
            )}
          </div>
        </div>

        {/* Collections Column */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
          <Heading text="4. Collections" className="!py-2" />
          <div className="mt-3">
            <Collections
              collections={collections}
              sectionCollectionData={sectionCollectionData}
              selectedCollections={selectedCollections}
              onToggle={markCollections}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
