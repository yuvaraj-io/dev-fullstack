/**
 * Seed Script: JavaScript "Lesson 10: Comparison Operators in JavaScript (== vs ===)"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson10.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson10.ts
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
        "<p>In this lesson, we explore <strong>Comparison Operators in JavaScript</strong>, with a special focus on the crucial difference between <strong>Loose Equality (<code>==</code>)</strong> and <strong>Strict Equality (<code>===</code>)</strong>.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-10-comparison-operators-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-10-comparison-operators-in-javascript?file=script.js</a></p>',
    },

    // ── What are Comparison Operators? ──
    { id: nextId(), type: "heading" as const, content: "What Are Comparison Operators in JavaScript?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, the <code>==</code> operator tests for <strong>loose equality</strong> (equality with automatic type coercion), while <code>===</code> tests for <strong>strict equality</strong> (equality without type coercion). Both compare values, but they handle data types very differently.</p>",
    },

    // ── == (Loose Equality) ──
    { id: nextId(), type: "heading" as const, content: "== (Loose Equality)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Type Coercion:</strong> Converts both operands to a common data type behind the scenes before comparing.</li><li><strong>Behavior:</strong> Returns <code>true</code> if the values match after conversion.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("5" == 5);           // true (string "5" coerced to number 5)
console.log(null == undefined); // true (special rule)
console.log(0 == false);        // true (false coerced to 0)
console.log("0" == false);      // true (both coerced to 0)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Because JavaScript attempts implicit type conversion, loose equality can frequently lead to surprising edge cases and hard-to-detect bugs.</p>",
    },

    // ── === (Strict Equality) ──
    { id: nextId(), type: "heading" as const, content: "=== (Strict Equality)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>No Type Coercion:</strong> Compares both the value and the underlying data type directly.</li><li><strong>Behavior:</strong> Returns <code>true</code> <em>only</em> if both operands share the same type and have the exact same value.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("5" === 5);           // false (string vs number)
console.log(null === undefined); // false (null vs undefined)
console.log(0 === false);        // false (number vs boolean)
console.log("0" === false);      // false (string vs boolean)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "Comparison Summary Table" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse; margin-top: 10px;\"><thead><tr style=\"background: #f3f4f6;\"><th style=\"border: 1px solid #d1d5db; padding: 8px;\">Feature</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>==</code> (Loose Equality)</th><th style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>===</code> (Strict Equality)</th></tr></thead><tbody><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><strong>Type Conversion</strong></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Performs implicit type coercion</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">No type coercion</td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><strong>Value Comparison</strong></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">After converting types</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Without converting types</td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>null == undefined</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>true</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>false</code></td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>\"5\" == 5</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>true</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>false</code></td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>0 == false</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>true</code></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><code>false</code></td></tr><tr><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><strong>Best Practice</strong></td><td style=\"border: 1px solid #d1d5db; padding: 8px;\">Rare / Use with caution</td><td style=\"border: 1px solid #d1d5db; padding: 8px;\"><strong>Standard default for clean code</strong></td></tr></tbody></table>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "✅ Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Always prefer <code>===</code> and <code>!==</code>:</strong> Using strict equality avoids unintended type conversions and ensures your logic behaves reliably and predictably.</li><li><strong>Use <code>==</code> with extreme caution:</strong> The only common idiomatic use of <code>==</code> is checking for both <code>null</code> and <code>undefined</code> simultaneously via <code>val == null</code>.</li></ul>",
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
    const collectionTitle = "Lesson 10: Comparison Operators in JavaScript (== vs ===)";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 10;

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

    console.log("🎉 Done! JS Lesson 10 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
