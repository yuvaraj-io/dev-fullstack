import { getDb } from "@/lib/db";

export interface SectionCollectionRow {
  id?: number;
  sectionId: number;
  section_name: string;
  collectionId: number;
  collection_title: string;
  topic_title: string;
  topicId: number;
  order_no?: number;
}

export interface GroupedSection {
  sectionId: number;
  section_name: string;
  collections: SectionCollectionRow[];
}

type TopicDocument = {
  id: number;
  name: string;
};

type CollectionDocument = {
  id: number;
  title: string;
  topics_id: number;
};

type SectionDocument = {
  id: number;
  name: string;
  topic_id: number;
};

type SectionCollectionDocument = {
  id?: number;
  sectionId: number;
  collectionId: number;
  topicId: number;
  order_no?: number;
};

export async function getGroupedSectionCollections(
  topicId: string | number
): Promise<GroupedSection[]> {
  const db = await getDb();
  const normalizedTopicId = Number(topicId);

  const [sectionCollections, collections, topics, sections] = await Promise.all([
    db
      .collection<SectionCollectionDocument>("section_collections")
      .find({ topicId: normalizedTopicId })
      .sort({ sectionId: 1, order_no: 1, collectionId: 1 })
      .toArray(),
    db.collection<CollectionDocument>("collections").find({ topics_id: normalizedTopicId }).toArray(),
    db.collection<TopicDocument>("topics").find({ id: normalizedTopicId }).toArray(),
    db.collection<SectionDocument>("sections").find({ topic_id: normalizedTopicId }).toArray(),
  ]);

  const collectionById = new Map(collections.map((item) => [item.id, item]));
  const topicById = new Map(topics.map((item) => [item.id, item]));
  const sectionById = new Map(sections.map((item) => [item.id, item]));
  const grouped = new Map<string, GroupedSection>();

  sectionCollections.forEach((item) => {
    const collection = collectionById.get(item.collectionId);
    const topic = topicById.get(item.topicId);
    const section = sectionById.get(item.sectionId);

    if (!collection || !topic || !section) {
      return;
    }

    const key = `${item.sectionId}-${section.name}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        sectionId: item.sectionId,
        section_name: section.name,
        collections: [],
      });
    }

    grouped.get(key)?.collections.push({
      id: item.id,
      sectionId: item.sectionId,
      collectionId: item.collectionId,
      topicId: item.topicId,
      order_no: item.order_no,
      section_name: section.name,
      collection_title: collection.title,
      topic_title: topic.name,
    });
  });

  return Array.from(grouped.values()).sort((a, b) => a.sectionId - b.sectionId);
}

export async function getBlogsByCollectionId(collectionId: string | number) {
  const db = await getDb();
  return db
    .collection("blogs")
    .find({ collections_id: Number(collectionId) })
    .sort({ id: 1 })
    .toArray();
}

export async function getAllTopics(): Promise<TopicDocument[]> {
  const db = await getDb();
  return db.collection<TopicDocument>("topics").find().sort({ id: 1 }).toArray();
}


export async function getFirstTopicId(): Promise<number | null> {
  const db = await getDb();
  const topic = await db.collection<TopicDocument>("topics").findOne({}, { sort: { id: 1 } });
  return topic ? topic.id : null;
}

export interface SitemapCollectionItem {
  topicId: number;
  collectionId: number;
  collectionTitle: string;
  topicTitle: string;
  sectionName: string;
}

export async function getAllCollectionsForSitemap(): Promise<SitemapCollectionItem[]> {
  const db = await getDb();
  const [sectionCollections, collections, topics, sections] = await Promise.all([
    db.collection<SectionCollectionDocument>("section_collections").find().sort({ topicId: 1, sectionId: 1, order_no: 1 }).toArray(),
    db.collection<CollectionDocument>("collections").find().toArray(),
    db.collection<TopicDocument>("topics").find().toArray(),
    db.collection<SectionDocument>("sections").find().toArray(),
  ]);

  const collectionById = new Map(collections.map((item) => [item.id, item]));
  const topicById = new Map(topics.map((item) => [item.id, item]));
  const sectionById = new Map(sections.map((item) => [item.id, item]));

  const result: SitemapCollectionItem[] = [];

  for (const sc of sectionCollections) {
    const col = collectionById.get(sc.collectionId);
    const top = topicById.get(sc.topicId);
    const sec = sectionById.get(sc.sectionId);

    if (col && top) {
      result.push({
        topicId: sc.topicId,
        collectionId: sc.collectionId,
        collectionTitle: col.title,
        topicTitle: top.name,
        sectionName: sec ? sec.name : "Articles",
      });
    }
  }

  return result;
}

export function getSiblingCollections(
  sections: GroupedSection[],
  currentCollectionId: number | string | null
): { prev: SectionCollectionRow | null; next: SectionCollectionRow | null } {
  if (!currentCollectionId) return { prev: null, next: null };
  const normalizedId = Number(currentCollectionId);

  // Flatten all collections in the exact display sequence across sections
  const allCollections: SectionCollectionRow[] = [];
  sections.forEach((section) => {
    if (section.collections && Array.isArray(section.collections)) {
      allCollections.push(...section.collections);
    }
  });

  const currentIndex = allCollections.findIndex(
    (col) => col.collectionId === normalizedId
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? allCollections[currentIndex - 1] : null;
  const next =
    currentIndex < allCollections.length - 1
      ? allCollections[currentIndex + 1]
      : null;

  return { prev, next };
}

