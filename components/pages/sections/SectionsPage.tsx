"use client";

import { useEffect, useMemo, useState } from "react";
import Heading from "@/components/ui-reusables/Heading";
import SectionFormat from "./SectionFormat";
import Collections from "./Collections";
import { refreshApp } from "@/constants/commons/common-method";

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

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setTopics([]);
      } finally {
        setLoadingTopics(false);
      }
    };
    loadTopics();
  }, []);

  useEffect(() => {
    if (!learnId) return;
    const topicId = atob(learnId);

    const load = async () => {
      const [sectionsRes, sectionCollectionsRes, collectionsRes] = await Promise.all([
        fetch(`/api/sections/${topicId}`),
        fetch(`/api/section/collections/${topicId}`),
        fetch(`/api/collectionsById/${topicId}`),
      ]);

      const [sectionsJson, sectionCollectionsJson, collectionsJson] = await Promise.all([
        sectionsRes.json(),
        sectionCollectionsRes.json(),
        collectionsRes.json(),
      ]);

      setSectionData(Array.isArray(sectionsJson) ? sectionsJson : []);
      setSectionCollectionData(
        Array.isArray(sectionCollectionsJson) ? sectionCollectionsJson : []
      );
      setCollections(Array.isArray(collectionsJson) ? collectionsJson : []);
    };

    load();
  }, [learnId]);

  let topicsContent: React.ReactNode = null;
  if (loadingTopics) {
    topicsContent = (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
        loading...
      </div>
    );
  } else {
    topicsContent = topics.map((n) => (
      <li key={n.id} onClick={() => setLearnId(btoa(String(n.id)))}>
        {n.id} {n.name}
      </li>
    ));
  }

  const selectedCollections = useMemo(() => {
    if (!sectionId) return [];

    if (localSectionCollections[sectionId]) {
      return localSectionCollections[sectionId];
    }

    const section = sectionCollectionData?.find((s) => s.sectionId === sectionId);
    return section ? section.collections.map((c) => c.collectionId) : [];
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
      await fetch("/api/section/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: atob(learnId),
          sectionId,
          collections: selectedCollections,
        }),
      });
      refreshApp();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        className="ml-5 rounded-md border border-blue-200 bg-blue-50 p-1r px-5 text-1.5r text-blue-700 hover:bg-blue-600 hover:text-white"
        onClick={saveCollections}
        type="button"
      >
        Save
      </button>

      <div className="flex">
        <div className="w-1/5 mob:w-10">
          <Heading text="Topics" />
          <ul>{topicsContent}</ul>
        </div>

        <div className="w-1/5 mob:w-full">
          <Heading text="Sections" />
          <SectionFormat
            sectionData={sectionData}
            sectionId={sectionId}
            activeSectionId={setActiveSectionId}
            topicId={learnId}
          />
        </div>

        <div className="w-1/5 mob:w-full">
          <Heading text="Preview" />
          {sectionCollectionData &&
            sectionCollectionData.map((c) => (
              <div
                key={`${c.sectionId}-${c.section_name}`}
                className="mt-4 rounded-lg p-1 px-4 text-left text-2.5r text-blue-700 mob:text-1.5r"
              >
                {c.sectionId} {c.section_name}

                {c.collections.map((s) => (
                  <div
                    key={`${s.collectionId}-${s.collection_title}`}
                    className={
                      "text-left mt-4 p-1 px-4 text-2.5r mob:text-1.5r rounded-lg " +
                      (selectedCollections.includes(s.collectionId)
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700")
                    }
                  >
                    {s.collection_title}
                  </div>
                ))}
              </div>
            ))}
        </div>

        <div className="w-1/5 mob:w-full">
          <Heading text="Collections" />
          <Collections
            collections={collections}
            sectionCollectionData={sectionCollectionData}
            selectedCollections={selectedCollections}
            onToggle={markCollections}
          />
        </div>
      </div>
    </div>
  );
}
