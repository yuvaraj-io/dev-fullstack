/**
 * Seed Script: JavaScript "Lesson 35: forEach Array Method in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson35.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson35.ts
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
        "<p>In this lesson, we explore the built-in <strong><code>forEach()</code> array method</strong> in JavaScript.</p><p>As a foundational higher-order function, <code>forEach()</code> executes a provided callback function once for each array element, providing a declarative and functional approach to iteration.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*gIKMIDOV2_K01cp_MEdXXg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-35-foreach-array-method-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-35-foreach-array-method-in-javascript?file=script.js</a></p>',
    },

    // ── 1. What is forEach and How Does It Work? ──
    { id: nextId(), type: "heading" as const, content: "1. What is forEach() and How Does It Work?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The callback passed into <code>forEach()</code> automatically receives up to three arguments:</p><ol><li><strong>Value (element):</strong> The current element being processed.</li><li><strong>Index:</strong> The index position of the current element.</li><li><strong>Array:</strong> The underlying array on which <code>forEach()</code> was called.</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["banana", "apple", "peach"];

fruits.forEach((element, index, array) => {
  console.log(\`--- Iteration \${index + 1} ---\`);
  console.log(\`Value: \${element.toUpperCase()}\`);
  console.log(\`Index: \${index}\`);
  console.log(\`Array Length: \${array.length}\`);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Higher-Order Functions Connection ──
    { id: nextId(), type: "heading" as const, content: "2. Higher-Order Function Connection & Arrow Syntax" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Because <code>forEach()</code> accepts a callback function as an argument, it is a <strong>Higher-Order Function</strong>. Pair it with concise arrow function syntax for clean inline operations:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["banana", "apple", "peach"];
fruits.forEach(fruit => console.log(fruit));
// Output:
// banana
// apple
// peach`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. forEach Always Returns undefined ──
    { id: nextId(), type: "heading" as const, content: "3. ⚠️ forEach() Always Returns undefined" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Unlike <code>map()</code>, <code>filter()</code>, or <code>reduce()</code>, <strong><code>forEach()</code> does not return a new array</strong>. Any <code>return</code> statement inside the callback is ignored:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["banana", "apple", "peach"];

const result = fruits.forEach(fruit => {
  return fruit.toUpperCase(); // ❌ return value is discarded
});

console.log(result); // undefined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Modifying External Variables (Side Effects) ──
    { id: nextId(), type: "heading" as const, content: "4. Side Effects & Modifying External Variables" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>forEach()</code> is intentionally designed for <strong>side effects</strong> (such as logging, updating external states, or modifying DOM elements):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const numbers = [1, 2, 3];
let sum = 0;

numbers.forEach(num => {
  sum += num;
});

console.log("Sum:", sum); // Output: 6`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. When NOT to Use forEach ──
    { id: nextId(), type: "heading" as const, content: "5. When NOT to Use forEach()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>When you need early termination (<code>break</code> / <code>return</code>):</strong> <code>forEach()</code> cannot be stopped early. Use standard <code>for...of</code> instead.</li><li><strong>When transforming data into a new array:</strong> Use <code>map()</code>.</li><li><strong>When filtering elements:</strong> Use <code>filter()</code>.</li><li><strong>When computing a single aggregate value:</strong> Use <code>reduce()</code>.</li></ul>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>forEach()</code> executes a callback for every element in an array in order.</li><li>It always returns <code>undefined</code> and cannot be chained directly.</li><li>Passes <code>(element, index, array)</code> to its callback.</li><li>Ideal for pure side effects like DOM manipulation or triggering external actions.</li></ul>",
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
    const collectionTitle = "Lesson 35: forEach Array Method in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 35;

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

    console.log("🎉 Done! JS Lesson 35 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
