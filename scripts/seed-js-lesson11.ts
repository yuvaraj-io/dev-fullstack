/**
 * Seed Script: JavaScript "Lesson 11: Logical Operators in JavaScript (&&, ||, !)"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson11.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson11.ts
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
        "<p>In this lesson, we explore <strong>Logical Operators in JavaScript</strong> (<code>&&</code>, <code>||</code>, <code>!</code>). Logical operators are essential tools for combining multiple conditions, controlling flow, providing fallback values, and executing short-circuit evaluation.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-11-logical-operators-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-11-logical-operators-in-javascript?file=script.js</a></p>',
    },

    // ── Overview Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/0*sQJ0yin0UOAnkFaW.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Logical AND (&&) ──
    { id: nextId(), type: "heading" as const, content: "🔹 Logical AND (&&)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&&</code> operator evaluates expressions from left to right with <strong>short-circuiting</strong>:</p><ul><li>If it encounters a <strong>falsy value</strong>, evaluation stops immediately and that falsy value is returned.</li><li>If all operands are truthy, it returns the <strong>last operand</strong>.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const truthy = true;
const positiveStringValue = "positive";
const falsy = false;
console.log(truthy && positiveStringValue && falsy); // Output: false

const zero = 0;
const trueValue = true;
console.log(zero && trueValue); // Output: 0 (stops on first falsy value)

const stringValue = "value";
const latestString = "latest";
console.log(stringValue && latestString); // Output: "latest" (returns last operand)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Logical OR (||) ──
    { id: nextId(), type: "heading" as const, content: "🔹 Logical OR (||)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>||</code> operator also evaluates from left to right:</p><ul><li>Returns the <strong>first truthy value</strong> it encounters and stops evaluating (short-circuit).</li><li>If <strong>all operands are falsy</strong>, it returns the <strong>last operand</strong>.</li></ul><p>This is commonly used to provide default / fallback values.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Example 1: First value is truthy → returns immediately
const isActive = true;
const username = "John";
console.log(isActive || username || false); // Output: true

// Example 2: First value is falsy (0) → returns default fallback
const score = 0; // falsy
const defaultScore = 100;
console.log(score || defaultScore); // Output: 100

// Example 3: All values are falsy → returns the last falsy value
const name = "";
const age = 0;
const isVerified = false;
console.log(name || age || isVerified); // Output: false`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Logical NOT (!) ──
    { id: nextId(), type: "heading" as const, content: "🔹 Logical NOT (!)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>!</code> operator inverts the truthiness of an operand:</p><ul><li>If the value is truthy, it returns <code>false</code>.</li><li>If the value is falsy, it returns <code>true</code>.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const not = false;
console.log(!not); // Output: true

console.log(!0);         // true
console.log(!"hello");   // false
console.log(!null);      // true`,
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
        "<ul><li><code>&amp;&amp;</code> (<strong>Logical AND</strong>): Returns the first falsy operand, or the last operand if all are truthy.</li><li><code>||</code> (<strong>Logical OR</strong>): Returns the first truthy operand, or the last operand if all are falsy.</li><li><code>!</code> (<strong>Logical NOT</strong>): Flips truthiness to its opposite boolean value (<code>true</code> ↔ <code>false</code>).</li></ul>",
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
    const collectionTitle = "Lesson 11: Logical Operators in JavaScript (&&, ||, !)";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 11;

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

    console.log("🎉 Done! JS Lesson 11 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
