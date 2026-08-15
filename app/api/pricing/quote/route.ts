import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendWhatsAppInquiryNotification } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, estimatedHours, estimatedBudget, timeline, details } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { success: false, message: "Please provide your name and either an email or phone number." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const doc = {
      name: name.trim(),
      email: (email || "").trim(),
      phone: (phone || "").trim(),
      projectType: projectType || "New Development",
      estimatedHours: Number(estimatedHours) || 80,
      estimatedBudget: estimatedBudget || "₹20,000 - ₹30,000",
      timeline: timeline || "1 Month",
      details: (details || "").trim(),
      status: "NEW",
      createdAt: new Date(),
    };

    await db.collection("inquiries").insertOne(doc);

    // Trigger WhatsApp notification asynchronously (does not block client response)
    sendWhatsAppInquiryNotification(doc).catch((notifyErr) => {
      console.warn("WhatsApp notification background warning:", notifyErr);
    });

    return NextResponse.json({
      success: true,
      message: "Project inquiry received! We will review your scope and get back to you within 24 hours.",
    });
  } catch (error: any) {
    console.error("Project quote inquiry error:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit project inquiry." },
      { status: 500 }
    );
  }
}
