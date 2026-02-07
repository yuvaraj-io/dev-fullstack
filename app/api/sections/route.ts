import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/sections
 * Fetch all sections
 */
export async function GET() {
  try {
    const [results] = await pool.query("SELECT * FROM sections");
    return NextResponse.json(results, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
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

    const sql = `
      INSERT INTO sections (name, order_no, topic_id)
      VALUES (?, ?, ?)
    `;
    const [result]: any = await pool.query(sql, [name, order_no ?? 0, topicId]);

    return NextResponse.json(
      { message: "Section added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
