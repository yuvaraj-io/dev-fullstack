/**
 * Seed Script: JavaScript "Lesson 42: getAttribute() and setAttribute() in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson42.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson42.ts
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
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this lesson, we explore how to read, create, and modify HTML element attributes dynamically using JavaScript's built-in <strong><code>getAttribute()</code></strong> and <strong><code>setAttribute()</code></strong> methods.</p><p>We will also compare these explicit attribute methods with direct DOM property access (such as <code>element.id</code> and <code>element.className</code>).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*cMAusUZ28g_HNwHhRcqQ1w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-42-getattribute-and-setattribute?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-42-getattribute-and-setattribute?file=script.js</a></p>',
    },

    // ── 1. What Are HTML Attributes? ──
    { id: nextId(), type: "heading" as const, content: "🏷️ What Are HTML Attributes?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Attributes are <strong>name-value pairs</strong> declared inside an HTML element's opening tag. They can be standard HTML attributes (<code>id</code>, <code>class</code>, <code>href</code>, <code>src</code>) or custom <code>data-*</code> attributes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Standard attributes -->
<h2 class="title" style="color: red;">Hello World</h2>

<!-- Custom attributes -->
<h2 data-info="example" hello="world">Custom Attribute Example</h2>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. CSS Attribute Selectors ──
    { id: nextId(), type: "heading" as const, content: "🎨 Targeting Attributes in CSS" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Match any h2 with data-info attribute */
h2[data-info] {
  color: orange;
}

/* Match h2 with specific data-info value */
h2[data-info="example"] {
  color: red;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── 3. getAttribute() Method ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Reading Attributes with getAttribute()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>element.getAttribute(name)</code> retrieves the value of the specified attribute as a string (or <code>null</code> if it does not exist):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const element = document.querySelector("h2");

console.log(element.getAttribute("data-info")); // "example"
console.log(element.getAttribute("hello"));     // "world"
console.log(element.getAttribute("missing"));   // null`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. setAttribute() Method ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Setting & Modifying Attributes with setAttribute()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>element.setAttribute(name, value)</code> creates a new attribute or updates its value if it already exists:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const heading = document.querySelector("h1");

// Set tooltip title:
heading.setAttribute("title", "Hello World!!!");

// Modify class & add custom data attribute:
heading.setAttribute("class", "highlight");
heading.setAttribute("data-course", "JavaScript");

console.log(heading.getAttribute("data-course")); // "JavaScript"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Direct Property Access vs getAttribute / setAttribute ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Direct Property Access vs getAttribute/setAttribute" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For standard HTML attributes, JavaScript DOM elements expose corresponding object properties (e.g., <code>element.id</code>, <code>element.className</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const heading = document.querySelector("h1");

// Direct property reads & writes:
console.log(heading.id);        // "heading"
console.log(heading.className); // "main-title"

heading.id = "newHeading";
heading.className = "highlight";

// Note: Custom attributes (like data-info or non-standard tags)
// MUST use getAttribute() / setAttribute() to be accessed.`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\"><code>getAttribute()</code> / <code>setAttribute()</code></th><th style=\"padding:8px;\">Direct Property Access (<code>element.id</code>)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Supported Attributes</td><td style=\"padding:8px;\">All attributes (standard + custom)</td><td style=\"padding:8px;\">Only predefined standard attributes</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Return Value</td><td style=\"padding:8px;\">Exact HTML attribute string value</td><td style=\"padding:8px;\">Live DOM property value (typed)</td></tr><tr><td style=\"padding:8px;\">Syntax Example</td><td style=\"padding:8px;\"><code>setAttribute(\"class\", \"box\")</code></td><td style=\"padding:8px;\"><code>element.className = \"box\"</code></td></tr></tbody></table>",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Use <strong><code>getAttribute(name)</code></strong> to read any attribute's value in the HTML tag.</li><li>Use <strong><code>setAttribute(name, value)</code></strong> to create or update attributes dynamically.</li><li>Direct property access (<code>.id</code>, <code>.className</code>) is convenient for standard properties, but <code>getAttribute</code>/<code>setAttribute</code> works uniformly for all standard and custom attributes.</li></ul>",
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

    // 1. Find topic "javascript"
    const topic = await db.collection("topics").findOne({ name: /^javascript$/i });
    if (!topic) throw new Error('Topic "javascript" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction"
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Create collection
    const collectionTitle = "Lesson 42: getAttribute() and setAttribute() in JavaScript";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // 4. Link section_collections
    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 42;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: nextOrder,
    });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    // 5. Create Blog
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
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

    console.log("🎉 Done! JS Lesson 42 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
