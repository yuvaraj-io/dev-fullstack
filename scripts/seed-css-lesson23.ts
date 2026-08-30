/**
 * Seed Script: CSS Lesson 23 — "Lesson 23: Font Families & Web-Safe Fonts"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson23.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson23.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*tjWfYlAqql5wnwIyhuS5ng.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Voice of Your Typeface 🎭" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Choosing a font is one of the most impactful design decisions on the web. The same message can feel clean, luxurious, technical, or playful simply by changing the font.</p><p>CSS provides the <code>font-family</code> property to declare typefaces. However, a major challenge is that <strong>a font specified in CSS might not exist on the user's computer or phone</strong>. This is why we use <strong>font stacks, web-safe fonts, and external web font services</strong> like Google Fonts.</p>",
    },

    // ── What is a Font Family & Font Stack ──
    { id: nextId(), type: "heading" as const, content: "1. What is a Font Family & Font Stack? 📚" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>font stack</strong> is a comma-separated list of candidate fonts listed from highest preference to lowest. The browser evaluates each font in order from left to right until it finds one installed on the device:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Font Stack Evaluation */
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  /* 
    1. Try "Helvetica Neue" (Common on macOS/iOS)
    2. Fallback to Arial (Universal across Windows/macOS)
    3. Fallback to any generic sans-serif available on the device
  */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Evaluation Flowchart:
  Preferred Font (e.g. Arial)
          ↓
  Is it installed locally?
     ├── Yes ──> Render with Arial
     └── No  ──> Check next fallback (e.g. Helvetica)
                    ├── Yes ──> Render with Helvetica
                    └── No  ──> Render with generic family (sans-serif)`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Web-Safe Fonts ──
    { id: nextId(), type: "heading" as const, content: "2. Web-Safe Fonts & Generic Font Families 🛡️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Web-Safe Fonts</strong> are standard fonts pre-installed across virtually all operating systems (Windows, macOS, Linux, iOS, Android):</p><ul><li><strong>Serif (Decorative feet/strokes):</strong> <code>Times New Roman</code>, <code>Georgia</code>, <code>Garamond</code>. Perfect for editorial, books, and formal articles.</li><li><strong>Sans-Serif (Clean, modern, no feet):</strong> <code>Arial</code>, <code>Helvetica</code>, <code>Verdana</code>, <code>Trebuchet MS</code>. The gold standard for digital interfaces.</li><li><strong>Monospace (Fixed character widths):</strong> <code>Courier New</code>, <code>Consolas</code>, <code>Monaco</code>. Essential for code blocks, terminal outputs, and data tables.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Examples of Web-Safe Declarations */
.serif-heading {
  font-family: "Times New Roman", Times, serif;
}

.sans-body {
  font-family: Arial, Helvetica, sans-serif;
}

.code-snippet {
  font-family: "Courier New", Courier, monospace;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Web-Safe Font Family Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-font-family?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-font-family?file=index.html</a></p>',
    },

    // ── Google Fonts ──
    { id: nextId(), type: "heading" as const, content: "3. Loading Custom Web Fonts with Google Fonts 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you want modern typefaces like <em>Poppins, Roboto, Inter, or Montserrat</em> that are not pre-installed on user machines, load them remotely via <strong>Google Fonts</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 1. Include Google Fonts link in your HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">

<!-- 2. Apply in CSS with fallback -->
<style>
  body {
    font-family: "Poppins", sans-serif;
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Font Awesome Icons ──
    { id: nextId(), type: "heading" as const, content: "4. Integrating Vector Icons with Font Awesome 💎" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*GcUyjlGpcwVvUxzNLChJfw.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 1. Include Font Awesome CDN in <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

<!-- 2. Render and style icons as text characters -->
<i class="fas fa-heart icon-favorite"></i>
<i class="fas fa-shopping-cart icon-cart"></i>

<style>
  .icon-favorite {
    font-size: 24px;
    color: #ef4444; /* Heart icon styled like text! */
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Google Fonts & Font Awesome Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-google-fonts-and-font-awesome?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-google-fonts-and-font-awesome?file=index.html</a></p>',
    },

    // ── Font Sizing Options ──
    { id: nextId(), type: "heading" as const, content: "5. Sizing Fonts Responsively: px vs. em vs. rem vs. vw 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>font-size</code> property sets the scale of your typography:</p><ul><li><strong><code>px</code>:</strong> Fixed pixel sizing (e.g. <code>16px</code>). Rigid across devices.</li><li><strong><code>em</code>:</strong> Multiplied relative to <strong>parent element font size</strong> (e.g. <code>1.5em × 20px = 30px</code>).</li><li><strong><code>rem</code>:</strong> Multiplied relative to <strong>root <code>&lt;html&gt;</code> font size</strong> (e.g. <code>2rem × 16px = 32px</code>). Predictable and accessible!</li><li><strong><code>vw</code>:</strong> Scales fluidly with the viewport width (e.g. <code>5vw</code>).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard Root Setup */
html {
  font-size: 16px; /* Base 1rem = 16px */
}

h1 {
  font-size: 2rem;     /* 32px */
}
h2 {
  font-size: 1.5rem;   /* 24px */
}
p {
  font-size: 1rem;     /* 16px */
}
small {
  font-size: 0.875rem; /* 14px */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Font Sizing Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-font-sizing?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-font-sizing?file=index.html</a></p>',
    },

    // ── Summary Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Typography & Font Sizing Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Category / Unit</th><th style=\"padding:8px;\">Behavior / Calculation</th><th style=\"padding:8px;\">Key Recommendation</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>Serif</code></td><td style=\"padding:8px;\">Features decorative edge strokes</td><td style=\"padding:8px;\"><code>Times New Roman</code>, <code>Georgia</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>Sans-Serif</code></td><td style=\"padding:8px;\">Clean, modern lines without strokes</td><td style=\"padding:8px;\"><code>Arial</code>, <code>Helvetica</code>, <code>Poppins</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>Monospace</code></td><td style=\"padding:8px;\">Equal width for all characters</td><td style=\"padding:8px;\"><code>Courier New</code>, code snippets</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>rem</code></td><td style=\"padding:8px;\">Multiplied by root <code>&lt;html&gt;</code> size</td><td style=\"padding:8px;\">Best practice for all typography</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>em</code></td><td style=\"padding:8px;\">Multiplied by parent/local font size</td><td style=\"padding:8px;\">Component-level proportional scaling</td></tr><tr><td style=\"padding:8px;\"><code>vw</code></td><td style=\"padding:8px;\">1% of browser window width</td><td style=\"padding:8px;\">Fluid responsive display titles</td></tr></tbody></table>",
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

    // 2. Find section "Typography & Media" (id: 15) for CSS
    const section = await db.collection("sections").findOne({
      name: /^typography/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Typography & Media" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 23: Font Families & Web-Safe Fonts" (id: 55)
    const collectionTitle = "Lesson 23: Font Families & Web-Safe Fonts";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^fonts$/i },
        { title: /^font families/i },
        { title: /^lesson 23/i },
        { id: 55 },
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

    console.log("🎉 Done! CSS Lesson 23 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
