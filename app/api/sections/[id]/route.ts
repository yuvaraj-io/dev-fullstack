import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

/**
 * GET /api/sections/:id
 * Fetch sections by topic_id
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const db = await getDb();
    const results = await db
      .collection("sections")
      .find({ topic_id: Number(id) })
      .sort({ order_no: 1, id: 1 })
      .toArray();
    return NextResponse.json(results, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

/**
 * DELETE /api/sections/:id
 * Delete a specific section by section id
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const sectionId = Number(id);
    const db = await getDb();

    await db.collection("section_collections").deleteMany({ sectionId });
    const result = await db.collection("sections").deleteOne({ id: sectionId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Section ${sectionId} deleted successfully` },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
