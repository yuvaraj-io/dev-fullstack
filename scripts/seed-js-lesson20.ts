/**
 * Seed Script: JavaScript "Lesson 20: Objects in JavaScript — Creation, Properties, and Methods"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson20.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson20.ts
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
        "<p>In this lesson, we dive into <strong>Objects in JavaScript</strong>.</p><p>While arrays store ordered collections of values by numerical index, objects store collections of related data and behavior in <strong>key-value pairs</strong> (properties and methods).</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/0*jAp3asVLGU41APu4",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-20-objects-creation-properties-and-methods?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-20-objects-creation-properties-and-methods?file=script.js</a></p>',
    },

    // ── 1. What is an Object? ──
    { id: nextId(), type: "heading" as const, content: "1. What is an Object?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>object</strong> is an entity that encapsulates properties (variables describing data) and methods (functions defining actions):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = {
  name: "Yuvaraj",
  age: 28,
  isDeveloper: true,
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

console.log(user.name); // Output: Yuvaraj
user.greet();           // Output: Hello, I'm Yuvaraj`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Ways to Create Objects ──
    { id: nextId(), type: "heading" as const, content: "🔹 2. Ways to Create Objects" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides three primary ways to define objects:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Object literal (Cleanest & Recommended)
const person = { name: "Shefali", skill: "Web Developer" };

// 2. new Object() constructor
const anotherPerson = new Object();
anotherPerson.name = "Alex";
anotherPerson.skill = "Frontend";

// 3. Constructor function
function Car(model, year) {
  this.model = model;
  this.year = year;
}
const myCar = new Car("Tesla", 2025);
console.log(myCar.model); // Output: Tesla`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Accessing Object Properties ──
    { id: nextId(), type: "heading" as const, content: "🔹 3. Accessing Object Properties (Dot vs Bracket notation)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can access properties using <strong>dot notation</strong> or <strong>bracket notation</strong> (bracket notation allows dynamic keys and keys with special characters):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const car = { brand: "BMW", color: "Black" };

console.log(car.brand);    // Dot notation -> BMW
console.log(car["color"]); // Bracket notation -> Black`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Adding, Updating, and Deleting ──
    { id: nextId(), type: "heading" as const, content: "🔹 4. Adding, Updating, and Deleting Properties" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Objects in JavaScript are mutable by default:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = { name: "Max", age: 25 };

user.country = "India";   // Add new property
user.age = 26;            // Update existing property
delete user.name;         // Delete property

console.log(user); // Output: { age: 26, country: 'India' }`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Object Methods ──
    { id: nextId(), type: "heading" as const, content: "🔹 5. Object Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Methods are functions defined as properties of an object:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const calculator = {
  add: function(a, b) {
    return a + b;
  },
  // ES6 Method shorthand syntax
  subtract(a, b) {
    return a - b;
  }
};

console.log(calculator.add(5, 3));      // Output: 8
console.log(calculator.subtract(10, 4)); // Output: 6`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Nested Objects ──
    { id: nextId(), type: "heading" as const, content: "🔹 6. Nested Objects" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Objects can be arbitrarily nested inside other objects to model complex domain data:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const student = {
  name: "John",
  scores: {
    math: 90,
    english: 85
  }
};

console.log(student.scores.math); // Output: 90`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 7. Objects inside Arrays ──
    { id: nextId(), type: "heading" as const, content: "🔹 7. Objects Inside Arrays" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In web applications, datasets commonly arrive as arrays containing objects:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const users = [
  { name: "Yuvaraj", role: "Frontend" },
  { name: "Sunny", role: "Designer" }
];

users.forEach(user => console.log(user.name));
// Output:
// Yuvaraj
// Sunny`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 8. Built-in Object Static Methods ──
    { id: nextId(), type: "heading" as const, content: "🔹 8. Built-in Object Static Methods (keys, values, entries)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript provides utility methods on <code>Object</code> to extract keys, values, or complete entries:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const book = { title: "JS Basics", author: "Yuvaraj", pages: 120 };

console.log(Object.keys(book));
// Output: ["title", "author", "pages"]

console.log(Object.values(book));
// Output: ["JS Basics", "Yuvaraj", 120]

console.log(Object.entries(book));
// Output: [["title", "JS Basics"], ["author", "Yuvaraj"], ["pages", 120]]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Objects organize structured data as <strong>key-value pairs</strong>.</li><li>Access properties with dot notation (<code>obj.key</code>) or bracket notation (<code>obj[\"key\"]</code>).</li><li>Methods are functions embedded inside objects.</li><li>Built-in utilities like <code>Object.keys()</code>, <code>Object.values()</code>, and <code>Object.entries()</code> simplify object transformation and iteration.</li></ul>",
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
    const collectionTitle = "Lesson 20: Objects in JavaScript — Creation, Properties, and Methods";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 20;

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

    console.log("🎉 Done! JS Lesson 20 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
