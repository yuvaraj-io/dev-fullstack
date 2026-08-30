/**
 * Seed Script: CSS Lesson 09 — "Lesson 09: CSS Borders & Outlines — Drawing Boundaries Around Elements"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson9.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson9.ts
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
    { id: nextId(), type: "heading" as const, content: "1. Introduction — A Picture Frame or a Highlight Marker? 🖼️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine hanging a painting on a wall: You put a carved wooden frame around it to define its permanent presence. That's a <strong>CSS Border</strong>. Later, a museum guide points a laser highlight around the artwork without touching or shifting the painting itself. That's a <strong>CSS Outline</strong>.</p><p>Both draw boundaries around HTML elements, but their behavior in the layout engine is completely different. Let's master when to use borders vs. outlines.</p>",
    },

    // ── Intro Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Iuxn3eMxQhs4kShS3-S5Kw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── 2. Understanding Borders ──
    { id: nextId(), type: "heading" as const, content: "2. Understanding Borders & Shorthand 🧱" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>border</strong> is a visible structural boundary wrapping an element's content and padding. It is an official layer of the CSS Box Model and contributes to the element's calculated width and height.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Individual Border Properties */
.card-detailed {
  border-width: 2px;
  border-style: solid;
  border-color: #2563eb;
}

/* Equivalent Shorthand: border: [width] [style] [color] */
.card-shorthand {
  border: 2px solid #2563eb;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 3. Border Styles ──
    { id: nextId(), type: "heading" as const, content: "3. Diverse Border Styles 🎨" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Popular Border Styles */
.solid-box   { border: 2px solid #0f172a; }  /* Continuous solid stroke */
.dashed-box  { border: 2px dashed #64748b; } /* Dash intervals (e.g. dropzones) */
.dotted-box  { border: 2px dotted #94a3b8; } /* Circular dot sequence */
.double-box  { border: 4px double #0f172a; } /* Two parallel lines */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 4. Rounded Corners (border-radius) ──
    { id: nextId(), type: "heading" as const, content: "4. Softening Edges with border-radius 🔘" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Rounded Corner Cards & Buttons */
.card {
  border: 1px solid #e2e8f0;
  border-radius: 12px; /* Smooth rounded corners */
}

/* Perfect Circular Avatars */
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;   /* 50% turns equal width/height boxes into circles */
  border: 3px solid #38bdf8;
  object-fit: cover;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 5. Understanding Outlines ──
    { id: nextId(), type: "heading" as const, content: "5. Understanding Outlines 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>outline</strong> is drawn entirely outside the border. Crucially, <strong>outlines are NOT part of the CSS box model</strong> — they occupy ZERO layout space and will never cause surrounding elements or text to jump or reflow!</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Outline Syntax (Same shorthand as border) */
button:focus-visible {
  /* High contrast focus ring for keyboard navigation */
  outline: 3px solid #2563eb;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 6. Border vs Outline Comparison ──
    { id: nextId(), type: "heading" as const, content: "6. Border vs. Outline: The Critical Comparison ⚖️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*fbR3sGsLBocHXWBd1ZoZCw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Individual Side Control: Only Borders Support This */
.border-sides {
  border-top: 3px solid #2563eb;    /* ✅ Works for borders */
  border-bottom: 1px solid #cbd5e1; /* ✅ Works for borders */
}

/* ❌ Outlines always wrap all 4 sides uniformly:
   outline-top does NOT exist in CSS */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 7. Outline Offset ──
    { id: nextId(), type: "heading" as const, content: "7. Custom Focus Rings with outline-offset 🎯" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Adding breathing room between border and outline */
.action-btn:focus-visible {
  border: 2px solid #0f172a;
  outline: 3px solid #0284c7;
  outline-offset: 4px; /* Creates a clean 4px transparent gap! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 8. Browser Rendering Pipeline ──
    { id: nextId(), type: "heading" as const, content: "8. How the Browser Renders Borders & Outlines ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `DOM Content computed
        ↓
Padding applied inside box
        ↓
Border drawn around padding (contributes to element dimensions)
        ↓
Outline drawn outside border (drawn on overlay layer; zero box impact)
        ↓
Final pixel rasterization`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── 9. Real World UI & Accessibility ──
    { id: nextId(), type: "heading" as const, content: "9. Accessibility & Real-World Use Cases 🌐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ BAD PRACTICE: Removing focus outline without replacement */
button:focus {
  outline: none; /* Destroys accessibility for keyboard users! */
}

/* ✅ GOOD PRACTICE: Custom modern accessible focus ring */
button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playground on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Test live border styles, radius, and outline offset here:</p><ul><li><strong>Borders &amp; Outlines Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-borders-outlines?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-borders-outlines?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Border vs Outline Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Border</th><th style=\"padding:8px;\">Outline</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Box Model</strong></td><td style=\"padding:8px;\">✅ Yes (Affects layout size)</td><td style=\"padding:8px;\">❌ No (Zero layout impact)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Individual Sides</strong></td><td style=\"padding:8px;\">✅ Yes (<code>border-top</code>, etc.)</td><td style=\"padding:8px;\">❌ No (All 4 sides together)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Rounded Corners</strong></td><td style=\"padding:8px;\">✅ Follows <code>border-radius</code></td><td style=\"padding:8px;\">⚠️ May not follow radius on older engines</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Offset Gap</strong></td><td style=\"padding:8px;\">❌ No offset property</td><td style=\"padding:8px;\">✅ Yes (<code>outline-offset</code>)</td></tr><tr><td style=\"padding:8px;\"><strong>Primary Role</strong></td><td style=\"padding:8px;\">Permanent visual component design</td><td style=\"padding:8px;\">Keyboard focus & accessibility states</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 09: CSS Borders & Outlines — Drawing Boundaries Around Elements" (id: 44)
    const collectionTitle = "Lesson 09: CSS Borders & Outlines — Drawing Boundaries Around Elements";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^borders & outlines/i },
        { title: /^lesson 09/i },
        { id: 44 },
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

    console.log("🎉 Done! CSS Lesson 09 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
