/**
 * Seed Script: JavaScript "Lesson 34: for…of vs for…in Loop in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson34.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson34.ts
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
        "<p>In this lesson, we compare two essential iteration loops in JavaScript: <strong><code>for...of</code></strong> and <strong><code>for...in</code></strong>.</p><p>While both simplify traditional indexed <code>for</code> loops, they serve fundamentally different purposes: one iterates over iterable <strong>values</strong>, while the other iterates over object <strong>keys (properties)</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*rNb16khcD7ydyqR5Fb39eQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-34-for-of-vs-for-in-loop-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-34-for-of-vs-for-in-loop-in-javascript?file=script.js</a></p>',
    },

    // ── 1. for...of Loop ──
    { id: nextId(), type: "heading" as const, content: "1. The Modern Way: for...of (Looping Over Values)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>for...of</code></strong> loop iterates directly over the <strong>values</strong> of any <strong>iterable object</strong> (Arrays, Strings, Maps, Sets, NodeLists):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["banana", "apple", "peach"];

for (const fruit of fruits) {
  // 'fruit' yields values directly in sequence:
  console.log(fruit); // "banana", then "apple", then "peach"
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. for...in Loop ──
    { id: nextId(), type: "heading" as const, content: "2. The Object Iterator: for...in (Looping Over Keys)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>for...in</code></strong> loop is designed to iterate over the <strong>enumerable property names (keys)</strong> of a plain JavaScript object:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const person = {
  firstName: "John",
  age: 50,
  city: "Bangalore"
};

for (const key in person) {
  // 'key' is the string property name:
  const value = person[key];
  console.log(\`\${key}: \${value}\`);
}
// Output:
// firstName: John
// age: 50
// city: Bangalore`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>⚠️ Crucial Limitation:</strong> Plain objects are <em>not iterable</em>. Running <code>for...of</code> directly on a plain object throws a <code>TypeError: object is not iterable</code>.</p>",
    },

    // ── 3. High Performance Object Iteration ──
    { id: nextId(), type: "heading" as const, content: "3. 💡 High-Performance Object Iteration with for...of" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Because <code>for...in</code> also traverses prototype chains and is slower, modern best practices recommend combining <code>Object.entries()</code> or <code>Object.values()</code> with destructuring inside <code>for...of</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const person = { firstName: "John", age: 50, city: "Bangalore" };

// 1. Loop only values:
for (const value of Object.values(person)) {
  console.log(value); // "John", 50, "Bangalore"
}

// 2. Loop keys and values with Destructuring:
for (const [key, value] of Object.entries(person)) {
  console.log(\`Key: \${key} -> Value: \${value}\`);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary: Which Loop When?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Use <strong><code>for...of</code></strong> for <strong>Arrays, Strings, Maps, Sets</strong>, and <code>Object.entries()</code> when you want direct access to <strong>VALUES</strong>.</li><li>Use <strong><code>for...in</code></strong> strictly when inspecting <strong>KEYS / property names</strong> on plain objects.</li><li>Always declare iteration variables with <code>const</code> or <code>let</code> to prevent scope leakage.</li></ul>",
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
    const collectionTitle = "Lesson 34: for…of vs for…in Loop in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 34;

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

    console.log("🎉 Done! JS Lesson 34 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
