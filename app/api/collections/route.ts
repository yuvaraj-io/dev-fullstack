import { NextRequest, NextResponse } from "next/server";
import { getDb, getNextSequence } from "@/lib/db";

export const runtime = "nodejs";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

/**
 * POST /api/collections
 * Create collection
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, topics_id } = body;

    if (!title || !topics_id) {
      return NextResponse.json(
        { error: "Title and topics_id are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const id = await getNextSequence("collections");

    await db.collection("collections").insertOne({
      id,
      title,
      topics_id: Number(topics_id),
      title_index: null,
    });

    return NextResponse.json(
      { message: "Collection added successfully", id },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

/**
 * GET /api/collections
 * Fetch all collections
 */
export async function GET() {
  try {
    const db = await getDb();
    const results = await db.collection("collections").find().sort({ id: 1 }).toArray();
    return NextResponse.json(results, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
