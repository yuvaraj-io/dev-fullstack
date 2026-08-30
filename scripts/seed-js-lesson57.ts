/**
 * Seed Script: JavaScript "Lesson 57: HTTP Requests, Responses, and JSON in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson57.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson57.ts
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
        "<p>Until now, our JavaScript executed purely inside local browser memory. Real-world fullstack applications communicate continuously with backend servers to load profiles, persist changes, and fetch dynamic content.</p><p>In this lesson, we break down client-server communication using <strong>HTTP (HyperText Transfer Protocol)</strong>, understand the structure of <strong>Requests &amp; Responses</strong>, format payloads with <strong>JSON</strong>, and inspect network traffic inside Chrome DevTools.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BFhpRg_8A_bTo_hwUHg1rA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-57-http-requests-responses-and-json-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-57-http-requests-responses-and-json-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. HTTP Lifecycle ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The HTTP Request-Response Cycle" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>HTTP Request:</strong> The client (browser) initiates an HTTP message containing a method (e.g. <code>GET</code>, <code>POST</code>), target URL, headers, and optional body.</li><li><strong>Server Processing:</strong> The web or API server processes the request and executes backend database queries.</li><li><strong>HTTP Response:</strong> The server returns an HTTP response containing a <strong>status code</strong> (e.g. <code>200 OK</code>, <code>404 Not Found</code>), response headers, and the response payload (usually formatted as JSON).</li></ol>",
    },

    // ── 2. Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ HTML Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTTP Requests & JSON</title>
</head>
<body>
  <h1>HTTP Request and Response</h1>
  <p id="output">Loading...</p>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 3. What is JSON? ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ What is JSON (JavaScript Object Notation)?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>JSON</strong> is the standard lightweight, language-agnostic data-interchange format used by modern REST APIs:</p><ul><li>All keys and string values <strong>must be wrapped in double quotes (<code>\"key\": \"value\"</code>)</strong>.</li><li>Supported types: strings, numbers, booleans, arrays, nested objects, and <code>null</code>. Functions and <code>undefined</code> are not allowed.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// JSON String representation:
const jsonPayload = '{"id": 1, "name": "Leanne Graham", "email": "leanne@example.com"}';

// Parsing to JavaScript Object:
const userObj = JSON.parse(jsonPayload);
console.log(userObj.name); // "Leanne Graham"

// Serializing back to JSON String:
const stringified = JSON.stringify(userObj);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Making GET & POST Requests ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Fetching & Sending Data (GET vs. POST)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. GET Request: Read/Retrieve data
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").textContent = \`User: \${data.name}\`;
    console.log("User details:", data);
  })
  .catch(err => console.error("GET Error:", err));

// 2. POST Request: Create/Send new data
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "My New Post",
    body: "This is a test post.",
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(res => res.json())
  .then(post => console.log("Created post:", post))
  .catch(err => console.error("POST Error:", err));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. HTTP Methods Reference ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Common HTTP Methods & Status Codes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Method</th><th style=\"padding:8px;\">CRUD Action</th><th style=\"padding:8px;\">Typical Status Codes</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>GET</strong></td><td style=\"padding:8px;\">Read / Fetch resources</td><td style=\"padding:8px;\"><code>200 OK</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>POST</strong></td><td style=\"padding:8px;\">Create new resources</td><td style=\"padding:8px;\"><code>201 Created</code>, <code>400 Bad Request</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>PUT</strong></td><td style=\"padding:8px;\">Replace entire existing resource</td><td style=\"padding:8px;\"><code>200 OK</code>, <code>204 No Content</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>PATCH</strong></td><td style=\"padding:8px;\">Partially update resource fields</td><td style=\"padding:8px;\"><code>200 OK</code></td></tr><tr><td style=\"padding:8px;\"><strong>DELETE</strong></td><td style=\"padding:8px;\">Remove resource from server</td><td style=\"padding:8px;\"><code>200 OK</code>, <code>204 No Content</code></td></tr></tbody></table>",
    },

    // ── 6. Mini Project: Dog API ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Interactive Mini Project: Random Dog Viewer 🐶" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML -->
<button id="dogBtn">Get Random Dog 🐶</button>
<div id="dogContainer"></div>

// JavaScript
const btn = document.getElementById("dogBtn");
const container = document.getElementById("dogContainer");

btn.addEventListener("click", () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = \`<img src="\${data.message}" width="250" alt="Random Dog" style="border-radius: 8px; margin-top: 10px;" />\`;
    })
    .catch(err => console.error("Dog API Error:", err));
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 7. Chrome DevTools Network Tab ──
    { id: nextId(), type: "heading" as const, content: "7️⃣ Inspecting Network Calls in Chrome DevTools" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Open <strong>DevTools → Network tab</strong> and refresh your application to observe real-time requests:</p><ul><li><strong>Headers tab:</strong> Inspect Request URL, Request Method (<code>GET</code>/<code>POST</code>), Response Status Code (<code>200 OK</code>), and Content-Type.</li><li><strong>Payload / Request tab:</strong> View JSON payload data dispatched in POST/PUT mutations.</li><li><strong>Preview / Response tab:</strong> Inspect formatted JSON trees returned by backend APIs.</li></ul>",
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
    const collectionTitle = "Lesson 57: HTTP Requests, Responses, and JSON in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 57;

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

    console.log("🎉 Done! JS Lesson 57 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
