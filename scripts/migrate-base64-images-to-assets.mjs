import { MongoClient, ObjectId } from "mongodb";
import { mkdir, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { randomUUID } from "node:crypto";

const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "u816628190_yuvidev";
const uploadRoot = process.env.UPLOAD_DIR ?? join(process.cwd(), "public", "uploads");
const publicPath = process.env.UPLOAD_PUBLIC_PATH ?? "/uploads";

const mimeExtensions = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const sanitizeFileBase = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";

const parseDataUrl = (value) => {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(value);
  if (!match) return null;

  const [, mimeType, data] = match;
  const extension = mimeExtensions[mimeType];
  if (!extension) return null;

  return {
    mimeType,
    extension,
    bytes: Buffer.from(data, "base64"),
  };
};

const saveAsset = async ({ db, blogId, blockId, parsed }) => {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const directory = join(uploadRoot, "blogs", year, month);
  const filename = `${sanitizeFileBase(`blog-${blogId}-block-${blockId}`)}-${randomUUID()}.${parsed.extension}`;
  const filePath = join(directory, filename);

  await mkdir(directory, { recursive: true });
  await writeFile(filePath, parsed.bytes);

  const normalizedRelativePath = relative(uploadRoot, filePath).replaceAll("\\", "/");
  const url = `${publicPath.replace(/\/$/, "")}/${normalizedRelativePath}`;
  const asset = {
    _id: new ObjectId(),
    filename,
    originalName: filename,
    path: filePath,
    url,
    mimeType: parsed.mimeType,
    size: parsed.bytes.length,
    storage: "filesystem",
    migratedFrom: {
      collection: "blogs",
      blogId,
      blockId,
      field: "content.image",
    },
    createdAt: now,
  };

  await db.collection("assets").insertOne(asset);

  return {
    assetId: asset._id.toString(),
    url,
  };
};

const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const db = client.db(dbName);
  const blogs = await db.collection("blogs").find({ "content.type": "image" }).toArray();
  let migratedImages = 0;
  let touchedBlogs = 0;

  for (const blog of blogs) {
    let changed = false;
    const content = Array.isArray(blog.content) ? blog.content : [];
    const nextContent = [];

    for (const block of content) {
      if (block?.type !== "image" || typeof block.image !== "string") {
        nextContent.push(block);
        continue;
      }

      const parsed = parseDataUrl(block.image);
      if (!parsed) {
        nextContent.push(block);
        continue;
      }

      const saved = await saveAsset({
        db,
        blogId: blog.id ?? blog._id.toString(),
        blockId: block.id ?? randomUUID(),
        parsed,
      });

      nextContent.push({
        ...block,
        image: saved.url,
        assetId: saved.assetId,
      });

      migratedImages += 1;
      changed = true;
    }

    if (changed) {
      await db.collection("blogs").updateOne(
        { _id: blog._id },
        { $set: { content: nextContent, updatedAt: new Date() } }
      );
      touchedBlogs += 1;
    }
  }

  console.log(`Migrated ${migratedImages} image(s) across ${touchedBlogs} blog(s).`);
} finally {
  await client.close();
}
