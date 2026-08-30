/**
 * Seed Script: React Lesson 00 — "Overview of React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson0.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson0.ts
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
        "<p>React was created in <strong>2013</strong> by <strong>Jordan Walke</strong>, a software engineer at Facebook (Meta). Today, it is the world's most widely adopted JavaScript library for building fast, declarative, and component-driven user interfaces.</p><p>Its breakthrough design patterns — such as the <strong>Virtual DOM</strong>, <strong>reusable component architecture</strong>, and modern compiler integration with <strong>Babel</strong> and <strong>Vite</strong> — revolutionize how stateful frontend applications are designed and maintained.</p>",
    },

    // ── What is React ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is React?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>React is a declarative, component-based JavaScript library for building user interfaces</strong>, particularly modern Single-Page Applications (SPAs) where data changes dynamically over time without requiring page refreshes.</p><p>Key foundations of React:</p><ul><li><strong>Component-Driven:</strong> Build encapsulated components that manage their own state, then compose them to create complex UIs.</li><li><strong>Declarative:</strong> Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</li><li><strong>Learn Once, Write Anywhere:</strong> Develop new features in React without rewriting existing code, powering web (React DOM), native mobile apps (React Native), and desktop apps.</li></ul>",
    },

    // ── Setting Up React Project with Vite ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Setting Up a Modern React Project (Vite)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The modern industry standard to bootstrap React applications is <strong>Vite</strong> — an ultra-fast frontend build tool powered by native ES modules and Rollup/esbuild.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `# Step 1: Create a new React project with Vite
npm create vite@latest my-app -- --template react

# (Optional) If you prefer TypeScript + SWC:
npm create vite@latest my-app -- --template react-swc-ts

# Step 2: Navigate into the project folder
cd my-app

# Step 3: Install dependencies
npm install

# Step 4: Start the local lightning-fast dev server
npm run dev`,
      codeType: "bash",
      link: "",
      btn: "",
    },

    // ── Understanding Virtual DOM ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Understanding the Virtual DOM & Reconciliation" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>The Real DOM Problem:</strong> In standard vanilla JavaScript, manipulating the actual browser DOM (<code>document.getElementById</code>, <code>innerHTML</code>) causes browser layout recalculations and repaints, which is computationally expensive.</p><p><strong>The React Solution:</strong></p><ul><li><strong>Virtual DOM Representation:</strong> React maintains an in-memory lightweight JavaScript object tree mirroring the actual DOM.</li><li><strong>Diffing Algorithm:</strong> When component state updates, React constructs a new Virtual DOM snapshot and compares it with the previous snapshot (called <em>Reconciliation</em>).</li><li><strong>Batching Minimal Patch:</strong> React calculates the exact minimum changes needed and updates only those specific real DOM nodes, ensuring smooth 60fps performance.</li></ul>",
    },

    // ── Babel & JSX ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Babel: Compiling Modern JavaScript & JSX" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>What is Babel?</strong> Babel is a JavaScript compiler and transpiler that converts modern ECMAScript (ES6+) and <strong>JSX (JavaScript XML)</strong> into backwards-compatible JavaScript (ES5) that all browsers execute seamlessly.</p><p>How JSX gets transformed by Babel:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✍️ What You Write (JSX syntax):
const heading = <h1 className="title">Hello React!</h1>;

// ⚡ What Babel Compiles It To (Pure JavaScript):
const heading = React.createElement(
  "h1",
  { className: "title" },
  "Hello React!"
);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Code Example: Simple Counter ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Code Example: Stateful Counter Component" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here is a complete example of a stateful React functional component utilizing the <code>useState</code> Hook:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/Counter.jsx
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Current Count: {count}</h2>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={decrement}>Decrement -</button>
        <button onClick={increment}>Increment +</button>
      </div>
    </div>
  );
};

export default Counter;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Using Counter in App ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Root Application Composition" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import Counter from "./Counter";

function App() {
  return (
    <div className="App">
      <h1>My First React App</h1>
      <Counter />
    </div>
  );
}

export default App;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Core React Concepts Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Concept</th><th style=\"padding:8px;\">Role &amp; Responsibility</th><th style=\"padding:8px;\">Key Benefit</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Components</strong></td><td style=\"padding:8px;\">Independent, reusable UI logic blocks</td><td style=\"padding:8px;\">Modularity, maintainability, and clean architecture</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Virtual DOM</strong></td><td style=\"padding:8px;\">In-memory UI blueprint and diffing engine</td><td style=\"padding:8px;\">High-performance minimal real DOM updates</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>JSX</strong></td><td style=\"padding:8px;\">HTML-like declarative syntax within JavaScript</td><td style=\"padding:8px;\">Intuitive UI description with full JS power</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Babel / Vite</strong></td><td style=\"padding:8px;\">Modern bundlers, compilers &amp; transpilers</td><td style=\"padding:8px;\">Instant HMR, cross-browser compatibility</td></tr><tr><td style=\"padding:8px;\"><strong>State (useState)</strong></td><td style=\"padding:8px;\">Reactive internal data storage for components</td><td style=\"padding:8px;\">Automatic UI re-rendering when state changes</td></tr></tbody></table>",
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

    // 2. Find or create section "Introduction" for React
    let section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) {
      const sectionId = await getNextSequence(client, "sections");
      await db.collection("sections").insertOne({
        id: sectionId,
        name: "Introduction",
        order_no: 1,
        topic_id: topicId,
      });
      section = { id: sectionId, name: "Introduction" };
      console.log(`✅ Created section "Introduction" (id: ${sectionId})`);
    } else {
      console.log(`✅ Found section "${section.name}" (id: ${section.id})`);
    }
    const sectionId = section.id as number;

    // 3. Find or update collection "Overview" / "Overview of React" (collectionId: 102)
    let collection = await db.collection("collections").findOne({
      id: 102,
      topics_id: topicId,
    });

    const collectionTitle = "Overview of React";
    let collectionId = 102;

    if (!collection) {
      collectionId = await getNextSequence(client, "collections");
      await db.collection("collections").insertOne({
        id: collectionId,
        title: collectionTitle,
        topics_id: topicId,
        title_index: null,
      });
      console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);
    } else {
      await db.collection("collections").updateOne(
        { id: collectionId },
        { $set: { title: collectionTitle } }
      );
      console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);
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
        order_no: 1,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 1)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 1).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 0 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
