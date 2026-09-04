import { NextRequest, NextResponse } from "next/server";
import { getDb, getNextSequence } from "@/lib/db";

export const runtime = "nodejs";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

/**
 * GET /api/sections
 * Fetch all sections
 */
export async function GET() {
  try {
    const db = await getDb();
    const results = await db.collection("sections").find().sort({ id: 1 }).toArray();
    return NextResponse.json(results, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

/**
 * POST /api/sections
 * Create a section
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, order_no, topicId } = body;

    if (!name || topicId == null) {
      return NextResponse.json(
        { error: "name and topicId are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const id = await getNextSequence("sections");

    await db.collection("sections").insertOne({
      id,
      name,
      order_no: order_no ?? 0,
      topic_id: Number(topicId),
    });

    return NextResponse.json(
      { message: "Section added successfully", id },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

/**
 * DELETE /api/sections?id=<id>
 * Delete section and unlink its section_collections
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Section ID is required" }, { status: 400 });
    }

    const sectionId = Number(id);
    const db = await getDb();

    // Delete section collections links for this section
    await db.collection("section_collections").deleteMany({ sectionId });
    // Delete the section itself
    const result = await db.collection("sections").deleteOne({ id: sectionId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: `Section ${sectionId} and its associations deleted successfully` },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
