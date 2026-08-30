/**
 * Seed Script: React Lesson 20 — "React 20: Understanding the useId Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson20.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson20.ts
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
        "<p>When constructing accessible web applications, form fields and UI widgets require unique HTML <code>id</code> attributes to bind <code>&lt;label htmlFor=...&gt;</code> elements and ARIA attributes (like <code>aria-describedby</code> or <code>aria-labelledby</code>).</p><p>For years, developers relied on hacks like hardcoded strings, <code>Math.random()</code>, timestamps, or external UUID packages. Introduced in <strong>React 18</strong>, the <code>useId</code> hook provides the official, built-in solution for generating unique, deterministic, and <strong>SSR hydration-safe IDs</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*4ntoIny3DG3HDuWKgVhFWw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-useid-hook?file=src%2FApp.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-useid-hook?file=src%2FApp.js</a></p>',
    },

    // ── What is useId ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is useId and How Does It Work? 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>useId</code> generates a unique string identifier based on the component's position in the React tree:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `import React, { useId } from "react";

function CustomField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Username:</label>
      <input id={id} type="text" />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example: InputBox & App ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Reusable Component Example 🧩" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/InputBox.jsx
import React, { useId } from "react";

export default function InputBox({ label = "Email" }) {
  const id = useId();

  return (
    <div style={{ marginBottom: "12px" }}>
      <label
        htmlFor={id}
        style={{ display: "block", marginBottom: "4px", fontWeight: 500 }}
      >
        {label} (Generated ID: <code>{id}</code>)
      </label>
      <input
        id={id}
        type="email"
        placeholder="Enter your email"
        style={{
          padding: "8px 12px",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          width: "100%",
        }}
      />
    </div>
  );
}

// src/App.jsx
import React from "react";
import InputBox from "./components/InputBox";

export default function App() {
  return (
    <div style={{ padding: "24px", maxWidth: "450px", margin: "0 auto" }}>
      <h2>useId Hook Demonstration 🚀</h2>
      {/* Each instance gets its own unique, collision-free ID */}
      <InputBox label="Work Email" />
      <InputBox label="Personal Email" />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Why Math.random() is Broken ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Why Math.random() and UUIDs Fail in Modern React ❌" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Server-Side Rendering (SSR) Hydration Mismatch:</strong> <code>Math.random()</code> creates ID <code>#123</code> on Node.js and ID <code>#987</code> in the browser, triggering React hydration error warnings. <code>useId</code> uses tree position to ensure identical IDs on both server and client.</li><li><strong>State Re-renders Changing IDs:</strong> If a component re-renders, inline random calculations generate a new ID, causing inputs to suddenly lose focus or screen readers to lose context.</li><li><strong>Prefixing Multiple Related Elements:</strong> With a single <code>useId</code>, you can cleanly prefix sub-elements like <code>\`\${id}-first\`</code> and <code>\`\${id}-last\`</code>.</li></ol>",
    },

    // ── Multi-field Pattern ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Prefixing Multi-Field Forms with a Single useId 💡" },
    {
      id: nextId(),
      type: "code" as const,
      code: `function NameFields() {
  const id = useId();

  return (
    <fieldset>
      <legend>Full Name</legend>

      <label htmlFor={\`\${id}-firstName\`}>First Name:</label>
      <input id={\`\${id}-firstName\`} type="text" />

      <label htmlFor={\`\${id}-lastName\`}>Last Name:</label>
      <input id={\`\${id}-lastName\`} type="text" />
    </fieldset>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ useId vs Alternative ID Generation Strategies" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Approach</th><th style=\"padding:8px;\">SSR Hydration Safe?</th><th style=\"padding:8px;\">Stable Across Renders?</th><th style=\"padding:8px;\">Collision Risk?</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>Math.random()</code></td><td style=\"padding:8px;\">❌ No (Mismatches)</td><td style=\"padding:8px;\">❌ No (Changes every render)</td><td style=\"padding:8px;\">⚠️ Possible</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Hardcoded string (<code>id=\"email\"</code>)</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\">❌ Guaranteed collision if rendered multiple times</td></tr><tr><td style=\"padding:8px;\"><strong><code>useId()</code> (React 18+)</strong></td><td style=\"padding:8px;\">✅ 100% Safe</td><td style=\"padding:8px;\">✅ Guaranteed Stable</td><td style=\"padding:8px;\">✅ Zero Collisions</td></tr></tbody></table>",
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

    // 3. Find or create collection "React 20: Understanding the useId Hook in React"
    const collectionTitle = "React 20: Understanding the useId Hook in React";
    let collection = await db.collection("collections").findOne({
      $or: [
        { title: /^react 20/i },
        { title: /useId/i, topics_id: topicId },
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
        order_no: 21,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 21)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 21).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 20 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
