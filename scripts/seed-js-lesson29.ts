/**
 * Seed Script: JavaScript "Lesson 29: The arguments Keyword in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson29.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson29.ts
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
        "<p>In this lesson, we explore the special <strong><code>arguments</code> object</strong> in JavaScript.</p><p>Before ES6 rest parameters (<code>...args</code>) were introduced, the <code>arguments</code> object was the primary way JavaScript developers handled dynamic or variable numbers of function parameters.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-29-the-arguments-keyword-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-29-the-arguments-keyword-in-javascript?file=script.js</a></p>',
    },

    // ── 1. What is the arguments Object? ──
    { id: nextId(), type: "heading" as const, content: "1. What is the arguments Object?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>arguments</code> object is an <strong>array-like object</strong> automatically accessible inside all non-arrow functions. It contains an indexed entry for every argument passed into the function:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function showArgs() {
  console.log(arguments);
  console.log('Total args:', arguments.length);
  console.log('First arg:', arguments[0]);
}

showArgs("JavaScript", 2025, true);
// Output:
// [Arguments] { '0': 'JavaScript', '1': 2025, '2': true }
// Total args: 3
// First arg: JavaScript`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Array-like vs Real Array ──
    { id: nextId(), type: "heading" as const, content: "2. Array-Like vs Real Array" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Although <code>arguments</code> has indexed access (<code>arguments[i]</code>) and a <code>.length</code> property, it is <strong>not a true Array</strong>. It lacks built-in array methods like <code>.map()</code>, <code>.filter()</code>, or <code>.forEach()</code>.</p><p>To use array methods, convert it to a real array with <code>Array.from()</code> or the spread operator <code>[...]</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function sumAll() {
  // Convert array-like object to a real Array
  const numbers = Array.from(arguments);
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(10, 20, 30, 40)); // Output: 100`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Arrow Functions and arguments ──
    { id: nextId(), type: "heading" as const, content: "3. Arrow Functions Do NOT Have arguments" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>As we learned in Lesson 28, <strong>arrow functions do not create their own <code>arguments</code> object</strong>. Attempting to use <code>arguments</code> inside an arrow function will either throw a <code>ReferenceError</code> or resolve to the outer enclosing function's <code>arguments</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const showArrowArgs = () => {
  // console.log(arguments); // ❌ ReferenceError in module/strict mode
};

// Modern ES6 solution for Arrow Functions: Rest Parameters
const showWithRest = (...args) => {
  console.log(args); // Output: [1, 2, 3] (Real Array with all methods!)
};

showWithRest(1, 2, 3);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Comparison: arguments vs Rest Parameters ──
    { id: nextId(), type: "heading" as const, content: "4. arguments vs Rest Parameters (...args)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>arguments</code> is an <strong>array-like object</strong> containing all parameters; <code>...args</code> produces a <strong>genuine JavaScript Array</strong>.</li><li><code>arguments</code> is only available in standard functions; <code>...args</code> works in both normal and arrow functions.</li><li><code>arguments</code> cannot capture a subset of remaining parameters, whereas rest parameters allow syntax like <code>function(first, ...rest)</code>.</li></ul>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>arguments</code> provides access to all parameters passed to a function call.</li><li>It is array-like, so convert it with <code>Array.from(arguments)</code> to use array methods.</li><li>Arrow functions do not have their own <code>arguments</code> binding.</li><li>In modern JavaScript, prefer ES6 <strong>Rest Parameters (<code>...args</code>)</strong> for cleaner, safer, and true-array functionality.</li></ul>",
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
    const collectionTitle = "Lesson 29: The arguments Keyword in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 29;

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

    console.log("🎉 Done! JS Lesson 29 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
