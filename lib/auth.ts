import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export const SESSION_COOKIE = "devfullstack_session";

export type SessionDocument = {
  _id: string;
  userId: ObjectId;
  expiresAt: Date;
  createdAt: Date;
};

export type PublicUser = {
  id: string;
  username: string;
  fullName: string;
  profileImage: string;
};

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, storedKey] = storedHash.split(":");

  if (!salt || !storedKey) {
    return false;
  }

  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(storedKey, "hex");

  try {
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

export async function createUserSession(userId: ObjectId | string) {
  const db = await getDb();
  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await db.collection<SessionDocument>("sessions").insertOne({
    _id: token,
    userId: typeof userId === "string" ? new ObjectId(userId) : userId,
    expiresAt,
    createdAt: new Date(),
  });

  return { token, expiresAt };
}

export function getSessionTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null;
  }

  const trimmed = cookieHeader.trim();

  if (!trimmed.includes("=")) {
    return trimmed;
  }

  const cookie = trimmed
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${SESSION_COOKIE}=`));

  if (!cookie) {
    return null;
  }

  return cookie.split("=").slice(1).join("=");
}
