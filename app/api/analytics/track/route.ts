import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { visitorId, path } = await req.json();

    if (!visitorId) {
      return NextResponse.json({ success: false, message: "Visitor ID required" }, { status: 400 });
    }

    const db = await getDb();
    
    await db.collection("analytics").insertOne({
      visitorId,
      path: path || "/",
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
