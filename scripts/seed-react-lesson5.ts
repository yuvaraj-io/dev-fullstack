/**
 * Seed Script: React Lesson 05 — "React 05: Conditional Rendering and Looping Through Arrays in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson5.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson5.ts
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
        "<p>Modern web applications constantly change what they display based on user actions, network states, and data availability. In React, this is handled seamlessly with <strong>Conditional Rendering</strong> and <strong>Array Transformations</strong> using standard JavaScript syntax.</p><p>In this lesson, we will master the 4 core ways to conditionally render JSX (<code>if/else</code>, Ternary Operators, Logical <code>&&</code>, Early Returns) and how to transform data arrays into lists of UI components using the <code>map()</code> method alongside unique <code>key</code> props.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*8-GW1szUjqfdn1Ekosdq_A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-conditional-renderring" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-conditional-renderring</a></p>',
    },

    // ── Section 1: Setting up App ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Setting Up the Application Architecture 🛠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Let's create an <code>App.jsx</code> parent component that passes boolean flags and an array of items to a dedicated child presentation component:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import "./style.css";
import RenderingComponent from "./components/RenderingComponent";

export default function App() {
  const fruitList = ["Apple", "Banana", "Cherry", "Dragonfruit"];

  return (
    <div className="app-container">
      <h1>Conditional Rendering & List Iteration</h1>
      <RenderingComponent 
        renderInfo={true} 
        renderList={fruitList} 
      />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Section 2: Conditional Rendering Techniques ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Mastering Conditional Rendering 🔀" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>There are multiple elegant patterns to conditionally render elements in React depending on complexity:</p>",
    },

    // Approach A: Variable with if Statement
    { id: nextId(), type: "heading" as const, content: "Approach A: External Variables with if Statements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Store the JSX in a let variable prior to the <code>return</code> statement. Best for multi-branch complex logic:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let infoContent = null;

if (renderInfo) {
  infoContent = (
    <div className="alert-box">
      <i>ℹ️ Displayed using standard if condition logic</i>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // Approach B: Ternary Operator
    { id: nextId(), type: "heading" as const, content: "Approach B: Inline Ternary Operator (condition ? A : B)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Perfect for clean inline conditional switching directly inside your JSX tree:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `{renderInfo ? (
  <span className="status-badge active">✅ Active Mode</span>
) : (
  <span className="status-badge inactive">❌ Offline Mode</span>
)}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // Approach C: Short-circuit Evaluation (&&)
    { id: nextId(), type: "heading" as const, content: "Approach C: Short-Circuit Logical AND (condition && JSX)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you want to render an element only when a condition is <code>true</code> and render nothing otherwise:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `{renderInfo && (
  <p className="notice">💡 Notice: System is running normally.</p>
)}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Section 3: Looping with Array.map() ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Looping Through Arrays with Array.prototype.map() 🔁" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In React, we do not use <code>for</code> loops inside JSX. Instead, we use the standard JavaScript <code>Array.map()</code> function to transform each raw item into a JSX element.</p><p><strong>The Golden Rule of Keys:</strong> Every item returned from <code>map()</code> must have a unique, stable <code>key</code> prop (preferably an item ID) so React's Virtual DOM diffing engine can track insertions, deletions, and updates accurately.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Iterating through arrays with unique keys
<ul className="item-list">
  {renderList.map((item, index) => (
    <li key={index} className="list-card">
      <span className="badge">#{index + 1}</span> {item}
    </li>
  ))}
</ul>`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Section 4: Complete RenderingComponent Implementation ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Complete Component Implementation 📦" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/RenderingComponent.jsx
import React from "react";

function RenderingComponent({ renderInfo, renderList = [] }) {
  // 1. If statement approach
  let renderedInfo = null;
  if (renderInfo) {
    renderedInfo = <i>Alphabets with words: Displayed using if Condition<br /></i>;
  }

  // 2. Early return guard clause for empty states
  if (!renderList || renderList.length === 0) {
    return <p className="empty-state">No items found in the list.</p>;
  }

  return (
    <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      {/* Render if condition variable */}
      {renderedInfo}

      {/* Render Ternary expression */}
      {renderInfo ? (
        <p style={{ color: "#16a34a" }}>
          <i>Alphabets with words: Displayed using ternary operator</i>
        </p>
      ) : (
        <p style={{ color: "#dc2626" }}>No info received</p>
      )}

      {/* Looping array with map */}
      <ul>
        {renderList.map((item, index) => (
          <li key={index} style={{ padding: "4px 0" }}>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RenderingComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Conditional & Loop Patterns Cheat Sheet" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Pattern</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Best Used For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Ternary Operator</strong></td><td style=\"padding:8px;\"><code>{flag ? &lt;A /&gt; : &lt;B /&gt;}</code></td><td style=\"padding:8px;\">Two-way toggle (A vs B) inline JSX</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Logical AND (<code>&amp;&amp;</code>)</strong></td><td style=\"padding:8px;\"><code>{flag &amp;&amp; &lt;Modal /&gt;}</code></td><td style=\"padding:8px;\">Render something or nothing</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Early Return</strong></td><td style=\"padding:8px;\"><code>if (loading) return &lt;Spinner /&gt;;</code></td><td style=\"padding:8px;\">Full-page loading or error guards</td></tr><tr><td style=\"padding:8px;\"><strong>Array <code>map()</code></strong></td><td style=\"padding:8px;\"><code>{items.map(x =&gt; &lt;Li key={x.id}&gt;...&lt;/Li&gt;)}</code></td><td style=\"padding:8px;\">Rendering dynamic lists and tables</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 05: Conditional Rendering and Looping Through Arrays in React" (collectionId: 107)
    const collectionTitle = "React 05: Conditional Rendering and Looping Through Arrays in React";
    const collectionId = 107;

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
        order_no: 6,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 6)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 6).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 5 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
