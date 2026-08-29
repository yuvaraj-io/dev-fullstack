/**
 * Seed Script: "Lesson 5 — HTML Comments — Writing Notes Inside Your Code"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson5.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson5.ts
 */

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "devfullstack";

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
    // ── Hero image ──
    { id: nextId(), type: "image" as const, image: "https://miro.medium.com/v2/resize:fit:700/1*FcSkAlOb7wJQtLxnobT_aQ.png", assetId: "", link: "", btn: "" },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction" },
    { id: nextId(), type: "content" as const, content: "<p>Welcome back!</p>" },
    { id: nextId(), type: "content" as const, content: "<p>In the previous lesson, we explored the <strong>HTML Tags & Elements</strong>. Which is mostly on the body of the HTML, of course in head as well we have tags and elements, we were exploring in a sequential way so covered more on the body while explaining HTML Tags.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>As we continue our HTML journey, it's time to learn another feature that you won't actually see on a webpage — but one that every professional developer uses almost every day: <strong>HTML comments</strong>.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>At first, comments may seem unnecessary because they don't change how a webpage looks. So why do developers spend time writing something that visitors will never see?</p>" },
    { id: nextId(), type: "content" as const, content: '<p>Think about this for a moment. Have you ever looked at your own notes after a few weeks and wondered, <em>"What was I trying to explain here?"</em> Now imagine working on a website with hundreds of lines of HTML code. Remembering the purpose of every section becomes difficult. It becomes even more challenging when multiple developers are working on the same project.</p>' },
    { id: nextId(), type: "content" as const, content: "<p>This is exactly where HTML comments become incredibly useful. They help you explain your code, organize large files, leave reminders for yourself, and communicate with other developers — all without affecting the webpage that users see.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Let's discover how they work.</p>" },

    // ── What Are HTML Comments? ──
    { id: nextId(), type: "heading" as const, content: "What Are HTML Comments?" },
    { id: nextId(), type: "content" as const, content: "<p>An HTML comment is a piece of text written inside an HTML document that is intended for developers rather than website visitors.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>When a browser reads an HTML file, it completely ignores comments. This means anything written inside a comment will never appear on the webpage, no matter how much text it contains.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Comments are useful for explaining code, leaving reminders, marking different sections of a webpage, or temporarily hiding HTML elements while testing.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>The basic syntax for writing an HTML comment is:</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- This is a comment -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Although the browser ignores comments, they remain inside the HTML file, allowing anyone who reads the source code to understand the developer's notes.</p>" },

    // ── How Browsers Handle Comments ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Handle Comments" },
    { id: nextId(), type: "content" as const, content: "<p>One interesting thing about HTML comments is that they never become part of the visible webpage.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>When you open an HTML file, the browser starts reading the document from top to bottom.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>The process looks something like this:</p>" },
    { id: nextId(), type: "code" as const, code: "Browser reads the HTML document\n            ↓\nFinds an HTML comment\n            ↓\nRecognizes it as developer notes\n            ↓\nIgnores the comment completely\n            ↓\nContinues rendering the webpage", codeType: "text", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>This means comments do not affect the appearance, layout, or functionality of your webpage.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>They simply exist inside the HTML file to help developers understand and manage the code more effectively.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Think of comments as invisible notes that only developers can see.</p>" },

    // ── Why Do We Need HTML Comments? ──
    { id: nextId(), type: "heading" as const, content: "Why Do We Need HTML Comments?" },
    { id: nextId(), type: "content" as const, content: "<p>When you're creating your first HTML webpage, the code is usually short and easy to understand. A few headings, a couple of paragraphs, and perhaps an image — that's all it takes. At this stage, you might feel that comments aren't necessary.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>However, as websites grow, so does the amount of HTML code. Imagine opening an HTML file that contains 500 or even 1,000 lines of code. Without any explanations, finding a specific section could become frustrating.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Suppose you wanted to quickly locate the navigation bar, the footer, or the contact form. Or perhaps you wanted to leave yourself a reminder to improve a section later. Maybe you're working with teammates who need to understand your code without asking you questions every time.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Another common situation is when you're testing different ideas. Instead of deleting part of your HTML, you might want to temporarily hide it while keeping it available for later use.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>All of these situations have one simple solution: <strong>HTML comments</strong>.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Comments allow developers to write notes inside their HTML documents that are visible only in the source code. They help organize code, improve readability, and make collaboration much easier.</p>" },

    // ── Writing Your First Comment ──
    { id: nextId(), type: "heading" as const, content: "Writing Your First Comment" },
    { id: nextId(), type: "content" as const, content: "<p>Writing an HTML comment is very simple once you understand its structure.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>A comment always begins with:</p>" },
    { id: nextId(), type: "code" as const, code: "<!--", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>and ends with:</p>" },
    { id: nextId(), type: "code" as const, code: "-->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Anything written between these two symbols becomes part of the comment.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>For example:</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- This is my first HTML comment -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Let's understand what each symbol means.</p><ul><li>The <code>&lt;!--</code> sequence tells the browser that a comment is starting. Everything that follows is treated as comment text rather than HTML code, whether it's a single line or multi line.</li><li>Finally, the <code>--&gt;</code> sequence tells the browser that the comment has ended.</li></ul>" },
    { id: nextId(), type: "content" as const, content: "<p><strong>Another Example: If you are dealing with HTML Tags.</strong></p>" },
    { id: nextId(), type: "code" as const, code: `<!-- <section>-->
      <div>
        <img src="image.png" />
         <!--
            <p>Hello 
              <span>world</span>
            </p> 
          -->
      </div>
<!-- </section> -->`, codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Anything written outside these symbols will once again be treated as normal HTML. Notice that section tag comment — we have to comment at first and last of end tag. Because that's how we have to follow; we just have to comment specific parent tag.</p>" },

    // ── Some More Examples ──
    { id: nextId(), type: "heading" as const, content: "Some More Examples of HTML Comments" },
    { id: nextId(), type: "content" as const, content: "<p>One of the most common uses of comments is documenting different sections of a webpage. As an HTML file grows larger, comments make it much easier to navigate through the code.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>For example:</p>" },
    { id: nextId(), type: "code" as const, code: `<!-- Header Section -->
<header>
    ...
</header>
<!-- Main Content -->
<main>
    ...
</main>
<!-- Footer Section -->
<footer>
    ...
</footer>`, codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Instead of searching through hundreds of lines of HTML, developers can quickly identify each section by reading the comments.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Another useful situation is temporarily disabling HTML while testing.</p><p>Imagine you're experimenting with a paragraph but don't want to delete it completely.</p>" },
    { id: nextId(), type: "code" as const, code: `<!--
<p>This paragraph is temporarily disabled.</p>
-->`, codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>The browser ignores this code, but you can easily restore it later by removing the comment symbols.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Comments are also extremely helpful when multiple developers work on the same project.</p><p>For example:</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- Navigation updated by Rahul -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>or</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- Contact form starts here -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>These notes help teammates understand changes without needing lengthy explanations.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Developers also use comments as reminders for future improvements.</p><p>For example:</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- TODO: Add image gallery here -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>or</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- TODO: Replace placeholder text -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>These reminders help developers remember unfinished tasks while working on large projects.</p>" },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices for Writing HTML Comments" },
    { id: nextId(), type: "content" as const, content: "<p>Writing comments is a good habit, but writing meaningful comments is even more important.</p>" },
    { id: nextId(), type: "content" as const, content: '<p>A good comment should explain <strong>why</strong> something exists rather than simply describing what the code already makes obvious. If a heading clearly says "Contact Us," adding a comment that says "This is a heading" doesn\'t provide any useful information.</p>' },
    { id: nextId(), type: "content" as const, content: "<p>Comments should also be short, clear, and easy to understand. They should help future you — or another developer — quickly understand the purpose of a section without reading every line of HTML.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Well-written comments make projects easier to maintain, especially as websites become larger and more complex.</p>" },

    // ── Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "Common Mistakes Beginners Make" },
    { id: nextId(), type: "content" as const, content: "<p>One common mistake is storing sensitive information inside HTML comments.</p><p>For example:</p>" },
    { id: nextId(), type: "code" as const, code: "<!-- API Key: ABC123XYZ -->", codeType: "html", link: "", btn: "" },
    { id: nextId(), type: "content" as const, content: "<p>Although comments don't appear on the webpage, anyone can still view the page source and read them. This means passwords, API keys, personal information, or confidential notes should never be stored inside comments.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Another mistake is leaving huge sections of old code commented out for months. While temporarily disabling code is perfectly acceptable, permanently keeping unused code makes files harder to read and maintain.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>Good developers treat comments as helpful notes — not as a storage place for outdated or sensitive information.</p>" },

    // ── Try Now ──
    { id: nextId(), type: "content" as const, content: '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/html-comments?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/html-comments?file=index.html</a></p>' },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    { id: nextId(), type: "content" as const, content: "<p>Although HTML comments never appear on a webpage, they play a valuable role in keeping code organized, readable, and easier to maintain. In this lesson, you discovered why comments are needed, how browsers handle them, how to write them correctly, and how they help both individual developers and teams working on larger projects. You also explored practical examples, learned professional best practices, and understood common mistakes to avoid.</p>" },
    { id: nextId(), type: "content" as const, content: "<p>As you continue writing more HTML, you'll naturally find yourself using comments to organize your work and leave helpful reminders.</p>" },
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

    const collectionTitle = "Lesson 5: HTML Comments — Writing Notes Inside Your Code";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({ id: collectionId, title: collectionTitle, topics_id: topicId, title_index: null });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 1;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({ id: scId, sectionId, collectionId, topicId, order_no: nextOrder });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({ id: blogId, heading: collectionTitle, content: blocks, collections_id: collectionId });
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

    console.log("🎉 Done! Lesson 5 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
