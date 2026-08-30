/**
 * Seed Script: JavaScript "Lesson 73: Mastering Getters and Setters in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson73.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson73.ts
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
        "<p>In JavaScript, <strong>Getters (<code>get</code>)</strong> and <strong>Setters (<code>set</code>)</strong> are special accessor methods that bind an object property to a function. When the property is accessed or assigned, the corresponding function executes behind the scenes.</p><p>Getters and setters allow developers to compute dynamic values, validate incoming data, and maintain clean public interfaces without requiring explicit method calls with parentheses <code>()</code>. In this lesson, we explore accessor properties in both plain object literals and ES6 classes.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*CnZVUmwZsyQBUPrhmJ3m3Q.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-73-mastering-getters-and-setters-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-73-mastering-getters-and-setters-in-javascript?file=index.html,script.js</a></p>',
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
  <title>Getter & Setter Demo</title>
</head>
<body>
  <h2>JavaScript Getter and Setter Example</h2>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. The Problem: Manual Concatenation & Calculation ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Manual Property Derivation" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = {
  firstName: "Akash",
  lastName: "Kumar",
};

// ❌ Repetitive manual derivation across application code:
console.log(\`\${user.firstName} \${user.lastName}\`); // "Akash Kumar"

// 💡 We want a clean, declarative property read:
// console.log(user.fullName);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Defining a Getter ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Defining a Getter (get propertyName)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>getter</strong> is declared with the <code>get</code> keyword. It accepts no parameters and returns computed data when the property is read:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userWithGetter = {
  firstName: "Akash",
  lastName: "Kumar",

  // 🔍 Getter: executed when 'userWithGetter.fullName' is evaluated
  get fullName() {
    console.log("Computing full name...");
    return \`\${this.firstName} \${this.lastName}\`;
  },
};

// ✅ Accessed without parentheses () like a standard property:
console.log(userWithGetter.fullName); 
// Output: "Computing full name..." -> "Akash Kumar"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Defining a Setter ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Defining a Setter (set propertyName)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>setter</strong> is declared with the <code>set</code> keyword. It takes exactly one argument and executes when a value is assigned via <code>=</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userWithAccessors = {
  firstName: "Akash",
  lastName: "Kumar",

  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  },

  // ✍️ Setter: updates internal state based on assigned string
  set fullName(value) {
    console.log("Setting full name:", value);
    const [first, last] = value.split(" ");
    this.firstName = first || "";
    this.lastName = last || "";
  },
};

// Assign value like a normal property assignment:
userWithAccessors.fullName = "Riya Sharma";

console.log(userWithAccessors.firstName); // "Riya"
console.log(userWithAccessors.lastName);  // "Sharma"
console.log(userWithAccessors.fullName);  // "Riya Sharma"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Data Validation with Accessors ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Data Validation & Protection with Setters" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const person = {
  _age: 0, // Internal backing storage

  get age() {
    return this._age;
  },

  set age(value) {
    if (typeof value !== "number" || value < 0) {
      console.error("❌ Age must be a positive number!");
      return;
    }
    this._age = value;
  },
};

person.age = -10; // ❌ "Age must be a positive number!"
person.age = 25;  // ✅ Valid
console.log("Verified Age:", person.age); // 25`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Getters and Setters in ES6 Classes ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Getters & Setters inside ES6 Classes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In ES6 classes, getters and setters are placed on the class prototype, making them accessible to all class instances seamlessly:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class UserAccount {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }

  get fullName() {
    return \`\${this.first} \${this.last}\`;
  }

  set fullName(value) {
    const parts = value.trim().split(" ");
    this.first = parts[0] || "";
    this.last = parts.slice(1).join(" ") || "";
  }
}

const account = new UserAccount("Akash", "Kumar");
console.log(account.fullName); // "Akash Kumar"

account.fullName = "Riya Sharma";
console.log(account.first);    // "Riya"
console.log(account.last);     // "Sharma"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Getters & Setters Comparison Reference" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Getter (<code>get</code>)</th><th style=\"padding:8px;\">Setter (<code>set</code>)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Primary Purpose</td><td style=\"padding:8px;\">Read computed or formatted data</td><td style=\"padding:8px;\">Write, validate, and transform data</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Parameters</td><td style=\"padding:8px;\">Must have <strong>0 parameters</strong></td><td style=\"padding:8px;\">Must have <strong>exactly 1 parameter</strong></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Return Value</td><td style=\"padding:8px;\">Returns a value (computed expression)</td><td style=\"padding:8px;\">Does not return (performs side effects)</td></tr><tr><td style=\"padding:8px;\">Invocation Syntax</td><td style=\"padding:8px;\"><code>const val = obj.prop;</code></td><td style=\"padding:8px;\"><code>obj.prop = newVal;</code></td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 73: Mastering Getters and Setters in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 73;

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

    console.log("🎉 Done! JS Lesson 73 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
