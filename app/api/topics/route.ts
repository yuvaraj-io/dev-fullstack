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
