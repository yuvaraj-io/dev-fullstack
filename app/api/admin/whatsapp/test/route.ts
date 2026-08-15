import { NextRequest, NextResponse } from "next/server";
import {
  canAccessAdmin,
  getAuthenticatedUserDocument,
  getSessionTokenFromCookie,
  resolveUserRole,
  SESSION_COOKIE,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { sendWhatsAppInquiryNotification } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = getSessionTokenFromCookie(cookieStore.get(SESSION_COOKIE)?.value ?? null);
    const auth = await getAuthenticatedUserDocument(token);

    if (!auth) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const actorRole = resolveUserRole(auth.user.username, auth.user.role);
    if (!canAccessAdmin(actorRole)) {
      return NextResponse.json({ success: false, message: "Admin access required." }, { status: 403 });
    }

    const testPayload = {
      name: "Test Client (System Verification)",
      email: "test@example.com",
      phone: "+91 98765 43210",
      projectType: "Full-Stack New Development (₹250/hr)",
      estimatedBudget: "₹20,000 – ₹30,000 / month",
      timeline: "1 Month (20 Working Days)",
      details: "This is a test notification triggered from the Yuvidev Admin Dashboard to verify WhatsApp alerts.",
      createdAt: new Date(),
    };

    const result = await sendWhatsAppInquiryNotification(testPayload);

    const targetPhone = (
      process.env.WHATSAPP_NOTIFICATION_PHONE ||
      process.env.ADMIN_WHATSAPP_PHONE ||
      "917204447908"
    ).replace(/\D/g, "");

    return NextResponse.json({
      success: true,
      provider: result.provider || "Console Fallback",
      targetPhone: `+${targetPhone}`,
      message: result.success
        ? `WhatsApp alert successfully sent to +${targetPhone} via ${result.provider}!`
        : `Notification logged to server. (To receive live WhatsApp pings on your phone, configure CallMeBot or Twilio API key in .env.local).`,
    });
  } catch (error: any) {
    console.error("WhatsApp test alert error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to trigger test alert." },
      { status: 500 }
    );
  }
}
