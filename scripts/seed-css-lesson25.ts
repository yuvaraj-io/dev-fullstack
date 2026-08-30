/**
 * Seed Script: CSS Lesson 25 — "Lesson 25: CSS Links and Lists — Styling Navigation and Content 🔗"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson25.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson25.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*qaMPzssWSfXFeUy1gG0RUA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Backbone of Navigation & Content 🔗" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Links (<code>&lt;a&gt;</code>) and lists (<code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>) form the structural backbone of website navigation headers, sidebar drawers, breadcrumbs, content directories, and article summaries.</p><p>By default, browsers render links with default blue text and underlines, and render lists with plain black bullet disks or sequential numbers. With CSS, we can strip away these browser defaults, harness interactive pseudo-class states (<code>:hover</code>, <code>:active</code>, <code>:visited</code>), and transform lists into modern responsive navigation bars.</p>",
    },

    // ── Styling Links ──
    { id: nextId(), type: "heading" as const, content: "1. Core Link Styling: Colors & Underlines 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Standard links can be tailored using basic typography and box model properties:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Basic Clean Link Style */
a {
  color: #0077cc;
  text-decoration: none; /* Removes the default browser underline */
  font-size: 18px;
  margin-right: 20px;
  transition: color 0.2s ease, border-bottom 0.2s ease;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Link States ──
    { id: nextId(), type: "heading" as const, content: "2. Understanding Interactive Link States (LVHA Rule) 🖱️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Links dynamically react to user gestures through pseudo-classes. When defining link states, remember the standard cascade order: <strong>L</strong>ink → <strong>V</strong>isited → <strong>H</strong>over → <strong>A</strong>ctive (<strong>LVHA</strong>):</p><ul><li><code>a:link</code>: An unvisited link.</li><li><code>a:visited</code>: A link the user has previously navigated to.</li><li><code>a:hover</code>: When the cursor pointer hovers over the element.</li><li><code>a:active</code>: The precise millisecond the link is pressed/clicked down.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Interactive Link States in LVHA Order */
a {
  color: #0077cc;
  text-decoration: none;
  font-size: 18px;
}

/* 1. Visited link */
a:visited {
  color: #7c3aed; /* Subtle purple for visited links */
}

/* 2. Hover state — instant visual feedback */
a:hover {
  color: #ea580c;
  text-decoration: underline;
}

/* 3. Active click state */
a:active {
  color: #dc2626;
  transform: translateY(1px);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Styled Links Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-styled-links?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-styled-links?file=index.html</a></p>',
    },

    // ── Customizing List Markers ──
    { id: nextId(), type: "heading" as const, content: "3. Customizing List Markers with list-style-type 📋" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>list-style-type</code> property lets you swap out standard discs and numbers for custom geometric shapes or numbering systems:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Unordered List Options: disc (default), circle, square, none */
ul.square-list {
  list-style-type: square;
  padding-left: 24px;
}

/* Ordered List Options: decimal (default), upper-roman, lower-alpha, etc. */
ol.roman-list {
  list-style-type: upper-roman; /* I, II, III, IV */
  padding-left: 24px;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Styled Lists Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-styled-lists?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-styled-lists?file=index.html</a></p>',
    },

    // ── Resetting Default List Styles & Custom Cards ──
    { id: nextId(), type: "heading" as const, content: "4. Resetting Lists into Custom UI Cards 🗂️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To build custom widgets from semantic lists, reset the browser's default bullets, margins, and padding using <code>list-style: none</code>, <code>padding: 0</code>, and <code>margin: 0</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* List Reset & Component Card Styling */
ul.custom-card-list {
  list-style: none; /* Strips bullets */
  padding: 0;
  margin: 0;
}

ul.custom-card-list li {
  padding: 14px 18px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

ul.custom-card-list li:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Custom List Items Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-remove-default-lists?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-remove-default-lists?file=index.html</a></p>',
    },

    // ── Lists in Navigation Menus ──
    { id: nextId(), type: "heading" as const, content: "5. Semantic Flexbox Navigation Menus 🧭" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Professional web applications always use <code>&lt;nav&gt;&lt;ul&gt;&lt;li&gt;&lt;a&gt;</code> for accessible, screen-reader friendly navigation bars, then arrange them horizontally using <strong>CSS Flexbox</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Accessible Semantic Navigation -->
<nav class="navbar">
  <ul class="nav-menu">
    <li><a href="#home" class="nav-link">Home</a></li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#services" class="nav-link">Services</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
  </ul>
</nav>

<style>
  /* Flexbox Navbar Layout */
  .nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 24px;
    align-items: center;
  }

  .nav-link {
    color: #334155;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .nav-link:hover {
    color: #2563eb;
    background-color: #eff6ff;
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Common Beginner Mistakes ──
    { id: nextId(), type: "heading" as const, content: "6. Common Beginner Mistakes ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Removing Underlines Without Any Visual Affordance:</strong> If you use <code>text-decoration: none</code>, always ensure the link has distinct contrast, color, or hover feedback so users know it is clickable.</li><li><strong>Ignoring List Padding When Stripping Bullets:</strong> Setting only <code>list-style: none</code> leaves the browser's default <code>40px</code> left padding intact. Always reset both <code>padding: 0</code> and <code>margin: 0</code>.</li><li><strong>Violating LVHA Order:</strong> Declaring <code>a:hover</code> before <code>a:visited</code> can prevent hover effects from triggering on visited links due to CSS cascade specificity rules.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Links & Lists Styling Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property / Selector</th><th style=\"padding:8px;\">Value Examples</th><th style=\"padding:8px;\">Usage / Purpose</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>a:hover</code></td><td style=\"padding:8px;\"><code>color: #ea580c;</code></td><td style=\"padding:8px;\">Visual feedback when mouse hovers over link</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>a:active</code></td><td style=\"padding:8px;\"><code>color: red;</code></td><td style=\"padding:8px;\">Immediate feedback during mouse press/click</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>a:visited</code></td><td style=\"padding:8px;\"><code>color: purple;</code></td><td style=\"padding:8px;\">Distinguishes already visited URLs</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>list-style-type</code></td><td style=\"padding:8px;\"><code>square</code>, <code>upper-roman</code></td><td style=\"padding:8px;\">Customizes marker shapes/numbering format</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>list-style: none;</code></td><td style=\"padding:8px;\"><code>none</code></td><td style=\"padding:8px;\">Completely removes list markers</td></tr><tr><td style=\"padding:8px;\"><code>display: flex; gap: 20px;</code></td><td style=\"padding:8px;\">Applied on <code>&lt;ul&gt;</code></td><td style=\"padding:8px;\">Creates horizontal navigation bar layout</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 25: CSS Links and Lists — Styling Navigation and Content 🔗" (id: 57)
    const collectionTitle = "Lesson 25: CSS Links and Lists — Styling Navigation and Content 🔗";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^links and lists$/i },
        { title: /^css links and lists/i },
        { title: /^lesson 25/i },
        { id: 57 },
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

    console.log("🎉 Done! CSS Lesson 25 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
