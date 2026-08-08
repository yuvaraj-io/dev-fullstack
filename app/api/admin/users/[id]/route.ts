import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  canManageRoles,
  getAuthenticatedUserDocument,
  getBootstrapAdminUsernames,
  getSessionTokenFromCookie,
  isUserRole,
  resolveUserRole,
  SESSION_COOKIE,
  UserRole,
} from "@/lib/auth";
import { cookies } from "next/headers";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const cookieStore = await cookies();
    const token = getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);
    const auth = await getAuthenticatedUserDocument(token);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "You must be signed in." },
        { status: 401 }
      );
    }

    const actorRole = resolveUserRole(auth.user.username, auth.user.role);

    if (!canManageRoles(actorRole)) {
      return NextResponse.json(
        { success: false, message: "Only admins can change user roles." },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid user id." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const role = body?.role;

    if (!isUserRole(role)) {
      return NextResponse.json(
        { success: false, message: "Role must be admin, superuser, or user." },
        { status: 400 }
      );
    }

    if (auth.user._id.toString() === id) {
      return NextResponse.json(
        { success: false, message: "You cannot change your own role." },
        { status: 400 }
      );
    }

    const targetUser = await auth.db.collection("users").findOne({ _id: new ObjectId(id) });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const bootstrapAdmins = getBootstrapAdminUsernames();
    if (bootstrapAdmins.includes(targetUser.username) && role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "This account is a bootstrap admin and must remain admin.",
        },
        { status: 400 }
      );
    }

    const currentRole = resolveUserRole(targetUser.username, targetUser.role) as UserRole;

    if (currentRole === "admin" && role !== "admin") {
      const adminCount = await auth.db.collection("users").countDocuments({ role: "admin" });
      const bootstrapMatches = bootstrapAdmins.filter(Boolean).length;
      const effectiveAdmins = Math.max(adminCount, bootstrapMatches);

      if (effectiveAdmins <= 1) {
        return NextResponse.json(
          { success: false, message: "At least one admin is required." },
          { status: 400 }
        );
      }
    }

    await auth.db.collection("users").updateOne(
      { _id: targetUser._id },
      { $set: { role, updatedAt: new Date() } }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: targetUser._id.toString(),
        username: targetUser.username,
        fullName: targetUser.fullName || targetUser.username,
        profileImage: targetUser.profileImage || "",
        role,
      },
    });
  } catch (error) {
    console.error("Admin role update error", error);
    return NextResponse.json(
      { success: false, message: "Unable to update role." },
      { status: 500 }
    );
  }
}
