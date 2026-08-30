/**
 * Seed Script: CSS Lesson 16 — "Lesson 16: CSS Position Properties — Controlling Where Elements Appear"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson16.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson16.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*KgCbgv9sDw-vvLpD14EnVQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Mastering Layout Placement 📍" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Have you ever wondered how sticky navigation bars stay pinned while scrolling, how floating chat widgets stay in the corner, or how notification badges sit squarely on top of an avatar icon? The secret is <strong>CSS Positioning</strong>.</p><p>By default, elements follow the standard vertical/horizontal document flow. The <code>position</code> property lets you break out of this flow with surgical precision.</p>",
    },

    // ── Normal Document Flow ──
    { id: nextId(), type: "heading" as const, content: "1. Normal Document Flow vs Positioned Elements 🌊" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard Document Flow: Elements stack one after another in HTML order */
<h1>Header</h1>
<p>First paragraph (occupies full width block space)</p>
<p>Second paragraph (appears below the first)</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 5 Position Values ──
    { id: nextId(), type: "heading" as const, content: "2. The 5 Core CSS Position Values 🛠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `position: static;   /* 1. Default normal flow, offsets (top/left) IGNORED */
position: relative; /* 2. In normal flow, moved visually relative to original spot */
position: absolute; /* 3. Removed from flow, positioned relative to nearest positioned ancestor */
position: fixed;    /* 4. Removed from flow, pinned relative to the viewport window */
position: sticky;   /* 5. Hybrid: scrolls normally then sticks when threshold is hit */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 1. Static ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Static Position (Default) 🧱" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>position: static</code> is the default for every element. Offsets like <code>top</code>, <code>right</code>, <code>bottom</code>, and <code>left</code> have <strong>no effect</strong> on static elements.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.box {
  position: static; /* Default */
  top: 50px;        /* ❌ Does nothing! Static elements ignore offset properties */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Static Position Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-static-position?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-static-position?file=index.html</a></p>',
    },

    // ── 2. Relative ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Relative Position — Nudging from its Natural Spot 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>position: relative</code> keeps the element in the document flow (reserving its original layout space), but allows visual shifting via offset properties:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `.box {
  position: relative;
  top: 20px;  /* Nudges 20px down from its original location */
  left: 30px; /* Nudges 30px right from its original location */
  /* Note: Surrounding sibling elements still treat it as being in its original spot! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Relative Position Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-relative-position?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-relative-position?file=index.html</a></p>',
    },

    // ── 3. Absolute ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Absolute Position — Anchored to a Parent 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>position: absolute</code> removes the element entirely from the document flow and positions it relative to its <strong>nearest positioned ancestor</strong> (an ancestor with <code>position: relative</code>, <code>absolute</code>, or <code>fixed</code>).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard Badge Pattern: Parent is relative, child is absolute */
.card-container {
  position: relative; /* 📌 Creates the positioning coordinate boundary */
  width: 300px;
  height: 200px;
}

.notification-badge {
  position: absolute;
  top: 10px;          /* 10px from parent container's top */
  right: 10px;        /* 10px from parent container's right */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Absolute Position Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-absolute-position?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-absolute-position?file=index.html</a></p>',
    },

    // ── 4. Fixed ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Fixed Position — Pinned to the Viewport 📌" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>position: fixed</code> removes the element from the document flow and anchors it directly to the <strong>browser viewport</strong>. It never moves when the user scrolls.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Floating WhatsApp / Chat widget */
.chat-widget-button {
  position: fixed;
  bottom: 24px;       /* Stays pinned 24px from screen bottom */
  right: 24px;        /* Stays pinned 24px from screen right */
  z-index: 9999;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Fixed Position Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-fixed-position?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-fixed-position?file=index.html</a></p>',
    },

    // ── 5. Sticky ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Sticky Position — Scrolling then Locking 🧲" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>position: sticky</code> acts like <code>relative</code> until the user scrolls past a defined threshold (e.g. <code>top: 0</code>), at which point it locks in place like <code>fixed</code> within its parent container.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Sticky Navigation Header */
header.main-navbar {
  position: sticky;
  top: 0;             /* Locks to top of screen once scrolled to */
  z-index: 100;
  background-color: #ffffff;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Sticky Position Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-sticky-position?file=package.json%2Cindex.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-sticky-position?file=package.json,index.html</a></p>',
    },

    // ── Comparison Diagram ──
    { id: nextId(), type: "heading" as const, content: "Position Types Comparison Diagram 📊" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*p3Zp_MfzdSk_T7xXKbfY5w.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*rgb4plDBDjxdOGBFX1YlKg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Positioning Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Position</th><th style=\"padding:8px;\">In Normal Flow?</th><th style=\"padding:8px;\">Reference Point</th><th style=\"padding:8px;\">Common Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>static</code></td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">None (offsets ignored)</td><td style=\"padding:8px;\">Default page content</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>relative</code></td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Its own original location</td><td style=\"padding:8px;\">Fine-tuning offsets, parent anchor for <code>absolute</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>absolute</code></td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">Nearest positioned ancestor</td><td style=\"padding:8px;\">Badges, modal overlays, dropdown menus, tooltips</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>fixed</code></td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">Browser viewport</td><td style=\"padding:8px;\">Floating buttons, cookie alerts, top global announcements</td></tr><tr><td style=\"padding:8px;\"><code>sticky</code></td><td style=\"padding:8px;\">Hybrid</td><td style=\"padding:8px;\">Flow until threshold, then viewport</td><td style=\"padding:8px;\">Sticky headers, category sub-menus, table column headers</td></tr></tbody></table>",
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

    // 2. Find section "Selectors & CSS Logic" (id: 13) for CSS
    const section = await db.collection("sections").findOne({
      name: /^selectors/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Selectors & CSS Logic" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 16: CSS Position Properties — Controlling Where Elements Appear" (id: 53)
    const collectionTitle = "Lesson 16: CSS Position Properties — Controlling Where Elements Appear";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^position properties/i },
        { title: /^lesson 16/i },
        { id: 53 },
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
        order_no: 6,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 6)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 6).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 16 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
