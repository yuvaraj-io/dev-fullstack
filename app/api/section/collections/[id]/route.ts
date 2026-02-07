import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

interface SectionCollectionRow {
  sectionId: number;
  section_name: string;
  collectionId: number;
  collection_title: string;
  topic_title: string;
  topicId: number;
  [key: string]: any;
}

interface GroupedSection {
  sectionId: number;
  section_name: string;
  collections: SectionCollectionRow[];
}

/**
 * GET /api/section/collections/:id
 * Fetch section collections by topicId
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const sql = `
      SELECT 
        sc.*,
        c.title AS collection_title,
        t.name AS topic_title,
        s.name AS section_name
      FROM section_collections sc
      JOIN collections c ON sc.collectionId = c.id
      JOIN topics t ON sc.topicId = t.id
      JOIN sections s ON sc.sectionId = s.id
      WHERE sc.topicId = ?;
    `;

    const [results] = await pool.query(sql, [id]);
    const rows = results as SectionCollectionRow[];

    rows.sort((a, b) => a.sectionId - b.sectionId);

    const grouped: Record<string, GroupedSection> = {};
    rows.forEach((item) => {
      const key = `${item.sectionId}-${item.section_name}`;
      if (!grouped[key]) {
        grouped[key] = {
          sectionId: item.sectionId,
          section_name: item.section_name,
          collections: [],
        };
      }
      grouped[key].collections.push(item);
    });

    const finalOutput = Object.values(grouped).sort(
      (a, b) => a.sectionId - b.sectionId
    );

    return NextResponse.json(finalOutput, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
