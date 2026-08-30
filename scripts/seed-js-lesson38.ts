/**
 * Seed Script: JavaScript "Lesson 38: Browser Object Model (BOM) in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson38.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson38.ts
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
        "<p>In this lesson, we introduce the <strong>Browser Object Model (BOM)</strong> in JavaScript.</p><p>While the Document Object Model (DOM) is concerned with the HTML markup inside the page, the <strong>BOM</strong> enables JavaScript to interact with everything outside the document window — including URLs, session history, browser navigation, and screen dimensions.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*2YDSE-mVfjxVAsDbq2_M3g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-38-browser-object-model-bom-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-38-browser-object-model-bom-in-javascript?file=script.js</a></p>',
    },

    // ── DOM vs BOM ──
    { id: nextId(), type: "heading" as const, content: "🌐 DOM vs BOM" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>DOM (Document Object Model):</strong> Represents HTML elements inside the viewport (<code>document.body</code>, tags, styles, events).</li><li><strong>BOM (Browser Object Model):</strong> Represents the browser host environment surrounding the document (window size, URLs, tabs, history, screen info).</li></ul><blockquote><p><em>DOM = “Inside the Page” | BOM = “Outside the Page”</em></p></blockquote>",
    },

    // ── 1. window Object ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ window Object (Root Level)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>window</code> object represents the entire browser window/tab. All global JavaScript variables, functions, and other BOM objects are attached as properties of <code>window</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(window.innerWidth);  // Width of viewport in pixels
console.log(window.innerHeight); // Height of viewport in pixels

// Dialog alerts
window.alert("Hello from BOM!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. location Object ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ location Object (URL & Navigation)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>window.location</code> object inspects the current URL and allows programmatic redirects or reloads:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(location.href);     // Full URL: "https://example.com/blog?id=10"
console.log(location.hostname); // Hostname: "example.com"
console.log(location.pathname); // Pathname: "/blog"
console.log(location.protocol); // Protocol: "https:"

// Redirect to another URL:
// location.href = "https://www.google.com";

// Reload current page:
// location.reload();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. navigator Object ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ navigator Object (Browser & Device Info)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>navigator</code> object provides metadata regarding the user's browser, preferred language, operating system platform, and network status:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(navigator.userAgent); // User agent header string
console.log(navigator.language);  // e.g., "en-US"
console.log(navigator.platform);  // e.g., "MacIntel", "Win32"
console.log(navigator.onLine);    // boolean (true when online)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. screen Object ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ screen Object (Display Characteristics)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>screen</code> object holds specifications about the user's physical screen display (outside of the browser boundaries):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(screen.width);       // Total screen width
console.log(screen.height);      // Total screen height
console.log(screen.availWidth);  // Screen width minus OS taskbars
console.log(screen.availHeight); // Screen height minus OS taskbars
console.log(screen.colorDepth);  // Bit depth of screen color palette`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. history Object ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ history Object (Session History)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>window.history</code> object allows navigating back and forth through the browser's session history:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `history.back();    // Navigates back 1 page (like clicking Back button)
history.forward(); // Navigates forward 1 page
history.go(-2);    // Navigates back 2 pages`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary: BOM Architecture" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>window</code></strong>: Global root object holding all BOM objects and global variables.</li><li><strong><code>location</code></strong>: Read/manipulate current URL, query strings, and redirects.</li><li><strong><code>navigator</code></strong>: System information, language, and network connectivity.</li><li><strong><code>screen</code></strong>: Physical monitor dimensions and resolution characteristics.</li><li><strong><code>history</code></strong>: Programmatic tab navigation across browsing session history.</li></ul>",
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
    const collectionTitle = "Lesson 38: Browser Object Model (BOM) in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 38;

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

    console.log("🎉 Done! JS Lesson 38 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
