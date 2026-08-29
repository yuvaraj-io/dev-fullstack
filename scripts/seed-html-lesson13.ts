/**
 * Seed Script: "Lesson 13 — HTML Labels — A Love Story Between for and id ❤️"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson13.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson13.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*KCTY7FWTP4eA6PM1Py7tQw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "A Love Story Between for and id ❤️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every love story begins with two souls trying to find each other. HTML has its own love story.</p><p>Meet <code><strong>for</strong></code>.<br>Meet <code><strong>id</strong></code>.</p><p>They're created separately on different elements, yet meant to be together. The <code>for</code> attribute searches for the matching <code>id</code>. And when they finally connect:</p><p>❤️ <strong>Relationship Established.</strong> ❤️</p><p>Suddenly, the browser knows that the label and the input belong together. Clicking the label focuses a text box, checks a checkbox, or activates a radio button. No JavaScript, no CSS — pure semantic HTML love.</p>",
    },

    // ── Why Inputs Need Labels ──
    { id: nextId(), type: "heading" as const, content: "Why Do Inputs Need Labels?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine a registration form with empty boxes: <code>[________] [________] [________]</code>. Which is for your name? Which is your email? Which is your password?</p><p>Without labels, users are left guessing. A <code>&lt;label&gt;</code> element acts like a permanent name tag for an input field, clearly telling users and assistive technologies what data belongs in each field.</p>",
    },

    // ── When for Meets id ──
    { id: nextId(), type: "heading" as const, content: "Explicit Association: When for Meets id" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="username">Username</label>
<input type="text" id="username" name="username">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>How it works behind the scenes:</p><ul><li><code>&lt;label for=\"username\"&gt;</code> specifies the target ID.</li><li><code>&lt;input id=\"username\"&gt;</code> identifies the control.</li><li>Because the values match exactly, clicking the visible label text automatically focuses the input!</li></ul>",
    },

    // ── Implicit Association ──
    { id: nextId(), type: "heading" as const, content: "Implicit Association: Love at First Nest ❤️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If an <code>&lt;input&gt;</code> is nested directly inside the <code>&lt;label&gt;</code> element, they are tied together automatically without requiring matching <code>for</code> and <code>id</code> attributes:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label>
    Username
    <input type="text" name="username">
</label>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>While implicit nesting works, explicit association with matching <code>for</code> and <code>id</code> is preferred by most developers for flexibility and clean styling.</p>",
    },

    // ── Different Relationships ──
    { id: nextId(), type: "heading" as const, content: "Connecting Labels with Different Input Types" },

    // Text & Password
    { id: nextId(), type: "heading" as const, content: "1. Text & Password Fields" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="name">Full Name</label>
<input type="text" id="name" name="name">

<label for="password">Password</label>
<input type="password" id="password" name="password">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // Radio Buttons
    { id: nextId(), type: "heading" as const, content: "2. Radio Buttons" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input type="radio" id="male" name="gender" value="male">
<label for="male">Male</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">Female</label>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Each radio button has a unique <code>id</code> matching its own label's <code>for</code> attribute, while sharing a common <code>name</code> attribute so only one can be selected at a time.</p>",
    },

    // Checkboxes
    { id: nextId(), type: "heading" as const, content: "3. Checkboxes" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input type="checkbox" id="terms" name="terms">
<label for="terms">I agree to the Terms and Conditions</label>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Connecting a label to a checkbox expands the clickable touch target area to include the whole sentence — especially convenient on mobile touchscreens!</p>",
    },

    // ── When Love Isn't Needed ──
    { id: nextId(), type: "heading" as const, content: "When Labels Aren't Needed 💔" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Submit & action buttons (<code>type=\"submit\"</code>, <code>&lt;button&gt;</code>):</strong> The button text itself already explains its purpose.</li><li><strong>Hidden inputs (<code>type=\"hidden\"</code>):</strong> Not rendered visually on the screen.</li></ul>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices ❤️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Always connect <code>for</code> with matching <code>id</code>:</strong> Establishes programmatic relationships for browsers and screen readers.</li><li><strong>Ensure all <code>id</code> values are strictly unique:</strong> Duplicate IDs break accessibility and form behavior.</li><li><strong>Write clear, descriptive label text:</strong> Use meaningful titles like \"Email Address\" instead of generic numbers or single letters.</li><li><strong>Never replace labels with placeholders:</strong> Placeholders vanish during data entry, while labels stay visible.</li><li><strong>Always label radio buttons and checkboxes:</strong> Significantly increases touch and click accuracy.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>The <code>for</code> attribute on <code>&lt;label&gt;</code> matches the <code>id</code> on <code>&lt;input&gt;</code>.</li><li>Clicking a label activates, focuses, or toggles the linked input control.</li><li>Significantly enhances web accessibility (WCAG compliant) and user experience.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-13-html-labels-a-love-story-between-for-and-id?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-13-html-labels-a-love-story-between-for-and-id?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Sometimes, the most powerful features don't require complicated code. A simple connection between <code><strong>for</strong></code> and <code><strong>id</strong></code> creates one of the most useful relationships in HTML. It helps users complete forms effortlessly, improves accessibility, and enables clean semantic structure.</p><p>Every <code>for</code> finally finds the <code>id</code> it was looking for. ❤️</p>",
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

    const collectionTitle = "Lesson 13: HTML Labels — A Love Story Between for and id ❤️";
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

    console.log("🎉 Done! Lesson 13 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
