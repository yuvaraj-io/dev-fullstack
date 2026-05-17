import { NextResponse } from "next/server";
import { getGroupedSectionCollections } from "@/lib/contentQueries";

export const runtime = "nodejs";

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

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

    const finalOutput = await getGroupedSectionCollections(id);

    return NextResponse.json(finalOutput, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
