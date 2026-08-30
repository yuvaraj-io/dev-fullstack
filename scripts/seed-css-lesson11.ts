/**
 * Seed Script: CSS Lesson 11 — "Lesson 11: CSS Selectors — Finding the Right HTML Elements"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson11.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson11.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*8xwl9Tla9XQeOq9eVGfH-w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Targeting Elements Precisely 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine a webpage containing 20 paragraphs, 5 headings, 10 buttons, and multiple containers. You want to color just one specific paragraph blue. How does the browser know which element should change?</p><p>The browser cannot guess. You provide an address using <strong>CSS Selectors</strong>. A selector is the bridge connecting your HTML structure with your CSS styles.</p>",
    },

    // ── Anatomy of a CSS Rule ──
    { id: nextId(), type: "heading" as const, content: "The Anatomy of a CSS Rule 📐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic CSS Rule Structure */
selector {
  property: value; /* Declaration */
}

/* Example: */
section {
  padding: 20px;
  background-color: #38bdf8;
}

/* Explanation:
   'section'          → Selector (identifies the HTML element)
   'padding'          → Property (the aesthetic attribute)
   '20px'             → Value (the magnitude or color assigned) */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 1. Universal Selector ──
    { id: nextId(), type: "heading" as const, content: "1. Universal Selector (*)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The asterisk <code>*</code> matches <strong>every single element</strong> in the entire DOM tree. It is primarily used for CSS resets and setting universal defaults such as <code>box-sizing: border-box</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Universal Reset Example */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Universal Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-universal-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-universal-selector?file=index.html</a></p>',
    },

    // ── 2. Type / Element Selector ──
    { id: nextId(), type: "heading" as const, content: "2. Type (Element) Selector" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Type Selector</strong> targets elements directly by their HTML tag name (e.g. <code>p</code>, <code>h1</code>, <code>button</code>, <code>section</code>). It applies uniform styles to all matching tags across the page.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Styles every paragraph on the webpage */
p {
  color: #1e293b;
  line-height: 1.6;
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
        '<p><strong>Live Type Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-type-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-type-selector?file=index.html</a></p>',
    },

    // ── 3. Class Selector ──
    { id: nextId(), type: "heading" as const, content: "3. Class Selector (.class)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>Class Selector</strong> starts with a dot (<code>.</code>) and targets all HTML elements decorated with that specific <code>class</code> attribute. Classes are reusable across multiple different elements.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Class definition */
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Class Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-class-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-class-selector?file=index.html</a></p>',
    },

    // ── 4. ID Selector ──
    { id: nextId(), type: "heading" as const, content: "4. ID Selector (#id)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>ID Selector</strong> starts with a hash (<code>#</code>) and targets a <strong>single, unique element</strong> on the page. In valid HTML, each ID value should only exist once per document.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* ID definition */
#main-navigation {
  position: sticky;
  top: 0;
  background-color: #0f172a;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live ID Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-id-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-id-selector?file=index.html</a></p>',
    },

    // ── 5. Descendant Selector ──
    { id: nextId(), type: "heading" as const, content: "5. Descendant Selector (ancestor descendant)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represented by a simple <strong>space</strong> between two selectors. It matches all descendant elements that exist anywhere inside the specified ancestor, no matter how deeply nested.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Matches ALL <p> elements inside <div>, direct or nested */
div p {
  color: #16a34a;
  margin: 10px 0;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Descendant Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-decented-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-decented-selector?file=index.html</a></p>',
    },

    // ── 6. Child Combinator ──
    { id: nextId(), type: "heading" as const, content: "6. Child Combinator (parent > child)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represented by the <code>&gt;</code> symbol. Unlike descendant selectors, it matches <strong>ONLY direct children</strong> that sit immediately inside the parent container.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Matches ONLY direct <li> children of <ul> (ignores nested submenus) */
ul > li {
  list-style-type: square;
  color: #991b1b;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Child Selector Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-child-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-child-selector?file=index.html</a></p>',
    },

    // ── 7. General Sibling Selector ──
    { id: nextId(), type: "heading" as const, content: "7. General Sibling Combinator (prev ~ siblings)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represented by the tilde <code>~</code>. It targets <strong>all sibling elements</strong> sharing the same parent that appear anywhere after the specified element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Matches ALL <p> elements that come after <h1> in the same container */
h1 ~ p {
  color: #0284c7;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live General Sibling Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-sibling-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-sibling-selector?file=index.html</a></p>',
    },

    // ── 8. Adjacent Sibling Selector ──
    { id: nextId(), type: "heading" as const, content: "8. Adjacent Sibling Combinator (prev + sibling)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represented by the plus <code>+</code> sign. It targets <strong>only the immediate next sibling</strong> following the specified element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Matches ONLY the first <p> immediately following <h1> */
h1 + p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #d97706; /* Subtitle lead styling */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Adjacent Sibling Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-direct-sibling?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-direct-sibling?file=index.html</a></p>',
    },

    // ── 9. Combining & Grouping Selectors ──
    { id: nextId(), type: "heading" as const, content: "9. Combining & Grouping Selectors 🔀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* 1. Combined Element + Class (Matches <p> that has .warning) */
p.warning {
  color: #ef4444;
  font-weight: bold;
}

/* 2. Grouped Selectors with comma (Applies font to multiple tags) */
h1, h2, h3 {
  font-family: system-ui, -apple-system, sans-serif;
  color: #0f172a;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── How Browsers Read Selectors ──
    { id: nextId(), type: "heading" as const, content: "10. How Browsers Match Selectors ⚙️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*45ng2fhtTcH5fhnO8aU3Og.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Browsers parse CSS selectors from <strong>right-to-left</strong> (the key selector first) to quickly eliminate non-matching DOM elements and efficiently render the document.</p>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: CSS Selectors Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Selector</th><th style=\"padding:8px;\">Pattern</th><th style=\"padding:8px;\">Matches</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Universal</strong></td><td style=\"padding:8px;\"><code>*</code></td><td style=\"padding:8px;\">Every single element on the page</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Type (Element)</strong></td><td style=\"padding:8px;\"><code>p</code>, <code>h1</code></td><td style=\"padding:8px;\">All elements matching that HTML tag</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Class</strong></td><td style=\"padding:8px;\"><code>.card</code></td><td style=\"padding:8px;\">All elements with <code>class=\"card\"</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>ID</strong></td><td style=\"padding:8px;\"><code>#header</code></td><td style=\"padding:8px;\">The single element with <code>id=\"header\"</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Descendant</strong></td><td style=\"padding:8px;\"><code>div p</code></td><td style=\"padding:8px;\">All <code>&lt;p&gt;</code> anywhere inside <code>&lt;div&gt;</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Child</strong></td><td style=\"padding:8px;\"><code>ul &gt; li</code></td><td style=\"padding:8px;\">Only direct children <code>&lt;li&gt;</code> of <code>&lt;ul&gt;</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>General Sibling</strong></td><td style=\"padding:8px;\"><code>h1 ~ p</code></td><td style=\"padding:8px;\">All sibling <code>&lt;p&gt;</code> that follow <code>&lt;h1&gt;</code></td></tr><tr><td style=\"padding:8px;\"><strong>Adjacent Sibling</strong></td><td style=\"padding:8px;\"><code>h1 + p</code></td><td style=\"padding:8px;\">Only the immediate next sibling <code>&lt;p&gt;</code></td></tr></tbody></table>",
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

    // 2. Find section "Selectors & CSS Logic" (id: 13) for CSS
    const section = await db.collection("sections").findOne({
      name: /^selectors/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Selectors & CSS Logic" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 11: CSS Selectors — Finding the Right HTML Elements" (id: 46)
    const collectionTitle = "Lesson 11: CSS Selectors — Finding the Right HTML Elements";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^selectors$/i },
        { title: /^lesson 11/i },
        { id: 46 },
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

    console.log("🎉 Done! CSS Lesson 11 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
