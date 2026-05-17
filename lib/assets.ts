import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";

const mimeExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export type AssetDocument = {
  _id?: ObjectId;
  filename: string;
  originalName: string;
  path: string;
  url: string;
  mimeType: string;
  size: number;
  storage: "filesystem";
  createdAt: Date;
};

export const getUploadRoot = () =>
  process.env.UPLOAD_DIR ?? join(process.cwd(), "public", "uploads");

export const getUploadPublicPath = () =>
  process.env.UPLOAD_PUBLIC_PATH ?? "/uploads";

export const isSupportedImage = (mimeType: string) =>
  Object.hasOwn(mimeExtensions, mimeType);

const sanitizeFileBase = (name: string) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";

export async function saveImageAsset({
  bytes,
  originalName,
  mimeType,
}: {
  bytes: Buffer;
  originalName: string;
  mimeType: string;
}) {
  if (!isSupportedImage(mimeType)) {
    throw new Error("Unsupported image type");
  }

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const extension = mimeExtensions[mimeType];
  const filename = `${sanitizeFileBase(originalName)}-${randomUUID()}.${extension}`;
  const uploadRoot = getUploadRoot();
  const directory = join(uploadRoot, "blogs", year, month);
  const filePath = join(directory, filename);

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, bytes);

  const normalizedRelativePath = relative(uploadRoot, filePath).replaceAll("\\", "/");
  const url = `${getUploadPublicPath().replace(/\/$/, "")}/${normalizedRelativePath}`;

  const asset: AssetDocument = {
    filename,
    originalName,
    path: filePath,
    url,
    mimeType,
    size: bytes.length,
    storage: "filesystem",
    createdAt: now,
  };

  const db = await getDb();
  const result = await db.collection<AssetDocument>("assets").insertOne(asset);

  return {
    id: result.insertedId.toString(),
    ...asset,
  };
}
