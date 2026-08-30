/**
 * Seed Script: React Lesson 19 — "React 19: forwardRef and useImperativeHandle Hook"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson19.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson19.ts
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
        "<p>React applications typically follow a <strong>declarative, top-down data flow</strong> where parents pass state downwards via props. However, certain edge cases require imperative interaction — such as focusing an input, triggering an animation, clearing a custom form component, or opening/closing a modal from a parent component.</p><p>In this lesson, we explore how <code>forwardRef</code> allows parent components to pass refs down to child components, and how <code>useImperativeHandle</code> customizes and restricts the exposed imperative API to safe, public helper methods.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*BtKyGBjmxWMZgbiZnLr5Sw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── What is forwardRef ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is forwardRef? 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By default, React does not treat <code>ref</code> as a standard component prop on custom functional components. Wrapping your child component with <code>forwardRef</code> allows the parent to pass a <code>ref</code> directly into the component function as its second argument:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Syntax: forwardRef((props, ref) => JSX)
import React, { forwardRef } from "react";

const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default CustomInput;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 1: Basic forwardRef ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Example 1: Forwarding Native DOM Node Refs 🔌" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/useForwardRef.jsx
import React, { forwardRef, useEffect } from "react";

const ForwardRefExample = forwardRef((props, ref) => {
  useEffect(() => {
    console.log("Child ref mounted:", ref.current);
  }, [ref]);

  return (
    <input
      ref={ref}
      type="text"
      placeholder="ForwardRef direct input..."
      style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
    />
  );
});

export default ForwardRefExample;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── What is useImperativeHandle ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ What is useImperativeHandle? 🛡️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>While <code>forwardRef</code> gives the parent full, unrestricted access to the underlying DOM node (including styling, innerHTML, etc.), <code>useImperativeHandle</code> allows the child to <strong>decide exactly what methods and properties the parent can access</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Instead of exposing raw DOM: ref.current = <input />
// useImperativeHandle exposes a tailored API:
useImperativeHandle(ref, () => ({
  focusInput: () => { /* custom logic */ },
  clearInput: () => { /* custom logic */ },
  validate: () => { /* return validation boolean */ },
}));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 2: Child with useImperativeHandle ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Example 2: Exposing Custom Public Methods 📦" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/InputBox.jsx
import React, { useRef, useImperativeHandle, forwardRef } from "react";

const InputBox = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);

  // Expose ONLY safe public methods to parent ref
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      internalInputRef.current?.focus();
    },
    clearInput: () => {
      if (internalInputRef.current) {
        internalInputRef.current.value = "";
      }
    },
    getValue: () => {
      return internalInputRef.current?.value || "";
    },
  }));

  return (
    <input
      ref={internalInputRef}
      type="text"
      placeholder="Type something in child..."
      style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #94a3b8" }}
    />
  );
});

export default InputBox;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Parent Integration: App.jsx ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Parent Component Integration (App.jsx) 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { useRef } from "react";
import ForwardRefExample from "./components/useForwardRef";
import InputBox from "./components/InputBox";

export default function App() {
  const forwardRefInput = useRef(null);
  const imperativeInputRef = useRef(null);

  return (
    <div style={{ padding: "24px", maxWidth: "550px", margin: "0 auto" }}>
      <h1>React 19 forwardRef & useImperativeHandle</h1>

      {/* 1. Direct DOM Ref Forwarding */}
      <section style={{ marginBottom: "28px" }}>
        <h3>1. forwardRef (Direct DOM Access)</h3>
        <ForwardRefExample ref={forwardRefInput} />
        <div style={{ marginTop: "8px" }}>
          <button onClick={() => forwardRefInput.current?.focus()}>
            Focus Native Element
          </button>
        </div>
      </section>

      {/* 2. Controlled Imperative API */}
      <section>
        <h3>2. useImperativeHandle (Safe Method API)</h3>
        <InputBox ref={imperativeInputRef} />
        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
          <button onClick={() => imperativeInputRef.current?.focusInput()}>
            Focus via Method
          </button>
          <button onClick={() => imperativeInputRef.current?.clearInput()}>
            Clear Input
          </button>
        </div>
      </section>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ forwardRef vs useImperativeHandle Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\"><code>forwardRef</code></th><th style=\"padding:8px;\"><code>useImperativeHandle</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Primary Role</strong></td><td style=\"padding:8px;\">Allows passing <code>ref</code> through component boundary</td><td style=\"padding:8px;\">Customizes &amp; restricts what the ref exposes</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Exposed Target</strong></td><td style=\"padding:8px;\">Entire underlying HTML DOM node</td><td style=\"padding:8px;\">Specific custom object / methods defined by child</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Encapsulation</strong></td><td style=\"padding:8px;\">Low (parent can manipulate all DOM properties)</td><td style=\"padding:8px;\">High (parent only sees declared API)</td></tr><tr><td style=\"padding:8px;\"><strong>Common Uses</strong></td><td style=\"padding:8px;\">Third-party form wrappers, autofocus inputs</td><td style=\"padding:8px;\">Modal dialogs (<code>open()</code>, <code>close()</code>), media players, complex date pickers</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 19: forwardRef and useImperativeHandle Hook"
    const collectionTitle = "React 19: forwardRef and useImperativeHandle Hook";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 19/i },
        { title: /useImperativeHandle/i, topics_id: topicId },
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
        order_no: 20,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 20)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 20).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 19 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
