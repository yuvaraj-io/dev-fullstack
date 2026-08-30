/**
 * Seed Script: JavaScript "Lesson 8: Numbers and Math Methods in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson8.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson8.ts
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
        "<p>In this lesson, we will focus on working with <strong>Numbers and Math Methods in JavaScript</strong>.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-8-numbers-and-math-methods-in-javascript?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-8-numbers-and-math-methods-in-javascript?file=index.html</a></p>',
    },

    // ── What Are Numbers in JavaScript? ──
    { id: nextId(), type: "heading" as const, content: "What Are Numbers in JavaScript?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, numbers are a primitive data type that follows the IEEE 754 standard for double-precision 64-bit floating-point format. Unlike many other languages, JavaScript doesn't have separate types for integers and floats — all numbers belong to the single <code>Number</code> type:</p><ul><li><strong>Integers (whole numbers):</strong> <code>1</code>, <code>100</code>, <code>-50</code></li><li><strong>Floating-point numbers (decimals):</strong> <code>3.14</code>, <code>-0.5</code></li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let age = 30;
let price = 9.99;
console.log(typeof age);   // "number"
console.log(typeof price); // "number"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Basic Arithmetic Operators ──
    { id: nextId(), type: "heading" as const, content: "Basic Arithmetic Operators" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides full support for arithmetic operations:</p><ul><li>➕ <strong>Addition (<code>+</code>):</strong> <code>5 + 3</code> → <code>8</code></li><li>➖ <strong>Subtraction (<code>-</code>):</strong> <code>10 - 7</code> → <code>3</code></li><li>✖️ <strong>Multiplication (<code>*</code>):</strong> <code>4 * 2</code> → <code>8</code></li><li>➗ <strong>Division (<code>/</code>):</strong> <code>10 / 2</code> → <code>5</code></li><li><strong>Modulus / Remainder (<code>%</code>):</strong> <code>10 % 3</code> → <code>1</code></li><li><strong>Exponentiation (<code>**</code>):</strong> <code>2 ** 3</code> → <code>8</code></li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(7 % 2);  // 1 (remainder)
console.log(3 ** 2); // 9 (3 squared)
console.log(2 ** 4); // 16 (2 to the power 4)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Built-in Math Methods ──
    { id: nextId(), type: "heading" as const, content: "JavaScript Math Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides a built-in <code>Math</code> object equipped with static properties and methods for mathematical constants and operations.</p>",
    },

    // Math.round()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>1. <code>Math.round(x)</code>:</strong> Rounds a number to the nearest integer.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.round(4.6); // 5
Math.round(4.3); // 4`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.ceil()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>2. <code>Math.ceil(x)</code>:</strong> Always rounds a number <em>up</em> to the next integer.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.ceil(4.1); // 5
Math.ceil(4.0); // 4`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.floor()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>3. <code>Math.floor(x)</code>:</strong> Always rounds a number <em>down</em> to the nearest integer.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.floor(4.9); // 4
Math.floor(4.0); // 4`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.abs()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>4. <code>Math.abs(x)</code>:</strong> Returns the absolute (positive) value of a number.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.abs(-7);  // 7
Math.abs(7);   // 7`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.sqrt() & Math.pow()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>5. <code>Math.sqrt(x)</code> & <code>Math.pow(base, exp)</code>:</strong> Calculates square roots and powers.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.sqrt(25);   // 5
Math.pow(2, 3);   // 8`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.max() & Math.min()
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>6. <code>Math.max()</code> & <code>Math.min()</code>:</strong> Returns the largest or smallest number from a set of arguments.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Math.max(4, 9, 1, 15, 3); // 15
Math.min(4, 9, 1, 15, 3); // 1

// Can also be used with arrays using spread operator:
const nums = [10, 50, 20];
Math.max(...nums); // 50`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Math.random()
    {
      id: nextId(),
      type: "heading" as const,
      content: "Generating Random Numbers with Math.random()",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>Math.random()</code> generates a pseudo-random floating-point number in the range <code>[0, 1)</code> (inclusive of 0, but exclusive of 1).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(Math.random()); // e.g. 0.75439

// Formula for random integer between min and max (inclusive):
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random integer between 1 and 10:
const diceRoll = Math.floor(Math.random() * 10) + 1;
console.log(diceRoll);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Recap ──
    { id: nextId(), type: "heading" as const, content: "✅ Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>JavaScript uses the 64-bit float format for all numbers (both integers and decimals).</li><li>Standard arithmetic operations: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>, and <code>**</code>.</li><li>The <code>Math</code> object offers essential utilities: rounding (<code>round</code>, <code>ceil</code>, <code>floor</code>), extremes (<code>max</code>, <code>min</code>), algebra (<code>abs</code>, <code>sqrt</code>, <code>pow</code>), and randomness (<code>random</code>).</li></ul>",
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
    const collectionTitle = "Lesson 8: Numbers and Math Methods in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 8;

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

    console.log("🎉 Done! JS Lesson 8 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
