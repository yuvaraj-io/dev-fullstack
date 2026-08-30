/**
 * Seed Script: CSS Lesson 20 — "Lesson 20: Width and Height in CSS — Defining Element Dimensions 📐"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson20.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson20.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*9DMSaQ5-ESBzba5_ZKC3zQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Controlling Physical Dimensions 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine creating a webpage card that needs to be exactly <strong>300 pixels wide and 150 pixels tall</strong>. Without specifying dimensions, the browser guesses how much space an element requires based on its content and display mode.</p><p>CSS provides precise dimensional control through the <code>width</code> and <code>height</code> properties. Whether you are building cards, hero banners, media containers, or responsive grids, mastering sizing constraints is essential to predictable web design.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic Dimension Declaration */
.box {
  width: 300px;
  height: 150px;
  background-color: lightblue;
  text-align: center;
  line-height: 150px;
  border: 2px solid blue;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live CSS Height & Width Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-height-width?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-height-width?file=index.html</a></p>',
    },

    // ── Sizing Units ──
    { id: nextId(), type: "heading" as const, content: "1. Sizing Units: Absolute vs. Relative 📏" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>CSS allows you to define dimensions using a variety of absolute and relative units depending on your responsive design needs:</p><ul><li><strong><code>px</code> (Pixels):</strong> Fixed physical size on screen (e.g. <code>300px</code>).</li><li><strong><code>%</code> (Percentage):</strong> Relative to the size of the <em>containing parent</em> element.</li><li><strong><code>vw</code> (Viewport Width):</strong> Relative to 1% of the entire browser window width.</li><li><strong><code>vh</code> (Viewport Height):</strong> Relative to 1% of the entire browser window height.</li><li><strong><code>rem</code> / <code>em</code>:</strong> Relative to font sizes for scalable component sizing.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.fixed-box {
  width: 300px; /* Always 300px regardless of screen size */
}

.fluid-box {
  width: 50%; /* Automatically takes half the width of its parent container */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Min / Max Constraints ──
    { id: nextId(), type: "heading" as const, content: "2. Min & Max Constraints (Flexible Boundaries) 🎚️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Setting rigid pixel widths often breaks layouts on mobile screens. <code>min-width</code>, <code>max-width</code>, <code>min-height</code>, and <code>max-height</code> give elements an elastic range to adapt fluidly without shrinking or expanding into oblivion:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.responsive-card {
  width: 80%;       /* Fluidly takes 80% of parent width */
  min-width: 200px; /* Never gets narrower than 200px (e.g. on small phones) */
  max-width: 500px; /* Never stretches wider than 500px (e.g. on ultrawide monitors) */
  height: 150px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live CSS Min & Max Width Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-height-width-min-max?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-height-width-min-max?file=index.html</a></p>',
    },

    // ── Viewport Units ──
    { id: nextId(), type: "heading" as const, content: "3. Fullscreen Sections with Viewport Units (vw / vh) 📱" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When an element's size should correlate directly to the user's browser viewport rather than nested parents, viewport units are ideal:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Perfect for fullscreen landing hero banners and splash screens */
.hero-fullscreen {
  width: 100vw;  /* Occupies 100% of visible viewport width */
  height: 100vh; /* Occupies 100% of visible viewport height */
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Box Sizing Warning ──
    { id: nextId(), type: "heading" as const, content: "4. Box Sizing Alert: Declared vs. Rendered Size 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Remember the CSS Box Model! In default <code>content-box</code> mode, padding and borders are added <em>on top</em> of your declared <code>width</code> and <code>height</code>, causing layout overflows. Always adopt <code>box-sizing: border-box</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Universal box-sizing reset ensures declared width/height includes padding & border */
*, *::before, *::after {
  box-sizing: border-box;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Mistakes and Best Practices ──
    { id: nextId(), type: "heading" as const, content: "5. Common Mistakes & Best Practices ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Hardcoding Fixed Pixel Heights on Text Containers:</strong> If text expands or wraps on smaller screens, a rigid <code>height</code> causes content to overflow and clip. Prefer <code>min-height</code> or let content size naturally.</li><li><strong>Confusing <code>%</code> with <code>vw</code>:</strong> Percentage (<code>%</code>) is relative to the direct parent container, whereas Viewport Width (<code>vw</code>) is relative to the entire browser window.</li><li><strong>Over-constraining Everything:</strong> Avoid setting explicit widths and heights on every single tag; allow block flow and flexbox/grid containers to distribute natural fluid space.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Width & Height Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">Purpose</th><th style=\"padding:8px;\">Best Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>width</code></td><td style=\"padding:8px;\">Sets standard horizontal size</td><td style=\"padding:8px;\">Explicit or percentage widths (e.g. <code>100%</code>, <code>320px</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>height</code></td><td style=\"padding:8px;\">Sets standard vertical size</td><td style=\"padding:8px;\">Fixed media (images/videos) or fixed icons</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>min-width</code> / <code>max-width</code></td><td style=\"padding:8px;\">Sets lower/upper width clamp limits</td><td style=\"padding:8px;\">Responsive cards, reading columns, modals</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>min-height</code> / <code>max-height</code></td><td style=\"padding:8px;\">Sets lower/upper height clamp limits</td><td style=\"padding:8px;\">Hero banners, scrollable modal bodies</td></tr><tr><td style=\"padding:8px;\"><code>100vw</code> / <code>100vh</code></td><td style=\"padding:8px;\">Fills full browser viewport</td><td style=\"padding:8px;\">Landing screen backdrops, full-page dashboards</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 20: Width and Height in CSS — Defining Element Dimensions 📐" (id: 51)
    const collectionTitle = "Lesson 20: Width and Height in CSS — Defining Element Dimensions 📐";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^width and height$/i },
        { title: /^lesson 20/i },
        { id: 51 },
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
        order_no: 4,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 4)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 4).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 20 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
