/**
 * Seed Script: JavaScript "Lesson 54: Event Simulators in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson54.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson54.ts
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
        "<p>Normally, browser events are triggered when physical users click, type, or submit forms. With <strong>Event Simulators</strong>, JavaScript allows developers to programmatically dispatch and simulate those exact actions.</p><p>In this lesson, we explore automated virtual interactions using <strong><code>element.click()</code></strong>, <strong><code>element.focus()</code></strong>, <strong><code>element.blur()</code></strong>, <strong><code>form.submit()</code></strong>, and <strong><code>form.reset()</code></strong> for automated testing, wizard onboarding flows, and batch operations.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ERv84k7VmAXhPlrzxyKL5g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-54-event-simulators-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-54-event-simulators-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. Click Simulator ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Simulating Clicks: element.click()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Calling <code>.click()</code> on any DOM element executes its registered click event listeners synchronously without mouse input:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML -->
<button id="addCard">Add Card</button>
<div id="container"></div>

// JavaScript
const addCardButton = document.getElementById('addCard');
const container = document.getElementById('container');
let count = 0;

addCardButton.addEventListener('click', () => {
  count++;
  const card = document.createElement('div');
  card.textContent = \`Card \${count}\`;
  card.classList.add('card');
  container.appendChild(card);
});

// 🚀 Programmatically trigger 1,000 clicks in a batch loop:
for (let i = 1; i <= 1000; i++) {
  addCardButton.click();
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Timed Simulation with setInterval ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Gradual Simulation with setInterval()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To simulate realistic human interaction or create animated staggered additions, wrap <code>.click()</code> inside a timer interval:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let count2 = 0;
const intervalId = setInterval(() => {
  addCardButton.click(); // Trigger click event programmatically
  count2++;
  if (count2 >= 100) {
    clearInterval(intervalId);
  }
}, 50); // Adds one card every 50ms`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Focus & Blur Simulators ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Focus & Blur Simulators: .focus() & .blur()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Guide user attention to required fields or automate onboarding questionnaires with <strong><code>element.focus()</code></strong> and <strong><code>element.blur()</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const input = document.querySelector('input');

// Automatically focus input after 2 seconds (e.g. modal popup opens):
setTimeout(() => {
  input.focus();
  console.log('Input focused programmatically!');
}, 2000);

// Automatically remove focus after 4 seconds:
setTimeout(() => {
  input.blur();
  console.log('Input blurred programmatically!');
}, 4000);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Form Submit & Reset Simulators ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Form Simulators: form.submit() & form.reset()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Forms can be dispatched or wiped clean directly from JavaScript code without user button clicks:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const form = document.querySelector('form');

// 1. Programmatically submit form (e.g. auto-save timer):
form.submit();

// 2. Programmatically wipe all inputs back to initial state:
form.reset();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Core Event Simulator Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Method</th><th style=\"padding:8px;\">Simulated Action</th><th style=\"padding:8px;\">Common Real-World Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>element.click()</code></td><td style=\"padding:8px;\">Dispatches click event</td><td style=\"padding:8px;\">Hidden file upload triggers, batch automation</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>element.focus()</code></td><td style=\"padding:8px;\">Transfers keyboard focus</td><td style=\"padding:8px;\">Autofocus on modal open, search bar shortcut (<kbd>Ctrl+K</kbd>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>element.blur()</code></td><td style=\"padding:8px;\">Removes active focus</td><td style=\"padding:8px;\">Dismiss virtual mobile keyboard, trigger validation</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>form.submit()</code></td><td style=\"padding:8px;\">Submits form data</td><td style=\"padding:8px;\">Auto-submit on dropdown change, checkout flows</td></tr><tr><td style=\"padding:8px;\"><code>form.reset()</code></td><td style=\"padding:8px;\">Clears form fields</td><td style=\"padding:8px;\">Cancel modal dialogs, revert forms to default state</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 54: Event Simulators in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 54;

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

    console.log("🎉 Done! JS Lesson 54 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
