import { NextRequest, NextResponse } from "next/server";
import {
  canAccessAdmin,
  getAuthenticatedUserDocument,
  getSessionTokenFromCookie,
  resolveUserRole,
  SESSION_COOKIE,
} from "@/lib/auth";
import { cookies } from "next/headers";

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
    const status = searchParams.get("status") || "";
    const search = String(searchParams.get("search") || "").trim();

    const query: Record<string, any> = {};

    if (status && status !== "ALL") {
      query.status = status;
    }

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
        { phone: { $regex: escaped, $options: "i" } },
        { projectType: { $regex: escaped, $options: "i" } },
        { details: { $regex: escaped, $options: "i" } },
      ];
    }

    const inquiries = await auth.db
      .collection("inquiries")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const mapped = inquiries.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email || "",
      phone: doc.phone || "",
      projectType: doc.projectType || "New Development",
      estimatedBudget: doc.estimatedBudget || "",
      timeline: doc.timeline || "",
      details: doc.details || "",
      status: doc.status || "NEW",
      createdAt: doc.createdAt || null,
    }));

    return NextResponse.json({
      success: true,
      inquiries: mapped,
      total: mapped.length,
    });
  } catch (error: any) {
    console.error("Admin inquiries fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to load project inquiries." },
      { status: 500 }
    );
  }
}
