/**
 * Seed Script: CSS Lesson 19 — "Lesson 19: CSS Grid — For Your Modern Layouts"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson19.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson19.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*-EhlVrF63graRUno3l1oFA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The 2D Layout Engine 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine designing a modern webpage layout with a header at the top, a sidebar on the left, main content beside it, and a footer across the bottom. Or imagine organizing a multi-card gallery spanning neat rows and columns.</p><p>While <strong>Flexbox</strong> excels at 1-dimensional layouts (along a single line or stack), <strong>CSS Grid</strong> is a true <strong>two-dimensional layout system</strong> that simultaneously coordinates both rows and columns. Instead of calculating tricky percentage widths and offsets, you declare the blueprint and the browser positions the pieces into place.</p>",
    },

    // ── Grid Basics ──
    { id: nextId(), type: "heading" as const, content: "1. CSS Grid Basics & Grid Containers 🗄️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Applying <code>display: grid</code> turns an element into a <strong>Grid Container</strong>, while its direct children become <strong>Grid Items</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.grid-container {
  display: grid;
  grid-template-columns: auto auto auto; /* Creates 3 equal/auto columns */
  gap: 10px; /* Consistent row & column gutters */
  background-color: lightgray;
  padding: 10px;
}

.grid-item {
  background-color: steelblue;
  color: white;
  padding: 20px;
  text-align: center;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live CSS Grid Basics Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-grid?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-grid?file=index.html</a></p>',
    },

    // ── Defining Columns and Rows ──
    { id: nextId(), type: "heading" as const, content: "2. Explicitly Defining Columns and Rows 📏" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You have granular control over the size of each column track and row track using <code>grid-template-columns</code> and <code>grid-template-rows</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.grid-container {
  display: grid;
  grid-template-columns: 100px 200px auto; /* Col 1: 100px, Col 2: 200px, Col 3: fills remaining space */
  grid-template-rows: 100px 150px;         /* Row 1: 100px tall, Row 2: 150px tall */
  gap: 10px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*-dpdVtC-ZEDVLol9lIwaDg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Rows & Columns Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-grid-rows-columns?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-grid-rows-columns?file=index.html</a></p>',
    },

    // ── Grid Template Areas ──
    { id: nextId(), type: "heading" as const, content: "3. Blueprint Layouts with grid-template-areas 🗺️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>One of CSS Grid's superpowers is <strong>drawing layouts in text</strong> using named grid areas:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Visual Blueprint Representation */
+-----------------------------+
|           Header            |
+---------+-------------------+
| Sidebar |      Content      |
+---------+-------------------+
|           Footer            |
+-----------------------------+`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.grid-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 150px auto;
  grid-template-rows: 80px auto 60px;
  gap: 10px;
}

/* Map individual children to their named blueprint spot */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Grid Template Areas Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-grid-template-areas?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-grid-template-areas?file=index.html</a></p>',
    },

    // ── Auto-Placement & Gap ──
    { id: nextId(), type: "heading" as const, content: "4. Auto-Placement & Spacing with gap 🔄" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When item coordinates are not explicitly declared, the browser automatically packs elements sequentially across columns and into subsequent rows. Combined with <code>gap</code>, spacing is uniform and requires zero margin calculations.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal fraction columns */
  gap: 20px; /* Applies cleanly between all rows & columns without outer leakage */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Browser Flowchart ──
    { id: nextId(), type: "heading" as const, content: "5. How the Browser Renders CSS Grid ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Browser reads HTML
        ↓
Finds display: grid
        ↓  
Creates Grid Container
        ↓
Identifies Direct Grid Items
        ↓
Calculates Rows and Columns
        ↓
Places Items (Auto or Named Areas)
        ↓
Distributes Gaps & Available Space
        ↓
Renders the 2D Layout`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Flexbox vs CSS Grid ──
    { id: nextId(), type: "heading" as const, content: "6. Flexbox vs. CSS Grid (When to Use Which?) ⚖️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Flexbox and CSS Grid are complementary tools designed to work together:</p><ul><li><strong>Flexbox (1D):</strong> Best for components along a single direction (e.g. Navbars, Button groups, Form fields, Centering a single modal).</li><li><strong>CSS Grid (2D):</strong> Best for multi-directional page scaffolding (e.g. Full page layout blueprints, Dashboard widgets, Card galleries, Photo matrices).</li></ul>",
    },

    // ── Best Practices & Mistakes ──
    { id: nextId(), type: "heading" as const, content: "7. Common Mistakes & Best Practices ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Don't forget <code>display: grid;</code>:</strong> Child template definitions won't activate without declaring the grid container.</li><li><strong>Columns vs Rows:</strong> <code>grid-template-columns</code> defines vertical tracks from left to right, while <code>grid-template-rows</code> defines horizontal tracks from top to bottom.</li><li><strong>Scope of Grid:</strong> Grid applies strictly to direct children. Grandchildren require their own nested <code>display: grid</code> or <code>display: subgrid</code>.</li><li><strong>Combine Flexbox & Grid:</strong> Structure macro layout with Grid, then align internal components with Flexbox.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Grid Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">Applied To</th><th style=\"padding:8px;\">Description</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>display: grid</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Enables 2D grid layout context</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>grid-template-columns</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Defines number and widths of vertical column tracks</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>grid-template-rows</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Defines number and heights of horizontal row tracks</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>gap</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Sets gutter spacing between both rows and columns</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>grid-template-areas</code></td><td style=\"padding:8px;\">Parent Container</td><td style=\"padding:8px;\">Creates visual blueprint using named spatial zones</td></tr><tr><td style=\"padding:8px;\"><code>grid-area</code></td><td style=\"padding:8px;\">Grid Item (Child)</td><td style=\"padding:8px;\">Places child into a designated named grid zone</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 19: CSS Grid — For Your Modern Layouts" (id: 60)
    const collectionTitle = "Lesson 19: CSS Grid — For Your Modern Layouts";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^display grid$/i },
        { title: /^lesson 19/i },
        { id: 60 },
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
        order_no: 3,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 3)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 3).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 19 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
