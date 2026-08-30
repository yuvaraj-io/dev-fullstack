/**
 * Seed Script: CSS Lesson 13 — "Lesson 13: Understanding !important in CSS — The Rule That Overrides Everything"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson13.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson13.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*XKVfr4ZHXfCEHPH1Wrkpgw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The CSS \"Nuclear Option\" 💥" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You write careful, beautiful CSS rules. Then you import a 3rd-party library or widget, and suddenly your buttons won't turn blue no matter how specific your selector is. In desperation, you ask: <em>\"Can I force my CSS rule to always win?\"</em></p><p>CSS provides a special keyword for this: <code>!important</code>. While powerful, using it haphazardly can ignite uncontrolled \"specificity wars\". Let's master how it works under the hood.</p>",
    },

    // ── What is !important ──
    { id: nextId(), type: "heading" as const, content: "1. What is !important? ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>!important</code> is a declaration-level flag appended to the end of a CSS value before the semicolon. It elevates that single declaration above the standard specificity ranking.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Standard declaration */
p {
  color: blue;
}

/* Elevated priority declaration */
p {
  color: blue !important; /* Forces this property to override standard rules */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── How !important Changes the Rules ──
    { id: nextId(), type: "heading" as const, content: "2. How !important Breaks Standard Specificity 🔓" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Normally, an <code>#id</code> selector (0,1,0,0) easily beats a simple element selector <code>p</code> (0,0,0,1). But adding <code>!important</code> causes the tag rule to defeat the ID:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Tag selector WITH !important */
p {
  color: blue !important; /* ✅ WINS! Elevated above normal specificity */
}

/* High-specificity ID selector WITHOUT !important */
#unique-text {
  color: green;           /* ❌ LOSES because it is a normal declaration */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── What Happens When Multiple !important Rules Clash ──
    { id: nextId(), type: "heading" as const, content: "3. What Happens When Two !important Rules Clash? ⚔️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When two competing rules are <strong>BOTH marked <code>!important</code></strong>, they cancel each other's priority boost. The browser falls right back to comparing their <strong>Specificity Scores</strong>!</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Battle between two !important declarations: */

p {
  color: blue !important;  /* Specificity: (0,0,0,1) + !important */
}

.text {
  color: green !important; /* Specificity: (0,0,1,0) + !important  ← ✅ WINS! (.text beats p) */
}

#unique {
  color: red !important;   /* Specificity: (0,1,0,0) + !important  ← 🏆 WINS ALL! */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── What If Specificity is Also Equal ──
    { id: nextId(), type: "heading" as const, content: "4. The Ultimate Tie-Breaker: Cascade Source Order ⏱️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* Identical Specificity + Both !important: */
p {
  color: blue !important;
}

p {
  color: red !important; /* ✅ WINS! Last rule declared in the stylesheet */
}`,
      codeType: "css",
      link: "",
      btn: "",
    },

    // ── Browser Engine Flowchart ──
    { id: nextId(), type: "heading" as const, content: "5. Browser Resolution Pipeline Flowchart ⚙️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Step 1: Check for !important
        ├── Important declarations ALWAYS defeat normal declarations
        └── If multiple important declarations compete → Go to Step 2

Step 2: Compare Specificity Scores (A, B, C, D)
        ├── Highest specificity score wins
        └── If specificity scores are identical → Go to Step 3

Step 3: Check Source Order (The Cascade)
        └── Last declaration in the stylesheet wins`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Browser Infographic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*FL2HeKsXFm9or4SWfeGR2A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Real World Valid Uses ──
    { id: nextId(), type: "heading" as const, content: "6. Legitimate Real-World Use Cases 🛠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Utility Classes (e.g., Tailwind/Bootstrap):</strong> Helper utilities designed to force a state regardless of component styling (e.g. <code>.hidden { display: none !important; }</code>).</li><li><strong>Overriding stubborn 3rd-party library styles:</strong> When an external vendor theme uses inline styles or hardcoded IDs that you cannot edit.</li><li><strong>User accessibility overrides:</strong> High-contrast mode stylesheets that must enforce readable colors and font sizes.</li><li><strong>Quick debugging:</strong> Temporarily checking if specificity is why your rule is being ignored.</li></ul>",
    },

    // ── Why You Should Avoid It & Specificity Wars ──
    { id: nextId(), type: "heading" as const, content: "7. Why Overusing !important Leads to Specificity Wars ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine a boardroom where everyone starts screaming <em>\"My idea is the most important!\"</em>. Soon, nobody can be heard. In CSS, once you start sprinkling <code>!important</code> everywhere, other developers are forced to write even weirder compound selectors with <code>!important</code> to override you, destroying maintainability.</p>",
    },

    // ── Interactive StackBlitz Demos ──
    { id: nextId(), type: "heading" as const, content: "Interactive Playgrounds on StackBlitz ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Test <code>!important</code> battles live in your browser:</p><ul><li><strong>!important vs Specificity:</strong> <a href="https://stackblitz.com/edit/stackblitz-important-specificity?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-important-specificity?file=index.html</a></li><li><strong>Combined !important &amp; Cascade:</strong> <a href="https://stackblitz.com/edit/stackblitz-important-specificity-combined?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-important-specificity-combined?file=index.html</a></li></ul>',
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "Summary: !important Decision Matrix" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Condition</th><th style=\"padding:8px;\">Winner</th><th style=\"padding:8px;\">Why</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>!important</code> vs Normal rule</td><td style=\"padding:8px;\"><code>!important</code> rule</td><td style=\"padding:8px;\">Important declarations always override normal declarations</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Multiple <code>!important</code> rules</td><td style=\"padding:8px;\">Higher Specificity rule</td><td style=\"padding:8px;\">Browser compares specificity when both have <code>!important</code></td></tr><tr><td style=\"padding:8px;\">Multiple <code>!important</code> + Equal specificity</td><td style=\"padding:8px;\">Last rule in stylesheet</td><td style=\"padding:8px;\">Cascade order serves as final tie-breaker</td></tr></tbody></table>",
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

    // 3. Find or update collection "Lesson 13: Understanding !important in CSS — The Rule That Overrides Everything" (id: 48)
    const collectionTitle = "Lesson 13: Understanding !important in CSS — The Rule That Overrides Everything";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^!important/i },
        { title: /^lesson 13/i },
        { id: 48 },
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
        order_no: 3,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 3)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 3).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 13 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
