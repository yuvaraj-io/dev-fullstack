/**
 * Seed Script: JavaScript "Lesson 52: Exploring Mouse, Touch, and Pointer Events in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson52.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson52.ts
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
        "<p>Modern web applications must respond cleanly whether users interact via a mouse, trackpad, touchscreen, or digital stylus.</p><p>In this lesson, we explore <strong>Mouse Events</strong> (<code>mousedown</code>, <code>mouseup</code>, <code>mouseenter</code>/<code>mouseleave</code> vs <code>mouseover</code>/<code>mouseout</code>, <code>mousemove</code>, <code>wheel</code>), <strong>Touch Events</strong> (<code>touchstart</code>, <code>touchend</code>, <code>touchmove</code>), unified cross-device <strong>Pointer Events</strong>, and native <strong>HTML Drag & Drop Events</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*rJ6eb5_tC37YPxnrRZ_F1g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-52-exploring-mouse-touch-and-pointer-events?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-52-exploring-mouse-touch-and-pointer-events?file=index.html,script.js</a></p>',
    },

    // ── Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML & Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- index.html -->
<button id="addCardBtn">Add Card</button>
<div id="cardsContainer"></div>

// script.js
const addCardBtn = document.getElementById("addCardBtn");
const cardsContainer = document.getElementById("cardsContainer");`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Mouse Events: mousedown & mouseup ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ mousedown vs. mouseup vs. click" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A standard <code>click</code> event requires a full press-and-release cycle on the same element. You can capture each half of that interaction individually using <strong><code>mousedown</code></strong> and <strong><code>mouseup</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Instant trigger upon physical button press:
addCardBtn.addEventListener("mousedown", (event) => {
  console.log("Mouse button pressed down:", event.button);
});

// Trigger upon physical button release:
addCardBtn.addEventListener("mouseup", (event) => {
  console.log("Mouse button released!");
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── mouseenter/mouseleave vs mouseover/mouseout ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ mouseenter / mouseleave vs. mouseover / mouseout" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The difference between these pairs is event bubbling through child elements:</p><ul><li><strong><code>mouseenter</code> / <code>mouseleave</code></strong>: Fire only when crossing the element boundary. They <strong>do not bubble</strong> and ignore nested child nodes.</li><li><strong><code>mouseover</code> / <code>mouseout</code></strong>: <strong>Bubble upwards</strong> and fire repeatedly whenever moving across nested child elements.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Boundary only (cleaner, no child bubbling):
addCardBtn.addEventListener("mouseenter", () => console.log("Entered element boundary"));
addCardBtn.addEventListener("mouseleave", () => console.log("Left element boundary"));

// Bubbles across inner children:
addCardBtn.addEventListener("mouseover", () => console.log("Mouse over element or child"));
addCardBtn.addEventListener("mouseout", () => console.log("Mouse out of element or child"));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── mousemove, dblclick, wheel ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ mousemove, dblclick, and wheel Events" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Track continuous cursor coordinates:
addCardBtn.addEventListener("mousemove", (e) => {
  console.log(\`Cursor position: (\${e.clientX}, \${e.clientY})\`);
});

// Double click:
addCardBtn.addEventListener("dblclick", () => console.log("Double clicked!"));

// Wheel / trackpad scroll over element (fires even without a scrollbar):
addCardBtn.addEventListener("wheel", (e) => {
  console.log("Wheel delta Y:", e.deltaY);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Touch Events ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Touch Events (Mobile Touchscreens)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Mobile touchscreen devices dispatch dedicated touch lifecycle events:</p><ul><li><strong><code>touchstart</code></strong>: When a finger contacts the screen.</li><li><strong><code>touchmove</code></strong>: When a finger drags across the surface.</li><li><strong><code>touchend</code></strong>: When a finger lifts off the screen.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `addCardBtn.addEventListener("touchstart", () => console.log("Touch started"));
addCardBtn.addEventListener("touchmove", () => console.log("Finger moving on screen"));
addCardBtn.addEventListener("touchend", () => console.log("Touch ended"));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Unified Pointer Events ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Unified Pointer Events (Cross-Device Standard)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of writing separate mouse listeners for desktop and touch listeners for mobile, <strong>Pointer Events</strong> provide a unified standard that transparently handles mouse, stylus pen, and multitouch inputs:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Unifies mouse, touchscreen, and pen stylus:
addCardBtn.addEventListener("pointerdown", (e) => {
  console.log(\`Pointer down! Device type: \${e.pointerType}\`); // 'mouse', 'touch', or 'pen'
});

addCardBtn.addEventListener("pointermove", (e) => console.log("Pointer moving"));
addCardBtn.addEventListener("pointerleave", () => console.log("Pointer left"));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Drag & Drop Events ──
    { id: nextId(), type: "heading" as const, content: "7️⃣ HTML5 Drag & Drop Events" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Enabling native HTML5 dragging requires the <code>draggable=\"true\"</code> attribute:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- HTML -->
<h1 id="draggable" draggable="true">Drag me!</h1>

// JavaScript
const draggable = document.getElementById("draggable");
draggable.addEventListener("dragstart", (e) => console.log("Drag started"));
draggable.addEventListener("drag", (e) => console.log("Dragging node..."));
draggable.addEventListener("dragend", (e) => console.log("Drag completed"));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Interaction Events Comparison Table" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Event Family</th><th style=\"padding:8px;\">Key Events</th><th style=\"padding:8px;\">Supported Devices</th><th style=\"padding:8px;\">Best For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Mouse Events</td><td style=\"padding:8px;\"><code>mousedown</code>, <code>mouseup</code>, <code>mouseenter</code>, <code>mousemove</code></td><td style=\"padding:8px;\">Desktop / Trackpad</td><td style=\"padding:8px;\">Desktop-specific cursor interactions</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Touch Events</td><td style=\"padding:8px;\"><code>touchstart</code>, <code>touchmove</code>, <code>touchend</code></td><td style=\"padding:8px;\">Touchscreen only</td><td style=\"padding:8px;\">Mobile gestures (swipe, pinch)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Pointer Events</td><td style=\"padding:8px;\"><code>pointerdown</code>, <code>pointermove</code>, <code>pointerup</code></td><td style=\"padding:8px;\">Mouse + Touch + Stylus</td><td style=\"padding:8px;\">Modern cross-platform interfaces</td></tr><tr><td style=\"padding:8px;\">Drag Events</td><td style=\"padding:8px;\"><code>dragstart</code>, <code>drag</code>, <code>dragend</code></td><td style=\"padding:8px;\">Desktop HTML5 Drag & Drop</td><td style=\"padding:8px;\">File uploads, kanban boards</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 52: Exploring Mouse, Touch, and Pointer Events in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 52;

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

    console.log("🎉 Done! JS Lesson 52 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
