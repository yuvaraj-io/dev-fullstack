/**
 * Seed Script: JavaScript "Lesson 9: Working with Booleans and Truthy/Falsy Values in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson9.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson9.ts
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
        "<p>In this lesson, we explore <strong>Booleans and Truthy / Falsy values in JavaScript</strong> — the cornerstone of decision making, conditional statements, and logical control flow in your applications.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-9-working-with-booleans-and-truthyfalsy-values?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-9-working-with-booleans-and-truthyfalsy-values?file=script.js</a></p>',
    },

    // ── What is a Boolean? ──
    { id: nextId(), type: "heading" as const, content: "What is a Boolean?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, a <strong>Boolean</strong> is a primitive data type that can hold only one of two possible values:</p><ul><li><code>true</code></li><li><code>false</code></li></ul><p>Booleans are fundamental in evaluating conditions, comparisons, and controlling execution branching (like <code>if/else</code> and loops).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let isLoggedIn = true;
let hasAccess = false;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── How Do You Get Boolean Values? ──
    { id: nextId(), type: "heading" as const, content: "How Do You Get Boolean Values?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Booleans are most commonly produced as the evaluation result of comparison expressions:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(5 > 3);     // true
console.log(10 === 10); // true
console.log(7 !== 2);   // true
console.log(4 < 2);     // false`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Booleans in If Conditions ──
    { id: nextId(), type: "heading" as const, content: "Booleans in If Conditions" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const isAdmin = true;

if (isAdmin) {
  console.log("You can access the dashboard");
} else {
  console.log("Access denied");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Truthy & Falsy Values ──
    { id: nextId(), type: "heading" as const, content: "What Are Truthy and Falsy Values?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, every value has an inherent boolean equivalence when evaluated inside a conditional context (type coercion). Values are categorized as either <strong>falsy</strong> or <strong>truthy</strong>.</p>",
    },

    // ❌ Falsy Values
    { id: nextId(), type: "heading" as const, content: "❌ Falsy Values" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>There are only <strong>6 falsy values</strong> in JavaScript (plus <code>0n</code> and <code>document.all</code> in browser environments):</p><ul><li><code>false</code> (the boolean literal)</li><li><code>0</code>, <code>-0</code>, <code>0n</code> (numbers)</li><li><code>\"\"</code> (empty string)</li><li><code>null</code> (absence of object value)</li><li><code>undefined</code> (unassigned variable)</li><li><code>NaN</code> (Not a Number)</li></ul><p>Any of these evaluated in an <code>if</code> check will resolve to <code>false</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `if (0) {
  console.log("This will never run");
}

if ("") {
  console.log("This will never run either");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ✅ Truthy Values
    { id: nextId(), type: "heading" as const, content: "✅ Truthy Values" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Everything that is not falsy is truthy!</strong> This includes:</p><ul><li>Non-zero numbers: <code>1</code>, <code>-42</code>, <code>3.14</code></li><li>Non-empty strings: <code>\"hello\"</code>, <code>\"false\"</code>, <code>\"0\"</code>, <code>\" \"</code> (whitespace string)</li><li>Arrays (even empty ones!): <code>[]</code>, <code>[1, 2]</code></li><li>Objects (even empty ones!): <code>{}</code>, <code>{ a: 1 }</code></li><li>Functions</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `if ("hello") {
  console.log("This will run!"); // Runs
}

if ([]) {
  console.log("Empty arrays are truthy!"); // Runs
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Boolean Conversion ──
    { id: nextId(), type: "heading" as const, content: "🧪 Explicit Conversion with Boolean() and Double NOT (!!)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can explicitly cast any value to its boolean equivalent using <code>Boolean(val)</code> or the popular double negation shortcut <code>!!val</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Using Boolean() function
console.log(Boolean(0));        // false
console.log(Boolean("text"));   // true
console.log(Boolean(null));     // false
console.log(Boolean([]));       // true

// Using Double Negation (!!)
console.log(!!0);         // false
console.log(!!"hello");   // true
console.log(!!null);      // false
console.log(!!{});        // true`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Common Mistake ──
    { id: nextId(), type: "heading" as const, content: "⚠️ Common Beginner Mistake: Empty Arrays & Objects" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A frequent bug occurs when developers assume empty arrays (<code>[]</code>) or empty objects (<code>{}</code>) are falsy. <strong>They are objects in memory and always truthy!</strong></p><p>To check if an array or object is empty, check their length or keys:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const arr = [];
if (arr.length === 0) {
  console.log("Array is empty!");
}

const obj = {};
if (Object.keys(obj).length === 0) {
  console.log("Object is empty!");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "📌 Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Booleans represent binary states: <code>true</code> or <code>false</code>.</li><li>Comparison expressions directly return boolean values.</li><li>Falsy values are exactly: <code>false</code>, <code>0</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>.</li><li>All other values, including <code>[]</code> and <code>{}</code>, are truthy.</li><li>Use <code>Boolean(val)</code> or <code>!!val</code> to explicitly coerce any value to a boolean.</li></ul>",
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
    const collectionTitle = "Lesson 9: Working with Booleans and Truthy/Falsy Values in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 9;

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

    console.log("🎉 Done! JS Lesson 9 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
