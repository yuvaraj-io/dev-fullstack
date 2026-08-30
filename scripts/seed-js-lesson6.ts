/**
 * Seed Script: JavaScript "Lesson 6: String Manipulation in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson6.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson6.ts
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
        "<p>In this lesson, we will explore how to create, access, transform, and manipulate strings in JavaScript.</p>",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-6-string-manipulation-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-6-string-manipulation-in-javascript?file=script.js</a></p>',
    },

    // ── Behind the Scenes: Primitives vs String Objects ──
    { id: nextId(), type: "heading" as const, content: "🤔 Are strings automatically String objects?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you assign a variable to a string and call methods like <code>.toUpperCase()</code>, does it get initialized with the <code>String</code> constructor?</p>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*qbUcvhqmAGyf97IjFMJ6vA.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>🔍 Behind the scenes (Autoboxing):</strong></p><ul><li>When you access a property or method on a primitive string, JavaScript <strong>temporarily wraps it in a <code>String</code> object</strong> (wrapper object) that exposes all string prototype methods.</li><li>Once the method executes, that temporary object is immediately discarded and garbage collected.</li></ul>",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*R7Nk4Ywus9mtyYmHb88z5w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Declaring Strings ──
    { id: nextId(), type: "heading" as const, content: "Declaring Strings" },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*DmJSTYL5rWr2Iw0BHalmjg.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const single = 'Single quotes';
const double = "Double quotes";
const backticks = \`Template literals with \${expression}\`;`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*RoW5_7069B1VqMuOL_fuuA.png",
      assetId: "",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>Note:</em> You can explicitly construct a string object with <code>new String(\"...\")</code>, but it is rarely necessary and causes unexpected <code>typeof === \"object\"</code> comparisons. Always prefer primitive string literals.</p>",
    },

    // ── Basic String Properties ──
    { id: nextId(), type: "heading" as const, content: "Basic String Properties" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><code>length</code> — Returns the total count of UTF-16 code units (characters):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `"Hello".length; // 5`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Changing Case ──
    { id: nextId(), type: "heading" as const, content: "Changing Case" },
    {
      id: nextId(),
      type: "code" as const,
      code: `"hello".toUpperCase(); // "HELLO"
"HELLO".toLowerCase(); // "hello"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Accessing Characters ──
    { id: nextId(), type: "heading" as const, content: "Accessing Characters" },
    {
      id: nextId(),
      type: "code" as const,
      code: `"Hello"[0];        // "H"
"Hello".charAt(1); // "e"

const str = "Hello";
str[str.length - 1]; // "o" (last character)
str.at(-1);          // "o" (modern ES2022 method)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Extracting Substrings ──
    { id: nextId(), type: "heading" as const, content: "🔷 Extracting Substrings" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// slice(startIndex, endIndex)
"JavaScript".slice(0, 4); // "Java"
"JavaScript".slice(-6);   // "Script" (supports negative index)

// substring(startIndex, endIndex)
"JavaScript".substring(0, 4); // "Java"

// substr(start, length) - (legacy/deprecated)
"JavaScript".substr(4, 6); // "Script"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Searching Inside Strings ──
    { id: nextId(), type: "heading" as const, content: "Searching Inside Strings" },
    {
      id: nextId(),
      type: "code" as const,
      code: `"banana".indexOf("a");     // 1 (first occurrence)
"banana".lastIndexOf("a"); // 5 (last occurrence)
"banana".includes("na");    // true (contains substring)
"banana".startsWith("ba");  // true (starts with prefix)
"banana".endsWith("na");    // true (ends with suffix)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Replacing Content ──
    { id: nextId(), type: "heading" as const, content: "Replacing Content" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Replaces only the first match
"Hello World".replace("World", "JavaScript"); // "Hello JavaScript"

// Replaces all occurrences
"apple apple".replaceAll("apple", "orange");   // "orange orange"
"apple apple".replace(/apple/g, "orange");     // "orange orange" (with regex)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Repeating & Trimming ──
    { id: nextId(), type: "heading" as const, content: "Repeating & Trimming Whitespace" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Repeating
"ha".repeat(3); // "hahaha"

// Trimming whitespace
"   hello   ".trim();      // "hello"
"   hello   ".trimStart(); // "hello   "
"   hello   ".trimEnd();   // "   hello"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Splitting & Joining ──
    { id: nextId(), type: "heading" as const, content: "Splitting & Joining" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// String to Array: split()
const fruits = "apple,banana,cherry".split(",");
// fruits = ["apple", "banana", "cherry"]

// Array to String: join()
const joined = ["a", "b", "c"].join("-");
// joined = "a-b-c"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Regular Expressions & Conversions ──
    { id: nextId(), type: "heading" as const, content: "Regex Matching & Number Conversions" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Regex matching
"abc123".match(/\\d+/); // ["123"]
/\\d/.test("abc123");   // true

// Number conversions
parseInt("42");     // 42
parseFloat("3.14"); // 3.14
Number("123");      // 123
String(123);        // "123"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Advanced Useful Tricks ──
    { id: nextId(), type: "heading" as const, content: "🧪 Advanced Useful String Tricks" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Reverse a string
const reversed = "hello".split("").reverse().join(""); // "olleh"

// 2. Capitalize first letter
const str = "javascript";
const capitalized = str[0].toUpperCase() + str.slice(1); // "Javascript"

// 3. Remove all whitespace
const clean = " a b c ".replace(/\\s+/g, ""); // "abc"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>String manipulation methods are used daily in web development — whether formatting user inputs, constructing URLs, parsing API data, or rendering dynamic HTML content.</p>",
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
    const collectionTitle = "Lesson 6: String Manipulation in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 6;

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

    console.log("🎉 Done! JS Lesson 6 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
