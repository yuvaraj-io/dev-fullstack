/**
 * Seed Script: CSS Lesson 03 — "Lesson 03: Adding CSS to HTML — Three Ways to Style Your Webpage"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson3.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson3.ts
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
    { id: nextId(), type: "heading" as const, content: "1. Introduction — Where Do You Write CSS? 🤔" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now that we know how CSS rules are constructed with selectors, properties, and values, the next natural question is: <strong>Where should that CSS actually be placed?</strong></p><p>Think about writing a book: You could write quick notes directly in the margins beside sentences, you could put chapter notes at the top of each chapter, or you could keep a master guide in a separate notebook linked to the whole series. CSS offers three identical strategies for linking styling rules to HTML.</p>",
    },

    // ── Where do you write CSS Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*K6nUaNreDwBy8f7X80DwuA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── The Three Ways Diagram Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*wOJqbNuFszgd4N04C-H70w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── The 3 Ways Overview ──
    { id: nextId(), type: "heading" as const, content: "2. The Three Ways to Connect CSS to HTML 🔌" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Inline CSS:</strong> Written directly inside an HTML tag using the <code>style</code> attribute.</li><li><strong>Internal CSS:</strong> Placed inside a <code>&lt;style&gt;</code> element in the <code>&lt;head&gt;</code> of a single HTML file.</li><li><strong>External CSS:</strong> Maintained in a standalone <code>.css</code> file linked via <code>&lt;link rel=\"stylesheet\" href=\"styles.css\"&gt;</code>.</li></ol>",
    },

    // ── 1. Inline CSS ──
    { id: nextId(), type: "heading" as const, content: "3. Inline CSS — Styling Individual Elements 🏷️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Inline CSS Example -->
<h1 style="color: blue;">Welcome to CSS</h1>
<p style="color: gray; font-size: 18px;">CSS makes webpages beautiful.</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Best for:</strong> Quick email templates, debugging, or one-off dynamic overrides.<br /><strong>Drawbacks:</strong> Violates separation of concerns, causes severe code duplication, and carries highest specificity priority making overrides harder.</p>",
    },

    // ── 2. Internal CSS ──
    { id: nextId(), type: "heading" as const, content: "4. Internal CSS — Styling a Single HTML Page 📄" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Internal CSS Demo</title>
  <style>
    h1 {
      color: #2563eb;
      text-align: center;
    }
    p {
      font-size: 18px;
      color: #475569;
    }
  </style>
</head>
<body>
  <h1>Welcome to CSS</h1>
  <p>CSS makes webpages beautiful.</p>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Best for:</strong> Standalone landing pages, single-file prototypes, documentation demos, or unique one-page styling.<br /><strong>Drawbacks:</strong> Styles cannot be shared across multiple HTML files without copy-pasting.</p>",
    },

    // ── 3. External CSS ──
    { id: nextId(), type: "heading" as const, content: "5. External CSS — The Professional Industry Standard 🌐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1. styles.css */
h1 {
  color: #2563eb;
  font-family: sans-serif;
}

p {
  font-size: 18px;
  color: #475569;
  line-height: 1.6;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 2. index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>External CSS Demo</title>
  <!-- Link external stylesheet -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Welcome to CSS</h1>
  <p>CSS makes webpages beautiful.</p>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Understanding <code>&lt;link&gt;</code>:</strong></p><ul><li><code>&lt;link&gt;</code>: Establishes an external document relationship.</li><li><code>rel=\"stylesheet\"</code>: Informs the browser that the target file contains CSS styles.</li><li><code>href=\"styles.css\"</code>: Specifies the relative or absolute path to the stylesheet.</li><li><strong>Browser Caching Advantage:</strong> Browsers store <code>styles.css</code> in cache on first visit, drastically speeding up navigation across multi-page websites!</li></ul>",
    },

    // ── Comparison Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ET84M9Y2NZ6P2BLKt4LaEQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── How Browser Loads CSS Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*dY16Ud02uDbg3urcQkjAXw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playgrounds on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<ul><li><strong>Internal CSS Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-d2rdrsbp?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-d2rdrsbp?file=index.html</a></li><li><strong>External CSS Starter:</strong> <a href="https://stackblitz.com/edit/stackblitz-starters-k6zyyqen?file=index.html%2Cstyles.css" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-starters-k6zyyqen?file=index.html,styles.css</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Comparison Matrix: Inline vs Internal vs External CSS" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Inline CSS</th><th style=\"padding:8px;\">Internal CSS</th><th style=\"padding:8px;\">External CSS</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Location</strong></td><td style=\"padding:8px;\">Inside HTML tag (<code>style=\"...\"</code>)</td><td style=\"padding:8px;\">Inside <code>&lt;style&gt;</code> in <code>&lt;head&gt;</code></td><td style=\"padding:8px;\">Separate <code>.css</code> file linked with <code>&lt;link&gt;</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Scope</strong></td><td style=\"padding:8px;\">Single individual element</td><td style=\"padding:8px;\">Single HTML document</td><td style=\"padding:8px;\">Entire website across unlimited pages</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Reusability</strong></td><td style=\"padding:8px;\">❌ None (copy-paste required)</td><td style=\"padding:8px;\">⚠️ Limited to page only</td><td style=\"padding:8px;\">✅ 100% Reusable globally</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Browser Cache</strong></td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">✅ Yes (Fast repeated page loads)</td></tr><tr><td style=\"padding:8px;\"><strong>Best Use Case</strong></td><td style=\"padding:8px;\">Quick testing / HTML emails</td><td style=\"padding:8px;\">Single-page demos / SPAs</td><td style=\"padding:8px;\">Production web applications</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 03: Adding CSS to HTML — Three Ways to Style Your Webpage" (id: 38)
    const collectionTitle = "Lesson 03: Adding CSS to HTML — Three Ways to Style Your Webpage";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^adding css/i },
        { title: /^lesson 03/i },
        { id: 38 },
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

    console.log("🎉 Done! CSS Lesson 03 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
