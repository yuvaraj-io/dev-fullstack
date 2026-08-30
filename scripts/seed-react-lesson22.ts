/**
 * Seed Script: React Lesson 22 — "React 22: Lazy Loading in React — Load Components Only When You Need Them"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson22.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson22.ts
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
        "<p>As modern React applications grow in complexity, their bundle sizes expand correspondingly. Shipping every modal, chart, heavy third-party widget, and admin screen in a single monolithic bundle causes slower initial page loads, high Time to Interactive (TTI), and unnecessary mobile data consumption.</p><p><strong>Lazy Loading</strong> and <strong>Code Splitting</strong> solve this by deferring component downloads until they are actually rendered on screen. React provides native support for this through <code>React.lazy()</code> and <code>&lt;Suspense&gt;</code>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*fUpK30CRZTGYg6AIhst9pw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-lazy-loading-example?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-lazy-loading-example?file=src%2FApp.js</a></p>',
    },

    // ── The Two Building Blocks ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The Core Tools: React.lazy() & Suspense 🎩" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>React.lazy(() =&gt; import('./Component'))</code>:</strong> Dynamic import function that instructs Webpack/Vite to split the target component into a separate standalone chunk file (.js) requested on demand.</li><li><strong><code>&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;</code>:</strong> Boundary component that displays placeholder UI while the background bundle chunk is being fetched over the network.</li></ul>",
    },

    // ── Example 1: Basic Lazy Component ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Example 1: Basic Lazy Component Loading 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/BigComponent.jsx
import React from "react";

export default function BigComponent() {
  return (
    <div style={{ padding: "16px", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
      <h3>🚀 This is a lazily-loaded heavy component!</h3>
      <p>Its JavaScript bundle was downloaded only after App mounted.</p>
    </div>
  );
}

// src/App.jsx
import React, { Suspense, lazy } from "react";

// Dynamically imported chunk
const BigComponent = lazy(() => import("./components/BigComponent"));

export default function App() {
  return (
    <div style={{ padding: "24px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>React.lazy & Suspense Showcase 🌟</h2>
      
      <Suspense fallback={<p style={{ color: "#2563eb" }}>⏳ Loading component chunk...</p>}>
        <BigComponent />
      </Suspense>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 2: On-Demand on Button Click ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Example 2: Lazy Loading on Demand (Button Click) 📊" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In many applications, heavy data visualizations or analytics charts are only inspected when the user clicks 'View Analytics'. Deferring the chart bundle until the button click saves megabytes on initial load:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { Suspense, lazy, useState } from "react";

const HeavyChart = lazy(() => import("./components/Chart"));

export default function AnalyticsDashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>On-Demand Code Splitting 📈</h2>
      
      <button onClick={() => setShowChart(true)}>
        Load & Display Analytics Chart
      </button>

      <Suspense fallback={<div className="skeleton-loader">⏳ Loading Chart.js library...</div>}>
        {showChart && <HeavyChart />}
      </Suspense>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 3: Modals and Dialogs ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Example 3: Lazy Loaded Modals & Drawers 🪟" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/SettingsModal.jsx
export default function SettingsModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>⚙️ Advanced Application Settings</h3>
        <p>Form controls and heavy validation libraries live here.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Parent App:
import React, { lazy, Suspense, useState } from "react";

const SettingsModal = lazy(() => import("./components/SettingsModal"));

export function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Settings Modal</button>

      <Suspense fallback={<div>Loading modal window...</div>}>
        {open && <SettingsModal onClose={() => setOpen(false)} />}
      </Suspense>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Architectural Best Practices 🧠" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Keep Suspense Boundaries Local:</strong> Avoid wrapping your entire <code>&lt;App /&gt;</code> in a single Suspense boundary. Granular boundaries keep unaffected UI interactive while individual widgets load.</li><li><strong>Route-Based Code Splitting:</strong> The most impactful lazy loading strategy is splitting at the route level (e.g. <code>React Router</code> routes like <code>/dashboard</code>, <code>/admin</code>, <code>/profile</code>).</li><li><strong>Named Exports Workaround:</strong> <code>React.lazy</code> currently requires default exports. For named exports, re-export default: <code>lazy(() =&gt; import('./MyComponent').then(m =&gt; ({ default: m.MyComponent })))</code>.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Lazy Loading Benefits & Targets" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Component Category</th><th style=\"padding:8px;\">Lazy Load Recommendation</th><th style=\"padding:8px;\">Reason</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Charts & Graphs (D3, Chart.js, Recharts)</strong></td><td style=\"padding:8px;\">✅ Highly Recommended</td><td style=\"padding:8px;\">Chart packages often exceed 200KB+ minified</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Rich Text Editors (Monaco, Quill)</strong></td><td style=\"padding:8px;\">✅ Highly Recommended</td><td style=\"padding:8px;\">Extremely heavy scripts rarely needed on initial paint</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Admin / Secondary Route Pages</strong></td><td style=\"padding:8px;\">✅ Highly Recommended</td><td style=\"padding:8px;\">Standard users should not download code they never visit</td></tr><tr><td style=\"padding:8px;\"><strong>Core Navigation & Primary Layout</strong></td><td style=\"padding:8px;\">❌ Do Not Lazy Load</td><td style=\"padding:8px;\">Must render immediately to prevent layout shifts</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 22: Lazy Loading in React — Load Components Only When You Need Them"
    const collectionTitle = "React 22: Lazy Loading in React — Load Components Only When You Need Them";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 22/i },
        { title: /lazy loading/i, topics_id: topicId },
      ],
    });

    let collectionId: number;
    if (collection) {
      collectionId = collection.id;
      await db.collection("collections").updateOne(
        { id: collectionId },
        { $set: { title: collectionTitle, topics_id: topicId } }
      );
      console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);
    } else {
      collectionId = await getNextSequence(client, "collections");
      await db.collection("collections").insertOne({
        id: collectionId,
        title: collectionTitle,
        topics_id: topicId,
        title_index: null,
      });
      console.log(`✅ Created new collection "${collectionTitle}" (id: ${collectionId})`);
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
        order_no: 23,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 23)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 23).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 22 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
