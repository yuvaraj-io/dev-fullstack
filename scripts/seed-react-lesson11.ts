/**
 * Seed Script: React Lesson 11 — "React 11: Overcoming Props Drilling with the Context Hook"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson11.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson11.ts
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
        "<p>In the previous lesson, we examined how <strong>Prop Drilling</strong> causes intermediate components to act as passive pipelines, leading to tight coupling and maintenance overhead. In this lesson, we will explore the built-in React solution: <strong>The React Context API (<code>createContext</code> + <code>useContext</code>)</strong>.</p><p>By implementing a Context Provider and Consumer pattern, any deeply nested child component can pull the exact data it needs directly, completely bypassing intermediate parent components.</p>",
    },

    // ── Problems of Prop Drilling Recap ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Key Problems Solved by Context API 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Improved Code Readability:</strong> Eliminates cluttering intermediary components with pass-through props.</li><li><strong>Decoupled Architecture:</strong> Middle layers (<code>Parent</code>, <code>Child</code>) no longer need knowledge of props consumed by <code>GrandChild</code>.</li><li><strong>Seamless Refactoring:</strong> Moving components or restructuring the tree no longer breaks prop pipelines.</li></ol>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*fAguiNlAUv3Yrd3ozVc5eA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-contexxt-api" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-contexxt-api</a></p>',
    },

    // ── The 3 Core Steps of Context API ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The 3-Step Context API Pattern 🪜" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Working with React Context always involves three distinct steps:</p><ol><li><strong>Create the Context:</strong> Instantiate a shared context object with <code>createContext()</code>.</li><li><strong>Provide the Value:</strong> Wrap your component tree with <code>&lt;MyContext.Provider value={...}&gt;</code> to broadcast data downwards.</li><li><strong>Consume the Value:</strong> Use the <code>useContext(MyContext)</code> hook inside any descendant component to read the broadcasted value.</li></ol>",
    },

    // ── Complete Code Implementation ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Complete Code Example: Broadcasting Data with useContext 📡" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Create Context Object
export const DataContext = createContext(null);

export default function App() {
  const [data, setData] = useState("DATA COMING DIRECTLY FROM ROOT APP");

  return (
    // 2. Wrap tree in Provider and pass data via value prop
    <DataContext.Provider value={{ data, setData }}>
      <div className="app-container">
        <h1>Root App Component</h1>
        <Parent />
      </div>
    </DataContext.Provider>
  );
}

// Intermediary Component 1: Clean, zero prop clutter!
function Parent() {
  return (
    <div className="parent-box">
      <h2>1. Parent Layer</h2>
      <Child />
    </div>
  );
}

// Intermediary Component 2: Clean, zero prop clutter!
function Child() {
  return (
    <div className="child-box">
      <h3>2. Child Layer</h3>
      <GrandChild />
    </div>
  );
}

// Target Consumer Component
function GrandChild() {
  // 3. Consume Context directly using useContext Hook
  const { data, setData } = useContext(DataContext);

  return (
    <div className="grandchild-card">
      <h4>3. GrandChild (Direct Consumer)</h4>
      <p className="highlight">📢 Broadcasted Value: <strong>{data}</strong></p>
      <button onClick={() => setData("UPDATED FROM GRANDCHILD! 🚀")}>
        Update Global Data
      </button>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Behind the Scenes: How It Works ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Behind the Scenes: How React Context Works ⚙️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When <code>setData</code> is triggered from <code>GrandChild</code>:</p><ul><li>React updates the <code>data</code> state inside the root <code>App</code> component.</li><li>The <code>DataContext.Provider</code> receives the new <code>value</code> reference.</li><li>React automatically re-renders only the consumers calling <code>useContext(DataContext)</code> (like <code>GrandChild</code>), without requiring <code>Parent</code> and <code>Child</code> to pass props manually.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Props Drilling vs Context API" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\">Props Drilling</th><th style=\"padding:8px;\">Context API</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Data Pathway</strong></td><td style=\"padding:8px;\">Threaded through every intermediate component</td><td style=\"padding:8px;\">Direct broadcast from Provider to Consumer</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Middleman Clutter</strong></td><td style=\"padding:8px;\">High parameter pollution</td><td style=\"padding:8px;\">Zero pass-through props required</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Component Reusability</strong></td><td style=\"padding:8px;\">Harder due to tightly coupled parent props</td><td style=\"padding:8px;\">Highly modular &amp; standalone</td></tr><tr><td style=\"padding:8px;\"><strong>Best For</strong></td><td style=\"padding:8px;\">Shallow trees (1–2 layers)</td><td style=\"padding:8px;\">Auth context, theme toggle, multi-layer settings</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 11: Overcoming Props Drilling with the Context Hook" (collectionId: 113)
    const collectionTitle = "React 11: Overcoming Props Drilling with the Context Hook";
    const collectionId = 113;

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
        order_no: 12,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 12)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 12).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 11 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
