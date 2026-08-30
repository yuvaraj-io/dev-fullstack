/**
 * Seed Script: JavaScript "Lesson 43: Styling HTML Elements Dynamically Using JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson43.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson43.ts
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
        "<p>In this lesson, we learn how to apply and manipulate <strong>CSS styles dynamically using JavaScript</strong>.</p><p>We will examine the limitations of <code>element.style</code>, how to format camelCase properties, setting multiple rules at once via <code>cssText</code>, and why managing CSS classes via the <strong><code>classList</code> API</strong> (<code>add</code>, <code>remove</code>, <code>toggle</code>) is the scalable best practice for UI development.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*NZhmb3XiKjhUTy8wTVIW1Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-43-styling-html-elements-dynamically?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-43-styling-html-elements-dynamically?file=index.html,script.js</a></p>',
    },

    // ── 1. Accessing Styles via element.style ──
    { id: nextId(), type: "heading" as const, content: "1. 🔹 Accessing Styles via element.style" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>⚠️ Crucial Limitation:</strong> <code>element.style</code> reads only <strong>inline CSS styles</strong> defined directly on the element tag. It returns an empty string for rules coming from stylesheet classes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* styles.css */
.title {
  color: red;
  font-size: 24px;
}

// script.js
const heading = document.querySelector("h1");
console.log(heading.style.color); // Output: "" (empty string!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Setting Inline Styles & camelCase ──
    { id: nextId(), type: "heading" as const, content: "2. Setting Inline Styles (camelCase Properties)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, CSS hyphenated properties become <strong>camelCase</strong> (e.g. <code>background-color</code> &rarr; <code>backgroundColor</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const heading = document.querySelector("h1");

heading.style.color = "hotpink";
heading.style.backgroundColor = "skyblue";
heading.style.fontSize = "32px";`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Looping Multiple Elements & cssText ──
    { id: nextId(), type: "heading" as const, content: "3. Looping Elements & Setting cssText" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When styling multiple properties across collections, iterate with <code>for...of</code> and use <code>cssText</code> to apply multiple CSS declarations at once:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const links = document.querySelectorAll("a");

for (const link of links) {
  link.style.cssText = \`
    color: teal;
    font-size: 18px;
    font-family: cursive;
    font-weight: 700;
    text-decoration: none;
  \`;
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. classList API ──
    { id: nextId(), type: "heading" as const, content: "4. 🌟 Best Practice: The classList API" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of manually inlining styles into HTML tags, keep style definitions in CSS files and manipulate class names with <code>element.classList</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const heading = document.querySelector("h1");

// 1. Add class (without replacing existing classes):
heading.classList.add("highlight");

// 2. Remove specific class:
heading.classList.remove("highlight");

// 3. Toggle class (adds if absent, removes if present):
heading.classList.toggle("active");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Showing & Hiding Elements ──
    { id: nextId(), type: "heading" as const, content: "5. Showing and Hiding Elements" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* styles.css */
.hidden {
  display: none;
}

// script.js
heading.classList.add("hidden");    // Hide element
heading.classList.remove("hidden"); // Show element
heading.classList.toggle("hidden"); // Toggle visibility on user click`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary & Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>element.style</code> inspects and updates inline styles only.</li><li>CSS properties with hyphens map to <strong>camelCase</strong> in JavaScript (<code>fontSize</code>, <code>backgroundColor</code>).</li><li>Use <code>style.cssText</code> for multi-line inline styling chunks.</li><li>Prefer <strong><code>classList.add()</code></strong>, <strong><code>classList.remove()</code></strong>, and <strong><code>classList.toggle()</code></strong> to keep styling concerns decoupled from application logic.</li></ul>",
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
    const collectionTitle = "Lesson 43: Styling HTML Elements Dynamically Using JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 43;

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

    console.log("🎉 Done! JS Lesson 43 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
