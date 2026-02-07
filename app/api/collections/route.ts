import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

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

    const [result]: any = await pool.query(
      "INSERT INTO collections (title, topics_id) VALUES (?, ?)",
      [title, topics_id]
    );

    return NextResponse.json(
      { message: "Collection added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * GET /api/collections
 * Fetch all collections
 */
export async function GET() {
  try {
    const [results] = await pool.query("SELECT * FROM collections");
    return NextResponse.json(results, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
