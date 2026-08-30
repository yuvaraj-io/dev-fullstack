/**
 * Seed Script: CSS Lesson 21 — "Lesson 21: CSS Sizing Units — Absolute vs Relative 📏"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson21.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson21.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*WioDjcsUos4fepgb3ns9Fw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Absolute vs. Relative Dimensions 📏" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you declare width, height, font size, margins, or padding in CSS, the unit you choose determines whether your elements remain rigid and fixed, or adapt fluidly across devices.</p><p>CSS sizing units fall into two main camps: <strong>Absolute units</strong> (fixed, predictable measurements) and <strong>Relative units</strong> (measurements calculated relative to parent containers, root font sizes, or the browser viewport).</p>",
    },

    // ── Absolute Units ──
    { id: nextId(), type: "heading" as const, content: "1. Absolute Units: Fixed Precision (px) 📌" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The most common absolute unit is <code>px</code> (pixels). <code>1px</code> represents one physical screen dot. Pixels are ideal for fixed borders, small icons, and rigid UI elements.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.box-fixed {
  width: 300px;
  height: 150px;
  background-color: lightcoral;
  text-align: center;
  line-height: 150px;
  color: white;
  font-size: 20px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live CSS Absolute Units Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-absolute-units?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-absolute-units?file=index.html</a></p>',
    },

    // ── Relative Units (%) ──
    { id: nextId(), type: "heading" as const, content: "2. Relative Units: Fluid Sizing (%) 🌊" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Percentage (<code>%</code>) values are calculated relative to the dimensions of the <strong>containing parent element</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Fluid container scaling automatically with parent */
.container {
  width: 80%; /* Takes 80% of whatever parent container it sits inside */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── em vs rem ──
    { id: nextId(), type: "heading" as const, content: "3. Typography & Spacing: em vs. rem 🔤" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Both units scale typography and spacing, but their reference points are completely different:</p><ul><li><strong><code>em</code> (Contextual):</strong> Relative to the font size of the <em>current element or direct parent</em>. (Can compound in nested trees).</li><li><strong><code>rem</code> (Root em):</strong> Relative strictly to the <strong>root <code>&lt;html&gt;</code> element's font size</strong> (defaults to <code>16px</code> in most browsers).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard Root Setup */
html {
  font-size: 16px; /* 1rem = 16px */
}

/* Predictable Design System with rem */
h1 {
  font-size: 2rem; /* 2 × 16px = 32px */
}
p {
  font-size: 1rem; /* 1 × 16px = 16px */
}
button {
  font-size: 1rem;
  padding: 0.75rem 1.5rem; /* 12px vertical, 24px horizontal */
}

/* Contextual Button Scaling with em */
.icon-badge {
  font-size: 14px;
  padding: 0.5em 1em; /* Scales proportionally if badge font-size changes */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Viewport Units (vw / vh) ──
    { id: nextId(), type: "heading" as const, content: "4. Viewport Units (vw & vh) 🖥️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Viewport units calculate dimensions directly against the browser window:</p><ul><li><code>1vw</code> = 1% of the viewport width.</li><li><code>1vh</code> = 1% of the viewport height.</li><li><code>100vh</code> / <code>100vw</code> = 100% of visible screen dimensions.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.hero-banner {
  width: 100vw;
  min-height: 100vh; /* Fills at least 100% of visible screen height */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Choosing the Right Unit ──
    { id: nextId(), type: "heading" as const, content: "5. Decision Guide: Choosing the Right Unit 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Use <code>px</code>:</strong> For fine-grained, fixed measurements like borders, box shadows, and tiny decorative icons.</li><li><strong>Use <code>rem</code>:</strong> For typography, margins, padding, and component heights/widths to ensure accessibility & scalable layouts.</li><li><strong>Use <code>%</code>:</strong> For layout grids and fluid container widths within parents.</li><li><strong>Use <code>em</code>:</strong> For component elements that should scale in tandem with their own local font size.</li><li><strong>Use <code>vw</code> / <code>vh</code>:</strong> For hero banners, modals, and fullscreen landing backdrops.</li></ol>",
    },

    // ── Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "6. Common Beginner Mistakes ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Pixel-Locking Everything:</strong> Hardcoding <code>font-size: 14px</code> on everything breaks accessibility when users change their default browser font size. Prefer <code>rem</code>!</li><li><strong>Unintentional <code>em</code> Compounding:</strong> Nesting multiple tags with <code>font-size: 1.5em</code> multiplies progressively (1.5 × 1.5 × 1.5...), blowing text size out of proportion.</li><li><strong>Assuming <code>%</code> Means Viewport:</strong> Percentage width is calculated from the parent element, NOT the browser screen.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Sizing Units Matrix" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Unit</th><th style=\"padding:8px;\">Type</th><th style=\"padding:8px;\">Relative To</th><th style=\"padding:8px;\">Best For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>px</code></td><td style=\"padding:8px;\">Absolute</td><td style=\"padding:8px;\">Physical screen pixel</td><td style=\"padding:8px;\">Borders, shadows, thin lines</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>%</code></td><td style=\"padding:8px;\">Relative</td><td style=\"padding:8px;\">Parent container dimension</td><td style=\"padding:8px;\">Column widths, fluid layouts</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>rem</code></td><td style=\"padding:8px;\">Relative</td><td style=\"padding:8px;\">Root <code>&lt;html&gt;</code> font-size (16px)</td><td style=\"padding:8px;\">Typography, spacing, buttons, padding</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>em</code></td><td style=\"padding:8px;\">Relative</td><td style=\"padding:8px;\">Local element/parent font-size</td><td style=\"padding:8px;\">Component-level proportional scaling</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>vw</code></td><td style=\"padding:8px;\">Relative</td><td style=\"padding:8px;\">1% of Viewport Width</td><td style=\"padding:8px;\">Full-bleed widths, responsive headings</td></tr><tr><td style=\"padding:8px;\"><code>vh</code></td><td style=\"padding:8px;\">Relative</td><td style=\"padding:8px;\">1% of Viewport Height</td><td style=\"padding:8px;\">Fullscreen hero sections, sticky panels</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 21: CSS Sizing Units — Absolute vs Relative 📏" (id: 52)
    const collectionTitle = "Lesson 21: CSS Sizing Units — Absolute vs Relative 📏";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^sizing units$/i },
        { title: /^lesson 21/i },
        { id: 52 },
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
        order_no: 5,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 5)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 5).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 21 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
