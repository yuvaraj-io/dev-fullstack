/**
 * Seed Script: JavaScript "Lesson 5: JavaScript Data Types & the typeof Operator"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson5.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson5.ts
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
        "<p>In this lesson, we will explore the data types that can be assigned to variables in JavaScript. JavaScript categorizes data types into <strong>primitive</strong> and <strong>non-primitive</strong> (reference) types. The <code>typeof</code> operator is a handy built-in tool to determine the runtime data type of any value.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-5-javascript-data-types-and-typeof-operator?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-5-javascript-data-types-and-typeof-operator?file=script.js</a></p>',
    },

    // ── What is a Data Type? ──
    { id: nextId(), type: "heading" as const, content: "What is a Data Type?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>data type</strong> refers to the classification of data that a value represents. In JavaScript, variables are dynamically typed (untyped identifiers), but the <em>values</em> assigned to them always hold a specific type.</p>",
    },

    // ── Primitive Data Types ──
    { id: nextId(), type: "heading" as const, content: "Primitive Data Types" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Primitive data types are the fundamental building blocks of JavaScript. They are immutable and compared directly by value. JavaScript features <strong>seven</strong> primitive data types:</p>",
    },

    // 1. String
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>1. String:</strong> Represents textual data enclosed in quotes.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let name = "Alice";
console.log(typeof name); // "string"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 2. Number
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>2. Number:</strong> Represents integer and floating-point numeric values.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let age = 30;
console.log(typeof age); // "number"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 3. Boolean
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>3. Boolean:</strong> Represents logical truth values: <code>true</code> or <code>false</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let isStudent = true;
console.log(typeof isStudent); // "boolean"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 4. Undefined
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>4. Undefined:</strong> A variable that has been declared but not yet assigned any value.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let x;
console.log(typeof x); // "undefined"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 5. Null
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>5. Null:</strong> Represents an intentional, deliberate non-value or empty object pointer.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let y = null;
console.log(typeof y); // "object" (known JavaScript legacy quirk)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>Note:</em> <code>typeof null === \"object\"</code> is a historical bug from the first release of JavaScript that was kept to avoid breaking existing web applications.</p>",
    },

    // 6. Symbol
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>6. Symbol:</strong> Introduced in ES6, represents a unique, anonymous, and immutable identifier.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let sym = Symbol("id");
console.log(typeof sym); // "symbol"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // 7. BigInt
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>7. BigInt:</strong> Introduced in ES2020 (ES11), used for arbitrarily large integers beyond <code>Number.MAX_SAFE_INTEGER</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let bigIntNum = 1234567890123456789012345678901234567890n;
console.log(typeof bigIntNum); // "bigint"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Non-Primitive Data Types ──
    { id: nextId(), type: "heading" as const, content: "Non-Primitive Data Types (Reference Types)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Non-primitive data types represent collections of data and more complex entities. They are mutable and compared by reference in memory.</p>",
    },

    // Object
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>1. Object:</strong> A collection of key-value property pairs.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let person = { name: "Alice", age: 25 };
console.log(typeof person); // "object"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Array
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>2. Array:</strong> An ordered list of values (arrays are special instances of objects).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `let numbers = [1, 2, 3];
console.log(typeof numbers); // "object"
console.log(Array.isArray(numbers)); // true (use this to check for arrays)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Function
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>3. Function:</strong> A callable block of code designed to execute a specific procedure.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function greet() { return "Hello"; }
console.log(typeof greet); // "function"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── The typeof Operator ──
    { id: nextId(), type: "heading" as const, content: "The typeof Operator Cheat Sheet" },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(typeof "Hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object"  (known quirk)
console.log(typeof Symbol("id"));   // "symbol"
console.log(typeof 123n);           // "bigint"
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"  (use Array.isArray([]))
console.log(typeof function(){});   // "function"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "📌 Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>JavaScript has <strong>7 primitive data types</strong>: <code>String</code>, <code>Number</code>, <code>Boolean</code>, <code>Undefined</code>, <code>Null</code>, <code>Symbol</code>, and <code>BigInt</code>.</li><li>Non-primitive (reference) types include <strong>Objects</strong>, <strong>Arrays</strong>, and <strong>Functions</strong>.</li><li>Use <code>typeof</code> to inspect variable types, and use <code>Array.isArray()</code> specifically to test for arrays.</li></ul>",
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
    const collectionTitle = "Lesson 5: JavaScript Data Types & the typeof Operator";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 5;

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

    console.log("🎉 Done! JS Lesson 5 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
