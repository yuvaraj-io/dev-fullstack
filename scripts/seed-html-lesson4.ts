/**
 * Seed Script: "Lesson 04 — HTML Tags & Elements — The Language Browsers Understand"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson4.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson4.ts
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName =
  process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "devfullstack";

type CounterDocument = { _id: string; seq: number };

async function getNextSequence(client: MongoClient, name: string): Promise<number> {
  const db = client.db(dbName);
  const result = await db
    .collection<CounterDocument>("counters")
    .findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  if (!result) throw new Error(`Unable to increment ${name} counter`);
  return result.seq as number;
}

function buildBlogBlocks() {
  let blockId = 1;
  const nextId = () => blockId++;

  return [
    // ── Hero image ──
    {
      id: nextId(), type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*7ZzAUN3piToO14VcvxEqUQ.png",
      assetId: "", link: "", btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>In the previous lesson, we explored the <code>&lt;head&gt;</code> section of an HTML document and learned how browsers use information like meta tags and page titles behind the scenes. Now, it's time to move into the <code>&lt;body&gt;</code> section — the part of the webpage that visitors actually see.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>But before we start creating headings, paragraphs, images, and links, there's one important question to answer:</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p><strong>How does a browser know that one piece of text is a heading while another is a paragraph?</strong></p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>The answer lies in <strong>HTML tags</strong> and <strong>HTML elements</strong>. In this lesson, we'll understand what they are, how browsers use them, and why they're the foundation of every webpage.</p>",
    },

    // ── How Does the Browser Understand Your Content? ──
    { id: nextId(), type: "heading" as const, content: "How Does the Browser Understand Your Content?" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Imagine you create an HTML file and add the following text:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "Welcome to HTML", codeType: "text", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>When you look at it, you probably think it's a heading. But a browser doesn't see it that way.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>To a browser, it's simply a line of text. It has no way of knowing whether you want it to be a heading, a paragraph, or something else.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Now, compare it with this:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<h1>Welcome to HTML</h1>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Those extra characters, <code>&lt;h1&gt;</code> and <code>&lt;/h1&gt;</code>, completely change how the browser interprets the content. Instead of displaying plain text, the browser now understands that <strong>\"Welcome to HTML\"</strong> is the main heading of the webpage.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>These special instructions are called <strong>HTML tags</strong>. They describe the purpose of your content, allowing the browser to display it correctly.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Without HTML tags, every piece of content on a webpage would simply appear as plain text, with no structure or meaning.</p>",
    },

    // ── What Is an HTML Tag? ──
    { id: nextId(), type: "heading" as const, content: "What Is an HTML Tag?" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>The special instructions enclosed within angle brackets (<code>&lt; &gt;</code>) are called <strong>HTML tags</strong>. They tell the browser what type of content it is about to read and how that content should be interpreted.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>For example, consider the following code:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<h1>Welcome to HTML</h1>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Here, the <code>&lt;h1&gt;</code> tag tells the browser that the enclosed text is the main heading of the webpage. Instead of displaying it as ordinary text, the browser renders it as a large, bold heading.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Similarly, the <code>&lt;p&gt;</code> tag tells the browser that the enclosed content is a paragraph.</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<p>HTML is the foundation of every webpage.</p>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Because the browser understands the <code>&lt;p&gt;</code> tag, it displays the text as a paragraph instead of a heading.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Every HTML tag has a specific purpose. Some define headings, others create paragraphs, images, links, tables, or forms. As we progress through this series, we'll explore each of these tags one by one.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Most HTML tags are written in pairs. The first tag marks where the content begins, and the second tag marks where it ends.</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<p>This is a paragraph.</p>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>In this example:</p><ul><li><code>&lt;p&gt;</code> is the <strong>opening tag</strong>.</li><li><code>&lt;/p&gt;</code> is the <strong>closing tag</strong>.</li></ul>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Notice the forward slash (<code>/</code>) in the closing tag. It tells the browser that the paragraph ends at that point.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Once the browser reaches the closing tag, it knows that any content that follows belongs to a new element.</p>",
    },

    // ── What Is an HTML Element? ──
    { id: nextId(), type: "heading" as const, content: "What Is an HTML Element?" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>So far, we've learned that <strong>HTML tags</strong> give instructions to the browser. But a webpage isn't built using individual tags alone — it's built using <strong>HTML elements</strong>.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Consider the following example:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<h1>Welcome to HTML</h1>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Although it looks like a single line of code, it is made up of three parts:</p><ul><li><code>&lt;h1&gt;</code> – The opening tag</li><li><code>Welcome to HTML</code> – The content</li><li><code>&lt;/h1&gt;</code> – The closing tag</li></ul>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Together, these three parts form an <strong>HTML element</strong>.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>In other words, an HTML element includes everything from the opening tag to the closing tag, along with the content between them.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>For example:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<p>HTML is easy to learn.</p>", codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Here:</p><ul><li><code>&lt;p&gt;</code> is the opening tag.</li><li><code>HTML is easy to learn.</code> is the content.</li><li><code>&lt;/p&gt;</code> is the closing tag.</li></ul><p>The complete structure is called a <strong>paragraph element</strong>.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>This is the key difference:</p><ul><li>A <strong>tag</strong> is an instruction enclosed within angle brackets.</li><li>An <strong>element</strong> is the complete structure created using those tags and the content they enclose.</li></ul>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Understanding this distinction is important because, throughout your HTML journey, you'll spend most of your time creating and working with <strong>elements</strong>, not just individual tags.</p>",
    },

    // ── How Browsers Interpret HTML ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Interpret HTML" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Now that you understand what HTML tags and elements are, let's see how a browser uses them to build a webpage.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>When you open an HTML file, the browser doesn't display the code exactly as it's written. Instead, it reads the document from top to bottom, identifying each HTML element and determining its purpose.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>For example, consider the following HTML:</p>",
    },
    {
      id: nextId(), type: "code" as const,
      code: "<h1>Welcome to HTML</h1>\n<p>HTML is the foundation of every webpage.</p>",
      codeType: "html", link: "", btn: "",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>As the browser reads this code, it recognizes the <code>&lt;h1&gt;</code> element as the main heading and the <code>&lt;p&gt;</code> element as a paragraph. It then renders them using their default appearance — a large, bold heading followed by a paragraph of normal text.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>The browser repeats this process for every element in the document. It doesn't guess what your content means; it simply follows the instructions provided by your HTML tags. That's why choosing the correct HTML elements is important. They help the browser understand the structure of your webpage and display it as intended.</p>",
    },

    // ── Some Common HTML Tags ──
    { id: nextId(), type: "heading" as const, content: "Some Common HTML Tags" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Now that you understand what HTML tags and elements are, you might be wondering what kinds of tags you'll use to build a webpage.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>HTML provides a wide variety of tags, each designed for a specific purpose. Some create headings and paragraphs, while others add images, links, lists, tables, forms, and much more.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Here are a few common HTML tags you'll encounter throughout this series:</p><ul><li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> – Create headings</li><li><code>&lt;p&gt;</code> – Creates a paragraph</li><li><code>&lt;a&gt;</code> – Creates a hyperlink</li><li><code>&lt;img&gt;</code> – Displays an image</li><li><code>&lt;ul&gt;</code> and <code>&lt;ol&gt;</code> – Create unordered and ordered lists</li><li><code>&lt;table&gt;</code> – Creates a table</li><li><code>&lt;form&gt;</code> – Creates forms for user input</li></ul>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>Don't worry about learning these tags right now. We'll explore each of them in detail, understand when to use them, and build practical examples as we progress through this series.</p>",
    },

    // ── Try Now ──
    {
      id: nextId(), type: "content" as const,
      content: '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/html-tags-and-elements?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/html-tags-and-elements?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(), type: "content" as const,
      content: "<p>In this lesson, we learned what HTML tags and HTML elements are and how browsers use them to understand the content of a webpage. These concepts form the foundation of every HTML document you'll create.</p>",
    },
    {
      id: nextId(), type: "content" as const,
      content: "<p>In the next lesson, we'll learn about <strong>HTML comments</strong>, a simple but useful feature that helps developers organize and document their code before we start exploring individual HTML tags in detail.</p>",
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

    const topic = await db.collection("topics").findOne({ name: "HTML" });
    if (!topic) throw new Error('Topic "HTML" not found. Run seed-html-lesson1.ts first.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "HTML" (id: ${topicId})`);

    const section = await db.collection("sections").findOne({ name: "Getting Started", topic_id: topicId });
    if (!section) throw new Error('Section "Getting Started" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "Getting Started" (id: ${sectionId})`);

    const collectionTitle = "Lesson 4: HTML Tags & Elements — The Language Browsers Understand";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId, title: collectionTitle, topics_id: topicId, title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    const lastSc = await db.collection("section_collections")
      .find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 1;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId, sectionId, collectionId, topicId, order_no: nextOrder,
    });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({
      id: blogId, heading: collectionTitle, content: blocks, collections_id: collectionId,
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

    console.log("🎉 Done! Lesson 4 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
