/**
 * Seed Script: JavaScript "Lesson 7: Template Literals and Interpolation in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson7.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson7.ts
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
        "<p>In this lesson, we will explore <strong>Template Literals and String Interpolation in JavaScript</strong>. Instead of concatenating strings using standard single quotes (<code>'</code>) or double quotes (<code>\"</code>) with the <code>+</code> operator, template literals allow us to write clean, multi-line, and dynamic strings wrapped with backticks (<code>`</code>).</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-7-template-literals-and-interpolation-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-7-template-literals-and-interpolation-javascript?file=script.js</a></p>',
    },

    // ── What Are Template Literals? ──
    { id: nextId(), type: "heading" as const, content: "What Are Template Literals?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Template literals are string literals enclosed by backticks (<code>`</code>). They provide two superpowers to string handling in JavaScript:</p><ul><li><strong>Multi-line strings:</strong> Formatted cleanly without manual <code>\\n</code> escape characters.</li><li><strong>String interpolation:</strong> Embedding variables and arbitrary JS expressions directly using the <code>${...}</code> syntax.</li></ul>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*wOnOtCnsUR_iIqB8ifNmXQ.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const name = "Yuvaraj";
const greeting = \`Hello, \${name}!\`;
console.log(greeting); // "Hello, Yuvaraj!"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Multi-line Strings ──
    { id: nextId(), type: "heading" as const, content: "Multi-line Strings" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>With template literals, creating multi-line strings becomes intuitive and preserves indentation naturally:</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Vtd9yBhDGTu3gNwsOdvj7Q.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const poem = \`This is line one.
This is line two.
This is line three.\`;

console.log(poem);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Embedding Expressions ──
    { id: nextId(), type: "heading" as const, content: "Embedding Expressions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Inside <code>${...}</code>, you can insert any valid JavaScript expression — mathematical calculations, function calls, object property lookups, and more:</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*6cxA-isbTmBAKOalf1Xrcg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const a = 10;
const b = 20;

console.log(\`The sum of \${a} and \${b} is \${a + b}.\`);
// "The sum of 10 and 20 is 30."`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Conditional Expressions ──
    { id: nextId(), type: "heading" as const, content: "Conditional (Ternary) Expressions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can embed ternary conditions inside template literals to render dynamic text conditionally:</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*yd3L11ihsb5aMKmZVdfEjA.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const isMember = true;
const message = \`Welcome back! Your fee is \${isMember ? "$2.00" : "$10.00"}.\`;

console.log(message);
// "Welcome back! Your fee is $2.00."`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Tagged Templates (Advanced) ──
    { id: nextId(), type: "heading" as const, content: "Tagged Templates (Advanced)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Tagged templates</strong> allow you to parse template literals with a custom function. The tag function receives the array of string chunks as its first parameter, followed by each evaluated expression as subsequent arguments.</p><p>This pattern powers popular libraries like <code>styled-components</code>, SQL query builders (preventing injection), and localization formatters.</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*mxqqxwVItrcepiWPc_2UnA.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function emphasize(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i] ? values[i].toUpperCase() : "";
    return acc + str + val;
  }, "");
}

const item = "apples";
const result = emphasize\`I would love some \${item} please!\`;
console.log(result); // "I would love some APPLES please!"`,
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
        "<ul><li>Use <strong>backticks (<code>`</code>)</strong> to create template literals.</li><li>Embed variables and expressions effortlessly with <strong><code>${expression}</code></strong>.</li><li>Write <strong>multi-line strings</strong> naturally without <code>\\n</code> escape codes.</li><li>Leverage <strong>tagged templates</strong> when you need custom string processing, sanitization, or styling engines.</li></ul>",
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
    const collectionTitle = "Lesson 7: Template Literals and Interpolation in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 7;

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

    console.log("🎉 Done! JS Lesson 7 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
