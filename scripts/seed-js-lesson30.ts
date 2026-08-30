/**
 * Seed Script: JavaScript "Lesson 30: Default Parameters in JavaScript 🛠️"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson30.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson30.ts
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
        "<p>In this lesson, we explore <strong>Default Parameters in JavaScript</strong>.</p><p>Default parameters allow named parameters to be initialized with default values if no value or <code>undefined</code> is passed, eliminating verbose fallback boilerplate code.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*vC-DmWXfF_5UOgcLddcSSQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-30-default-parameters-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-30-default-parameters-in-javascript?file=script.js</a></p>',
    },

    // ── 1. What Are Default Parameters? ──
    { id: nextId(), type: "heading" as const, content: "1. What Are Default Parameters?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before ES6, handling missing arguments required manual logical OR (<code>||</code>) checks or explicit <code>typeof</code> comparisons:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Pre-ES6 fallback pattern:
function greetOld(name) {
  name = name || "Guest";
  console.log(\`Hello, \${name}!\`);
}

// ES6 Default Parameters syntax:
function greet(name = "Guest") {
  console.log(\`Hello, \${name}!\`);
}

greet();          // Output: Hello, Guest!
greet("Yuvaraj"); // Output: Hello, Yuvaraj!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Multiple Parameters & Skipping with undefined ──
    { id: nextId(), type: "heading" as const, content: "2. Multiple Parameters & Skipping with undefined" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can define multiple default values. To skip an optional parameter and trigger its default value while passing subsequent arguments, pass <code>undefined</code> explicitly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function createUser(name, age = 18, role = "user") {
  console.log(\`Name: \${name}, Age: \${age}, Role: \${role}\`);
}

createUser("Yuvaraj", 25, "admin");        // Name: Yuvaraj, Age: 25, Role: admin
createUser("Yuvaraj", 25);                 // Name: Yuvaraj, Age: 25, Role: user (role defaults)
createUser("Yuvaraj", undefined, "moderator"); // Name: Yuvaraj, Age: 18, Role: moderator (age defaults!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Expressions as Default Values ──
    { id: nextId(), type: "heading" as const, content: "3. Dynamic Expressions & Function Calls as Defaults" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Default parameters are evaluated at call time from left to right, allowing dynamic expressions or function calls:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function randomNumber(max = Math.floor(Math.random() * 10)) {
  return max;
}

console.log(randomNumber());  // Dynamic number between 0 and 9
console.log(randomNumber(5)); // 5 (overridden)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Practical Real-World Example ──
    { id: nextId(), type: "heading" as const, content: "4. Real-World Example: Order Calculator" },
    {
      id: nextId(),
      type: "code" as const,
      code: `function calculateTotal(price, tax = 0.05, discount = 0) {
  return price + (price * tax) - discount;
}

console.log(calculateTotal(100));            // 105 (tax: 5%, discount: 0)
console.log(calculateTotal(100, 0.1));       // 110 (tax: 10%, discount: 0)
console.log(calculateTotal(100, 0.1, 10));   // 100 (tax: 10%, discount: $10)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Key Points to Remember" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Default parameters trigger only when the argument is <strong>omitted or explicitly passed as <code>undefined</code></strong>. (Passing <code>null</code> or <code>false</code> will not trigger the default).</li><li>You can skip intermediate parameters by supplying <code>undefined</code>.</li><li>Default values can be constants, expressions, or function invocations.</li><li>Always place default parameters after mandatory required parameters for clear API design.</li></ul>",
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
    const collectionTitle = "Lesson 30: Default Parameters in JavaScript 🛠️";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 30;

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

    console.log("🎉 Done! JS Lesson 30 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
