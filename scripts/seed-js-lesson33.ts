/**
 * Seed Script: JavaScript "Lesson 33: Destructuring in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson33.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson33.ts
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
        "<p>In this lesson, we learn about <strong>Destructuring in JavaScript</strong>.</p><p>Destructuring is an ES6 feature that allows us to unpack values from arrays or properties from objects into distinct variables in a clean, declarative syntax.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*fCWR79QmpN7XwDP6iTmIvw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-33-destructuring-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-33-destructuring-in-javascript?file=script.js</a></p>',
    },

    // ── 1. What is Destructuring? ──
    { id: nextId(), type: "heading" as const, content: "1. What is Destructuring?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Destructuring lets you extract values directly instead of repeatedly writing property or index lookups:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const userInfo = { fullName: "Yuvaraj", userAge: 28 };

// Modern Destructuring in one line:
const { fullName: userFullName, userAge: userAgeValue } = userInfo;
console.log(userFullName);  // Yuvaraj
console.log(userAgeValue);  // 28`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Array Destructuring ──
    { id: nextId(), type: "heading" as const, content: "2. Array Destructuring (Position-Based)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Array destructuring extracts items according to their <strong>index position</strong>. You can unpack, skip items, or provide default values:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const colorsList = ["red", "green", "blue"];

// Unpack all positions:
const [colorPrimary, colorSecondary, colorTertiary] = colorsList;
console.log(colorPrimary, colorSecondary, colorTertiary); // red green blue

// Skipping items:
const [firstColor, , thirdColor] = colorsList;
console.log(firstColor, thirdColor); // red blue

// Default values:
const [xColor, yColor, zColor = "yellow"] = ["red", "green"];
console.log(zColor); // yellow`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Object Destructuring & Aliases ──
    { id: nextId(), type: "heading" as const, content: "3. Object Destructuring & Variable Aliasing" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Object destructuring matches keys by <strong>property name</strong>. You can rename variables using the <code>{ property: newVariableName }</code> alias syntax:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const developer = {
  devName: "Yuvaraj",
  devAge: 28,
  devCountry: "India"
};

// Aliasing property names to custom variable identifiers:
const { devName: dName, devCountry: dCountry, devCity: dCity = "Bangalore" } = developer;
console.log(dName);    // Yuvaraj
console.log(dCountry); // India
console.log(dCity);    // Bangalore (Default fallback applied)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Handling Numeric Keys & Number Arrays ──
    { id: nextId(), type: "heading" as const, content: "4. Numeric Keys in Objects & Rest Unpacking" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Object keys that are numbers are converted to strings internally; quote them and alias them to valid identifiers. Array destructuring can also be combined seamlessly with the rest operator (<code>...</code>):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Numeric keys in objects:
const numberObject = { 1: "one", 2: "two", 3: "three" };
const { "1": numOne, "2": numTwo } = numberObject;
console.log(numOne, numTwo); // one two

// Array numbers with Rest:
const numericValues = [10, 20, 30, 40];
const [firstNum, ...remainingNums] = numericValues;
console.log(firstNum);      // 10
console.log(remainingNums); // [20, 30, 40]`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Nested Destructuring ──
    { id: nextId(), type: "heading" as const, content: "5. Nested Destructuring (Objects & Matrices)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You can destructure multi-level nested objects and multi-dimensional matrices in a single pattern:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Nested Object:
const employee = {
  empName: "Yuvaraj",
  empAddress: {
    empCity: "Bangalore",
    empCountry: "India"
  }
};
const { empAddress: { empCity: eCity, empCountry: eCountry } } = employee;
console.log(eCity, eCountry); // Bangalore India

// 2D Matrix Array:
const matrix = [[1, 2], [3, 4]];
const [[aNum, bNum], [cNum, dNum]] = matrix;
console.log(aNum, dNum); // 1 4`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary ──
    { id: nextId(), type: "heading" as const, content: "✅ Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Array destructuring</strong> extracts values by position.</li><li><strong>Object destructuring</strong> extracts values by property key name.</li><li>Use <code>{ key: alias }</code> to rename properties into custom variable names.</li><li>Quote numeric object keys when destructuring: <code>{ \"1\": varName }</code>.</li><li>Combine with default values and the <code>...rest</code> operator for flexible data parsing.</li></ul>",
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
    const collectionTitle = "Lesson 33: Destructuring in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 33;

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

    console.log("🎉 Done! JS Lesson 33 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
