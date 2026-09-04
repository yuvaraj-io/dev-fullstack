"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Heading from "@/components/ui-reusables/Heading";
import SectionFormat from "./SectionFormat";
import Collections from "./Collections";
import { FaTrash, FaTimes } from "react-icons/fa";

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

  const loadTopics = useCallback(async () => {
    try {
      setLoadingTopics(true);
      const res = await fetch("/api/topics");
      const data = await res.json();
      const validTopics = Array.isArray(data) ? data : [];
      setTopics(validTopics);
      if (validTopics.length > 0) {
        setLearnId((prev) => {
          if (!prev) return btoa(String(validTopics[0].id));
          try {
            const curId = Number(atob(prev));
            if (validTopics.some((t) => t.id === curId)) return prev;
          } catch {}
          return btoa(String(validTopics[0].id));
        });
      } else {
        setLearnId(undefined);
      }
    } catch (err) {
      console.error("Error loading topics:", err);
      setTopics([]);
    } finally {
      setLoadingTopics(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  const loadSectionDetails = useCallback(async () => {
    if (!learnId) return;
    let topicId = "";
    try {
      topicId = atob(learnId);
    } catch {
      topicId = learnId;
    }

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
  }, [learnId]);

  useEffect(() => {
    loadSectionDetails();
  }, [loadSectionDetails]);

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

  const handleDeleteTopic = async (topicIdToDelete: number, topicName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete topic "${topicName}" and ALL of its associated sections, collections, and articles? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/topics?id=${topicIdToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadTopics();
      } else {
        alert("Failed to delete topic.");
      }
    } catch (err) {
      console.error("Error deleting topic:", err);
      alert("Error deleting topic.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Sections &amp; Collections</h1>
          <p className="text-sm text-slate-500">Configure topic sections, delete obsolete sections, and link/unlink collections.</p>
        </div>
        <div className="flex items-center gap-3">
          {statusMessage && (
            <span className="text-sm font-medium text-emerald-600 transition">{statusMessage}</span>
          )}
          <button
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
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
                    className={`group flex items-center justify-between cursor-pointer rounded-lg p-2.5 text-sm font-medium transition ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                    }`}
                  >
                    <span className="truncate mr-2">{n.id}. {n.name}</span>
                    <button
                      type="button"
                      title="Delete topic"
                      onClick={(e) => handleDeleteTopic(n.id, n.name, e)}
                      className={`p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition ${
                        isSelected ? "text-white/80 hover:text-white hover:bg-blue-700" : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      <FaTrash size={11} />
                    </button>
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
              onRefresh={loadSectionDetails}
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
                      c.collections.map((s) => {
                        const isCurrentActiveSection = c.sectionId === sectionId;
                        return (
                          <div
                            key={`${s.collectionId}-${s.collection_title}`}
                            className={
                              "flex items-center justify-between rounded p-1.5 px-2 text-xs transition " +
                              (selectedCollections.includes(s.collectionId)
                                ? "bg-blue-50 text-blue-700 font-medium"
                                : "text-slate-600 bg-slate-50")
                            }
                          >
                            <span className="truncate mr-1">• {s.collection_title}</span>
                            {isCurrentActiveSection && (
                              <button
                                type="button"
                                title="Unlink from this section"
                                onClick={() => markCollections(s.collectionId)}
                                className="text-slate-400 hover:text-red-500 p-0.5 rounded cursor-pointer"
                              >
                                <FaTimes size={10} />
                              </button>
                            )}
                          </div>
                        );
                      })
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
