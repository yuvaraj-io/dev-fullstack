import { NextRequest, NextResponse } from "next/server";
import { getDb, getNextSequence } from "@/lib/db";
import { saveResumeFile } from "@/lib/assets";

export const runtime = "nodejs";

const maxResumeSize = 5 * 1024 * 1024;

const errorMessage = (err: unknown) =>
  err instanceof Error ? err.message : "Unknown error";

const requiredString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function GET() {
  try {
    const db = await getDb();
    const applications = await db
      .collection("career_applications")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      applications.map((application) => ({
        ...application,
        _id: application._id.toString(),
      }))
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = requiredString(formData, "name");
    const email = requiredString(formData, "email");
    const phone = requiredString(formData, "phone");
    const location = requiredString(formData, "location");
    const portfolio = requiredString(formData, "portfolio");
    const availability = requiredString(formData, "availability");
    const motivation = requiredString(formData, "motivation");
    const resume = formData.get("resume");

    if (!name || !email || !phone || !location || !availability || !motivation) {
      return NextResponse.json(
        { error: "Name, email, phone, location, availability, and motivation are required" },
        { status: 400 }
      );
    }

    if (!(resume instanceof File)) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }

    if (resume.size > maxResumeSize) {
      return NextResponse.json(
        { error: "Resume must be 5MB or smaller" },
        { status: 400 }
      );
    }

    const resumeFile = await saveResumeFile({
      bytes: Buffer.from(await resume.arrayBuffer()),
      originalName: resume.name,
      mimeType: resume.type,
    });

    const db = await getDb();
    const id = await getNextSequence("career_applications");
    const now = new Date();

    await db.collection("career_applications").insertOne({
      id,
      role: "Internship Opportunity",
      name,
      email,
      phone,
      location,
      portfolio,
      availability,
      motivation,
      resume: resumeFile,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Application submitted successfully", id },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
