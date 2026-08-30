/**
 * Seed Script: JavaScript "Lesson 69: Constructor Function, Prototype, Inheritance & Polymorphism in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson69.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson69.ts
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
        "<p>In the previous lesson, we saw how factory functions standardize object generation but suffer from a major heap memory bottleneck: every instance duplicates identical methods in memory.</p><p>In this lesson, we explore JavaScript's core object creation architecture: <strong>Constructor Functions</strong>, the 4-step mechanics of the <code>new</code> operator, shared memory via <strong><code>prototype</code></strong>, prototype chain <strong>Inheritance</strong>, and runtime <strong>Polymorphism</strong>.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*-v7hL4UorJAA6j-ujqizZA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-69-constructor-prototype-inheritance?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-69-constructor-prototype-inheritance?file=index.html,script.js</a></p>',
    },

    // ── 1. The 'this' Keyword Dynamics ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Understanding the 'this' Keyword" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In JavaScript, <code>this</code> is dynamically evaluated based on the invocation context (who is calling the function):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Standalone function call in browser global scope:
function showGlobalThis() {
  console.log(this); // points to 'window' object (or undefined in strict mode)
}
showGlobalThis();

// 2. Method call within an object:
const userObj = {
  name: "Anurag",
  showThis() {
    console.log(this); // points to 'userObj'
  },
};
userObj.showThis();`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Constructor Functions & the 'new' Keyword ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Constructor Functions & The 'new' Operator" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>Constructor Function</strong> acts as an object blueprint. By convention, constructor functions are capitalized (e.g., <code>User</code>). When invoked with the <code>new</code> keyword, 4 sequential steps occur under the hood:</p><ol><li>A brand new, empty object <code>{}</code> is allocated in memory.</li><li><code>this</code> is bound to that new empty object.</li><li>The object's hidden <code>[[Prototype]]</code> (<code>__proto__</code>) link is connected to <code>User.prototype</code>.</li><li>The newly populated object is returned automatically.</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function User(firstName, lastName, birthYear) {
  // Step 1 & 2: 'this' points to the new empty instance
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
  // Step 4: 'this' is implicitly returned!
}

const user1 = new User("Anurag", "Singh", 1998);
const user2 = new User("Neha", "Mishra", 1995);

console.log(user1); // User { firstName: 'Anurag', lastName: 'Singh', birthYear: 1998 }`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Prototype Memory Optimization ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Shared Methods with Constructor Prototypes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every function in JavaScript includes a <code>prototype</code> object. Attaching methods to <code>Constructor.prototype</code> ensures that all instances share a single function reference in memory:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Attach shared method to User.prototype:
User.prototype.getBirthYear = function () {
  return 2025 - this.birthYear;
};

User.prototype.getFullName = function () {
  return \`\${this.firstName} \${this.lastName}\`;
};

console.log(user1.getBirthYear()); // 27
console.log(user2.getBirthYear()); // 30

// 🌟 Verification of Memory Efficiency:
console.log(user1.getBirthYear === user2.getBirthYear); // ✅ true (Same reference in heap!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Prototypal Inheritance ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Prototypal Inheritance & The Prototype Chain" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When accessing <code>user1.getBirthYear()</code>, JavaScript first looks directly inside <code>user1</code>. Finding only state properties, the engine traverses up the prototype chain via <code>user1.__proto__</code> into <code>User.prototype</code> and executes the method with <code>this</code> set to <code>user1</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(user1.__proto__ === User.prototype); // ✅ true
console.log(User.prototype.__proto__ === Object.prototype); // ✅ true
console.log(Object.prototype.__proto__); // null (end of chain)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Runtime Polymorphism ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Runtime Polymorphism in JavaScript" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Polymorphism</strong> (\"many forms\") allows identical method calls to produce different behaviors based on the instance state or subclass implementation:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Same method signature, distinct dynamic outputs based on runtime instance:
const users = [
  new User("Anurag", "Singh", 1998),
  new User("Neha", "Mishra", 1995),
  new User("Yuvaraj", "S", 2000),
];

users.forEach(u => {
  // Polymorphic execution: each calculation reflects 'u.birthYear'
  console.log(\`\${u.getFullName()} is \${u.getBirthYear()} years old.\`);
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Prototypal OOP Architecture Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Term / Concept</th><th style=\"padding:8px;\">Role &amp; Mechanism</th><th style=\"padding:8px;\">Key Benefit</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>this</code></td><td style=\"padding:8px;\">Dynamic execution context reference</td><td style=\"padding:8px;\">Allows methods to dynamically access instance data</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>new</code> Keyword</td><td style=\"padding:8px;\">Instantiates empty object, binds <code>this</code>, sets prototype, returns instance</td><td style=\"padding:8px;\">Automates object construction boilerplate</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>Constructor.prototype</code></td><td style=\"padding:8px;\">Shared container object for methods and shared properties</td><td style=\"padding:8px;\">Eliminates duplicate function allocations in memory</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Inheritance</strong></td><td style=\"padding:8px;\">Lookup fallback via <code>[[Prototype]]</code> / <code>__proto__</code></td><td style=\"padding:8px;\">Enables code reuse across hierarchical objects</td></tr><tr><td style=\"padding:8px;\"><strong>Polymorphism</strong></td><td style=\"padding:8px;\">Uniform method invocation exhibiting instance-specific responses</td><td style=\"padding:8px;\">Permits generic, extensible consumer logic</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 69: Constructor Function, Prototype, Inheritance & Polymorphism in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 69;

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

    console.log("🎉 Done! JS Lesson 69 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
