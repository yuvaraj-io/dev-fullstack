import { NextResponse } from 'next/server';
import pool  from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ THIS IS THE KEY

  console.log(id)
  const [results]: any = await pool.query(
    'SELECT * FROM blogs WHERE collections_id = ?',
    [id]
  );

  return NextResponse.json(results);
}
