import { NextRequest, NextResponse } from "next/server";
import { saveImageAsset } from "@/lib/assets";

export const runtime = "nodejs";

const maxImageSize = 8 * 1024 * 1024;

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are supported" },
        { status: 400 }
      );
    }

    if (file.size > maxImageSize) {
      return NextResponse.json(
        { error: "Image must be 8MB or smaller" },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const asset = await saveImageAsset({
      bytes,
      originalName: file.name,
      mimeType: file.type,
    });

    return NextResponse.json({ asset }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err) },
      { status: 500 }
    );
  }
}
