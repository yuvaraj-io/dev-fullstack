/**
 * Seed Script: JavaScript "Lesson 27: Difference Between Methods and Functions in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson27.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson27.ts
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
        "<p>In this lesson, we demystify a classic programming question: <em>\"What is the difference between a Function and a Method in JavaScript?\"</em></p><p>You've likely heard the popular saying: <strong>\"Every method is a function, but not every function is a method.\"</strong> Let's break down exactly what distinguishes them in JavaScript.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*l1N9TdyLZkfGeLW3H-P_NQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-27-difference-between-methods-and-functions?file=script.js,index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-27-difference-between-methods-and-functions?file=script.js,index.html</a></p>',
    },

    // ── 1. What is a Function? ──
    { id: nextId(), type: "heading" as const, content: "1. What is a Function? (Standalone)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>function</strong> is an independent block of reusable code designed to perform a specific task. It stands alone and is not tied to any particular object:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet() {
  console.log("Hello, world!");
}

greet(); // Output: Hello, world! (Standalone invocation)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. What is a Method? ──
    { id: nextId(), type: "heading" as const, content: "2. What is a Method? (Object-Bound)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>method</strong> is a function defined as a property inside an object. Because it is bound to that object instance, it gains access to the object's properties via the <code>this</code> keyword:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = {
  name: "Alice",
  greet() {
    console.log(\`Hello, \${this.name}!\`);
  }
};

user.greet(); // Output: Hello, Alice! (Invoked on 'user' object context)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Key Differences Table & List ──
    { id: nextId(), type: "heading" as const, content: "3. ⚙️ Key Differences Between Function and Method" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Ownership:</strong> A function is standalone; a method belongs to an object.</li><li><strong>Context (<code>this</code>):</strong> A standalone function does not rely on an owning object context, whereas inside a method, <code>this</code> references the owner object.</li><li><strong>Invocation:</strong> A function is called directly (<code>sayHello()</code>); a method is called via its owner (<code>user.sayHello()</code>).</li><li><strong>Purpose:</strong> Methods define object behavior and mutations, while functions handle general computation and logic.</li></ul>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "⚡ Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>✅ <strong>Every method is a function</strong> — because it's executable code.</li><li>🧠 <strong>Functions are standalone</strong>, while <strong>methods are properties of objects</strong>.</li><li>💬 Use methods when actions belong to data models, and standalone functions for modular utility operations.</li></ul>",
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
    const collectionTitle = "Lesson 27: Difference Between Methods and Functions in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 27;

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

    console.log("🎉 Done! JS Lesson 27 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
