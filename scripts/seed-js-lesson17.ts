/**
 * Seed Script: JavaScript "Lesson 17: Functions in JavaScript — Declaration, Expression & Arrow Functions"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson17.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson17.ts
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
        "<p>In this lesson, we explore one of the fundamental pillars of JavaScript: <strong>Functions</strong>.</p><p>Functions allow you to organize your code into modular, reusable blocks, avoid repetitive logic, accept inputs (parameters), and return computed outputs.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*qsE-9DBJDG48KVJP8psQDw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/functions-in-javascript-expression-arrow-functions?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/functions-in-javascript-expression-arrow-functions?file=script.js</a></p>',
    },

    // ── What is a Function? ──
    { id: nextId(), type: "heading" as const, content: "What is a Function?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>function</strong> is a self-contained block of code designed to perform a specific task. Think of it as a <em>mini-program</em> inside your program — it only executes when you explicitly <strong>call</strong> (or invoke) it.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet() {
  console.log("Hello, JavaScript learner! 👋");
}

greet(); // Output: Hello, JavaScript learner! 👋`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Functions are defined once and can be executed multiple times with different inputs.</li><li>They keep code clean, organized, and testable (DRY principle).</li><li>They accept <strong>parameters</strong> as input and return <strong>results</strong> using the <code>return</code> keyword.</li></ul>",
    },

    // ── 1. Function Declaration ──
    { id: nextId(), type: "heading" as const, content: "1. Function Declaration" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This is the classic way to define a function using the <code>function</code> keyword. Function declarations are <strong>hoisted</strong>, meaning you can safely call them before the line where they are defined in the code.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // Output: 8`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Function Expression ──
    { id: nextId(), type: "heading" as const, content: "2. Function Expression" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>function expression</strong> defines an anonymous or named function and assigns it to a variable. Unlike declarations, function expressions are <strong>not hoisted</strong> — you must define them before invoking them.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 2)); // Output: 8`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Arrow Functions (ES6) ──
    { id: nextId(), type: "heading" as const, content: "3. Arrow Functions (ES6)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Introduced in ES6, <strong>arrow functions</strong> provide a concise and modern syntax. They are especially popular in callbacks, array methods, and functional patterns.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Implicit return with concise body:
const subtract = (a, b) => a - b;
console.log(subtract(10, 4)); // Output: 6

// Single parameter (parentheses optional):
const square = n => n * n;
console.log(square(5)); // Output: 25

// Arrow function with statement block:
const greetUser = (name) => {
  console.log(\`Welcome, \${name}! 👋\`);
};
greetUser("Yuvaraj"); // Output: Welcome, Yuvaraj! 👋`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Key characteristic:</strong> Arrow functions do not bind their own <code>this</code> context; they inherit <code>this</code> from the surrounding lexical scope.</p>",
    },

    // ── Parameters & Return Values ──
    { id: nextId(), type: "heading" as const, content: "4. Parameters, Return Values & Default Parameters" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Functions can accept multiple parameters and use <strong>default parameter values</strong> if arguments are omitted:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Function returning computed area:
function calculateArea(width, height) {
  return width * height;
}
console.log("Area:", calculateArea(10, 5)); // Output: Area: 50

// Function with default parameter:
function greetAgain(name = "Guest") {
  console.log(\`Hello, \${name}!\`);
}
greetAgain();         // Output: Hello, Guest!
greetAgain("Medium"); // Output: Hello, Medium!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Functions Calling Other Functions ──
    { id: nextId(), type: "heading" as const, content: "5. Composition: Functions Calling Other Functions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Breaking complex problems down into small, single-purpose functions allows you to compose them together cleanly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function double(num) {
  return num * 2;
}

function triple(num) {
  return num * 3;
}

function magicCalculation(num) {
  return double(num) + triple(num);
}

console.log(magicCalculation(5)); // Output: 25`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Final Thought ──
    { id: nextId(), type: "heading" as const, content: "✨ Final Thought" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Functions are the ultimate building blocks in JavaScript. Mastering declarations, expressions, arrow functions, and parameter passing establishes the groundwork for advanced topics like scope, hoisting, closures, and asynchronous programming.</p>",
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
    const collectionTitle = "Lesson 17: Functions in JavaScript — Declaration, Expression & Arrow Functions";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 17;

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

    console.log("🎉 Done! JS Lesson 17 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
