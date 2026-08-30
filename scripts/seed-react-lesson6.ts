/**
 * Seed Script: React Lesson 06 — "React 06: Styling in React: Scenarios and Code Examples"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson6.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson6.ts
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
        "<p>Styling is a core aspect of building engaging React web applications. Because React unifies logic and markup in components, developers have several powerful patterns to style UI elements.</p><p>In this lesson, we will explore the 4 essential styling strategies in React: <strong>Global CSS stylesheets</strong>, <strong>Parent-to-Child style prop delegation</strong>, <strong>Styled Container wrappers with the <code>children</code> prop</strong>, and <strong>Dynamic camelCase Inline style objects</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*1wcGNw1BMeoVBD41L_FMtQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Demo on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-styling-scenarios" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-styling-scenarios</a></p>',
    },

    // ── Strategy 1: Global CSS Stylesheets ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Global Styling with External CSS Files 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The most traditional approach is creating standard <code>.css</code> files and importing them directly into your component. These classes are applied globally across the entire document:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `/* src/App.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f8fafc;
  margin: 0;
  padding: 0;
}

.header {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  padding: 24px;
  color: #ffffff;
  text-align: center;
}

.content {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}`,
      codeType: "css",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Welcome to My React App</h1>
      </header>
      <main className="content">
        <p>This layout is styled using global CSS classes.</p>
      </main>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Strategy 2: Parent Controlling Child Styles via Props ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Parent-to-Child Style Delegation via Props 👨‍👦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a parent component needs to dynamically configure or override the color, typography, or spacing of a child component, pass a style object as a prop:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/ChildComponent.jsx
import React from "react";

const ChildComponent = ({ style, label = "Child Component" }) => {
  return (
    <p style={style}>
      {label} (Styled by Parent Prop)
    </p>
  );
};

export default ChildComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/ParentComponent.jsx
import React from "react";
import ChildComponent from "./components/ChildComponent";

const ParentComponent = () => {
  const customChildStyle = {
    color: "#2563eb",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#eff6ff",
    padding: "12px",
    borderRadius: "8px",
  };

  return (
    <div>
      <h2>Parent Component</h2>
      <ChildComponent style={customChildStyle} label="Dynamic Blue Alert" />
    </div>
  );
};

export default ParentComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Strategy 3: Styled Container with children ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Styled Containers with the children Prop 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Combine layout styling with component composition by wrapping arbitrary elements inside a styled Container:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Container.jsx
import React from "react";

const Container = ({ children, style = {} }) => {
  const defaultStyles = {
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "20px",
    margin: "16px 0",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    ...style, // allow caller overrides
  };

  return <div style={defaultStyles}>{children}</div>;
};

export default Container;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Strategy 4: Dynamic Inline Styles ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Declaring Dynamic Inline Styles (style={{ ... }}) ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In React JSX, inline styles are written as <strong>JavaScript objects</strong> rather than CSS strings. Property names use <strong>camelCase</strong> (e.g. <code>backgroundColor</code> instead of <code>background-color</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/InlineStyleButton.jsx
import React, { useState } from "react";

const InlineStyleButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered ? "#15803d" : "#16a34a",
    color: "#ffffff",
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? "Ready to Click! ✨" : "Hover Over Me"}
    </button>
  );
};

export default InlineStyleButton;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "✅ React Styling Strategies Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Method</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Pros</th><th style=\"padding:8px;\">Cons</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Global CSS</strong></td><td style=\"padding:8px;\"><code>import './style.css'</code></td><td style=\"padding:8px;\">Full CSS features (pseudo-classes, media queries)</td><td style=\"padding:8px;\">Potential class name collisions across large apps</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Style Props</strong></td><td style=\"padding:8px;\"><code>&lt;Child style={custom} /&gt;</code></td><td style=\"padding:8px;\">Parent controls dynamic theme &amp; sizing</td><td style=\"padding:8px;\">Extra prop passing logic</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Container Wrapper</strong></td><td style=\"padding:8px;\"><code>&lt;Box&gt;{children}&lt;/Box&gt;</code></td><td style=\"padding:8px;\">Encapsulated reusable card &amp; layout frame</td><td style=\"padding:8px;\">Adds wrapper DOM nodes if unoptimized</td></tr><tr><td style=\"padding:8px;\"><strong>Inline Objects</strong></td><td style=\"padding:8px;\"><code>style={{ color: 'red' }}</code></td><td style=\"padding:8px;\">Direct access to component state &amp; props</td><td style=\"padding:8px;\">No native pseudo-elements (<code>:hover</code>, <code>::before</code>)</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 06: Styling in React: Scenarios and Code Examples" (collectionId: 108)
    const collectionTitle = "React 06: Styling in React: Scenarios and Code Examples";
    const collectionId = 108;

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
        order_no: 7,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 7)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 7).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 6 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
