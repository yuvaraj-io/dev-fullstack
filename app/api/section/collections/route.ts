import { NextRequest, NextResponse } from "next/server";
import { getDb, getNextSequence } from "@/lib/db";

export const runtime = "nodejs";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

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

    const db = await getDb();

    await db
      .collection("section_collections")
      .deleteMany({ sectionId: Number(sectionId) });

    if (collections.length > 0) {
      const documents = await Promise.all(
        collections.map(async (c: number, i: number) => ({
          id: await getNextSequence("section_collections"),
          sectionId: Number(sectionId),
          collectionId: Number(c),
          topicId: Number(topicId),
          order_no: i + 1,
        }))
      );

      await db.collection("section_collections").insertMany(documents);
    }

    return NextResponse.json(
      { message: "Replaced section collections successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
