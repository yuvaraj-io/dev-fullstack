/**
 * Seed Script: JavaScript "Lesson 36: Map, Filter, Reduce in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson36.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson36.ts
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
        "<p>In this lesson, we explore the essential triad of functional array methods in JavaScript: <strong><code>map()</code></strong>, <strong><code>filter()</code></strong>, and <strong><code>reduce()</code></strong>.</p><p>Unlike <code>forEach()</code> which is used strictly for side effects and returns <code>undefined</code>, these three methods are designed for <strong>transforming, filtering, and accumulating data</strong> into meaningful return values without mutating the original array.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*w0Msb3CmAhZfwcpDaT6JaA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-36-map-filter-reduce-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-36-map-filter-reduce-in-javascript?file=script.js</a></p>',
    },

    // ── Dataset Setup ──
    { id: nextId(), type: "heading" as const, content: "Sample Datasets" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const numbers = [10, 25, 30, 45];

const users = [
  { name: 'Adarsh', score: 90, status: 'online' },
  { name: 'Aamir', score: 55, status: 'offline' },
  { name: 'Raman', score: 85, status: 'online' }
];`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 1. Transformation: map() ──
    { id: nextId(), type: "heading" as const, content: "1. Transformation: The map() Method" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>map()</code></strong> method creates a <strong>new array of the exact same length</strong> by applying the callback function to each item. The returned value from each iteration forms the new element:</p><p><strong>Callback arguments (3):</strong> <code>(currentValue, index, array)</code></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Double every number and format with index:
const indexedDoubles = numbers.map((num, index) => {
  return \`Index \${index}: \${num * 2}\`;
});
console.log(indexedDoubles);
// Output: ["Index 0: 20", "Index 1: 50", "Index 2: 60", "Index 3: 90"]

// Extract all user names:
const userNames = users.map(user => user.name);
console.log(userNames); // ['Adarsh', 'Aamir', 'Raman']`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Selection: filter() ──
    { id: nextId(), type: "heading" as const, content: "2. Selection: The filter() Method" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>filter()</code></strong> method creates a <strong>new array</strong> containing only the elements where the callback returns a truthy Boolean value (<code>true</code>):</p><p><strong>Callback arguments (3):</strong> <code>(currentValue, index, array)</code></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Filter for users who are 'online' AND not the first user:
const laterOnlineUsers = users.filter((user, index) => {
  return user.status === 'online' && index !== 0;
});

console.log(laterOnlineUsers);
// Output: [{ name: 'Raman', score: 85, status: 'online' }]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Accumulation: reduce() ──
    { id: nextId(), type: "heading" as const, content: "3. Accumulation: The reduce() Method" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>reduce()</code></strong> method condenses an array down to a <strong>single calculated value</strong> (number, string, object, or new array):</p><p><strong>Callback arguments (4):</strong> <code>(accumulator, currentValue, index, array)</code>, along with an <strong>initial value</strong> passed as the second argument to <code>reduce()</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Calculate total score of all users:
const totalScore = users.reduce((acc, currentUser, index) => {
  console.log(\`Processing index \${index}. Running total: \${acc}\`);
  return acc + currentUser.score;
}, 0); // <-- Initial accumulator value is 0

console.log('Total Score:', totalScore); // Output: 230`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Comparison Table & Summary ──
    { id: nextId(), type: "heading" as const, content: "4. Comparison & Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>map()</code></strong>: Transforms elements 1:1. Returns a new array of the same length.</li><li><strong><code>filter()</code></strong>: Selects matching items based on a condition. Returns a new array (length &le; original).</li><li><strong><code>reduce()</code></strong>: Aggregates elements across steps into a single outcome (sum, count, dictionary, etc.).</li><li><strong>Immutability:</strong> None of these three methods mutate the original array.</li></ul>",
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
    const collectionTitle = "Lesson 36: Map, Filter, Reduce in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 36;

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

    console.log("🎉 Done! JS Lesson 36 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
