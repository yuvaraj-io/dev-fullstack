/**
 * Seed Script: React Lesson 09 — "React 09: Understanding the useRef Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson9.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson9.ts
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
        "<p>While React manages UI state declaratively using <code>useState</code>, there are scenarios where you need to hold data <strong>without triggering component re-renders</strong>, or directly interact with underlying native HTML DOM nodes (like managing focus, measuring dimensions, or controlling audio/video elements).</p><p>The <code>useRef</code> hook provides a persistent, mutable container that retains its <code>.current</code> value across every render cycle. In this lesson, we will master accessing DOM elements, holding mutable timers/interval IDs, and tracking previous state values.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*ewNXKjrCyre4qrAAyySPIg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-use-ref-hooks" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-ref-hooks</a></p>',
    },

    // ── What is useRef ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is the useRef Hook? 🔍" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>useRef</code> returns a plain JavaScript object with a single mutable property called <code>current</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `import { useRef } from "react";

const myRef = useRef(initialValue);
// myRef returns { current: initialValue }`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Crucial Rule:</strong> Modifying <code>myRef.current = newValue</code> does <em>NOT</em> trigger a component re-render. It is like a secret mutable instance variable attached to the component lifecycle.</p>",
    },

    // ── Use Case 1: Accessing DOM Elements Directly ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Use Case 1: Direct DOM Manipulation & Focus Control 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In React, avoid using <code>document.getElementById</code> or <code>document.querySelector</code>. Instead, attach a ref directly to any JSX tag with the <code>ref</code> attribute:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/FocusInput.jsx
import React, { useRef } from "react";

const FocusInput = () => {
  // 1. Create a ref initialized to null
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 2. Access the native DOM node via inputRef.current
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.borderColor = "#2563eb";
    }
  };

  return (
    <div className="focus-demo-box">
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Click button to focus me..." 
      />
      <button onClick={handleFocus}>Focus Input 🎯</button>
    </div>
  );
};

export default FocusInput;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Use Case 2: Storing Mutable Background Values ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Use Case 2: Storing Mutable Timer IDs & Background Handles ⏱️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When holding values that shouldn't affect the visible JSX tree (like timer IDs, WebSocket connections, or render counts), storing them in <code>useRef</code> prevents unnecessary re-renders:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/StopwatchTimer.jsx
import React, { useState, useRef, useEffect } from "react";

const StopwatchTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Store the setInterval ID without causing re-renders
  const timerIdRef = useRef(null);

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerIdRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    pauseTimer();
    setSeconds(0);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  return (
    <div className="timer-card">
      <h3>Elapsed Time: {seconds}s</h3>
      <div className="btn-group">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default StopwatchTimer;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Use Case 3: Tracking Previous State ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Use Case 3: Capturing Previous Props & State Values 🔄" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Because <code>useEffect</code> runs after the DOM is committed, you can save the current state snapshot into a ref so it serves as the 'previous value' on subsequent renders:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/PreviousStateTracker.jsx
import React, { useState, useRef, useEffect } from "react";

const PreviousStateTracker = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    // Stores current count AFTER render completes, ready for the next cycle
    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="state-tracker">
      <p>Current Score: <strong>{count}</strong></p>
      <p>Previous Score: <strong>{prevCountRef.current}</strong></p>
      <button onClick={() => setCount(count + 5)}>+5 Points</button>
    </div>
  );
};

export default PreviousStateTracker;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table: useState vs useRef ──
    { id: nextId(), type: "heading" as const, content: "✅ useState vs useRef Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\"><code>useState</code></th><th style=\"padding:8px;\"><code>useRef</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Triggers Re-render?</strong></td><td style=\"padding:8px;\">✅ Yes, updating state re-renders component</td><td style=\"padding:8px;\">❌ No, updating <code>.current</code> is silent</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Access Method</strong></td><td style=\"padding:8px;\">Value variable directly (<code>count</code>)</td><td style=\"padding:8px;\">Via <code>.current</code> property (<code>ref.current</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Primary Use Case</strong></td><td style=\"padding:8px;\">Data that directly drives UI rendering</td><td style=\"padding:8px;\">DOM node access, timers, render counters</td></tr><tr><td style=\"padding:8px;\"><strong>Persistence</strong></td><td style=\"padding:8px;\">Preserved across re-renders</td><td style=\"padding:8px;\">Preserved across re-renders</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 09: Understanding the useRef Hook in React" (collectionId: 111)
    const collectionTitle = "React 09: Understanding the useRef Hook in React";
    const collectionId = 111;

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
        order_no: 10,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 10)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 10).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 9 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
