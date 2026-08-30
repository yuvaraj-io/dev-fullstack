/**
 * Seed Script: React Lesson 04 — "React 04: Understanding the children Prop in React 🌟"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson4.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson4.ts
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
        "<p>One of React's most powerful architectural features is <strong>component composition</strong>. Instead of configuring components with dozens of custom props, React provides a built-in special prop called <code>children</code>.</p><p>The <code>children</code> prop allows components to act as generic wrappers, containers, or layout shells (e.g., Cards, Dialogs, Sidebars, Grids) that can accept and render any arbitrary nested JSX passed between their opening and closing tags.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:625/1*-rLClrc-_kKliipHb-2hOw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Demo on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-children-prop" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-children-prop</a></p>',
    },

    // ── What is the children prop ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is the children Prop? 🤔" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>children</code> prop is automatically populated by React for every component. Whatever JSX elements, text, or child components you place between <code>&lt;MyComponent&gt; ... &lt;/MyComponent&gt;</code> become accessible inside <code>MyComponent</code> as <code>props.children</code>.</p>",
    },

    // ── Basic Container Example ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Basic Container Example 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Let's create a reusable <code>Container</code> wrapper component that styles any inner content with borders and padding:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Container.jsx
import React from "react";

function Container({ children }) {
  return (
    <div style={{ border: "2px dashed #6366f1", padding: "16px", borderRadius: "12px" }}>
      {/* Renders whatever JSX was nested inside <Container> */}
      {children}
    </div>
  );
}

export default Container;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import Container from "./components/Container";

export default function App() {
  return (
    <div className="app">
      <Container>
        <h1>Hello World!</h1>
        <p>This paragraph and heading are rendered via the children prop.</p>
      </Container>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Combining children with Callbacks & Props ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Combining children with Props & Callbacks 🧒" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can seamlessly combine standard props, callback event functions, and the <code>children</code> prop in the same component:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/ChildComponent.jsx
import React from "react";

function ChildComponent({ funcPass, children }) {
  const handleAction = () => {
    funcPass("Event triggered from Child wrapper! 🚀");
  };

  return (
    <div style={{ background: "#f1f5f9", padding: "16px", borderRadius: "12px" }}>
      {/* 1. Render nested children slot */}
      <div className="slot-content">
        {children}
      </div>

      {/* 2. Interactive action button */}
      <button onClick={handleAction} style={{ marginTop: "12px" }}>
        Notify Parent
      </button>
    </div>
  );
}

export default ChildComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Normal.jsx
import React from "react";

function Normal() {
  return (
    <div>
      <h4>📌 This is a nested Normal Component</h4>
      <p>I was passed inside ChildComponent tags.</p>
    </div>
  );
}

export default Normal;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import ChildComponent from "./components/ChildComponent";
import Normal from "./components/Normal";

export default function App() {
  const handleParentLog = (data) => {
    console.log("Parent received:", data);
  };

  return (
    <div className="container">
      <h1>Understanding Composition & Children</h1>
      
      {/* Normal is passed as children into ChildComponent */}
      <ChildComponent funcPass={handleParentLog}>
        <Normal />
      </ChildComponent>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Why Use the children Prop? ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Core Benefits of the children Prop 🚀" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Infinite Composability:</strong> Build flexible layouts (Split-panes, Modals, Accordions, Cards) without hardcoding inner elements.</li><li><strong>Eliminates Prop Drilling:</strong> Rather than passing data 5 levels down just to render a button, pass the button directly as a child where the data is already in scope.</li><li><strong>Clean Separation of Concerns:</strong> The container focuses purely on layout, styling, and frame logic; the caller dictates what content goes inside.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Composition vs Config Props Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Approach</th><th style=\"padding:8px;\">Example Syntax</th><th style=\"padding:8px;\">Best For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Standard Props</strong></td><td style=\"padding:8px;\"><code>&lt;Card title=\"Header\" subtitle=\"Text\" /&gt;</code></td><td style=\"padding:8px;\">Primitive values (strings, numbers, flags)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Children Prop</strong></td><td style=\"padding:8px;\"><code>&lt;Card&gt;&lt;Avatar /&gt;&lt;Bio /&gt;&lt;/Card&gt;</code></td><td style=\"padding:8px;\">Arbitrary layouts, nested components, wrappers</td></tr><tr><td style=\"padding:8px;\"><strong>Specialized Slots</strong></td><td style=\"padding:8px;\"><code>&lt;Modal header={&lt;Nav /&gt;} footer={&lt;Btns /&gt;}&gt;...&lt;/Modal&gt;</code></td><td style=\"padding:8px;\">Multi-slot component layouts</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 04: Understanding the children Prop in React 🌟" (collectionId: 106)
    const collectionTitle = "React 04: Understanding the children Prop in React 🌟";
    const collectionId = 106;

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
        order_no: 5,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 5)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 5).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 4 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
