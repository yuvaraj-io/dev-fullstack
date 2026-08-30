/**
 * Seed Script: CSS Lesson 14 — "Lesson 14: The CSS Cascade Algorithm — How Browsers Decide Which Style Wins 🌊"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson14.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson14.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*MTYqy6dhr1tESMpkCGT4-A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — When Three CSS Rules Clash ⚔️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine a paragraph matching three separate CSS rules:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* HTML: <p class="text" id="title">Welcome to CSS!</p> */

p      { color: red; }
.text  { color: green; }
#title { color: blue; }`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Which color renders? Why is CSS called <strong>Cascading</strong> Style Sheets? The browser executes a deterministic multi-step decision engine known as the <strong>CSS Cascade Algorithm</strong>.</p>",
    },

    // ── Waterfall Analogy & Flow ──
    { id: nextId(), type: "heading" as const, content: "1. The Waterfall Concept: Why is it Called \"Cascading\"? 🌊" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BABoSR2iWcLVB4G-ddRLOg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `CSS Rule 1 (Tag)   ──┐
CSS Rule 2 (Class) ──┼──> Cascade Decision Pipeline ──> Single Winning Computed Value!
CSS Rule 3 (ID)    ──┘`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── The 3 Core Questions ──
    { id: nextId(), type: "heading" as const, content: "2. The 3 Fundamental Cascade Questions ❓" },
    {
      id: nextId(),
      type: "code" as const,
      code: `1️⃣ IMPORTANCE: Is one declaration marked '!important'?
   ├── YES → That !important declaration wins immediately!
   └── NO / TIED → Proceed to Step 2

2️⃣ SPECIFICITY: Which selector has the higher specificity score?
   ├── STRONGER MATCH → That declaration wins!
   └── EQUAL SCORE → Proceed to Step 3

3️⃣ SOURCE ORDER: Which rule appears later in the stylesheet?
   └── LATER DECLARATION WINS (The final tie-breaker!)`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Step 1: Importance ──
    { id: nextId(), type: "heading" as const, content: "Step 1: Importance (!important & Origins) ⚡" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* !important always defeats normal rules, regardless of selector or order */
p {
  color: red !important; /* ✅ WINS over everything below */
}

#unique-title {
  color: blue;           /* ❌ Defeated by !important */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Importance Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-important-cascade?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-important-cascade?file=index.html</a></p>',
    },

    // ── Step 2: Specificity ──
    { id: nextId(), type: "heading" as const, content: "Step 2: Specificity (When Importance is Equal) 🎯" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Hierarchy: Inline > ID > Class > Tag */
p { color: red; }        /* (0, 0, 0, 1) */
.message { color: green; } /* (0, 0, 1, 0) */
#welcome { color: blue; }  /* (0, 1, 0, 0)  ← ✅ WINS (Highest specificity)! */`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Specificity Cascade Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-highest-cascade?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-highest-cascade?file=index.html</a></p>',
    },

    // ── Step 3: Source Order ──
    { id: nextId(), type: "heading" as const, content: "Step 3: Source Order (When Specificity is Equal) ⏱️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Identical selectors & equal importance: */
p {
  color: red;
}

p {
  color: green; /* ✅ WINS! Declared later in source order */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Source Order Cascade Demo:</strong> <a href="https://stackblitz.com/edit/stackblitz-last-cascase?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-last-cascase?file=index.html</a></p>',
    },

    // ── Complete End-to-End Pipeline ──
    { id: nextId(), type: "heading" as const, content: "3. Complete End-to-End Cascade Scenario 🧩" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* HTML: <p class="message" id="main-message">Learning CSS is fun!</p> */

p {
  color: red;                /* 1. Element: (0,0,0,1) */
}
.message {
  color: green;              /* 2. Class:   (0,0,1,0) */
}
#main-message {
  color: blue;               /* 3. ID:      (0,1,0,0) */
}
p {
  color: purple !important;  /* 4. Tag + !important ← 🏆 WINS OVER EVERYTHING! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Browser Engine Flowchart ──
    { id: nextId(), type: "heading" as const, content: "4. How the Browser Renders the Final Style ⚙️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*pGdDpKMbi9D4dFjFSNs8VA.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `HTML parsed into DOM Tree
        ↓
CSS parsed into CSSOM (CSS Object Model)
        ↓
Match all selectors to current DOM node
        ↓
Execute Cascade Algorithm (Importance → Specificity → Order)
        ↓
Compute final single CSS property value
        ↓
Render Tree constructed → Rasterize pixels onto screen`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Real World Cascade Use Cases ──
    { id: nextId(), type: "heading" as const, content: "5. Real-World Cascade Architectures 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Multi-Stylesheet Architecture:</strong> Base reset styles (e.g. <code>normalize.css</code>) load first, followed by vendor UI (e.g. Bootstrap), followed by custom application overrides.</li><li><strong>Dark Mode &amp; Theming:</strong> Global light theme declarations get cleanly overridden by a <code>[data-theme=\"dark\"]</code> selector higher in cascade hierarchy.</li><li><strong>Component Design Systems:</strong> Core reusable component styling overridden locally by contextual utility classes.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: The Cascade Algorithm Resolution Matrix" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Priority Stage</th><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\">Resolution Rule</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>1. Importance</strong></td><td style=\"padding:8px;\"><code>!important</code> vs Normal</td><td style=\"padding:8px;\">Important declarations override all standard declarations</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>2. Specificity</strong></td><td style=\"padding:8px;\">Score <code>(A, B, C, D)</code></td><td style=\"padding:8px;\">Higher specificity selector wins (Inline &gt; ID &gt; Class &gt; Tag)</td></tr><tr><td style=\"padding:8px;\"><strong>3. Source Order</strong></td><td style=\"padding:8px;\">Order of Appearance</td><td style=\"padding:8px;\">Last rule defined in the stylesheet / DOM wins</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 14: The CSS Cascade Algorithm — How Browsers Decide Which Style Wins 🌊" (id: 49)
    const collectionTitle = "Lesson 14: The CSS Cascade Algorithm — How Browsers Decide Which Style Wins 🌊";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^cascade algorithm/i },
        { title: /^lesson 14/i },
        { id: 49 },
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

    console.log("🎉 Done! CSS Lesson 14 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
