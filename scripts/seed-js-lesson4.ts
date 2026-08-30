/**
 * Seed Script: JavaScript "Lesson 4: Variables in JavaScript — var, let, and const"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson4.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson4.ts
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
        "<p>Variables are the heart of any program — they let you <strong>store, update, and use data</strong> as your application runs. With the arrival of ES6 (ECMAScript 2015), JavaScript gave us <strong>three distinct ways to declare variables</strong>: <code>var</code>, <code>let</code>, and <code>const</code>.</p><p>Understanding when to use which declaration is a foundational skill for every JavaScript developer.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-4-variables-in-javascript-var-let-and-const?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-4-variables-in-javascript-var-let-and-const?file=script.js</a></p>',
    },

    // ── var — Function-Scoped Variable ──
    { id: nextId(), type: "heading" as const, content: "var — Function-Scoped Variable" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>📍 <strong>Scope:</strong> Function-scoped — accessible anywhere within the enclosing function, even across nested code blocks (<code>if</code>, <code>for</code>, etc.).</li><li>🚀 <strong>Hoisting:</strong> Yes — declarations are hoisted to the top of their scope and initialized with <code>undefined</code>.</li><li>🔄 <strong>Re-declaration:</strong> Allowed in the same scope (risky as it easily creates accidental bugs).</li><li>🔁 <strong>Reassignment:</strong> Allowed.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function testVar() {
  console.log(name); // undefined (hoisted)
  var name = "Anand";
  console.log(name); // Anand

  if (true) {
    var age = 30;
  }
  console.log(age); // 30 — still accessible here outside the block!
}
testVar();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>💡 <strong>Why it's tricky:</strong></p><ul><li>Because of hoisting and function-scoping, <code>var</code> does not respect block boundaries (<code>{ ... }</code>).</li><li>Accidentally redeclaring or overwriting a <code>var</code> variable in the same scope leads to silent bugs.</li><li><strong>Recommendation:</strong> Avoid using <code>var</code> in modern JavaScript unless specifically building legacy scripts or intentional global attachments.</li></ul>",
    },

    // ── let — Block-Scoped Variable ──
    { id: nextId(), type: "heading" as const, content: "let — Block-Scoped Variable" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>📍 <strong>Scope:</strong> Block-scoped — only accessible inside the enclosing curly braces <code>{ ... }</code> where it is defined.</li><li>🚀 <strong>Hoisting:</strong> Hoisted to the top of the block, but <strong>not initialized</strong> (resides in the <em>Temporal Dead Zone</em>). Accessing before declaration throws a <code>ReferenceError</code>.</li><li>🔄 <strong>Re-declaration:</strong> ❌ Not allowed in the same scope.</li><li>🔁 <strong>Reassignment:</strong> ✅ Allowed.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function testLet() {
  // console.log(name); // ❌ ReferenceError: Cannot access 'name' before initialization
  let name = "Yuvi";
  console.log(name); // Yuvi

  if (true) {
    let age = 30;
    console.log(age); // 30
  }
  // console.log(age); // ❌ ReferenceError: age is not defined
}
testLet();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>💡 <strong>Why it's better:</strong></p><ul><li>Blocks behave predictably — once execution leaves the block, the variable is garbage collected / out of scope.</li><li>Prevents accidental duplicate variable declarations.</li><li><strong>Use case:</strong> When you know the value needs to be reassigned later (e.g., loop counters, conditional accumulators).</li></ul>",
    },

    // ── const — Block-Scoped Constant ──
    { id: nextId(), type: "heading" as const, content: "const — Block-Scoped Constant" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>📍 <strong>Scope:</strong> Block-scoped.</li><li>🚀 <strong>Hoisting:</strong> Hoisted, but not initialized (in Temporal Dead Zone). Accessing before declaration throws a <code>ReferenceError</code>.</li><li>🔄 <strong>Re-declaration:</strong> ❌ Not allowed in the same scope.</li><li>🔁 <strong>Reassignment:</strong> ❌ Not allowed — must be assigned an initial value at declaration time.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const name = "Sahana";
// name = "New Name"; // ❌ TypeError: Assignment to constant variable

const user = { name: "Sahana" };
user.name = "Yuvi"; // ✅ Allowed! The *reference* is constant, but object properties can mutate.
console.log(user.name); // Yuvi`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>💡 <strong>Important Gotcha:</strong> <code>const</code> prevents reassigning the variable identifier itself. If the value is an object or array, you can still modify, add, or remove its internal properties and elements.</p>",
    },

    // ── Comparison Table / Summary ──
    { id: nextId(), type: "heading" as const, content: "🧡 Summary & Quick Rules of Thumb" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse; margin-top: 10px;\"><thead><tr style=\"background: #f3f4f6;\"><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Keyword</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Scope</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Reassignable?</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Redeclarable?</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Hoisted?</th></tr></thead><tbody><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>var</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Function</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">✅ Yes</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">✅ Yes</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Yes (<code>undefined</code>)</td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>let</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Block</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">✅ Yes</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">❌ No</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Yes (TDZ)</td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>const</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Block</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">❌ No</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">❌ No</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Yes (TDZ)</td></tr></tbody></table>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p style=\"margin-top: 15px;\"><strong>Golden Rule:</strong></p><ul><li>🎯 <strong>Default to <code>const</code></strong> for all variables.</li><li>🎯 <strong>Use <code>let</code></strong> only when you know you will reassign the variable.</li><li>🎯 <strong>Avoid <code>var</code></strong> in modern codebases.</li></ul>",
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
    const collectionTitle = "Lesson 4: Variables in JavaScript — var, let, and const";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 4;

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

    console.log("🎉 Done! JS Lesson 4 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
