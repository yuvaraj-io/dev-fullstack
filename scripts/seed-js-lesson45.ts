/**
 * Seed Script: JavaScript "Lesson 45: Understanding Nodes vs Elements in JavaScript DOM"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson45.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson45.ts
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
        "<p>In the DOM hierarchy, developers frequently encounter the terms <strong>Node</strong> and <strong>Element</strong>. While related, they represent distinct concepts in DOM tree architecture.</p><p><em>Every HTML Element is a Node, but not every Node is an Element.</em> In this lesson, we explore DOM node types, inspect node properties with <code>console.dir()</code>, and learn how to target text nodes directly using <code>nodeValue</code> without triggering full element re-renders.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*_pBXHiQ4ACgG0BgS1jf-9g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-45-node-vs-element?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-45-node-vs-element?file=index.html,script.js</a></p>',
    },

    // ── 1. HTML Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML Setup & DOM Structure" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Node vs Element</title>
</head>
<body>
  <h1>Hello World</h1>
  <!-- This is a comment node -->
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. children vs childNodes ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ children vs childNodes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Inspecting <code>document.body</code> demonstrates the fundamental difference between elements and raw nodes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const body = document.body;

// 1. children -> HTMLCollection of elements ONLY (h1, script)
console.log(body.children); 
// HTMLCollection(2) [h1, script]

// 2. childNodes -> NodeList of ALL nodes (whitespace text, comments, elements)
console.log(body.childNodes); 
// NodeList(5) [text, h1, text, comment, script]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. DOM Node Types ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Common DOM Node Types (nodeType)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every node exposes a numeric <strong><code>nodeType</code></strong> property indicating its category:</p><table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Numeric Type</th><th style=\"padding:8px;\">Constant</th><th style=\"padding:8px;\">Description & Example</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>1</strong></td><td style=\"padding:8px;\"><code>Node.ELEMENT_NODE</code></td><td style=\"padding:8px;\">HTML tags (<code>&lt;h1&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>2</strong></td><td style=\"padding:8px;\"><code>Node.ATTRIBUTE_NODE</code></td><td style=\"padding:8px;\">Element attributes</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>3</strong></td><td style=\"padding:8px;\"><code>Node.TEXT_NODE</code></td><td style=\"padding:8px;\">Text content and whitespace (<code>\\n</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>8</strong></td><td style=\"padding:8px;\"><code>Node.COMMENT_NODE</code></td><td style=\"padding:8px;\">HTML comments (<code>&lt;!-- comment --&gt;</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>9</strong></td><td style=\"padding:8px;\"><code>Node.DOCUMENT_NODE</code></td><td style=\"padding:8px;\">Root <code>document</code> object</td></tr><tr><td style=\"padding:8px;\"><strong>10</strong></td><td style=\"padding:8px;\"><code>Node.DOCUMENT_TYPE_NODE</code></td><td style=\"padding:8px;\"><code>&lt;!DOCTYPE html&gt;</code> declaration</td></tr></tbody></table>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const h1 = document.querySelector('h1');

console.log(h1.nodeType);                     // 1 (Element)
console.log(body.childNodes[0].nodeType);     // 3 (Text)
console.log(body.childNodes[3].nodeType);     // 8 (Comment)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Inspecting Node Properties ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Inspecting Node Properties (nodeName, nodeValue, data)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>nodeName</code>: Returns the uppercase element tag name (e.g. <code>H1</code>) or special node descriptors (<code>#text</code>, <code>#comment</code>).</li><li><code>nodeValue</code> / <code>data</code>: Holds the raw string value of text and comment nodes (returns <code>null</code> for element nodes).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.dir(body.childNodes[3]); // Comment Node
console.dir(h1);                 // Element Node`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Updating Text Nodes Directly ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Updating Text Nodes via nodeValue" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of overwriting an element's entire inner HTML (which blows away child event listeners and child elements), you can update a specific text node directly via <code>nodeValue</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Access the text node directly inside h1:
const textNode = body.childNodes[1].childNodes[0]; 

console.log(textNode.nodeValue); // "Hello World"

// Update value without re-rendering parent element:
textNode.nodeValue = "Namaste World!";`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary: Node vs Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Node:</strong> Generic base interface representing any single point in the DOM tree (Element, Text, Comment, Document).</li><li><strong>Element:</strong> A specific subclass of Node representing an HTML tag (<code>&lt;div&gt;</code>, <code>&lt;h1&gt;</code>, etc.).</li><li>Use <strong><code>element.children</code></strong> when you only care about HTML tags.</li><li>Use <strong><code>element.childNodes</code></strong> when you need to inspect raw text nodes, newlines, and comments.</li></ul>",
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
    const collectionTitle = "Lesson 45: Understanding Nodes vs Elements in JavaScript DOM";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 45;

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

    console.log("🎉 Done! JS Lesson 45 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
