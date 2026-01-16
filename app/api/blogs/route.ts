import { NextRequest, NextResponse } from 'next/server';
import pool  from '@/lib/db';

interface BlogRequestBody {
  collections_id: number;
  heading: string;
  content: unknown;
}

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

    const jsonContent = JSON.stringify(content);

    const [result]: any = await pool.query(
      'INSERT INTO blogs (heading, content, collections_id) VALUES (?, ?, ?)',
      [heading, jsonContent, collections_id]
    );

    return NextResponse.json(
      { message: 'Blog added successfully', id: result.insertId },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
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

    const jsonContent = JSON.stringify(content);

    const [result]: any = await pool.query(
      `UPDATE blogs 
       SET heading = ?, content = ?
       WHERE collections_id = ?`,
      [heading, jsonContent, collections_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No blog found with that collections_id' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Blog updated successfully' },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
