/**
 * Seed Script: React Lesson 13 — "React 13: Understanding the useReducer Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson13.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson13.ts
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
        "<p>While <code>useState</code> is perfect for independent, simple state values (strings, booleans, single counters), it can become cumbersome when managing <strong>complex state trees with interrelated transitions</strong> or multiple action types.</p><p>Inspired by the Redux architecture, the <code>useReducer</code> hook organizes state updates into predictable, pure reducer functions driven by dispatched actions. In this lesson, we will understand its core mental model, build a multi-action Counter, and implement a full feature-rich <strong>Todo Application</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*AavTsAIgyllTPkpMwl5Izg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-use-reducer-hooks" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-reducer-hooks</a></p>',
    },

    // ── What is useReducer & Syntax ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ What is useReducer and How Does It Work? ⚙️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><code>useReducer</code> separates <em>what happened</em> (action) from <em>how state updates</em> (reducer function):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Syntax:
const [state, dispatch] = useReducer(reducer, initialState);

// Reducer Signature: (currentState, action) => newState
function reducer(state, action) {
  switch (action.type) {
    case "ACTION_TYPE":
      return { ...state, key: action.payload };
    default:
      throw new Error(\`Unhandled action type: \${action.type}\`);
  }
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Core Benefits ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Why and When to Use useReducer? 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Centralized & Predictable Logic:</strong> All state mutations live inside one pure function outside the component JSX.</li><li><strong>Complex State Dependences:</strong> When the next state depends on multiple sub-values of the previous state.</li><li><strong>Optimized Performance:</strong> The <code>dispatch</code> function identity is stable across renders, avoiding unnecessary callback recreations.</li></ol>",
    },

    // ── Example 1: Multi-Action Counter ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Example 1: Multi-Action Counter with Dispatch 🔢" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/CounterReducer.jsx
import React, { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

export default function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="card">
      <h2>Counter: {state.count}</h2>
      <p>Step Size: {state.step}</p>

      <div className="btn-group">
        <button onClick={() => dispatch({ type: "decrement" })}>- Decrement</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={() => dispatch({ type: "increment" })}>+ Increment</button>
      </div>

      <div style={{ marginTop: "12px" }}>
        <label>Adjust Step: </label>
        <input
          type="number"
          value={state.step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: Number(e.target.value) || 1 })
          }
        />
      </div>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 2: Complete Todo App with useReducer ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Example 2: Feature-Rich Todo Application 📋" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Managing collections with multiple CRUD actions (<code>add</code>, <code>toggle</code>, <code>remove</code>, <code>clearCompleted</code>) is where <code>useReducer</code> shines brightest:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/TodoApp.jsx
import React, { useReducer, useState } from "react";

const initialTodoState = {
  todos: [
    { id: 1, text: "Learn React Context API", completed: true },
    { id: 2, text: "Master useReducer hook", completed: false },
  ],
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const [inputText, setInputText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    dispatch({ type: "ADD_TODO", payload: inputText.trim() });
    setInputText("");
  };

  return (
    <div className="todo-box">
      <h2>Task Management with useReducer</h2>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="New task description..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "16px" }}>
        {state.todos.map((todo) => (
          <li key={todo.id} style={{ display: "flex", justifyContent: "space-between", margin: "8px 0" }}>
            <span
              onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                color: todo.completed ? "#94a3b8" : "#0f172a",
              }}
            >
              {todo.completed ? "✅" : "⭕"} {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "REMOVE_TODO", payload: todo.id })}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {state.todos.some((t) => t.completed) && (
        <button
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
          style={{ marginTop: "12px", background: "#f1f5f9", color: "#475569" }}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table: useState vs useReducer ──
    { id: nextId(), type: "heading" as const, content: "✅ useState vs useReducer Decision Guide" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Criteria</th><th style=\"padding:8px;\"><code>useState</code></th><th style=\"padding:8px;\"><code>useReducer</code></th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>State Complexity</strong></td><td style=\"padding:8px;\">Simple values (primitives, single objects)</td><td style=\"padding:8px;\">Complex nested structures &amp; arrays</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Transitions</strong></td><td style=\"padding:8px;\">Direct replacements (<code>setCount(5)</code>)</td><td style=\"padding:8px;\">Event-driven actions (<code>dispatch({ type })</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Business Logic</strong></td><td style=\"padding:8px;\">Inline event handlers in component JSX</td><td style=\"padding:8px;\">Isolated pure functions testable outside React</td></tr><tr><td style=\"padding:8px;\"><strong>Scaling</strong></td><td style=\"padding:8px;\">Can lead to multiple scattered setters</td><td style=\"padding:8px;\">Scales cleanly to Redux-like global architectures</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 13: Understanding the useReducer Hook in React" (collectionId: 115)
    const collectionTitle = "React 13: Understanding the useReducer Hook in React";
    const collectionId = 115;

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
        order_no: 14,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 14)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 14).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 13 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
