/**
 * Seed Script: CSS Lesson 12 — "Lesson 12: CSS Specificity — How Browsers Decide Which Style Wins"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson12.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson12.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*nCs90WmS3PjTx-oPO8CenQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Why Isn’t My CSS Working? ⚔️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You write two conflicting CSS rules targeting the exact same paragraph:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `p {
  color: blue;
}

.text {
  color: green;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Even though <code>p</code> is defined in your stylesheet, the paragraph turns <strong>green</strong>. Why? CSS didn't ignore your first rule — the browser resolved the conflict using the <strong>CSS Specificity Algorithm</strong>.</p>",
    },

    // ── What is Specificity ──
    { id: nextId(), type: "heading" as const, content: "1. What is CSS Specificity? ⚖️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Specificity</strong> is the weighting system browsers use to determine which style declaration takes precedence when multiple selectors match an element. Think of it as a hierarchy of authority: an employee listening to direct instructions from a manager over general company guidelines.</p>",
    },

    // ── Specificity Score (4-Part Tuple) ──
    { id: nextId(), type: "heading" as const, content: "2. The 4-Part Specificity Score: (A, B, C, D) 🔢" },
    {
      id: nextId(),
      type: "code" as const,
      code: `┌─────────────────────────────────────────────────────────────┐
│  (A, B, C, D) SPECIFICITY RANKING (Compared Left-to-Right)   │
├─────────────────────────────────────────────────────────────┤
│  A: Inline Styles   → style="..."                (1,0,0,0)  │
│  B: ID Selectors    → #header, #nav              (0,1,0,0)  │
│  C: Classes/Pseudos → .btn, [type="text"], :hover(0,0,1,0)  │
│  D: Elements/Types  → div, p, h1, ::before       (0,0,0,1)  │
└─────────────────────────────────────────────────────────────┘

* Universal selector (*), combinators (+, >, ~), and :where() contribute (0,0,0,0)`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Practical Comparison ──
    { id: nextId(), type: "heading" as const, content: "3. Comparing Scores in Practice 📊" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Specificity calculation breakdown: */
p            { color: blue; }    /* 1 Element           → (0, 0, 0, 1) */
.text        { color: green; }   /* 1 Class             → (0, 0, 1, 0) */
p.text       { color: purple; }  /* 1 Element + 1 Class → (0, 0, 1, 1) */
#heading     { color: red; }     /* 1 ID                → (0, 1, 0, 0) */

/* Comparison:
   (0, 1, 0, 0) [ID]
       > (0, 0, 1, 1) [p.text]
           > (0, 0, 1, 0) [.text]
               > (0, 0, 0, 1) [p] */`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Combining Selectors ──
    { id: nextId(), type: "heading" as const, content: "4. Combining Selectors & Compound Weight 🧩" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Compound Selector Specificity Math: */

/* 2 Elements (article, h2) */
article h2 {
  color: blue; /* (0, 0, 0, 2) */
}

/* 1 Element (h2) + 1 Class (.title) */
h2.title {
  color: green; /* (0, 0, 1, 1)  ← WINS over (0,0,0,2)! */
}

/* 2 Elements (div, h2) + 1 Class (.heading) */
div h2.heading {
  color: red; /* (0, 0, 1, 2)  ← HIGHEST OF ALL THREE! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Equal Specificity & The Cascade ──
    { id: nextId(), type: "heading" as const, content: "5. The Tie-Breaker: What Happens When Specificity is Equal? ⏱️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When two competing rules have the <strong>exact same specificity score</strong>, the CSS Cascade order decides: <strong>the rule declared later in the stylesheet wins</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Both have identical specificity: (0, 0, 0, 1) */
p {
  color: blue;
}

p {
  color: red; /* ✅ WINS! Declared later in source order */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Browser Engine Specificity Tree Diagram ──
    { id: nextId(), type: "heading" as const, content: "6. How Browsers Calculate & Resolve Rules ⚙️" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*xD6jyxiot8h86V2j3NP2kg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `DOM Tree parsed
        ↓
Collect all matching CSS rules for element
        ↓
Filter by Origin (User-Agent vs Author vs User)
        ↓
Compare Specificity Scores (A, B, C, D)
        ↓
If Tied → Resolve by Source Order (Last rule wins)
        ↓
Apply winning property values to render tree`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Best Practices & Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "7. Best Practices to Prevent Specificity Wars 🛡️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Keep specificity low:</strong> Rely on simple class names (e.g. <code>.card</code>, <code>.btn</code>) rather than deep tag nests (e.g. <code>main &gt; section div article p span</code>).</li><li><strong>Avoid using IDs for styling:</strong> IDs possess immense specificity <code>(0,1,0,0)</code> and require ugly hacky chains to override later.</li><li><strong>Never guess:</strong> Use browser DevTools (Inspect Element) to see which rules were struck out and why.</li></ul>",
    },

    // ── Interactive StackBlitz Starters ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playgrounds on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Test live specificity battles and see browser overrides in action:</p><ul><li><strong>ID vs Class vs Tag Specificity:</strong> <a href="https://stackblitz.com/edit/stackblitz-id-selector?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-id-selector?file=index.html</a></li><li><strong>H2 Tag Specificity:</strong> <a href="https://stackblitz.com/edit/stackblitz-h2-selector-specificity?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-h2-selector-specificity?file=index.html</a></li><li><strong>Combined Selectors Battle:</strong> <a href="https://stackblitz.com/edit/stackblitz-combine-specificity?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-combine-specificity?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: Specificity Hierarchy Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Selector Type</th><th style=\"padding:8px;\">Example</th><th style=\"padding:8px;\">Specificity Score</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Inline Style</strong></td><td style=\"padding:8px;\"><code>style=\"color: red;\"</code></td><td style=\"padding:8px;\"><code>(1, 0, 0, 0)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>ID Selector</strong></td><td style=\"padding:8px;\"><code>#main-nav</code></td><td style=\"padding:8px;\"><code>(0, 1, 0, 0)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Class / Attribute / Pseudo-class</strong></td><td style=\"padding:8px;\"><code>.btn</code>, <code>[type=\"text\"]</code>, <code>:hover</code></td><td style=\"padding:8px;\"><code>(0, 0, 1, 0)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Element / Pseudo-element</strong></td><td style=\"padding:8px;\"><code>div</code>, <code>p</code>, <code>::before</code></td><td style=\"padding:8px;\"><code>(0, 0, 0, 1)</code></td></tr><tr><td style=\"padding:8px;\"><strong>Universal Selector</strong></td><td style=\"padding:8px;\"><code>*</code>, <code>+</code>, <code>&gt;</code>, <code>~</code></td><td style=\"padding:8px;\"><code>(0, 0, 0, 0)</code></td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 12: CSS Specificity — How Browsers Decide Which Style Wins" (id: 47)
    const collectionTitle = "Lesson 12: CSS Specificity — How Browsers Decide Which Style Wins";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^specificity$/i },
        { title: /^lesson 12/i },
        { id: 47 },
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
        order_no: 2,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 2)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 2).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 12 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
