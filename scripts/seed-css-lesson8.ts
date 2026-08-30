/**
 * Seed Script: CSS Lesson 08 — "Lesson 08: CSS Margin & Padding — Creating Space That Matters 📦"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson8.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson8.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*R04SPZfLwTOWRBj3kA4v8Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Creating Space That Matters 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Have you ever opened a webpage where text collided directly against window borders, buttons touched cards, and paragraphs suffocated without breathing room? Without proper spacing, even beautifully colored websites feel messy, cramped, and amateurish.</p><p><strong>Why do top-tier apps like Stripe, Apple, and GitHub feel so polished?</strong> The secret is intentional whitespace. In CSS, the two fundamental spacing tools are <code>margin</code> and <code>padding</code>.</p>",
    },

    // ── Understanding Space in CSS ──
    { id: nextId(), type: "heading" as const, content: "The Anatomy of Element Space 🗺️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `┌───────────────────────────────────────────────┐
│  MARGIN  (Space OUTSIDE the element border)   │
│  ┌─────────────────────────────────────────┐  │
│  │  BORDER (The visible outline frame)     │  │
│  │  ┌───────────────────────────────────┐  │  │
│  │  │  PADDING (Space INSIDE the box)   │  │  │
│  │  │  ┌─────────────────────────────┐  │  │  │
│  │  │  │  CONTENT (Text, Images, UI) │  │  │  │
│  │  │  └─────────────────────────────┘  │  │  │
│  │  └───────────────────────────────────┘  │  │
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── What is Margin ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is Margin? (Outside Spacing) 🖼️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Margin creates space outside an element.</strong> Think of hanging a picture frame on a wall: The picture frame is your HTML element, and the empty wall surrounding it is its margin. Increasing margin pushes other neighboring elements further away.</p>",
    },

    // ── Margin Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*A4MlhODDFJfIXzSoRCrw8Q.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Margin pushes other elements away */
.card {
  background-color: #38bdf8;
  margin: 20px; /* 20px of clear space around the outside */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── What is Padding ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ What is Padding? (Inside Breathing Room) 🎁" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Padding creates space inside an element.</strong> Imagine placing a delicate watch inside a gift box: The box is your element, the watch is your content, and the soft protective foam surrounding the watch is padding. Padding pushes the box walls away from the text inside.</p>",
    },

    // ── Padding Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ZdBfNWCXp3oSkOONiqOgcg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Padding expands interior space (background extends through padding) */
.card {
  background-color: #38bdf8;
  padding: 20px; /* 20px of breathing room around the text inside */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Margin vs Padding Comparison Graphic ──
    { id: nextId(), type: "heading" as const, content: "Margin vs. Padding: The Golden Comparison ⚖️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*pEflXfzIqZAElGXr5Jo75Q.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Combined Real-World Usage */
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  
  /* OUTSIDE: 24px distance from neighboring cards */
  margin: 24px;
  
  /* INSIDE: 20px comfortable cushion around text */
  padding: 20px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Shorthand Notation ──
    { id: nextId(), type: "heading" as const, content: "Shorthand Clockwise Notation (1, 2, & 4 Values) ⏰" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1 Value: Applies equally to ALL 4 SIDES */
margin: 20px;              /* Top=20, Right=20, Bottom=20, Left=20 */

/* 2 Values: [Top/Bottom]  [Left/Right] */
padding: 12px 24px;        /* Top/Bottom=12px | Left/Right=24px */

/* 3 Values: [Top]  [Left/Right]  [Bottom] */
margin: 10px 20px 30px;    /* Top=10px | Left/Right=20px | Bottom=30px */

/* 4 Values: CLOCKWISE (Top → Right → Bottom → Left) */
/* 12 o'clock (Top), 3 o'clock (Right), 6 o'clock (Bottom), 9 o'clock (Left) */
padding: 10px 15px 20px 25px;`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Individual Side Properties ──
    { id: nextId(), type: "heading" as const, content: "Individual Side Properties 🎯" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Specific Margin declarations */
h2 {
  margin-top: 32px;    /* Extra headroom above heading */
  margin-bottom: 12px; /* Small gap before paragraph */
}

/* Specific Padding declarations */
.sidebar {
  padding-left: 24px;  /* Inset navigation links from left edge */
  padding-right: 16px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Real World UI Use Cases ──
    { id: nextId(), type: "heading" as const, content: "Real-World UI Spacing Use Cases 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1. Pill Action Buttons */
.btn {
  padding: 12px 24px; /* Generous clickable touch area */
  margin-right: 12px; /* Gap before secondary button */
}

/* 2. Hero Section */
.hero {
  padding: 80px 24px; /* Large dramatic vertical cushion */
}

/* 3. Centering Content Boxes horizontally */
.container {
  max-width: 1200px;
  margin: 0 auto;     /* Auto equal left/right margins center the box! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Common Pitfalls & Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices & Common Beginner Pitfalls 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Never use margin for internal padding:</strong> If text touches a card border, increase <code>padding</code>, not margin!</li><li><strong>Stick to a consistent spacing scale:</strong> Use design system increments (e.g., <code>4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px</code>).</li><li><strong>Remember clockwise order:</strong> <code>TRBL</code> (Top, Right, Bottom, Left).</li></ul>",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playground on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Experiment with live margin and padding values here:</p><ul><li><strong>Margin &amp; Padding Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-ardulfm5?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-ardulfm5?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Margin vs Padding Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Margin</th><th style=\"padding:8px;\">Padding</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Space Location</strong></td><td style=\"padding:8px;\">OUTSIDE the element border</td><td style=\"padding:8px;\">INSIDE the element border</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Primary Goal</strong></td><td style=\"padding:8px;\">Separates adjacent elements</td><td style=\"padding:8px;\">Provides content breathing room</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Background Color</strong></td><td style=\"padding:8px;\">Transparent (shows parent background)</td><td style=\"padding:8px;\">Filled with element's background color</td></tr><tr><td style=\"padding:8px;\"><strong>Golden Rule</strong></td><td style=\"padding:8px;\"><em>Margin separates.</em></td><td style=\"padding:8px;\"><em>Padding cushions.</em></td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 08: CSS Margin & Padding — Creating Space That Matters 📦" (id: 43)
    const collectionTitle = "Lesson 08: CSS Margin & Padding — Creating Space That Matters 📦";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^margin & padding/i },
        { title: /^lesson 08/i },
        { id: 43 },
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

    console.log("🎉 Done! CSS Lesson 08 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
