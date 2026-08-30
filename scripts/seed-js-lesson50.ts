/**
 * Seed Script: JavaScript "Lesson 50: Understanding Form Events & the Event Object in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson50.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson50.ts
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
        "<p>Forms are the primary mechanism for user input in web applications. In this lesson, we explore <strong>Form Events</strong> and unpack the foundational <strong>Event Object (<code>e</code>)</strong>.</p><p>We examine how inputs behave during typing (<code>input</code>), field exit (<code>change</code>), field focus and blur (<code>focus</code> / <code>blur</code>), and how to intercept form submissions cleanly using <strong><code>e.preventDefault()</code></strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*M2Tfa6-ddc6M7uzQu38MkA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Base HTML & JS Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Form Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- index.html -->
<form id="userForm">
  <input id="userName" name="userName" placeholder="Enter your name" />
  <input id="email" name="email" placeholder="Enter your email" />
  <button>Submit</button>
  <p>Hi</p>
</form>

// script.js
const userNameInput = document.querySelector('#userName');
const emailInput = document.querySelector('#email');
const paragraph = document.querySelector('p');`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Click vs Double Click ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Click & Double Click on Inputs" },
    {
      id: nextId(),
      type: "code" as const,
      code: `userNameInput.addEventListener('click', () => {
  console.log('Input clicked');
});

userNameInput.addEventListener('dblclick', () => {
  console.log('Input double-clicked');
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. input Event ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The input Event (Real-Time Live Typing)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>input</code></strong> event fires immediately upon every keystroke, deletion, or paste into an input field:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Live character reflection:
userNameInput.addEventListener('input', (e) => {
  paragraph.innerText = e.target.value;
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. change Event ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ The change Event (Commit on Blur)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong><code>change</code></strong> event fires only when the user finishes editing and blurs (clicks away from) the input field:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `userNameInput.addEventListener('change', (e) => {
  console.log('Change event fired:', e.target.value);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Focus & Blur ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Focus & Blur Events" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>focus</code> triggers when the user enters an input field (highlighting, activating UI tooltips), while <code>blur</code> triggers when the user exits (ideal for running validation checks):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `userNameInput.addEventListener('focus', () => {
  console.log('Input gained focus (active)');
});

userNameInput.addEventListener('blur', () => {
  console.log('Input lost focus (validate now)');
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. The Event Object ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ The Event Object (e)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Whenever an event occurs, the browser automatically injects an <strong>Event Object</strong> into the callback:</p><ul><li><code>e.type</code>: Event identifier string (<code>'input'</code>, <code>'submit'</code>, etc.)</li><li><code>e.target</code>: The specific DOM element node that dispatched the event</li><li><code>e.target.value</code>: The current string value entered by the user</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `userNameInput.addEventListener('input', (e) => {
  console.log(e.type);         // "input"
  console.log(e.target);       // <input id="userName" ... />
  console.log(e.target.value); // current typed text
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 7. Submit Event & e.preventDefault() ──
    { id: nextId(), type: "heading" as const, content: "7️⃣ Handling Form Submissions: e.preventDefault()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By default, browser forms reload the entire page and append query parameters to the URL upon submission. Calling <strong><code>e.preventDefault()</code></strong> halts the default browser refresh, allowing JavaScript to handle data asynchronously via Fetch/AJAX:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // 🛑 Stop default full-page reload

  console.log('User Name:', userNameInput.value);
  console.log('Email:', emailInput.value);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Form Events Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Event</th><th style=\"padding:8px;\">Trigger Condition</th><th style=\"padding:8px;\">Typical Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>input</code></td><td style=\"padding:8px;\">Every keystroke / value change in real time</td><td style=\"padding:8px;\">Live search, character counters</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>change</code></td><td style=\"padding:8px;\">When element loses focus after value mutation</td><td style=\"padding:8px;\">Dropdown select, checkbox toggles</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>focus</code> / <code>blur</code></td><td style=\"padding:8px;\">Entering or leaving the input field</td><td style=\"padding:8px;\">UI styling, field validation messages</td></tr><tr><td style=\"padding:8px;\"><code>submit</code></td><td style=\"padding:8px;\">Form submit button clicked or Enter pressed</td><td style=\"padding:8px;\">Intercept data via <code>e.preventDefault()</code></td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 50: Understanding Form Events & the Event Object in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 50;

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

    console.log("🎉 Done! JS Lesson 50 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
