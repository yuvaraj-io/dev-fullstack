/**
 * Seed Script: React Lesson 16 — "React 16: Understanding the useCallback Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson16.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson16.ts
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
        "<p>Every React developer eventually encounters a puzzling scenario: a child component keeps re-rendering or a child <code>useEffect</code> keeps firing repeatedly even though no relevant state changed. When you inspect the culprit, you realize an innocent callback function passed down as a prop is being <strong>recreated on every single render</strong> of the parent.</p><p>Because functions in JavaScript compare by reference rather than by value, each newly created function reference triggers downstream effects and re-renders. This is where <code>useCallback</code> comes to the rescue: it preserves a stable function reference between renders unless its dependencies change.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*lHpoyhmcHx9eVvd3V6dWuA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Links ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playgrounds on StackBlitz:</strong><br />• Before Optimization (Starter): <a href="https://stackblitz.com/edit/react-usecallback-hooks-start?file=src%2Fcomponents%2FCounterComponent.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-usecallback-hooks-start</a><br />• After Optimization (Solution): <a href="https://stackblitz.com/edit/react-usecallback-hooks?file=src%2Fcomponents%2FCounterComponent.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-usecallback-hooks</a></p>',
    },

    // ── What is useCallback & Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is useCallback and How Does It Work? 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>useCallback</code> caches a <strong>function definition</strong> across renders:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const memoizedCallback = useCallback(() => {
  // Callback logic
  doSomething(dependencyA, dependencyB);
}, [dependencyA, dependencyB]); // Only recreated when these change`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── The Problem: Unstable Function References ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Function Re-creation Triggers Child Effects ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this starter example, changing the theme in <code>Counter</code> recreates <code>getItems</code>. The child <code>List</code> component has a <code>useEffect</code> depending on <code>[getItems]</code>, which detects a brand new reference and executes needlessly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Problematic Parent: Counter.jsx
import React, { useState } from "react";
import List from "./List";

export default function Counter() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // ⚠️ Recreated every time 'dark' or 'number' causes a render!
  const getItems = () => {
    console.log("⚠️ Function getItems recreated in memory");
    return [number, number + 1, number + 2];
  };

  const theme = {
    backgroundColor: dark ? "#334155" : "#f8fafc",
    color: dark ? "#ffffff" : "#0f172a",
    padding: "20px",
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
      <List getItems={getItems} />
    </div>
  );
}

// Child: List.jsx
function List({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems());
    console.log("🐌 Child effect triggered because getItems reference changed!");
  }, [getItems]);

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── The Solution ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The Solution: Stabilizing References with useCallback ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By wrapping <code>getItems</code> in <code>useCallback</code> with <code>[number]</code> as the only dependency, toggling <code>dark</code> theme will reuse the exact same function reference:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Solution: Counter.jsx with useCallback
import React, { useState, useCallback } from "react";
import List from "./List";

export default function Counter() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // ✅ Only recreated when 'number' changes!
  const getItems = useCallback(() => {
    console.log("✅ getItems recreated only on number change");
    return [number, number + 1, number + 2];
  }, [number]);

  const theme = {
    backgroundColor: dark ? "#334155" : "#f8fafc",
    color: dark ? "#ffffff" : "#0f172a",
    padding: "20px",
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
      <List getItems={getItems} />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Difference between useMemo and useCallback ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ useCallback vs useMemo: What's the Difference? ⚖️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Both hooks receive a function and a dependency array, but they cache completely different things:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// useMemo: Runs fn() and caches the RESULT (value / object / array)
const cachedValue = useMemo(() => calculateResult(a, b), [a, b]);

// useCallback: Caches the FUNCTION DEFINITION itself (without executing it)
const cachedFunction = useCallback((delta) => {
  return calculateResult(a + delta, b);
}, [a, b]);

// Note: useCallback(fn, deps) is equivalent to useMemo(() => fn, deps)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ When to Use useCallback" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Scenario</th><th style=\"padding:8px;\">Use <code>useCallback</code>?</th><th style=\"padding:8px;\">Reason</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Passing callback to child with <code>useEffect(..., [fn])</code></td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Prevents infinite or unnecessary effect executions</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Passing callback to memoized child (<code>React.memo</code>)</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Maintains prop equality so child skips re-renders</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Basic button click handler on a native HTML <code>&lt;button&gt;</code></td><td style=\"padding:8px;\">❌ No</td><td style=\"padding:8px;\">Unnecessary overhead; native elements don't benefit from referential caching</td></tr><tr><td style=\"padding:8px;\">Custom Hook returning utility functions</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">Provides consumer components with stable helper references</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 16: Understanding the useCallback Hook in React"
    const collectionTitle = "React 16: Understanding the useCallback Hook in React";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 16/i },
        { title: /useCallback/i, topics_id: topicId },
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
        order_no: 17,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 17)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 17).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 16 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
