/**
 * Seed Script: "Lesson 03 — Exploring the Structure of an HTML Document and meta tags"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson3.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson3.ts
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

function buildBlogBlocks() {
  let blockId = 1;
  const nextId = () => blockId++;

  return [
    // ── Hero image ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*nF5mVW_kp1Wt_fXRM6cnMQ.png",
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
        "<p>In the previous lesson, we created our very first HTML webpage using a basic HTML template. Although the page worked perfectly, there were several lines of code that we simply copied without understanding what they actually did.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If you've watched other HTML tutorials, you've probably noticed that many of them ask you to copy the following code and move on:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>But have you ever wondered:</p><ul><li>What are these <code>&lt;meta&gt;</code> tags?</li><li>Why are they placed inside the <code>&lt;head&gt;</code> section?</li><li>If they aren't visible on the webpage, why do almost all websites include them?</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of skipping these questions, this series takes a different approach. Our goal is to explore HTML one piece at a time and understand <strong>why every line exists before moving forward</strong>. In our head section of the HTML, Meta tags are really important. We'll begin with the meta tag.</p>",
    },

    // ── What Are Meta Tags? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "What Are Meta Tags?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Meta tags are special HTML elements that provide information (metadata) about a webpage. Unlike headings, paragraphs, or images, meta tags are <strong>not displayed on the webpage</strong>. Instead, they provide information to browsers, search engines, and other applications about how the webpage should be handled.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Think of a webpage like a book. The content inside the book is what readers see, but details such as the title, author, language, and summary help libraries organize and understand the book. Meta tags serve a similar purpose — they describe the webpage behind the scenes.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Meta tags are always placed inside the <code>&lt;head&gt;</code> section of an HTML document.</p>",
    },
    {
      id: nextId(),
      type: "subheading" as const,
      content: "Syntax",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<meta name="name" content="value">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Why are Meta Tags Important? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Why are Meta Tags Important?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Provide information about the webpage.</li><li>Help browsers display the page correctly.</li><li>Improve Search Engine Optimization (SEO).</li><li>Make websites responsive on different devices.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now let's see some commonly used meta tags in HTML.</p>",
    },

    // ── Character Encoding ──
    {
      id: nextId(),
      type: "heading" as const,
      content: 'Character Encoding (<meta charset="UTF-8">)',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This meta tag tells the browser how to read and display the text on your webpage. UTF-8 is the most commonly used character encoding because it supports almost all languages, symbols, and emojis.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>🔹 <strong>Example:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<meta charset="UTF-8">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>📌 <strong>Why use it?</strong></p><ul><li>Displays text correctly in different languages (English, Hindi, Arabic, etc.).</li><li>Supports special characters like <strong>é, ñ, ü, ₹, ©, 😊</strong>.</li><li>Prevents strange or unreadable symbols from appearing on your webpage.</li><li>Recommended for all HTML5 websites.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Example:</strong></p><p>Imagine you receive a message written in <strong>Japanese</strong>, but your phone doesn't support Japanese characters. Instead of showing the actual text, it displays random symbols like <strong>� � �</strong>.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Similarly, if you don\'t use <code>&lt;meta charset="UTF-8"&gt;</code>, the browser may not understand certain characters and display them incorrectly.</p>',
    },

    // ── Viewport Meta Tag ──
    {
      id: nextId(),
      type: "heading" as const,
      content: 'Viewport Meta Tag (<meta name="viewport">)',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This meta tag tells the browser how to display your webpage on different screen sizes, such as mobile phones, tablets, and desktops. It helps make your website responsive.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>🔹 <strong>Example:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Here,</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><code><em>name="viewport"</em></code> — This tells the browser that the meta tag is related to the webpage\'s viewport.</p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><em>content="…"</em> — The <code>content</code> attribute contains the settings for the viewport.</p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>width=device-width</em> — This tells the browser to make the width of the webpage equal to the width of the user's device.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><em>initial-scale=1.0</em> — This tells the browser to display the webpage at its normal size (100%) when it first loads.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>📌 <strong>Why use it?</strong></p><ul><li>Makes your webpage responsive on all devices.</li><li>Adjusts the page width to match the device's screen.</li><li>Prevents users from seeing a zoomed-out version of your website.</li><li>Provides a better user experience on mobile devices.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Example:</strong></p><p>Imagine you print a poster on an A4 sheet without resizing it. Some content gets cut off. But if you resize it to fit the paper, everything becomes visible.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Similarly, the viewport meta tag resizes your webpage to fit the screen of the device, whether it's a phone, tablet, or computer.</p>",
    },

    // ── Keywords ──
    {
      id: nextId(),
      type: "heading" as const,
      content: 'Keywords (<meta name="keywords">)',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This meta tag is used to <strong>list the main keywords related to your webpage</strong>. In the past, search engines used these keywords to understand the page's content.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>🔹 <strong>Example:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<meta name="keywords" content="HTML, CSS, JavaScript, Web Development">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>📌 <strong>Why use it?</strong></p><ul><li>Describes the main topics of your webpage.</li><li>Was previously used by search engines for indexing.</li><li>Today, <strong>most major search engines (like Google)</strong> ignore this tag because it was often misused by adding unrelated keywords.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Example:</strong></p><p>Imagine you write a book and add a list of topics on the cover, such as "Programming, HTML, CSS, JavaScript." This helps people know what the book is about.</p>',
    },

    // ── Bridging paragraph ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Although meta tags are not visible on the webpage, they are an essential part of web development. As a developer, you'll often add them to help browsers render pages correctly, improve search engine visibility, and provide useful information to other systems that interact with your website. Teams working on SEO, marketing, analytics, accessibility, and social media sharing may also rely on information provided through the <code>&lt;head&gt;</code> section. These tags work behind the scenes, making your website more discoverable, responsive, and easier to integrate with other tools and platforms.<br>Let's take a look at the remaining tags.</p>",
    },

    // ── Title Tag ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Title Tag (<title>)",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;title&gt;</code> tag specifies the title of your webpage. It is placed inside the <code>&lt;head&gt;</code> section and appears in the browser tab. Search engines also use the title tag as the clickable headline in search results, making it one of the most important elements for both users and SEO.</p>",
    },
    {
      id: nextId(),
      type: "subheading" as const,
      content: "Example",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<title>Learn HTML - Beginner's Guide</title>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>📌 <strong>Why use it?</strong></p><ul><li>Displays the page title in the browser tab.</li><li>Helps users identify your webpage when multiple tabs are open.</li><li>Provides a meaningful title in search engine results.</li><li>Improves search engine optimization (SEO) when written clearly.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Example:</strong></p><p>Imagine you're reading a book. The first thing you notice is its title, which tells you what the book is about. Similarly, the <code>&lt;title&gt;</code> tag tells users and search engines what your webpage contains before they even open it.</p>",
    },

    // ── Favicon ──
    {
      id: nextId(),
      type: "heading" as const,
      content: 'Favicon (<link rel="icon">)',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A favicon is the small icon or logo that appears in the browser tab next to the webpage title. Although it isn't a meta tag, it is placed inside the <code>&lt;head&gt;</code> section and helps users quickly recognize your website.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>Example</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<link rel="icon" href="favicon.ico" type="image/x-icon">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>📌 <strong>Why use it?</strong></p><ul><li>Displays your website's logo in the browser tab.</li><li>Makes your website look more professional.</li><li>Helps users quickly identify your website among multiple open tabs.</li><li>Strengthens your website's branding.</li></ul>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Example:</strong></p><p>When you open websites like YouTube, Google, or Instagram, you'll notice a small icon beside the page title in the browser tab. That icon is called a <strong>favicon</strong>. It makes websites easier to recognize and gives them a professional appearance. Similarly, you can add your own logo as a favicon to represent your website.</p>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/html-meta-tags?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/html-meta-tags?file=index.html</a></p>',
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
        "<p>We explored the most commonly used meta tags and other essential elements inside the <code>&lt;head&gt;</code> section, including the <code>&lt;title&gt;</code> tag and favicon. Although these elements are not displayed directly on the webpage, they play a crucial role behind the scenes by helping browsers render pages correctly, improving search engine visibility, supporting responsive design, and enhancing your website's identity. You may have noticed that we didn't discuss the <code>&lt;link rel=\"stylesheet\"&gt;</code> tag yet. That's intentional — since it is used to connect CSS files, we'll explore it in detail when we begin learning CSS. By understanding the purpose of each element instead of simply copying them, you're building a strong foundation in HTML.</p>",
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

    // ── 1. Find existing "HTML" topic ──
    const topic = await db.collection("topics").findOne({ name: "HTML" });
    if (!topic) throw new Error('Topic "HTML" not found. Run seed-html-lesson1.ts first.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "HTML" (id: ${topicId})`);

    // ── 2. Find existing "Getting Started" section ──
    const section = await db.collection("sections").findOne({
      name: "Getting Started",
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Getting Started" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "Getting Started" (id: ${sectionId})`);

    // ── 3. Collection ──
    const collectionTitle = "Lesson 3: Exploring the Structure of an HTML Document and Meta Tags";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // ── 4. Section ↔ Collection mapping ──
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
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    // ── 5. Blog content ──
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();

    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
    console.log(`✅ Created blog with ${blocks.length} blocks (id: ${blogId})\n`);

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

    console.log("🎉 Done! Lesson 3 blog post is now in your database.");
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
