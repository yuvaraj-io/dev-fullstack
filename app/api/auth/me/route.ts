import { NextResponse } from "next/server";
import { getSessionTokenFromCookie, SESSION_COOKIE, SessionDocument } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);

    if (!token) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const db = await getDb();
    const session = await db.collection<SessionDocument>("sessions").findOne({ _id: token });

    if (!session || new Date(session.expiresAt) < new Date()) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        fullName: user.fullName,
        profileImage: user.profileImage || "",
      },
    });
  } catch (error) {
    console.error("Me error", error);
    return NextResponse.json({ success: false, user: null }, { status: 500 });
  }
}
