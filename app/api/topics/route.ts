import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

type TopicRow = RowDataPacket & {
  id: number;
  name: string;
};

export async function GET() {
  try {
    console.log("topics logging");

    const [rows] = await pool.query<TopicRow[]>(
      "SELECT * FROM topics"
    );

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

    const sql = "INSERT INTO topics (name) VALUES (?)";
    const [result]: any = await pool.query(sql, [name]);

    return NextResponse.json(
      { message: "Topic added successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
