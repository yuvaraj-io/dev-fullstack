/**
 * Seed Script: JavaScript "Lesson 55: Event Delegation in JavaScript (with live working code)"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson55.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson55.ts
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
        "<p>One of the most frequently asked JavaScript interview questions is: <em>“What is event delegation, and why do we use it?”</em></p><p>In this lesson, we explore <strong>Event Delegation</strong> — a high-performance architectural pattern that leverages <strong>Event Bubbling</strong> to manage events across hundreds of dynamic child elements using a single parent listener.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*xUN48ppGFYOYgxkdMLg9cg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-55-event-delegation-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-55-event-delegation-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. What Is Event Delegation? ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What Is Event Delegation?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Event Delegation</strong> is a technique where instead of attaching event listeners to each individual child element, you attach a <strong>single event listener to their common parent container</strong>.</p><p>Because events <strong>bubble up</strong> through the DOM, the parent interceptor receives the event and inspects <strong><code>event.target</code></strong> to determine exactly which child was clicked.</p>",
    },

    // ── 2. Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ HTML & CSS Setup: Dynamic Cards" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Event Delegation</title>
  <style>
    #container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .card {
      background: lightcoral;
      padding: 15px;
      font-size: 18px;
      border-radius: 8px;
      cursor: pointer;
    }
    #addCard {
      padding: 10px 20px;
      background: royalblue;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <button id="addCard">Add Card</button>
  <div id="container"></div>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 3. Step 1: Adding Cards Dynamically ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Step 1: Adding Cards Dynamically" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const addCardButton = document.getElementById('addCard');
const container = document.getElementById('container');
let count = 0;

addCardButton.addEventListener('click', () => {
  count++;
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.textContent = \`Card \${count}\`;
  container.appendChild(newCard);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. The Naive Antipattern ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ The Problem with Individual Listeners (Naive Way)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Attaching listeners to each card individually causes two major flaws:</p><ol><li><strong>Misses dynamic elements:</strong> Elements created <em>after</em> page load do not inherit event listeners.</li><li><strong>Memory bloat:</strong> 1,000 cards generate 1,000 separate handler functions in browser memory.</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ Naive approach: Fails for future dynamic cards & wastes memory
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.remove();
  });
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. The Event Delegation Solution ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ The Event Delegation Solution" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>We attach <strong>one single listener</strong> to <code>#container</code> and guard with <code>event.target.classList.contains('card')</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✅ Clean & Scalable Event Delegation:
container.addEventListener('click', (event) => {
  // Ensure we clicked an actual card and not the empty container background:
  if (event.target !== container && event.target.classList.contains('card')) {
    event.target.remove();
  }
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. How It Works Internally ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ How Event Delegation Works Internally 🔍" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>User clicks a <code>.card</code> element.</li><li>The click event <strong>bubbles upward</strong> to <code>#container</code>.</li><li>The container's listener executes.</li><li><code>event.target</code> points to the innermost clicked element.</li><li>We verify whether <code>event.target</code> matches our selector and execute our logic.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Direct Listeners vs. Event Delegation" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\">Direct Listeners per Element</th><th style=\"padding:8px;\">Event Delegation (Parent)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Memory Footprint</td><td style=\"padding:8px;\">High (N listener callbacks)</td><td style=\"padding:8px;\">Minimal (Exactly 1 listener callback)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Dynamic Elements</td><td style=\"padding:8px;\">Requires manual re-binding on creation</td><td style=\"padding:8px;\">Works automatically for all future nodes</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Code Cleanliness</td><td style=\"padding:8px;\">Cluttered setup loops</td><td style=\"padding:8px;\">Centralized, clean dispatch logic</td></tr><tr><td style=\"padding:8px;\">Target Identification</td><td style=\"padding:8px;\">Implicit (<code>this</code> / bound variable)</td><td style=\"padding:8px;\">Explicit (<code>event.target</code>)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 55: Event Delegation in JavaScript (with live working code)";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 55;

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

    console.log("🎉 Done! JS Lesson 55 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
