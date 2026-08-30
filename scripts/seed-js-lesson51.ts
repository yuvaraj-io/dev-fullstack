/**
 * Seed Script: JavaScript "Lesson 51: Understanding Keyboard Events in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson51.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson51.ts
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
        "<p>Keyboard interactions enable rich keyboard navigation, hotkeys, shortcuts, and text filtering in web applications.</p><p>In this lesson, we explore <strong>Keyboard Events</strong> in JavaScript (<code>keydown</code>, <code>keyup</code>, and legacy <code>keypress</code>), analyze the critical difference between <strong><code>event.key</code></strong> and <strong><code>event.code</code></strong>, and explain how element focus and <strong><code>tabindex</code></strong> control event reception.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*9tJlsleY4vEC_cQrWIeUaQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-51-understanding-keyboard-events-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-51-understanding-keyboard-events-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. HTML Setup & Tabindex ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML Setup & The tabindex Attribute" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Keyboard events require an element to have <strong>keyboard focus</strong>. While form controls like <code>&lt;input&gt;</code> are focusable by default, static elements like <code>&lt;h1&gt;</code> require <strong><code>tabindex=\"0\"</code></strong> to become focusable via Tab or click:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyboard Events Example</title>
  <style>
    h1 {
      padding: 20px;
      border: 2px solid #333;
      display: inline-block;
      cursor: pointer;
    }
    input {
      margin-top: 20px;
      padding: 10px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <!-- tabindex="0" makes non-interactive elements focusable -->
  <h1 tabindex="0">Click or Tab to Focus Me</h1>
  <br>
  <input type="text" placeholder="Type here..." />
  
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Keyboard Events: keydown, keyup, keypress ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Handling keydown, keyup, and keypress" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides three core keyboard event types:</p><ul><li><strong><code>keydown</code></strong>: Dispatched the instant any key is pressed down (repeats continuously while held).</li><li><strong><code>keyup</code></strong>: Dispatched once when the physical key is released.</li><li><strong><code>keypress</code></strong>: (Legacy/deprecated) Dispatched only for printable character-producing keys.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const h1 = document.querySelector('h1');
const input = document.querySelector('input');

// 1. KeyDown Event (Fires for ALL keys, including Shift, Alt, Enter, Arrow keys)
document.addEventListener('keydown', (event) => {
  console.log("KeyDown -> Key:", event.key, "| Code:", event.code);
});

// 2. KeyUp Event (Fires when the key is released)
document.addEventListener('keyup', (event) => {
  console.log("KeyUp -> Key:", event.key, "| Code:", event.code);
});

// 3. KeyPress Event (Legacy character-only listener)
h1.addEventListener('keypress', (event) => {
  console.log("KeyPress -> Key:", event.key);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. event.key vs event.code ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ event.key vs. event.code vs. event.keyCode" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Understanding the distinction between <code>key</code> and <code>code</code> is critical for internationalization and game development:</p><ul><li><strong><code>event.key</code></strong>: The character value generated by the key, considering Shift state, keyboard layout, and language (e.g., <code>\"a\"</code>, <code>\"A\"</code>, <code>\"Enter\"</code>, <code>\"Escape\"</code>).</li><li><strong><code>event.code</code></strong>: The physical position of the key on the hardware keyboard, independent of language or layout (e.g., <code>\"KeyA\"</code>, <code>\"Digit1\"</code>, <code>\"Space\"</code>).</li><li><strong><code>event.keyCode</code></strong>: ⚠️ Deprecated numeric ASCII/scan code (avoid in modern projects).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `document.addEventListener('keydown', (e) => {
  // Check semantic character value:
  if (e.key === 'Enter') {
    console.log('User submitted / pressed Enter');
  }

  // Check physical key position (e.g. WASD gaming controls):
  if (e.code === 'KeyW' || e.code === 'ArrowUp') {
    console.log('Move character forward');
  }
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Global vs Element-Specific Listeners ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Global vs. Element-Specific Listeners" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When building keyboard shortcuts (like <kbd>Ctrl+K</kbd> search or <kbd>Esc</kbd> modal exit), bind your listener directly to <strong><code>document</code></strong> or <strong><code>window</code></strong> so it intercepts keystrokes regardless of which element currently holds focus.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Global Escape key listener to close modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    console.log('Closing open dialog/modal...');
  }
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Keyboard Events Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Property / Event</th><th style=\"padding:8px;\">Description</th><th style=\"padding:8px;\">Recommendation</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>keydown</code></td><td style=\"padding:8px;\">Fires when any key goes down; repeats while held</td><td style=\"padding:8px;\">Standard for hotkeys & controls</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>keyup</code></td><td style=\"padding:8px;\">Fires when key is released</td><td style=\"padding:8px;\">Ideal for post-typing triggers</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>event.key</code></td><td style=\"padding:8px;\">Character string (e.g. <code>'a'</code>, <code>'Enter'</code>)</td><td style=\"padding:8px;\">Use for typed input logic</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>event.code</code></td><td style=\"padding:8px;\">Physical hardware key code (e.g. <code>'KeyA'</code>)</td><td style=\"padding:8px;\">Use for gaming / positional hotkeys</td></tr><tr><td style=\"padding:8px;\"><code>event.keyCode</code></td><td style=\"padding:8px;\">Legacy numeric key code</td><td style=\"padding:8px;\">❌ Deprecated — do not use</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 51: Understanding Keyboard Events in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 51;

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

    console.log("🎉 Done! JS Lesson 51 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
