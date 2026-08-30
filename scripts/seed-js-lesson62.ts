/**
 * Seed Script: JavaScript "Lesson 62: Fixing Callback Hell Using Promises — A Step Towards Fetch API ✨"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson62.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson62.ts
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
        "<p>In Lesson 60, we witnessed how chaining multiple dependent asynchronous requests using raw callbacks creates an unmanageable <strong>Pyramid of Doom</strong> (Callback Hell).</p><p>In this lesson, we refactor that legacy pattern into a clean, modern Promise-based HTTP helper. We learn how wrapping <code>XMLHttpRequest</code> inside a <code>new Promise()</code> allows linear <strong>Promise Chaining (<code>.then()</code>)</strong> with unified error catching (<code>.catch()</code>) — paving the way towards the modern Fetch API.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*jLL2PVk6axLhz9qeuFg-3w.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-62-fixing-callback-hell-using-promises?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-62-fixing-callback-hell-using-promises?file=index.html,script.js</a></p>',
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
  <title>Callback Hell Fixed with Promises</title>
</head>
<body>
  <h1>✨ Fixing Callback Hell Using Promises</h1>
  <button id="loadData">Load Users</button>
  <pre id="output"></pre>
  <script src="script.js"></script>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── 2. The Problem Recap ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ The Problem: Deeply Nested Callbacks" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ❌ The Callback Hell Antipattern (Horizontal Drift):
makeHttpRequest("https://dummyjson.com/users", function(users) {
  makeHttpRequest(\`https://dummyjson.com/posts/user/\${users[0].id}\`, function(posts) {
    makeHttpRequest(\`https://dummyjson.com/comments/post/\${posts[0].id}\`, function(comments) {
      console.log("User →", users[0]);
      console.log("Post →", posts[0]);
      console.log("Comments →", comments);
    });
  });
});`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Wrapping XHR in a Promise ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Creating a Reusable Promise-Based HTTP Wrapper" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>We encapsulate the low-level <code>XMLHttpRequest</code> lifecycle within a returned <code>new Promise()</code>. Successful status codes (200–299) call <code>resolve(data)</code>, while HTTP errors or network failures call <code>reject(error)</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `function makeHttpRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(\`Request failed with status \${xhr.status}\`));
      }
    };
    xhr.onerror = () => reject(new Error("Network Error ❌"));
    xhr.send();
  });
}`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Linear Promise Chaining ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Clean Linear Promise Chaining with .then()" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✅ Flat, vertical, chainable pipeline:
makeHttpRequest("GET", "https://dummyjson.com/users")
  .then(usersData => {
    console.log("1. Users Data:", usersData);
    const userId = usersData.users[0].id;
    return makeHttpRequest("GET", \`https://dummyjson.com/posts/user/\${userId}\`);
  })
  .then(postsData => {
    console.log("2. Posts Data:", postsData);
    const postId = postsData.posts[0].id;
    return makeHttpRequest("GET", \`https://dummyjson.com/comments/post/\${postId}\`);
  })
  .then(commentsData => {
    console.log("3. Comments Data:", commentsData);
  })
  .catch(error => {
    // 🛡️ Single centralized error boundary for all steps
    console.error("Pipeline Error:", error.message);
  });`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Concise Arrow Syntax ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Concise Refactor with Implicit Arrow Returns" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// ✨ Maximum brevity with implicit arrow function returns:
makeHttpRequest("GET", "https://dummyjson.com/users")
  .then(users => makeHttpRequest("GET", \`https://dummyjson.com/posts/user/\${users.users[0].id}\`))
  .then(posts => makeHttpRequest("GET", \`https://dummyjson.com/comments/post/\${posts.posts[0].id}\`))
  .then(comments => console.log("Final Comments:", comments))
  .catch(err => console.error("Error:", err.message));`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Key Benefits of Promise Refactoring" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Advantage</th><th style=\"padding:8px;\">Explanation</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Vertical Growth</td><td style=\"padding:8px;\">Code stays flat and reads naturally from top to bottom instead of indenting deeply to the right.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Unified Error Handling</td><td style=\"padding:8px;\">A single <code>.catch()</code> at the end of the chain catches errors from any previous request.</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Composable Async Steps</td><td style=\"padding:8px;\">Returning a promise from <code>.then()</code> cleanly passes its resolved value to the next <code>.then()</code>.</td></tr><tr><td style=\"padding:8px;\">Future Proof</td><td style=\"padding:8px;\">Identical structural paradigm to the modern browser <code>fetch()</code> API and <code>async/await</code>.</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 62: Fixing Callback Hell Using Promises — A Step Towards Fetch API ✨";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 62;

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

    console.log("🎉 Done! JS Lesson 62 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
