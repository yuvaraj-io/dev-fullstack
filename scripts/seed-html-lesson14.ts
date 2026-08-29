/**
 * Seed Script: "Lesson 14 — HTML <select> Element & Range Input — Letting Users Choose with Ease"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson14.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson14.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*TCsNTsS5-TVqMBOkso28fw.png",
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
        "<p>Imagine building an online form where users select their country, favorite programming language, or rate their experience from 1 to 10. Asking them to type these values manually can lead to spelling mistakes (<em>India</em> vs <em>india</em> vs <em>Inda</em>), causing data inconsistency.</p><p>HTML solves this with controls designed specifically for <strong>selecting</strong> values instead of typing: the <strong><code>&lt;select&gt;</code></strong> dropdown element and the <strong>Range Input (<code>type=\"range\"</code>)</strong> slider.</p>",
    },

    // ── The <select> Element ──
    { id: nextId(), type: "heading" as const, content: "The <select> & <option> Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;select&gt;</code> element creates a dropdown menu container, and each selectable choice inside it is defined by an <code>&lt;option&gt;</code> element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="country">Country:</label>
<select id="country" name="country">
    <option value="in">India</option>
    <option value="us">USA</option>
    <option value="jp">Japan</option>
    <option value="au">Australia</option>
</select>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Important Attributes of <select> ──
    { id: nextId(), type: "heading" as const, content: "Key Attributes for Dropdowns" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>name</code>: Field name submitted with form payload.</li><li><code>id</code>: Unique ID linked with <code>&lt;label for=\"id\"&gt;</code>.</li><li><code>selected</code>: Pre-selects a default option when the page loads.</li><li><code>disabled</code>: Renders an option inactive/unselectable.</li><li><code>multiple</code>: Allows selecting multiple options (holding Ctrl/Cmd).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<select id="framework" name="framework">
    <option disabled>Select a Framework</option>
    <option value="react" selected>React</option>
    <option value="vue">Vue</option>
    <option value="angular">Angular</option>
</select>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Multiple Selection ──
    { id: nextId(), type: "heading" as const, content: "Multiple Selection (<select multiple>)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="skills">Skills (Hold Ctrl/Cmd to select multiple):</label>
<select id="skills" name="skills" multiple>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="python">Python</option>
</select>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Grouping with <optgroup> ──
    { id: nextId(), type: "heading" as const, content: "Grouping Options with <optgroup>" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For long lists, <code>&lt;optgroup label=\"...\"&gt;</code> groups related options under visual category headings:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="location">Location:</label>
<select id="location" name="location">
    <optgroup label="Asia">
        <option value="in">India</option>
        <option value="jp">Japan</option>
        <option value="cn">China</option>
    </optgroup>
    <optgroup label="Europe">
        <option value="de">Germany</option>
        <option value="fr">France</option>
        <option value="it">Italy</option>
    </optgroup>
</select>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Range Input ──
    { id: nextId(), type: "heading" as const, content: 'Range Input (type="range")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For adjustments like volume, screen brightness, satisfaction ratings, or price filters, dragging a slider is much more intuitive than typing a number. HTML provides <code>&lt;input type=\"range\"&gt;</code> for this purpose.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="brightness">Brightness:</label>
<input
    type="range"
    id="brightness"
    name="brightness"
    min="0"
    max="100"
    step="10"
    value="50">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>min</code>: Minimum range value.</li><li><code>max</code>: Maximum range value.</li><li><code>step</code>: Granularity of each slider step movement.</li><li><code>value</code>: Initial / default position.</li></ul>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Use dropdown menus for predefined option lists:</strong> Prevents spelling errors and ensures structured data.</li><li><strong>Organize large option sets with <code>&lt;optgroup&gt;</code>:</strong> Makes long dropdowns easier to scan.</li><li><strong>Use range inputs for slider-friendly scales:</strong> Ideal for volume, zoom, price range filters, or ratings.</li><li><strong>Set sensible min, max, and step intervals:</strong> Gives users precise control over slider adjustments.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;select&gt;</code> & <code>&lt;option&gt;</code> create dropdown menus.</li><li>Attributes: <code>selected</code>, <code>disabled</code>, <code>multiple</code>, and <code>&lt;optgroup&gt;</code>.</li><li><code>&lt;input type=\"range\"&gt;</code> provides an interactive numeric slider with <code>min</code>, <code>max</code>, <code>step</code>, and <code>value</code>.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-14-html-select-element?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-14-html-select-element?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Not every form requires users to type information. Choosing from a list with <code>&lt;select&gt;</code> or sliding a value with <code>type=\"range\"</code> provides a faster, cleaner, and more intuitive user experience.</p><p>Stay tuned for the next lesson!</p>",
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

    const collectionTitle = "Lesson 14: HTML <select> Element & Range Input – Letting Users Choose with Ease";
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

    console.log("🎉 Done! Lesson 14 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
