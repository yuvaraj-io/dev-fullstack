/**
 * Seed Script: React Lesson 17 — "React 17: Understanding the useLayoutEffect Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson17.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson17.ts
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
        "<p>If you already understand <code>useEffect</code>, then <code>useLayoutEffect</code> is its more urgent, synchronous sibling. While <code>useEffect</code> runs <em>asynchronously after</em> the browser has painted pixels to the screen, <code>useLayoutEffect</code> fires <strong>synchronously after React updates the DOM, but before the browser paints</strong>.</p><p>That precise timing difference is critical when reading layout geometry (e.g. element dimensions, scroll positions) or mutating styles before the user can witness visual flickers, flashes, or layout jumps.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*hfZY6baVuu0jW3C8KoB8nA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-use-layout-effect?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-layout-effect?file=src%2FApp.js</a></p>',
    },

    // ── Core Timing Comparison ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Execution Timing: useEffect vs useLayoutEffect ⏱️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>useEffect</code> (Asynchronous):</strong> React renders DOM &rarr; <strong>Browser Paints Screen</strong> &rarr; <code>useEffect</code> runs in background &rarr; If state changes, browser paints again (causing visible UI flicker).</li><li><strong><code>useLayoutEffect</code> (Synchronous):</strong> React renders DOM &rarr; <code>useLayoutEffect</code> runs &amp; mutates DOM &rarr; <strong>Browser Paints Screen ONCE</strong> with the final visual state (zero flicker).</li></ul>",
    },

    // ── The Problem: Visible White Flash with useEffect ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Visible White Flash with useEffect ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this example, toggling the box state should display an updated green box. However, because <code>useEffect</code> runs after the initial paint, the user briefly catches a <strong>1-frame white flash</strong> before it turns green:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Problematic: useEffect causes visual flicker
import React, { useState, useEffect } from "react";

export default function FlashWithUseEffect() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (show) {
      // ⚠️ Runs AFTER browser has already painted the initial "white" box!
      setColor("green");
    } else {
      setColor("white");
    }
  }, [show]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide Box" : "Show Box"}
      </button>

      {show && (
        <div
          style={{
            width: "300px",
            height: "150px",
            marginTop: "20px",
            backgroundColor: color,
            border: "3px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          {color === "white" ? "⚡ White Flash!" : "✅ Green Box"}
        </div>
      )}
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── The Solution: useLayoutEffect ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The Solution: Synchronous DOM Updates with useLayoutEffect 🛡️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Replacing <code>useEffect</code> with <code>useLayoutEffect</code> blocks the browser from painting until <code>setColor('green')</code> is applied, rendering the green box instantaneously without any flash:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Solution: useLayoutEffect guarantees synchronous paint
import React, { useState, useLayoutEffect } from "react";

export default function SmoothWithUseLayoutEffect() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("white");

  // ✅ Runs BEFORE browser paints pixels to the screen
  useLayoutEffect(() => {
    if (show) {
      setColor("green");
    } else {
      setColor("white");
    }
  }, [show]);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setShow((prev) => !prev)}>
        {show ? "Hide Box" : "Show Box"}
      </button>

      {show && (
        <div
          style={{
            width: "300px",
            height: "150px",
            marginTop: "20px",
            backgroundColor: color,
            border: "3px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          {color === "white" ? "⚡ White Flash!" : "✅ Green Box (Instant)"}
        </div>
      )}
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── When to Use Guide ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Practical Real-World Use Cases 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Measuring DOM Nodes:</strong> Reading <code>element.getBoundingClientRect()</code>, <code>offsetWidth</code>, or <code>scrollHeight</code> to position tooltips, popovers, or modals dynamically.</li><li><strong>Synchronous DOM Manipulations:</strong> Scroll position adjustments, animations, and canvas operations before user sees the frame.</li><li><strong>Preventing Layout Shift:</strong> Dynamic styling based on runtime browser dimensions.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ useEffect vs useLayoutEffect Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\"><code>useEffect</code></th><th style=\"padding:8px;\"><code>useLayoutEffect</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Execution Timing</strong></td><td style=\"padding:8px;\">Asynchronous (after paint)</td><td style=\"padding:8px;\">Synchronous (before paint)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Browser Paint Blocking</strong></td><td style=\"padding:8px;\">❌ Never blocks paint</td><td style=\"padding:8px;\">⚠️ Blocks paint until execution completes</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Primary Use Cases</strong></td><td style=\"padding:8px;\">API data fetching, event listeners, timers, subscriptions</td><td style=\"padding:8px;\">DOM measurement, tooltip positioning, layout shift prevention</td></tr><tr><td style=\"padding:8px;\"><strong>Default Recommendation</strong></td><td style=\"padding:8px;\"><strong>99% of use cases</strong> (default choice)</td><td style=\"padding:8px;\">Only when visual flickering occurs</td></tr></tbody></table>",
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

    // 1. Find topic "react"
    const topic = await db.collection("topics").findOne({ name: /^react$/i });
    if (!topic) throw new Error('Topic "react" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction" for React
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found for React.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or create collection "React 17: Understanding the useLayoutEffect Hook in React"
    const collectionTitle = "React 17: Understanding the useLayoutEffect Hook in React";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 17/i },
        { title: /useLayoutEffect/i, topics_id: topicId },
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
        order_no: 18,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 18)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 18).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 17 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
