/**
 * Seed Script: JavaScript "Lesson 13: Switch Statement in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson13.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson13.ts
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
        "<p>In this lesson, we explore the <strong><code>switch</code> statement in JavaScript</strong>. A <code>switch</code> statement is often cleaner and more readable than multiple nested or chained <code>if...else if</code> statements, especially when matching a single expression against many discrete values.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-13-switch-statement-in-javascript" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-13-switch-statement-in-javascript</a></p>',
    },

    // ── Syntax ──
    { id: nextId(), type: "heading" as const, content: "🔹 Syntax" },
    {
      id: nextId(),
      type: "code" as const,
      code: `switch (expression) {
  case value1:
    // Code block for value1
    break;
  case value2:
    // Code block for value2
    break;
  default:
    // Code block if no cases match
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 1: Basic Switch ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 1: Basic Switch" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}
// Output: Wednesday`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>How it works:</strong> The <code>day</code> variable is strictly evaluated against each <code>case</code> value (using <code>===</code>). When it hits <code>case 3</code>, that block executes, and <code>break</code> immediately terminates the switch statement.</p>",
    },

    // ── Example 2: Grouping Cases ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 2: Multiple Cases for the Same Output" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruit = "apple";

switch (fruit) {
  case "banana":
  case "apple":
    console.log("This is a fruit.");
    break;
  default:
    console.log("Unknown item.");
}
// Output: This is a fruit.`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>How it works:</strong> By omitting a <code>break</code> between <code>case \"banana\":</code> and <code>case \"apple\":</code>, both cases execute the same logic block. This is a clean pattern to avoid duplicate code.</p>",
    },

    // ── Example 3: Fall-through (Omitting break) ──
    { id: nextId(), type: "heading" as const, content: "🔹 Example 3: Fall-Through Behavior (Without break)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const num = 2;

switch (num) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");
  case 3:
    console.log("Three");
  default:
    console.log("Default case");
}
// Output:
// Two
// Three
// Default case`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>⚠️ Crucial Concept:</strong> Once a matching <code>case</code> is found, JavaScript continues executing code line-by-line across all subsequent cases until it encounters a <code>break</code> statement or the switch block closes. Always remember your <code>break</code> statements unless intentional fall-through is desired!</p>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>switch</code> performs strict equality (<code>===</code>) comparisons between an expression and multiple <code>case</code> branches.</li><li>Use <code>break</code> after each case block to avoid unintentional fall-through execution.</li><li>Provide a <code>default</code> branch to handle unexpected or unhandled values.</li><li>Group adjacent cases together when multiple inputs share the same handling logic.</li></ul>",
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
    const collectionTitle = "Lesson 13: Switch Statement in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 13;

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

    console.log("🎉 Done! JS Lesson 13 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
