/**
 * Seed Script: React Lesson 12 — "React 12: Context API with Custom Hook"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson12.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson12.ts
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
        "<p>In Lesson 11, we saw how the basic Context API solves prop drilling. However, having consumer components import both <code>useContext</code> and raw context objects across dozens of files creates unnecessary duplication.</p><p>The industry-standard production pattern is to pair React Context with a <strong>Custom Hook</strong> and a self-contained <strong>Provider Component</strong>. In this lesson, we will build a modular architecture with <code>DataContext.jsx</code>, <code>App.jsx</code>, and <code>GrandChild.jsx</code>, complete with custom hook error boundaries and state update helpers.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*foGbAduQLlQAZPxh7Nhfhw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-context-api-custom-hook" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-context-api-custom-hook</a></p>',
    },

    // ── Architecture Goals ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Why Encapsulate Context in a Custom Hook? 🛡️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Single Import Convenience:</strong> Consumers only need <code>import { useData } from './context/DataContext'</code> instead of importing React, useContext, and the raw context.</li><li><strong>Fail-Fast Safety Check:</strong> If a developer accidentally uses the hook outside of a Provider, we can throw a descriptive error immediately.</li><li><strong>Encapsulated State Logic:</strong> State initialization, handlers, and side effects live cleanly inside the Provider file.</li></ol>",
    },

    // ── File 1: DataContext.jsx ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Step 1: Building DataContext.jsx (Provider + Custom Hook) 📦" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/context/DataContext.jsx
import React, { createContext, useContext, useState } from "react";

// 1. Create Private Context
const DataContext = createContext(undefined);

// 2. Custom Provider Component with State & Children Composition
export const DataProvider = ({ children }) => {
  const [data, setData] = useState("DATA COMING DIRECTLY FROM DATAPROVIDER");

  // Helper action function
  const updateTimestamp = () => {
    setData(\`Updated at \${new Date().toLocaleTimeString()} ⏱️\`);
  };

  const value = {
    data,
    setData,
    updateTimestamp,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom Hook with Safety Guard
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a <DataProvider>");
  }
  return context;
};`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── File 2: App.jsx ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Step 2: Wrapping Application in App.jsx 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Wrap the root component tree with <code>&lt;DataProvider&gt;</code>. Notice how clean <code>App.jsx</code> becomes since state logic is encapsulated inside <code>DataContext.jsx</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import Parent from "./components/Parent";
import { DataProvider } from "./context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <div className="app-container">
        <h1>Root App Architecture</h1>
        <Parent />
      </div>
    </DataProvider>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── File 3: GrandChild.jsx ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Step 3: Consuming & Updating Context in GrandChild.jsx 🚀" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The leaf consumer component simply calls <code>useData()</code> to read and update global state with zero intermediary props:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/GrandChild.jsx
import React from "react";
import { useData } from "../context/DataContext";

export default function GrandChild() {
  // One-line access to state and updater functions
  const { data, updateTimestamp } = useData();

  return (
    <div className="grandchild-card">
      <h4>3. GrandChild (Direct Consumer)</h4>
      <p className="status-text">📢 Current State: <strong>{data}</strong></p>
      <button onClick={updateTimestamp}>
        Update Global Timestamp ⏱️
      </button>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Standard vs Custom Hook Context Architecture" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Aspect</th><th style=\"padding:8px;\">Basic Context (Lesson 11)</th><th style=\"padding:8px;\">Context + Custom Hook (Lesson 12)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Consumer Syntax</strong></td><td style=\"padding:8px;\"><code>useContext(DataContext)</code> (2 imports)</td><td style=\"padding:8px;\"><code>useData()</code> (1 clean import)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Error Handling</strong></td><td style=\"padding:8px;\">Silently returns <code>undefined</code> if outside Provider</td><td style=\"padding:8px;\">Throws explicit helpful error immediately</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>State Encapsulation</strong></td><td style=\"padding:8px;\">State declarations clutter <code>App.jsx</code></td><td style=\"padding:8px;\">Isolated inside <code>DataProvider</code> component</td></tr><tr><td style=\"padding:8px;\"><strong>Production Readiness</strong></td><td style=\"padding:8px;\">Basic prototype pattern</td><td style=\"padding:8px;\">Enterprise industry standard</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 12: Context API with Custom Hook" (collectionId: 114)
    const collectionTitle = "React 12: Context API with Custom Hook";
    const collectionId = 114;

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
        order_no: 13,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 13)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 13).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 12 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
