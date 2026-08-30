/**
 * Seed Script: JavaScript "Lesson 75: Mastering the 'this' Keyword in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson75.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson75.ts
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
        "<p>The <strong><code>this</code> keyword</strong> is one of the most fundamental yet frequently misunderstood mechanics in JavaScript. Unlike variables in lexical scope, the value of <code>this</code> in standard functions is determined dynamically at <strong>runtime based on how a function is called</strong> (its execution context call-site).</p><p>In this lesson, we systematically break down all 7 runtime contexts of <code>this</code>: global context, standalone functions, object methods, nested callbacks, constructor/class instances, DOM event listeners, lexical arrow functions, and explicit binding with <code>call</code>, <code>apply</code>, and <code>bind</code>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*_oHzpaJ3vThBX_bnC9ua8w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-75-this-keyword-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-75-this-keyword-in-javascript?file=index.html,script.js</a></p>',
    },

    // ── 1. Global & Standalone Functions ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Case 1 & 2: Global Scope and Regular Functions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the browser's global scope, or inside a standalone function invoked without a contextual object prefix, <code>this</code> defaults to the global window object (or <code>undefined</code> in strict mode):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 🌍 Global Scope:
console.log(this); // 👉 Window (in browser) / global (in Node.js)

// 🧱 Standalone Function invocation:
function showThis() {
  console.log(this);
}

showThis(); // 👉 Window (non-strict mode) | undefined (in "use strict")`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Object Methods ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Case 3: Inside Object Methods (Implicit Binding)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a function is called as a method via property access (<code>obj.method()</code>), <code>this</code> binds to the object on the left-hand side of the dot:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = {
  firstName: "Yuvaraj",
  lastName: "Dev",
  getFullName() {
    // 'this' points directly to the 'user' object:
    console.log(\`\${this.firstName} \${this.lastName}\`);
  },
};

user.getFullName(); // 👉 "Yuvaraj Dev"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Nested Callback Trap & Solutions ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Case 4: The Nested Function Trap & Solutions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A common pitfall occurs when defining an inner function inside a method. Because the inner function is called standalone, it loses its outer method's <code>this</code> context:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ The Problem: Regular inner function loses 'this'
const userBroken = {
  name: "Yuvaraj",
  greet() {
    function inner() {
      console.log(this.name); // ❌ undefined ('this' is Window)
    }
    inner();
  },
};

// ✅ Fix 1: Arrow Function (Lexically inherits 'this' from greet())
const userFixedArrow = {
  name: "Yuvaraj",
  greet() {
    const inner = () => {
      console.log("Arrow Fix:", this.name);
    };
    inner(); // ✅ "Yuvaraj"
  },
};
userFixedArrow.greet();

// ✅ Fix 2: Explicit .bind(this)
const userFixedBind = {
  name: "Yuvaraj",
  greet() {
    function inner() {
      console.log("Bind Fix:", this.name);
    }
    inner.bind(this)(); // ✅ "Yuvaraj"
  },
};
userFixedBind.greet();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Constructors & Classes ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Case 5 & 6: Constructors & ES6 Classes (new Binding)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When invoking a constructor function or instantiating a class using the <strong><code>new</code></strong> keyword, a fresh object is created and bound to <code>this</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class Developer {
  constructor(name, stack) {
    this.name = name;
    this.stack = stack;
  }

  introduce() {
    console.log(\`Hi, I'm \${this.name} building with \${this.stack}!\`);
  }
}

const dev1 = new Developer("Yuvaraj", "Next.js & TypeScript");
dev1.introduce(); // "Hi, I'm Yuvaraj building with Next.js & TypeScript!"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. DOM Event Handlers ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Case 7: Event Listeners & Arrow Function Differences" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const button = document.querySelector("#submitBtn");

// 🟢 Standard function: 'this' = Target DOM Element (<button>)
button.addEventListener("click", function () {
  console.log("Clicked Element:", this); // <button id="submitBtn">
  this.classList.add("active");
});

// 🔴 Arrow function: 'this' = Outer Lexical Scope (Window)
button.addEventListener("click", () => {
  console.log("Lexical this:", this); // Window
  // this.classList.add("active"); // ❌ Error: Cannot read properties of Window
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Explicit Binding (call, apply, bind) ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Explicit Binding: call(), apply(), and bind()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides utility methods on <code>Function.prototype</code> to explicitly dictate the exact object <code>this</code> must point to:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function printProfile(city, country) {
  console.log(\`\${this.name} lives in \${city}, \${country}.\`);
}

const profile = { name: "Yuvaraj" };

// 1. call: invokes immediately, passes arguments comma-separated
printProfile.call(profile, "Bangalore", "India");

// 2. apply: invokes immediately, passes arguments as an array
printProfile.apply(profile, ["Bangalore", "India"]);

// 3. bind: returns a new permanently bound function for later execution
const boundFn = printProfile.bind(profile, "Bangalore", "India");
boundFn();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ JavaScript 'this' Binding Rules Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Invocation Pattern</th><th style=\"padding:8px;\">What 'this' Points To</th><th style=\"padding:8px;\">Example</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Global Context</td><td style=\"padding:8px;\"><code>window</code> (browser) / <code>global</code> (Node)</td><td style=\"padding:8px;\"><code>console.log(this)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Direct Function Call</td><td style=\"padding:8px;\"><code>window</code> (non-strict) / <code>undefined</code> (strict)</td><td style=\"padding:8px;\"><code>fn()</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Method Call</td><td style=\"padding:8px;\">Object before the dot (caller)</td><td style=\"padding:8px;\"><code>user.getName()</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Constructor / Class (<code>new</code>)</td><td style=\"padding:8px;\">Newly instantiated object</td><td style=\"padding:8px;\"><code>new User()</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">DOM Event Listener</td><td style=\"padding:8px;\">Current DOM element handling event</td><td style=\"padding:8px;\"><code>btn.addEventListener('click', fn)</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Arrow Function</td><td style=\"padding:8px;\">Lexically enclosing scope</td><td style=\"padding:8px;\"><code>() => { this }</code></td></tr><tr><td style=\"padding:8px;\">Explicit (<code>call</code>/<code>apply</code>/<code>bind</code>)</td><td style=\"padding:8px;\">Target object provided as 1st argument</td><td style=\"padding:8px;\"><code>fn.call(customObj)</code></td></tr></tbody></table>",
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
    const collectionTitle = 'Lesson 75: Mastering the "this" Keyword in JavaScript';
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 75;

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

    console.log("🎉 Done! JS Lesson 75 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
