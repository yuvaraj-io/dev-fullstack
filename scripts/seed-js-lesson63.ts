/**
 * Seed Script: JavaScript "Lesson 63: Fetch API — The Modern Way to Talk to APIs"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson63.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson63.ts
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
        "<p>The <strong>Fetch API</strong> is the modern browser standard for making network requests in JavaScript. Unlike legacy <code>XMLHttpRequest</code>, <code>fetch()</code> is natively built upon <strong>Promises</strong>, offering clean, chainable, and readable asynchronous syntax.</p><p>In this lesson, we explore how <code>fetch()</code> works under the hood: inspecting the <code>Response</code> stream, parsing JSON with <code>res.json()</code>, executing <code>GET</code> and <code>POST</code> requests, attaching custom headers, and properly handling network rejections with <code>.catch()</code>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*nmpfnyph_Z3QhAbavEuUyQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-63-fetch-api-the-modern-way-to-talk-to-apis?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-63-fetch-api-the-modern-way-to-talk-to-apis?file=index.html,script.js</a></p>',
    },

    // ── 1. Project Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML & JavaScript Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fetch API Example</title>
</head>
<body>
  <h1>🧩 Fetch API Example</h1>
  <button id="loadData">Load Products</button>
  <pre id="output"></pre>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. What Is fetch()? ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ What Is fetch()?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>fetch()</code> is a globally available Web API provided by modern JavaScript runtime environments (browsers, Node.js 18+, Deno, Bun). It returns a Promise that resolves to a <code>Response</code> object representing the server response.</p><p>Because the response body arrives as a <strong>ReadableStream</strong>, calling <code>res.json()</code> or <code>res.text()</code> returns a second Promise that resolves with the parsed data payload.</p>",
    },

    // ── 3. Performing a GET Request ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Making a GET Request with 2-Step Promise Resolution" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById("loadData");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  fetch("https://dummyjson.com/products")
    // Step 1: Resolve HTTP headers & stream body to JSON
    .then((res) => {
      if (!res.ok) {
        throw new Error(\`HTTP error! status: \${res.status}\`);
      }
      return res.json();
    })
    // Step 2: Receive and render parsed JSON payload
    .then((data) => {
      output.textContent = JSON.stringify(data.products.slice(0, 3), null, 2);
    })
    .catch((err) => console.error("Fetch Error:", err.message));
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Sending a POST Request ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Sending Data via POST Request" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To send data to an API (e.g. creating records), pass an options object specifying <code>method: 'POST'</code>, the serialized string payload in <code>body</code>, and <code>Content-Type: application/json</code> headers:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `fetch("https://dummyjson.com/products/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "BMW Pencil",
    category: "stationery",
    price: 12.99,
  }),
})
  .then((res) => res.json())
  .then((createdProduct) => {
    console.log("Product Created Successfully:", createdProduct);
  })
  .catch((err) => console.error("POST Error:", err.message));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Error Handling Nuance ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Critical Gotcha: fetch() Error Handling" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>⚠️ <strong>Crucial Distinction:</strong> A <code>fetch()</code> Promise will <strong>NOT reject on HTTP error status codes (like 404 or 500)</strong>. It only rejects on <em>network failures</em> (e.g. offline, DNS lookup failure, CORS blocked). To handle HTTP errors, always check <code>res.ok</code> or <code>res.status</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `fetch("https://dummyjson.com/invalid-url-404")
  .then((res) => {
    // res.ok is true for status 200-299, false otherwise
    if (!res.ok) {
      throw new Error(\`Server returned HTTP \${res.status} (\${res.statusText})\`);
    }
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("❌ Caught Error:", error.message);
  });`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ XHR vs Fetch API Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">XMLHttpRequest (Legacy)</th><th style=\"padding:8px;\">Fetch API (Modern Standard)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Programming Paradigm</td><td style=\"padding:8px;\">Event/Callback-based (prone to Callback Hell)</td><td style=\"padding:8px;\">Promise-based (clean chaining &amp; async/await)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Syntax &amp; Verbosity</td><td style=\"padding:8px;\">Heavy boilerplate (instantiate, open, send, listen)</td><td style=\"padding:8px;\">Compact one-liner function call</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Streaming</td><td style=\"padding:8px;\">Buffered response</td><td style=\"padding:8px;\">Streams support via <code>ReadableStream</code></td></tr><tr><td style=\"padding:8px;\">Cross-environment</td><td style=\"padding:8px;\">Browser only (required <code>xmlhttprequest</code> npm)</td><td style=\"padding:8px;\">Universal (Browsers, Node.js 18+, Bun, Deno)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 63: Fetch API — The Modern Way to Talk to APIs";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 63;

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

    console.log("🎉 Done! JS Lesson 63 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
