import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/collectionsById/:id
 * Fetch collections by topics_id
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const [results] = await pool.query(
      "SELECT * FROM collections WHERE topics_id = ?",
      [id]
    );
    return NextResponse.json(results, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
