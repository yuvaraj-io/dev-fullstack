import { NextResponse } from 'next/server';
import  pool  from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ THIS FIXES IT

    const sql = 'SELECT * FROM sections WHERE topic_id = ?';
    const [results]: any = await pool.query(sql, [id]);

    return NextResponse.json(results, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
