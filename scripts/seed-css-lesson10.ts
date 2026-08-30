/**
 * Seed Script: CSS Lesson 10 — "Lesson 10: Understanding the CSS Box Model & Box Sizing"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson10.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson10.ts
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
    { id: nextId(), type: "heading" as const, content: "Introduction — Why Is My 200px Box Suddenly 250px Wide? 🤔" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*pvMtDIh1kHoTtdzi_erGvw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You write <code>width: 200px; padding: 20px; border: 5px solid black;</code>. You expect a 200px box. But when you inspect the browser dev tools, the element is unexpectedly <strong>250px wide</strong>! Where did those extra 50 pixels come from?</p><p>The answer lies in the <strong>CSS Box Model</strong> and how <code>box-sizing</code> computes element geometry.</p>",
    },

    // ── Every Element is a Box ──
    { id: nextId(), type: "heading" as const, content: "1. Every HTML Element is a Rectangular Box 📦" },
    {
      id: nextId(),
      type: "code" as const,
      code: `┌─────────────────────────────────────────────────────────────┐
│                           MARGIN                            │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                       BORDER                        │   │
│   │   ┌─────────────────────────────────────────────┐   │   │
│   │   │                   PADDING                   │   │   │
│   │   │   ┌─────────────────────────────────────┐   │   │   │
│   │   │   │               CONTENT               │   │   │   │
│   │   │   │       (Text, Images, Video, UI)     │   │   │   │
│   │   │   └─────────────────────────────────────┘   │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Understanding Each Layer ──
    { id: nextId(), type: "heading" as const, content: "2. The 4 Layers of the Box Model 🗺️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Content:</strong> The raw text, icon, or media payload inside the element.</li><li><strong>Padding:</strong> Space <em>inside</em> the boundary, between content and border (element background expands through padding).</li><li><strong>Border:</strong> The visible outline frame wrapping content + padding.</li><li><strong>Margin:</strong> Transparent clear space <em>outside</em> the border pushing sibling elements away.</li></ol><p><em>Note: While outlines visually encircle elements, they sit on an overlay layer and are <strong>not</strong> part of the Box Model calculations.</em></p>",
    },

    // ── Interactive StackBlitz 1 (Box Model) ──
    { id: nextId(), type: "heading" as const, content: "Interactive Box Model Playground ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Inspect live content, padding, border, and margin calculations:</p><ul><li><strong>Box Model Interactive Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-box-model?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-box-model?file=index.html</a></li></ul>',
    },

    // ── How Browsers Calculate Width (The 250px Mystery) ──
    { id: nextId(), type: "heading" as const, content: "3. How Default Width is Calculated (The 250px Mystery) 🧮" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Under default browser box-sizing (content-box) */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}

/* Mathematical Calculation:
   Content Width:  200px
 + Left Padding:    20px
 + Right Padding:   20px
 + Left Border:      5px
 + Right Border:     5px
 =========================
   TOTAL WIDTH:    250px */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Introducing Box-Sizing ──
    { id: nextId(), type: "heading" as const, content: "4. Introducing the box-sizing Property ⚙️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>CSS provides <code>box-sizing</code> to give developers full control over whether padding and borders expand the box outward or stay contained inside the declared dimensions.</p>",
    },

    // ── Content-Box vs Border-Box Diagram ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*yqG9kU-Zu-efflPBfBi78g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Border-Box: The Modern Standard ──
    { id: nextId(), type: "heading" as const, content: "5. box-sizing: border-box (The Modern Standard) 🏆" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* With border-box: The box STAYS exactly 200px wide! */
.box-predictable {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}

/* Calculation:
   Total Outer Width = 200px (Fixed)
   Content auto-shrinks to: 200 - 40(padding) - 10(border) = 150px */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Global Reset Snippet ──
    { id: nextId(), type: "heading" as const, content: "6. The Universal Global Reset (Used by Tailwind & Bootstrap) 🌐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Universal Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Every element, pseudo-element, and container now follows
   predictable width/height rules across your entire app! */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Interactive StackBlitz 2 (Box Sizing) ──
    { id: nextId(), type: "heading" as const, content: "Interactive Box-Sizing Comparison Playground ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Compare <code>content-box</code> side-by-side with <code>border-box</code>:</p><ul><li><strong>Box Sizing Interactive Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-box-sizing?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-box-sizing?file=index.html</a></li></ul>',
    },

    // ── Real World UI Layouts ──
    { id: nextId(), type: "heading" as const, content: "7. Why Box-Sizing Prevents Responsive Layout Breakage 📱" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 2-Column Grid Layout: 50% + 50% = 100% */
.column {
  box-sizing: border-box;
  width: 50%;
  padding: 24px;
  border: 1px solid #cbd5e1;
  float: left;
}

/* ✅ With border-box: 50% + 50% stays 100% (No wrapping or broken rows!)
   ❌ With content-box: 50% + 48px padding exceeds 100%, breaking column 2 onto a new row! */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: content-box vs border-box Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\"><code>box-sizing: content-box;</code></th><th style=\"padding:8px;\"><code>box-sizing: border-box;</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Status</strong></td><td style=\"padding:8px;\">Browser Default</td><td style=\"padding:8px;\">Industry Standard (Recommended)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Declared <code>width</code> applies to:</strong></td><td style=\"padding:8px;\">Content area ONLY</td><td style=\"padding:8px;\">Content + Padding + Border (Full box)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Adding <code>padding</code>:</strong></td><td style=\"padding:8px;\">EXPANDS the total visible element size</td><td style=\"padding:8px;\">Preserves total size (shrinks inner content)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Adding <code>border</code>:</strong></td><td style=\"padding:8px;\">EXPANDS the total visible element size</td><td style=\"padding:8px;\">Preserves total size (fits inside box)</td></tr><tr><td style=\"padding:8px;\"><strong>Formula</strong></td><td style=\"padding:8px;\"><code>Total = width + padding + border</code></td><td style=\"padding:8px;\"><code>Total = width</code></td></tr></tbody></table>",
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

    // 2. Find section "Box Model" (id: 12) for CSS
    const section = await db.collection("sections").findOne({
      name: /^box model$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Box Model" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 10: Understanding the CSS Box Model & Box Sizing" (id: 45)
    const collectionTitle = "Lesson 10: Understanding the CSS Box Model & Box Sizing";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^box model/i },
        { title: /^lesson 10/i },
        { id: 45 },
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

    console.log("🎉 Done! CSS Lesson 10 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
