/**
 * Seed Script: React Lesson 21 — "React 21: Custom Hooks — Building Reusable Logic"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson21.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson21.ts
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
        "<p>React provides a rich suite of built-in hooks — <code>useState</code>, <code>useEffect</code>, <code>useMemo</code>, <code>useCallback</code>, etc. But as applications grow, duplicating stateful logic (fetching APIs, managing timers, listening to browser events, toggling modals) across multiple components quickly becomes cumbersome.</p><p><strong>Custom Hooks</strong> allow you to extract component logic into reusable JavaScript functions. Whenever you want to share stateful logic between two or more components without duplicating code or creating messy component wrappers, custom hooks are the idiomatic React solution.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*2VSFndmcp4EFgHqmdsig7Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-custom-hook-react?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-custom-hook-react?file=src%2FApp.js</a></p>',
    },

    // ── What is a Custom Hook & Rules ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is a Custom Hook? The Golden Rules 📜" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Naming Rule:</strong> Must start with <code>use</code> (e.g., <code>useCounter</code>, <code>useToggle</code>, <code>useFetch</code>, <code>useOnlineStatus</code>). This convention lets React's linter automatically enforce the rules of hooks.</li><li><strong>Hook Composition:</strong> Can call any other React hooks inside (<code>useState</code>, <code>useEffect</code>, <code>useRef</code>, etc.).</li><li><strong>Isolated State:</strong> Each component calling a custom hook gets its own independent state. Custom hooks share stateful <em>logic</em>, not state itself.</li></ul>",
    },

    // ── Example 1: useCounter ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Example 1: useCounter (Reusable State & Action Handlers) 🔢" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/hooks/useCounter.js
import { useState } from "react";

export default function useCounter(initial = 0, step = 1) {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 2: useToggle ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Example 2: useToggle (Modal & Drawer State) 🎚️" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/hooks/useToggle.js
import { useState } from "react";

export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

// Usage in Component:
// const [isModalOpen, toggleModal] = useToggle(false);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 3: useFetch ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Example 3: useFetch (API Data Fetching with Abort / Loading) 🌐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/hooks/useFetch.js
import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 4: useOnlineStatus ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Example 4: useOnlineStatus (Browser Events + useDebugValue) 🟢" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/hooks/useOnlineStatus.js
import { useState, useEffect, useDebugValue } from "react";

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  // Displays custom label in React DevTools
  useDebugValue(online ? "Online 🟢" : "Offline 🔴");

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── App Integration ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Consuming Custom Hooks in App.jsx 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import useCounter from "./hooks/useCounter";
import useToggle from "./hooks/useToggle";
import useFetch from "./hooks/useFetch";
import useOnlineStatus from "./hooks/useOnlineStatus";

export default function App() {
  const isOnline = useOnlineStatus();
  const [isOpen, toggleMenu] = useToggle(false);
  const { count, increment, decrement, reset } = useCounter(10);
  const { data: posts, loading } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2>React Custom Hooks Demonstration 🚀</h2>
      
      <p>Connection: <strong>{isOnline ? "🟢 Online" : "🔴 Offline"}</strong></p>

      {/* 1. useCounter */}
      <section style={{ padding: "12px", background: "#f1f5f9", borderRadius: "8px", marginBottom: "16px" }}>
        <h4>Counter: {count}</h4>
        <button onClick={increment}>➕ Add</button>{" "}
        <button onClick={decrement}>➖ Sub</button>{" "}
        <button onClick={reset}>🔄 Reset</button>
      </section>

      {/* 2. useToggle */}
      <section style={{ padding: "12px", background: "#f1f5f9", borderRadius: "8px", marginBottom: "16px" }}>
        <h4>Menu State: {isOpen ? "Open 📂" : "Closed 📁"}</h4>
        <button onClick={toggleMenu}>Toggle Menu</button>
      </section>

      {/* 3. useFetch */}
      <section style={{ padding: "12px", background: "#f1f5f9", borderRadius: "8px" }}>
        <h4>API Data (useFetch):</h4>
        {loading && <p>⏳ Loading posts...</p>}
        {posts?.slice(0, 3).map((post) => (
          <div key={post.id} style={{ borderBottom: "1px solid #cbd5e1", padding: "6px 0" }}>
            <strong>{post.title}</strong>
          </div>
        ))}
      </section>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Custom Hook Benefits Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Benefit</th><th style=\"padding:8px;\">Why It Matters</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>DRY (Don't Repeat Yourself)</strong></td><td style=\"padding:8px;\">Write complex event listeners, intervals, or fetching logic once and reuse it across 100 components.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Clean Component Architecture</strong></td><td style=\"padding:8px;\">Keeps JSX presentation components focused purely on rendering rather than tangled side effects.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Isolated & Testable</strong></td><td style=\"padding:8px;\">Custom hooks can be unit tested independently using <code>@testing-library/react-hooks</code>.</td></tr><tr><td style=\"padding:8px;\"><strong>Declarative Logic</strong></td><td style=\"padding:8px;\">Transforms imperative subscriptions into intuitive, 1-line declarative abstractions.</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 21: Custom Hooks — Building Reusable Logic"
    const collectionTitle = "React 21: Custom Hooks — Building Reusable Logic";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 21/i },
        { title: /building reusable logic/i, topics_id: topicId },
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
        order_no: 22,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 22)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 22).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 21 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
