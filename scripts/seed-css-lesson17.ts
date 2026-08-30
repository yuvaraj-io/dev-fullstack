/**
 * Seed Script: CSS Lesson 17 — "Lesson 17: CSS Display Property — Understanding How HTML Elements Behave"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson17.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson17.ts
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
    // ── Introduction Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*78QiAPgr8VyVnUT4A_oYbA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Building Blocks of Layout 🧱" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Have you ever written two <code>&lt;div&gt;</code> elements and wondered why they break onto separate lines, while two <code>&lt;span&gt;</code> tags sit side-by-side on the exact same line?</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Stacked on separate rows -->
<div>First Block</div>
<div>Second Block</div>

<!-- Placed side-by-side on the same row -->
<span>First Inline</span>
<span>Second Inline</span>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This behavior is governed entirely by the CSS <strong><code>display</code></strong> property. Understanding how elements participate in the page layout is the essential foundation before mastering modern layout systems like Flexbox and Grid.</p>",
    },

    // ── What is Display Property ──
    { id: nextId(), type: "heading" as const, content: "1. What is the CSS Display Property? 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>display</code> property specifies the <strong>rendering box type</strong> of an element. It determines whether an element stretches to fill its parent container, shrinks to fit its text, sits beside neighboring tags, or disappears entirely from layout calculation.</p>",
    },

    // ── Block Elements ──
    { id: nextId(), type: "heading" as const, content: "2. Block Elements (Full Width & New Line) 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>block element</strong> always starts on a fresh line and expands horizontally to occupy 100% of its parent's available width.</p><ul><li><strong>Common Block Tags:</strong> <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;-&lt;h6&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>.</li><li><strong>Sizing Rules:</strong> Fully respects <code>width</code>, <code>height</code>, <code>margin</code> (top/bottom/left/right), and <code>padding</code>.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.block-container {
  display: block;
  width: 300px;
  height: 100px;
  padding: 20px;
  margin: 10px auto; /* Centered block */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Display Block Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-display-block?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-display-block?file=index.html</a></p>',
    },

    // ── Inline Elements ──
    { id: nextId(), type: "heading" as const, content: "3. Inline Elements (Flowing with Text) 🧵" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>inline element</strong> does not force a line break. It flows right inside sentences, occupying only the exact width of its content.</p><ul><li><strong>Common Inline Tags:</strong> <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>.</li><li><strong>Sizing Caveat:</strong> Ignores <code>width</code> and <code>height</code>! Top and bottom margins/padding do not push surrounding lines apart.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `span.highlight {
  display: inline;
  background-color: #fef08a;
  /* width: 200px;  ❌ Ignored by inline elements! */
  /* height: 50px;  ❌ Ignored by inline elements! */
  padding: 2px 6px; /* Horizontal padding works nicely */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Display Inline Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-display-inline?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-display-inline?file=index.html</a></p>',
    },

    // ── Inline-Block Elements ──
    { id: nextId(), type: "heading" as const, content: "4. Inline-Block (The Best of Both Worlds) 🤝" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>What if you want elements to sit side-by-side on the same line (like inline), but also need to set custom <code>width</code>, <code>height</code>, and vertical <code>padding</code> (like block)? Use <strong><code>inline-block</code></strong>!</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Perfect for buttons, badges, and card grids */
.action-button {
  display: inline-block;
  width: 140px;
  height: 44px;
  padding: 10px 20px;
  margin-right: 12px; /* Sits next to neighboring buttons without breaking lines! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Display: None vs Visibility: Hidden ──
    { id: nextId(), type: "heading" as const, content: "5. Display: None vs. Visibility: Hidden 👻" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A crucial distinction in CSS layout:</p><ul><li><strong><code>display: none;</code></strong> Completely unmounts the element from layout calculation. It disappears <em>and leaves NO empty space behind</em> (surrounding elements snap together).</li><li><strong><code>visibility: hidden;</code></strong> Makes the element transparent/invisible, <em>but preserves its original layout dimensions and blank space</em>.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1. Element & its space vanish completely */
.completely-hidden {
  display: none;
}

/* 2. Element is invisible, but blank physical space remains */
.invisible-ghost {
  visibility: hidden;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Display None Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-display-none?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-display-none?file=index.html</a></p>',
    },

    // ── Browser Flow & Infographics ──
    { id: nextId(), type: "heading" as const, content: "6. How the Browser Renders Display Types ⚙️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*iO0X7dY_7XIv2Ggji2qXgw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Atvkvbk860n4VeZtqu4R_w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Display Value Matrix" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Display Value</th><th style=\"padding:8px;\">Starts New Line?</th><th style=\"padding:8px;\">Respects Width/Height?</th><th style=\"padding:8px;\">Common Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>block</code></td><td style=\"padding:8px;\">✅ Yes (Full width)</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Sections, Cards, Paragraphs, Headers</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>inline</code></td><td style=\"padding:8px;\">❌ No (Flows with text)</td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">Text spans, hyperlinks, bold/italic text</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>inline-block</code></td><td style=\"padding:8px;\">❌ No (Side-by-side)</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Buttons, Badges, Nav pills, Icon items</td></tr><tr><td style=\"padding:8px;\"><code>none</code></td><td style=\"padding:8px;\">❌ Removed</td><td style=\"padding:8px;\">❌ Removed</td><td style=\"padding:8px;\">Dropdowns, Conditional modals, Collapsible menus</td></tr></tbody></table>",
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

    // 2. Find section "Layout & Sizing" (id: 14) for CSS
    const section = await db.collection("sections").findOne({
      name: /^layout/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Layout & Sizing" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 17: CSS Display Property — Understanding How HTML Elements Behave" (id: 58)
    const collectionTitle = "Lesson 17: CSS Display Property — Understanding How HTML Elements Behave";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^display$/i },
        { title: /^lesson 17/i },
        { id: 58 },
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
        order_no: 1,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 1)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 1).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 17 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
