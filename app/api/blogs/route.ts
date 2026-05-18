import { NextRequest, NextResponse } from 'next/server';
import { getDb, getNextSequence } from '@/lib/db';

// ── Block types (mirror Editor.tsx) ──────────────────────────────────────────

type ContentBlock  = { id: number; type: 'content' | 'subheading'; content: string };
type CodeBlock     = { id: number; type: 'code'; code: string; codeType: string; link?: string; btn?: string };
type ImageBlock    = { id: number; type: 'image'; image?: string; assetId?: string; link?: string; btn?: string };
type BlogBlock     = ContentBlock | CodeBlock | ImageBlock;

const ALLOWED_TYPES = new Set(['content', 'subheading', 'code', 'image']);

function validateBlocks(raw: unknown): BlogBlock[] {
  if (!Array.isArray(raw)) throw new Error('content must be an array of blocks');

  return raw.map((item: unknown, i: number) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error(`Block ${i} is not an object`);
    }
    const block = item as Record<string, unknown>;

    if (typeof block.type !== 'string' || !ALLOWED_TYPES.has(block.type)) {
      throw new Error(`Block ${i} has invalid type "${block.type}"`);
    }
    if (typeof block.id !== 'number') {
      throw new Error(`Block ${i} is missing a numeric id`);
    }

    const type = block.type as BlogBlock['type'];

    if (type === 'content' || type === 'subheading') {
      if (typeof block.content !== 'string') throw new Error(`Block ${i} (${type}) missing content string`);
      return { id: block.id, type, content: block.content } as ContentBlock;
    }

    if (type === 'code') {
      if (typeof block.code !== 'string')     throw new Error(`Block ${i} (code) missing code string`);
      if (typeof block.codeType !== 'string') throw new Error(`Block ${i} (code) missing codeType string`);
      return {
        id: block.id,
        type: 'code',
        code: block.code,
        codeType: block.codeType,
        link: typeof block.link === 'string' ? block.link : '',
        btn:  typeof block.btn  === 'string' ? block.btn  : '',
      } as CodeBlock;
    }

    // type === 'image'
    return {
      id: block.id,
      type: 'image',
      image:   typeof block.image   === 'string' ? block.image   : '',
      assetId: typeof block.assetId === 'string' ? block.assetId : '',
      link:    typeof block.link    === 'string' ? block.link    : '',
      btn:     typeof block.btn     === 'string' ? block.btn     : '',
    } as ImageBlock;
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : 'Unknown error';

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /api/blogs — create blog
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { collections_id, content, heading } = body;

    if (!collections_id || !heading || !content) {
      return NextResponse.json(
        { error: 'collections_id, heading and content are required' },
        { status: 400 }
      );
    }

    const blocks = validateBlocks(content);

    const db = await getDb();
    const id = await getNextSequence('blogs');

    await db.collection('blogs').insertOne({
      id,
      heading,
      content: blocks,
      collections_id: Number(collections_id),
    });

    return NextResponse.json({ message: 'Blog added successfully', id }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

/**
 * PUT /api/blogs — update blog
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { collections_id, content, heading } = body;

    if (!collections_id || !heading || !content) {
      return NextResponse.json(
        { error: 'collections_id, heading, and content are required' },
        { status: 400 }
      );
    }

    const blocks = validateBlocks(content);

    const db = await getDb();
    const result = await db.collection('blogs').updateOne(
      { collections_id: Number(collections_id) },
      { $set: { heading, content: blocks } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'No blog found with that collections_id' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
