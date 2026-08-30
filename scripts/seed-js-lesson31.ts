/**
 * Seed Script: JavaScript "Lesson 31: Spread Operator in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson31.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson31.ts
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
        "<p>In this lesson, we explore the powerful <strong>Spread Operator (<code>...</code>)</strong> in JavaScript.</p><p>Introduced in ES6, the spread operator allows iterable collections (like arrays, strings, or objects) to be expanded into individual elements or properties. It is the cornerstone of modern, immutable JavaScript programming.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BpTlc1wEar6IYzcwGS8Vgg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-31-spread-operator-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-31-spread-operator-in-javascript?file=script.js</a></p>',
    },

    // ── 1. The Basics: How It Works ──
    { id: nextId(), type: "heading" as const, content: "1. The Basics: Unpacking Iterables" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The spread operator takes all elements out of a container and lays them out individually:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const colors = ['red', 'green', 'blue'];
const primaryColors = ['yellow', ...colors];

console.log(primaryColors);
// Output: ['yellow', 'red', 'green', 'blue']`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Mastering Array Manipulation ──
    { id: nextId(), type: "heading" as const, content: "2. Mastering Array Manipulation with Spread" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The spread operator serves as a clean, declarative replacement for older methods like <code>concat()</code>, <code>slice()</code>, or <code>splice()</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Merging / Concatenating Arrays:
const fruits = ['apple', 'banana'];
const veggies = ['carrot', 'spinach'];
const merged = [...fruits, ...veggies];
console.log(merged); // ['apple', 'banana', 'carrot', 'spinach']

// 2. Cloning Arrays (Shallow Copy):
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (Original remains intact!)
console.log(copy);     // [1, 2, 3, 4]

// 3. Inserting Elements Anywhere:
const letters = ['b', 'c'];
const newLetters = ['a', ...letters, 'd'];
console.log(newLetters); // ['a', 'b', 'c', 'd']`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Immutable Object Manipulation ──
    { id: nextId(), type: "heading" as const, content: "3. Immutable Object Operations & State Updates" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When used inside an object literal (<code>{}</code>), spread unpacks key-value pairs. If keys conflict, <strong>the latter property overwrites the earlier one</strong>. This makes immutable state updates trivial in frameworks like React:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Merging Objects:
const userProfile = { name: 'Alex', age: 30 };
const userSettings = { theme: 'dark', notifications: true };
const fullUser = { ...userProfile, ...userSettings };
console.log(fullUser);
// { name: 'Alex', age: 30, theme: 'dark', notifications: true }

// 2. Non-Destructive / Immutable Updates:
const user = { name: 'Dana', status: 'offline' };
const updatedUser = {
  ...user,
  status: 'online',       // Overrides 'offline'
  lastLogin: Date.now()   // Adds new property
};

console.log(user);        // { name: 'Dana', status: 'offline' } (Original untouched!)
console.log(updatedUser); // { name: 'Dana', status: 'online', lastLogin: ... }`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Function Arguments Expansion ──
    { id: nextId(), type: "heading" as const, content: "4. Expanding Function Arguments" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Functions like <code>Math.max()</code> accept individual numeric arguments rather than an array. Spread solves this effortlessly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const temps = [68, 82, 75, 91, 70];

// Spreads [68, 82, 75, 91, 70] into Math.max(68, 82, 75, 91, 70)
const highestTemp = Math.max(...temps);
console.log(highestTemp); // Output: 91`,
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
        "<ul><li>The <strong>Spread Operator (<code>...</code>)</strong> expands iterables into discrete elements or properties.</li><li>Provides clean <strong>shallow copying</strong> for both arrays and objects.</li><li>Enables <strong>immutable updates</strong> essential for modern component and state architectures.</li><li>Lays out array elements directly as function call arguments.</li></ul>",
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
    const collectionTitle = "Lesson 31: Spread Operator in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 31;

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

    console.log("🎉 Done! JS Lesson 31 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
