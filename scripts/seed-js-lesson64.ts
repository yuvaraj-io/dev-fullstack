/**
 * Seed Script: JavaScript "Lesson 64: Mastering Async & Await in JavaScript — Making Promises Easy to Read"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson64.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson64.ts
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
        "<p>Introduced in ECMAScript 2017 (ES8), <strong>async / await</strong> provides syntactic sugar over JavaScript Promises. It enables developers to structure asynchronous, non-blocking code in a linear, synchronous-looking style without chaining nested <code>.then()</code> callbacks.</p><p>In this lesson, we explore how <code>async</code> and <code>await</code> work with the browser event loop, how to fetch data seamlessly with the Fetch API, how to execute sequential vs. parallel requests with <code>Promise.all()</code>, and how background C++ Web API threads keep the main thread fluid.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*2oAcafLEunfmVxsk6R9tQQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-64-mastering-async-await-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-64-mastering-async-await-in-javascript?file=index.html,script.js</a></p>',
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Async Await in JavaScript</title>
</head>
<body>
  <h1>🐶 Async & Await Demo</h1>
  <button id="fetchDog">Fetch Random Dog</button>
  <div id="dogContainer"></div>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Core Concepts: async & await ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Understanding async and await" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>async</code> keyword:</strong> Declares an asynchronous function that implicitly wraps return values into a resolved Promise.</li><li><strong><code>await</code> keyword:</strong> Can only be used inside an <code>async</code> function. It non-blockingly pauses execution until the targeted Promise settles (resolves or rejects), extracting its fulfillment value directly.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function greet() {
  console.log("1. Starting async task...");
  await delay(2000); // ⏳ Non-blocking pause for 2000ms
  console.log("2. Async task completed after 2 seconds! 🎉");
}

greet();
console.log("3. Synchronous code continues immediately without freezing!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Using async/await with Fetch API ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Fetching Data with async/await & try...catch" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById("fetchDog");
const dogContainer = document.getElementById("dogContainer");

btn.addEventListener("click", async () => {
  try {
    dogContainer.innerHTML = "<p>Loading dog image... 🐾</p>";

    // Await network response
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

    // Await stream parsing to JSON
    const data = await response.json();

    const img = document.createElement("img");
    img.src = data.message;
    img.alt = "Random Dog";
    img.width = 300;

    dogContainer.innerHTML = "";
    dogContainer.appendChild(img);
  } catch (error) {
    dogContainer.innerHTML = \`<p style="color:red;">Error: \${error.message}</p>\`;
    console.error("Fetch failure:", error);
  }
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Sequential vs. Parallel Execution ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Sequential vs. Parallel Execution Patterns" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When performing multiple asynchronous operations, deciding between <strong>Sequential</strong> (waterfall) and <strong>Parallel</strong> execution impacts performance significantly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `async function fetchDogUrl() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  return data.message;
}

// 🐢 1. SEQUENTIAL (Waterfall) - Total Time ≈ T1 + T2 + T3
async function loadSequentially() {
  for (let i = 0; i < 3; i++) {
    const dogUrl = await fetchDogUrl(); // Waits for previous to finish
    console.log(\`Dog \${i + 1} loaded:\`, dogUrl);
  }
}

// ⚡ 2. PARALLEL (Concurrent with Promise.all) - Total Time ≈ MAX(T1, T2, T3)
async function loadInParallel() {
  const promises = [fetchDogUrl(), fetchDogUrl(), fetchDogUrl()];
  const allDogs = await Promise.all(promises); // Executes concurrently!
  console.log("All 3 dogs loaded simultaneously:", allDogs);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Behind the Scenes Architecture ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Behind the Scenes: Web APIs & Event Loop" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When an <code>await</code> expression pauses function execution:</p><ol><li>The JavaScript runtime (V8) saves the function's execution state and yields control back to the Call Stack.</li><li>The browser's C++ Web APIs manage network I/O or timers in background threads without stalling the main UI thread.</li><li>Upon settlement, the continuation is queued in the <strong>Microtask Queue</strong>, resuming execution smoothly on the main thread when the Call Stack empties.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Callbacks vs Promises vs async/await" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Pattern</th><th style=\"padding:8px;\">Syntax Style</th><th style=\"padding:8px;\">Error Handling</th><th style=\"padding:8px;\">Readability</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Nested Callbacks</td><td style=\"padding:8px;\">Deep pyramid indentation</td><td style=\"padding:8px;\">Error-first arguments in each function</td><td style=\"padding:8px;\">Poor (Callback Hell)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Promise Chaining</td><td style=\"padding:8px;\">Linear <code>.then().then()</code> pipeline</td><td style=\"padding:8px;\">Chained <code>.catch()</code> block</td><td style=\"padding:8px;\">Good</td></tr><tr><td style=\"padding:8px;\"><strong>async / await</strong></td><td style=\"padding:8px;\">Synchronous-looking flat code</td><td style=\"padding:8px;\">Standard <code>try...catch...finally</code></td><td style=\"padding:8px;\"><strong>Best (Industry Standard)</strong></td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 64: Mastering Async & Await in JavaScript — Making Promises Easy to Read";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 64;

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

    console.log("🎉 Done! JS Lesson 64 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
