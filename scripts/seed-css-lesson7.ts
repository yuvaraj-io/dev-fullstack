/**
 * Seed Script: CSS Lesson 07 — "Lesson 07: CSS Gradients — Blending Colors Beautifully"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson7.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson7.ts
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
    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*PKiltCf-H5IUZ7f37zQfSw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Blending Colors Beautifully 🌅" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you gaze at a sunrise or sunset, the sky isn't a single flat tone. Vivid oranges melt smoothly into soft magenta, deep violet, and midnight blues. In modern web design, these color transitions are called <strong>gradients</strong>.</p><p>CSS creates mathematical color gradients natively in the browser without requiring external raster images. They are ultra-lightweight, razor-sharp on high-DPI displays, and infinitely scalable!</p>",
    },

    // ── What is a CSS Gradient ──
    { id: nextId(), type: "heading" as const, content: "What is a CSS Gradient? 🌈" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Flat Color vs CSS Gradient */
.flat-box {
  background-color: #2563eb; /* Single solid blue */
}

.gradient-box {
  /* Smooth mathematical transition from indigo to sky blue */
  background: linear-gradient(to right, #4f46e5, #06b6d4);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Linear Gradients ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Linear Gradients: Direction & Angles 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>linear gradient</strong> transitions colors along a straight directional line. You can control the direction using keyword positions (<code>to right</code>, <code>to bottom</code>, <code>to top right</code>) or precise rotational angles (<code>45deg</code>, <code>135deg</code>).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Directional Keywords */
.to-right   { background: linear-gradient(to right, #ef4444, #3b82f6); }
.to-bottom  { background: linear-gradient(to bottom, #10b981, #6366f1); }
.diagonal   { background: linear-gradient(to top right, #f59e0b, #ec4899); }

/* Exact Angles */
.angle-45   { background: linear-gradient(45deg, #8b5cf6, #ec4899); }
.angle-90   { background: linear-gradient(90deg, #3b82f6, #10b981); } /* Same as 'to right' */
.angle-180  { background: linear-gradient(180deg, #1e293b, #0f172a); } /* Same as 'to bottom' */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── How Browsers Paint Linear Gradients ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Compute Linear Gradients ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `CSS Rule Parsed
      ↓
Vector line angle established across element box
      ↓
Start color anchor fixed at starting boundary
      ↓
Browser calculates intermediate interpolated color spectrum
      ↓
End color anchor fixed at ending boundary
      ↓
GPU paints pixel buffer to screen (Auto-recomputed upon resize!)`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Radial Gradients ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Radial Gradients: Center-Outward Radiance 💫" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Unlike linear gradients that travel in a straight path, a <strong>radial gradient</strong> radiates outward from a central origin point, creating circular or elliptical light blooms and spotlight backdrops.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic Circular Radial Gradient */
.spotlight {
  background: radial-gradient(circle, #fde047, #16a34a);
}

/* Multi-step Glowing Neon Orb */
.neon-glow {
  background: radial-gradient(circle, #fef08a, #f97316, #dc2626);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Radial Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ZzpGbuPdhKkFGgGGR550vA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Gradient Stops ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Precise Control with Color Stops (Percentages) 🎯" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Setting Custom Stop Positions along the gradient line */
.timeline-gradient {
  background: linear-gradient(
    to right,
    #ef4444 20%,  /* Solid red from 0% to 20% */
    #eab308 50%,  /* Transitions to yellow at 50% midpoint */
    #22c55e 80%   /* Transitions to green at 80% mark */
  );
}

/* Brand Trio Stop */
.brand-trio {
  background: linear-gradient(
    to right,
    #9333ea 0%,
    #2563eb 50%,
    #06b6d4 100%
  );
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Real World UI Use Cases ──
    { id: nextId(), type: "heading" as const, content: "Real-World UI Use Cases for Gradients 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1. Hero Landing Page Banner */
.hero-section {
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #ffffff;
  padding: 80px 24px;
}

/* 2. Vibrant CTA Button */
.cta-button {
  background: linear-gradient(to right, #ec4899, #8b5cf6);
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  border-radius: 9999px; /* Pill shape */
  font-weight: 600;
  cursor: pointer;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Best Practices & Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "Best Practices & Common Pitfalls 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Keep it subtle:</strong> Stick to 2–3 harmonious shades (analogous hues like blue + cyan or purple + pink).</li><li><strong>Avoid rainbow clutter:</strong> Blending 6+ uncoordinated bright colors overwhelms users and feels amateur.</li><li><strong>Ensure WCAG contrast:</strong> Test that white or dark text maintains high contrast across all parts of the gradient transition.</li></ul>",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playgrounds on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<ul><li><strong>Linear Gradient Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-mby3mj5e?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-mby3mj5e?file=index.html</a></li><li><strong>Radial Gradient Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-6bcrqp2m?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-6bcrqp2m?file=index.html</a></li><li><strong>Gradient Stops Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-brdjb984?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-brdjb984?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Gradients Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Gradient Type</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Visual Flow</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Linear Gradient</strong></td><td style=\"padding:8px;\"><code>linear-gradient(to right, #4f46e5, #06b6d4)</code></td><td style=\"padding:8px;\">Transitions along straight line / angle</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Rotated Angle</strong></td><td style=\"padding:8px;\"><code>linear-gradient(45deg, #8b5cf6, #ec4899)</code></td><td style=\"padding:8px;\">Custom angular trajectory</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Radial Gradient</strong></td><td style=\"padding:8px;\"><code>radial-gradient(circle, #fef08a, #f97316)</code></td><td style=\"padding:8px;\">Radiates outward from center in a circle</td></tr><tr><td style=\"padding:8px;\"><strong>Color Stops</strong></td><td style=\"padding:8px;\"><code>linear-gradient(to right, red 20%, blue 80%)</code></td><td style=\"padding:8px;\">Pins colors to exact element percentages</td></tr></tbody></table>",
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

    // 2. Find section "Colors & Backgrounds" (id: 11) for CSS
    const section = await db.collection("sections").findOne({
      name: /^colors & backgrounds$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Colors & Backgrounds" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 07: CSS Gradients — Blending Colors Beautifully" (id: 42)
    const collectionTitle = "Lesson 07: CSS Gradients — Blending Colors Beautifully";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^gradients/i },
        { title: /^lesson 07/i },
        { id: 42 },
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

    console.log("🎉 Done! CSS Lesson 07 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
