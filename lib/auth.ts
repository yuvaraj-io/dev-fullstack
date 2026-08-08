import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "crypto";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

export const SESSION_COOKIE = "devfullstack_session";

export const USER_ROLES = ["admin", "superuser", "user"] as const;
export type UserRole = (typeof USER_ROLES)[number];

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
  role: UserRole;
};

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === "string" && (USER_ROLES as readonly string[]).includes(value);
}

export function getBootstrapAdminUsernames(): string[] {
  return String(process.env.ADMIN_USERNAME ?? "")
    .split(",")
    .map((entry) => normalizeUsername(entry))
    .filter(Boolean);
}

export function resolveUserRole(username: string, role?: unknown): UserRole {
  if (getBootstrapAdminUsernames().includes(normalizeUsername(username))) {
    return "admin";
  }

  if (isUserRole(role)) {
    return role;
  }

  return "user";
}

export function canAccessAdmin(role: UserRole): boolean {
  return role === "admin" || role === "superuser";
}

export function canManageRoles(role: UserRole): boolean {
  return role === "admin";
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

export type UserDocument = {
  _id: ObjectId;
  username: string;
  passwordHash: string;
  fullName?: string;
  profileImage?: string;
  role?: UserRole | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export function toPublicUser(user: {
  _id: ObjectId;
  username: string;
  fullName?: string;
  profileImage?: string;
  role?: unknown;
}): PublicUser {
  return {
    id: user._id.toString(),
    username: user.username,
    fullName: user.fullName || user.username,
    profileImage: user.profileImage || "",
    role: resolveUserRole(user.username, user.role),
  };
}

async function ensurePersistedRole(user: {
  _id: ObjectId;
  username: string;
  role?: unknown;
}) {
  const resolvedRole = resolveUserRole(user.username, user.role);

  if (user.role !== resolvedRole) {
    const db = await getDb();
    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { role: resolvedRole, updatedAt: new Date() } }
    );
  }

  return resolvedRole;
}

export async function getCurrentUser(sessionToken: string | null): Promise<PublicUser | null> {
  if (!sessionToken) {
    return null;
  }

  const db = await getDb();
  const session = await db.collection<SessionDocument>("sessions").findOne({ _id: sessionToken });

  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }

  const user = await db.collection<UserDocument>("users").findOne({ _id: session.userId });

  if (!user) {
    return null;
  }

  const role = await ensurePersistedRole({
    _id: user._id,
    username: user.username,
    role: user.role,
  });

  return toPublicUser({
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    profileImage: user.profileImage,
    role,
  });
}

export async function getAuthenticatedUserDocument(sessionToken: string | null) {
  if (!sessionToken) {
    return null;
  }

  const db = await getDb();
  const session = await db.collection<SessionDocument>("sessions").findOne({ _id: sessionToken });

  if (!session || new Date(session.expiresAt) < new Date()) {
    return null;
  }

  const user = await db.collection<UserDocument>("users").findOne({ _id: session.userId });

  if (!user) {
    return null;
  }

  const role = await ensurePersistedRole({
    _id: user._id,
    username: user.username,
    role: user.role,
  });

  return {
    db,
    user: { ...user, role } as UserDocument & { role: UserRole },
    session,
  };
}
