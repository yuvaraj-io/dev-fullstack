/**
 * Seed Script: JavaScript "Lesson 41: Difference between innerText and textContent in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson41.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson41.ts
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
        "<p>In this lesson, we examine the crucial differences between three DOM content properties: <strong><code>innerText</code></strong>, <strong><code>textContent</code></strong>, and <strong><code>innerHTML</code></strong>.</p><p>Understanding how each property interprets whitespace, handles rendered CSS layout visibility, and parses HTML tags is key to preventing layout thrashing and unintended formatting bugs.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*xeKh9q2UZ8E3BVXkztKMHg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-41-innertext-vs-textcontent-vs-innerhtml?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-41-innertext-vs-textcontent-vs-innerhtml?file=script.js</a></p>',
    },

    // ── Base HTML Setup ──
    { id: nextId(), type: "heading" as const, content: "The HTML Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p id="para">
  Frontend <b>Development</b> involves
  <a href="#">Graphical User Interface</a>
</p>

<script>
  const paragraph = document.querySelector('p');
</script>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 1. innerHTML ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ innerHTML: The Entire HTML Markup" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>innerHTML</code> reads or sets the complete HTML string inside an element, including nested child tags and attributes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(paragraph.innerHTML);
// Output:
// Frontend <b>Development</b> involves <a href="#">Graphical User Interface</a>

// Setting new HTML structure:
paragraph.innerHTML = "<h4>Hi</h4>"; // Replaces children with an <h4> tag`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. innerText ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ innerText: Only Rendered & Visible Text" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>innerText</code> represents what is <strong>visually rendered on screen</strong>. It triggers layout calculations, normalizes whitespace, and <strong>ignores hidden elements</strong> (e.g., <code>display: none</code>, <code>visibility: hidden</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// HTML:
// <p id="para">
//   Frontend <b>Development</b> involves
//   <span style="display: none;">Hidden Part</span>
// </p>

console.log(paragraph.innerText);
// Output: "Frontend Development involves"
// (Hidden span is omitted, multiple spaces collapsed)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. textContent ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ textContent: Raw Text Node Content" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>textContent</code> returns the raw text from all child nodes exactly as defined in the source HTML, including hidden elements, line breaks (<code>\\n</code>), and exact indentation spaces without forcing a CSS reflow:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(paragraph.textContent);
// Output:
//   Frontend Development involves
//   Graphical User Interface
// (Preserves exact raw indentation and hidden node content)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. CSS Visibility, Opacity, and Pointer Events ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ How CSS Affects innerText vs textContent" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>display: none</code> / <code>visibility: hidden</code>: Excluded from <code>innerText</code>, but <strong>included</strong> in <code>textContent</code>.</li><li><code>opacity: 0</code>: <strong>Included</strong> in both <code>innerText</code> and <code>textContent</code> (the element occupies space in the render tree).</li><li><code>pointer-events: none</code>: Included in both properties.</li></ul>",
    },

    // ── Comparison Table & Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Comparison & Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property</th><th style=\"padding:8px;\">HTML Parsing</th><th style=\"padding:8px;\">Considers CSS / Visibility</th><th style=\"padding:8px;\">Performance</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>innerHTML</code></td><td style=\"padding:8px;\">Yes (parses tags)</td><td style=\"padding:8px;\">No</td><td style=\"padding:8px;\">Slower (reparses DOM tree)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>innerText</code></td><td style=\"padding:8px;\">No (plain text)</td><td style=\"padding:8px;\">Yes (layout-aware, excludes hidden text)</td><td style=\"padding:8px;\">Moderate (triggers reflow)</td></tr><tr><td style=\"padding:8px;\"><code>textContent</code></td><td style=\"padding:8px;\">No (plain text)</td><td style=\"padding:8px;\">No (returns raw node content)</td><td style=\"padding:8px;\">Fastest (no reflow)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 41: Difference between innerText and textContent in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 41;

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

    console.log("🎉 Done! JS Lesson 41 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
