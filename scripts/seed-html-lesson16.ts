/**
 * Seed Script: "Lesson 16 — HTML Tables — Organizing Information into Rows and Columns"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson16.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson16.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*qPF8pQgmtlWidvm1ZE3Snw.png",
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
        "<p>Think about a school marksheet, cricket scorecard, train timetable, or pricing comparison table. All of them present information arranged neatly into <strong>rows and columns</strong>.</p><p>HTML provides the <code>&lt;table&gt;</code> element to structure relational tabular data clearly for both users and search engines.</p>",
    },

    // ── Basic Structure of an HTML Table ──
    { id: nextId(), type: "heading" as const, content: "Basic Structure of an HTML Table" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
    </tr>
    <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
    </tr>
    <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
    </tr>
</table>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:531/1*SOY8ONmogmau1SCPIyf-jQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Understanding Table Elements ──
    { id: nextId(), type: "heading" as const, content: "Core Table Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;table&gt;</code>: Root wrapper container for the entire table.</li><li><code>&lt;tr&gt;</code> (Table Row): Defines a horizontal row of cells.</li><li><code>&lt;th&gt;</code> (Table Header): Defines a heading cell (rendered in <strong>bold</strong> and <strong>center-aligned</strong> by default).</li><li><code>&lt;td&gt;</code> (Table Data): Defines a standard data cell holding values or content.</li></ul>",
    },

    // ── Table Attributes (Legacy vs Modern) ──
    { id: nextId(), type: "heading" as const, content: "Table Attributes (border, cellpadding, cellspacing)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<table border="1" cellpadding="10" cellspacing="5" width="50%">
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>28</td>
        <td>New York</td>
    </tr>
    <tr>
        <td>Jane Smith</td>
        <td>34</td>
        <td>Los Angeles</td>
    </tr>
</table>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>border=\"1\"</code>: Adds basic visual borders around table and cells.</li><li><code>cellpadding=\"10\"</code>: Adds inner spacing inside each cell.</li><li><code>cellspacing=\"5\"</code>: Adds outer space between individual cells.</li><li><code>width=\"50%\"</code>: Sets the table width relative to its parent container.</li></ul>",
    },

    // ── Colspan and Rowspan ──
    { id: nextId(), type: "heading" as const, content: "Merging Cells: colspan and rowspan 📊" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Real-world tables often require cells that span across multiple rows or columns:</p><ul><li><code>colspan=\"n\"</code>: Merges a cell horizontally across <em>n</em> columns.</li><li><code>rowspan=\"n\"</code>: Merges a cell vertically across <em>n</em> rows.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<table border="1">
    <tr>
        <th colspan="2">Personal Info</th>
        <th>Contact Info</th>
    </tr>
    <tr>
        <td rowspan="2">John Doe</td>
        <td>Age: 28</td>
        <td>Email: john@example.com</td>
    </tr>
    <tr>
        <td>City: New York</td>
        <td>Phone: 123-456-7890</td>
    </tr>
</table>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Nested Tables ──
    { id: nextId(), type: "heading" as const, content: "Nested Tables" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A table can be placed inside a <code>&lt;td&gt;</code> of another table to represent multi-level or hierarchical data:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<table border="1">
    <tr>
        <th>Name</th>
        <th>Details</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>
            <table border="1">
                <tr>
                    <td>Age: 28</td>
                    <td>City: New York</td>
                </tr>
            </table>
        </td>
    </tr>
</table>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Styling Tables with CSS ──
    { id: nextId(), type: "heading" as const, content: "Modern Styling with CSS 🎨" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
    }
    th {
        background-color: #f4f4f4;
        font-weight: 600;
    }
    tr:hover {
        background-color: #f9f9f9;
    }
</style>

<table>
    <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Location</th>
    </tr>
    <tr>
        <td>Yuvaraj S</td>
        <td>Full Stack Developer</td>
        <td>Chennai</td>
    </tr>
</table>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Quick Summary ──
    { id: nextId(), type: "heading" as const, content: "Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;table&gt;</code> defines the table boundary.</li><li><code>&lt;tr&gt;</code> defines rows, <code>&lt;th&gt;</code> defines headers, and <code>&lt;td&gt;</code> holds cell data.</li><li>Use <code>colspan</code> to span horizontally and <code>rowspan</code> to span vertically.</li><li>Use modern CSS (<code>border-collapse: collapse;</code>, <code>padding</code>) for clean, responsive styling.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-16-html-tables?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-16-html-tables?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML tables provide an organized way to display structured, relational information in rows and columns. While CSS grid and flexbox are preferred for overall page layouts today, <code>&lt;table&gt;</code> remains the standard semantic choice for tabular data.</p>",
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

    const collectionTitle = "Lesson 16: HTML Tables — Organizing Information into Rows and Columns";
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

    console.log("🎉 Done! Lesson 16 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
