/**
 * Seed Script: JavaScript "Lesson 59: Synchronous vs Asynchronous JavaScript — The Real Difference Explained (With Examples)"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson59.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson59.ts
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
        "<p>One of the foundational concepts in web engineering is understanding how JavaScript executes code. Because JavaScript is <strong>single-threaded</strong>, executing heavy or slow operations synchronously can completely lock the user interface.</p><p>In this lesson, we break down <strong>Synchronous vs. Asynchronous JavaScript</strong>, explore the Call Stack and Event Loop, demonstrate UI thread freezing, and examine why non-blocking asynchronous APIs are critical.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BieqFujqgqbNbwU0QeA_pQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-59-synchronous-vs-asynchronous-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-59-synchronous-vs-asynchronous-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. Single-Threaded Architecture ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ JavaScript is Single-Threaded" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript has a <strong>single Call Stack</strong> and executes in a single main thread per browser tab. It processes instructions line-by-line in sequential order and cannot natively execute multiple JavaScript instructions concurrently on the same thread.</p>",
    },

    // ── 2. What is Synchronous Code? ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ What Is Synchronous (Blocking) Code?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In synchronous execution, each line of code must fully finish before the next line begins. If an operation takes several seconds, the entire browser thread halts and waits:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Task 1");
console.log("Task 2");
console.log("Task 3");

// Output:
// Task 1
// Task 2
// Task 3`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Experiment: Freezing the Main Thread ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Experiment: Freezing the Main Thread 🧊" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a CPU-intensive while-loop runs on the main thread, the page becomes entirely unresponsive — animations pause, inputs stop typing, and clicks are ignored:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.querySelector(".block-btn");

btn.addEventListener("click", () => {
  const startTime = Date.now();
  let currentTime = startTime;

  // ⚠️ Hard synchronous busy-wait loop for 4,000ms:
  while (currentTime < startTime + 4000) {
    currentTime = Date.now();
  }

  console.log("Main thread was completely blocked for 4 seconds!");
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. What is Asynchronous Code? ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ What Is Asynchronous (Non-Blocking) Code?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In asynchronous execution, long-running tasks (network requests, timers, disk I/O) are handed off to the browser's <strong>Web APIs</strong> running in background C++ threads. JavaScript immediately continues executing the remaining script without blocking:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Start");

// Offloaded to browser Web API timer thread:
setTimeout(() => {
  console.log("Inside Timeout (4s later)");
}, 4000);

console.log("End");

// Output:
// Start
// End
// Inside Timeout (4s later)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Async Network Requests ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Asynchronous Network Requests (Async vs. Sync XHR)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✅ Recommended: Non-blocking Asynchronous Request (third param: true)
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true);
xhr.onload = function () {
  console.log("Image received without freezing UI:", JSON.parse(xhr.response).message);
};
xhr.send();

// ❌ Antipattern: Synchronous Request (third param: false)
// xhr.open("GET", "https://dog.ceo/api/breeds/image/random", false);
// xhr.send(); // Entire browser tab FREEZES until server responds! Deprecated!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Synchronous vs. Asynchronous Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Synchronous Execution</th><th style=\"padding:8px;\">Asynchronous Execution</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Execution Flow</td><td style=\"padding:8px;\">Sequential, line-by-line</td><td style=\"padding:8px;\">Non-blocking, background offloaded</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">UI Responsiveness</td><td style=\"padding:8px;\">Blocks and freezes during long tasks</td><td style=\"padding:8px;\">Smooth, UI remains active & interactive</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Underlying Mechanism</td><td style=\"padding:8px;\">Direct Call Stack execution</td><td style=\"padding:8px;\">Web APIs + Callback Queue + Event Loop</td></tr><tr><td style=\"padding:8px;\">Common Examples</td><td style=\"padding:8px;\">Math loops, <code>alert()</code>, <code>prompt()</code></td><td style=\"padding:8px;\"><code>fetch()</code>, <code>setTimeout()</code>, Event listeners</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 59: Synchronous vs Asynchronous JavaScript — The Real Difference Explained (With Examples)";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 59;

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

    console.log("🎉 Done! JS Lesson 59 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
