/**
 * Seed Script: JavaScript "Lesson 67: Understanding ES6 Modules — import, export & type=\"module\""
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson67.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson67.ts
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
        "<p>Before ECMAScript 2015 (ES6), JavaScript lacked an official module standard for the browser. Developers relied on global script concatenation or third-party wrappers (CommonJS, AMD, RequireJS), which frequently led to global namespace pollution and variable collisions.</p><p><strong>ES6 Modules (ESM)</strong> introduced native, standardized syntax (<code>import</code>, <code>export</code>, and <code>&lt;script type=\"module\"&gt;</code>) enabling encapsulated, maintainable code architectures. In this lesson, we explore named vs. default exports, module scoping mechanics, and default deferred execution.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*sgkdCCSsMh8K8uRM5Gu6ZQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-67-understanding-es6-modules-import-export?file=index.html,user.js,math.js,main.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-67-understanding-es6-modules-import-export?file=index.html,user.js,math.js,main.js</a></p>',
    },

    // ── 1. HTML Setup with type="module" ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Enabling Modules: <script type=\"module\">" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To instruct the browser to parse JavaScript as an ES Module rather than a legacy script, add the <code>type=\"module\"</code> attribute to your <code>&lt;script&gt;</code> tag:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ES6 Modules Demo</title>
</head>
<body>
  <h1>Understanding ES6 Modules</h1>
  <!-- 🔑 type="module" activates ESM mode (private scope + deferred parsing) -->
  <script type="module" src="./main.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Named Exports & Imports ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Named Exports and Relative Imports" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can export multiple variables, constants, classes, or functions per module using the <code>export</code> keyword:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 📁 user.js (Exporting named members)
export const username = "JavaScript Learner";

export function greet(name = username) {
  console.log(\`Hello, \${name}! 👋\`);
}

// 📁 main.js (Importing named members with destructuring)
import { username, greet } from "./user.js";

console.log("Imported:", username);
greet(); // Output: "Hello, JavaScript Learner! 👋"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Default vs. Named Exports ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Default Export vs. Named Exports" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A module can have <strong>multiple named exports</strong>, but only <strong>one default export</strong>. Default exports do not require curly braces <code>{}</code> upon import and can be renamed arbitrarily by the importing file:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 📁 math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// 🌟 Only ONE default export allowed per file:
export default function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

// 📁 main.js
// Importing default (divide) alongside named exports ({ add, multiply }):
import divide, { add, multiply } from "./math.js";

console.log("Add:", add(5, 3));           // 8
console.log("Multiply:", multiply(5, 3)); // 15
console.log("Divide:", divide(10, 2));    // 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Private Module Scoping ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Strict Mode & Private Module Scope" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Unlike classic scripts where top-level variables attach to <code>window</code>, variables in ES6 modules are encapsulated within the <strong>module scope</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Inside <script type="module"> or an imported module:
const appSecret = "secret-token-xyz";

console.log(appSecret); // ✅ "secret-token-xyz" (accessible inside module)

// In DevTools Console:
// window.appSecret -> undefined (NOT leaked into global scope!)
// typing 'appSecret' in console -> ReferenceError: appSecret is not defined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Default Deferral Behavior ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Automatic Script Deferral" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Scripts loaded with <code>type=\"module\"</code> are <strong>deferred automatically by default</strong>. The browser downloads module files in parallel with HTML parsing and executes them in document order only after the DOM is fully constructed.</p>",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ ES6 Modules Comparison & Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Classic Script (<code>&lt;script&gt;</code>)</th><th style=\"padding:8px;\">ES6 Module (<code>&lt;script type=\"module\"&gt;</code>)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Top-level Scope</td><td style=\"padding:8px;\">Global (<code>window</code> pollution)</td><td style=\"padding:8px;\">Module (private to file)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Strict Mode</td><td style=\"padding:8px;\">Opt-in via <code>\"use strict\"</code></td><td style=\"padding:8px;\">Always enabled automatically</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">HTML Parsing</td><td style=\"padding:8px;\">Blocks DOM parsing (unless <code>defer</code>)</td><td style=\"padding:8px;\">Deferred by default (non-blocking)</td></tr><tr><td style=\"padding:8px;\">Imports / Exports</td><td style=\"padding:8px;\">Syntax error (unsupported)</td><td style=\"padding:8px;\">Native <code>import</code> and <code>export</code></td></tr></tbody></table>",
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
    const collectionTitle = 'Lesson 67: Understanding ES6 Modules — import, export & type="module"';
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 67;

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

    console.log("🎉 Done! JS Lesson 67 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
