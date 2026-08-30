/**
 * Seed Script: JavaScript "Lesson 19: Arrays in JavaScript — Creation, Methods, and Iteration"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson19.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson19.ts
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
        "<p>In this lesson, we explore one of JavaScript's most essential data structures: <strong>Arrays</strong>.</p><p>Arrays allow you to store ordered collections of values in a single variable, making it effortless to organize, transform, and iterate through lists of data such as users, scores, or product catalogs.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/0*yByp1cUyvC7eK24A",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-19-arrays-in-creation-methods-iteration?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-19-arrays-in-creation-methods-iteration?file=index.html</a></p>',
    },

    // ── What is an Array? ──
    { id: nextId(), type: "heading" as const, content: "What is an Array?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>array</strong> is an ordered list of elements. Think of it as a row of numbered slots, starting at index <code>0</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); // Output: Apple`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Creating Arrays ──
    { id: nextId(), type: "heading" as const, content: "🛠️ Creating Arrays" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>There are multiple ways to instantiate arrays in JavaScript:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Array literal syntax (Recommended)
const numbers = [10, 20, 30];

// 2. Array constructor
const names = new Array("Alice", "Bob", "Charlie");

// 3. Empty array
const empty = [];`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Accessing and Modifying ──
    { id: nextId(), type: "heading" as const, content: "🎯 Accessing and Modifying Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Access and update elements using bracket notation with zero-based index numbers:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const colors = ["Red", "Green", "Blue"];
console.log(colors[1]); // Output: Green

// Modifying an element
colors[2] = "Yellow";
console.log(colors);    // Output: ["Red", "Green", "Yellow"]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Adding & Removing Elements ──
    { id: nextId(), type: "heading" as const, content: "🪄 Adding & Removing Elements (push, pop, shift, unshift, splice, slice)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript arrays provide intuitive built-in mutation methods:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["Apple", "Banana"];

fruits.push("Mango");        // Adds to the end -> ["Apple", "Banana", "Mango"]
fruits.pop();                // Removes from the end -> ["Apple", "Banana"]
fruits.unshift("Strawberry");// Adds to the beginning -> ["Strawberry", "Apple", "Banana"]
fruits.shift();              // Removes from the beginning -> ["Apple", "Banana"]

// Splice: Insert or remove items at any index (mutates array)
const animals = ["Cat", "Dog", "Elephant"];
animals.splice(1, 0, "Tiger"); // Insert at index 1 -> ["Cat", "Tiger", "Dog", "Elephant"]
animals.splice(2, 1);          // Remove 1 item at index 2 -> ["Cat", "Tiger", "Elephant"]

// Slice: Copy a portion of an array (non-mutating)
const sliced = animals.slice(0, 2); // -> ["Cat", "Tiger"]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Searching and Checking Elements ──
    { id: nextId(), type: "heading" as const, content: "🔍 Searching & Checking Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Easily search within arrays using <code>includes</code>, <code>indexOf</code>, <code>find</code>, and <code>findIndex</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(3));               // true
console.log(numbers.indexOf(4));                // 3
console.log(numbers.find(num => num > 3));      // 4 (first matching element)
console.log(numbers.findIndex(num => num > 3)); // 3 (index of first match)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Iterating Over Arrays ──
    { id: nextId(), type: "heading" as const, content: "🔁 Iterating Over Arrays" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Several syntax styles are available for looping over array elements:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const fruits = ["Apple", "Banana", "Cherry"];

// 1. Classic for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 2. Modern for...of loop
for (let fruit of fruits) {
  console.log(fruit);
}

// 3. Array forEach() method
fruits.forEach(fruit => console.log(fruit));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Transforming Arrays ──
    { id: nextId(), type: "heading" as const, content: "⚙️ Transforming Arrays (map, filter, reduce, flat, flatMap)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Functional array transformation methods create new collections without mutating original data:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const nums = [1, 2, 3, 4, 5];

// map() -> transforms each element
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter() -> keeps items matching predicate condition
const even = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce() -> aggregates elements into a single accumulated result
const total = nums.reduce((sum, num) => sum + num, 0); // 15

// flat() -> flattens multi-dimensional nested arrays
const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]

// flatMap() -> maps and flattens simultaneously
const doubledFlat = nums.flatMap(num => [num, num * 2]);
console.log(doubledFlat); // [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Sorting & Reversing ──
    { id: nextId(), type: "heading" as const, content: "🎨 Sorting and Reversing Arrays" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Sort or reverse in-place with <code>sort()</code> / <code>reverse()</code>, or use non-mutating modern ES2023 equivalents <code>toSorted()</code> / <code>toReversed()</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// In-place mutation:
const letters = ["c", "a", "b"];
letters.sort();
console.log(letters); // ["a", "b", "c"]

letters.reverse();
console.log(letters); // ["c", "b", "a"]

// Non-mutating (ES2023):
const nums = [3, 1, 2];
console.log(nums.toSorted());   // [1, 2, 3] (original nums stays [3, 1, 2])
console.log(nums.toReversed()); // [2, 1, 3]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Combining and Joining ──
    { id: nextId(), type: "heading" as const, content: "🧮 Combining & Joining Arrays" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Merge arrays with <code>concat</code> or convert elements into formatted strings with <code>join</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const a = [1, 2];
const b = [3, 4];

const merged = a.concat(b);
console.log(merged); // [1, 2, 3, 4]

const joined = merged.join(" - ");
console.log(joined); // "1 - 2 - 3 - 4"`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "🧠 Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Arrays are the cornerstone of data manipulation in JavaScript. From receiving REST/GraphQL responses to state management and UI list rendering, mastering array methods like <code>map</code>, <code>filter</code>, and <code>reduce</code> will elevate your day-to-day development workflow.</p>",
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
    const collectionTitle = "Lesson 19: Arrays in JavaScript — Creation, Methods, and Iteration";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 19;

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

    console.log("🎉 Done! JS Lesson 19 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
