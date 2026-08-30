/**
 * Seed Script: JavaScript "Lesson 61: Understanding Promises in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson61.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson61.ts
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
        "<p>In modern JavaScript, <strong>Promises</strong> serve as the cornerstone of asynchronous programming. A Promise is a special JavaScript object representing the eventual completion (fulfillment) or failure (rejection) of an asynchronous task.</p><p>In this lesson, we demystify Promises from scratch: instantiating with <code>new Promise()</code>, executing <code>resolve()</code> and <code>reject()</code>, handling outcomes with <code>.then()</code>, <code>.catch()</code>, and <code>.finally()</code>, inspecting hidden internal slots (<code>[[PromiseState]]</code> and <code>[[PromiseResult]]</code>), and understanding the <strong>Microtask Queue vs. Callback Queue</strong> priority hierarchy.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*yNkx1X7KMcXG43gHRS2AEg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-61-understanding-promises-in-javascript?file=index.html,script.js,Readme.md" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-61-understanding-promises-in-javascript?file=index.html,script.js,Readme.md</a></p>',
    },

    // ── 1. HTML Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Promises in JavaScript</title>
</head>
<body>
  <button id="resolveBtn">Resolve Promise</button>
  <button id="rejectBtn">Reject Promise</button>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Anatomy and 3 States ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The 3 States of a Promise" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every Promise object exists in exactly one of three immutable states:</p><ul><li>⏳ <strong>Pending:</strong> Initial state. The async operation is still ongoing; neither fulfilled nor rejected.</li><li>✅ <strong>Fulfilled:</strong> The operation completed successfully (via <code>resolve(value)</code>).</li><li>❌ <strong>Rejected:</strong> The operation failed with an error or exception (via <code>reject(reason)</code>).</li></ul>",
    },

    // ── 3. Creating, Resolving & Rejecting ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Creating, Resolving, and Rejecting Promises" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Basic Promise constructor with executor function:
const p1 = new Promise((resolve, reject) => {
  // Simulating async network delay:
  setTimeout(() => {
    resolve("Data successfully retrieved from server! 📦");
  }, 2000);
});

// 2. Controlled via User UI Buttons:
const p2 = new Promise((resolve, reject) => {
  document.getElementById("resolveBtn").addEventListener("click", () => {
    resolve("Promise Resolved by User Action ✅");
  });

  document.getElementById("rejectBtn").addEventListener("click", () => {
    reject(new Error("Promise Cancelled/Rejected by User ❌"));
  });
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Consuming Promises ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Consuming with .then(), .catch(), and .finally()" },
    {
      id: nextId(),
      type: "code" as const,
      code: `p2
  .then((data) => {
    // Executes upon fulfillment ✅
    console.log("Success:", data);
  })
  .catch((err) => {
    // Executes upon rejection or unexpected throw ❌
    console.error("Error caught:", err.message);
  })
  .finally(() => {
    // Executes regardless of outcome (cleanup logic) 🧹
    console.log("Promise settled (cleanup completed).");
  });`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Internal Mechanics ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Internal Properties: [[PromiseState]] & [[PromiseResult]]" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When inspecting Promise instances in developer tools, JavaScript engines maintain two internal slots:</p><ul><li><code>[[PromiseState]]</code>: <code>\"pending\"</code> | <code>\"fulfilled\"</code> | <code>\"rejected\"</code></li><li><code>[[PromiseResult]]</code>: Holds the resolved value payload or the rejection reason error.</li></ul>",
    },

    // ── 6. Microtask Queue vs Callback Queue ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Event Loop: Microtask Queue vs. Callback (Macrotask) Queue" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The JavaScript Event Loop gives <strong>Microtasks (Promise callbacks, queueMicrotask) strict priority over Macrotasks (setTimeout, setInterval, DOM events)</strong>. The Microtask Queue is completely drained after each synchronous tick before any Macrotask is processed:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Macrotask (Callback Queue)
setTimeout(() => {
  console.log("2. Timeout Macrotask ⏰ (Callback Queue)");
}, 0);

// Microtask (Microtask Queue - Higher Priority!)
Promise.resolve("1. Promise Microtask ✅ (Microtask Queue)")
  .then((msg) => console.log(msg));

// Output:
// 1. Promise Microtask ✅ (Microtask Queue)
// 2. Timeout Macrotask ⏰ (Callback Queue)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Promise Methods Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Handler / Property</th><th style=\"padding:8px;\">Trigger Condition</th><th style=\"padding:8px;\">Return Value / Behavior</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>.then(onFulfilled)</code></td><td style=\"padding:8px;\">When promise enters <code>fulfilled</code> state</td><td style=\"padding:8px;\">Returns a new Promise (chainable)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>.catch(onRejected)</code></td><td style=\"padding:8px;\">When promise enters <code>rejected</code> state</td><td style=\"padding:8px;\">Catches errors from any prior step in the chain</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>.finally(onSettled)</code></td><td style=\"padding:8px;\">When promise settles (either fulfilled or rejected)</td><td style=\"padding:8px;\">Ideal for loader spinners and closing connections</td></tr><tr><td style=\"padding:8px;\"><code>Microtask Queue</code></td><td style=\"padding:8px;\">Handles Promise fulfillment callbacks</td><td style=\"padding:8px;\">Executes with top priority before timer callbacks</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 61: Understanding Promises in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 61;

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

    console.log("🎉 Done! JS Lesson 61 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
