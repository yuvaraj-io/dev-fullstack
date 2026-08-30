/**
 * Seed Script: JavaScript "Lesson 12: Control Flow with if, else if, and else in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson12.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson12.ts
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
        "<p>In this lesson, we explore <strong>Control Flow with <code>if</code>, <code>else if</code>, and <code>else</code> in JavaScript</strong>. Conditional statements allow your programs to make decisions and execute specific blocks of code depending on whether conditions evaluate to truthy or falsy.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-12-control-flow-with-if-else-if-and-else?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-12-control-flow-with-if-else-if-and-else?file=script.js</a></p>',
    },

    // ── The if Statement ──
    { id: nextId(), type: "heading" as const, content: "🔹 The if Statement" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>if</code> statement evaluates an expression inside parentheses <code>()</code>. If the expression resolves to <code>true</code> (or any truthy value), the code block enclosed by curly braces <code>{}</code> runs.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const temperature = 30;

// Checks truthiness of variable
if (temperature) {
  console.log("temperature is a truthy value");
}

// Checks relational condition
if (temperature > 25) {
  console.log("It's a hot day!");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── The else Statement ──
    { id: nextId(), type: "heading" as const, content: "🔹 The else Statement" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>else</code> statement provides an alternative fallback block that executes only when the preceding <code>if</code> condition evaluates to <code>false</code> (or any falsy value).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const temperature = 20;

if (temperature > 25) {
  console.log("It's a hot day!");
} else {
  console.log("It's a cool day."); // Runs because temperature (20) > 25 is false
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── The else if Statement ──
    { id: nextId(), type: "heading" as const, content: "🔹 The else if Statement" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you have more than two possible branches, <code>else if</code> allows you to chain and test multiple conditions sequentially from top to bottom. As soon as one condition matches, its block runs and the remaining checks are skipped.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const temperature = 25;

if (temperature > 30) {
  console.log("It's a very hot day!");
} else if (temperature > 20) {
  console.log("It's a warm day."); // Matches here and logs message
} else {
  console.log("It's a cool day.");
}`,
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
        "<ul><li>Use <strong><code>if</code></strong> to execute code when a condition is <code>true</code> or truthy.</li><li>Use <strong><code>else if</code></strong> to test additional conditions sequentially if previous checks evaluate to falsy.</li><li>Use <strong><code>else</code></strong> as the catch-all fallback when none of the preceding conditions matched.</li></ul>",
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
    const collectionTitle = "Lesson 12: Control Flow with if, else if, and else in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 12;

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

    console.log("🎉 Done! JS Lesson 12 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
