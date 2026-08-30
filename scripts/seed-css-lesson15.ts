/**
 * Seed Script: CSS Lesson 15 — "Lesson 15: CSS Inheritance — How Styles Flow from Parent to Children"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson15.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson15.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*BJnpWFCjRTchIJNSNVy6Gw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Style Once, Cascade Everywhere 🌳" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine styling a webpage containing 50 paragraphs and 10 headings. If you had to explicitly write <code>color: #333; font-family: Inter;</code> on every single tag, your stylesheet would become gigantic and unmaintainable.</p><p>Instead, CSS provides <strong>Inheritance</strong>: declaring styles on a parent (like <code>&lt;body&gt;</code>) allows those properties to automatically flow down to child and grandchild elements.</p>",
    },

    // ── What is Inheritance ──
    { id: nextId(), type: "heading" as const, content: "1. What is CSS Inheritance? 🧬" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Setting typography once on the body container */
body {
  color: #1e293b;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}

/* All nested <p>, <span>, <div> elements automatically inherit these styles!
   No need to repeat them across dozens of selectors! */`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Natural Inheritance Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-inheritence?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-inheritence?file=index.html</a></p>',
    },

    // ── Inheritable vs Non-Inheritable Diagram ──
    { id: nextId(), type: "heading" as const, content: "2. Inheritable vs. Non-Inheritable Properties ⚖️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*-KizNbLxdg5pt9kHUzCTbQ.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>The Golden Rule of Thumb:</strong></p><ul><li><strong>Text and Typography properties ARE naturally inherited:</strong> <code>color</code>, <code>font-family</code>, <code>font-size</code>, <code>letter-spacing</code>, <code>line-height</code>, <code>text-align</code>, <code>visibility</code>.</li><li><strong>Box Model and Layout properties ARE NOT inherited:</strong> <code>width</code>, <code>height</code>, <code>margin</code>, <code>padding</code>, <code>border</code>, <code>background-color</code>, <code>display</code>, <code>position</code>.</li></ul><p><em>Why? If <code>border</code> were inherited, putting a border around a &lt;div&gt; would draw borders around every single nested paragraph, button, and span inside it!</em></p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Non-Inheritable Properties Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-non-inheritable?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-non-inheritable?file=index.html</a></p>',
    },

    // ── The inherit Keyword ──
    { id: nextId(), type: "heading" as const, content: "3. Forcing Inheritance with the 'inherit' Keyword 🔄" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a property is not inheritable by default (like <code>border</code> or <code>background-color</code>), you can explicitly force a child to inherit its parent's computed value using <code>inherit</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Parent element */
.card {
  border: 2px solid #2563eb;
  background-color: #f8fafc;
}

/* Child button forcing background & border from parent */
.card button {
  background-color: inherit; /* Copies #f8fafc from .card */
  border-color: inherit;     /* Copies #2563eb from .card */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Forcing Inherit Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-forcing-inheritable?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-forcing-inheritable?file=index.html</a></p>',
    },

    // ── The initial Keyword ──
    { id: nextId(), type: "heading" as const, content: "4. Resetting Values with the 'initial' Keyword 🛑" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If an element inherits a style that you want to strip away back to the official CSS specification default, use <code>initial</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Parent sets text to red */
body {
  color: red;
}

/* Child resets color to standard CSS initial black */
.neutral-text {
  color: initial; /* Resets to browser default (#000000) */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Initial Reset Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-forcing-inheritable-initial?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-forcing-inheritable-initial?file=index.html</a></p>',
    },

    // ── Decision Flowchart ──
    { id: nextId(), type: "heading" as const, content: "5. The Inheritance Mental Model Flowchart 🗺️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Does the child element declare its own CSS rule?
  ├── YES → Use the child's explicit declaration!
  └── NO  → Check property category:
              ├── Is it Text/Typography? → INHERIT parent value!
              ├── Has 'inherit' keyword?  → INHERIT parent value!
              └── Is it Box/Layout?       → Use initial default!`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Common Inherited vs Non-Inherited Properties" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Category</th><th style=\"padding:8px;\">Properties</th><th style=\"padding:8px;\">Inherited by Default?</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Typography</strong></td><td style=\"padding:8px;\"><code>color</code>, <code>font-family</code>, <code>font-size</code>, <code>line-height</code>, <code>text-align</code></td><td style=\"padding:8px;\">✅ YES</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Box Model</strong></td><td style=\"padding:8px;\"><code>margin</code>, <code>padding</code>, <code>border</code>, <code>width</code>, <code>height</code></td><td style=\"padding:8px;\">❌ NO</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Backgrounds</strong></td><td style=\"padding:8px;\"><code>background-color</code>, <code>background-image</code></td><td style=\"padding:8px;\">❌ NO</td></tr><tr><td style=\"padding:8px;\"><strong>Layout &amp; Positioning</strong></td><td style=\"padding:8px;\"><code>display</code>, <code>position</code>, <code>top</code>, <code>left</code>, <code>z-index</code></td><td style=\"padding:8px;\">❌ NO</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 15: CSS Inheritance" (id: 50)
    const collectionTitle = "Lesson 15: CSS Inheritance";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^inheritance$/i },
        { title: /^lesson 15/i },
        { id: 50 },
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
        order_no: 5,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 5)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 5).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 15 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
