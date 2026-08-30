/**
 * Seed Script: JavaScript "Lesson 53: Event Bubbling and Capturing in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson53.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson53.ts
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
        "<p>When an event occurs in the DOM, it does not execute solely on the target node — it travels through the document tree along an event propagation pathway.</p><p>In this lesson, we explore the two primary propagation phases: <strong>Event Bubbling</strong> (bottom-up) and <strong>Event Capturing / Trickling</strong> (top-down), how to halt propagation with <strong><code>event.stopPropagation()</code></strong>, and how to configure listener options (<code>capture</code>, <code>once</code>).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*tf9zreuN76aoFcB7A25pUg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-53-event-bubbling-and-capturing-in-javascript?file=index.html,script.js,styles.css" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-53-event-bubbling-and-capturing-in-javascript?file=index.html,script.js,styles.css</a></p>',
    },

    // ── 1. HTML & CSS Nested Box Hierarchy ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML & CSS Setup: Nested Element Boxes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To visualize event propagation, we construct three nested <code>&lt;div&gt;</code> containers (Green → Pink → Blue):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML: Nested boxes -->
<div class="green">
  Green
  <div class="pink">
    Pink
    <div class="blue">
      Blue
      <p>Click me!</p>
    </div>
  </div>
</div>

/* CSS: Distinguishable colored boxes */
.green { background-color: green; padding: 20px; }
.pink { background-color: hotpink; padding: 20px; }
.blue { background-color: steelblue; padding: 20px; }`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Event Bubbling Phase ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Event Bubbling (Bottom-Up Propagation)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By default, browser events operate in the <strong>Bubbling Phase</strong>. When an action occurs on the innermost element (e.g. <code>.blue</code>), the event fires on the target, then bubbles upward to parent elements, <code>body</code>, <code>document</code>, and <code>window</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const green = document.querySelector('.green');
const pink = document.querySelector('.pink');
const blue = document.querySelector('.blue');

green.addEventListener('click', () => console.log('Green clicked!'));
pink.addEventListener('click', () => console.log('Pink clicked!'));
blue.addEventListener('click', () => console.log('Blue clicked!'));

// Clicking the inner .blue box logs:
// 1. "Blue clicked!"
// 2. "Pink clicked!"
// 3. "Green clicked!"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Stopping Bubbling ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Halting Propagation: event.stopPropagation()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To isolate an interaction and prevent parent listeners from triggering unexpectedly, call <strong><code>event.stopPropagation()</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `blue.addEventListener('click', (event) => {
  console.log('Blue clicked!');
  event.stopPropagation(); // 🛑 Stops event from travelling up to Pink, Green, Body
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Event Capturing (Trickling Phase) ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Event Capturing (Top-Down / Trickling Phase)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before an event reaches the target during bubbling, it first travels downwards from the root during the <strong>Capturing Phase</strong>. You can intercept events during capturing by passing <code>true</code> (or <code>{ capture: true }</code>) as the third argument:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Enable capture phase:
green.addEventListener('click', () => console.log('Green (capture)'), true);
pink.addEventListener('click', () => console.log('Pink (capture)'), true);
blue.addEventListener('click', () => console.log('Blue (capture)'), true);

// Clicking the inner .blue box logs top-to-bottom:
// 1. "Green (capture)"
// 2. "Pink (capture)"
// 3. "Blue (capture)"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Advanced addEventListener Options ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ addEventListener Options Object ({ capture, once })" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of passing a boolean, modern JavaScript allows passing an options object:</p><ul><li><strong><code>capture</code></strong>: <code>true</code> captures top-down; <code>false</code> bubbles bottom-up (default).</li><li><strong><code>once</code></strong>: <code>true</code> automatically unregisters and removes the listener after its very first execution.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Auto-cleanup listener after single invocation:
blue.addEventListener(
  'click',
  () => console.log('Blue clicked exactly once!'),
  { capture: false, once: true }
);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Bubbling vs Capturing Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Bubbling (Default)</th><th style=\"padding:8px;\">Capturing (Trickling)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Direction</td><td style=\"padding:8px;\">Target ➔ Parent ➔ Window (Bottom-Up)</td><td style=\"padding:8px;\">Window ➔ Parent ➔ Target (Top-Down)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Configuration</td><td style=\"padding:8px;\"><code>addEventListener(type, fn, false)</code></td><td style=\"padding:8px;\"><code>addEventListener(type, fn, true)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Stopping Flow</td><td style=\"padding:8px;\"><code>event.stopPropagation()</code></td><td style=\"padding:8px;\"><code>event.stopPropagation()</code></td></tr><tr><td style=\"padding:8px;\">Single Run</td><td style=\"padding:8px;\"><code>{ once: true }</code></td><td style=\"padding:8px;\"><code>{ once: true }</code></td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 53: Event Bubbling and Capturing in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 53;

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

    console.log("🎉 Done! JS Lesson 53 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
