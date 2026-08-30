/**
 * Seed Script: React Lesson 18 — "React 18: Understanding the useTransition Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson18.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson18.ts
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
        "<p>Introduced in <strong>React 18 Concurrent Mode</strong>, the <code>useTransition</code> hook allows developers to differentiate between <strong>urgent updates</strong> (direct user interactions like keystrokes, clicks, and inputs) and <strong>non-urgent / transition updates</strong> (heavy UI list filtering, big data tables, or expensive chart transitions).</p><p>By deferring non-urgent rendering into background transitions, React prevents the UI thread from freezing, ensuring inputs stay silky smooth and responsive even during massive re-renders.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*htn4q7kweWkgIYP_noyn4g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-usetranstion-hook?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-usetranstion-hook?file=src%2FApp.js</a></p>',
    },

    // ── What is useTransition & Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Syntax & The Concurrent Mental Model 🧠" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Syntax:
const [isPending, startTransition] = useTransition();

// Usage:
startTransition(() => {
  // Mark non-urgent state update here:
  setLargeList(computed50000Items);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>startTransition(callback)</code>:</strong> Flags any state setters invoked inside the callback as interruptible, low-priority transitions.</li><li><strong><code>isPending</code> (boolean):</strong> True while the background transition is rendering, allowing you to show a spinner, skeleton, or dim state.</li><li><strong>Interruptibility:</strong> If the user types another character while a transition is calculating, React pauses the old render and begins calculating the new keystroke immediately.</li></ul>",
    },

    // ── Complete Code Example: 50,000 Item List ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Complete Code Example: 50,000 Item Concurrent List 📋" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { useState, useTransition } from "react";

export default function LargeListTransition() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    // 1. Urgent Update: Input field updates instantaneously
    setInput(value);

    // 2. Non-Urgent Update: Heavy 50,000-item array generation deferred
    startTransition(() => {
      const newList = Array.from({ length: 50000 }, (_, i) => \`\${value} #\${i + 1}\`);
      setList(newList);
    });
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>React 18 useTransition Showcase 🚀</h2>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Type to filter 50,000 items..."
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: "16px",
          border: "2px solid #cbd5e1",
          borderRadius: "8px",
        }}
      />

      {/* Pending Indicator */}
      {isPending && (
        <p style={{ color: "#0284c7", fontWeight: 600, marginTop: "8px" }}>
          ⏳ Updating list in background...
        </p>
      )}

      {/* Heavy Render Area */}
      <ul
        style={{
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 0.2s ease",
          maxHeight: "350px",
          overflowY: "auto",
          marginTop: "16px",
        }}
      >
        {list.slice(0, 500).map((item, index) => (
          <li key={index} style={{ padding: "4px 0" }}>{item}</li>
        ))}
      </ul>
      {list.length > 500 && (
        <small style={{ color: "#64748b" }}>
          Showing first 500 of {list.length.toLocaleString()} items
        </small>
      )}
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Why This Matters ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Why useTransition Outperforms Traditional Setters 🏎️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Without <code>useTransition</code>, updating state blocks the main thread. If generating or rendering a list takes 200ms, the browser cannot paint user keystrokes for that entire duration, causing input freezing and jank.</p><p>With <code>useTransition</code>:</p><ol><li>Typing stays <strong>100% responsive</strong> at 60/120 FPS.</li><li>React renders the heavy UI in memory in chunks without locking up the browser.</li><li>Old, obsolete transitions are safely discarded if new keystrokes arrive mid-render.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Urgent vs Non-Urgent Updates Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Update Type</th><th style=\"padding:8px;\">Priority</th><th style=\"padding:8px;\">Examples</th><th style=\"padding:8px;\">Expected User Behavior</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Urgent Update</strong></td><td style=\"padding:8px;\">🔴 Immediate (High)</td><td style=\"padding:8px;\">Typing in input, slider dragging, button clicks, tab switches</td><td style=\"padding:8px;\">Must reflect instantaneously without noticeable latency</td></tr><tr><td style=\"padding:8px;\"><strong>Transition Update</strong></td><td style=\"padding:8px;\">🟢 Deferred (Low)</td><td style=\"padding:8px;\">Filtering search results, chart updates, page transitions</td><td style=\"padding:8px;\">Tolerates a minor delay / loading state while background finishes</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 18: Understanding the useTransition Hook in React"
    const collectionTitle = "React 18: Understanding the useTransition Hook in React";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 18/i },
        { title: /useTransition/i, topics_id: topicId },
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
        order_no: 19,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 19)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 19).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 18 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
