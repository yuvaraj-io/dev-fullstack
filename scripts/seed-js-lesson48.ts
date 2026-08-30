/**
 * Seed Script: JavaScript "Lesson 48: How to Remove Elements from the DOM in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson48.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson48.ts
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
        "<p>In this lesson, we explore how to <strong>remove elements cleanly from the DOM</strong> in JavaScript.</p><p>We will examine the difference between hiding elements with CSS (<code>display: none</code>) vs true DOM deletion, contrast modern <strong><code>element.remove()</code></strong> with legacy <strong><code>parent.removeChild(child)</code></strong>, and explore JavaScript memory retention and garbage collection.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Yik5K_LqrJePtrCcGuM4jQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-48-how-to-remove-elements-from-the-dom?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-48-how-to-remove-elements-from-the-dom?file=index.html,script.js</a></p>',
    },

    // ── 1. Hiding vs Removing Elements ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Hiding vs. Removing Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Setting <code>display: none</code> hides an element visually, but the node <strong>still resides in the DOM tree</strong> and can still be queried by JavaScript. In contrast, DOM removal completely detaches the node from the document tree:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Visual hiding only (node remains in DOM tree) */
.hidden {
  display: none;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 2. Modern element.remove() ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Modern Removal with element.remove()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The modern <code>element.remove()</code> method directly removes an element without needing a reference to its parent node:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Select the 5th image:
const myImage = document.querySelector(".container img:nth-child(5)");

// Delete it cleanly from the DOM:
myImage.remove();

// Subsequent DOM queries will return null:
console.log(document.querySelector(".container img:nth-child(5)")); // null`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Legacy parent.removeChild() ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Legacy Method: parent.removeChild()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before <code>element.remove()</code>, developers had to traverse up to the parent element to remove a child:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const myImage = document.querySelector(".container img:nth-child(5)");
const parent = myImage.parentElement;

// Old-school removal via parent:
parent.removeChild(myImage);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Removing Other Elements ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Removing Other Elements" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Remove a heading:
document.querySelector("h1").remove();

// Remove a container:
document.querySelector(".container").remove();

// Remove entire body (leaves only <head>):
document.body.remove();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Memory Retention & Garbage Collection ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Memory Retention & Garbage Collection 🧹" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When an element is removed with <code>.remove()</code>, if a JavaScript variable still references the node, it <strong>remains in memory</strong> and can be re-appended. To release memory completely for the browser's Garbage Collector, assign the variable to <code>null</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let container = document.querySelector(".container");

// Detached from DOM, but still held in variable reference:
container.remove();

// Can be re-appended back to DOM:
document.body.append(container);

// To fully garbage collect and clean memory:
container = null;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "🏁 Summary: DOM Removal Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Approach</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Status</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Modern Deletion</td><td style=\"padding:8px;\"><code>element.remove()</code></td><td style=\"padding:8px;\">Standard & Recommended</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Legacy Deletion</td><td style=\"padding:8px;\"><code>parent.removeChild(child)</code></td><td style=\"padding:8px;\">Legacy / Old Browsers</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Visual Hiding</td><td style=\"padding:8px;\"><code>element.style.display = 'none'</code></td><td style=\"padding:8px;\">Still exists in DOM</td></tr><tr><td style=\"padding:8px;\">Memory Cleanup</td><td style=\"padding:8px;\"><code>variable = null</code></td><td style=\"padding:8px;\">Allows Garbage Collection</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 48: How to Remove Elements from the DOM in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 48;

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

    console.log("🎉 Done! JS Lesson 48 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
