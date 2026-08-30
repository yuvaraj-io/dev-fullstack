/**
 * Seed Script: JavaScript "Lesson 70: Understanding Classes in JavaScript — The Syntactic Sugar of Constructor Functions"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson70.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson70.ts
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
        "<p>Introduced in ECMAScript 2015 (ES6), <strong>Classes</strong> provide a cleaner, more intuitive syntax for creating objects and structuring Object-Oriented code in JavaScript.</p><p>However, JavaScript classes are fundamentally <strong>syntactic sugar</strong> over existing prototype-based constructor functions. Behind the scenes, JavaScript continues to rely on prototype chains rather than classical object-oriented class systems. In this lesson, we dissect class mechanics, the <code>constructor()</code> lifecycle, automatic prototype method binding, and mandatory <code>new</code> invocation checks.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*WYn5_Rry2_uwSKM24iodQQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-70-understanding-classes-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-70-understanding-classes-in-javascript?file=index.html,script.js</a></p>',
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
  <title>JavaScript Classes</title>
</head>
<body>
  <h1>JavaScript ES6 Classes</h1>
  <script src="class.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Defining an ES6 Class ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Defining an ES6 Class" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 📁 class.js
class CreateUser {
  // 🔑 constructor() runs automatically when instantiating via 'new'
  constructor(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  // 🌟 Methods defined in the class body automatically attach to CreateUser.prototype
  getFullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  getBirthYear() {
    return this.birthYear;
  }
}

const user1 = new CreateUser("Aman", "Mishra", 1995);
console.log(user1.getFullName());  // "Aman Mishra"
console.log(user1.getBirthYear()); // 1995`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Equivalence to Constructor Functions ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Under the Hood: Class vs. Constructor Function" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The ES6 <code>class</code> syntax maps directly to the prototype-based pattern we learned in Lesson 69:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 👴 Legacy Constructor Function (Under the hood equivalent):
function LegacyCreateUser(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
}

LegacyCreateUser.prototype.getFullName = function () {
  return \`\${this.firstName} \${this.lastName}\`;
};

LegacyCreateUser.prototype.getBirthYear = function () {
  return this.birthYear;
};

// 🔍 Verification: Classes are functions in JavaScript runtime
console.log(typeof CreateUser); // 👉 "function"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Key Differences & Mandatory 'new' ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Safety: Mandatory 'new' Invocation" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>One major structural improvement of ES6 classes over traditional constructor functions is strict construction enforcement:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ Calling a class directly without 'new' throws a TypeError:
try {
  CreateUser("Aman", "Mishra", 1995);
} catch (err) {
  console.error(err.message); 
  // Output: "Class constructor CreateUser cannot be invoked without 'new'"
}

// ✅ Correct instantiation:
const validUser = new CreateUser("Aman", "Mishra", 1995);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Prototype Inspection ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Automatic Prototype Placement" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>All methods declared inside the class body (outside constructor) are automatically placed onto <code>CreateUser.prototype</code> and shared across all instances:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const u1 = new CreateUser("Aman", "Mishra", 1995);
const u2 = new CreateUser("Neha", "Sharma", 1998);

console.log(Object.getPrototypeOf(u1)); // { constructor: ƒ, getFullName: ƒ, getBirthYear: ƒ }
console.log(u1.getFullName === u2.getFullName); // ✅ true (Shared memory reference!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ ES6 Class Architecture Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Constructor Function (ES5)</th><th style=\"padding:8px;\">ES6 Class (ES2015)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Type Typeof</td><td style=\"padding:8px;\"><code>function</code></td><td style=\"padding:8px;\"><code>function</code> (Syntactic sugar)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Direct Call <code>fn()</code></td><td style=\"padding:8px;\">Pollutes global <code>this</code> (unless in strict mode)</td><td style=\"padding:8px;\">Throws <code>TypeError</code> (Safe by default)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Method Definition</td><td style=\"padding:8px;\">Explicit <code>Fn.prototype.method = ...</code></td><td style=\"padding:8px;\">Declarative class body methods</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Strict Mode</td><td style=\"padding:8px;\">Opt-in via <code>\"use strict\"</code></td><td style=\"padding:8px;\">Always executed in strict mode</td></tr><tr><td style=\"padding:8px;\">Hoisting</td><td style=\"padding:8px;\">Function declarations are hoisted</td><td style=\"padding:8px;\">Not hoisted (Temporal Dead Zone applies)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 70: Understanding Classes in JavaScript — The Syntactic Sugar of Constructor Functions";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 70;

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

    console.log("🎉 Done! JS Lesson 70 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
