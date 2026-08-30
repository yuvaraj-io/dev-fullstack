/**
 * Seed / Update Script: JavaScript "Lesson 1: Setting Up your Javascript"
 *
 * Updates or creates collection & blog post for Topic: "javascript" (id: 1), Section: "Introduction" (id: 1)
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson1.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson1.ts
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
    // ── Welcome & Intro ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>👋 <strong>Hey pals!</strong></p><p>Welcome to the very first post in my JavaScript blog series! 🌟 If you're someone who's curious about coding or just getting started with JavaScript, you're in the right place.</p><p>In this series, I'll be sharing short, soft, sweet, and straight-to-the-point blogs that help you understand JavaScript without overwhelming you. No heavy jargon, no confusing concepts — just clean and clear learning, step by step. 🎯</p><p>In today's post, we're starting from the very beginning: <strong>How and where JavaScript runs — client-side vs server-side.</strong></p>",
    },

    // ── What is JavaScript? ──
    { id: nextId(), type: "heading" as const, content: "🧠 What is JavaScript?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript is a high-level, dynamic scripting language used to build interactive web applications. It can run in two main places:</p><ul><li>💻 <strong>Client-side</strong> — inside the user's browser</li><li>🖥️ <strong>Server-side</strong> — on the backend server (with environments like Node.js)</li></ul>",
    },

    // ── Client-Side JavaScript ──
    { id: nextId(), type: "heading" as const, content: "🌐 Client-Side JavaScript" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Client-side JavaScript runs <strong>directly in the browser</strong>. It's the reason you can click buttons, fill forms, and see dynamic changes on web pages without refreshing.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>🔹 Where it runs:</strong></p><ul><li>Chrome, Firefox, Safari, Edge — basically any modern web browser.</li></ul><p><strong>🔹 What it can do:</strong></p><ul><li>Manipulate the DOM (change HTML and CSS dynamically)</li><li>Handle user input (form validations, click/keyboard events)</li><li>Fetch data from APIs asynchronously</li><li>Create animations and rich UI interactions</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>🔹 How to try it:</strong></p><ol><li>Open your browser</li><li>Right-click anywhere &gt; <strong>Inspect</strong> &gt; Switch to the <strong>Console</strong> tab</li><li>Type the following code and hit Enter:</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Hello from the browser!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>✅ <strong>You just ran client-side JavaScript!</strong></p>",
    },

    // ── Server-Side JavaScript ──
    { id: nextId(), type: "heading" as const, content: "🖥️ Server-Side JavaScript (Runs Outside the Browser)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To run JavaScript outside the browser, you need <strong>Node.js</strong> — a JavaScript runtime that lets you use JS to write backend services, build APIs, manage database connections, and interact with the file system.</p>",
    },

    // Step 1: VS Code
    { id: nextId(), type: "heading" as const, content: "⚙️ Step 1: Install Visual Studio Code (VS Code)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>Visit: <a href=\"https://code.visualstudio.com\" target=\"_blank\" rel=\"noopener noreferrer\">https://code.visualstudio.com</a></li><li>Download and install the version for your operating system.</li><li>Open VS Code — it will be your primary coding environment! 🎨</li></ol>",
    },

    // Step 2: Node.js
    { id: nextId(), type: "heading" as const, content: "⚙️ Step 2: Install Node.js" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>Visit: <a href=\"https://nodejs.org\" target=\"_blank\" rel=\"noopener noreferrer\">https://nodejs.org</a></li><li>Download the <strong>LTS version</strong> (Recommended for most users).</li><li>Install it with default settings.</li></ol><p>To verify installation, open your terminal and check version numbers:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `node -v
npm -v`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // Step 3: Create server-side file
    { id: nextId(), type: "heading" as const, content: "⚙️ Step 3: Create & Run Your First Server-Side JavaScript File" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>Open VS Code</li><li>Create a new folder (e.g., <code>js-server-demo</code>)</li><li>Inside it, create a file called <code>app.js</code></li><li>Add the following code:</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log("Hello from the server!");`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // Step 4: Run in Terminal
    { id: nextId(), type: "heading" as const, content: "⚙️ Step 4: Run It in the Terminal" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li>Open the terminal in VS Code (Menu → <strong>Terminal</strong> → <strong>New Terminal</strong> or <code>Ctrl + `</code> / <code>Cmd + `</code>).</li><li>Run the script using Node:</li></ol>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `node app.js`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Hello from the server!`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>💥 <strong>Boom! You just ran your first server-side JavaScript program.</strong></p>",
    },

    // ── Final Words ──
    { id: nextId(), type: "heading" as const, content: "✍️ Final Words" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>That's it for <strong>JavaScript Setup</strong> — both client-side and server-side. You now know where JavaScript runs and how to execute it yourself. Whether in the browser console or with Node.js on the command line, you're officially ready to start your JavaScript journey! 🔥</p><p>Stay curious, stay consistent — and see you in the next lesson! 🚀</p>",
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

    // 1. Locate topic: name "javascript" (or regex /javascript/i)
    let topic = await db.collection("topics").findOne({ name: /^javascript$/i });
    if (!topic) {
      const topicId = await getNextSequence(client, "topics");
      await db.collection("topics").insertOne({ id: topicId, name: "JavaScript" });
      topic = { id: topicId, name: "JavaScript" };
      console.log(`✅ Created topic "JavaScript" (id: ${topicId})`);
    } else {
      console.log(`✅ Found topic "${topic.name}" (id: ${topic.id})`);
    }
    const topicId = topic.id as number;

    // 2. Locate or create section: "Introduction" under topic_id
    let section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) {
      const sectionId = await getNextSequence(client, "sections");
      await db.collection("sections").insertOne({
        id: sectionId,
        name: "Introduction",
        order_no: 1,
        topic_id: topicId,
      });
      section = { id: sectionId, name: "Introduction", order_no: 1, topic_id: topicId };
      console.log(`✅ Created section "Introduction" (id: ${sectionId})`);
    } else {
      console.log(`✅ Found section "${section.name}" (id: ${section.id})`);
    }
    const sectionId = section.id as number;

    // 3. Check existing collection for Lesson 1 or create
    const collectionTitle = "Lesson 1: Setting Up your Javascript";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      title: { $regex: /Lesson (0?1|1):/i },
    });

    let collectionId: number;
    if (collection) {
      collectionId = collection.id as number;
      await db.collection("collections").updateOne(
        { id: collectionId },
        { $set: { title: collectionTitle } }
      );
      console.log(`✅ Updated existing collection "${collectionTitle}" (id: ${collectionId})`);
    } else {
      collectionId = await getNextSequence(client, "collections");
      await db.collection("collections").insertOne({
        id: collectionId,
        title: collectionTitle,
        topics_id: topicId,
        title_index: null,
      });
      console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);
    }

    // 4. Check section_collections link
    let sc = await db.collection("section_collections").findOne({
      sectionId,
      collectionId,
    });
    if (!sc) {
      const scId = await getNextSequence(client, "section_collections");
      await db.collection("section_collections").insertOne({
        id: scId,
        sectionId,
        collectionId,
        topicId,
        order_no: 1,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 1)`);
    } else {
      console.log(`✅ Section-collection link exists (id: ${sc.id}, order: ${sc.order_no})`);
    }

    // 5. Update or insert Blog content (without previous/next blog links)
    const blocks = buildBlogBlocks();
    let blog = await db.collection("blogs").findOne({ collections_id: collectionId });
    if (blog) {
      await db.collection("blogs").updateOne(
        { id: blog.id },
        {
          $set: {
            heading: collectionTitle,
            content: blocks,
          },
        }
      );
      console.log(`✅ Updated existing blog (id: ${blog.id}) with ${blocks.length} blocks`);
    } else {
      const blogId = await getNextSequence(client, "blogs");
      await db.collection("blogs").insertOne({
        id: blogId,
        heading: collectionTitle,
        content: blocks,
        collections_id: collectionId,
      });
      console.log(`✅ Created blog with ${blocks.length} blocks (id: ${blogId})`);
    }

    console.log("\n┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! JS Lesson 1 is now formatted and clean in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
