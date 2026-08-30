/**
 * Seed Script: CSS Lesson 02 — "Lesson 02: Understanding CSS Syntax — How Browsers Read CSS"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson2.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson2.ts
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
    { id: nextId(), type: "heading" as const, content: "Introduction — Giving Instructions to the Browser 🎨" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you write CSS, you are giving <strong>explicit instructions to the browser</strong>. The browser doesn't guess your styling intentions. Every CSS rule must answer three fundamental questions:</p><ol><li><strong>Which element should change?</strong> (Selector)</li><li><strong>What aspect should change?</strong> (Property)</li><li><strong>What value should be applied?</strong> (Value)</li></ol><p>Before learning dozens of properties, mastering this syntax structure makes reading, writing, and debugging CSS completely natural.</p>",
    },

    // ── Three Parts Diagram Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*mhCowtFs-uOkP2iLfdqH5w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── The Three Parts of a CSS Rule ──
    { id: nextId(), type: "heading" as const, content: "The Three Core Parts: Selector → Property → Value 📐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic CSS Rule Example */
h1 {
  color: blue;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>1. Selector (<code>h1</code>):</strong> Targets the specific HTML elements to receive the styling (e.g., <code>&lt;h1&gt;Welcome to CSS&lt;/h1&gt;</code>).</li><li><strong>2. Property (<code>color</code>):</strong> Asks <em>'What do you want to change?'</em> (text color, font size, background, margin).</li><li><strong>3. Value (<code>blue</code>):</strong> Specifies <em>'What should it become?'</em> (e.g., <code>blue</code>, <code>24px</code>, <code>#10b981</code>).</li></ul>",
    },

    // ── Declaration Block & Braces ──
    { id: nextId(), type: "heading" as const, content: "Understanding the Declaration Block & Braces 📦" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Curly braces { } enclose the declaration block */
h1 {
  color: blue;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The opening <code>{</code> and closing <code>}</code> curly braces form a <strong>declaration block</strong>. Everything written inside these braces belongs strictly to the targeted selector.</p>",
    },

    // ── What is a Declaration (Anatomy) ──
    { id: nextId(), type: "heading" as const, content: "Anatomy of a Declaration 🔬" },
    {
      id: nextId(),
      type: "code" as const,
      code: `color : blue ;
  │      │    │
  │      │    └── Semicolon (Ends declaration)
  │      └─────── Value (Setting applied)
  └────────────── Property (Aspect being styled)
      └────────── Colon (Separates property from value)`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Colon (<code>:</code>):</strong> Separates the property name from its assigned value.</li><li><strong>Semicolon (<code>;</code>):</strong> Acts like a period at the end of a sentence. It explicitly terminates the instruction so the browser can parse the next rule.</li></ul>",
    },

    // ── Multiple Declarations ──
    { id: nextId(), type: "heading" as const, content: "Multiple Declarations inside One Rule 📝" },
    {
      id: nextId(),
      type: "code" as const,
      code: `button {
  background-color: #16a34a;
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A single declaration block can contain multiple declarations. The browser executes each instruction sequentially for the selected element, modifying background, text color, padding, borders, and typography together.</p>",
    },

    // ── How Browsers Read CSS Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*tUD2BlhXoZoKsz7D5W0tuw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Step-by-Step Browser Pipeline ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Parse & Render CSS ⚙️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Step 1 (HTML Parsing):</strong> The browser reads HTML and constructs the DOM (Document Object Model) tree.</li><li><strong>Step 2 (CSS Parsing):</strong> The browser scans CSS stylesheets, matches selectors to DOM nodes, and builds the CSSOM (CSS Object Model).</li><li><strong>Step 3 (Render Tree & Paint):</strong> The browser merges DOM + CSSOM, calculates geometry/layout positions, and paints the final styled pixels onto your screen.</li></ol>",
    },

    // ── Common Beginner Mistakes ──
    { id: nextId(), type: "heading" as const, content: "5 Common Beginner Syntax Mistakes ⚠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ 1. Missing Colon */
color blue;        /* WRONG */
color: blue;       /* ✅ CORRECT */

/* ❌ 2. Missing Semicolon */
h1 {
  color: blue      /* WRONG: Next line fails */
  font-size: 20px;
}

/* ❌ 3. Missing Curly Braces */
h1
  color: blue;     /* WRONG */

/* ❌ 4. Typo in Property Name */
text-colour: blue; /* WRONG (use text-color or color) */
color: blue;       /* ✅ CORRECT */

/* ❌ 5. Invalid Property Value */
color: twenty;     /* WRONG */
color: #1e293b;    /* ✅ CORRECT */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Styling Best Practices for Clean Code 🌟" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Consistent Indentation:</strong> Indent declarations inside curly braces (typically 2 or 4 spaces) for effortless visual hierarchy.</li><li><strong>One Declaration Per Line:</strong> Avoid cramming entire rules onto a single line. Vertical formatting makes diffs in Git readable and easy to scan.</li><li><strong>Consistent Lowercase:</strong> Use standard lowercase for property names and values (e.g. <code>background-color: white;</code>).</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Syntax Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Syntax Term</th><th style=\"padding:8px;\">Example</th><th style=\"padding:8px;\">Description</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Selector</strong></td><td style=\"padding:8px;\"><code>h1</code>, <code>.card</code>, <code>#btn</code></td><td style=\"padding:8px;\">Points to the target HTML element(s)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Property</strong></td><td style=\"padding:8px;\"><code>color</code>, <code>font-size</code></td><td style=\"padding:8px;\">The styling aspect being modified</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Value</strong></td><td style=\"padding:8px;\"><code>blue</code>, <code>18px</code>, <code>bold</code></td><td style=\"padding:8px;\">The setting applied to the property</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Declaration</strong></td><td style=\"padding:8px;\"><code>color: blue;</code></td><td style=\"padding:8px;\">Property + Value + Semicolon combined</td></tr><tr><td style=\"padding:8px;\"><strong>Declaration Block</strong></td><td style=\"padding:8px;\"><code>{ color: blue; font-size: 16px; }</code></td><td style=\"padding:8px;\">All declarations enclosed by curly braces</td></tr></tbody></table>",
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

    // 1. Find topic "css" (id: 8)
    const topic = await db.collection("topics").findOne({ name: /^css$/i });
    if (!topic) throw new Error('Topic "css" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Fundamentals" (id: 10) for CSS
    const section = await db.collection("sections").findOne({
      name: /^fundamentals$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Fundamentals" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 02: Understanding CSS Syntax — How Browsers Read CSS" (id: 37)
    const collectionTitle = "Lesson 02: Understanding CSS Syntax — How Browsers Read CSS";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^syntax/i },
        { title: /^lesson 02/i },
        { id: 37 },
      ],
    });

    let collectionId: number;
    if (collection) {
      collectionId = collection.id;
      await db.collection("collections").updateOne(
        { id: collectionId },
        { $set: { title: collectionTitle, topics_id: topicId } }
      );
      console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);
    } else {
      collectionId = await getNextSequence(client, "collections");
      await db.collection("collections").insertOne({
        id: collectionId,
        title: collectionTitle,
        topics_id: topicId,
        title_index: null,
      });
      console.log(`✅ Created new collection "${collectionTitle}" (id: ${collectionId})`);
    }

    // 4. Link section_collections if needed
    let sc = await db.collection("section_collections").findOne({
      collectionId,
      topicId,
    });
    let scId = sc ? sc.id : 0;
    if (!sc) {
      scId = await getNextSequence(client, "section_collections");
      await db.collection("section_collections").insertOne({
        id: scId,
        sectionId,
        collectionId,
        topicId,
        order_no: 2,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 2)`);
    } else {
      console.log(`✅ Section-collection link exists (id: ${sc.id}, order: ${sc.order_no})`);
      scId = sc.id;
    }

    // 5. Update or Create Blog
    const blocks = buildBlogBlocks();
    let blog = await db.collection("blogs").findOne({ collections_id: collectionId });
    let blogId: number;

    if (blog) {
      blogId = blog.id;
      await db.collection("blogs").updateOne(
        { id: blogId },
        {
          $set: {
            heading: collectionTitle,
            content: blocks,
          },
        }
      );
      console.log(`✅ Updated existing blog with ${blocks.length} blocks (id: ${blogId})\n`);
    } else {
      blogId = await getNextSequence(client, "blogs");
      await db.collection("blogs").insertOne({
        id: blogId,
        heading: collectionTitle,
        content: blocks,
        collections_id: collectionId,
      });
      console.log(`✅ Created new blog with ${blocks.length} blocks (id: ${blogId})\n`);
    }

    console.log("┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Section-Collection ID: ${String(scId).padEnd(16)} │`);
    console.log(`│  Blog ID:               ${String(blogId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 2).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 02 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
