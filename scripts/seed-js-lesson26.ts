/**
 * Seed Script: JavaScript "Lesson 26: Returning Functions with Closures in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson26.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson26.ts
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
        "<p>In this lesson, we explore how <strong>returning functions with closures</strong> allows JavaScript functions to maintain persistent state, encapsulate private variables, and create factory instances.</p><p>When an inner function is returned from an outer function, it retains access to the outer function's scope environment even after the outer function has completed execution.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*68BCmFNtePgl3IT8rpwiGA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-26-returning-functions-with-closures?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-26-returning-functions-with-closures?file=script.js</a></p>',
    },

    // ── 1. What Exactly Is a Closure? ──
    { id: nextId(), type: "heading" as const, content: "1. What Exactly Is a Closure?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>closure</strong> occurs when a function retains access to its lexical scope variables even when executed outside that scope:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function outerFunction() {
  let count = 0; // Local lexical variable

  function innerFunction() {
    count++;
    console.log('Count:', count);
  }

  return innerFunction; // Returning function with closure
}

const counter = outerFunction(); // Closure instance created
counter(); // Output: Count: 1
counter(); // Output: Count: 2
counter(); // Output: Count: 3`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Even though <code>outerFunction()</code> has finished running, <code>counter()</code> maintains a live reference to <code>count</code> in memory. The variable is preserved in the closure backpack 🎒.</p>",
    },

    // ── 2. Creating Independent Instances ──
    { id: nextId(), type: "heading" as const, content: "2. Creating Independent Closure Instances" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Each invocation of <code>outerFunction()</code> allocates an independent lexical scope environment in memory:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const counter1 = outerFunction();
const counter2 = outerFunction();

counter1(); // Output: Count: 1
counter1(); // Output: Count: 2

counter2(); // Output: Count: 1 (Completely independent state!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Data Encapsulation & Private Variables ──
    { id: nextId(), type: "heading" as const, content: "3. Private Data Encapsulation via Closures" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Closures provide true encapsulation by preventing external access to internal state, exposing only designated getter and mutator methods:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function createUser(name) {
  let score = 0; // Private state variable

  return {
    getName: function () {
      return name;
    },
    incrementScore: function () {
      score++;
      return score;
    },
    reset: function () {
      score = 0;
    }
  };
}

const player1 = createUser('Alice');
console.log(player1.getName());        // Output: "Alice"
console.log(player1.incrementScore()); // Output: 1
console.log(player1.incrementScore()); // Output: 2
player1.reset();
console.log(player1.incrementScore()); // Output: 1`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Neither <code>name</code> nor <code>score</code> can be modified directly from outside the object; all interactions must pass through the returned closure functions.</p>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "🔍 Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>A closure is created when an inner function accesses variables from its enclosing lexical scope.</li><li>Returning an inner function preserves its outer scope in memory.</li><li>Each factory call produces an isolated closure instance with its own state.</li><li>Closures provide a clean, functional approach to data hiding and state encapsulation in JavaScript.</li></ul>",
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
    const collectionTitle = "Lesson 26: Returning Functions with Closures in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 26;

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

    console.log("🎉 Done! JS Lesson 26 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
