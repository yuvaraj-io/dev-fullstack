import { NextRequest, NextResponse } from "next/server";
import { getDb, getNextSequence } from "@/lib/db";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

export async function GET() {
  try {
    console.log("topics logging");

    const db = await getDb();
    const rows = await db.collection("topics").find().sort({ id: 1 }).toArray();

    return NextResponse.json(rows, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/topics
 * Create topic
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Topic name is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const id = await getNextSequence("topics");

    await db.collection("topics").insertOne({ id, name });

    return NextResponse.json(
      { message: "Topic added successfully", id },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/topics
 * Delete topic and associated data
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(id);
    const db = await getDb();

    // Find and delete all child collections and blogs
    const cols = await db.collection("collections").find({ topics_id: numericId }).toArray();
    const colIds = cols.map((c) => c.id);

    if (colIds.length > 0) {
      await db.collection("blogs").deleteMany({ collections_id: { $in: colIds } });
    }

    await db.collection("section_collections").deleteMany({ topicId: numericId });
    await db.collection("sections").deleteMany({ topic_id: numericId });
    await db.collection("collections").deleteMany({ topics_id: numericId });
    await db.collection("topics").deleteOne({ id: numericId });

    return NextResponse.json(
      { message: `Topic ${id} and associated content deleted successfully` },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err) },
      { status: 500 }
    );
  }
}
