/**
 * Seed Script: JavaScript "Lesson 72: Understanding static Methods & Properties in JavaScript Classes"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson72.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson72.ts
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
        "<p>In object-oriented programming, not all state and logic belong to individual object instances. Certain utility operations (like <code>Math.floor()</code> or <code>Array.isArray()</code>) and global configurations belong to the <strong>class constructor itself</strong>.</p><p>JavaScript provides the <strong><code>static</code></strong> keyword and <strong><code>static {}</code> initialization blocks</strong> to attach properties, methods, and one-time setup logic directly to the class blueprint without requiring instance instantiation. In this lesson, we explore static methods, static properties, dynamic <code>this</code> bindings, and static lifecycle execution.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*rL2_LfyP7MSPdVJbznoQbQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-72-understanding-static-methods-properties?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-72-understanding-static-methods-properties?file=index.html,script.js</a></p>',
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
  <title>Static Methods & Properties in JS</title>
</head>
<body>
  <h1>Static Methods & Properties Example</h1>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. Static Properties ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Declaring and Accessing Static Properties" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A static property is attached directly to the class constructor rather than instance objects:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class CreateUser {
  static greeting = "Hello from class!"; // 👈 Static property on constructor

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const user1 = new CreateUser("Riya", "Sharma");

console.log(CreateUser.greeting); // ✅ "Hello from class!" (Accessed on Class)
console.log(user1.greeting);      // ❌ undefined (Not accessible on instance!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Static Methods ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Static Utility Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Static methods are ideal for helper logic, factory constructors, or domain calculations that do not depend on individual instance state:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class UserUtils {
  static company = "DevFullstack Tech";

  // 🛠️ Static helper method:
  static formatName(first, last) {
    return \`\${first.trim().toUpperCase()} \${last.trim().toUpperCase()}\`;
  }

  static welcome() {
    console.log(\`Welcome to \${this.company}\`);
  }
}

console.log(UserUtils.formatName("  anurag ", " singh ")); // "ANURAG SINGH"
UserUtils.welcome(); // "Welcome to DevFullstack Tech"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Dynamic 'this' in Static Context ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ The 'this' Binding: Static vs. Instance Context" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The value of <code>this</code> depends on the execution context within the class:</p><ul><li><strong>Inside a normal method / constructor:</strong> <code>this</code> points to the <strong>individual instance object</strong>.</li><li><strong>Inside a static method / static block:</strong> <code>this</code> points to the <strong>Class constructor function itself</strong>.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class ContextDemo {
  static classLevel = "Static State";
  instanceLevel = "Instance State";

  constructor() {
    console.log("In Constructor this:", this.instanceLevel); // 'this' -> instance
  }

  static checkStaticThis() {
    console.log("In Static Method this:", this.classLevel); // 'this' -> ContextDemo
  }
}

ContextDemo.checkStaticThis(); // Output: "In Static Method this: Static State"
new ContextDemo();             // Output: "In Constructor this: Instance State"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Static Initialization Blocks ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Static Initialization Blocks (static {})" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Introduced in ES2022, <strong><code>static {}</code> blocks</strong> allow executing complex setup logic once when the class is initially evaluated in memory:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class DatabaseService {
  static connectionString;
  static isConnected = false;

  // ⚡ Runs automatically ONCE when class definition is evaluated:
  static {
    console.log("Initializing DatabaseService static block...");
    const env = "production";
    this.connectionString = env === "production" 
      ? "mongodb://cluster0.primary" 
      : "mongodb://127.0.0.1:27017";
    this.isConnected = true;
  }
}

console.log(DatabaseService.connectionString); // "mongodb://cluster0.primary"
console.log(DatabaseService.isConnected);      // true`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Instance vs. Static Features Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Instance Members</th><th style=\"padding:8px;\">Static Members</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Declaration</td><td style=\"padding:8px;\"><code>method() {}</code> / <code>prop = val</code></td><td style=\"padding:8px;\"><code>static method() {}</code> / <code>static prop = val</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Attachment Point</td><td style=\"padding:8px;\"><code>Class.prototype</code> / instance object</td><td style=\"padding:8px;\">Class constructor function itself</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Invocation Target</td><td style=\"padding:8px;\"><code>const obj = new Class(); obj.method()</code></td><td style=\"padding:8px;\"><code>Class.method()</code> (No instantiation required)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>this</code> Value</td><td style=\"padding:8px;\">Points to the active instance</td><td style=\"padding:8px;\">Points to the Class constructor</td></tr><tr><td style=\"padding:8px;\">Primary Use Case</td><td style=\"padding:8px;\">Instance-specific behavior &amp; state</td><td style=\"padding:8px;\">Shared utilities, configurations, cache registries</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 72: Understanding static Methods & Properties in JavaScript Classes";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 72;

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

    console.log("🎉 Done! JS Lesson 72 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
