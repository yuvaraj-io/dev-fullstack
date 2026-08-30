/**
 * Seed Script: JavaScript "Lesson 60: Callback Hell — The Pain Before Promises & Fetch API"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson60.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson60.ts
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
        "<p>Before <code>Promise</code> and <code>async/await</code> revolutionized JavaScript in ES6 / ES2017, handling sequential asynchronous operations required chaining nested callback functions within callback functions.</p><p>This architectural nightmare became known across the software industry as <strong>Callback Hell</strong> or the <strong>Pyramid of Doom</strong>. In this lesson, we explore why this pattern emerged, how developers attempted to manage it, and how modern Promise chaining solves it cleanly.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*s7ra9lkJdKEWT4OdPU2DBg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-60-callback-hell-the-pain-before-promises?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-60-callback-hell-the-pain-before-promises?file=index.html,script.js</a></p>',
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
  <title>Callback Hell - XHR Example</title>
</head>
<body>
  <h1>Callback Hell - The Old Way of Talking to APIs</h1>
  <button id="loadData">Load Data</button>
  <pre id="output"></pre>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. The Pyramid of Doom ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Pyramid of Doom: 3 Sequential XHR Requests 😵‍💫" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose an app needs to: (1) fetch a random dog, (2) fetch the list of all breeds, and (3) fetch a specific image for the first breed. With raw XHR callbacks, each step is nested directly inside the prior handler:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const btn = document.getElementById("loadData");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const xhr1 = new XMLHttpRequest();
  xhr1.open("GET", "https://dog.ceo/api/breeds/image/random");
  xhr1.onload = function () {
    if (xhr1.status === 200) {
      const randomDog = JSON.parse(xhr1.responseText);
      output.textContent = \`Step 1: Got random dog 🐶\\n\${randomDog.message}\\n\\n\`;

      // ⚠️ Second nested request
      const xhr2 = new XMLHttpRequest();
      xhr2.open("GET", "https://dog.ceo/api/breeds/list/all");
      xhr2.onload = function () {
        if (xhr2.status === 200) {
          const breeds = JSON.parse(xhr2.responseText);
          const breedNames = Object.keys(breeds.message);
          output.textContent += \`Step 2: Got breeds 🐾\\n\${breedNames.slice(0, 5).join(", ")}\\n\\n\`;

          // ⚠️ Third nested request (Deep Pyramid of Doom!)
          const chosenBreed = breedNames[0];
          const xhr3 = new XMLHttpRequest();
          xhr3.open("GET", \`https://dog.ceo/api/breed/\${chosenBreed}/images/random\`);
          xhr3.onload = function () {
            if (xhr3.status === 200) {
              const breedImage = JSON.parse(xhr3.responseText);
              output.textContent += \`Step 3: Got \${chosenBreed} image 🐕\\n\${breedImage.message}\`;
            }
          };
          xhr3.send();
        }
      };
      xhr2.send();
    }
  };
  xhr1.send();
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Problems with Callback Hell ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Major Pitfalls of Callback Hell" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Poor Readability:</strong> Horizontal indentation growth (code drifts rightwards) makes tracking program flow difficult.</li><li><strong>Inversion of Control &amp; Complex Error Handling:</strong> Every nested layer requires duplicated <code>if (err)</code> checks with no centralized error boundary.</li><li><strong>Fragile Maintenance:</strong> Reordering or adding intermediate steps requires rewriting entire nested structures.</li></ul>",
    },

    // ── 4. Refactoring with Helper Function ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Interim Mitigation: Node-style Error-First Callbacks" },
    {
      id: nextId(),
      type: "code" as const,
      code: `function fetchData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(\`HTTP \${xhr.status}: Failed to fetch \${url}\`));
    }
  };
  xhr.onerror = () => callback(new Error("Network error occurred"));
  xhr.send();
}

// Reusable callback chaining:
fetchData("https://dog.ceo/api/breeds/image/random", (err, dog) => {
  if (err) return console.error(err);
  fetchData("https://dog.ceo/api/breeds/list/all", (err, breeds) => {
    if (err) return console.error(err);
    const chosenBreed = Object.keys(breeds.message)[0];
    fetchData(\`https://dog.ceo/api/breed/\${chosenBreed}/images/random\`, (err, breedImg) => {
      if (err) return console.error(err);
      console.log("Success:", breedImg.message);
    });
  });
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. The Modern Solution: Promise Chaining ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Modern Solution: Linear Promise Chaining with fetch()" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Promises flatten the pyramid into a readable top-to-bottom pipeline with a <strong>single unified <code>.catch()</code> error handler</strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✅ Flat, readable, maintainable Promise chain:
fetch("https://dog.ceo/api/breeds/image/random")
  .then(res => res.json())
  .then(randomDog => {
    console.log("Random Dog:", randomDog.message);
    return fetch("https://dog.ceo/api/breeds/list/all");
  })
  .then(res => res.json())
  .then(breeds => {
    const chosenBreed = Object.keys(breeds.message)[0];
    return fetch(\`https://dog.ceo/api/breed/\${chosenBreed}/images/random\`);
  })
  .then(res => res.json())
  .then(breedImage => console.log("Breed Dog:", breedImage.message))
  .catch(err => console.error("Global Request Error:", err));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Nested Callbacks vs. Promise Chaining" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Feature</th><th style=\"padding:8px;\">Nested Callbacks (Callback Hell)</th><th style=\"padding:8px;\">Promise Chaining (fetch)</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Code Shape</td><td style=\"padding:8px;\">Pyramid of doom (deep horizontal nesting)</td><td style=\"padding:8px;\">Linear vertical pipeline (<code>.then()</code>)</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Error Handling</td><td style=\"padding:8px;\">Manual checks at every callback level</td><td style=\"padding:8px;\">Single centralized <code>.catch()</code> block</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Maintainability</td><td style=\"padding:8px;\">Extremely difficult to modify or refactor</td><td style=\"padding:8px;\">Easy to reorder, add, or compose steps</td></tr><tr><td style=\"padding:8px;\">Modern Standard</td><td style=\"padding:8px;\">Legacy / Deprecated for async workflows</td><td style=\"padding:8px;\">Standard ES6+ / <code>async/await</code> foundation</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 60: Callback Hell — The Pain Before Promises & Fetch API";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 60;

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

    console.log("🎉 Done! JS Lesson 60 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
