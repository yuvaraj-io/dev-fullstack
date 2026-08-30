/**
 * Seed Script: JavaScript "Lesson 18: Scope and Hoisting in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson18.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson18.ts
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
        "<p>When working with variables, functions, and control flow in JavaScript, <strong>where</strong> you define something fundamentally dictates where it can be used.</p><p>This visibility is governed by <strong>Scope</strong>, while the JavaScript engine's behavior of organizing declarations into memory during compilation is called <strong>Hoisting</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*FTPhE197Ae9NuFBGIYD6xw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-18-scope-and-hoisting-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-18-scope-and-hoisting-in-javascript?file=script.js</a></p>',
    },

    // ── What is Scope? ──
    { id: nextId(), type: "heading" as const, content: "🧭 What is Scope?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Scope</strong> determines the accessibility (visibility) of variables, objects, and functions from different parts of your codebase. JavaScript features three main levels of scope:</p>",
    },

    // ── 1. Global Scope ──
    { id: nextId(), type: "heading" as const, content: "1. 🌍 Global Scope" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Variables declared outside of any function or code block exist in the global scope and can be read or modified anywhere across your script.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let message = "Hello, world!";

function greet() {
  console.log(message); // Accessible inside function
}

greet();               // Output: Hello, world!
console.log(message);  // Output: Hello, world!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Function Scope ──
    { id: nextId(), type: "heading" as const, content: "2. 🧩 Function Scope" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Variables declared inside a function body are local to that function. They cannot be accessed from outside.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function sayHello() {
  let greeting = "Hi there!";
  console.log(greeting); // Works fine inside function
}

sayHello();
console.log(greeting); // ❌ ReferenceError: greeting is not defined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Block Scope ──
    { id: nextId(), type: "heading" as const, content: "3. 📦 Block Scope (let & const vs var)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Variables declared with <code>let</code> and <code>const</code> inside any <code>{}</code> block (like <code>if</code>, <code>for</code>, or <code>while</code>) are bound strictly to that block.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `if (true) {
  let name = "Alice";
  const age = 25;
  console.log(name, age); // Accessible inside block
}

console.log(name); // ❌ ReferenceError: name is not defined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>⚠️ <strong>Important distinction:</strong> <code>var</code> is <em>not</em> block-scoped — it leaks out of <code>{}</code> blocks and is scoped only by enclosing functions or the global scope.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `if (true) {
  var city = "Bangalore";
}

console.log(city); // ✅ Output: "Bangalore" (leaks past block boundary!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Hoisting Explained ──
    { id: nextId(), type: "heading" as const, content: "🚀 Hoisting Explained" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>During JavaScript's compilation/creation phase, declarations of functions and variables are registered in memory before code execution begins. This behavior makes declarations appear as if they are 'lifted' to the top of their scope.</p>",
    },

    // ── Variable Hoisting & TDZ ──
    { id: nextId(), type: "heading" as const, content: "Variable Hoisting & Temporal Dead Zone (TDZ)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>How variables hoist depends on how they are declared:</p><ul><li><strong><code>var</code>:</strong> Hoisted and initialized with <code>undefined</code>. Accessing it prior to assignment returns <code>undefined</code>.</li><li><strong><code>let</code> & <code>const</code>:</strong> Hoisted into memory but <em>not</em> initialized. They reside in the <strong>Temporal Dead Zone (TDZ)</strong> until execution reaches their declaration line, throwing a <code>ReferenceError</code> if accessed early.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// var behavior:
console.log(a); // Output: undefined
var a = 10;

// let / const behavior:
console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 5;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Function Hoisting ──
    { id: nextId(), type: "heading" as const, content: "Function Hoisting" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Function Declarations</strong> are fully hoisted with their implementation, so they can be called before their definition line:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `greet(); // Output: Hello! (Works perfectly)

function greet() {
  console.log("Hello!");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Function Expressions & Arrow Functions</strong> are stored inside variables, so they follow variable hoisting rules and cannot be called before definition:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `sayHelloAgain(); // ❌ TypeError or ReferenceError

const sayHelloAgain = function () {
  console.log("Hello");
};`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary & Best Practices ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary & Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Prefer <code>const</code> and <code>let</code> over <code>var</code> to avoid accidental scope leakage and unpredictable hoisting bugs.</li><li>Always declare variables and function expressions before invoking them.</li><li>Be aware of the <strong>Temporal Dead Zone (TDZ)</strong> when structuring your files.</li></ul>",
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
    const collectionTitle = "Lesson 18: Scope and Hoisting in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 18;

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

    console.log("🎉 Done! JS Lesson 18 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
