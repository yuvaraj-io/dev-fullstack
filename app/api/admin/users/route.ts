import { NextRequest, NextResponse } from "next/server";
import {
  canAccessAdmin,
  getAuthenticatedUserDocument,
  getSessionTokenFromCookie,
  resolveUserRole,
  SESSION_COOKIE,
  UserRole,
} from "@/lib/auth";
import { cookies } from "next/headers";

const PAGE_SIZE = 15;

export async function GET(request: NextRequest) {
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

    if (!canAccessAdmin(actorRole)) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const search = String(searchParams.get("search") || "").trim();
    const skip = (page - 1) * PAGE_SIZE;
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const filter = escapedSearch
      ? {
          $or: [
            { username: { $regex: escapedSearch, $options: "i" } },
            { fullName: { $regex: escapedSearch, $options: "i" } },
            { role: { $regex: escapedSearch, $options: "i" } },
          ],
        }
      : {};

    const [total, users] = await Promise.all([
      auth.db.collection("users").countDocuments(filter),
      auth.db
        .collection("users")
        .find(filter, {
          projection: {
            username: 1,
            fullName: 1,
            profileImage: 1,
            role: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .toArray(),
    ]);

    return NextResponse.json({
      success: true,
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
      canManageRoles: actorRole === "admin",
      users: users.map((user) => ({
        id: user._id.toString(),
        username: user.username,
        fullName: user.fullName || user.username,
        profileImage: user.profileImage || "",
        role: resolveUserRole(user.username, user.role) as UserRole,
        createdAt: user.createdAt || null,
        updatedAt: user.updatedAt || null,
      })),
    });
  } catch (error) {
    console.error("Admin users list error", error);
    return NextResponse.json(
      { success: false, message: "Unable to load users." },
      { status: 500 }
    );
  }
}
