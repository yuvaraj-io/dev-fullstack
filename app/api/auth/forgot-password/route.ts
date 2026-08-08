import { NextResponse } from "next/server";
import { createPasswordResetToken, normalizeUsername } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = normalizeUsername(String(body?.username ?? ""));

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const user = await db.collection("users").findOne({ username });

    // Always return success to avoid username enumeration timing differences as much as practical.
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists for that username, you can reset the password next.",
        resetToken: null,
      });
    }

    const { token } = await createPasswordResetToken(user._id);

    return NextResponse.json({
      success: true,
      message: "Continue to set a new password for your account.",
      resetToken: token,
    });
  } catch (error) {
    console.error("Forgot password error", error);
    return NextResponse.json(
      { success: false, message: "Unable to start password reset." },
      { status: 500 }
    );
  }
}
