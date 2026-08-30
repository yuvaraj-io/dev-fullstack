/**
 * Seed Script: JavaScript "Lesson 49: Events in JavaScript — Beginner’s Guide"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson49.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson49.ts
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
        "<p>User interactivity in web browsers is driven entirely by <strong>Events</strong> — clicks, keystrokes, mouse movements, form submissions, and page load cycles.</p><p>In this beginner's guide, we trace the evolution of event handling from inline HTML attributes and DOM property handlers to modern <strong><code>addEventListener()</code></strong> and <strong><code>removeEventListener()</code></strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*0mBPxxigk7sDyYIna0vPHA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-49-events-in-javascript-beginner-s-guide?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-49-events-in-javascript-beginner-s-guide?file=index.html,script.js</a></p>',
    },

    // ── 1. What Is an Event? ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What Is an Event in the Browser?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An event represents an interaction signal dispatched by the browser window or DOM nodes. JavaScript enables us to bind listener callbacks to intercept and react to these signals:</p><ul><li><code>click</code> / <code>dblclick</code>: User clicks or double-clicks a component</li><li><code>keydown</code> / <code>keyup</code>: User interacts with the keyboard</li><li><code>mouseover</code> / <code>mouseout</code>: Pointer enters or leaves an element</li><li><code>change</code> / <code>submit</code>: Form field mutations and form submissions</li></ul>",
    },

    // ── 2. Inline HTML Handlers (Antipattern) ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Method 1: Inline HTML Attributes (Legacy Antipattern)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Attaching event handlers directly inside HTML markup tightly couples structure with business logic and should be avoided:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Inline attribute handler (Not recommended) -->
<button onclick="alert('You clicked the button!')">Click Me</button>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 3. DOM Object Property Handler ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Method 2: DOM Object Property Handlers (element.onclick)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Assigning a function to <code>element.onclick</code> moves logic into JavaScript, but <strong>only allows a single listener</strong> — setting another handler silently overwrites the previous one:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const button = document.getElementById('clickBtn');

button.onclick = function() {
  console.log('Button clicked via onclick property!');
};

// ⚠️ Overwrites the handler above:
button.onclick = function() {
  console.log('Second handler overwrote the first!');
};`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. addEventListener() ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Method 3: addEventListener() (The Modern Standard)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong><code>addEventListener(eventType, callback)</code></strong> is the industry standard for event registration. It supports <strong>multiple independent listeners</strong> on the exact same event without collision:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById('eventBtn');

// Listener 1:
btn.addEventListener('click', function() {
  console.log('Button clicked via addEventListener!');
});

// Listener 2 (both execute!):
btn.addEventListener('click', function() {
  console.log('Second listener executed smoothly!');
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Practical Example: Color Changer ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Practical Example: Dynamic Background Changer" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const colorBtn = document.getElementById('colorBtn');

colorBtn.addEventListener('click', function() {
  document.body.style.backgroundColor = 'lightblue';
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Removing Event Listeners ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Removing Event Listeners with removeEventListener()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To unbind an event listener, pass the <strong>exact same function reference</strong> to <code>removeEventListener()</code>. Note that anonymous arrow functions cannot be removed because their function reference cannot be retrieved:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function handleButtonClick() {
  console.log('User clicked!');
}

// 1. Attach named function reference:
btn.addEventListener('click', handleButtonClick);

// 2. Detach listener when no longer needed:
btn.removeEventListener('click', handleButtonClick);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Event Handling Methods Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Approach</th><th style=\"padding:8px;\">Multiple Listeners?</th><th style=\"padding:8px;\">Can Remove?</th><th style=\"padding:8px;\">Separation of Concerns</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>onclick=\"...\"</code> attribute</td><td style=\"padding:8px;\">No</td><td style=\"padding:8px;\">No</td><td style=\"padding:8px;\">Poor (mixed in HTML)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>element.onclick = fn</code></td><td style=\"padding:8px;\">No (overwrites)</td><td style=\"padding:8px;\">Yes (<code>element.onclick = null</code>)</td><td style=\"padding:8px;\">Moderate</td></tr><tr><td style=\"padding:8px;\"><code>addEventListener()</code></td><td style=\"padding:8px;\">Yes (unlimited)</td><td style=\"padding:8px;\">Yes (<code>removeEventListener</code>)</td><td style=\"padding:8px;\">Clean & Standard</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 49: Events in JavaScript — Beginner’s Guide";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 49;

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

    console.log("🎉 Done! JS Lesson 49 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
