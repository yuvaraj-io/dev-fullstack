/**
 * Seed Script: JavaScript "Lesson 66: Optional Chaining in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson66.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson66.ts
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
        "<p>Accessing deeply nested properties in JavaScript objects without prior existence checks historically triggered runtime <code>TypeError: Cannot read properties of undefined</code> exceptions.</p><p>Introduced in ECMAScript 2020 (ES11), the <strong>Optional Chaining operator (<code>?.</code>)</strong> allows developers to safely read values of nested properties, dynamic keys, or invoke optional methods without explicitly verifying each reference in the chain.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*5wfAJWeDt9grtByaDt-I8A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-66-optional-chaining-in-javascript?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-66-optional-chaining-in-javascript?file=index.html,script.js</a></p>',
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
  <title>Optional Chaining Demo</title>
</head>
<body>
  <h2>Optional Chaining Example</h2>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. The Problem: Nested Property Crash ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: TypeError on Missing Nested Objects" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const user = {
  firstname: "John",
  lastname: "Doe",
};

console.log(user.firstname);    // ✅ "John"
console.log(user.address);      // ✅ undefined (Property exists as undefined on user)
console.log(user.address.city); // ❌ TypeError: Cannot read properties of undefined (reading 'city')`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Evolution of Solutions ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Evolution of Solutions: From Verbose to Elegant" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before ES2020, developers guarded nested access using verbose <code>if</code> statements or short-circuit logical AND (<code>&&</code>) expressions:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 👴 Approach 1: Guarded if checks (Verbose)
if (user.address && user.address.details) {
  console.log(user.address.details.city);
}

// 👴 Approach 2: Logical AND Short-circuiting
const city = user.address && user.address.details && user.address.details.city;

// ✨ Modern Approach (ES2020): Optional Chaining (?.)
const safeCity = user?.address?.details?.city;
console.log("Safe City:", safeCity); // Output: undefined (no error!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Dynamic Keys with Bracket Notation ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Dynamic Property Keys with Bracket Notation (?. [])" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userProfile = {
  preferences: {
    theme: "dark",
    notifications: { email: true },
  },
};

const dynamicKey = "notifications";
console.log(userProfile?.preferences?.[dynamicKey]?.email); // ✅ true
console.log(userProfile?.settings?.[dynamicKey]?.email);    // ✅ undefined (no error)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Safe Method Calls ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Safe Method Invocations (?. ())" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Optional chaining allows conditionally invoking methods only if they are defined on the target object:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userAccount = {
  name: "Yuvaraj",
  getFullName() {
    return \`User: \${this.name}\`;
  },
};

// 1. Invoking existing method:
console.log(userAccount.getFullName?.()); // ✅ "User: Yuvaraj"

// 2. Safely calling a deleted or undefined method:
delete userAccount.getFullName;
console.log(userAccount.getFullName?.()); // ✅ undefined (no crash!)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Optional Chaining Syntax Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Use Case</th><th style=\"padding:8px;\">Behavior if Target is null / undefined</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>obj?.prop</code></td><td style=\"padding:8px;\">Static object property access</td><td style=\"padding:8px;\">Short-circuits and returns <code>undefined</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>obj?.[expr]</code></td><td style=\"padding:8px;\">Dynamic expression / array index access</td><td style=\"padding:8px;\">Short-circuits without evaluating index expression</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>arr?.[index]</code></td><td style=\"padding:8px;\">Array element access</td><td style=\"padding:8px;\">Safely accesses item if array exists</td></tr><tr><td style=\"padding:8px;\"><code>func?.(...args)</code></td><td style=\"padding:8px;\">Optional method / callback execution</td><td style=\"padding:8px;\">Short-circuits without attempting invocation</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 66: Optional Chaining in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 66;

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

    console.log("🎉 Done! JS Lesson 66 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
