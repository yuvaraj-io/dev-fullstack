/**
 * Seed Script: JavaScript "Lesson 15: Exploring JavaScript Console Methods"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson15.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson15.ts
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
        "<p>In this lesson, we explore one of the most powerful and essential built-in debugging tools in JavaScript — <strong>the <code>console</code> object</strong>.</p><p>Whether inspecting data structures, tracking errors, measuring execution performance, or organizing grouped outputs, the <code>console</code> provides versatile methods beyond basic <code>console.log()</code>.</p>",
    },

    // ── Tip: Opening Console ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>💡 <strong>How to open the DevTools Console:</strong> Press <code>Ctrl + Shift + I</code> (Windows/Linux) or <code>Cmd + Option + I</code> (macOS) in your browser, switch to the <strong>Console</strong> tab, and test these methods directly!</p>",
    },

    // ── 1. console.log() ──
    { id: nextId(), type: "heading" as const, content: "1. console.log()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>General-purpose logging for strings, numbers, booleans, objects, and arrays.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Hello, World!");
console.log({ name: "Alice", age: 25 });`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*404OdmF3yeo0dQfgIBqryg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 2. console.error() ──
    { id: nextId(), type: "heading" as const, content: "2. console.error()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Logs errors styled in distinct red with a stack trace icon. Essential during error handling and catch blocks.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.error("Something went wrong!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*s_ocah-aM-nkHBSMMpA8kw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 3. console.warn() ──
    { id: nextId(), type: "heading" as const, content: "3. console.warn()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Displays warning messages styled in yellow with a warning icon without interrupting program execution.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.warn("This is a warning!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*2FctJArBYUpkLHivcTQwmw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 4. console.info() ──
    { id: nextId(), type: "heading" as const, content: "4. console.info()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Logs informational messages with an info icon (frequently styled in blue in browser DevTools).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.info("Server started on port 3000");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*n7yQTwlOTN7eulZKYxLD9Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 5. console.table() ──
    { id: nextId(), type: "heading" as const, content: "5. console.table()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Renders arrays of objects or tabular data into an interactive, sortable visual table in the console.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];
console.table(users);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*HKfq3dluB27wsBW2VNQZ8Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 6. console.group() & console.groupEnd() ──
    { id: nextId(), type: "heading" as const, content: "6. console.group() & console.groupEnd()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Organizes related logs into a collapsible indented tree view to keep busy console windows clean.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.group("User Details");
console.log("Name: Alice");
console.log("Age: 25");
console.groupEnd();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Ya07azLSaeQSLiCsI2iKyg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 7. console.time() & console.timeEnd() ──
    { id: nextId(), type: "heading" as const, content: "7. console.time() & console.timeEnd()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Measures the exact millisecond duration of an operation or algorithm. Start the timer with <code>time(label)</code> and stop it with <code>timeEnd(label)</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.time("Loop Time");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("Loop Time");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*QhWx5B9j5Z5KwWxyYDxQVA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 8. console.dir() ──
    { id: nextId(), type: "heading" as const, content: "8. console.dir()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Displays an interactive hierarchical JSON-like list of all properties and prototype methods of an object or DOM element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = { name: "Alice", age: 25 };
console.dir(user);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*CmYkZu_PqDWq8E15Tu8Njg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 9. console.assert() ──
    { id: nextId(), type: "heading" as const, content: "9. console.assert()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Logs an error message <strong>only if</strong> the provided condition evaluates to <code>false</code>. If true, nothing is logged.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.assert(2 > 3, "Assertion failed: 2 is not greater than 3");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*2Fn2-0WynwISJyHgQLJ8bw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 10. console.clear() ──
    { id: nextId(), type: "heading" as const, content: "10. console.clear()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Clears the entire console history.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.clear();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 11. console.count() & console.countReset() ──
    { id: nextId(), type: "heading" as const, content: "11. console.count() & console.countReset()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Maintains and logs an internal counter keyed by a given label string.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.count("loop");      // loop: 1
console.count("loop");      // loop: 2
console.countReset("loop");
console.count("loop");      // loop: 1`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*_OWhlGgdel8_Ee45_7Z0xw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 12. console.trace() ──
    { id: nextId(), type: "heading" as const, content: "12. console.trace()" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Outputs a complete call stack trace showing the exact execution path that led to the function invocation.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function first() { second(); }
function second() { console.trace(); }
first();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*LxeVn3QBucbzE8TjKbVrww.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The JavaScript <code>console</code> object offers a rich suite of developer tools that go far beyond simple logging. Use <code>table</code> for datasets, <code>time</code> for profiling, <code>group</code> for organized outputs, and <code>assert</code>/<code>trace</code> for debugging complex control flows.</p><p><em>Best Practice:</em> Remember to clean up or strip verbose debugging logs before shipping to production environments.</p>",
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
    const collectionTitle = "Lesson 15: Exploring JavaScript Console Methods";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 15;

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

    console.log("🎉 Done! JS Lesson 15 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
