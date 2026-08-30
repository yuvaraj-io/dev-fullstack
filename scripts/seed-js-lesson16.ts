/**
 * Seed Script: JavaScript "Lesson 16: Mastering Loops in JavaScript — for, while, do…while & Breaking Loops"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson16.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson16.ts
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
        "<p>In this lesson, we explore <strong>Loops in JavaScript</strong> — <code>for</code>, <code>while</code>, <code>do...while</code>, along with control statements <code>break</code> and <code>continue</code>.</p><p>Loops allow your programs to repeat blocks of code efficiently as long as a specified condition is true, reducing code duplication and processing dynamic datasets seamlessly.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:850/1*MLo6xpkl9D8Cerlb-R5AEg.jpeg",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-16-mastering-loops-in-javascript-for-while-loops?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-16-mastering-loops-in-javascript-for-while-loops?file=script.js</a></p>',
    },

    // ── What Are Loops? ──
    { id: nextId(), type: "heading" as const, content: "What Are Loops & Why Do We Need Them?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine printing numbers from 1 to 100. Writing 100 manual <code>console.log()</code> calls is impractical. Loops tell JavaScript: <em>\"Keep executing this task until I say stop!\"</em></p><ul><li>Run repetitive tasks efficiently</li><li>Iterate through lists and arrays</li><li>Process API data streams dynamically</li><li>Write DRY (Don't Repeat Yourself), reusable code</li></ul>",
    },

    // ── How Loops Work Behind the Scenes ──
    { id: nextId(), type: "heading" as const, content: "How Loops Work (The 3 Core Steps)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Initialization:</strong> Define and set the starting state/counter (e.g. <code>let i = 1</code>).</li><li><strong>Condition:</strong> Evaluated before every iteration — if truthy, the loop body executes; if falsy, the loop terminates.</li><li><strong>Increment / Decrement:</strong> Updates the counter to progress towards termination (e.g. <code>i++</code>).</li></ol>",
    },

    // ── 1. The for Loop ──
    { id: nextId(), type: "heading" as const, content: "1. The for Loop" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The standard <code>for</code> loop is used when you know <strong>in advance how many times</strong> you want to iterate:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `for (let i = 1; i <= 5; i++) {
  console.log("Number:", i);
}

// Output:
// Number: 1
// Number: 2
// Number: 3
// Number: 4
// Number: 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. The while Loop ──
    { id: nextId(), type: "heading" as const, content: "2. The while Loop" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>while</code> loop is used when you <strong>don't know beforehand</strong> how many iterations are needed — it runs continuously as long as the condition remains truthy.</p><p>⚠️ <em>Warning:</em> Ensure your condition eventually becomes falsy; otherwise, you create an infinite loop.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let i = 1;
while (i <= 3) {
  console.log("Count:", i);
  i++; // Increment step is essential!
}

// Output:
// Count: 1
// Count: 2
// Count: 3`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. The do...while Loop ──
    { id: nextId(), type: "heading" as const, content: "3. The do...while Loop" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Similar to <code>while</code>, but evaluates the condition <strong>after</strong> executing the body. Therefore, the body is guaranteed to run <strong>at least once</strong>, even if the condition is initially false.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let i = 5;
do {
  console.log("Value:", i);
  i++;
} while (i < 5);

// Output:
// Value: 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Breaking Out of a Loop ──
    { id: nextId(), type: "heading" as const, content: "4. Breaking Out of a Loop (break)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>break</code> statement abruptly terminates the entire loop and transfers control to the statement immediately following the loop.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `for (let i = 1; i <= 10; i++) {
  if (i === 5) break; // Exits loop as soon as i reaches 5
  console.log(i);
}

// Output:
// 1
// 2
// 3
// 4`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Skipping Iterations (continue) ──
    { id: nextId(), type: "heading" as const, content: "5. Skipping Iterations (continue)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>continue</code> statement skips the remainder of the current iteration and jumps directly to the next iteration.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `for (let i = 1; i <= 5; i++) {
  if (i === 3) continue; // Skips printing 3
  console.log(i);
}

// Output:
// 1
// 2
// 4
// 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✨ Conclusion & Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>for</code> loop:</strong> Best for counted iterations when the boundary is predetermined.</li><li><strong><code>while</code> loop:</strong> Evaluates condition before each run; ideal when waiting for a dynamic trigger.</li><li><strong><code>do...while</code> loop:</strong> Always runs at least once before checking the condition.</li><li><strong><code>break</code>:</strong> Immediately exits and stops the loop.</li><li><strong><code>continue</code>:</strong> Skips the current iteration and moves directly to the next.</li></ul>",
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
    const collectionTitle = "Lesson 16: Mastering Loops in JavaScript — for, while, do…while & Breaking Loops";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 16;

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

    console.log("🎉 Done! JS Lesson 16 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
