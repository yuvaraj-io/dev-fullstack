/**
 * Seed Script: JavaScript "Lesson 40: Selecting Elements in JavaScript | DOM Manipulation"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson40.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson40.ts
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
        "<p>In this lesson, we learn how to select HTML elements in JavaScript for DOM manipulation.</p><p>Instead of traversing deeply nested properties like <code>document.body.children[0].children[2]</code>, JavaScript provides powerful querying methods to select elements cleanly by <strong>Tag Name, Class Name, ID, and modern CSS selectors</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*sZJdGeGPAEqtpdEGDNiJgg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-40-selecting-elements-in-javascript?file=script.js%2Cindex.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-40-selecting-elements-in-javascript?file=script.js,index.html</a></p>',
    },

    // ── 1. Selecting by Tag Name ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Selecting by Tag Name (getElementsByTagName)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.getElementsByTagName('tag')</code> returns an <strong>HTMLCollection</strong> of all matching elements:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// HTML:
// <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>

const allItems = document.getElementsByTagName('li');
console.log(allItems); // HTMLCollection [li, li, li]

// Access individual items:
console.log(allItems[0].textContent); // "HTML"
console.log(allItems[2].textContent); // "JavaScript"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Selecting by Class Name ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Selecting by Class Name (getElementsByClassName)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.getElementsByClassName('class')</code> returns an <strong>HTMLCollection</strong> of elements sharing the specified class:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// HTML:
// <ul>
//   <li class="topic">HTML</li>
//   <li class="topic">CSS</li>
//   <li class="topic">JavaScript</li>
// </ul>

const topics = document.getElementsByClassName('topic');
console.log(topics); // HTMLCollection of 3 elements
console.log(topics[0].textContent); // "HTML"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Selecting by ID ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Selecting by ID (getElementById)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.getElementById('id')</code> returns a <strong>single element</strong> (or <code>null</code> if not found) since IDs must be unique per document:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// HTML: <li id="js-topic">JavaScript</li>

const jsTopic = document.getElementById('js-topic');
console.log(jsTopic.textContent); // "JavaScript"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. querySelector ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Modern Selection: querySelector()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.querySelector('selector')</code> accepts any valid CSS selector string and returns the <strong>first matching element</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Select by class:
const firstHighlight = document.querySelector('.highlight');

// Select by ID:
const jsTopic = document.querySelector('#js-topic');

// Select by tag:
const firstLi = document.querySelector('li');

// Select by attribute:
const level2 = document.querySelector('[data-level="2"]');`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. querySelectorAll ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Modern Selection: querySelectorAll()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>document.querySelectorAll('selector')</code> returns a static <strong>NodeList</strong> of all matching elements. Unlike <code>HTMLCollection</code>, <code>NodeList</code> supports direct <code>.forEach()</code> iteration:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const allTopics = document.querySelectorAll('.topic');

allTopics.forEach(item => {
  item.style.color = 'green';
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Key Takeaways ──
    { id: nextId(), type: "heading" as const, content: "🚀 Key Takeaways & Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Use <strong><code>querySelector()</code></strong> for single element lookups using standard CSS selector syntax.</li><li>Use <strong><code>querySelectorAll()</code></strong> for batch element selection (returns a modern iterable <code>NodeList</code>).</li><li><code>HTMLCollection</code> (returned by <code>getElementsByClassName</code> / <code>getElementsByTagName</code>) is live and lacks array methods like <code>forEach()</code>.</li><li>Prefer modern CSS selectors (<code>querySelector</code> / <code>querySelectorAll</code>) for cleaner, unified code.</li></ul>",
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
    const collectionTitle = "Lesson 40: Selecting Elements in JavaScript | DOM Manipulation";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 40;

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

    console.log("🎉 Done! JS Lesson 40 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
