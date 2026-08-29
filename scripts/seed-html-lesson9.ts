/**
 * Seed Script: "Lesson 09 — HTML Lists — Organizing Information with List Elements"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson9.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson9.ts
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
    // ── Hero image ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*JOkoMVdD3FNnpsMjkNatig.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Why Do We Need Lists?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the previous lessons, you've learned how to build well-structured webpages using HTML. We encounter lists everywhere in our daily lives because they present information in a clear and organized way. A shopping list, a restaurant menu, a recipe, a to-do list, a timetable, and even a website's navigation menu are all examples of lists. Imagine writing your grocery items as one long sentence instead of listing them individually. Although the information would be the same, it would be much harder to read and quickly scan. By arranging related items into a list, information becomes easier to understand, remember, and navigate.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The same principle applies to web development. Instead of placing everything inside long paragraphs, websites use lists to organize related content such as product features, customer benefits, service offerings, course modules, FAQs, categories, navigation menus, and step-by-step instructions. Well-structured lists improve readability, make webpages look cleaner, and help visitors quickly find the information they need.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Not every list, however, serves the same purpose. Sometimes the order of items doesn't matter, such as a list of programming languages or shopping items. In other cases, the sequence is important, such as a recipe, installation guide, or assembly instructions where each step must be followed in order. There are also situations where you need to define terms and provide their descriptions, such as a glossary or dictionary. To handle these different scenarios, HTML provides multiple list elements, each designed for a specific purpose.</p>",
    },

    // ── Unordered Lists ──
    { id: nextId(), type: "heading" as const, content: "Unordered Lists (<ul>)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>An <strong>unordered list</strong> displays related items <strong>without implying any particular sequence</strong>. The browser simply presents each item with a bullet point, allowing readers to scan the information quickly. HTML represents an unordered list using the <code>&lt;ul&gt;</code> element. Inside that element, each list item is represented by the <code>&lt;li&gt;</code> (List Item) element.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<ul>
    <li>Milk</li>
    <li>Bread</li>
    <li>Eggs</li>
    <li>Butter</li>
    <li>Apples</li>
</ul>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;ul&gt;</code> element acts as a container that groups related items together, while each <code>&lt;li&gt;</code> represents an individual item in the list.</p>",
    },

    // ── How Browsers Display Unordered Lists ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Display Unordered Lists" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When the browser encounters an unordered list, it automatically adds bullet points before each item:</p><ul><li>Milk</li><li>Bread</li><li>Eggs</li><li>Butter</li><li>Apples</li></ul>",
    },

    // ── Real-World Uses of Unordered Lists ──
    { id: nextId(), type: "heading" as const, content: "Real-World Uses of Unordered Lists" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Unordered lists appear everywhere on the web:</p><ul><li><strong>Grocery & Shopping Lists:</strong> Order isn't important.</li><li><strong>Product Features:</strong> Displaying specs like RAM, processor, storage.</li><li><strong>Website Navigation Menus:</strong> Home, About, Services, Blog, Contact (styled horizontally via CSS).</li><li><strong>Skills Lists:</strong> HTML, CSS, JavaScript, React, Python.</li></ul>",
    },

    // ── Ordered Lists ──
    { id: nextId(), type: "heading" as const, content: "Ordered Lists (<ol>)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Whenever the sequence matters — like baking recipe steps or installation instructions — HTML provides an <strong>ordered list</strong>. Instead of bullet points, browsers automatically number each item using the <code>&lt;ol&gt;</code> element with child <code>&lt;li&gt;</code> elements.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<ol>
    <li>Mix the ingredients.</li>
    <li>Pour the batter into the pan.</li>
    <li>Bake for 30 minutes.</li>
    <li>Allow the cake to cool.</li>
</ol>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser automatically calculates and displays the numbers. If you add or remove an item, the numbering updates automatically.</p>",
    },

    // ── Useful Attributes of Ordered Lists ──
    { id: nextId(), type: "heading" as const, content: "Useful Attributes of Ordered Lists" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML provides attributes to customize ordered lists:</p><ul><li><code>start</code>: Specifies the starting number of the list (e.g. <code>&lt;ol start=\"5\"&gt;</code>).</li><li><code>reversed</code>: Counts backward (e.g. for countdowns or rankings).</li><li><code>type</code>: Changes the numbering style:<ul><li><code>1</code>: Numbers (default)</li><li><code>A</code>: Uppercase letters</li><li><code>a</code>: Lowercase letters</li><li><code>I</code>: Uppercase Roman numerals</li><li><code>i</code>: Lowercase Roman numerals</li></ul></li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<ol type="A" start="1">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ol>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Definition Lists ──
    { id: nextId(), type: "heading" as const, content: "Definition Lists (<dl>)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>A <strong>definition list</strong> is designed to display <strong>terms and their corresponding descriptions</strong> without bullets or numbers, ideal for dictionaries, glossaries, FAQs, and product specifications. HTML creates a definition list using three elements:</p><ul><li><code>&lt;dl&gt;</code>: Definition List (container)</li><li><code>&lt;dt&gt;</code>: Definition Term (the word or title being defined)</li><li><code>&lt;dd&gt;</code>: Definition Description (the explanation or meaning)</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<dl>
    <dt>HTML</dt>
    <dd>The standard language used to create webpages.</dd>
    <dt>CSS</dt>
    <dd>Used to style and design webpages.</dd>
    <dt>JavaScript</dt>
    <dd>Adds interactivity and dynamic behavior to webpages.</dd>
</dl>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Browsers display the term on one line and indent the description beneath it, clearly associating terms with their explanations.</p>",
    },

    // ── Nested Lists ──
    { id: nextId(), type: "heading" as const, content: "Nested Lists" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Real-world information is often organized into <strong>categories and subcategories</strong>. HTML allows placing one list <strong>inside an <code>&lt;li&gt;</code></strong> of another list to create a <strong>nested list</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<ul>
    <li>
        Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
    </li>
    <li>
        Backend
        <ul>
            <li>Python</li>
            <li>Java</li>
            <li>PHP</li>
        </ul>
    </li>
</ul>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser automatically indents the inner sub-lists, creating an intuitive visual hierarchy.</p>",
    },

    // ── Customizing List Appearance ──
    { id: nextId(), type: "heading" as const, content: "Customizing List Appearance" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Browsers apply default bullets and numbering, but styling is typically customized using CSS (<code>list-style-type</code>):</p><ul><li><strong>Unordered bullet types:</strong> <code>disc</code> (default), <code>circle</code>, <code>square</code>, <code>none</code>.</li><li><strong>Ordered numbering types:</strong> <code>decimal</code>, <code>lower-alpha</code>, <code>upper-alpha</code>, <code>lower-roman</code>, <code>upper-roman</code>.</li></ul><p>HTML defines the structure and meaning, while CSS controls presentation.</p>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Use Unordered Lists When Order Doesn't Matter:</strong> For feature lists, menus, tags, and items with equal priority.</li><li><strong>Use Ordered Lists When Sequence Is Important:</strong> For steps, rankings, recipes, and instructions.</li><li><strong>Use Definition Lists Only for Terms and Descriptions:</strong> Ideal for FAQs, glossaries, and spec pairs.</li><li><strong>Keep Nested Lists Simple:</strong> Avoid deeply nested structures that become confusing to navigate.</li><li><strong>Don't Use Lists for Page Layout:</strong> Use modern CSS (Flexbox / Grid) for layout, keeping lists for actual lists of content.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Unordered Lists (<code>&lt;ul&gt;</code>):</strong> Display items where order does not matter with bullets.</li><li><strong>Ordered Lists (<code>&lt;ol&gt;</code>):</strong> Display items in sequence with automatic numbering.</li><li><strong>Definition Lists (<code>&lt;dl&gt;</code>):</strong> Pair terms (<code>&lt;dt&gt;</code>) with descriptions (<code>&lt;dd&gt;</code>).</li><li><strong>Nested Lists:</strong> Organize categories and subcategories by nesting lists inside <code>&lt;li&gt;</code>.</li><li>Separation of structure (HTML) and presentation (CSS).</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/html-lists?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/html-lists?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Whether you're creating a shopping list, recipe, navigation menu, glossary, or product feature list, HTML provides the right list element for the job. By choosing the appropriate list type, you not only improve the appearance of your webpage but also help browsers, search engines, and assistive technologies better understand your content.</p><p>Happy coding, and see you in the next chapter!</p>",
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

    const collectionTitle = "Lesson 9: HTML Lists — Organizing Information with List Elements";
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

    console.log("🎉 Done! Lesson 9 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
