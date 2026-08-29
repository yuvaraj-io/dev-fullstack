/**
 * Seed Script: "Lesson 2 — Creating Your First HTML Webpage"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson2.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson2.ts
 *
 * Reuses existing "HTML" topic and "Getting Started" section.
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName =
  process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "devfullstack";

type CounterDocument = { _id: string; seq: number };

async function getNextSequence(
  client: MongoClient,
  name: string
): Promise<number> {
  const db = client.db(dbName);
  const result = await db
    .collection<CounterDocument>("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" }
    );
  if (!result) throw new Error(`Unable to increment ${name} counter`);
  return result.seq as number;
}

// ── Blog content blocks ───────────────────────────────────────────────────────

function buildBlogBlocks() {
  let blockId = 1;
  const nextId = () => blockId++;

  return [
    // ── Hero image ──
    {
      id: nextId(),
      type: "image" as const,
      image:
        "https://miro.medium.com/v2/resize:fit:700/1*--Cr2D4Y0WSIIrROMQIxRQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Introduction",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the previous lesson, we explored the fascinating story of HTML — how it was created by Tim Berners-Lee and how it became the foundation of the World Wide Web. We learned that every website you visit, whether it's YouTube, Amazon, or your favorite blog, uses HTML in some way to structure its content.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>But learning the history of HTML is only the beginning.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now it's time to take your very first step as a web developer by creating your first HTML webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Don't worry if you've never written a single line of code before. This lesson is designed for complete beginners. By the end of this article, you'll have created your own webpage, opened it in a browser, and understood what actually happens behind the scenes when a webpage is displayed.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Let's begin.</p>",
    },

    // ── What Is an HTML File? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "What Is an HTML File?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before we write any HTML code, it's important to understand one simple idea. Every webpage starts as an ordinary text file.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>At first, this might sound surprising. The websites we visit every day look colorful, interactive, and beautifully designed. However, underneath all those images, buttons, and animations is a collection of text files that browsers understand.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The difference is not the content of the file — it's the file extension.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>When you save a file with the <strong>.html</strong> extension, you\'re telling the browser,</p><p><em>"This isn\'t just a normal text file. This file contains HTML instructions."</em></p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser recognizes this extension and knows it should read the file as an HTML document instead of displaying it as plain text.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For example:</p><ul><li><code>notes.txt</code> is treated as a normal text document.</li><li><code>index.html</code> is treated as a webpage.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>That small <strong>.html</strong> extension makes a huge difference because it tells the browser how the file should be interpreted.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Beginner Tip:</strong><br>Think of the <code>.html</code> extension as a label on a package. Without the correct label, the browser doesn't know that the file contains webpage instructions.</p>",
    },

    // ── Installing Visual Studio Code ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Installing Visual Studio Code",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Before writing our first webpage, we need a place to write our HTML code.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For that we can use a code editor — simply a program designed to help developers write code more easily. While you can technically write HTML using applications like Notepad, modern code editors make the experience much smoother, especially for beginners. One of the most popular code editors in the world is <strong>Visual Studio Code</strong>, often called <strong>VS Code</strong>.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Developed by Microsoft, VS Code is free, lightweight, and used by <strong>millions of developers</strong> — from students learning HTML to professionals building large software applications.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>What makes VS Code beginner-friendly is that it provides helpful features while you type. It highlights different parts of your code using colors, making it much easier to read. It also offers intelligent suggestions through IntelliSense, helping you to complete tags and reducing typing mistakes. As you continue learning web development, you'll also discover thousands of extensions that can make coding even more productive.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>To install Visual Studio Code:</p><ol><li>Visit the official <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">Visual Studio Code</a> website.</li><li>Download the version that matches your operating system.</li><li>Run the installer.</li><li>Complete the installation by following the setup wizard.</li><li>Open Visual Studio Code.</li></ol>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Once VS Code opens, you're ready to create your first HTML file.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Although we'll use VS Code throughout this series, remember that HTML itself doesn't depend on any particular editor. You can also write HTML using Notepad, Notepad++, Sublime Text, or any text editor capable of saving files with the <code>.html</code> extension.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Note:</strong><br>The editor helps you write code, but the browser is what actually displays your webpage.</p>",
    },

    // ── Writing Your First HTML Code ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Writing Your First HTML Code",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now comes the exciting part. Let's create your very first webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Open Visual Studio Code and create a new file. Save it with the name:</p><p><em>\"index.html\"</em></p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You might wonder why developers often use the name <strong>index.html</strong>.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>By convention, web servers automatically look for a file named <code>index.html</code> whenever someone visits a website. That's why you'll see this filename used in almost every web project.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Now copy and paste the following code into your file.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Character encoding -->
    <meta charset="UTF-8">

    <!-- Makes the webpage responsive on all devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Title shown in the browser tab -->
    <title>My First Webpage</title>
</head>

<body>

    <h1>Welcome to My First HTML Page!</h1>

    <p>
        Hello! This is the first webpage I have created using HTML.
    </p>

    <p>
        I'm excited to start my web development journey.
    </p>

</body>

</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If some of this code looks confusing, don't worry. Right now, your goal isn't to understand every single line. Think of this code as your first complete webpage template.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Over the next few lessons, we'll carefully break down every tag and understand exactly what each one does. By the end of the series, every line of this document will make perfect sense.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For now, simply focus on creating the file and seeing the result.</p>",
    },

    // ── Running the HTML File ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Running the HTML File",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Writing HTML is only half the process. Now it's time to see your webpage come to life.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The easiest way is to locate your <code>index.html</code> file and simply double-click it. Your default browser will automatically open the webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If double-clicking doesn't work as expected, you can right-click the file and choose <strong>Open With</strong>, then select your preferred browser such as Google Chrome, Microsoft Edge, or Mozilla Firefox.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Another simple method is to open your browser first and drag the <code>index.html</code> file directly into the browser window. The browser will instantly display your webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>No matter which method you choose, the result is the same.</p><p>The browser reads your HTML file and displays the webpage based on the instructions written inside it.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Beginner Tip:</strong><br>Whenever you make changes to your HTML file, save it and refresh your browser to see the updated version.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Output looks like this:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `-------------------------------------------------------

Welcome to My First HTML Page!

Hello! This is the first webpage I have created using HTML.

I'm excited to start my web development journey.

-------------------------------------------------------`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Understanding What Happened ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Understanding What Happened",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You may be wondering what actually happened after opening the file. When your browser opened the HTML document, it didn't execute the file like a programming language. That is also why <strong>we never call HTML a programming language.</strong></p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead, it carefully read each HTML tag, understood its meaning, and converted those instructions into the webpage displayed on your screen.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For example, when the browser encountered the <code>&lt;h1&gt;</code> tag, it knew that this content should appear as a large heading.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When it encountered the <code>&lt;p&gt;</code> tags, it displayed those pieces of text as paragraphs.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser follows these instructions one by one until the complete webpage is built.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>This is an important concept to remember.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Programming languages such as Java, Python, or JavaScript execute instructions and perform computations.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>HTML works differently.</strong></p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML simply describes the structure of a webpage, and the browser interprets that structure to display the content correctly.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Understanding this difference will make learning web development much easier as you progress.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Remember:</strong><br>HTML doesn't tell the computer <em>how to calculate</em>. It tells the browser <em>how to organize and display information</em>.</p>",
    },

    // ── Try It Online ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try It Online</strong><br><a href="https://stackblitz.com/edit/lesson-2-creating-your-first-html-webpage?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-2-creating-your-first-html-webpage?file=index.html</a></p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If you're unable to install Visual Studio Code right now, don't worry.</p><p>You can still practice HTML directly in your web browser without installing anything.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>One of the easiest online editors for beginners is <a href="https://stackblitz.com/" target="_blank" rel="noopener noreferrer"><strong>StackBlitz</strong></a>. It provides an online coding environment where you can write HTML, save your work, and instantly see the output — all from your browser.</p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This is a great option if you're using a school computer or simply want to experiment without setting up any software.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Feel free to experiment by changing the heading, adding more paragraphs, or writing your own message. Every small change helps you become more comfortable with HTML.</p>",
    },

    // ── Conclusion ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Conclusion",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Congratulations!</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>You've just taken one of the biggest steps in your web development journey — you created your very first HTML webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this lesson, you learned that every webpage begins as a simple text file with the <code>.html</code> extension. You installed a code editor, created an <code>index.html</code> file, wrote your first HTML document, and opened it in a web browser to see it come to life.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>More importantly, you also discovered what happens behind the scenes. The browser doesn't execute HTML like a programming language. Instead, it reads the HTML document, understands each tag, and renders the webpage you see on your screen.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every professional web developer started with a webpage just like this one. The only difference is that they kept building, learning, and experimenting — and now you've begun that same journey.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the next lesson, we'll take a closer look at the structure of an HTML document. We'll explore each HTML tag one by one, understand why it's needed, and learn how every part works together to create a complete webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Stay Tuned for next lesson!</p>",
    },
  ];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔗 Connecting to: ${uri}`);
  console.log(`📦 Database:      ${dbName}\n`);

  const client = new MongoClient(uri);
  await client.connect();

  try {
    const db = client.db(dbName);

    // ── 1. Find existing "HTML" topic ──
    const topic = await db.collection("topics").findOne({ name: "HTML" });
    if (!topic) {
      throw new Error(
        'Topic "HTML" not found. Please run seed-html-lesson1.ts first.'
      );
    }
    const topicId = topic.id as number;
    console.log(`✅ Found topic "HTML" (id: ${topicId})`);

    // ── 2. Find existing "Getting Started" section for this topic ──
    const section = await db.collection("sections").findOne({
      name: "Getting Started",
      topic_id: topicId,
    });
    if (!section) {
      throw new Error(
        'Section "Getting Started" not found for HTML topic. Please run seed-html-lesson1.ts first.'
      );
    }
    const sectionId = section.id as number;
    console.log(`✅ Found section "Getting Started" (id: ${sectionId})`);

    // ── 3. Collection — "Lesson 2: Creating Your First HTML Webpage" ──
    const collectionTitle = "Lesson 2: Creating Your First HTML Webpage";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // ── 4. Section ↔ Collection mapping ──
    // Find max order_no in this section to append after existing entries
    const lastSc = await db
      .collection("section_collections")
      .find({ sectionId })
      .sort({ order_no: -1 })
      .limit(1)
      .toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 1;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: nextOrder,
    });
    console.log(
      `✅ Linked section → collection (section_collections id: ${scId}, order: ${nextOrder})`
    );

    // ── 5. Blog content ──
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();

    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
    console.log(
      `✅ Created blog with ${blocks.length} blocks (id: ${blogId})\n`
    );

    // ── Summary ──
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

    console.log("🎉 Done! Lesson 2 blog post is now in your database.");
    console.log(
      `   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`
    );
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
