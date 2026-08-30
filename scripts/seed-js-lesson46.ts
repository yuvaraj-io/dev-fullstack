/**
 * Seed Script: JavaScript "Lesson 46: Understanding append vs appendChild in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson46.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson46.ts
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
        "<p>When constructing dynamic user interfaces in vanilla JavaScript, appending DOM elements is an essential operation. In this lesson, we contrast the classic <strong><code>appendChild()</code></strong> method with modern <strong><code>append()</code></strong>.</p><p>We also cover element cloning with <strong><code>cloneNode(true)</code></strong> to generate repeated UI components efficiently without manual boilerplate.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*dtZ86RvOzc48ScqW9pwoZA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-46-understanding-append-vs-appendchild?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-46-understanding-append-vs-appendchild?file=index.html,script.js</a></p>',
    },

    // ── 1. Project Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Project Setup 🛠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Append vs AppendChild Demo</title>
  <style>
    .container {
      border: 2px solid #333;
      padding: 10px;
      margin: 20px;
      background-color: #f9f9f9;
    }
    .card {
      width: 80px;
      height: 100px;
      border: 1px solid #000;
      margin: 5px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">1</div>
    <h1>Title</h1>
  </div>
  <script src="script.js" defer></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>Note: The <code>defer</code> attribute guarantees our JavaScript executes only after the HTML document is fully parsed, preventing null reference errors when querying DOM elements.</em></p>",
    },

    // ── 2. appendChild Method ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Using appendChild() 🟢" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>parent.appendChild(node)</code> appends a node as the last child of the target parent. If the node already exists in the DOM, it <strong>moves the existing element</strong> rather than duplicating it:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const container = document.querySelector('.container');
const h1 = document.querySelector('h1');

// Moves <h1> to the end of container:
container.appendChild(h1);

// Appending raw text requires creating a text node first:
const textNode = document.createTextNode("Hello World");
container.appendChild(textNode);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. append Method ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Using modern append() 🌟" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The modern <code>parent.append(...nodesOrStrings)</code> method is significantly more flexible:</p><ul><li>Allows appending plain string values directly (automatically converted to text nodes).</li><li>Accepts <strong>multiple arguments</strong> in a single call.</li><li>Returns <code>undefined</code> (unlike <code>appendChild</code> which returns the appended node).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Appends both a raw text string and an element in one call:
container.append("Hello, world!", h1);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ append vs appendChild Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\"><code>appendChild()</code></th><th style=\"padding:8px;\"><code>append()</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Accepts Strings</td><td style=\"padding:8px;\">No (Throws TypeError)</td><td style=\"padding:8px;\">Yes (auto-converts to Text Node)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Multiple Arguments</td><td style=\"padding:8px;\">No (1 element only)</td><td style=\"padding:8px;\">Yes (<code>parent.append(a, b, c)</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Return Value</td><td style=\"padding:8px;\">The appended node</td><td style=\"padding:8px;\"><code>undefined</code></td></tr><tr><td style=\"padding:8px;\">Browser Support</td><td style=\"padding:8px;\">Universal (Legacy & Modern)</td><td style=\"padding:8px;\">Modern DOM Living Standard</td></tr></tbody></table>",
    },

    // ── 5. Cloning Elements with cloneNode ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Cloning Elements with cloneNode() 📝" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To duplicate an element rather than moving it, call <code>cloneNode(true)</code>. The <code>true</code> flag specifies a <strong>deep clone</strong> (copying all nested child elements and text nodes):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const card = document.querySelector('.card');

// Generate 100 card elements dynamically:
for (let i = 2; i <= 100; i++) {
  const newCard = card.cloneNode(true);
  newCard.innerText = i;
  container.appendChild(newCard);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "🎯 Key Takeaways" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Use <strong><code>append()</code></strong> for modern scripts when appending multiple nodes or inline text strings.</li><li>Use <strong><code>appendChild()</code></strong> when legacy browser compatibility is required or when you need the method to return the appended node.</li><li>Use <strong><code>element.cloneNode(true)</code></strong> to duplicate existing DOM structures with high efficiency inside loops.</li></ul>",
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
    const collectionTitle = "Lesson 46: Understanding append vs appendChild in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 46;

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

    console.log("🎉 Done! JS Lesson 46 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
