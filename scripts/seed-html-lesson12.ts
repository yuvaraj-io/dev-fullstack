/**
 * Seed Script: "Lesson 12 — HTML Forms — Collecting User Input with Forms and Input Types"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson12.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson12.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*IW3ODWJAiz1tIoGQG1iMRA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction: Why Forms Matter" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Think about the websites you use every day. When you create an account, sign in, search for a product, book a ticket, or send a contact message, you're entering information that the website needs to process.</p><p>How do websites collect this information? The answer is <strong>HTML forms</strong>. A form provides a structured way for users to enter information and send it to a server. Instead of simply displaying content, forms make webpages interactive.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Different fields collect different types of data:</p><ul><li>A name field accepts text.</li><li>A password field masks typed characters.</li><li>A date field displays a calendar.</li><li>A file field lets users upload documents.</li><li>Radio buttons enforce single option selection.</li><li>Checkboxes allow multiple selections.</li></ul>",
    },

    // ── Understanding the <form> Element ──
    { id: nextId(), type: "heading" as const, content: "Understanding the <form> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;form&gt;</code> element acts as a container grouping related input controls together so they can be submitted as a single payload.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<form action="/register" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Enter your full name">
    <input type="submit" value="Submit">
</form>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>action</code>: Specifies the destination URL where submitted form data is sent for processing.</li><li><code>method</code>: Specifies the HTTP transfer method (typically <code>GET</code> or <code>POST</code>).</li></ul>",
    },

    // ── Understanding the <input> Element ──
    { id: nextId(), type: "heading" as const, content: "Understanding the <input> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;input&gt;</code> element is a versatile void element (no closing tag). Changing its <code>type</code> attribute changes how the control renders and behaves in the browser.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input
    type="text"
    id="username"
    name="username"
    placeholder="Enter your username"
    value="">`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>type</code>: Specifies the kind of input control (e.g. <code>text</code>, <code>password</code>, <code>email</code>, <code>checkbox</code>).</li><li><code>id</code>: Unique element identifier (links to <code>&lt;label for=\"id\"&gt;</code>).</li><li><code>name</code>: Field key submitted with the form payload to the backend server.</li><li><code>placeholder</code>: Temporary text hint displayed inside the field before the user types.</li><li><code>value</code>: Initial or current value of the field.</li></ul>",
    },

    // ── Common Input Types ──
    { id: nextId(), type: "heading" as const, content: "Common Input Types" },

    // ── text ──
    { id: nextId(), type: "heading" as const, content: 'Text Input (type="text")' },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Standard single-line text box for names, usernames, search queries, etc.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="name">Full Name:</label>
<input type="text" id="name" name="name" placeholder="Enter your full name">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── password ──
    { id: nextId(), type: "heading" as const, content: 'Password Input (type="password")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Masks entered characters with bullets/asterisks on screen to prevent shoulder-surfing. <em>Note: Masking is only visual; actual security encryption happens in transit (HTTPS) and on the server.</em></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="password">Password:</label>
<input type="password" id="password" name="password" placeholder="Enter your password">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── email ──
    { id: nextId(), type: "heading" as const, content: 'Email Input (type="email")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Provides built-in browser validation checking for <code>@</code> and valid email address syntax before submission, and shows email-optimized keyboards on mobile devices.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Enter your email address">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── number ──
    { id: nextId(), type: "heading" as const, content: 'Number Input (type="number")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Restricts user entry to numeric characters, with optional <code>min</code>, <code>max</code>, and <code>step</code> constraints and spinner controls.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="age">Age:</label>
<input type="number" id="age" name="age" min="18" max="60" step="1">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── date ──
    { id: nextId(), type: "heading" as const, content: 'Date Input (type="date")' },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Displays a native calendar picker to ensure properly formatted dates.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="dob">Date of Birth:</label>
<input type="date" id="dob" name="dob">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── radio ──
    { id: nextId(), type: "heading" as const, content: 'Radio Buttons (type="radio")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Used when the user must choose <strong>exactly one option</strong> from a list. Group related radio buttons by giving them the exact same <code>name</code> attribute.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>Payment Method:</p>
<input type="radio" id="card" name="payment" value="card">
<label for="card">Credit Card</label>

<input type="radio" id="upi" name="payment" value="upi">
<label for="upi">UPI</label>

<input type="radio" id="cash" name="payment" value="cash">
<label for="cash">Cash</label>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── checkbox ──
    { id: nextId(), type: "heading" as const, content: 'Checkboxes (type="checkbox")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Allows users to select <strong>zero, one, or multiple options</strong>. Use the <code>checked</code> attribute to pre-select items.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>Hobbies:</p>
<input type="checkbox" id="reading" name="hobby" value="reading" checked>
<label for="reading">Reading</label>

<input type="checkbox" id="travel" name="hobby" value="travel">
<label for="travel">Traveling</label>

<input type="checkbox" id="music" name="hobby" value="music">
<label for="music">Music</label>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── file ──
    { id: nextId(), type: "heading" as const, content: 'File Upload (type="file")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Enables uploading files from the user's filesystem. Use the <code>accept</code> attribute to restrict accepted file extensions or MIME types (e.g. <code>accept=\"image/*\"</code>, <code>accept=\".pdf\"</code>).</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<label for="photo">Profile Photo:</label>
<input type="file" id="photo" name="photo" accept="image/*">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── hidden & submit ──
    { id: nextId(), type: "heading" as const, content: 'Hidden & Submit Inputs (type="hidden", type="submit")' },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>type=\"hidden\"</code>: Holds data invisible to users that gets passed to the server (e.g. session tokens, entity IDs). <em>Never place sensitive unencrypted data in hidden fields.</em></li><li><code>type=\"submit\"</code>: Renders a button that gathers all form inputs and triggers submission.</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<input type="hidden" name="userId" value="usr_9812">
<input type="submit" value="Register Now">`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Choose the correct input type:</strong> Improves mobile keyboard usability and enables built-in browser validation.</li><li><strong>Always pair inputs with <code>&lt;label&gt;</code>:</strong> Improves accessibility for screen readers and expands the clickable hit target.</li><li><strong>Use placeholders as hints, not labels:</strong> Placeholders vanish once typing starts and should never replace clear labels.</li><li><strong>Group radio buttons with matching <code>name</code> attributes:</strong> Ensures only one option is chosen per group.</li><li><strong>Never rely solely on client-side validation:</strong> Always perform secure server-side validation.</li><li><strong>Keep forms concise:</strong> Only ask for required information to improve completion rates.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>&lt;form&gt;</code> wraps input controls and configures <code>action</code> and <code>method</code>.</li><li><code>&lt;input&gt;</code> is a void element configured via the <code>type</code> attribute.</li><li>Input types covered: <code>text</code>, <code>password</code>, <code>email</code>, <code>number</code>, <code>date</code>, <code>radio</code>, <code>checkbox</code>, <code>file</code>, <code>hidden</code>, and <code>submit</code>.</li><li>Labels connected via <code>for</code> and <code>id</code> are essential for accessibility.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-12-html-forms?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-12-html-forms?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML forms make webpages truly interactive by allowing users to enter and submit information. Although a single <code>&lt;input&gt;</code> element is used to create many different kinds of form controls, changing its <code>type</code> attribute allows it to collect different types of data efficiently.</p><p>As you continue building websites, selecting the appropriate input type will improve usability, accessibility, and the overall user experience.</p>",
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

    const collectionTitle = "Lesson 12: HTML Forms — Collecting User Input with Forms and Input Types";
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

    console.log("🎉 Done! Lesson 12 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
