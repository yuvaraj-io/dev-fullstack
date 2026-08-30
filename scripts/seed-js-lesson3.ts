/**
 * Seed Script: JavaScript "Lesson 3: Comments in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson3.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson3.ts
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName =
  process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "devfullstack";

type CounterDocument = { _id: string; seq: number };

async function getNextSequence(client: MongoClient, name: string): Promise<number> {
  const db = client.db(dbName);
  const result = await db.collection<CounterDocument>("counters")
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  if (!result) throw new Error(`Unable to increment ${name} counter`);
  return result.seq as number;
}

function buildBlogBlocks() {
  let blockId = 1;
  const nextId = () => blockId++;

  return [
    // ── Introduction ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this lesson, we will explore <strong>Comments in JavaScript</strong>.</p><p>Comments are lines of code and notes that get completely ignored by the JavaScript engine when running your program. They are written specifically for developers to make code more readable, maintainable, and easier to understand.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-3-comments-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-3-comments-in-javascript?file=script.js</a></p>',
    },

    // ── Types of Comments ──
    { id: nextId(), type: "heading" as const, content: "🔹 Types of Comments in JavaScript" },

    // 1. Single-Line Comments
    { id: nextId(), type: "heading" as const, content: "1. Single-Line Comments" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Single-line comments start with <code>//</code> and continue until the end of that line. They are perfect for brief explanations, variable notes, or short inline descriptions.</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*jBrELORabclNqFys6TNuIQ.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// This is a single-line comment
let user = "Yuvaraj"; // Inline comment describing variable`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 2. Multi-Line Comments
    { id: nextId(), type: "heading" as const, content: "2. Multi-Line Comments" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Multi-line comments begin with <code>/*</code> and end with <code>*/</code>. They can span multiple lines, making them ideal for detailed architectural explanations or temporarily disabling blocks of code during development.</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*uBv5VV6UJ5z9bOnzX1APbQ.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/*
 * This is a multi-line comment.
 * It can span as many lines as you need.
 * Great for explaining functions or complex logic.
 */
function calculateTotal(price, tax) {
  return price + (price * tax);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Why Use Comments? ──
    { id: nextId(), type: "heading" as const, content: "Why Use Comments?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Explain Complex Code:</strong> Clarify non-obvious algorithms, edge cases, and business logic so teammates and future maintainers can follow along.</li><li><strong>Prevent Code Execution (Debugging):</strong> Temporarily disable code chunks without deleting them while testing hypotheses.</li><li><strong>Enhance Readability:</strong> Structure code into clean, annotated sections.</li></ul>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*RCvvidJdsPaOrODnM6VoYw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices for Writing Comments" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Explain the “Why” rather than the “What”:</strong> Focus on explaining <em>why</em> a particular solution or workaround was chosen rather than repeating what the code syntax already says.</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BWNTc22gRevsMyB-Kf0SnQ.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ Bad: Comments what code already clearly says
let age = 21; // Set age to 21

// ✅ Good: Explains why a specific business rule is applied
// Applying 10% discount for loyalty members during promotional week
let discount = isLoyaltyMember ? 0.10 : 0.0;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Keep Comments Up-to-Date:</strong> Ensure comments stay in sync with code updates — outdated comments are worse than no comments.</li><li><strong>Avoid Over-Commenting:</strong> Do not comment self-explanatory lines. Write clean code first, comment where context is necessary.</li><li><strong>Use Descriptive Comments:</strong> Provide real clarity that brings value to anyone reading your codebase.</li></ul>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "📌 Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Single-line comments:</strong> Use <code>//</code> for short notes on a single line.</li><li><strong>Multi-line comments:</strong> Use <code>/* ... */</code> for longer documentation or commenting out code blocks.</li><li><strong>Purpose:</strong> Boost readability, clarify intent, and assist during debugging.</li><li><strong>Rule of thumb:</strong> Strive for self-documenting code, and use comments to explain the underlying <em>why</em>.</li></ul>",
    },
  ];
}

async function main() {
  console.log(`\n🔗 Connecting to: ${uri}`);
  console.log(`📦 Database:      ${dbName}\n`);

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db(dbName);

    // 1. Find topic "javascript"
    const topic = await db.collection("topics").findOne({ name: /^javascript$/i });
    if (!topic) throw new Error('Topic "javascript" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction"
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Create collection
    const collectionTitle = "Lesson 3: Comments in JavaScript";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // 4. Link section_collections
    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 3;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: nextOrder,
    });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    // 5. Create Blog
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
    console.log(`✅ Created blog with ${blocks.length} blocks (id: ${blogId})\n`);

    console.log("┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Section-Collection ID: ${String(scId).padEnd(16)} │`);
    console.log(`│  Blog ID:               ${String(blogId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log(`│  Order in section:      ${String(nextOrder).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! JS Lesson 3 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
