/**
 * Seed Script: CSS Lesson 06 — "Lesson 06: CSS Background Colors — Painting the Canvas of Your Webpage"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson6.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson6.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*ZwiNfevNDTZBlqBILxTJZw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Painting the Canvas of Your Webpage 🖌️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine constructing a newly built house: The walls are up, doors installed, and windows placed. But everything is plain bare drywall. Before bringing in furniture and artwork, you paint the walls to give the space warmth, atmosphere, and identity.</p><p>Webpages work identically: HTML constructs the architectural framing, and CSS background colors paint the visual canvas behind content.</p>",
    },

    // ── What is a Background in CSS ──
    { id: nextId(), type: "heading" as const, content: "What is a Background in CSS? 🧱" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In CSS, a <strong>background</strong> represents the rectangular painting surface that lies directly behind the content, padding, and borders of an HTML element. Almost every element in the DOM tree possesses its own independent background layer.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic background-color syntax */
body {
  background-color: #f8fafc; /* Overall page canvas */
}

header {
  background-color: #0f172a; /* Dark header canvas */
}

.card {
  background-color: #ffffff; /* White elevated card canvas */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Applying Background Colors to Multiple Elements ──
    { id: nextId(), type: "heading" as const, content: "Applying Background Colors Across Multiple Elements 🎨" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML Structure -->
<body>
  <h1>Welcome to My Website</h1>
  <p>I'm learning CSS and building beautiful webpages.</p>
  <div class="highlight-box">Important update banner</div>
</body>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* CSS Styling */
body {
  background-color: #f0f8ff; /* Alice Blue page canvas */
}

h1 {
  background-color: #3498db; /* Blue heading bar */
  color: #ffffff;
  padding: 12px;
}

p {
  background-color: #ffffff; /* White paragraph block */
  padding: 16px;
}

.highlight-box {
  background-color: #ffe4b5; /* Moccasin warning accent */
  padding: 12px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Visual Output Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*Fq9DAM7YGiAWn_3Z81fJwQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── How Browsers Paint Backgrounds ──
    { id: nextId(), type: "heading" as const, content: "How the Browser Paints Backgrounds ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `HTML DOM parsed
      ↓
CSSOM computed for each element box
      ↓
Browser calculates element boundaries (Content + Padding)
      ↓
Browser paints background-color onto the canvas layer
      ↓
Foreground content (Text, Icons, Images) painted ON TOP
      ↓
Final composite presented on screen`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Transparent Backgrounds with RGBA ──
    { id: nextId(), type: "heading" as const, content: "Semi-Transparent Backgrounds with RGBA 💎" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Translucent UI Elements */
.notification-banner {
  /* 50% opacity translucent blue background */
  background-color: rgba(37, 99, 235, 0.5);
  color: #ffffff; /* 100% solid, fully legible text */
  padding: 16px;
  border-radius: 8px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── RGBA vs Opacity ──
    { id: nextId(), type: "heading" as const, content: "Key Distinction: background-color: rgba(...) vs opacity ⚠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ WRONG: Using opacity when only background should fade */
.card-wrong {
  background-color: #000000;
  opacity: 0.5; /* Makes background + text + images ALL 50% transparent! */
}

/* ✅ CORRECT: Using RGBA or HSLA for translucent backdrop */
.card-correct {
  background-color: rgba(0, 0, 0, 0.5); /* ONLY background is translucent */
  color: #ffffff;                       /* Text remains sharp & 100% opaque */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Real-World UI Use Cases ──
    { id: nextId(), type: "heading" as const, content: "Where Background Colors Drive UI Structure 🏛️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Navigation Bars (<code>&lt;nav&gt;</code>):</strong> Dark or branded backdrops visually anchoring the top of the viewport.</li><li><strong>Content Cards (<code>.card</code>):</strong> Clean white surfaces (<code>#ffffff</code>) elevated above off-white page body backgrounds (<code>#f8fafc</code>).</li><li><strong>Call-to-Action Buttons (<code>.btn-primary</code>):</strong> Vibrant accent hues drawing user focus to key workflows.</li><li><strong>Alerts &amp; Callout Banners:</strong> Soft pastel yellows/reds/greens communicating status and warnings.</li><li><strong>Footers (<code>&lt;footer&gt;</code>):</strong> Dark contrasting grounds providing visual closure to the bottom of the page.</li></ol>",
    },

    // ── Best Practices & Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "Best Practices & Common Beginner Pitfalls 💡" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ PITFALL: Insufficient Contrast (White text on light yellow) */
.alert-bad {
  background-color: lightyellow;
  color: white; /* Unreadable! Fails WCAG accessibility */
}

/* ✅ BEST PRACTICE: High Contrast (Dark slate text on warm amber) */
.alert-good {
  background-color: #fef3c7;
  color: #78350f; /* High contrast, comfortable readability */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playgrounds on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<ul><li><strong>Background Color Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-l9pp5alv?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-l9pp5alv?file=index.html</a></li><li><strong>Background Color with Opacity Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-ouj4lxhn?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-ouj4lxhn?file=index.html</a></li></ul>',
    },

    // ── Quick Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Background Colors Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property / Technique</th><th style=\"padding:8px;\">Example</th><th style=\"padding:8px;\">Behavior</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Solid Background</strong></td><td style=\"padding:8px;\"><code>background-color: #3498db;</code></td><td style=\"padding:8px;\">Fills element canvas with 100% opaque color</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Translucent Background</strong></td><td style=\"padding:8px;\"><code>background-color: rgba(0,0,255,0.5);</code></td><td style=\"padding:8px;\">Fades only the backdrop layer, keeping text solid</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Element Opacity</strong></td><td style=\"padding:8px;\"><code>opacity: 0.5;</code></td><td style=\"padding:8px;\">Fades entire element box including children & text</td></tr><tr><td style=\"padding:8px;\"><strong>Accessibility Rule</strong></td><td style=\"padding:8px;\">4.5:1 Contrast Ratio</td><td style=\"padding:8px;\">Always ensure dark text on light backdrops & vice versa</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 06: CSS Background Colors — Painting the Canvas of Your Webpage" (id: 41)
    const collectionTitle = "Lesson 06: CSS Background Colors — Painting the Canvas of Your Webpage";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^background color/i },
        { title: /^lesson 06/i },
        { id: 41 },
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

    console.log("🎉 Done! CSS Lesson 06 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
