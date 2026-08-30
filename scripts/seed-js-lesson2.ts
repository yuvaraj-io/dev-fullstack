/**
 * Seed Script: JavaScript "Lesson 2: Understanding Javascript syntax"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson2.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson2.ts
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
        "<p>Now that your setup is ready, it's time to take the next exciting step: ✨ <strong>Understanding JavaScript's syntax — the rules of the game!</strong></p><p>Think of this as learning how to speak the language of the browser clearly so it understands exactly what you want it to do. 🚀</p>",
    },

    // ── 1. Statements and Semicolons ──
    { id: nextId(), type: "heading" as const, content: "1. Statements and Semicolons" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every instruction you write in JavaScript is called a <strong>statement</strong>. You're telling the computer: <em>“Hey, do this!”</em></p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*htLyAXRgGxWtRSBeVeqgDg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let your_name = "Your Name";
console.log(your_name);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here you're saying:</p><ul><li>➡️ Create a variable called <code>your_name</code> and set it to <code>\"Your Name\"</code>.</li><li>➡️ Then print <code>your_name</code> to the console.</li></ul><p>At the end of each statement, you'll usually put a <strong>semicolon (<code>;</code>)</strong> — like a period at the end of a sentence. While JavaScript features Automatic Semicolon Insertion (ASI), it is always best practice to explicitly write them.</p>",
    },

    // ── 2. Variables & Constants ──
    { id: nextId(), type: "heading" as const, content: "2. Variables & Constants" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Variables are containers where you store and give names to data you want to use:</p><ul><li>Use <code>let</code> when the value might change later.</li><li>Use <code>const</code> when you're sure the value won't change.</li><li>Use <code>var</code> for legacy/function-scoped global declarations.</li></ul>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*vs-zuEmdNBjegv9sj8ShHw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let score = 10;
score = 15; // ✅ allowed

const birthYear = 2000;
// birthYear = 2001; // ❌ Error: Assignment to constant variable`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Think of variables as little boxes 📦 where you keep values. You can open the box later to read what's inside or swap it out with something new (if it's not a <code>const</code>).</p>",
    },

    // ── 3. Data Types ──
    { id: nextId(), type: "heading" as const, content: "3. Data Types" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript understands different kinds of data — just like you know the difference between words, numbers, and yes/no answers:</p><ul><li>📜 <strong>String:</strong> Text wrapped in quotes → <code>\"Hello\"</code></li><li>🔢 <strong>Number:</strong> Integers & floating points → <code>42</code>, <code>3.14</code></li><li>✅ / ❌ <strong>Boolean:</strong> Logical flags → <code>true</code> or <code>false</code></li><li>❌ <strong>null:</strong> Intentional absence of any object value</li><li>🤷‍♀️ <strong>undefined:</strong> A variable that has been declared but not assigned a value</li><li>🧊 <strong>BigInt:</strong> Arbitrary-precision integers for huge numbers</li><li>🔷 <strong>Symbol:</strong> Unique and immutable primitive value</li><li>🎒 <strong>Objects & Arrays:</strong> Complex collections of key-value pairs or ordered lists</li></ul>",
    },

    // ── 4. Operators ──
    { id: nextId(), type: "heading" as const, content: "4. Operators" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Operators are your tools 🛠 to perform calculations, comparisons, and logic on variables:</p><ul><li>➕ <strong>Arithmetic:</strong> Add (<code>+</code>), subtract (<code>-</code>), multiply (<code>*</code>), divide (<code>/</code>)</li><li>👀 <strong>Comparison:</strong> Compare values → <code>age &gt;= 18</code> (returns <code>true</code> or <code>false</code>)</li><li>🤝 <strong>Logical:</strong> Combine conditions → <code>if (isSunny &amp;&amp; hasUmbrella) { ... }</code></li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let sum = 5 + 3;
let isAdult = age >= 18;
let canGoOut = isSunny && !isRaining;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Control Structures & Conditionals ──
    { id: nextId(), type: "heading" as const, content: "5. Control Structures (Conditionals)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Conditionals allow your code to make intelligent decisions based on conditions: <em>“If this is true, do this. Otherwise, do that.”</em></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let score = 75;

if (score >= 50) {
  console.log("You passed! 🎉");
} else {
  console.log("Oops, try again! 💪");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Loops ──
    { id: nextId(), type: "heading" as const, content: "6. Loops" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Loops let you repeat actions multiple times without writing repetitive code:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here you're saying: <em>“Start at 0, keep going while it's less than 5, and increase by 1 each time.”</em></p>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-2-understanding-javscript-syntax?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-2-understanding-javscript-syntax?file=script.js</a></p>',
    },

    // ── Wrapping Up ──
    { id: nextId(), type: "heading" as const, content: "🌟 Wrapping Up" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here is what you learned in this lesson:</p><ul><li>✨ How to write statements — and why semicolons matter.</li><li>✨ How to store data in variables (<code>let</code>) & constants (<code>const</code>).</li><li>✨ Common data types JavaScript understands.</li><li>✨ How to use arithmetic, comparison, and logical operators.</li><li>✨ How to make decisions with <code>if/else</code> and repeat tasks with loops.</li></ul>",
    },

    // ── Final Words ──
    { id: nextId(), type: "heading" as const, content: "🧡 Final Words" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Learning syntax is like learning the alphabet of a language — not very glamorous, but it's what lets you write your first words, sentences, and eventually, full-scale web applications.</p>",
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
    const collectionTitle = "Lesson 2: Understanding Javascript syntax";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 2;

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

    console.log("🎉 Done! JS Lesson 2 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
