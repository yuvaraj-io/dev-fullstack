import { NextRequest, NextResponse } from 'next/server';
import { getDb, getNextSequence } from '@/lib/db';

interface BlogRequestBody {
  collections_id: number;
  heading: string;
  content: unknown;
}

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Unknown error';

/**
 * POST /api/blogs
 * Create blog
 */
export async function POST(req: NextRequest) {
  try {
    const body: BlogRequestBody = await req.json();
    const { collections_id, content, heading } = body;

    if (!collections_id || !heading || !content) {
      return NextResponse.json(
        { error: 'collections_id, heading and content are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const id = await getNextSequence('blogs');

    await db.collection('blogs').insertOne({
      id,
      heading,
      content,
      collections_id: Number(collections_id),
    });

    return NextResponse.json(
      { message: 'Blog added successfully', id },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err) },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blogs
 * Update blog
 */
export async function PUT(req: NextRequest) {
  try {
    const body: BlogRequestBody = await req.json();
    const { collections_id, content, heading } = body;

    if (!collections_id || !heading || !content) {
      return NextResponse.json(
        { error: 'collections_id, heading, and content are required' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection('blogs').updateOne(
      { collections_id: Number(collections_id) },
      { $set: { heading, content } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'No blog found with that collections_id' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog updated successfully' },
      { status: 200 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err) },
      { status: 500 }
    );
  }
}
