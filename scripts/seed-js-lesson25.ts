/**
 * Seed Script: JavaScript "Lesson 25: Call Stack, Event Loop, and Callback Queue in JavaScript 🔄"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson25.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson25.ts
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
        "<p>In this lesson, we explore the internal runtime engine of JavaScript: the <strong>Call Stack</strong>, <strong>Event Loop</strong>, and <strong>Callback Queue (Task Queue)</strong>.</p><p>JavaScript is a single-threaded runtime, meaning it has only one call stack and executes one operation at a time. The event loop is the concurrency model that enables non-blocking asynchronous operations.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-25-call-stack-event-loop-and-callback-queue?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-25-call-stack-event-loop-and-callback-queue?file=script.js</a></p>',
    },

    // ── 1. Call Stack ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The Call Stack: Where Functions Execute 📝" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Call Stack</strong> is a LIFO (Last In, First Out) data structure that tracks active function execution frames. When a function is called, it is pushed onto the stack; when it returns, it is popped off:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet() {
  console.log("Hello!");
}

greet();
console.log("Goodbye!");

// Execution Flow:
// 1. greet() pushed onto Call Stack
// 2. console.log("Hello!") executed and popped
// 3. greet() finishes and pops off the stack
// 4. console.log("Goodbye!") pushed, executed, and popped`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Callback Queue ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Callback Queue: Waiting in Line ⏳" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When asynchronous Web APIs (like <code>setTimeout</code>, DOM events, or AJAX fetch requests) finish waiting, their callback functions are placed into the <strong>Callback Queue (Task Queue)</strong>, waiting for the call stack to become clear:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Start");

setTimeout(() => {
  console.log("Inside Timeout");
}, 0);

console.log("End");

// Output:
// Start
// End
// Inside Timeout (even with 0ms delay, the callback must wait in the queue!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Event Loop ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The Event Loop: The Traffic Controller 🚦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Event Loop</strong> continuously checks two conditions:</p><ol><li><strong>Is the Call Stack empty?</strong></li><li><strong>Is there a callback in the Callback Queue?</strong></li></ol><p>If the stack is completely clear, the event loop dequeues the first callback from the queue and pushes it onto the call stack for execution.</p>",
    },

    // ── Graphic Architecture ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BRWFMtdDUyVNtNo6OrIUDg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Analogy & Summary ──
    { id: nextId(), type: "heading" as const, content: "The Traffic Controller Analogy & Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Call Stack:</strong> The main highway where cars (functions) are actively moving.</li><li><strong>Callback Queue:</strong> The queue of waiting cars at a red signal.</li><li><strong>Event Loop:</strong> The traffic controller that allows waiting callbacks onto the highway as soon as the main road is clear.</li></ul><p>This architecture is the reason JavaScript can manage heavy concurrency and asynchronous tasks without freezing user interfaces.</p>",
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
    const collectionTitle = "Lesson 25: Call Stack, Event Loop, and Callback Queue in JavaScript 🔄";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 25;

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

    console.log("🎉 Done! JS Lesson 25 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
