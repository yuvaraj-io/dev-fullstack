import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

type ResultRow = RowDataPacket & {
  result: number;
};

export async function GET() {
  try {
    const [rows] = await pool.query<ResultRow[]>(
      "SELECT 1 + 1 AS result"
    );

    return NextResponse.json({
      success: true,
      result: rows[0].result
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}
