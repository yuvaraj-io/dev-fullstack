/**
 * Seed Script: JavaScript "Lesson 58: Understanding XMLHttpRequest (XHR) — The Old Way to Talk to APIs Before fetch()"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson58.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson58.ts
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
        "<p>Before <code>fetch()</code> and Promises were introduced to modern JavaScript in ES6 / ES2015, all asynchronous AJAX communications relied on <strong>XMLHttpRequest (XHR)</strong>.</p><p>Understanding XHR is essential for navigating legacy codebases, mastering asynchronous interview questions, and appreciating the design choices behind modern Promise-based networking.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*1V7FNDAYyzwe-RwZpn88dQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-58-understanding-xmlhttprequest?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-58-understanding-xmlhttprequest?file=index.html,script.js</a></p>',
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
  <title>XMLHttpRequest Example</title>
</head>
<body>
  <h2>🐾 Random Dog Image using XMLHttpRequest</h2>
  <button id="btn">Get Random Dog</button>
  <br /><br />
  <img id="dog-img" src="" width="300" alt="Dog Image" />
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Instantiating XHR & Configuring Request ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Instantiating & Configuring XHR" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Working with XHR involves four core steps:</p><ol><li><strong>Create instance:</strong> <code>const xhr = new XMLHttpRequest();</code></li><li><strong>Configure:</strong> <code>xhr.open(method, url);</code></li><li><strong>Set Response Type:</strong> <code>xhr.responseType = 'json';</code> (avoids manual JSON parsing)</li><li><strong>Attach Event Listener:</strong> <code>xhr.addEventListener('load', callback);</code></li><li><strong>Dispatch:</strong> <code>xhr.send();</code></li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById("btn");
const img = document.getElementById("dog-img");

btn.addEventListener("click", getRandomDog);

function getRandomDog() {
  // 1. Create a new XMLHttpRequest instance
  const xhr = new XMLHttpRequest();

  // 2. Configure HTTP method and destination endpoint
  xhr.open("GET", "https://dog.ceo/api/breeds/image/random");

  // 3. Automatically parse incoming JSON payload
  xhr.responseType = "json";

  // 4. Listen for the load completion event
  xhr.addEventListener("load", function () {
    console.log("XHR Status:", xhr.status); // 200
    console.log("Response Body:", xhr.response);
    img.src = xhr.response.message;
  });

  // 5. Fire the network request
  xhr.send();
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Why Learn XHR in Modern Era? ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Why Learn XHR Today?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Legacy Enterprise Support:</strong> Thousands of production enterprise systems and older libraries (like jQuery AJAX) wrap XHR under the hood.</li><li><strong>Fine-Grained Upload Progress:</strong> Unlike basic <code>fetch()</code>, XHR natively supports <code>xhr.upload.onprogress</code> for tracking byte-by-byte file upload progress bars.</li><li><strong>Technical Interviews:</strong> Senior JavaScript interviews often test event-driven async lifecycle patterns before Promises existed.</li></ul>",
    },

    // ── 4. XHR vs Fetch Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "✅ XMLHttpRequest (XHR) vs. Modern fetch()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">XMLHttpRequest (XHR)</th><th style=\"padding:8px;\">Modern fetch()</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">API Design</td><td style=\"padding:8px;\">Event-based callback model (<code>onload</code>, <code>onerror</code>)</td><td style=\"padding:8px;\">Promise-based (<code>.then()</code> / <code>async/await</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">JSON Parsing</td><td style=\"padding:8px;\"><code>xhr.responseType = 'json'</code> or <code>JSON.parse()</code></td><td style=\"padding:8px;\">Built-in async <code>await res.json()</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Upload Progress</td><td style=\"padding:8px;\">Native (<code>xhr.upload.onprogress</code>)</td><td style=\"padding:8px;\">Requires custom ReadableStreams</td></tr><tr><td style=\"padding:8px;\">Code Verbosity</td><td style=\"padding:8px;\">High / Ceremonial boilerplate</td><td style=\"padding:8px;\">Clean, concise, and chainable</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 58: Understanding XMLHttpRequest (XHR) — The Old Way to Talk to APIs Before fetch()";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 58;

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

    console.log("🎉 Done! JS Lesson 58 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
