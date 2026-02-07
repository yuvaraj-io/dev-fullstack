import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

/**
 * POST /api/section/collections
 * Replace section collections for a sectionId
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sectionId, topicId, collections } = body;

    if (!sectionId || !topicId || !Array.isArray(collections)) {
      return NextResponse.json(
        { error: "sectionId, topicId, collections[] required" },
        { status: 400 }
      );
    }

    await pool.query(
      "DELETE FROM section_collections WHERE sectionId = ?",
      [sectionId]
    );

    const values = collections.map((c: number, i: number) => [
      sectionId,
      c,
      topicId,
      i + 1,
    ]);

    const sql = `
      INSERT INTO section_collections 
      (sectionId, collectionId, topicId, order_no)
      VALUES ?
    `;

    await pool.query(sql, [values]);
    return NextResponse.json(
      { message: "Replaced section collections successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
