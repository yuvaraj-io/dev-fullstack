/**
 * Seed Script: CSS Lesson 04 — "Lesson 04: CSS Comments — Writing Notes for Yourself and Your Team"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson4.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson4.ts
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
    { id: nextId(), type: "heading" as const, content: "Introduction — Will You Remember This Six Months Later? 🤔" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine finishing a complex webpage layout. Everything looks pixel-perfect today. Six months later, you open that same stylesheet with hundreds of lines of styling rules, colors, responsive queries, and utility classes. You begin wondering:</p><ul><li><em>'Why did I add this negative margin here?'</em></li><li><em>'Which component owns these button classes?'</em></li><li><em>'What breaks if I change this z-index?'</em></li></ul><p>This is where <strong>CSS comments</strong> become indispensable. Comments leave human-readable notes inside code without affecting browser rendering in any way.</p>",
    },

    // ── Six Months Later Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Nct8NIz3_VUspZP5v4qVQg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── What Are CSS Comments ──
    { id: nextId(), type: "heading" as const, content: "What Are CSS Comments? 💬" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A CSS comment is a note written for human developers. Browsers completely ignore comments when parsing stylesheets and building the CSSOM. They do not alter webpage visuals or layout flow.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic CSS Comment Syntax */
/* This is a single-line CSS comment */

/*
  This is a multi-line CSS comment
  spanning multiple lines of notes
*/`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Comments start with <code>/*</code> and end with <code>*/</code>. Everything between those symbols is ignored by the browser parser.</p>",
    },

    // ── Single-Line & Section Usage ──
    { id: nextId(), type: "heading" as const, content: "Single-Line Comments & Section Bookmarks 📌" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ==================================================
   1. HEADER & HERO BANNER
================================================== */
header {
  background-color: #0f172a;
  color: #ffffff;
  padding: 24px;
}

/* Primary heading styling */
h1 {
  font-size: 32px;
  color: #38bdf8;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Multi-Line Comments ──
    { id: nextId(), type: "heading" as const, content: "Multi-Line Documentation Comments 📜" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/*
  Component: Primary Action Button
  Usage: Main call-to-action buttons across landing pages
  Accessibility: Must maintain WCAG AA contrast ratio
*/
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Why Developers Use Comments (4 Core Use Cases) ──
    { id: nextId(), type: "heading" as const, content: "4 Core Reasons to Use CSS Comments 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Architectural Organization:</strong> Dividing large stylesheets into clear sections (Reset, Typography, Layout, Components, Footer).</li><li><strong>Documenting Non-Obvious Decisions:</strong> Explaining <em>why</em> a workaround or specific z-index is required.</li><li><strong>Temporary Debugging & Code Disabling:</strong> Commenting out specific CSS properties during troubleshooting instead of deleting them.</li><li><strong>Team Collaboration:</strong> Helping teammates understand design tokens and utility rules quickly.</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Temporary Debugging: Disabling border-radius to test square style */
button {
  background-color: #16a34a;
  color: white;
  /* border-radius: 8px; */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── How Browsers Read Comments ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Parse Comments ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Browser reads CSS stream
        ↓
Detects opening /* marker
        ↓
Skips all characters until closing */ marker
        ↓
Resumes parsing rules for CSSOM generation`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Comment Best Practices: Explain WHY, Not WHAT 🧠" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ BAD: Stating the obvious (what) */
/* Color blue */
color: #2563eb;

/* ✅ GOOD: Explaining the rationale (why) */
/* Matches primary brand blue used across design system */
color: #2563eb;

/* ❌ BAD: Cluttering code with unmaintained dead styles */
/* p { font-size: 14px; margin: 2px; } */

/* ✅ GOOD: Section signposting */
/* ==================== FOOTER WIDGETS ==================== */`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Security Rule:</strong> Never store passwords, secret keys, or confidential tokens inside CSS comments — anyone can view source in dev tools!</li><li><strong>Keep Comments Fresh:</strong> Update or remove comments when code is refactored. Outdated comments create confusing technical debt.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Comments Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Aspect</th><th style=\"padding:8px;\">Syntax / Guideline</th><th style=\"padding:8px;\">Purpose</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Syntax</strong></td><td style=\"padding:8px;\"><code>/* note */</code></td><td style=\"padding:8px;\">Opening <code>/*</code> and closing <code>*/</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Browser Impact</strong></td><td style=\"padding:8px;\">100% Ignored</td><td style=\"padding:8px;\">Zero effect on layout, colors, or page paint</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Audience</strong></td><td style=\"padding:8px;\">Humans (You & Your Team)</td><td style=\"padding:8px;\">Explains context, rationale, and organization</td></tr><tr><td style=\"padding:8px;\"><strong>Golden Rule</strong></td><td style=\"padding:8px;\">Explain <em>why</em>, not <em>what</em></td><td style=\"padding:8px;\">Focus on intent, design system choices & edge cases</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 04: CSS Comments — Writing Notes for Yourself and Your Team" (id: 39)
    const collectionTitle = "Lesson 04: CSS Comments — Writing Notes for Yourself and Your Team";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^comments/i },
        { title: /^lesson 04/i },
        { id: 39 },
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

    console.log("🎉 Done! CSS Lesson 04 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
