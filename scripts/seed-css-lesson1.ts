/**
 * Seed Script: CSS Lesson 01 — "Lesson 01: Introduction to CSS — Bringing Your HTML to Life 🎨"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson1.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson1.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*qu2bWTfXc4frWCF4iWEEsQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction: Bringing HTML to Life 🎨" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If you have completed the HTML series, you have already learned something fundamental about the web: <strong>how to build the structure of a webpage.</strong> You started with headings, paragraphs, links, images, tables, forms, and semantic HTML.</p><p>When you open raw HTML in a browser, it functions properly, but it looks plain: white backgrounds, black serif text, blue underlined links, and browser-default buttons. It has no <strong>design</strong> yet.</p><p>Think of building a house: <strong>HTML is the foundation, walls, doors, and roof. CSS is the paint, furniture, lighting, and interior decoration.</strong> HTML builds the structure; CSS brings that structure to life!</p>",
    },

    // ── Life Before CSS Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*3iRqhfc_eiigtt6H5EfWcg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Life Before CSS ──
    { id: nextId(), type: "heading" as const, content: "Life Before CSS ⏳" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the early 1990s, websites were simple documents. As developers wanted visual styling, HTML was forced to handle presentation using messy inline tags and attributes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<body bgcolor="lightblue">
  <font color="red">Welcome!</font>
  <center>Welcome to my website</center>
</body>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>On large websites with hundreds of pages, updating heading colors or font styling required modifying raw HTML across every single page. The web desperately needed a separation of concerns.</p>",
    },

    // ── The Birth of CSS and its Versions ──
    { id: nextId(), type: "heading" as const, content: "The Birth of CSS and its Evolution 📜" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>CSS (Cascading Style Sheets)</strong> was proposed by Håkon Wium Lie in 1994 and became a W3C standard (CSS1) in 1996 with the core philosophy:</p><ul><li><strong>HTML:</strong> Structure and semantic meaning</li><li><strong>CSS:</strong> Presentation, layout, and visual appearance</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>CSS1 (1996):</strong> Introduced basic fonts, text properties, colors, backgrounds, and margin/padding spacing.</li><li><strong>CSS2 (1998):</strong> Added absolute/relative positioning, media types, z-index layering, and advanced selectors.</li><li><strong>HTML5 & CSS3:</strong> Modern era introducing rounded corners, gradients, box shadows, transitions, keyframe animations, 2D/3D transforms, media queries, and flexbox/grid layouts.</li></ul>",
    },

    // ── Evolution Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*7PcBeHQ_VxwtZQpJVXxSqA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── What Problems CSS Solves ──
    { id: nextId(), type: "heading" as const, content: "What Problems Does CSS Solve in Development? 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Visual Polish & Aesthetics:</strong> Fine-grained control over colors, typography, borders, shadows, and smooth micro-interactions.</li><li><strong>Separation of Concerns:</strong> HTML answers <em>'What is this content?'</em> while CSS answers <em>'How should it look?'</em>.</li><li><strong>Global Reusability:</strong> A single external <code>style.css</code> file can be linked to thousands of pages, enabling site-wide theme updates in seconds.</li><li><strong>Responsive Design:</strong> CSS allows layouts to fluidly adapt across desktop monitors, laptops, tablets, and mobile smartphones.</li></ol>",
    },

    // ── StackBlitz Interactive Demo ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-jmuvtdf5?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-jmuvtdf5?file=index.html</a></p>',
    },

    // ── Your First CSS Example ──
    { id: nextId(), type: "heading" as const, content: "Your First CSS Example 💻" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>First CSS Example</title>
  <style>
    body {
      background-color: #581c87;
      color: #ffffff;
      font-family: verdana, sans-serif;
      padding: 40px;
    }

    h1 {
      color: #facc15;
      text-align: center;
    }

    p {
      font-size: 18px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>First CSS Example</h1>
  <p>This is a styled paragraph running with internal CSS.</p>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Anatomy of a CSS Rule ──
    { id: nextId(), type: "heading" as const, content: "Anatomy of a CSS Rule: Selector → Property → Value 🔍" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic CSS Syntax Pattern */
selector {
  property: value;
}

/* Example: */
p {
  color: red;
  font-size: 16px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Selector (<code>p</code>):</strong> Identifies the target HTML elements to style.</li><li><strong>Property (<code>color</code>):</strong> The specific visual characteristic being adjusted.</li><li><strong>Value (<code>red</code>):</strong> The setting applied to that property.</li><li><strong>Curly Braces <code>{ }</code>:</strong> Enclose all declaration blocks.</li><li><strong>Semicolon <code>;</code>:</strong> Concludes each declaration statement.</li></ul>",
    },

    // ── Browser Default Styles Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*KAV8p0qezlaGAmgPZ3doiw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Browser Default Styles ──
    { id: nextId(), type: "heading" as const, content: "User Agent Stylesheets (Browser Default Styles) 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every browser comes equipped with a default stylesheet (known as <strong>User Agent Styles</strong>). This is why even raw HTML has larger <code>&lt;h1&gt;</code> text, margins around paragraphs, bullet points on <code>&lt;ul&gt;</code>, and bold styling for <code>&lt;strong&gt;</code>.</p><p>CSS gives you the power to override, reset, and customize these defaults to create completely custom brand experiences.</p>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: HTML vs CSS Role Division" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Dimension</th><th style=\"padding:8px;\">HTML (HyperText Markup Language)</th><th style=\"padding:8px;\">CSS (Cascading Style Sheets)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Core Role</strong></td><td style=\"padding:8px;\">Structure, semantics & content</td><td style=\"padding:8px;\">Visual styling, layouts & presentation</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Analogy</strong></td><td style=\"padding:8px;\">The brick foundation, walls & rooms</td><td style=\"padding:8px;\">The paint, furniture, lighting & decor</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Key Constructs</strong></td><td style=\"padding:8px;\">Tags, attributes, elements (<code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>)</td><td style=\"padding:8px;\">Selectors, properties, values (<code>color: blue;</code>)</td></tr><tr><td style=\"padding:8px;\"><strong>Maintenance</strong></td><td style=\"padding:8px;\">Defines page structure once</td><td style=\"padding:8px;\">Centralized stylesheet updates entire website</td></tr></tbody></table>",
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

    // 3. Find or create collection "Introduction" / "Lesson 01: Introduction to CSS — Bringing Your HTML to Life 🎨"
    const collectionTitle = "Lesson 01: Introduction to CSS — Bringing Your HTML to Life 🎨";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^introduction/i },
        { title: /^lesson 01/i },
        { id: 36 },
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

    console.log("🎉 Done! CSS Lesson 01 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
