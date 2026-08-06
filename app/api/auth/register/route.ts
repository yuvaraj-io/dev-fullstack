import { NextResponse } from "next/server";
import { createUserSession, hashPassword, normalizeUsername, SESSION_COOKIE } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = normalizeUsername(String(body?.username ?? ""));
    const password = String(body?.password ?? "");
    const fullName = String(body?.fullName ?? "").trim();
    const profileImage = String(body?.profileImage ?? "").trim();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const existingUser = await db.collection("users").findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username already exists." },
        { status: 409 }
      );
    }

    const userDoc = {
      username,
      passwordHash: hashPassword(password),
      fullName: fullName || username,
      profileImage: profileImage || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(userDoc);
    const { token, expiresAt } = await createUserSession(result.insertedId);

    const response = NextResponse.json({
      success: true,
      user: {
        id: result.insertedId.toString(),
        username,
        fullName: userDoc.fullName,
        profileImage: userDoc.profileImage,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Register error", error);
    return NextResponse.json(
      { success: false, message: "Unable to create account." },
      { status: 500 }
    );
  }
}
