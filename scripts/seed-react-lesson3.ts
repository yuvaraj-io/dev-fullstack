/**
 * Seed Script: React Lesson 03 — "React 03: Passing Data from Child to Parent Component in React 🚀"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson3.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson3.ts
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
        "<p>In React, data naturally flows downward from parent components to child components via props. But what happens when an event in a child component (like a button click, form input, or toggle switch) needs to send data or trigger a state change in the parent?</p><p>This is solved cleanly using the <strong>Callback Function as Props</strong> pattern (commonly referred to as <em>Lifting State Up</em>).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*nu7QtA8hOipBJbukJlav0Q.jpeg",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Demo on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-child-to-parent-component" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-child-to-parent-component</a></p>',
    },

    // ── Step 1: Parent Component Definition ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Step 1: Define the Callback in Parent (App.jsx) 🏠" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the parent component, define a handler function that expects data as arguments, and pass this function down as a prop to the child component:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React, { useState } from "react";
import "./style.css";
import ChildComponent from "./components/ChildComponent";

export default function App() {
  const [message, setMessage] = useState("No data yet");

  // Handler function defined in the parent:
  const handleChildData = (dataFromChild) => {
    console.log("Receiving data in Parent:", dataFromChild);
    setMessage(dataFromChild);
  };

  return (
    <div className="parent-box">
      <h1>Parent Component</h1>
      <p>Data from Child: <strong>{message}</strong></p>

      {/* Passing the callback function as a prop */}
      <ChildComponent onSendData={handleChildData} />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Step 2: Child Component Invocation ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Step 2: Invoke the Callback from Child 🧒" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The child component receives the callback function via its props and triggers it when a user action occurs (such as an <code>onClick</code> or <code>onChange</code> event), passing payload data as arguments:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/ChildComponent.jsx
import React from "react";

function ChildComponent({ onSendData }) {
  const handleClick = () => {
    // Calling parent callback with custom payload:
    onSendData("Hello from Child Component! 🚀");
  };

  return (
    <div className="child-box">
      <h3>Child Component</h3>
      <button onClick={handleClick}>
        Send Data to Parent
      </button>
    </div>
  );
}

export default ChildComponent;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Step-by-Step Execution Lifecycle ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Step-by-Step Flow of Execution 🔄" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>1. Parent Defines Callback:</strong> <code>App</code> defines <code>handleChildData(data)</code>.</li><li><strong>2. Function Passed as Prop:</strong> <code>&lt;ChildComponent onSendData={handleChildData} /&gt;</code> passes function reference down.</li><li><strong>3. Child Executes Prop:</strong> On button click, Child calls <code>onSendData('payload')</code>.</li><li><strong>4. Parent Receives Payload:</strong> <code>handleChildData</code> executes in the Parent scope and updates parent state via <code>setMessage(...)</code>.</li><li><strong>5. Parent Re-renders:</strong> The updated state renders the new data seamlessly to the DOM.</li></ol>",
    },

    // ── Real-World Practical Use Cases ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Real-World Production Use Cases 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Custom Form Inputs:</strong> A reusable <code>&lt;SearchInput /&gt;</code> component sends the typed search query up to the parent product list.</li><li><strong>Modal Dialogs & Drawers:</strong> A child <code>&lt;Modal /&gt;</code> tells the parent <code>onClose={() => setIsOpen(false)}</code> when the backdrop is clicked.</li><li><strong>Filter Controls:</strong> Category buttons in a sidebar tell the parent product grid to filter by selected category.</li><li><strong>Shopping Cart Actions:</strong> An <code>&lt;ItemCard /&gt;</code> notifies the parent shopping cart <code>onAddToCart(productId)</code>.</li></ul>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Component Communication Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Direction</th><th style=\"padding:8px;\">Mechanism</th><th style=\"padding:8px;\">Example Syntax</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Parent ➔ Child</strong></td><td style=\"padding:8px;\">Standard Props</td><td style=\"padding:8px;\"><code>&lt;Card title={item.title} /&gt;</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Child ➔ Parent</strong></td><td style=\"padding:8px;\">Callback Functions via Props</td><td style=\"padding:8px;\"><code>&lt;Child onAction={(val) => handle(val)} /&gt;</code></td></tr><tr><td style=\"padding:8px;\"><strong>Sibling ➔ Sibling</strong></td><td style=\"padding:8px;\">Lift State to Common Parent</td><td style=\"padding:8px;\">Parent stores state &amp; distributes props/callbacks</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 03: Passing Data from Child to Parent Component in React 🚀" (collectionId: 105)
    const collectionTitle = "React 03: Passing Data from Child to Parent Component in React 🚀";
    const collectionId = 105;

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
        order_no: 4,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 4)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 4).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 3 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
