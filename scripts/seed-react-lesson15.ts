/**
 * Seed Script: React Lesson 15 — "React 15: Understanding the useMemo Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson15.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson15.ts
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
        "<p>Imagine you are building a React component with an input number field, a dark/light theme switch, and a calculation that doubles the input. You toggle the theme and notice a distinct lag. Why? Because React re-runs <em>every line of calculation</em> inside the component on every single render cycle by default.</p><p>This is where the <code>useMemo</code> hook becomes your secret weapon for performance optimization. <code>useMemo</code> caches (memoizes) the return value of an expensive calculation and only re-computes it when specified dependencies change.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*WIQmMohQh0_M2uLnrNSK3g.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Links ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playgrounds on StackBlitz:</strong><br />• Before Optimization (Starter): <a href="https://stackblitz.com/edit/react-use-memo-hook-start?file=src%2Fcomponents%2FCounterComponent.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-memo-hook-start</a><br />• After Optimization (Solution): <a href="https://stackblitz.com/edit/react-use-memo-hook-end?file=src%2Fcomponents%2FCounterComponent.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-memo-hook-end</a></p>',
    },

    // ── Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The useMemo Hook Syntax 📐" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const memoizedValue = useMemo(() => {
  // 1. Expensive computation function
  return expensiveCalculation(dependencyA, dependencyB);
}, [dependencyA, dependencyB]); // 2. Dependency array`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>On initial render, React executes the factory function and stores the result. On subsequent renders, if the dependencies in the array are identical to the previous render (via <code>Object.is</code> equality), React skips the calculation and instantly returns the cached value.</p>",
    },

    // ── The Problem: Unnecessary Recomputations ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Unnecessary Heavy Calculations on Every Render 🐌" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this unoptimized example, toggling the <code>dark</code> state triggers a re-render of <code>App</code>, forcing the CPU-intensive <code>slowFunction</code> loop to run again even though <code>number</code> never changed:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Unoptimized Problematic Code
import React, { useState } from "react";

function slowFunction(num) {
  console.log("🐌 Executing heavy 1,000,000,000 iteration loop...");
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}

export default function UnoptimizedApp() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // ⚠️ Runs on EVERY state change (including theme toggle!)
  const doubleNumber = slowFunction(number);

  const themeStyles = {
    backgroundColor: dark ? "#0f172a" : "#ffffff",
    color: dark ? "#f8fafc" : "#0f172a",
  };

  return (
    <div style={themeStyles}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
      <p>Calculated Double: {doubleNumber}</p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── The Solution ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The Solution: Memoizing Values & Referential Stability ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>We wrap both the expensive calculation and the style object in <code>useMemo</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Optimized with useMemo
import React, { useState, useMemo, useEffect } from "react";

function slowFunction(num) {
  console.log("⚡ Executing slowFunction only when number changes...");
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}

export default function OptimizedApp() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // 1. Memoize expensive calculation (only re-runs when 'number' changes)
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  // 2. Memoize object reference (prevents useEffect trigger on unrelated renders)
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? "#0f172a" : "#ffffff",
      color: dark ? "#f8fafc" : "#0f172a",
      padding: "20px",
      borderRadius: "8px",
    };
  }, [dark]);

  useEffect(() => {
    console.log("🎨 Theme changed!");
  }, [themeStyles]);

  return (
    <div style={themeStyles}>
      <h2>useMemo Performance Showcase</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Toggle Theme</button>
      <p>Result: <strong>{doubleNumber}</strong></p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── When to use vs Avoid ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ When to Use vs When to Avoid useMemo 🚦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 16px;\"><div><h4>✅ DO USE useMemo when:</h4><ul><li>Calculating heavy operations (sorting, filtering large datasets >1,000 items).</li><li>Passing object/array references to memoized children (<code>React.memo</code>) or <code>useEffect</code> dependencies.</li><li>You have measured real frame drops / UI lag with React DevTools Profiler.</li></ul></div><div><h4>❌ AVOID useMemo when:</h4><ul><li>Trivial math operations (e.g. <code>2 + 2</code> or string concatenations).</li><li>Premature optimization (the memory &amp; comparison overhead of <code>useMemo</code> may exceed the saved time).</li><li>Attempting to prevent component re-renders (use <code>React.memo</code> instead).</li></ul></div></div>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Summary: useMemo Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Concept</th><th style=\"padding:8px;\">Behavior</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Primary Purpose</strong></td><td style=\"padding:8px;\">Cache computation results between render cycles</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Return Value</strong></td><td style=\"padding:8px;\">The memoized output of the function</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Dependencies</strong></td><td style=\"padding:8px;\">Re-computes only when values in dependency array change</td></tr><tr><td style=\"padding:8px;\"><strong>Difference from useCallback</strong></td><td style=\"padding:8px;\"><code>useMemo</code> caches the <em>result</em> of a function; <code>useCallback</code> caches the <em>function definition</em> itself</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 15: Understanding the useMemo Hook in React" (collectionId: 117)
    const collectionTitle = "React 15: Understanding the useMemo Hook in React";
    const collectionId = 117;

    await db.collection("collections").updateOne(
      { id: collectionId },
      { $set: { title: collectionTitle, topics_id: topicId } },
      { upsert: true }
    );
    console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);

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
        order_no: 16,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 16)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 16).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 15 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
