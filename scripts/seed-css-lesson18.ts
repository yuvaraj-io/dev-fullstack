/**
 * Seed Script: CSS Lesson 18 — "Lesson 18: CSS Flexbox — Building Modern Layouts with Ease"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson18.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson18.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*Nxw_d_leiisXFfU_9z6K4g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Layout Revolution 🚀" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine building a navigation bar with a logo on the left and menu links on the right, or 3 pricing cards of identical height with equal spacing, or centering a login modal squarely in the middle of the screen.</p><p>Before <strong>Flexible Box Layout (Flexbox)</strong>, developers hacked layouts together using floats, clearfix hacks, inline-block whitespace tricks, and table displays. Flexbox changed everything by providing a declarative, one-dimensional layout system where the browser handles the complex spatial mathematics automatically.</p>",
    },

    // ── What is Flexbox ──
    { id: nextId(), type: "heading" as const, content: "1. What is Flexbox? (1D Layout Powerhouse) 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Flexbox is a <strong>one-dimensional CSS layout engine</strong> designed to distribute space and align items along a single primary axis (either as a row or a column).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Turning any container into a flex container */
.container {
  display: flex; /* Direct children instantly become flexible items! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Display Flex Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-display-flex?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-display-flex?file=index.html</a></p>',
    },

    // ── Container vs Items ──
    { id: nextId(), type: "heading" as const, content: "2. Flex Container vs. Flex Items 👨‍👧‍👦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Flex Container:</strong> The parent element where <code>display: flex</code> is declared.</li><li><strong>Flex Items:</strong> The <em>direct children</em> of that flex container. (Deeps nested grandchildren do not automatically inherit flex item mechanics).</li></ul>",
    },

    // ── Main Axis vs Cross Axis ──
    { id: nextId(), type: "heading" as const, content: "3. The Two Axes: Main Axis vs. Cross Axis 🧭" },
    {
      id: nextId(),
      type: "code" as const,
      code: `When flex-direction: row (DEFAULT):
  Main Axis  ───→  Horizontal (Left to Right)  ──> Controlled by: justify-content
  Cross Axis ───↓  Vertical   (Top to Bottom)  ──> Controlled by: align-items

When flex-direction: column:
  Main Axis  ───↓  Vertical   (Top to Bottom)  ──> Controlled by: justify-content
  Cross Axis ───→  Horizontal (Left to Right)  ──> Controlled by: align-items`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── justify-content ──
    { id: nextId(), type: "heading" as const, content: "4. justify-content — Main Axis Alignment ↔️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>justify-content</code> controls how remaining space is distributed along the <strong>Main Axis</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.container {
  display: flex;
  justify-content: flex-start;    /* Pack items at beginning (default) */
  justify-content: center;        /* Center items together */
  justify-content: flex-end;      /* Pack items at end */
  justify-content: space-between; /* First item at start, last at end, equal space between */
  justify-content: space-around;  /* Equal space around each item (half-size outer edges) */
  justify-content: space-evenly;  /* Identical space between items AND outer borders */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Justify Content Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-flex-justify-conten?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-flex-justify-conten?file=index.html</a></p>',
    },

    // ── align-items ──
    { id: nextId(), type: "heading" as const, content: "5. align-items — Cross Axis Alignment ↕️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>align-items</code> controls how items align along the perpendicular <strong>Cross Axis</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.container {
  display: flex;
  height: 200px;
  align-items: stretch;    /* Stretch to fill container height (default) */
  align-items: flex-start; /* Align to top of cross axis */
  align-items: center;     /* Vertically center all items! */
  align-items: flex-end;   /* Align to bottom of cross axis */
  align-items: baseline;   /* Align along text baseline */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Align Items Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-flex-align-items?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-flex-align-items?file=index.html</a></p>',
    },

    // ── flex-direction ──
    { id: nextId(), type: "heading" as const, content: "6. flex-direction — Switching the Flow Direction 🔄" },
    {
      id: nextId(),
      type: "code" as const,
      code: `.container {
  display: flex;
  flex-direction: row;            /* Horizontal left-to-right (default) */
  flex-direction: column;         /* Vertical top-to-bottom stack */
  flex-direction: row-reverse;    /* Horizontal right-to-left */
  flex-direction: column-reverse; /* Vertical bottom-to-top stack */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── gap ──
    { id: nextId(), type: "heading" as const, content: "7. The Modern Gap Property (No More Margin Hacks!) ✂️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* BEFORE: Adding margin-right and removing on :last-child */
/* NOW with CSS Flexbox: */
.cards-container {
  display: flex;
  gap: 20px; /* Automatically places 20px gutter strictly BETWEEN items! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── flex shorthand & grow ──
    { id: nextId(), type: "heading" as const, content: "8. The flex Property — Dynamic Sizing & Proportions 🍕" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>flex</code> shorthand controls how flex items grow and shrink to absorb available space:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Equal width columns: */
.card {
  flex: 1; /* Every card receives an equal 1x fraction of container space */
}

/* Sidebar + Content layout: */
.sidebar {
  flex: 1; /* Takes 1 share (25%) */
}
.main-content {
  flex: 3; /* Takes 3 shares (75%) */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Flex Grow Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-flex-grow?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-flex-grow?file=index.html</a></p>',
    },

    // ── Real World Examples ──
    { id: nextId(), type: "heading" as const, content: "9. Real-World Layout Patterns 🌟" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*okIx0d_jwL9JyrHVW_n-7w.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Pattern 1: Responsive Space-Between Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 24px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ifr26WF3purS_nJ2d3_hYw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "heading" as const,
      content: "The Holy Grail: Dead-Center an Element in 3 Lines 🎯",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.hero-fullscreen-center {
  display: flex;
  justify-content: center; /* Horizontally centered along Main Axis */
  align-items: center;     /* Vertically centered along Cross Axis */
  height: 100vh;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Centering Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-flex-center?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-flex-center?file=index.html</a></p>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Flexbox Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">Applied To</th><th style=\"padding:8px;\">Primary Purpose</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>display: flex</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Activates Flexbox layout mode for direct children</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>flex-direction</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Sets Main Axis direction (<code>row</code>, <code>column</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>justify-content</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Aligns items along the Main Axis (<code>center</code>, <code>space-between</code>, etc.)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>align-items</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Aligns items along the Cross Axis (<code>center</code>, <code>stretch</code>, etc.)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>gap</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Defines gutters between items without margins</td></tr><tr><td style=\"padding:8px;\"><code>flex</code> (or <code>flex-grow</code>)</td><td style=\"padding:8px;\">Child Item</td><td style=\"padding:8px;\">Determines how item absorbs available space dynamically</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 18: CSS Flexbox — Building Modern Layouts with Ease" (id: 59)
    const collectionTitle = "Lesson 18: CSS Flexbox — Building Modern Layouts with Ease";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^display flex$/i },
        { title: /^lesson 18/i },
        { id: 59 },
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

    console.log("🎉 Done! CSS Lesson 18 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
