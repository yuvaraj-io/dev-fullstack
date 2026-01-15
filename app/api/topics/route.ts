import { NextResponse } from "next/server";
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
