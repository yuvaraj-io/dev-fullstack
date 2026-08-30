/**
 * Seed Script: JavaScript "Lesson 68: Encapsulation, Abstraction & Factory Functions Explained"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson68.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson68.ts
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
        "<p>JavaScript is a multi-paradigm language that natively supports procedural, functional, and <strong>Object-Oriented Programming (OOP)</strong> styles.</p><p>In this lesson, we begin exploring OOP in JavaScript from first principles: moving away from scattered procedural variables, bundling state and behavior together with <strong>Encapsulation</strong>, hiding internal algorithmic complexity with <strong>Abstraction</strong>, standardizing object creation with <strong>Factory Functions</strong>, and identifying the memory limitation of redundant method copies.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*4i2C5lY7xSKllDPtnie5PA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-68-encapsulation-abstraction-factory-function?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-68-encapsulation-abstraction-factory-function?file=index.html,script.js</a></p>',
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
  <title>Object-Oriented Programming in JavaScript</title>
</head>
<body>
  <h1>JavaScript Object-Oriented Programming</h1>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Procedural vs OOP ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Procedural vs. Object-Oriented Paradigm" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 👴 1. Procedural Style: Separate variables and standalone functions
const userName = "Aman";
const userAge = 25;

function calculateBirthYear(age) {
  return new Date().getFullYear() - age;
}
console.log("Procedural:", calculateBirthYear(userAge));

// 🚀 2. OOP Style: State and Behavior bundled in one object entity
const user = {
  name: "Aman",
  age: 25,
  getBirthYear() {
    return new Date().getFullYear() - this.age;
  },
};
console.log("OOP:", user.getBirthYear());`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Encapsulation & Abstraction ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Encapsulation and Abstraction Explained" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>📦 Encapsulation:</strong> The bundling of data (properties) and methods (functions that operate on that data) into a single unit (object). It restricts scattered global state.</li><li><strong>🎭 Abstraction:</strong> Hiding internal implementation complexity and exposing only a clean, intuitive public interface. When calling <code>user.getBirthYear()</code>, the consumer doesn't need to know the date math internals.</li></ul>",
    },

    // ── 4. The Problem of Duplication ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ The Problem: Manual Object Literal Duplication" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ Manual literal copying violates DRY principle:
const user1 = {
  name: "Aman",
  age: 25,
  getBirthYear() { return new Date().getFullYear() - this.age; }
};

const user2 = {
  name: "Shefali",
  age: 28,
  getBirthYear() { return new Date().getFullYear() - this.age; }
};`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Factory Function Pattern ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Solution: The Factory Function Pattern" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>Factory Function</strong> is a regular function that creates and returns new object instances dynamically without using the <code>new</code> operator:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function createUser(firstName, lastName, age) {
  return {
    firstName,
    lastName,
    age,
    getBirthYear() {
      const currentYear = new Date().getFullYear();
      return currentYear - this.age;
    },
    getFullName() {
      return \`\${this.firstName} \${this.lastName}\`;
    },
  };
}

const u1 = createUser("Aman", "Mishra", 25);
const u2 = createUser("Shefali", "Sharma", 28);

console.log(u1.getFullName(), "born in:", u1.getBirthYear()); // "Aman Mishra born in: 1998"
console.log(u2.getFullName(), "born in:", u2.getBirthYear()); // "Shefali Sharma born in: 1995"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Memory Bottleneck ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ The Memory Limitation of Factory Functions" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>While factory functions standardize object generation, <strong>every created instance allocates a brand new copy of each method in heap memory</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ⚠️ Method references point to distinct function instances in memory:
console.log(u1.getBirthYear === u2.getBirthYear); // ❌ false (Not shared!)

// Creating 1,000 users creates 1,000 duplicate getBirthYear functions in memory.
// 💡 Solution in Lesson 69: Constructor Functions & Prototype Inheritance.`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ OOP Fundamentals Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Concept</th><th style=\"padding:8px;\">Core Definition</th><th style=\"padding:8px;\">Key Benefit</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Encapsulation</strong></td><td style=\"padding:8px;\">Bundling data and related functions into cohesive objects</td><td style=\"padding:8px;\">Prevents global scope pollution &amp; unintended mutations</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Abstraction</strong></td><td style=\"padding:8px;\">Hiding complex background logic behind simple APIs</td><td style=\"padding:8px;\">Simplifies interface consumption &amp; reduces cognitive load</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Factory Function</strong></td><td style=\"padding:8px;\">A function returning fresh object instances</td><td style=\"padding:8px;\">Reusable template for multiple instances without <code>new</code></td></tr><tr><td style=\"padding:8px;\"><strong>Prototype Sharing</strong></td><td style=\"padding:8px;\">Attaching shared methods to a common prototype</td><td style=\"padding:8px;\">Optimizes heap memory by sharing a single method instance</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 68: Encapsulation, Abstraction & Factory Functions Explained";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 68;

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

    console.log("🎉 Done! JS Lesson 68 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
