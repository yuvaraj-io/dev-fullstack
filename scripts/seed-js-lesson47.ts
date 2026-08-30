/**
 * Seed Script: JavaScript "Lesson 47: Create and Append Elements in JavaScript (Without HTML!)"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson47.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson47.ts
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
    // ── Introduction & Recap ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In previous lessons, we cloned existing HTML elements. In this lesson, we build dynamic user interfaces <strong>completely from scratch without writing initial HTML markup</strong> using <strong><code>document.createElement()</code></strong>.</p><p>We will construct a dynamic 100-item Pokémon gallery using PokeAPI sprite URLs, set attributes and styles programmatically, and compare <code>createElement()</code> with <code>cloneNode()</code>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*6S8qwfC6_uAxI67QNrQKow.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-47-create-and-append-elements-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-47-create-and-append-elements-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- index.html -->
<h1>Pokémon Gallery</h1>
<div class="container"></div>
<script src="script.js" defer></script>

<!-- styles.css -->
img {
  width: 60px;
}`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. document.createElement() Basics ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Creating Elements: document.createElement()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.createElement(tagName)</code> creates a DOM element in memory. The element does not appear visually on the page until you append it to an active DOM node:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Create paragraph in memory:
const para = document.createElement("p");

// 2. Set text content & attributes:
para.innerText = "Hello from JavaScript!";
para.classList.add("myPara");
para.id = "intro";

// 3. Append to body:
document.body.append(para);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Dynamic Image Generation & Loops ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Generating 100 Pokémon Images with a Loop" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Using a loop with PokeAPI sprite endpoints, we dynamically instantiate and append 100 image elements without writing a single line of HTML boilerplate:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const container = document.querySelector(".container");

for (let i = 1; i <= 100; i++) {
  const newImage = document.createElement("img");
  newImage.src = \`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/\${i}.png\`;
  container.append(newImage);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. createElement vs cloneNode ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ createElement() vs cloneNode()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Method</th><th style=\"padding:8px;\">When to Use</th><th style=\"padding:8px;\">How It Works</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>cloneNode(true)</code></td><td style=\"padding:8px;\">When a template / existing HTML element exists</td><td style=\"padding:8px;\">Duplicates an existing DOM node (copy-paste)</td></tr><tr><td style=\"padding:8px;\"><code>createElement()</code></td><td style=\"padding:8px;\">When generating elements completely dynamically</td><td style=\"padding:8px;\">Creates an empty node from scratch in memory</td></tr></tbody></table>",
    },

    // ── 5. Custom HTML Tags ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Creating Custom HTML Tags" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript allows passing any tag name to <code>document.createElement()</code>. Browsers treat unrecognized custom tags as <strong>inline elements</strong> (similar to <code>&lt;span&gt;</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const customTag = document.createElement("custom-card");
customTag.innerText = "Custom Tag Example";
document.body.append(customTag);

// Renders: <custom-card>Custom Tag Example</custom-card>`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "🏁 Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>document.createElement(tagName)</code></strong> creates an unattached DOM element in memory.</li><li>Configure elements using <code>.innerText</code>, <code>.src</code>, <code>.id</code>, and <code>.classList.add()</code> before insertion.</li><li>Insert elements into the live render tree using <strong><code>.append()</code></strong> or <strong><code>.appendChild()</code></strong>.</li><li>Use <code>createElement</code> when no HTML prototype exists, and <code>cloneNode</code> when duplicating established DOM templates.</li></ul>",
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
    const collectionTitle = "Lesson 47: Create and Append Elements in JavaScript (Without HTML!)";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 47;

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

    console.log("🎉 Done! JS Lesson 47 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
