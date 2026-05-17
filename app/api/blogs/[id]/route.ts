import { NextResponse } from 'next/server';
import { getBlogsByCollectionId } from '@/lib/contentQueries';

export const runtime = 'nodejs';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log(id)
  const results = await getBlogsByCollectionId(id);

  return NextResponse.json(results);
}
