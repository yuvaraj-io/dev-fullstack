/**
 * Seed Script: React Lesson 02 — "React 02: React Components and Props 🚀"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson2.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson2.ts
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
        "<p>React applications are built like LEGO sets — assembling modular, isolated, and reusable UI units called <strong>Components</strong>, and passing data between them via <strong>Props (Properties)</strong>.</p><p>In this lesson, we will master creating functional components, passing props, leveraging object destructuring, managing default exports, and composing full parent-child component trees.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*rQf-gFmVaIN_LaTJsvBhhQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-components-prop" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-components-prop</a></p>',
    },

    // ── What is a Component ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ React Functional Components 🧩" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A React Component is a pure JavaScript function that accepts inputs (props) and returns a React element (JSX) describing what should appear on the screen.</p><p>Here is a basic functional component:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Normal.jsx
import React from "react";

function Normal() {
  return (
    <div className="card">
      <h4>This is a Basic Component</h4>
    </div>
  );
}

export default Normal;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── React Props ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Understanding React Props 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Props (short for properties)</strong> are how components communicate. They flow <em>unidirectionally</em> from parent to child (one-way data flow).</p><p><strong>Crucial Rule:</strong> Props are <strong>read-only (immutable)</strong>. A child component must never modify its received props directly.</p>",
    },

    // ── Component with Props (Destructuring) ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Passing & Destructuring Props 🛠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of referencing <code>props.title</code> throughout your JSX, modern React developers use JavaScript parameter destructuring <code>({ title, author, date })</code> for clean, legible code:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/PropsC.jsx (With Destructuring - Recommended ✨)
import React from "react";

function PropsC({ title, badge = "Featured" }) {
  return (
    <div className="prop-box">
      <span className="badge">{badge}</span>
      <h4>Title is: {title}</h4>
    </div>
  );
}

export default PropsC;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Comparison without Destructuring ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Props Without Destructuring (Standard Object)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For comparison, here is how the exact same component looks without destructuring:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/PropsComponent.jsx (Without Destructuring)
import React from "react";

function PropsComponent(props) {
  return (
    <div>
      <h4>Title is: {props.title}</h4>
    </div>
  );
}

export default PropsComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Using Components in App ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Composing Components in App.jsx 🖥️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now let's assemble our child components inside <code>App.jsx</code> and pass dynamic props:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import "./style.css";
import Normal from "./components/Normal";
import PropsC from "./components/PropsC";

export default function App() {
  const dynamicText = "Mastering React Components & Props";

  return (
    <div className="app-container">
      <h1>🚀 React Learning Hub</h1>

      {/* 1. Component without props */}
      <Normal />

      {/* 2. Component with string literal prop */}
      <PropsC title="Static Header Prop" badge="Beginner" />

      {/* 3. Component with dynamic variable prop */}
      <PropsC title={dynamicText} badge="Pro Tip" />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Default Exports vs Named Exports ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Module Exports & Renaming Flexibility 📝" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you export with <code>export default</code>, importing files can name the component whatever makes sense in that context:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Default export allows custom aliases:
import CustomHeader from "./components/Normal";

// Named exports require exact curly brace matching:
// export function Button() {} -> import { Button } from "./components/Button";`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Component & Props Quick Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Description</th><th style=\"padding:8px;\">Rule / Best Practice</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Component</strong></td><td style=\"padding:8px;\">Reusable, independent UI building block</td><td style=\"padding:8px;\">Always start component names with a <strong>Capital letter</strong> (e.g. <code>MyCard</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Props</strong></td><td style=\"padding:8px;\">Arguments passed into React components</td><td style=\"padding:8px;\"><strong>Read-Only</strong>: Never mutate props directly in child components</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Destructuring</strong></td><td style=\"padding:8px;\"><code>function Card({ title, id })</code></td><td style=\"padding:8px;\">Cleaner syntax, supports default fallback values</td></tr><tr><td style=\"padding:8px;\"><strong>Data Flow</strong></td><td style=\"padding:8px;\">Unidirectional (Parent ➔ Child)</td><td style=\"padding:8px;\">Predictable state tree and easier debugging</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 02: React Components and Props 🚀" (collectionId: 104)
    const collectionTitle = "React 02: React Components and Props 🚀";
    const collectionId = 104;

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
        order_no: 3,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 3)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 3).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 2 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
