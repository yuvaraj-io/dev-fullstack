/**
 * Seed Script: "Lesson 11 — Semantic HTML — Writing Meaningful Webpages with Semantic Elements"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson11.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson11.ts
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
    // ── Hero image ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*kO8XiVYdDDnMbIlwarZvsg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>So far, you've learned many core concepts of HTML. As websites grow larger, however, simply displaying content isn't enough. Developers also need a way to organize different parts of a webpage so that both people and computers can understand them.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When HTML was first introduced, websites were fairly simple. Most pages contained only text, a few images, and some hyperlinks. Today, websites are much more advanced, featuring headers, navbars, main articles, sidebars, and footers. Before HTML5, developers organized all of these using generic <code>&lt;div&gt;</code> elements with custom classes/IDs (e.g. <code>&lt;div id=\"header\"&gt;</code>, <code>&lt;div id=\"nav\"&gt;</code>, <code>&lt;div id=\"footer\"&gt;</code>).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<div id="header"></div>
<div id="navigation"></div>
<div id="content"></div>
<div id="sidebar"></div>
<div id="footer"></div>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>While this looked fine visually, every <code>&lt;div&gt;</code> looked identical to search engines and screen readers. The element itself had <strong>no built-in semantic meaning</strong>.</p><p>To solve this, <strong>HTML5 introduced Semantic Elements</strong> that clearly describe the role and meaning of each section.</p>",
    },

    // ── What is Semantic HTML ──
    { id: nextId(), type: "heading" as const, content: "What is Semantic HTML?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The word <strong>semantic</strong> simply means <strong>having meaning</strong>. In HTML, semantic elements describe the purpose of their content instead of simply grouping it together.</p><ul><li><strong>Generic Containers:</strong> <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code> (provide zero context about the content).</li><li><strong>Semantic Elements:</strong> <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>.</li></ul><p><strong>Benefits of Semantic HTML:</strong></p><ul><li>Makes code easier to read and maintain.</li><li>Improves accessibility for screen readers and assistive technology.</li><li>Helps search engines (SEO) accurately identify key content.</li><li>Provides clear document outline for browsers.</li></ul>",
    },

    // ── Building a Semantic Webpage ──
    { id: nextId(), type: "heading" as const, content: "Core Semantic Elements" },

    // ── header ──
    { id: nextId(), type: "heading" as const, content: "The <header> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represents introductory content for a page or section, typically containing branding, logos, page titles, or search bars.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<header>
    <h1>Foodie's Restaurant</h1>
    <p>Fresh Food, Great Taste</p>
</header>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── nav ──
    { id: nextId(), type: "heading" as const, content: "The <nav> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Designates major navigation blocks containing links to navigate across the website.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<nav>
    <a href="index.html">Home</a>
    <a href="menu.html">Menu</a>
    <a href="contact.html">Contact</a>
</nav>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── main ──
    { id: nextId(), type: "heading" as const, content: "The <main> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Wraps the dominant, unique content of the document. Each webpage should contain only <strong>one</strong> <code>&lt;main&gt;</code> element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<main>
    <h2>Welcome to Our Restaurant</h2>
    <p>Enjoy delicious meals prepared by our expert chefs.</p>
</main>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── section & article ──
    { id: nextId(), type: "heading" as const, content: "The <section> vs <article> Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;section&gt;</code>: Groups related content under a thematic heading within a page.</li><li><code>&lt;article&gt;</code>: Self-contained, independently distributable content (e.g. blog posts, news stories, user comments).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<section>
    <h2>Our Special Dishes</h2>
    <article>
        <h3>5 Tips for Healthy Eating</h3>
        <p>Eating balanced meals helps you stay healthy and energetic.</p>
    </article>
</section>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── aside ──
    { id: nextId(), type: "heading" as const, content: "The <aside> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represents content indirectly related to the main content, such as sidebars, related article links, callout boxes, or author bios.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<aside>
    <h3>Related Articles</h3>
    <ul>
        <li>Healthy Breakfast Ideas</li>
        <li>Easy Dinner Recipes</li>
    </ul>
</aside>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── footer ──
    { id: nextId(), type: "heading" as const, content: "The <footer> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Represents the closing section of a webpage or component, usually housing copyright info, footer navigation, contact details, or back-to-top links.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<footer>
    <p>&copy; 2026 Foodie's Restaurant. All rights reserved.</p>
</footer>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── figure, figcaption & time ──
    { id: nextId(), type: "heading" as const, content: "Additional Semantic Elements (<figure>, <figcaption>, <time>)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;figure&gt;</code> and <code>&lt;figcaption&gt;</code>: Associate images or diagrams with descriptive captions.</li><li><code>&lt;time&gt;</code>: Marks dates and times in human- and machine-readable formats using the <code>datetime</code> attribute.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<figure>
    <img src="restaurant.jpg" alt="Restaurant Interior">
    <figcaption>Our newly renovated dining area.</figcaption>
</figure>

<p>Published on <time datetime="2026-07-30">July 30, 2026</time></p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Complete Semantic Layout Example ──
    { id: nextId(), type: "heading" as const, content: "Complete Semantic Layout Example" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<header>
    <h1>Foodie's Restaurant</h1>
</header>
<nav>
    <a href="#">Home</a>
    <a href="#">Menu</a>
    <a href="#">Contact</a>
</nav>
<main>
    <section>
        <h2>Today's Specials</h2>
        <article>
            <p>Enjoy our freshly prepared pasta and pizza.</p>
        </article>
    </section>
    <aside>
        <p>Customer Favorites</p>
    </aside>
</main>
<footer>
    <p>&copy; 2026 Foodie's Restaurant</p>
</footer>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Don't replace every <code>&lt;div&gt;</code> blindly:</strong> Use semantic tags when they accurately describe content structure; use <code>&lt;div&gt;</code> for purely visual/styling wrappers.</li><li><strong>Include headings inside sections:</strong> Helps give each <code>&lt;section&gt;</code> a clear purpose in the document outline.</li><li><strong>Only one <code>&lt;main&gt;</code> element per page:</strong> Represents the primary unique content.</li><li><strong>Choose tags based on meaning, not appearance:</strong> Always use CSS for layout and visual styling.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Semantic HTML</strong> provides meaningful structure beyond generic <code>&lt;div&gt;</code> tags.</li><li>Key elements include <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;figure&gt;</code>, <code>&lt;figcaption&gt;</code>, and <code>&lt;time&gt;</code>.</li><li>Dramatically improves SEO, accessibility, and code readability.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-11-semantic-html?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-11-semantic-html?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Semantic HTML helps you build webpages that are meaningful, organized, and easier for both humans and machines to understand. By choosing elements based on their purpose instead of relying entirely on generic <code>&lt;div&gt;</code> elements, you create cleaner, more accessible, and more maintainable HTML.</p><p>In the next lesson, we'll explore <strong>HTML Forms</strong>, where you'll learn how to collect information from users using text fields, buttons, checkboxes, radio buttons, and other form controls.</p>",
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

    const topic = await db.collection("topics").findOne({ name: "HTML" });
    if (!topic) throw new Error('Topic "HTML" not found. Run seed-html-lesson1.ts first.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "HTML" (id: ${topicId})`);

    const section = await db.collection("sections").findOne({ name: "Getting Started", topic_id: topicId });
    if (!section) throw new Error('Section "Getting Started" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "Getting Started" (id: ${sectionId})`);

    const collectionTitle = "Lesson 11: Semantic HTML — Writing Meaningful Webpages with Semantic Elements";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({ id: collectionId, title: collectionTitle, topics_id: topicId, title_index: null });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 1;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({ id: scId, sectionId, collectionId, topicId, order_no: nextOrder });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({ id: blogId, heading: collectionTitle, content: blocks, collections_id: collectionId });
    console.log(`✅ Created blog with ${blocks.length} blocks (id: ${blogId})\n`);

    console.log("┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Section-Collection ID: ${String(scId).padEnd(16)} │`);
    console.log(`│  Blog ID:               ${String(blogId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log(`│  Order in section:      ${String(nextOrder).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! Lesson 11 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
