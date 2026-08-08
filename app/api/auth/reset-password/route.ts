import { NextResponse } from "next/server";
import { consumePasswordResetToken, hashPassword } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = String(body?.token ?? "").trim();
    const newPassword = String(body?.newPassword ?? "");
    const confirmPassword = String(body?.confirmPassword ?? "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Reset token is required." },
        { status: 400 }
      );
    }

    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New password and confirmation are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New password and confirmation do not match." },
        { status: 400 }
      );
    }

    const reset = await consumePasswordResetToken(token);

    if (!reset) {
      return NextResponse.json(
        { success: false, message: "This reset link is invalid or has expired." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection("users").updateOne(
      { _id: reset.userId },
      {
        $set: {
          passwordHash: hashPassword(newPassword),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Unable to reset password for this account." },
        { status: 404 }
      );
    }

    // Invalidate other unused reset tokens for this user.
    await db.collection("password_resets").updateMany(
      { userId: reset.userId, usedAt: null },
      { $set: { usedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can sign in now.",
    });
  } catch (error) {
    console.error("Reset password error", error);
    return NextResponse.json(
      { success: false, message: "Unable to reset password." },
      { status: 500 }
    );
  }
}
