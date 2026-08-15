import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  canAccessAdmin,
  getAuthenticatedUserDocument,
  getSessionTokenFromCookie,
  resolveUserRole,
  SESSION_COOKIE,
} from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);
    const auth = await getAuthenticatedUserDocument(token);

    if (!auth) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const actorRole = resolveUserRole(auth.user.username, auth.user.role);
    if (!canAccessAdmin(actorRole)) {
      return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    }

    const body = await request.json();
    const { status, notes } = body;

    const updateDoc: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status) updateDoc.status = status;
    if (typeof notes === "string") updateDoc.notes = notes;

    await auth.db.collection("inquiries").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    return NextResponse.json({ success: true, message: "Inquiry updated successfully." });
  } catch (error: any) {
    console.error("Update inquiry error:", error);
    return NextResponse.json({ success: false, message: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID." }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);
    const auth = await getAuthenticatedUserDocument(token);

    if (!auth) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const actorRole = resolveUserRole(auth.user.username, auth.user.role);
    if (!canAccessAdmin(actorRole)) {
      return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    }

    await auth.db.collection("inquiries").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: "Inquiry deleted." });
  } catch (error: any) {
    console.error("Delete inquiry error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete inquiry." }, { status: 500 });
  }
}
