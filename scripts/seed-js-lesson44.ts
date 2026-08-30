/**
 * Seed Script: JavaScript "Lesson 44: Access Parent, Sibling & Children Elements using JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson44.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson44.ts
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
        "<p>Traversing the DOM tree is one of the most fundamental skills in JavaScript. In this lesson, we explore how to navigate up, down, and across the DOM hierarchy using <strong>parent</strong>, <strong>child</strong>, and <strong>sibling</strong> traversal properties.</p><p>We will also distinguish element-only traversal (such as <code>children</code> and <code>nextElementSibling</code>) from raw node traversal (such as <code>childNodes</code> and <code>nextSibling</code>).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*F9vMfkPVq8TRp47Tzh22gw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-44-access-parent-sibling-children-elements?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-44-access-parent-sibling-children-elements?file=index.html,script.js</a></p>',
    },

    // ── HTML Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Base HTML Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>
  <a class="first-link" href="#">Graphical User Interface</a>
  <strong>Front-end Development</strong>
  <a href="#">HTML</a>
  <a href="#">CSS</a>
  <a href="#">JavaScript</a>
</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Accessing Parent Elements ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Accessing Parent Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every element in the DOM tree has a parent. Use <code>parentElement</code> to traverse upward through parent nodes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const firstLink = document.querySelector('.first-link');

console.log(firstLink.parentElement); 
// Output: <p>...</p>

console.log(firstLink.parentElement.parentElement); 
// Output: <body>...</body>

console.log(firstLink.parentElement.parentElement.parentElement); 
// Output: <html>...</html>`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Accessing Children: children vs childNodes ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Accessing Child Elements & Nodes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>There are two key ways to inspect child elements:</p><ul><li><strong><code>element.children</code>:</strong> Returns an <code>HTMLCollection</code> containing <em>only</em> HTML elements (ignoring text/whitespace nodes).</li><li><strong><code>element.childNodes</code>:</strong> Returns a <code>NodeList</code> containing <em>all</em> nodes (including text and comment nodes).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Element-only children (HTMLCollection)
console.log(firstLink.parentElement.children);

// All child nodes including whitespace/text (NodeList)
console.log(firstLink.parentElement.childNodes);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Accessing Siblings ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Accessing Sibling Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Siblings exist on the exact same hierarchical level in the DOM tree:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Element-only siblings (ignores whitespace & text nodes)
console.log(firstLink.nextElementSibling);
// <strong>Front-end Development</strong>

console.log(firstLink.nextElementSibling.nextElementSibling);
// <a>HTML</a>

console.log(firstLink.nextElementSibling.previousElementSibling);
// firstLink itself

// Raw node siblings (may return #text nodes for line breaks)
console.log(firstLink.nextSibling);
console.log(firstLink.previousSibling);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Inspecting Properties with console.dir ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Inspecting DOM Properties with console.dir()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To view an interactive list of all DOM properties, methods, and parent/child references on any element object, use <code>console.dir()</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.dir(firstLink);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ DOM Traversal Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Direction</th><th style=\"padding:8px;\">Elements Only</th><th style=\"padding:8px;\">All Nodes (Includes Text)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Upward (Parent)</td><td style=\"padding:8px;\"><code>parentElement</code></td><td style=\"padding:8px;\"><code>parentNode</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Downward (Children)</td><td style=\"padding:8px;\"><code>children</code>, <code>firstElementChild</code>, <code>lastElementChild</code></td><td style=\"padding:8px;\"><code>childNodes</code>, <code>firstChild</code>, <code>lastChild</code></td></tr><tr><td style=\"padding:8px;\">Sideways (Siblings)</td><td style=\"padding:8px;\"><code>nextElementSibling</code>, <code>previousElementSibling</code></td><td style=\"padding:8px;\"><code>nextSibling</code>, <code>previousSibling</code></td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 44: Access Parent, Sibling & Children Elements using JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 44;

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

    console.log("🎉 Done! JS Lesson 44 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
