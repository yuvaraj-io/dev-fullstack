/**
 * Seed Script: React Lesson 23 — "React 23: React Portal — Rendering Outside the Parent DOM Tree"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson23.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson23.ts
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
        "<p>Normally in React, a component renders its HTML elements strictly inside its parent's DOM subtree. However, floating UI elements — such as <strong>modals, dialogs, tooltips, popovers, and toast notifications</strong> — frequently run into CSS stacking context bugs, <code>z-index</code> conflicts, and clipping caused by parent <code>overflow: hidden</code> containers.</p><p>Introduced in React 16, <strong>React Portals</strong> provide a clean, first-class mechanism to render an element into an entirely different DOM node (like <code>#portal-root</code> or <code>document.body</code>) while preserving the component's original position in the React tree (allowing full access to state, props, and event bubbling).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*oYKYanLI_NXhnM96-7Af-Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-portal-examples?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-portal-examples?file=src%2FApp.js</a></p>',
    },

    // ── What is a Portal & Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Syntax & How ReactDOM.createPortal Works 🪄" },
    {
      id: nextId(),
      type: "code" as const,
      code: `import ReactDOM from "react-dom";

// Syntax: ReactDOM.createPortal(childJSX, domNodeTarget)
ReactDOM.createPortal(
  <ModalContent />,
  document.getElementById("portal-root")
);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>First Argument (<code>childJSX</code>):</strong> Any renderable React child (JSX, string, component).</li><li><strong>Second Argument (<code>domNodeTarget</code>):</strong> A valid native DOM element where the markup will physically be mounted.</li><li><strong>Event Bubbling across Portals:</strong> Even though the portal renders into a different DOM subtree, standard React synthetic events (like <code>onClick</code>) still bubble up through the virtual React parent hierarchy as expected.</li></ul>",
    },

    // ── Complete Example: index.html + Modal + App ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Complete Code Example: Modal with Portal 🪟" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 1. public/index.html -->
<body>
  <div id="root"></div>
  <!-- Dedicated portal container outside root -->
  <div id="portal-root"></div>
</body>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 2. src/components/Modal.jsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Modal({ isOpen, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const portalContainer = document.getElementById("portal-root") || document.body;

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {children}
      </div>
    </div>,
    portalContainer
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 3. src/App.jsx
import React, { useState } from "react";
import Modal from "./components/Modal";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h2>React Portal Demonstration 🚀</h2>
      
      {/* Even if this container has overflow:hidden, the portal escapes it! */}
      <div style={{ overflow: "hidden", height: "100px", background: "#e2e8f0", padding: "16px", borderRadius: "8px" }}>
        <p>Container with <code>overflow: hidden</code></p>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3>🎉 Floating Portal Modal</h3>
        <p>This modal renders inside <code>#portal-root</code>, completely immune to parent CSS overflow clipping!</p>
        <button onClick={() => setIsOpen(false)}>Close Window</button>
      </Modal>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── When to Use Portals ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ When to Use vs Skip Portals 🧭" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>✅ Ideal Scenarios for Portals:</strong><br />• Modals, Dialogs, and Lightboxes<br />• Floating Tooltips and Popovers (placed relative to target coordinates)<br />• Global Toast Notification systems<br />• Dropdown menus that would otherwise get clipped inside tables or scrollable cards</p><p><strong>❌ Skip Portals When:</strong><br />• Standard inline components that flow naturally with the layout hierarchy<br />• Simple dropdowns or accordions that don't suffer from z-index or overflow clipping</p>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Standard Rendering vs React Portals" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\">Standard Component Render</th><th style=\"padding:8px;\">React Portal (<code>createPortal</code>)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>DOM Placement</strong></td><td style=\"padding:8px;\">Mounted directly inside parent element</td><td style=\"padding:8px;\">Mounted into separate target (e.g. <code>#portal-root</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>CSS Overflow Clipping</strong></td><td style=\"padding:8px;\">⚠️ Easily clipped by parent <code>overflow:hidden</code></td><td style=\"padding:8px;\">✅ Immune to all parent clipping constraints</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>z-index Stacking Context</strong></td><td style=\"padding:8px;\">⚠️ Restricted to parent's stacking context</td><td style=\"padding:8px;\">✅ Stacks at the top document level</td></tr><tr><td style=\"padding:8px;\"><strong>React Virtual Tree & Events</strong></td><td style=\"padding:8px;\">Standard parent-child relationship</td><td style=\"padding:8px;\">Retains full React context, state, and event bubbling</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 23: React Portal — Rendering Outside the Parent DOM Tree"
    const collectionTitle = "React 23: React Portal — Rendering Outside the Parent DOM Tree";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 23/i },
        { title: /react portal/i, topics_id: topicId },
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
        order_no: 24,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 24)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 24).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 23 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
