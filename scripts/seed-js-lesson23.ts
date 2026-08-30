/**
 * Seed Script: JavaScript "Lesson 23: setTimeout and setInterval in JavaScript ⏱️"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson23.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson23.ts
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
        "<p>In this lesson, we explore <strong>Timers in JavaScript: <code>setTimeout</code> and <code>setInterval</code></strong>.</p><p>These timing functions allow us to schedule asynchronous delayed actions, repeated execution loops, animations, notifications, and periodic polling.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*KCSKxMrvU89T0363C4jYMA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-23-settimeout-and-setinterval-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-23-settimeout-and-setinterval-in-javascript?file=script.js</a></p>',
    },

    // ── 1. setTimeout() ──
    { id: nextId(), type: "heading" as const, content: "1. setTimeout() — Run Code Once After a Delay" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>setTimeout</code> schedules a callback function to run <strong>once</strong> after a specified delay in milliseconds:</p><p><code>setTimeout(callbackFunction, delayInMilliseconds, arg1, arg2, ...)</code></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Start");

setTimeout(() => {
  console.log("Hello after 3 seconds!");
}, 3000);

console.log("End");

// Output:
// Start
// End
// Hello after 3 seconds! (runs asynchronously after the call stack clears)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Passing Arguments to setTimeout ──
    { id: nextId(), type: "heading" as const, content: "Passing Arguments to setTimeout" },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

// Extra arguments passed after the delay parameter are forwarded to the callback:
setTimeout(greet, 2000, "Yuvaraj"); // Output after 2s: "Hello, Yuvaraj!"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. setInterval() ──
    { id: nextId(), type: "heading" as const, content: "2. setInterval() — Repeat Execution at Regular Intervals" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>setInterval</code> repeatedly invokes a callback function at fixed time intervals until cancelled:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let count = 1;

const intervalId = setInterval(() => {
  console.log(\`This is message \${count}\`);
  count++;

  if (count > 5) {
    clearInterval(intervalId); // Crucial: stops the timer
  }
}, 1000);

// Output:
// This is message 1
// This is message 2
// This is message 3
// This is message 4
// This is message 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Clearing Timers ──
    { id: nextId(), type: "heading" as const, content: "3. Clearing Timers (clearTimeout & clearInterval)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every timer call returns a unique numeric <code>timerId</code>. Pass this identifier to <code>clearTimeout()</code> or <code>clearInterval()</code> to cancel the scheduled task before execution:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Cancel a pending timeout:
const timeoutId = setTimeout(() => {
  console.log("This will never run!");
}, 5000);

clearTimeout(timeoutId); // Timeout canceled`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Practical Use Cases ──
    { id: nextId(), type: "heading" as const, content: "4. Practical Use Cases" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Common <code>setTimeout</code> Use Cases:</strong></p><ul><li>Dismissing toast notifications or alerts automatically after 3–5 seconds.</li><li>Debouncing user input in search bars.</li><li>Retrying network requests with exponential backoff.</li></ul><p><strong>Common <code>setInterval</code> Use Cases:</strong></p><ul><li>Live countdown clocks and stopwatch applications.</li><li>Polling background status or data synchronization.</li><li>Rotating carousel / slideshow transitions.</li></ul>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>setTimeout(fn, delay)</code> executes once after a delay.</li><li><code>setInterval(fn, interval)</code> repeats execution indefinitely until cleared.</li><li>Always keep track of timer IDs and clean them up with <code>clearTimeout()</code> and <code>clearInterval()</code> to prevent memory leaks.</li><li>Timers are asynchronous and execute through the JavaScript event loop queue.</li></ul>",
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
    const collectionTitle = "Lesson 23: setTimeout and setInterval in JavaScript ⏱️";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 23;

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

    console.log("🎉 Done! JS Lesson 23 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
