/**
 * Seed Script: "Lesson 17 — HTML Entities — Displaying Reserved Characters in HTML"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson17.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson17.ts
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
    // ── Hero image ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*icBeusuSlbgUomtiQv89uw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — When HTML Gets Confused 🤔" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine writing an HTML tutorial where you want to show readers the exact code snippet <code>&lt;h1&gt;Hello World&lt;/h1&gt;</code>. If you write <code>&lt;p&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/p&gt;</code>, the browser renders a large heading instead of displaying your code!</p><p>Likewise, if you write mathematical comparison text like <code>5 &lt; 10</code>, the browser might confuse <code>&lt;</code> with the start of an HTML tag.</p>",
    },

    // ── What Are HTML Entities? ──
    { id: nextId(), type: "heading" as const, content: "What Are HTML Entities?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>HTML Entity</strong> is a special piece of code that tells the browser to display a reserved character or symbol as literal text instead of interpreting it as markup syntax.</p><p>Entities can be written in two ways:</p><ul><li><strong>Named Entity:</strong> <code>&amp;lt;</code></li><li><strong>Numeric Entity:</strong> <code>&amp;#60;</code></li></ul><p>Both render as: <code>&lt;</code></p>",
    },

    // ── Why Do We Need HTML Entities? ──
    { id: nextId(), type: "heading" as const, content: "Why Do We Need HTML Entities?" },

    // 1. Reserved Characters
    { id: nextId(), type: "heading" as const, content: "1. Reserved Characters (<, >, &, \", ')" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Because characters like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, and quotes have special meaning in HTML parsing, we escape them using entities:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>5 &lt; 10</p>
<p>10 &gt; 5</p>
<p>Tom &amp; Jerry</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // 2. Displaying HTML Code
    { id: nextId(), type: "heading" as const, content: "2. Displaying Raw HTML Code" },
    {
      id: nextId(),
      type: "code" as const,
      code: `&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;This is a paragraph.&lt;/p&gt;`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // 3. Special Symbols & Currencies
    { id: nextId(), type: "heading" as const, content: "3. Special Symbols and Currencies" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&amp;copy;</code> → &copy; (Copyright)</li><li><code>&amp;reg;</code> → &reg; (Registered Trademark)</li><li><code>&amp;trade;</code> → &trade; (Trademark)</li><li><code>&amp;euro;</code> → &euro; (Euro)</li><li><code>&amp;pound;</code> → &pound; (Pound)</li><li><code>&amp;#8377;</code> → &#8377; (Indian Rupee)</li></ul>",
    },

    // 4. Non-Breaking Space
    { id: nextId(), type: "heading" as const, content: "4. Non-Breaking Space (&nbsp;)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Browsers collapse consecutive whitespace characters into a single space. Using <code>&amp;nbsp;</code> forces the browser to retain exact spacing and prevents unwanted automatic line breaks between connected words:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>HTML&nbsp;&nbsp;&nbsp;is&nbsp;&nbsp;&nbsp;awesome!</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Common Entities Cheat Sheet ──
    { id: nextId(), type: "heading" as const, content: "Common HTML Entities Reference" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ha7NzJ76XZxWqGUoKOEHQQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Named vs Numeric Entities ──
    { id: nextId(), type: "heading" as const, content: "Named Entities vs Numeric Entities" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Named entities</strong> (e.g. <code>&amp;copy;</code>) are intuitive and easy to memorize for common characters. <strong>Numeric entities</strong> (e.g. <code>&amp;#169;</code>) map to Unicode code points and are great for uncommon symbols, math notation, and emojis without named aliases.</p>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Use entities when printing reserved characters:</strong> Especially <code>&amp;lt;</code>, <code>&amp;gt;</code>, and <code>&amp;amp;</code>.</li><li><strong>Prefer named entities:</strong> Much cleaner for humans reading the source code.</li><li><strong>Don't use <code>&amp;nbsp;</code> for page layout:</strong> Always use modern CSS (margin, padding, gap) for structural layout and spacing.</li><li><strong>Always escape code examples in technical blogs and docs.</strong></li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>HTML Entities prevent syntax collision between raw text and HTML tags.</li><li>Reserved characters: <code>&lt;</code> (<code>&amp;lt;</code>), <code>&gt;</code> (<code>&amp;gt;</code>), <code>&amp;</code> (<code>&amp;amp;</code>), <code>\"</code> (<code>&amp;quot;</code>).</li><li>Special symbols include copyright, trademarks, currencies, and non-breaking spaces.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-17-html-entities?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-17-html-entities?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML entities help browsers cleanly distinguish between <strong>HTML syntax</strong> and <strong>ordinary text</strong>. Whether you're publishing programming tutorials, copyright footers, math expressions, or international currency amounts, HTML entities ensure your content displays accurately across all devices and browsers.</p>",
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

    const topic = await db.collection("topics").findOne({ name: "HTML" });
    if (!topic) throw new Error('Topic "HTML" not found. Run seed-html-lesson1.ts first.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "HTML" (id: ${topicId})`);

    const section = await db.collection("sections").findOne({ name: "Getting Started", topic_id: topicId });
    if (!section) throw new Error('Section "Getting Started" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "Getting Started" (id: ${sectionId})`);

    const collectionTitle = "Lesson 17: HTML Entities — Displaying Reserved Characters in HTML";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({ id: collectionId, title: collectionTitle, topics_id: topicId, title_index: null });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 1;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({ id: scId, sectionId, collectionId, topicId, order_no: nextOrder });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({ id: blogId, heading: collectionTitle, content: blocks, collections_id: collectionId });
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

    console.log("🎉 Done! Lesson 17 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
