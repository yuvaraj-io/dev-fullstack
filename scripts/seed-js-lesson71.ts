/**
 * Seed Script: JavaScript "Lesson 71: Private Fields & Methods in JavaScript Classes — Truly Private Data"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson71.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson71.ts
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
        "<p>In traditional JavaScript, achieving true data encapsulation inside objects required complex closure workarounds because properties attached to <code>this</code> remained completely public.</p><p>Introduced in ECMAScript 2022 (ES13), <strong>Private Class Features</strong> (using the <code>#</code> prefix) provide native, language-enforced data hiding. In this lesson, we explore how private instance fields, private methods, and private static fields protect sensitive object state from external mutation.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*gw4EbYHYKrRkxcwP76hXiQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-71-private-fields-methods-in-javascript-classes?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-71-private-fields-methods-in-javascript-classes?file=index.html,script.js</a></p>',
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
  <title>Private Fields in JavaScript</title>
</head>
<body>
  <h1>Private Fields & Methods in JavaScript</h1>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. The Problem: Public Properties ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Public Properties Are Modifiable" },
    {
      id: nextId(),
      type: "code" as const,
      code: `class InsecureUser {
  constructor(firstName, age) {
    this.firstName = firstName;
    this.age = age; // ⚠️ Publicly exposed property
  }
}

const user = new InsecureUser("Aman", 32);
console.log("Original age:", user.age); // 32

// ❌ Anyone can directly mutate public state from outside:
user.age = 999;
console.log("Mutated age:", user.age); // 999`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. The Legacy Underscore Convention ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ The Legacy Convention: Underscore (_prop)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before native private fields, developers prefixed internal properties with an underscore (<code>_age</code>). This was merely a <em>gentlemen's agreement</em> convention and offered zero actual runtime security:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class ConventionalUser {
  constructor(firstName, age) {
    this._age = age; // ⚠️ Underscore is just naming convention, still public!
    this.firstName = firstName;
  }
}

const user2 = new ConventionalUser("Ankit", 25);
console.log(user2._age); // 25 (Accessible directly without error)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Modern True Privacy with # ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ True Privacy with Hash (#) Fields" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>With modern JavaScript (ES2022+), declaring a field starting with <code>#</code> ensures it cannot be accessed or modified from outside the class body:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class CreateUser {
  #age; // 🔒 1. Declare private instance field in class body

  constructor(firstName, age) {
    this.firstName = firstName; // Public field
    this.#age = age;           // Assign private field
  }

  getAge() {
    return this.#age; // ✅ Accessible inside the class methods
  }
}

const user3 = new CreateUser("Riya", 28);
console.log("Age via getter:", user3.getAge()); // ✅ 28

// ❌ Direct external access triggers a hard syntax error:
// console.log(user3.#age); // SyntaxError: Private field '#age' must be declared in an enclosing class`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Private Methods ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Encapsulating Internal Logic with Private Methods" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Private methods (<code>#methodName()</code>) prevent consumers from directly invoking sensitive background operations like ledger updates or cryptography routines:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class BankAccount {
  #balance = 0; // Private state initialized with default

  deposit(amount) {
    if (amount <= 0) throw new Error("Invalid deposit amount");
    this.#updateBalance(amount); // ✅ Allowed inside class
  }

  // 🔒 Private helper method:
  #updateBalance(amount) {
    this.#balance += amount;
    console.log(\`✅ Updated Balance: $\${this.#balance}\`);
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(250); // Output: "✅ Updated Balance: $250"

// ❌ Attempting to call private method directly:
// account.#updateBalance(1000); // SyntaxError: Private field '#updateBalance' must be declared in enclosing class`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Private Static Fields ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Private Static Fields (static #prop)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `class AppConfig {
  static #apiKey = "SECRET_API_KEY_9988"; // 🔒 Private static property
  static appName = "DevFullstack Platform"; // Public static property

  static getSecureConfig() {
    return {
      name: this.appName,
      maskedKey: this.#apiKey.slice(0, 4) + "****",
    };
  }
}

console.log(AppConfig.appName);           // "DevFullstack Platform"
console.log(AppConfig.getSecureConfig());  // { name: '...', maskedKey: 'SECR****' }
// console.log(AppConfig.#apiKey);        // ❌ SyntaxError`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Public vs. Private Class Features Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Internal Access</th><th style=\"padding:8px;\">External Access</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Public Field</td><td style=\"padding:8px;\"><code>prop = val</code></td><td style=\"padding:8px;\"><code>this.prop</code></td><td style=\"padding:8px;\"><code>instance.prop</code> (Read &amp; Write)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Private Field</td><td style=\"padding:8px;\"><code>#prop = val</code></td><td style=\"padding:8px;\"><code>this.#prop</code></td><td style=\"padding:8px;\">❌ <code>SyntaxError</code> (Blocked)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Private Method</td><td style=\"padding:8px;\"><code>#method() {}</code></td><td style=\"padding:8px;\"><code>this.#method()</code></td><td style=\"padding:8px;\">❌ <code>SyntaxError</code> (Blocked)</td></tr><tr><td style=\"padding:8px;\">Private Static Field</td><td style=\"padding:8px;\"><code>static #secret = val</code></td><td style=\"padding:8px;\"><code>ClassName.#secret</code></td><td style=\"padding:8px;\">❌ <code>SyntaxError</code> (Blocked)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 71: Private Fields & Methods in JavaScript Classes — Truly Private Data";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 71;

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

    console.log("🎉 Done! JS Lesson 71 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
