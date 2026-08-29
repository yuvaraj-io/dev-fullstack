/**
 * Seed Script: "Lesson 10 — Types of HTML Elements and Nesting Elements"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson10.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson10.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*HpQz3xKDD9T7WBZgb-Qz1g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Not Every HTML Element Behaves the Same Way" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Welcome back!</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By now, you've learned how to create the structure of a webpage, organize content with headings and paragraphs, add hyperlinks, display images, videos, and audio, and organize information using HTML lists. Although you've already used many HTML elements, they don't all behave the same way. Just as different parts of a house have different purposes, each HTML element is designed for a specific job, and browsers interpret them accordingly.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this lesson, you'll explore the different types of HTML elements based on their behavior and learn how elements can be placed inside one another — a concept known as <strong>nesting</strong> — to create clean and well-structured webpages.</p>",
    },

    // ── Block-Level Elements ──
    { id: nextId(), type: "heading" as const, content: "Block-Level Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine you're reading a newspaper. Every headline and paragraph starts on a new line, making the content easy to read and follow. Webpages work in the same way. Larger sections of content need their own space, which is why HTML provides <strong>block-level elements</strong>.</p><p>A <strong>block-level element</strong> automatically starts on a new line and occupies the available width of its parent container. When the browser encounters a block-level element, it places it on its own line before displaying the next element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<div>This is a division.</div>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Each one appears on a separate line, creating a clear and organized layout without needing <code>&lt;br&gt;</code> tags.</p>",
    },

    // ── Common Block Elements ──
    { id: nextId(), type: "heading" as const, content: "Common Block-Level Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>: Display headings of different levels.</li><li><code>&lt;p&gt;</code>: Represents a paragraph of text.</li><li><code>&lt;div&gt;</code>: Generic container to group related elements together for layout and styling.</li><li><code>&lt;section&gt;</code>: Represents a logical standalone section of a webpage.</li><li><code>&lt;article&gt;</code>: Represents self-contained content such as a blog post or news story.</li><li><code>&lt;header&gt;</code> / <code>&lt;footer&gt;</code>: Introductory and concluding blocks for pages or sections.</li><li><code>&lt;ul&gt;</code> / <code>&lt;ol&gt;</code> / <code>&lt;li&gt;</code>: List containers and items.</li></ul>",
    },

    // ── Inline Elements ──
    { id: nextId(), type: "heading" as const, content: "Inline Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Not every piece of content on a webpage needs its own line. If you want to make a single word bold or turn one phrase into a hyperlink, starting a new line would disrupt the flow of the sentence.</p><p>An <strong>inline element</strong> occupies only the space it needs and stays within the surrounding content. Instead of beginning on a new line, it appears naturally alongside the text before and after it.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>This is <strong>bold</strong> text.</p>
<p>This is <a href="#">a link</a>.</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Common Inline Elements ──
    { id: nextId(), type: "heading" as const, content: "Common Inline Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;span&gt;</code>: Generic container to style or script small portions of inline text.</li><li><code>&lt;a&gt;</code>: Creates hyperlinks within paragraphs or text blocks.</li><li><code>&lt;strong&gt;</code>: Indicates strong importance (rendered bold).</li><li><code>&lt;em&gt;</code>: Adds emphasis (rendered italic).</li><li><code>&lt;img&gt;</code>: Displays an image within surrounding flow.</li><li><code>&lt;label&gt;</code>: Labels for form input controls.</li><li><code>&lt;code&gt;</code>: Formats inline computer code snippets.</li></ul>",
    },

    // ── Comparison Table / Summary ──
    { id: nextId(), type: "heading" as const, content: "Block-Level vs Inline Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Block-Level Elements:</strong> Always start on a new line, take up the full container width by default, and are used for macro structure (e.g. <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;section&gt;</code>).</li><li><strong>Inline Elements:</strong> Do not start on a new line, take only as much width as necessary, and are used for micro formatting within text (e.g. <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>).</li></ul>",
    },

    // ── Void Elements ──
    { id: nextId(), type: "heading" as const, content: "Void (Self-Closing) Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Where is the closing <code>&lt;/img&gt;</code> tag? There isn't one. An image doesn't wrap text content; its job is simply to tell the browser which image resource to load. Elements that contain no text or child tags are officially called <strong>void elements</strong> (also commonly referred to as self-closing elements).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Common Void Elements in HTML -->
<img src="image.jpg" alt="Mountain">
<br>
<hr>
<input type="text">
<meta charset="UTF-8">
<link rel="stylesheet" href="style.css">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;img&gt;</code>: Embeds an image.</li><li><code>&lt;br&gt;</code>: Inserts a single line break.</li><li><code>&lt;hr&gt;</code>: Displays a thematic horizontal divider rule.</li><li><code>&lt;input&gt;</code>: Form input element.</li><li><code>&lt;meta&gt;</code>: Page metadata in <code>&lt;head&gt;</code>.</li><li><code>&lt;link&gt;</code>: External stylesheet or resource link.</li></ul>",
    },

    // ── Nesting HTML Elements ──
    { id: nextId(), type: "heading" as const, content: "Nesting HTML Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>As webpages become more complex, a single element is not enough. HTML elements are placed <strong>inside other HTML elements</strong> to create a meaningful hierarchy. This concept is called <strong>nesting</strong> — like boxes inside larger boxes or rooms inside a house.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<div>
    <p>This is a paragraph inside a div.</p>
</div>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Correct vs Incorrect Nesting ──
    { id: nextId(), type: "heading" as const, content: "Correct vs Incorrect Nesting" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML elements must always be <strong>closed in the reverse order in which they were opened</strong> (First In, Last Out). Close child elements before closing their parent elements.</p><p><strong>✅ Correct Nesting:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<div>
    <p>This is a paragraph with <strong>bold</strong> text.</p>
</div>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>❌ Incorrect Nesting:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>
    This is a paragraph.
    <div>Div inside paragraph.</div>
</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the incorrect example, tags overlap inappropriately (or place block-level containers like <code>&lt;div&gt;</code> inside inline/paragraph elements). Always write properly nested HTML to ensure predictable rendering across all browsers.</p>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Use block-level elements</strong> for larger sections of content such as headings, paragraphs, and page containers.</li><li><strong>Use inline elements</strong> only for small pieces of content within a sentence, such as links, bold text, or inline icons.</li><li><strong>Remember that void elements never have closing tags</strong>, since they don't contain any inner content.</li><li><strong>Always follow proper nesting rules</strong> by closing child elements before their parent elements.</li><li><strong>Indent nested elements consistently</strong> (2 or 4 spaces) to keep your code clean, readable, and easy to debug.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Block-level elements:</strong> Start on a new line and take full width.</li><li><strong>Inline elements:</strong> Flow naturally within text and take only needed width.</li><li><strong>Void elements:</strong> Self-contained tags without closing tags (<code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;input&gt;</code>).</li><li><strong>Nesting:</strong> Placing elements inside one another following strict opening and closing order.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-10-types-of-html-elements-and-nesting-elements?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-10-types-of-html-elements-and-nesting-elements?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Understanding how different HTML elements behave is an important step toward writing clean, well-structured webpages. Choosing the right type of element and nesting it correctly not only improves readability but also helps browsers, search engines, and assistive technologies interpret your content accurately.</p><p>In the next lesson, we'll explore <strong>Semantic HTML Elements</strong>, where you'll learn how to use elements such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> to give your webpages meaningful structure beyond their visual appearance.</p>",
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

    const collectionTitle = "Lesson 10: Types of HTML Elements and Nesting Elements";
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

    console.log("🎉 Done! Lesson 10 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
