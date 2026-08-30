/**
 * Seed Script: React Lesson 01 — "React 01: JSX and Printing Value in JSX"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson1.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson1.ts
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
        "<p>React is built around a declarative component paradigm where UI structure and rendering logic live together in the same file. The heart of this developer experience is <strong>JSX (JavaScript XML)</strong>.</p><p>In this lesson, we explore what JSX is, how React interprets HTML tags written inside JavaScript, and how JavaScript expressions and various data types (Strings, Numbers, Booleans, Null, and Undefined) behave when rendered inside JSX curly braces <code>{}</code>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*y-4vC7wgv1R-2-U4YBH8gQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-ne3gqu" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-ne3gqu</a></p>',
    },

    // ── What is JSX? ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is JSX?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>JSX stands for JavaScript XML</strong>. It is a syntax extension for JavaScript that allows you to write HTML-like markup directly inside your JavaScript files (usually with the <code>.jsx</code> extension).</p><p>Instead of artificially separating technologies by putting markup in one file and logic in another, React places both in loosely coupled units called <strong>components</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Writing JSX: Markup and Logic united
function WelcomeBanner() {
  const user = "Yuvaraj";
  return (
    <div className="banner">
      <h1>Welcome back, {user}!</h1>
      <p>Start learning React with interactive components.</p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Embedding Expressions in JSX ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Printing Variables & JavaScript Expressions in JSX" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To embed any dynamic JavaScript variable, calculation, or expression inside JSX, wrap it with <strong>curly braces <code>{}</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `import React from "react";
import "./style.css";

export default function App() {
  const num = 42;
  const string = "Full-Stack Engineer";
  const boolean = true;
  const undef = undefined;
  const nul = null;

  return (
    <div className="container">
      <h1>Hello React</h1>
      <p>This is JSX in action.</p>

      {/* 1. Numbers render directly to the DOM */}
      <p>Number: {num}</p>

      {/* 2. Strings render directly */}
      <p>String: {string}</p>

      {/* 3. Booleans, Undefined & Null DO NOT render in the DOM */}
      <p>Boolean: {boolean}</p>
      <p>Undefined: {undef}</p>
      <p>Null: {nul}</p>

      {/* 💡 To display Booleans, Null, or Undefined, convert them to String: */}
      <p>Boolean displayed: {String(boolean)}</p>
      <p>Null displayed: {String(nul)}</p>
      <p>Undefined displayed: {String(undef)}</p>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Why Booleans / Null / Undefined don't render ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Why Booleans, null & undefined Don't Render" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>React intentionally treats <code>false</code>, <code>null</code>, <code>undefined</code>, and <code>true</code> as valid children that simply <strong>render nothing</strong>. This design decision makes conditional rendering syntax extremely clean:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function NotificationBadge({ unreadCount, isLoggedIn }) {
  return (
    <div>
      {/* If isLoggedIn is false, nothing renders here: */}
      {isLoggedIn && <span className="online-indicator">🟢 Online</span>}

      {/* If unreadCount > 0 is false, nothing renders: */}
      {unreadCount > 0 && <span className="badge">{unreadCount} New</span>}
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Key Rules of JSX ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Essential Rules of JSX" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Return a Single Root Element:</strong> To return multiple elements, wrap them in a parent <code>&lt;div&gt;</code> or a React Fragment <code>&lt;&gt; ... &lt;/&gt;</code>.</li><li><strong>Close All Tags:</strong> Every tag must be explicitly closed, including self-closing elements like <code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>, and <code>&lt;input /&gt;</code>.</li><li><strong>camelCase Most Attributes:</strong> JSX turns into JavaScript, so HTML attributes become keys in JavaScript objects. Use <code>className</code> instead of <code>class</code>, and <code>htmlFor</code> instead of <code>for</code>.</li></ol>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ JSX Data Type Rendering Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Data Type</th><th style=\"padding:8px;\">Example</th><th style=\"padding:8px;\">Rendered in DOM?</th><th style=\"padding:8px;\">DOM Output</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>String</strong></td><td style=\"padding:8px;\"><code>{\"Hello\"}</code></td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\"><code>Hello</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Number</strong></td><td style=\"padding:8px;\"><code>{100}</code></td><td style=\"padding:8px;\">✅ Yes</td><td style=\"padding:8px;\"><code>100</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Boolean</strong></td><td style=\"padding:8px;\"><code>{true} / {false}</code></td><td style=\"padding:8px;\">❌ No (Ignored)</td><td style=\"padding:8px;\"><em>(empty)</em></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>null</strong></td><td style=\"padding:8px;\"><code>{null}</code></td><td style=\"padding:8px;\">❌ No (Ignored)</td><td style=\"padding:8px;\"><em>(empty)</em></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>undefined</strong></td><td style=\"padding:8px;\"><code>{undefined}</code></td><td style=\"padding:8px;\">❌ No (Ignored)</td><td style=\"padding:8px;\"><em>(empty)</em></td></tr><tr><td style=\"padding:8px;\"><strong>Array</strong></td><td style=\"padding:8px;\"><code>{[1, 2, 3]}</code></td><td style=\"padding:8px;\">✅ Yes (Concatenated)</td><td style=\"padding:8px;\"><code>123</code></td></tr></tbody></table>",
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

    // 3. Find or update collection "React 01: JSX and Printing Value in JSX" (collectionId: 103)
    const collectionTitle = "React 01: JSX and Printing Value in JSX";
    const collectionId = 103;

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
        order_no: 2,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 2)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 2).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 1 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
