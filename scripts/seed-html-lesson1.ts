/**
 * Seed Script: "Lesson 1 — The Story of HTML: How the Web Was Born"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson1.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson1.ts
 *
 * This script is idempotent for the topic — it reuses an existing "HTML" topic
 * if one already exists. Sections, collections, and blogs are always created fresh.
 */

import { MongoClient } from "mongodb";

// ── Config ────────────────────────────────────────────────────────────────────

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName =
  process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "devfullstack";

// ── Counter helper (mirrors lib/db.ts) ────────────────────────────────────────

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

  if (!result) {
    throw new Error(`Unable to increment ${name} counter`);
  }
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
        "https://miro.medium.com/v2/resize:fit:700/1*KtZfq6hEBROQypgcGf3xVg.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Intro ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every website you've ever visited — from Google and YouTube to Amazon and Instagram — is built on one fundamental technology: HTML.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Who created HTML?<br>Why was it created?<br>And what problem was it actually solving?</p>",
    },

    // ── Before HTML ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Before HTML (Before the 1990s)",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine you're living in the <strong>1980s</strong>. Yes, computers already existed. People were using computers in universities, companies, and research labs. But there was a huge problem — i.e: Computers could exchange files, but there was no simple, universal way to share and access information across different systems.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose one university creates an amazing software or document. If another university wanted to use it. They had to:</p><ul><li>Copy the files manually</li><li>Send floppy disks or magnetic tapes</li><li>Install the software separately</li><li>Configure every computer individually</li><li>Upgrade every computer whenever changes were made</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every computer had its own file formats. Every operating system worked differently. Sharing information was slow, expensive, and frustrating. There was no single place where everyone could instantly access information. This lack of a universal information-sharing system became a major challenge for researchers around the world.</p>",
    },

    // ── Tim Berners-Lee ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Then Came One Brilliant Question.",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>At <strong>CERN</strong>, the world's largest particle physics laboratory, a British computer scientist was facing the same problem every day.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>His name was <strong>Sir Tim Berners-Lee</strong>. Thousands of researchers from different countries worked at CERN. Each team stored documents on different computers. Finding information was a nightmare. One day, Tim asked a simple but revolutionary question:</p><p><em>"What if every document could be connected through links, allowing anyone to navigate from one document to another?"</em></p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Tim Berners-Lee didn't just imagine a better way to share information — he built it. In 1989, while working at CERN, he proposed a system where documents stored on different computers could be connected through hyperlinks. Instead of manually transferring files, people could simply click a link and instantly access another document, regardless of where it was stored. This idea became the foundation of the <strong>World Wide Web (WWW)</strong>, a system that allows documents stored on different computers to be connected and accessed through web browsers.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To make this vision a reality, Tim Berners-Lee developed three core technologies that still power the web today:</p><ul><li><strong>HTML (HyperText Markup Language)</strong> — Defines the structure and content of a web page.</li><li><strong>HTTP (HyperText Transfer Protocol)</strong> — A communication protocol that allows browsers and servers to exchange web pages over the internet.</li><li><strong>URL (Uniform Resource Locator)</strong> — The unique address used to locate and access a specific resource or webpage on the web.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In <strong>1991</strong>, Tim Berners-Lee launched the world's first website. It wasn't filled with images, animations, or interactive features like today's websites. It was a simple page containing text and hyperlinks, explaining what the World Wide Web was and how people could use it. Although it looked basic, it proved that information could be shared seamlessly across the globe through a web browser.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>The world\'s first website is still online. <a href="https://info.cern.ch/" target="_blank" rel="noopener noreferrer"><em>Visit here</em></a> (https://info.cern.ch/)</p>',
    },

    // ── What is HTML? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "What is HTML?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now that the <strong>World Wide Web</strong> existed, there was still one major challenge. Computers could communicate over the internet, but they didn't have a <strong>standard way to display documents</strong>. Every computer and software application stored information differently, making it difficult to share and present content consistently.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Tim Berners-Lee needed a language that every browser could understand, regardless of the operating system or hardware. The language had to be:</p><ul><li><strong>Simple</strong> to write and understand</li><li><strong>Human-readable</strong>, so anyone could learn it</li><li><strong>Platform-independent</strong>, working on any computer</li><li><strong>Easy to transmit</strong> over the internet</li><li><strong>Flexible</strong> enough to describe different types of content</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML (HyperText Markup Language) is the standard language used to create and structure web pages. It provides the foundation for all websites by defining elements like text, images, links, and more.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Hyper Text: </strong>HyperText is text that contains hyperlinks, allowing users to jump from one document or webpage to another with a single click.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Markup: </strong>Markup means adding tags around content so that browsers understand the role of each piece of information — for example, whether it is a heading, paragraph, image, or link.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Suppose you simply write the following text:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "Welcome to my website",
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A browser only sees text. It doesn't know whether this is a heading, paragraph, title, or a button.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Using HTML, we <strong>mark</strong> the text:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<h1>Welcome to my website</h1>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now the browser understands that this text is the <strong>main heading</strong> of the page.</p>",
    },

    // ── Impact of HTML ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "The Impact of HTML: How It Changed the World",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>The below is standard format of a HTML page:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First HTML Page</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is a basic HTML page.</p>
</body>
</html>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>Explanation:</strong></p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;!DOCTYPE html&gt;</code> → Tells the browser that this document uses the HTML5 standard.</li><li><code>&lt;html&gt;</code> → Root element of the HTML page.</li><li><code>&lt;head&gt;</code> → Contains information about the webpage that is not displayed directly, such as the title, character encoding, linked CSS files, and other settings.</li><li><code>&lt;title&gt;</code> → Displays the page title in the browser tab.</li><li><code>&lt;body&gt;</code> → Contains all the visible content of the webpage.</li><li><code>&lt;h1&gt;</code> → Main heading.</li><li><code>&lt;p&gt;</code> → Paragraph.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An HTML page consists of <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code>. The head stores page information, while the body contains the content displayed to users.</p>",
    },

    // ── HTML Tags & Elements ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "HTML Tags & Elements",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every HTML element is created using HTML tags.</p><p><strong>HTML Tag: </strong>An HTML tag is a keyword enclosed in angle brackets (<code>&lt; &gt;</code>) that tells the browser how to display content.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<h1>Welcome</h1>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here, <code>&lt;h1&gt;</code> is the opening tag and <code>&lt;/h1&gt;</code> is the closing tag.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>HTML Elements: </strong>An HTML element consists of the opening tag + content + closing tag.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>This is a paragraph.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here:</p><ul><li>Opening tag → <code>&lt;p&gt;</code></li><li>Content → <code>This is a paragraph.</code></li><li>Closing tag → <code>&lt;/p&gt;</code></li></ul><p>The entire line is called an HTML element.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Apart from normal tags, HTML also has some tags called self-closing (void elements). A self-closing tag is an HTML tag that does not need a closing tag because it does not contain any content.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<br>      <!-- Line Break -->
<hr>      <!-- Horizontal Line -->
<img src="image.jpg" alt="Image">   <!-- Image -->
<input type="text">   <!-- Input Field -->
<meta charset="UTF-8">   <!-- Metadata -->
<link rel="stylesheet" href="style.css">   <!-- CSS Link -->`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Try it Online ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try it Online</strong><br><a href="https://stackblitz.com/edit/lesson-1-the-story-of-html-how-the-web-was-born?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-1-the-story-of-html-how-the-web-was-born?file=index.html</a></p>',
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
      content:
        "<p>HTML revolutionized the way information is shared on the internet by providing a simple, universal, and open standard for creating web pages. It made it possible for anyone to build websites, connect documents through hyperlinks, and share information across different computers and operating systems. Even today, HTML remains the foundation of every website, providing the structure of web pages while working alongside CSS for styling and JavaScript for interactivity. Learning HTML is the first and most important step in becoming a web developer.</p>",
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

    // ── 1. Topic — "HTML" (reuse if exists) ──
    let topic = await db.collection("topics").findOne({ name: "HTML" });
    let topicId: number;

    if (topic) {
      topicId = topic.id as number;
      console.log(`✅ Topic "HTML" already exists (id: ${topicId})`);
    } else {
      topicId = await getNextSequence(client, "topics");
      await db.collection("topics").insertOne({ id: topicId, name: "HTML" });
      console.log(`✅ Created topic "HTML" (id: ${topicId})`);
    }

    // ── 2. Section — "Getting Started" ──
    const sectionId = await getNextSequence(client, "sections");
    await db.collection("sections").insertOne({
      id: sectionId,
      name: "Getting Started",
      order_no: 1,
      topic_id: topicId,
    });
    console.log(
      `✅ Created section "Getting Started" (id: ${sectionId})`
    );

    // ── 3. Collection — "Lesson 1: The Story of HTML" ──
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: "Lesson 1: The Story of HTML: How the Web Was Born",
      topics_id: topicId,
      title_index: null,
    });
    console.log(
      `✅ Created collection "Lesson 1: The Story of HTML: How the Web Was Born" (id: ${collectionId})`
    );

    // ── 4. Section ↔ Collection mapping ──
    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: 1,
    });
    console.log(
      `✅ Linked section → collection (section_collections id: ${scId})`
    );

    // ── 5. Blog content ──
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();

    await db.collection("blogs").insertOne({
      id: blogId,
      heading: "Lesson 1: The Story of HTML: How the Web Was Born",
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
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! The blog post is now in your database.");
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
