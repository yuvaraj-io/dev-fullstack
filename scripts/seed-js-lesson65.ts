/**
 * Seed Script: JavaScript "Lesson 65: Understanding try…catch in JavaScript — Handling Errors Gracefully"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson65.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson65.ts
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
        "<p>In JavaScript, an unhandled runtime error immediately terminates script execution on the Call Stack, preventing subsequent code from running and breaking the user interface.</p><p>The <code>try...catch...finally</code> statement provides a resilient error-handling mechanism to intercept runtime exceptions gracefully. In this lesson, we explore how JavaScript handles errors, dissect the <code>Error</code> object (<code>name</code>, <code>message</code>, <code>stack</code>), differentiate between <em>undefined</em> vs. <em>not defined</em>, understand the unconditional guarantee of the <code>finally</code> block, and master error management in modern <code>async/await</code> workflows.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*6L70qiROIQGH1bSBvl-Prg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-65-understanding-trycatch-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-65-understanding-trycatch-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. HTML Starter Setup ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ HTML Starter Setup" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Try Catch Example</title>
</head>
<body>
  <h1>JavaScript try...catch Example</h1>
  <button id="loadData">Load Data</button>
  <div id="result"></div>
  <script src="app.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. What Happens Without Error Handling ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Uncaught Exception Crash" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When JavaScript encounters a runtime error without a handler, the engine throws an exception and halts execution immediately:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ Uncaught ReferenceError crashes the program:
console.log(nonExistentVariable); // Script execution HALTS here!

// ⚠️ The following lines NEVER run:
console.log("Calculation:", 3 + 7);
console.log("App initialized successfully.");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Using try...catch ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Intercepting Errors with try...catch" },
    {
      id: nextId(),
      type: "code" as const,
      code: `try {
  // Risky operation that may throw:
  console.log(nonExistentVariable);
} catch (err) {
  // Intercepted safely without crashing:
  console.warn("Caught runtime error safely:", err.message);
}

// ✅ Subsequent code executes normally:
console.log("Calculation:", 3 + 7); // Output: 10
console.log("App continues running smoothly! 🎉");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Undefined vs Not Defined ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Core Difference: Undefined vs. Not Defined" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong><code>undefined</code>:</strong> A primitive value assigned to an existing variable that has been declared in memory but not yet assigned a value (e.g. <code>let a;</code>). Does <strong>not</strong> throw an error.</li><li><strong>Not Defined (<code>ReferenceError</code>):</strong> Occurs when accessing an identifier that has never been declared in the current lexical scope. Throws a fatal <code>ReferenceError</code>.</li></ul>",
    },

    // ── 5. Anatomy of the Error Object ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Anatomy of the Error Object" },
    {
      id: nextId(),
      type: "code" as const,
      code: `try {
  const user = { name: "Yuvaraj", age: 25 };
  // Accessing property on undefined throws a TypeError:
  console.log(user.address.city);
} catch (err) {
  console.log("Error Name:   ", err.name);    // "TypeError"
  console.log("Error Message:", err.message); // "Cannot read properties of undefined (reading 'city')"
  console.log("Stack Trace:  ", err.stack);   // Full call stack with file & line numbers
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. The finally Block ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ The Guaranteed finally Block" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>finally</code> block executes <strong>unconditionally</strong> after <code>try</code> (and after <code>catch</code> if an error occurred). It is the standard location for cleanup logic (e.g., closing file descriptors, hiding UI loading spinners, disconnecting sockets):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `try {
  console.log("1. Executing transaction...");
  throw new Error("Payment gateway timed out!");
} catch (err) {
  console.error("2. Transaction failed:", err.message);
} finally {
  console.log("3. Cleanup: Hiding loading spinner and releasing lock ✅");
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 7. try...catch in Async Code ──
    { id: nextId(), type: "heading" as const, content: "7️⃣ Handling Async Errors with async/await" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById("loadData");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
  try {
    result.textContent = "Loading hound data... 🐾";
    const response = await fetch("https://dog.ceo/api/breed/hound/images");
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

    const data = await response.json();
    result.textContent = \`Data loaded successfully! Total images: \${data.message.length} 🐶\`;
  } catch (error) {
    console.error("Network or parsing failed:", error.message);
    result.textContent = "⚠️ Something went wrong while fetching data!";
  } finally {
    console.log("API request lifecycle completed.");
  }
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ try...catch...finally Architecture Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Block / Concept</th><th style=\"padding:8px;\">Execution Timing</th><th style=\"padding:8px;\">Primary Purpose</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>try { ... }</code></td><td style=\"padding:8px;\">Always executes first</td><td style=\"padding:8px;\">Encloses code that might produce runtime exceptions.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>catch (err) { ... }</code></td><td style=\"padding:8px;\">Only if an exception is thrown in <code>try</code></td><td style=\"padding:8px;\">Catches the error object and prevents application crashes.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>finally { ... }</code></td><td style=\"padding:8px;\">Always executes regardless of error</td><td style=\"padding:8px;\">Guaranteed cleanup tasks (loaders, memory, open resources).</td></tr><tr><td style=\"padding:8px;\"><code>throw new Error()</code></td><td style=\"padding:8px;\">Custom trigger point</td><td style=\"padding:8px;\">Generates explicit custom errors with contextual messages.</td></tr></tbody></table>",
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

    // 1. Find topic "javascript"
    const topic = await db.collection("topics").findOne({ name: /^javascript$/i });
    if (!topic) throw new Error('Topic "javascript" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction"
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Create collection
    const collectionTitle = "Lesson 65: Understanding try…catch in JavaScript — Handling Errors Gracefully";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // 4. Link section_collections
    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 65;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: nextOrder,
    });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    // 5. Create Blog
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
    console.log(`✅ Created blog with ${blocks.length} blocks (id: ${blogId})\n`);

    console.log("┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Section-Collection ID: ${String(scId).padEnd(16)} │`);
    console.log(`│  Blog ID:               ${String(blogId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log(`│  Order in section:      ${String(nextOrder).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! JS Lesson 65 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
