/**
 * Seed Script: React Lesson 08 — "React 08: Understanding the useEffect Hook in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson8.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson8.ts
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
        "<p>While React components are designed to be pure functions that calculate JSX from props and state, real-world web apps must communicate with the outside world: fetching data over HTTP, subscribing to events or WebSockets, updating document titles, and setting up timers. These operations are called <strong>Side Effects</strong>.</p><p>The <code>useEffect</code> hook provides a unified, declarative API in functional components to manage side effects, replacing old class component lifecycle methods (<code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*JALKH4Oq0m-nD0U58eFD1A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-use-effect-hooks" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-use-effect-hooks</a></p>',
    },

    // ── Syntax and Core Structure ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The Anatomy & Syntax of useEffect 🧬" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>useEffect</code> hook accepts two arguments: a <strong>callback effect function</strong> and an optional <strong>dependency array</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `import { useEffect } from "react";

useEffect(() => {
  // 1. Side-effect logic executed after render (Mount & Update)
  console.log("Effect executed!");

  // 2. Optional Cleanup function (executed before re-running effect or on Unmount)
  return () => {
    console.log("Cleanup executed!");
  };
}, [dependency1, dependency2]); // 3. Dependency array`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Three Dependency Scenarios ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Three Dependency Array Modes 🚦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Understanding how the dependency array governs effect execution is the most crucial mental model in modern React:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Mode 1: No Dependency Array -> Runs on EVERY single render
useEffect(() => {
  console.log("Runs on mount AND after EVERY re-render");
});

// Mode 2: Empty Dependency Array [] -> Runs ONCE on Initial Mount only
useEffect(() => {
  console.log("Runs ONCE when component mounts to DOM");
  return () => console.log("Runs ONCE when component unmounts");
}, []);

// Mode 3: Specific Dependencies [count, query] -> Runs on Mount & when values change
useEffect(() => {
  console.log("Runs on mount AND whenever 'count' changes value");
}, [count]);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Example 1: Asynchronous Data Fetching ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Real-World Example: API Data Fetching with Loading States 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The most common scenario for <code>useEffect</code> is fetching remote REST or GraphQL data when a component first mounts:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/DataFetcher.jsx
import React, { useState, useEffect } from "react";

const DataFetcher = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Abort controller prevents state updates on unmounted components
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

    // Cleanup cancels in-flight fetch request if user navigates away
    return () => controller.abort();
  }, []); // [] guarantees fetch only runs once on mount

  if (loading) return <div className="loader">⏳ Loading posts...</div>;
  if (error) return <div className="error">❌ Error: {error}</div>;

  return (
    <div className="posts-container">
      <h3>Recent Blog Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Example 2: Cleanup Timers & Event Listeners ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Cleanup Functions: Timers & Event Subscriptions ⏰" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Side effects that create standing background subscriptions (e.g. <code>setInterval</code>, <code>window.addEventListener</code>) must always return a <strong>cleanup function</strong> to prevent memory leaks and duplicate triggers:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/LiveTimer.jsx
import React, { useState, useEffect } from "react";

const LiveTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Setup recurring interval timer
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // 2. Cleanup function: Clears interval when component unmounts
    return () => {
      clearInterval(timerId);
      console.log("Timer cleaned up successfully! 🧹");
    };
  }, []); // Run once on mount

  return (
    <div className="timer-badge">
      ⏱️ Session Active: <strong>{seconds}s</strong>
    </div>
  );
};

export default LiveTimer;`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Lifecycle vs useEffect Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Class Lifecycle Method</th><th style=\"padding:8px;\">Equivalent useEffect Hook Syntax</th><th style=\"padding:8px;\">Typical Use Case</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>componentDidMount</code></td><td style=\"padding:8px;\"><code>useEffect(() =&gt; { ... }, [])</code></td><td style=\"padding:8px;\">Initial API fetch, global window event listeners</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>componentDidUpdate</code></td><td style=\"padding:8px;\"><code>useEffect(() =&gt; { ... }, [propA])</code></td><td style=\"padding:8px;\">Re-fetching data when ID or search term updates</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>componentWillUnmount</code></td><td style=\"padding:8px;\"><code>return () =&gt; { clearInterval(...) }</code></td><td style=\"padding:8px;\">Clearing timers, removing event listeners</td></tr><tr><td style=\"padding:8px;\">Every Render Cycle</td><td style=\"padding:8px;\"><code>useEffect(() =&gt; { ... })</code> (no array)</td><td style=\"padding:8px;\">Logging render snapshots, continuous DOM sync</td></tr></tbody></table>",
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

    // 3. Find or update collection "React 08: Understanding the useEffect Hook in React" (collectionId: 110)
    const collectionTitle = "React 08: Understanding the useEffect Hook in React";
    const collectionId = 110;

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
        order_no: 9,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 9)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 9).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 8 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
