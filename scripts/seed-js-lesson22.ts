/**
 * Seed Script: JavaScript "Lesson 22: Closure, Lexical & Block Scope"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson22.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson22.ts
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
        "<p>In this lesson, we explore three of the most crucial concepts for writing predictable, robust JavaScript: <strong>Closures</strong>, <strong>Lexical Scope</strong>, and <strong>Block Scope</strong>.</p><p>Understanding where variables live and how functions maintain references to their creation environment allows you to write clean, encapsulated, and bug-resistant code.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*805SQKs_3eQoX8TgI91eVQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-22-closure-lexical-block-scope?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-22-closure-lexical-block-scope?file=script.js</a></p>',
    },

    // ── 1. Variable & Function Accessibility ──
    { id: nextId(), type: "heading" as const, content: "1. Variable & Function Accessibility (var vs let/const)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong><code>var</code>:</strong> Function-scoped or global. It is hoisted and initialized with <code>undefined</code>. Crucially, <code>var</code> ignores <code>{}</code> block boundaries, potentially leaking variables outside loops and conditional statements.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(varColor); // undefined (hoisted with initialization)
var varColor = "blue";
console.log(varColor); // "blue"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong><code>let</code> and <code>const</code>:</strong> Block-scoped. They are hoisted into memory but <strong>not initialized</strong> (residing in the Temporal Dead Zone), throwing a <code>ReferenceError</code> if accessed before their declaration line.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `{
  let blockLet = "inside";
  const blockConst = 10;
  // blockLet and blockConst exist only within these braces
}

// Outside block:
// console.log(blockLet);   // ReferenceError: blockLet is not defined
// console.log(blockConst); // ReferenceError: blockConst is not defined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Function Declarations vs Expressions ──
    { id: nextId(), type: "heading" as const, content: "Function Declarations vs Function Expressions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Function declarations are fully hoisted and can be invoked prior to their definition. Function expressions assigned to <code>const</code> or <code>let</code> are not callable before assignment:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Function declaration:
sayHi(); // Output: "Hi" (works due to hoisting)
function sayHi() {
  console.log("Hi");
}

// Function expression / arrow:
// greet(); // ReferenceError: Cannot access 'greet' before initialization
const greet = () => console.log("Hello");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Closures ──
    { id: nextId(), type: "heading" as const, content: "2. Closures — The Secret Weapon of JavaScript" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>closure</strong> is a function that <strong>remembers and accesses variables from its lexical outer environment</strong>, even after that outer function has finished executing and returned.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function createCounter(initial = 0) {
  let count = initial; // Private variable captured by closure

  return {
    increment() {
      count += 1;
      return count;
    },
    get() {
      return count;
    }
  };
}

const myCounter = createCounter(5);
console.log(myCounter.get());       // Output: 5
console.log(myCounter.increment()); // Output: 6
console.log(myCounter.get());       // Output: 6`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Why Closures Matter:</strong></p><ul><li><strong>Data encapsulation:</strong> Creating truly private state without classes.</li><li><strong>Function factories:</strong> Functions that generate specialized functions.</li><li><strong>State persistence:</strong> Handlers, currying, and memoization patterns.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Function Factory pattern
function multiplyBy(factor) {
  return (value) => value * factor; // Closes over 'factor'
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(7)); // Output: 14
console.log(triple(7)); // Output: 21`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Block Scope in Loops ──
    { id: nextId(), type: "heading" as const, content: "3. Block Scope & The Classic Loop Trap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Block scope creates a new variable binding for each loop iteration with <code>let</code>, avoiding the classic asynchronous <code>var</code> loop bug:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// With let: each iteration receives its own block-scoped 'i'
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log('let i:', i), 0); // Prints 0, 1, 2
}

// With var: 'j' is function-scoped and overwritten
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log('var j:', j), 0); // Prints 3, 3, 3
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Lexical Scope ──
    { id: nextId(), type: "heading" as const, content: "4. Lexical Scope (Static Scoping)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Lexical scope</strong> means variable resolution is determined by the physical location where functions are written in the source code, <em>not</em> where they are invoked at runtime.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const globalName = "GLOBAL";

function outer() {
  const outerName = "OUTER";

  function inner() {
    console.log(outerName); // Resolves to OUTER because inner was written inside outer
  }

  return inner;
}

const fn = outer();
fn(); // Output: "OUTER"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Real-world Module Pattern ──
    { id: nextId(), type: "heading" as const, content: "5. Real-World Module Pattern: Safe Configuration Manager" },
    {
      id: nextId(),
      type: "code" as const,
      code: `function createConfig(initial = {}) {
  // Private state safely hidden inside closure
  let config = { ...initial };

  return {
    get(key) {
      return config[key];
    },
    set(key, value) {
      config[key] = value;
    },
    keys() {
      return Object.keys(config);
    }
  };
}

const appConfig = createConfig({ theme: "light" });
console.log(appConfig.get("theme")); // "light"
appConfig.set("theme", "dark");
console.log(appConfig.get("theme")); // "dark"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Quick Summary Checklist" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Use <code>const</code> by default, <code>let</code> when reassigning; avoid <code>var</code>.</li><li>Prefer function declarations when hoisting is beneficial; use arrow functions for callbacks and values.</li><li>Leverage closures for encapsulation and private state.</li><li>Lexical scoping means source code placement determines variable resolution.</li><li>Block scope ensures local boundaries and prevents memory leaks in loops.</li></ul>",
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
    const collectionTitle = "Lesson 22 — Closure, Lexical & Block Scope";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 22;

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

    console.log("🎉 Done! JS Lesson 22 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
