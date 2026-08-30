/**
 * Seed Script: React Lesson 07 — "React 07: Understanding the useState Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson7.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson7.ts
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
        "<p>State is the memory of a React component. While props allow parents to pass data down, <strong>state</strong> enables a component to track changing data internally and trigger automatic UI re-renders whenever that data updates.</p><p>Introduced in React 16.8, the <code>useState</code> hook brought state management to clean functional components. In this lesson, we cover its fundamental syntax, primitive state, multiple independent state variables, and updating complex state structures like <strong>Objects and Arrays</strong> immutably.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*DI378ulofrgpmB7W6zeeGg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-use-state-hook" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-state-hook</a></p>',
    },

    // ── What is useState ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is the useState Hook? ⚡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>useState</code> is a built-in React hook function that returns an array with exactly two values:</p><ol><li><strong>State variable:</strong> Holds the current snapshot of the data value.</li><li><strong>Setter function:</strong> Dispatches a new value to React, requesting a component re-render with the updated state.</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Array Destructuring Syntax:
const [state, setState] = useState(initialState);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 1: Counter ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Basic Example: Interactive Counter Component 🔢" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here is a basic numeric counter illustrating how clicking buttons triggers state updates and causes the DOM to reflect new count numbers:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Counter.jsx
import React, { useState } from "react";

const Counter = () => {
  // 1. Declare state with initial number 0
  const [count, setCount] = useState(0);

  const increment = () => {
    // Functional updater ensures accurate state under concurrent updates
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-card">
      <h2>Counter: {count}</h2>
      <div className="btn-group">
        <button onClick={decrement}>- Decrement</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+ Increment</button>
      </div>
    </div>
  );
};

export default Counter;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 2: Multiple States in Forms ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Handling Multiple State Variables (Forms) 📝" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can invoke <code>useState</code> as many times as needed within the same component to track independent pieces of information:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/Form.jsx
import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(\`Submitted Profile: \${name} (\${email})\`);
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div>
        <label>Full Name:</label>
        <input 
          type="text" 
          placeholder="e.g. John Doe"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>

      <div>
        <label>Email Address:</label>
        <input 
          type="email" 
          placeholder="john@example.com"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>

      <button type="submit">Submit Info</button>
    </form>
  );
};

export default Form;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 3: Managing Arrays & Objects Immutably ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Managing Arrays & Objects Immutably (Todo App) 📋" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Immutability Rule:</strong> Never mutate arrays or objects directly (e.g. avoid <code>todos.push(newItem)</code>). Always create a new copy using the spread operator <code>[...todos, newItem]</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/TodoList.jsx
import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    // Spread existing items and append new item:
    setTodos([...todos, { id: Date.now(), text: todoInput.trim() }]);
    setTodoInput(""); // reset input field
  };

  const removeTodo = (idToDelete) => {
    // Filter returns a brand-new array without mutating original state:
    setTodos(todos.filter((item) => item.id !== idToDelete));
  };

  return (
    <div className="todo-container">
      <h2>My Task Tracker</h2>

      <form onSubmit={addTodo} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul style={{ marginTop: "16px" }}>
        {todos.map((item) => (
          <li key={item.id} style={{ display: "flex", justifyContent: "space-between", margin: "6px 0" }}>
            <span>{item.text}</span>
            <button onClick={() => removeTodo(item.id)} style={{ color: "red" }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ useState Core Rules & Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Rule</th><th style=\"padding:8px;\">Description</th><th style=\"padding:8px;\">Code Example</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Top-level Only</strong></td><td style=\"padding:8px;\">Call hooks only at top level of functional components</td><td style=\"padding:8px;\">Never inside loops, conditions, or nested functions</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Immutable Updates</strong></td><td style=\"padding:8px;\">Always pass new objects or copies to setter</td><td style=\"padding:8px;\"><code>setObj({ ...obj, title: 'new' })</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Functional Updaters</strong></td><td style=\"padding:8px;\">Use callback syntax when new state depends on previous</td><td style=\"padding:8px;\"><code>setCount(prev =&gt; prev + 1)</code></td></tr><tr><td style=\"padding:8px;\"><strong>Lazy Initialization</strong></td><td style=\"padding:8px;\">Pass function if initial state is computationally heavy</td><td style=\"padding:8px;\"><code>useState(() =&gt; computeExpensive())</code></td></tr></tbody></table>",
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

    // 3. Find or update collection "React 07: Understanding the useState Hook in React" (collectionId: 109)
    const collectionTitle = "React 07: Understanding the useState Hook in React";
    const collectionId = 109;

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
        order_no: 8,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 8)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 8).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 7 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
