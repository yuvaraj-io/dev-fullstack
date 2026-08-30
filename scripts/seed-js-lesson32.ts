/**
 * Seed Script: JavaScript "Lesson 32: Rest Parameters in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson32.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson32.ts
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
        "<p>In this lesson, we explore the <strong>Rest Parameter (<code>...</code>)</strong> in JavaScript.</p><p>While the Spread Operator spreads out data, the Rest Parameter gathers elements together into a genuine JavaScript array.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*_Wl72HvPJAKaNZ31iQzu7A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-32-rest-parameters-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-32-rest-parameters-in-javascript?file=script.js</a></p>',
    },

    // ── 1. What Are Rest Parameters? ──
    { id: nextId(), type: "heading" as const, content: "1. 🧩 What Are Rest Parameters?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Rest Parameter</strong> allows a function to accept any number of variable arguments and package them directly into a standard array:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function showNumbers(...nums) {
  console.log(nums);
}

showNumbers(1, 2, 3, 4, 5);
// Output: [1, 2, 3, 4, 5]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Why Was It Introduced in ES6? ──
    { id: nextId(), type: "heading" as const, content: "2. 🧠 Why Was It Introduced in ES6?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before ES6, JavaScript provided the legacy <code>arguments</code> object. However:</p><ol><li><code>arguments</code> is an array-like object without standard array methods like <code>map()</code>, <code>filter()</code>, or <code>reduce()</code>.</li><li><strong>Arrow functions do NOT have their own <code>arguments</code> object</strong>.</li></ol><p>Rest parameters resolve both problems cleanly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Clean implementation with Arrow Functions and Array methods:
const addAll = (...numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

console.log(addAll(10, 20, 30)); // Output: 60`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Rest vs Spread ──
    { id: nextId(), type: "heading" as const, content: "3. ⚖️ Rest vs Spread (The Comparison)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Although both use the three dots (<code>...</code>) syntax, they act in opposite directions:</p><ul><li><strong>Spread Operator:</strong> Expands / unpacks elements out of an iterable container.</li><li><strong>Rest Parameter:</strong> Collects / gathers incoming arguments into an array.</li></ul><blockquote><em>Spread = expand 🌀<br>Rest = collect 📦</em></blockquote>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Spread - expands
let arr1 = [1, 2, 3];
let arr2 = [4, 5];
let merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5]

// Rest - collects
function printAll(...args) {
  console.log(args);
}
printAll(1, 2, 3, 4); // [1, 2, 3, 4]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Rest with Other Parameters ──
    { id: nextId(), type: "heading" as const, content: "4. 🧱 Rest Parameter with Other Named Parameters" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can mix rest parameters with leading positional parameters, but <strong>the rest parameter must always be the last parameter</strong> in the function signature:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet(greeting, ...names) {
  names.forEach(name => console.log(\`\${greeting}, \${name}!\`));
}

greet("Hello", "Yuvaraj", "John");
// Output:
// Hello, Yuvaraj!
// Hello, John!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Common Use Cases & Summary ──
    { id: nextId(), type: "heading" as const, content: "5. 🧭 Summary & Common Use Cases" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>✅ Used to handle dynamic or variable-length argument lists.</li><li>✅ Fully compatible with arrow functions where <code>arguments</code> is unavailable.</li><li>✅ Rest parameters produce genuine arrays ready for <code>map()</code>, <code>filter()</code>, and <code>reduce()</code>.</li><li>✅ A function can only have one rest parameter, and it must appear at the end of the argument list.</li></ul>",
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
    const collectionTitle = "Lesson 32: Rest Parameters in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 32;

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

    console.log("🎉 Done! JS Lesson 32 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
