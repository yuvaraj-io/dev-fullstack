/**
 * Seed Script: JavaScript "Lesson 24: Higher-Order Functions and Callbacks in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson24.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson24.ts
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
        "<p>In this lesson, we explore two core functional programming concepts that give JavaScript its expressive power: <strong>Higher-Order Functions (HOFs)</strong> and <strong>Callback Functions</strong>.</p><p>These mechanisms underpin everything from array utilities (<code>map</code>, <code>filter</code>, <code>reduce</code>, <code>forEach</code>) to browser event listeners and asynchronous programming.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-24-higher-order-functions-and-callbacks?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-24-higher-order-functions-and-callbacks?file=script.js</a></p>',
    },

    // ── 1. What is a Higher-Order Function? ──
    { id: nextId(), type: "heading" as const, content: "1. What is a Higher-Order Function?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, functions are <strong>first-class citizens</strong>. They can be stored in variables, passed as arguments, and returned from other functions.</p><p>A <strong>Higher-Order Function (HOF)</strong> is any function that:</p><ul><li>Accepts one or more functions as arguments, and/or</li><li>Returns a function as its result.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

// processUserInput is a Higher-Order Function (receives 'callback' function):
function processUserInput(callback) {
  const name = "Alice";
  console.log(callback(name));
}

processUserInput(greet); // Output: Hello, Alice!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Why Are HOFs Useful? ──
    { id: nextId(), type: "heading" as const, content: "2. Why Are Higher-Order Functions Useful?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Higher-Order Functions eliminate boilerplate code, enable clean separation of concerns, and promote composability (DRY principle):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Common wrapper pattern
function logAndRun(fn) {
  console.log("Running operation...");
  fn();
}

function sayHello() {
  console.log("Hello!");
}

function sayBye() {
  console.log("Goodbye!");
}

logAndRun(sayHello);
logAndRun(sayBye);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Understanding Callbacks ──
    { id: nextId(), type: "heading" as const, content: "3. Understanding Callback Functions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>Callback Function</strong> is a function passed into another function with the expectation that it will be called back (invoked) at a specific time or after an asynchronous operation completes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function fetchData(callback) {
  console.log("Fetching data...");
  
  // Simulating async network delay
  setTimeout(() => {
    console.log("Data received!");
    callback(); // Callback invoked after response arrives
  }, 2000);
}

function processData() {
  console.log("Processing data...");
}

fetchData(processData);
// Output:
// Fetching data...
// (after 2s) Data received!
// Processing data...`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. The Callback Hell Problem ──
    { id: nextId(), type: "heading" as const, content: "4. The \"Callback Hell\" Pyramid of Doom" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When multiple asynchronous operations depend on one another, deeply nested callbacks lead to difficult-to-maintain code known as <strong>Callback Hell</strong> or the <strong>Pyramid of Doom</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Deeply nested asynchronous callbacks:
getData((a) => {
  processData(a, (b) => {
    saveData(b, (c) => {
      notifyUser(c, () => {
        console.log("All done!");
      });
    });
  });
});

// Modern JavaScript resolves this with Promises and async/await!`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Real-world Examples ──
    { id: nextId(), type: "heading" as const, content: "5. Real-World Built-in Higher-Order Functions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You use Higher-Order Functions daily in modern JavaScript applications:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Timer HOF with callback
setTimeout(() => {
  console.log("Executed after 1 second!");
}, 1000);

// 2. Array iteration HOF with callback
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num * 2));

// 3. Array transformation HOF (map)
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>First-class functions:</strong> JavaScript functions can be treated like any other value (stored, passed, returned).</li><li><strong>Higher-Order Function (HOF):</strong> A function that receives or returns another function.</li><li><strong>Callback:</strong> A function passed into an HOF to be executed later.</li><li>Callbacks power event handlers, timers, array methods, and asynchronous data fetching.</li></ul>",
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
    const collectionTitle = "Lesson 24: Higher-Order Functions and Callbacks in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 24;

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

    console.log("🎉 Done! JS Lesson 24 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
