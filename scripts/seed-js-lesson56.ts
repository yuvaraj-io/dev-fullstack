/**
 * Seed Script: JavaScript "Lesson 56: Local Storage in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson56.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson56.ts
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
        "<p>Persisting client-side data across page reloads without backend roundtrips is essential for modern web applications.</p><p>In this lesson, we explore the browser's native <strong>Web Storage API</strong> with <strong>Local Storage</strong>. We examine the core methods: <strong><code>setItem()</code></strong>, <strong><code>getItem()</code></strong>, <strong><code>removeItem()</code></strong>, and <strong><code>clear()</code></strong>, along with serializing complex objects using <strong><code>JSON.stringify()</code></strong> and <strong><code>JSON.parse()</code></strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*LHQpWurHCNYYxGDm3faO5w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-56-local-storage-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-56-local-storage-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. What is Local Storage? ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What Is Local Storage?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Local Storage stores permanent key–value pairs isolated per origin domain:</p><ul><li><strong>No expiration:</strong> Data persists indefinitely until explicitly cleared by user action or code.</li><li><strong>Client-only:</strong> Unlike cookies, Local Storage data is never transmitted automatically in HTTP request headers.</li><li><strong>Storage capacity:</strong> Typically ~5MB per origin (far larger than the 4KB limit of HTTP cookies).</li></ul>",
    },

    // ── 2. Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ HTML Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML Markup -->
<button id="saveBtn">Save</button>
<button id="getBtn">Get</button>
<button id="removeBtn">Remove</button>
<button id="clearBtn">Clear All</button>
<input type="text" id="nameInput" placeholder="Enter your name" />
<div id="output"></div>

// JavaScript Element Selectors
const saveBtn = document.getElementById("saveBtn");
const getBtn = document.getElementById("getBtn");
const removeBtn = document.getElementById("removeBtn");
const clearBtn = document.getElementById("clearBtn");
const nameInput = document.getElementById("nameInput");
const output = document.getElementById("output");`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 3. setItem & getItem ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Storing & Retrieving Data: setItem() and getItem()" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Save data to localStorage:
saveBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem("username", name);
    output.textContent = \`Saved: \${name}\`;
  }
});

// 2. Fetch data from localStorage:
getBtn.addEventListener("click", () => {
  const savedName = localStorage.getItem("username");
  output.textContent = savedName ? \`Stored Name: \${savedName}\` : "No data found!";
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. removeItem & clear ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Deleting Data: removeItem() and clear()" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Remove a single specific key:
removeBtn.addEventListener("click", () => {
  localStorage.removeItem("username");
  output.textContent = "Username removed from storage!";
});

// 2. Wipe all stored keys for the current domain:
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  output.textContent = "All local storage data cleared!";
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Storing Objects & Arrays ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Storing Complex Objects: JSON.stringify & JSON.parse" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Local Storage <strong>only accepts string values</strong>. Attempting to store a raw object will cast it to <code>\"[object Object]\"</code>. Always serialize with <strong><code>JSON.stringify()</code></strong> and deserialize with <strong><code>JSON.parse()</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userProfile = {
  name: "Yuvaraj",
  role: "Frontend Developer",
  skills: ["JavaScript", "TypeScript", "Angular", "React"]
};

// 1. Serialize Object to JSON String before saving:
localStorage.setItem("userData", JSON.stringify(userProfile));

// 2. Parse JSON String back into Object upon retrieval:
const rawData = localStorage.getItem("userData");
if (rawData) {
  const parsedUser = JSON.parse(rawData);
  console.log("User Name:", parsedUser.name);        // "Yuvaraj"
  console.log("Top Skill:", parsedUser.skills[0]);    // "JavaScript"
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Best Practices & Limitations ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Best Practices & Security Limitations" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Good For ✅</th><th style=\"padding:8px;\">Avoid Storing ❌</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">UI Theme preferences (Light / Dark mode)</td><td style=\"padding:8px;\">Sensitive credentials & passwords</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Language and locale selections</td><td style=\"padding:8px;\">Authentication JWT tokens (vulnerable to XSS)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Draft form input values</td><td style=\"padding:8px;\">Large datasets exceeding ~5MB</td></tr><tr><td style=\"padding:8px;\">Dismissed notification / banner states</td><td style=\"padding:8px;\">Frequently mutating high-frequency streams</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 56: Local Storage in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 56;

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

    console.log("🎉 Done! JS Lesson 56 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
