/**
 * Seed Script: React Lesson 24 — "React 24: Understanding the useDebugValue Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson24.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson24.ts
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
        "<p>React provides numerous hooks for managing state, performance, and side effects. However, there is one quiet hook designed exclusively for <strong>developer ergonomics and debugging</strong>: <code>useDebugValue</code>.</p><p><code>useDebugValue</code> allows you to attach custom human-readable labels, tags, and formatted diagnostic values to your <strong>custom hooks</strong> inside <strong>React DevTools</strong>. It does not alter your component's render behavior or runtime performance — it simply makes inspecting custom hooks inside DevTools vastly more informative.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*a-l_gxzfPqF-hGc-HyN6LA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-usedebugvalue-hook?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-usedebugvalue-hook?file=src%2FApp.js</a></p>',
    },

    // ── What is useDebugValue & Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is useDebugValue & How It Appears in DevTools 🛠️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Syntax:
useDebugValue(value, formatFunction?);

// Example inside custom hook:
useDebugValue(isOnline ? "Online 🟢" : "Offline 🔴");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Before <code>useDebugValue</code>:</strong> React DevTools displays anonymous items under the component tree:</p><pre>Hooks\n  State: 0\n  Effect</pre><p><strong>After <code>useDebugValue</code>:</strong> React DevTools clearly annotates the custom hook:</p><pre>useOnlineStatus: \"Online 🟢\"\nuseCounter: \"Count: 5\"</pre>",
    },

    // ── Example 1: useCounter with useDebugValue ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Code Example: useCounter Custom Hook 🔢" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/hooks/useCounter.js
import { useState, useDebugValue } from "react";

export default function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  // Label displayed next to useCounter in React DevTools
  useDebugValue(\`Count: \${count}\`);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}

// src/App.jsx
import React from "react";
import useCounter from "./hooks/useCounter";

export default function App() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div style={{ padding: "24px", maxWidth: "450px", margin: "0 auto" }}>
      <h2>useDebugValue Demonstration 🚀</h2>
      <p style={{ fontSize: "18px" }}>Active Count: <strong>{count}</strong></p>
      
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={increment}>➕ Increment</button>
        <button onClick={decrement}>➖ Decrement</button>
        <button onClick={reset}>🔄 Reset</button>
      </div>

      <p style={{ marginTop: "16px", color: "#64748b", fontSize: "14px" }}>
        💡 Open React DevTools &rarr; Components &rarr; App &rarr; Hooks to inspect the labeled hook!
      </p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Lazy Formatting Function ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Deferring Expensive Formatting with the 2nd Parameter 🏎️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If formatting the debug label requires expensive computation (e.g., date formatting, large array mapping), you can pass a <strong>formatting function</strong> as the second argument. React only runs this function when React DevTools is actively opened:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// The formatter function ONLY runs when DevTools inspects the component!
useDebugValue(date, (d) => d.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── When to Use Table ──
    { id: nextId(), type: "heading" as const, content: "✅ When to Use vs When to Skip useDebugValue" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Scenario</th><th style=\"padding:8px;\">Recommended?</th><th style=\"padding:8px;\">Reason</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Shared / Open-source Custom Hook Libraries</strong></td><td style=\"padding:8px;\">✅ Highly Recommended</td><td style=\"padding:8px;\">Helps consumer developers debug without inspecting hook source code</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Complex Custom Hooks (Auth, WebSocket, Geolocation)</strong></td><td style=\"padding:8px;\">✅ Recommended</td><td style=\"padding:8px;\">Provides high-level connection/auth state indicators in DevTools</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Internal Simple Hooks (useToggle, useInput)</strong></td><td style=\"padding:8px;\">❌ Optional / Skip</td><td style=\"padding:8px;\">Adds boilerplate for trivial state that is already obvious in DevTools</td></tr><tr><td style=\"padding:8px;\"><strong>Standard Functional Components</strong></td><td style=\"padding:8px;\">❌ Invalid</td><td style=\"padding:8px;\"><code>useDebugValue</code> only takes effect when called inside custom hooks</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 24: Understanding the useDebugValue Hook in React"
    const collectionTitle = "React 24: Understanding the useDebugValue Hook in React";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 24/i },
        { title: /useDebugValue/i, topics_id: topicId },
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
        order_no: 25,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 25)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 25).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 24 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
