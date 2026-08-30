/**
 * Seed Script: React Lesson 10 — "React 10: Props Drilling in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson10.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson10.ts
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
        "<p>As React applications grow, the component tree expands with deeper nesting hierarchies. One of the most common architectural challenges developers encounter when managing state is <strong>Prop Drilling</strong> (also referred to as <em>Threading Props</em>).</p><p>Prop drilling is a top interview topic and an essential concept to master before adopting state management solutions like React Context or Redux Toolkit. In this lesson, we will understand how prop drilling works, look at code examples, analyze why it causes code maintenance headaches, and introduce how modern React solves it.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*fq6npiaFeJHmoiy6ColqJg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-props-drillling" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-props-drillling</a></p>',
    },

    // ── What is Prop Drilling ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is Prop Drilling? ⛏️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>Prop drilling refers to the process of passing data from a parent component down to a deeply nested child component through multiple intermediary components that do not need the data themselves.</em></p><p>Think of it like passing a parcel through three generations (👨 Parent &rarr; 👩 Child &rarr; 👦 GrandChild): intermediary components act purely as messengers or pipelines.</p>",
    },

    // ── Concrete Code Example ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Code Example: Multi-Level Prop Drilling Hierarchy 🏢" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the structure below, the root <code>App</code> component holds user profile data that only the deepest leaf component <code>GrandChild</code> needs:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { useState } from "react";

// Top-Level Root Component
export default function App() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "Fullstack Developer",
    age: 30
  });

  return (
    <div className="container">
      <h1>Root App Component</h1>
      {/* Passing 'user' into Parent */}
      <Parent user={user} />
    </div>
  );
}

// Level 1: Intermediary Parent Component (doesn't use 'user')
function Parent({ user }) {
  return (
    <div className="parent-box">
      <h2>1. Parent Layer</h2>
      {/* Passing 'user' into Child */}
      <Child user={user} />
    </div>
  );
}

// Level 2: Intermediary Child Component (doesn't use 'user')
function Child({ user }) {
  return (
    <div className="child-box">
      <h3>2. Child Layer</h3>
      {/* Passing 'user' into GrandChild */}
      <GrandChild user={user} />
    </div>
  );
}

// Level 3: Target Consumer Component
function GrandChild({ user }) {
  return (
    <div className="grandchild-card">
      <h4>3. GrandChild (Target Consumer)</h4>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Age:</strong> {user.age} years old</p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Problems of Prop Drilling ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Why is Prop Drilling Problematic? ⚠️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Tightly Coupled Architecture:</strong> If the prop name or data shape changes at the top level, you must manually rename and adjust props across every single intermediary component.</li><li><strong>Cluttered Boilerplate:</strong> Intermediary components receive unnecessary props that pollute their parameters and make them harder to test or reuse independently.</li><li><strong>Unnecessary Re-renders:</strong> Whenever top-level state updates, every intermediary component in the chain may re-render unless explicitly memoized.</li></ol>",
    },

    // ── Solutions Preview ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ How Do We Solve Prop Drilling? 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>React provides several powerful strategies to avoid prop drilling:</p><ul><li><strong>Component Composition (<code>children</code> prop):</strong> Passing components as children directly bypasses intermediary prop pipelines.</li><li><strong>React Context API (<code>useContext</code>):</strong> Broadcaster pattern where data can be injected at the top and consumed anywhere directly without middleman props.</li><li><strong>Global State Libraries:</strong> Redux Toolkit, Zustand, or Jotai for large enterprise workflows.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Prop Drilling Summary & Solutions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Pattern</th><th style=\"padding:8px;\">When to Use</th><th style=\"padding:8px;\">Complexity</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Standard Props Passing</strong></td><td style=\"padding:8px;\">1 – 2 component layers deep</td><td style=\"padding:8px;\">🟢 Simplest &amp; very explicit</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Component Composition (<code>children</code>)</strong></td><td style=\"padding:8px;\">Layout containers, modal shells, sidebars</td><td style=\"padding:8px;\">🟡 Low overhead, very clean</td></tr><tr><td style=\"padding:8px;\"><strong>React Context (<code>createContext</code> + <code>useContext</code>)</strong></td><td style=\"padding:8px;\">Deep trees, themes, auth sessions, user settings</td><td style=\"padding:8px;\">🔵 Native React built-in solution</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 10: Props Drilling in React" (collectionId: 112)
    const collectionTitle = "React 10: Props Drilling in React";
    const collectionId = 112;

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
        order_no: 11,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 11)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 11).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 10 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
