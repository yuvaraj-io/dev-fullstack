/**
 * Seed Script: JavaScript "Lesson 37: Some and Every Array Method in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson37.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson37.ts
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
        "<p>In this lesson, we explore two vital boolean-testing array methods in JavaScript: <strong><code>some()</code></strong> and <strong><code>every()</code></strong>.</p><p>These higher-order methods test array elements against predicate callback conditions, providing efficient short-circuiting logic for validations and checks without manual loops.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*03FVgkWx9rAr--FvfiUzdg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-37-some-and-every-array-method-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-37-some-and-every-array-method-in-javascript?file=script.js</a></p>',
    },

    // ── 1. some() Method ──
    { id: nextId(), type: "heading" as const, content: "1. The some() Method (At Least One Matches)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>some()</code></strong> method tests whether <strong>at least one element</strong> in the array passes the callback test. It returns <code>true</code> immediately upon finding a match (short-circuiting); otherwise, it returns <code>false</code>.</p><p><strong>Syntax:</strong> <code>array.some((element, index, array) => { ... })</code></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Numbers Example:
const numbers = [10, 20, 30, 40];
const hasLargeNumber = numbers.some(num => num > 25);
console.log(hasLargeNumber); // true (30 and 40 exceed 25)

// Objects Example:
const users = [
  { name: "Alice", age: 17 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 15 }
];
const hasAdult = users.some(user => user.age >= 18);
console.log(hasAdult); // true (Bob is 22)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. every() Method ──
    { id: nextId(), type: "heading" as const, content: "2. The every() Method (All Must Match)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>every()</code></strong> method tests whether <strong>all elements</strong> in the array satisfy the condition. If any element fails the test, it immediately short-circuits and returns <code>false</code>; if all elements pass, it returns <code>true</code>.</p><p><strong>Syntax:</strong> <code>array.every((element, index, array) => { ... })</code></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Numbers Example:
const numbers = [10, 20, 30, 40];
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// Objects Example:
const users = [
  { name: "Alice", age: 17 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 15 }
];
const allAdults = users.every(user => user.age >= 18);
console.log(allAdults); // false (Alice & Charlie are under 18)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Combining some() and every() ──
    { id: nextId(), type: "heading" as const, content: "3. Combining some() and every() in Real Applications" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Combining both methods allows expressive task list / workflow status validations:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const tasks = [
  { title: "Task 1", completed: true },
  { title: "Task 2", completed: false },
  { title: "Task 3", completed: true }
];

const anyIncomplete = tasks.some(task => !task.completed);
const allComplete = tasks.every(task => task.completed);

console.log('Any Incomplete:', anyIncomplete); // true
console.log('All Complete:', allComplete);     // false`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary & Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>some()</code> returns <code>true</code> if <strong>&ge; 1 element</strong> satisfies the predicate (short-circuits on first <code>true</code>).</li><li><code>every()</code> returns <code>true</code> only if <strong>100% of elements</strong> satisfy the predicate (short-circuits on first <code>false</code>).</li><li>Both methods accept <code>(element, index, array)</code> in their callback.</li><li>Both return a pure boolean without mutating the source array.</li></ul>",
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
    const collectionTitle = "Lesson 37: Some and Every Array Method in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 37;

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

    console.log("🎉 Done! JS Lesson 37 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
