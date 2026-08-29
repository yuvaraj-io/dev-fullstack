/**
 * Seed Script: "Lesson 15 — HTML Attributes"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson15.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson15.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*eA6WL5vYkKKNSqfsrF6XeA.png",
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
        "<p>Think of buying a new smartphone. Every phone is still a smartphone, but each one has different properties such as color, storage capacity, camera quality, and screen size. These properties don't change what the phone is — they simply provide more information about it.</p><p>HTML elements work similarly: <strong>HTML elements define what something is, while HTML attributes define how it behaves.</strong></p>",
    },

    // ── What Are HTML Attributes? ──
    { id: nextId(), type: "heading" as const, content: "What Are HTML Attributes?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>attribute</strong> provides extra metadata or modifies the default behavior of an HTML element. Attributes are always written <strong>inside the opening tag</strong>, typically formatted as <code>name=\"value\"</code> pairs.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="https://example.com">Visit Website</a>
<img src="mountain.jpg" alt="Mountain Landscape">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Common HTML Attributes ──
    { id: nextId(), type: "heading" as const, content: "Common HTML Attributes" },

    // id & class
    { id: nextId(), type: "heading" as const, content: "1. id and class" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>id</code>: Unique identifier for a single element on the page (used for label binding, CSS, and JS).</li><li><code>class</code>: Non-unique classification shared across multiple elements for shared styling and scripts.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p id="intro">Welcome to my website!</p>
<p class="highlight">HTML is fun!</p>
<p class="highlight">CSS makes it beautiful!</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // style & title
    { id: nextId(), type: "heading" as const, content: "2. style and title" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>style</code>: Applies inline CSS directly to an element.</li><li><code>title</code>: Displays a native tooltip when the user hovers over the element.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p style="color: blue;" title="I am a tooltip!">Hover over me.</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // href, src, alt, dimensions
    { id: nextId(), type: "heading" as const, content: "3. href, src, alt, width & height" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>href</code>: Destination URL for hyperlinks.</li><li><code>src</code>: Source file path for media (images, audio, video, scripts).</li><li><code>alt</code>: Alternative text for accessibility and fallback.</li><li><code>width</code> & <code>height</code>: Explicit pixel dimensions to prevent Cumulative Layout Shifts (CLS).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="https://example.com">Visit Website</a>
<img src="mountain.jpg" alt="Beautiful Mountain" width="300" height="200">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // Form attributes: placeholder, disabled, readonly
    { id: nextId(), type: "heading" as const, content: "4. Form Attributes (placeholder, disabled, readonly)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input type="text" placeholder="Enter your name">
<button disabled>Submit</button>
<input type="text" value="Admin" readonly>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>placeholder</code>: Temporary text hint inside an input.</li><li><code>disabled</code>: Makes control unclickable and uneditable.</li><li><code>readonly</code>: Value cannot be modified, but users can still focus and copy the text.</li></ul>",
    },

    // ── Boolean Attributes ──
    { id: nextId(), type: "heading" as const, content: "Boolean Attributes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Boolean attributes do not require a value — their presence alone activates the behavior:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input type="text" required>
<input type="checkbox" checked>
<button disabled>Submit</button>
<option selected>India</option>
<select multiple></select>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Global Attributes ──
    { id: nextId(), type: "heading" as const, content: "Global Attributes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Global attributes can be used on virtually <em>any</em> HTML element. Standard global attributes include: <code>id</code>, <code>class</code>, <code>style</code>, <code>title</code>, <code>hidden</code>, <code>tabindex</code>, and <code>lang</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h1 id="main-title" class="primary-text" title="Welcome Heading">Welcome</h1>
<p hidden>This content is hidden from view.</p>`,
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
        "<ol><li><strong>Use attributes with purpose:</strong> Only add attributes that provide meaningful functionality or metadata.</li><li><strong>Keep all <code>id</code> values strictly unique:</strong> Never repeat an ID on the same page.</li><li><strong>Use semantic class names:</strong> Name classes by purpose rather than specific colors/positions.</li><li><strong>Avoid inline CSS styles:</strong> Prefer external stylesheets over the <code>style</code> attribute.</li><li><strong>Always provide descriptive <code>alt</code> text:</strong> Essential for screen readers and SEO.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Attributes provide extra information and modify element behavior inside opening tags.</li><li>Covered attributes: <code>id</code>, <code>class</code>, <code>style</code>, <code>title</code>, <code>href</code>, <code>src</code>, <code>alt</code>, <code>width</code>, <code>height</code>, <code>placeholder</code>, <code>disabled</code>, and <code>readonly</code>.</li><li><strong>Boolean attributes</strong> function purely by their presence.</li><li><strong>Global attributes</strong> can be applied across nearly all HTML elements.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-15-html-attributes?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-15-html-attributes?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML elements define the structure of a webpage, but <strong>attributes bring those elements to life</strong>. They instruct browsers on how elements should behave, where resources are located, and how users interact with the page.</p><p>Understanding when and why to use attributes is an essential step toward writing clean, accessible, and professional webpages.</p>",
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

    const collectionTitle = "Lesson 15: HTML Attributes";
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

    console.log("🎉 Done! Lesson 15 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
