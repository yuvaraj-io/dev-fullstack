/**
 * Seed Script: JavaScript "Lesson 28: Arrow Function vs Normal Function — A Deep Dive"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson28.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson28.ts
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
        "<p>In this lesson, we take a deep dive into comparing <strong>Normal Functions (Declarations & Expressions)</strong> and <strong>Arrow Functions</strong> in JavaScript.</p><p>While arrow functions provide concise syntax, the differences between them run much deeper: lexical <code>this</code> binding, the <code>arguments</code> object, constructor capabilities, prototypes, and hoisting.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*x86mmqmnIdgOqVYm_Ivt4A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-28-arrow-function-vs-normal-function?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-28-arrow-function-vs-normal-function?file=script.js</a></p>',
    },

    // ── 1. Normal Function & Expression ──
    { id: nextId(), type: "heading" as const, content: "1. Normal Functions: Declarations & Expressions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>function declaration</strong> uses the <code>function</code> keyword and is fully hoisted:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Function Declaration (hoisted):
function greet() {
  return "Hello!";
}
console.log(greet()); // "Hello!"

// Function Expression (not hoisted):
const greetExpr = function() {
  return "Hello!";
};`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Arrow Functions Syntax ──
    { id: nextId(), type: "heading" as const, content: "2. Arrow Functions: Syntax Variations" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Introduced in ES6, arrow functions provide clean, concise syntax with optional parentheses and implicit returns:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. No parameters:
const sayHi = () => console.log("Hi there!");

// 2. Single parameter (parentheses optional):
const square = n => n * n;

// 3. Multiple parameters:
const add = (a, b) => a + b;

// 4. Explicit return with body block:
const multiply = (a, b) => {
  return a * b;
};

// 5. Returning object literals (must wrap in parentheses!):
const createUser = (name, age) => ({ name, age });`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. The 'this' Keyword ──
    { id: nextId(), type: "heading" as const, content: "3. The Critical Difference: The 'this' Keyword 🧭" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Normal functions</strong> establish their own dynamic <code>this</code> context based on how they are called.</p><p><strong>Arrow functions</strong> do <em>not</em> bind their own <code>this</code>; they retain the lexical <code>this</code> from their enclosing lexical context:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Normal Function as Method:
const user1 = {
  name: "Alice",
  greet: function() {
    console.log(\`Hello, \${this.name}\`);
  }
};
user1.greet(); // Output: "Hello, Alice"

// Arrow Function as Method:
const user2 = {
  name: "Alice",
  greet: () => {
    console.log(\`Hello, \${this.name}\`);
  }
};
user2.greet(); // Output: "Hello, undefined" (lexical this points to window/module)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. The arguments Object ──
    { id: nextId(), type: "heading" as const, content: "4. The 'arguments' Object vs Rest Parameters" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Normal functions contain an array-like <code>arguments</code> object. Arrow functions do not bind <code>arguments</code>; use <strong>rest parameters</strong> (<code>...args</code>) instead:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Normal function:
function sumNormal() {
  console.log(arguments); // [1, 2, 3]
}
sumNormal(1, 2, 3);

// Arrow function:
const sumArrow = (...args) => {
  console.log(args); // [1, 2, 3]
};
sumArrow(1, 2, 3);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Constructors & Prototypes ──
    { id: nextId(), type: "heading" as const, content: "5. Constructors, 'new' Keyword & Prototypes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Normal functions can be used as constructors with <code>new</code> and have a <code>prototype</code> property. Arrow functions lack a <code>[[Construct]]</code> internal method and prototype, and throw a <code>TypeError</code> if invoked with <code>new</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function Person(name) {
  this.name = name;
}
const user = new Person("Alice"); // Works!
console.log(Person.prototype);     // {}

const ArrowPerson = (name) => {
  this.name = name;
};
// new ArrowPerson("Alice"); // ❌ TypeError: ArrowPerson is not a constructor
console.log(ArrowPerson.prototype); // undefined`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Summary Comparison Table ──
    { id: nextId(), type: "heading" as const, content: "6. Summary Comparison & Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Use Arrow Functions for:</strong> Callbacks, array transformations (<code>map</code>, <code>filter</code>, <code>reduce</code>), event listeners where lexical <code>this</code> is desired, and clean inline logic.</li><li><strong>Use Normal Functions for:</strong> Object methods needing dynamic <code>this</code>, constructor functions, generator functions (<code>function*</code>), and functions requiring hoisting.</li></ul>",
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
    const collectionTitle = "Lesson 28: Arrow Function vs Normal Function — A Deep Dive";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 28;

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

    console.log("🎉 Done! JS Lesson 28 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
