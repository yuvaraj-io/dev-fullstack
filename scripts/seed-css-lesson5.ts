/**
 * Seed Script: CSS Lesson 05 — "Lesson 05: Colors with Opacity in CSS"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson5.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson5.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*wcLfoPi0TEmf_9waBMjw-w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — How Does the Browser Understand Color? 🎨" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you write <code>color: blue;</code>, the browser immediately repaints the text. But how does it know what shade of blue to show? What if you need the exact hex code from your brand Figma file, or a 40% transparent dark overlay on top of an image?</p><p>CSS gives developers several flexible color models: <strong>Named Colors, HEX codes, RGB, RGBA, HSL, HSLA, and the <code>opacity</code> property</strong>. Let's master each format and learn when to use them.</p>",
    },

    // ── 1. Named Colors ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Named Colors (140+ Built-in Keywords) 🔴" },
    {
      id: nextId(),
      type: "code" as const,
      code: `h1 {
  color: crimson;
}

p {
  background-color: lightblue;
  color: darkslategray;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>CSS supports <strong>140+ standard color names</strong> (like <code>red</code>, <code>teal</code>, <code>gold</code>, <code>navy</code>, <code>coral</code>, <code>salmon</code>). Great for quick prototypes and learning, but lacks the exact mathematical precision required for production design systems.</p>",
    },

    // ── 2. HEX Codes ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ HEX Color Codes (#RRGGBB) 🎯" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard 6-Digit Hexadecimal: #RRGGBB */
body {
  background-color: #0f172a; /* Slate 900 */
}

h1 {
  color: #38bdf8;            /* Sky 400 */
}

/* 3-Digit Shorthand (expands #38f to #3388ff) */
a {
  color: #38f;
  background-color: #fff;    /* Equivalent to #ffffff */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>How HEX works:</strong> Each two-character pair represents hexadecimal values from <code>00</code> (0) to <code>FF</code> (255) for Red, Green, and Blue channels. Shorthand 3-digit notation (<code>#FFF</code>) is allowed when each pair contains repeated digits (<code>#FFFFFF</code>).</p>",
    },

    // ── 3. RGB & RGBA ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ RGB & RGBA — Mixing Light with Alpha Transparency 🌈" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* RGB Syntax: rgb(red, green, blue) — values from 0 to 255 */
h1 {
  color: rgb(37, 99, 235);     /* Pure Blue */
}

/* RGBA Syntax: rgba(red, green, blue, alpha) — alpha from 0.0 to 1.0 */
.hero-overlay {
  /* 70% opacity black overlay (30% transparent) */
  background-color: rgba(0, 0, 0, 0.7);
}

.frosted-glass-card {
  /* 40% translucent white card */
  background-color: rgba(255, 255, 255, 0.4);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 4. HSL & HSLA ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ HSL & HSLA — Human-Friendly Color Tuning 🎛️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* HSL Syntax: hsl(Hue 0-360°, Saturation 0-100%, Lightness 0-100%) */
.primary-btn {
  background-color: hsl(217, 91%, 60%); /* Vibrant Brand Blue */
}

.primary-btn:hover {
  /* Effortlessly darken on hover by dropping Lightness! */
  background-color: hsl(217, 91%, 48%);
}

/* HSLA with 50% Alpha Transparency */
.modal-backdrop {
  background-color: hsla(222, 47%, 11%, 0.5);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Hue (0° - 360°):</strong> Position on the color wheel (<code>0°=Red</code>, <code>120°=Green</code>, <code>240°=Blue</code>).</li><li><strong>Saturation (0% - 100%):</strong> Color purity and intensity (<code>0%=Gray</code>, <code>100%=Full vibrancy</code>).</li><li><strong>Lightness (0% - 100%):</strong> Amount of illumination (<code>0%=Black</code>, <code>50%=Normal</code>, <code>100%=White</code>).</li></ul>",
    },

    // ── 5. RGBA vs Opacity Property ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ RGBA/HSLA vs The opacity Property: Critical Distinction ⚠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ❌ WRONG WAY: Using opacity for backgrounds */
.card-wrong {
  background-color: black;
  opacity: 0.5; /* Makes BACKGROUND + TEXT + IMAGES all transparent! */
}

/* ✅ CORRECT WAY: Using RGBA or HSLA */
.card-correct {
  /* ONLY background color is 50% transparent; text stays 100% crisp & readable! */
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
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
        '<ul><li><strong>Background Color Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-l9pp5alv?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-l9pp5alv?file=index.html</a></li><li><strong>Colors with Opacity Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-ouj4lxhn?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-ouj4lxhn?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Color Formats Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Format</th><th style=\"padding:8px;\">Example</th><th style=\"padding:8px;\">Transparency?</th><th style=\"padding:8px;\">Best Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Named Colors</strong></td><td style=\"padding:8px;\"><code>red</code>, <code>navy</code></td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">Fast prototypes & teaching demos</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>HEX (#RRGGBB)</strong></td><td style=\"padding:8px;\"><code>#3b82f6</code></td><td style=\"padding:8px;\">Optional (8-digit)</td><td style=\"padding:8px;\">Brand colors & production UI designs</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>RGB / RGBA</strong></td><td style=\"padding:8px;\"><code>rgba(59, 130, 246, 0.5)</code></td><td style=\"padding:8px;\">✅ Yes (Alpha 0-1)</td><td style=\"padding:8px;\">Overlays, dynamic JS colors, glassmorphism</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>HSL / HSLA</strong></td><td style=\"padding:8px;\"><code>hsl(217, 91%, 60%)</code></td><td style=\"padding:8px;\">✅ Yes (Alpha 0-1)</td><td style=\"padding:8px;\">Dynamic hover states & color palettes</td></tr><tr><td style=\"padding:8px;\"><strong>opacity</strong></td><td style=\"padding:8px;\"><code>opacity: 0.8;</code></td><td style=\"padding:8px;\">✅ Yes (Whole element)</td><td style=\"padding:8px;\">Fading entire cards, modals, or disable states</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 05: Colors with Opacity in CSS" (id: 40)
    const collectionTitle = "Lesson 05: Colors with Opacity in CSS";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^colors/i },
        { title: /^lesson 05/i },
        { id: 40 },
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

    console.log("🎉 Done! CSS Lesson 05 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
