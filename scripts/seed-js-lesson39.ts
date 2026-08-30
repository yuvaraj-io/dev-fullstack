/**
 * Seed Script: JavaScript "Lesson 39: Introduction to Document Object Model (DOM) in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson39.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson39.ts
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
        "<p>In this lesson, we introduce the fundamental bridge between JavaScript and web pages: the <strong>Document Object Model (DOM)</strong>.</p><p>We will examine how browsers parse HTML markup into an interactive, object-oriented tree representation and how JavaScript dynamically traverses and manipulates this structure.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*omikAadne1pMd2r-Mqzmjw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-39-introduction-to-document-object-model-dom?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-39-introduction-to-document-object-model-dom?file=script.js</a></p>',
    },

    // ── 1. What is the DOM? ──
    { id: nextId(), type: "heading" as const, content: "1. 💡 What is the DOM?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Document Object Model (DOM)</strong> is a browser programming interface that converts raw HTML text into a live, hierarchical <strong>tree of JavaScript objects</strong>.</p><ul><li>Each HTML element tag becomes a distinct JavaScript object node with its own properties and methods.</li><li>JavaScript can inspect, edit, add, or remove nodes dynamically at runtime.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Raw HTML -->
<body>
  <h1>Hello World</h1>
</body>

/* Converted to DOM Tree Representation:
Document
└── HTML
    └── Body
        └── H1 -> "Hello World"
*/`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Relationship between BOM and DOM ──
    { id: nextId(), type: "heading" as const, content: "2. 🔍 Relationship Between BOM and DOM" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The global <code>window</code> object represents the BOM. Inside <code>window</code>, the <code>document</code> property exposes the DOM root:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(window.document); // Points to the active page's DOM
console.log(typeof document);   // "object"

// Inspect document as a JS object hierarchy rather than HTML:
console.dir(document);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. DOM Tree Structure & Parent-Child Navigation ──
    { id: nextId(), type: "heading" as const, content: "3. 🧩 DOM Tree Structure & Parent–Child Relationships" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Elements in the DOM tree know both their parents and their child nodes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(document.children);               // [html]
console.log(document.children[0]);            // <html>
console.log(document.children[0].children);   // [head, body]

const body = document.body;
console.log(body.parentElement);              // <html>
console.log(body.children);                   // HTMLCollection of body elements`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Dynamic DOM Manipulation ──
    { id: nextId(), type: "heading" as const, content: "4. 🪄 Dynamic DOM Modification (Manipulation)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can instantly mutate webpage content by updating node object properties:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const heading = document.body.children[0];
heading.innerHTML = "Hey there, I'm Yuvaraj 👋";`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. innerText vs innerHTML ──
    { id: nextId(), type: "heading" as const, content: "5. ⚙️ innerText vs innerHTML" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">Description</th><th style=\"padding:8px;\">Example</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>innerText</code></td><td style=\"padding:8px;\">Updates only plain text content; tags are escaped.</td><td style=\"padding:8px;\"><code>heading.innerText = \"Hello World\"</code></td></tr><tr><td style=\"padding:8px;\"><code>innerHTML</code></td><td style=\"padding:8px;\">Parses and renders HTML tags inside the element.</td><td style=\"padding:8px;\"><code>heading.innerHTML = \"&lt;i&gt;Welcome to DOM&lt;/i&gt;\"</code></td></tr></tbody></table>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `heading.innerHTML = "<i>Welcome to DOM</i>"; // Renders styled italic text`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Behind the Scenes: HTML Parser ──
    { id: nextId(), type: "heading" as const, content: "6. ⚡ Behind the Scenes: The HTML Parser" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>The browser downloads and reads HTML markup line by line via the <strong>HTML Parser</strong>.</li><li>For every tag, it instantiates an in-memory JavaScript object node.</li><li>These nodes link together into the tree-structured <strong>DOM Tree</strong>.</li><li>The browser layout and rendering engines paint the visual representation onto the screen.</li></ol>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>DOM = Document Object Model:</strong> The live in-memory object representation of the page.</li><li><strong>BOM vs DOM:</strong> <code>window</code> is the root BOM object; <code>window.document</code> is the DOM tree root.</li><li>Every tag is a node with configurable properties (<code>innerHTML</code>, <code>innerText</code>, <code>style</code>, <code>children</code>).</li><li>Changes applied to DOM nodes reflect immediately in the live browser rendering.</li></ul>",
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
    const collectionTitle = "Lesson 39: Introduction to Document Object Model (DOM) in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 39;

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

    console.log("🎉 Done! JS Lesson 39 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
