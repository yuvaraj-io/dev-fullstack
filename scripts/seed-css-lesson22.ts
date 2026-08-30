/**
 * Seed Script: CSS Lesson 22 — "Lesson 22: Typography in CSS — Making Text Clear and Beautiful"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson22.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson22.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*3G-0fbAwVcl71KdmZ7KlwQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Voice of Your UI ✍️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When users land on a website, text is the first thing they consume. Before taking in colors or animations, their eyes read headings, paragraphs, call-to-action buttons, and navigational labels.</p><p>HTML elements (<code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>) define <em>what</em> the content is, while CSS typography properties control <em>how</em> that text looks and communicates. In this lesson, we explore the core typography properties: <code>text-align</code>, <code>letter-spacing</code>, <code>word-spacing</code>, <code>text-decoration</code>, and <code>text-transform</code>.</p>",
    },

    // ── Text Alignment ──
    { id: nextId(), type: "heading" as const, content: "1. text-align: Controlling Horizontal Flow ↔️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>text-align</code> property positions text horizontally within its parent block:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 4 Primary Alignment Options */
.text-left    { text-align: left; }    /* Natural reading direction (default in LTR) */
.text-center  { text-align: center; }  /* Ideal for hero headings, titles, and badges */
.text-right   { text-align: right; }   /* Great for numeric tables, dates, and meta info */
.text-justify { text-align: justify; } /* Stretches word gaps so lines flush against both edges */`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Text Alignment Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-align-text?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-align-text?file=index.html</a></p>',
    },

    // ── Letter & Word Spacing ──
    { id: nextId(), type: "heading" as const, content: "2. Precision Spacing: letter-spacing & word-spacing 🔠" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Controlling breathing room between letters (kerning/tracking) and words transforms readability:</p><ul><li><strong><code>letter-spacing</code>:</strong> Adjusts horizontal space between individual characters.</li><li><strong><code>word-spacing</code>:</strong> Adjusts horizontal space between separate words.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Giving uppercase tags a sleek, premium editorial feel */
.hero-category {
  text-transform: uppercase;
  letter-spacing: 2px; /* Adds 2px breathing room between each character */
  font-size: 0.85rem;
}

/* Fine-tuning paragraph rhythm */
.editorial-lead {
  word-spacing: 3px;
  line-height: 1.6;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Text Spacing Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-text-spacing?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-text-spacing?file=index.html</a></p>',
    },

    // ── Text Decoration ──
    { id: nextId(), type: "heading" as const, content: "3. text-decoration: Lines, Underlines & Strikes 🎨" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>text-decoration</code> adds or removes styling lines around text:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Common Decoration Patterns */
a {
  text-decoration: none; /* Strips default browser underline from hyperlinks */
}
a:hover {
  text-decoration: underline; /* Restores underline on hover for accessibility */
}

.discounted-original-price {
  text-decoration: line-through; /* Strikethrough effect for sales and sales badges */
  color: #9ca3af;
}

.overline-text {
  text-decoration: overline; /* Draws line across the top of text */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Text Transform ──
    { id: nextId(), type: "heading" as const, content: "4. text-transform: Capitalization via CSS 🔤" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>text-transform</code> alters capitalization in the visual presentation layer without forcing you to rewrite your raw semantic HTML content.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Visual Transformation */
.btn-action {
  text-transform: uppercase; /* "Submit" in HTML renders as "SUBMIT" */
}

.title-case {
  text-transform: capitalize; /* Capitalizes First Letter Of Each Word */
}

.clean-lowercase {
  text-transform: lowercase; /* Forces all lowercase */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Text Decoration & Transformation Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-text-decoration-and-transformation?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-text-decoration-and-transformation?file=index.html</a></p>',
    },

    // ── Combining Typography Properties ──
    { id: nextId(), type: "heading" as const, content: "5. Real-World Typography Recipes 🧁" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Recipe 1: Modern SaaS Section Heading */
.section-badge {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
}

/* Recipe 2: Editorial Paragraph */
.article-body {
  text-align: left;
  line-height: 1.75;
  word-spacing: 1px;
  color: #374151;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Browser Engine Flowchart ──
    { id: nextId(), type: "heading" as const, content: "6. How the Browser Renders Typography ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Browser reads HTML
        ↓
Identifies Text Elements (h1, p, span, a)
        ↓
Parses CSS Selectors & Rules
        ↓
Applies text-transform (uppercase/lowercase)
        ↓
Calculates Spacing (letter-spacing, word-spacing)
        ↓
Computes Alignment & Line Boxes (text-align)
        ↓
Renders Final Text & Decorations (text-decoration)`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "7. Common Mistakes & Best Practices ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Don't Underline Regular Text:</strong> Users instinctively assume underlined text is a clickable hyperlink. Use bolding or background pills instead.</li><li><strong>Avoid Uppercase on Long Paragraphs:</strong> Full sentences in uppercase significantly reduce reading speed. Keep <code>text-transform: uppercase</code> for short buttons, badges, and labels.</li><li><strong>Moderate Your Spacing:</strong> Huge <code>letter-spacing</code> or <code>word-spacing</code> destroys natural word recognition. Keep spacing subtle (e.g. <code>1px</code> - <code>2px</code>).</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Typography Property Matrix" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">Key Values</th><th style=\"padding:8px;\">Common Purpose</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>text-align</code></td><td style=\"padding:8px;\"><code>left</code>, <code>center</code>, <code>right</code>, <code>justify</code></td><td style=\"padding:8px;\">Horizontal text positioning inside parent block</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>letter-spacing</code></td><td style=\"padding:8px;\"><code>1px</code>, <code>2px</code>, <code>0.05em</code>, etc.</td><td style=\"padding:8px;\">Character tracking / spacing between letters</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>word-spacing</code></td><td style=\"padding:8px;\"><code>2px</code>, <code>5px</code>, etc.</td><td style=\"padding:8px;\">Spacing between adjacent words</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>text-decoration</code></td><td style=\"padding:8px;\"><code>none</code>, <code>underline</code>, <code>line-through</code></td><td style=\"padding:8px;\">Link underlining, strikethrough prices, overlines</td></tr><tr><td style=\"padding:8px;\"><code>text-transform</code></td><td style=\"padding:8px;\"><code>uppercase</code>, <code>lowercase</code>, <code>capitalize</code></td><td style=\"padding:8px;\">Stylistic capitalization without HTML edits</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 22: Typography in CSS — Making Text Clear and Beautiful" (id: 54)
    const collectionTitle = "Lesson 22: Typography in CSS — Making Text Clear and Beautiful";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^typography$/i },
        { title: /^lesson 22/i },
        { id: 54 },
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

    console.log("🎉 Done! CSS Lesson 22 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
