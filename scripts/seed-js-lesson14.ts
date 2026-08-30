/**
 * Seed Script: JavaScript "Lesson 14: The Ternary Operator in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson14.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson14.ts
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
        "<p>In this lesson, we explore a concise and elegant way to write inline conditional logic in JavaScript — the <strong>Ternary Operator</strong> (conditional operator <code>? :</code>).</p><p>It is called <em>ternary</em> because it is the only JavaScript operator that takes <strong>three operands</strong>: a condition to evaluate, an expression to execute if the condition is truthy, and an expression if it is falsy.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-14-ternary-operator-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-14-ternary-operator-in-javascript?file=script.js</a></p>',
    },

    // ── Syntax ──
    { id: nextId(), type: "heading" as const, content: "🔹 Syntax" },
    {
      id: nextId(),
      type: "code" as const,
      code: `condition ? expressionIfTruthy : expressionIfFalsy`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 1: Basic Ternary ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 1: Basic Ternary" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const age = 18;
const canVote = (age >= 18) ? "Yes, you can vote!" : "No, you cannot vote.";
console.log(canVote);
// Output: "Yes, you can vote!"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Explanation:</strong> The condition <code>(age >= 18)</code> resolves to <code>true</code> (truthy). The operator evaluates and returns the first branch <code>\"Yes, you can vote!\"</code>.</p>",
    },

    // ── Example 2: Chained Ternaries ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 2: Multiple Conditions (Chained Ternary)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const score = 85;
const grade = (score >= 90) ? "A" :
              (score >= 75) ? "B" :
              (score >= 50) ? "C" : "F";

console.log(grade);
// Output: "B"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Explanation:</strong> You can chain ternary operators to evaluate multiple fallback steps similarly to <code>else if</code>. Always format chained ternaries neatly across multiple lines to preserve code readability.</p>",
    },

    // ── Example 3: Truthy & Falsy Values ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 3: Working with Truthy and Falsy Values" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const name = "";
const displayName = name ? name : "Guest";
console.log(displayName);
// Output: "Guest"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Explanation:</strong> The ternary operator tests truthiness. Since <code>\"\"</code> is a falsy value (along with <code>0</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>false</code>), the second option <code>\"Guest\"</code> is chosen and returned.</p>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>The <strong>ternary operator</strong> is a clean, one-line alternative to simple <code>if...else</code> statements that return values.</li><li>Syntax: <code>condition ? valueIfTruthy : valueIfFalsy</code>.</li><li>Works with any <strong>truthy</strong> or <strong>falsy</strong> expression.</li><li>Keep ternary expressions concise — if conditions become too complex or nested, prefer a standard <code>if...else</code> or <code>switch</code> statement for clarity.</li></ul>",
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
    const collectionTitle = "Lesson 14: The Ternary Operator in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 14;

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

    console.log("🎉 Done! JS Lesson 14 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
