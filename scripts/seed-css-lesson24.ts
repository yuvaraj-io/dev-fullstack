/**
 * Seed Script: CSS Lesson 24 — "Lesson 24: Using CSS Icons — Adding Visual Meaning to Your Website 🎨"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-css-lesson24.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-css-lesson24.ts
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
    // ── Introduction Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*_Xf7E4FoHR3qBKnJNWpK3A.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — Visual Meaning in Modern UI 🎨" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine seeing a button that says simply <em>'Search'</em> versus a button accompanied by a crisp magnifying-glass icon. The human eye recognizes the visual icon almost instantaneously before reading the text.</p><p>Icons provide intuitive visual cues in navigation bars, form fields, call-to-action buttons, cards, and notification feeds. In CSS, we have 4 primary ways to integrate icons:</p><ol><li><strong>Font Awesome:</strong> Versatile class-based font icon library.</li><li><strong>Material Icons:</strong> Google's ligature-based system design icons.</li><li><strong>SVG (Scalable Vector Graphics):</strong> Infinite resolution and total CSS styling control.</li><li><strong>CSS-Only Icons:</strong> Geometrical shapes crafted purely with CSS pseudo-elements (<code>::before</code> / <code>::after</code>).</li></ol>",
    },

    // ── Method 1: Font Awesome ──
    { id: nextId(), type: "heading" as const, content: "1. Font Awesome Icons: Class-Based Font Icons 🅰️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Font Awesome maps vector symbols to custom glyphs inside a font file. First, load the CDN stylesheet in your <code>&lt;head&gt;</code>, then render icons using classes like <code>fa-solid fa-user</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 1. CDN link in <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

<!-- 2. HTML Markup -->
<i class="fa-solid fa-user icon-primary"></i> Profile
<i class="fa-solid fa-envelope icon-primary"></i> Messages
<i class="fa-solid fa-phone icon-primary"></i> Support

<!-- 3. CSS Styling (Icons behave like text characters!) -->
<style>
  .icon-primary {
    font-size: 32px;
    color: #2563eb;
    margin-right: 10px;
    transition: transform 0.2s ease;
  }
  .icon-primary:hover {
    transform: scale(1.15);
    color: #1d4ed8;
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Font Awesome Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-font-awesome-icons?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-font-awesome-icons?file=index.html</a></p>',
    },

    // ── Method 2: Material Icons ──
    { id: nextId(), type: "heading" as const, content: "2. Google Material Icons: Ligature-Based Icons 🏛️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Google's <strong>Material Icons</strong> uses typographic ligatures. The browser replaces words like <code>home</code>, <code>email</code>, or <code>phone</code> inside a <code>.material-icons</code> element with the corresponding icon glyph:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- 1. CDN Link -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<!-- 2. Markup (Ligature strings become icons!) -->
<span class="material-icons green-icon">home</span> Home
<span class="material-icons green-icon">email</span> Contact
<span class="material-icons green-icon">phone</span> Call Us

<!-- 3. CSS Styling -->
<style>
  .material-icons.green-icon {
    font-size: 36px;
    color: #16a34a;
    vertical-align: middle;
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live Material Icons Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-font-material-icons?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-font-material-icons?file=index.html</a></p>',
    },

    // ── Method 3: SVG Icons ──
    { id: nextId(), type: "heading" as const, content: "3. Inline SVG: Infinite Precision & Vector Control 📐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Scalable Vector Graphics (SVG)</strong> are mathematical coordinate paths (XML-based). Unlike font icons, SVGs can never suffer from font-loading delays, and you can animate or style each individual sub-path, <code>fill</code>, and <code>stroke</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Inline SVG Info Icon -->
<svg class="svg-info-icon" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>

<style>
  .svg-info-icon {
    width: 48px;
    height: 48px;
    stroke: #dc2626;
    stroke-width: 2;
    fill: none; /* Keeps inside transparent */
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .svg-info-icon:hover {
    stroke: #991b1b;
    transform: rotate(15deg);
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live SVG Icons Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-svg?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-svg?file=index.html</a></p>',
    },

    // ── Method 4: CSS-Only Icons ──
    { id: nextId(), type: "heading" as const, content: "4. CSS-Only Icons: Pseudo-Elements & Transforms 🪄" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>For elementary shapes like plus symbols, hamburger menus, checkmarks, or arrows, you don't even need an external library! Using <code>::before</code> and <code>::after</code> pseudo-elements combined with CSS <code>transform</code>, you can build icons with zero HTTP requests.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<!-- Pure CSS Plus (+) Icon -->
<div class="plus-icon"></div>

<style>
  .plus-icon {
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
  }

  /* Two intersecting bars */
  .plus-icon::before,
  .plus-icon::after {
    content: "";
    position: absolute;
    background: #111827;
    width: 100%;
    height: 4px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    border-radius: 2px;
    transition: transform 0.3s ease;
  }

  /* Rotate the second bar 90 degrees to make it vertical */
  .plus-icon::after {
    transform: translateY(-50%) rotate(90deg);
  }

  /* Cool hover effect: rotates 45 degrees into an 'X' close icon! */
  .plus-icon:hover::before {
    transform: translateY(-50%) rotate(45deg);
  }
  .plus-icon:hover::after {
    transform: translateY(-50%) rotate(135deg);
  }
</style>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Live CSS-Only Icon Playground:</strong> <a href="https://stackblitz.com/edit/stackblitz-css-only-icon?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/stackblitz-css-only-icon?file=index.html</a></p>',
    },

    // ── Decision Matrix & Comparison ──
    { id: nextId(), type: "heading" as const, content: "5. When to Use Which Method? 🎯" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Method</th><th style=\"padding:8px;\">Pros</th><th style=\"padding:8px;\">Cons</th><th style=\"padding:8px;\">Best For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Font Awesome</strong></td><td style=\"padding:8px;\">Huge catalog, styled via CSS text props</td><td style=\"padding:8px;\">Extra HTTP request / file payload</td><td style=\"padding:8px;\">Rapid prototyping & massive UI apps</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Material Icons</strong></td><td style=\"padding:8px;\">Clean ligature syntax, Google Material feel</td><td style=\"padding:8px;\">Locked to Material Design guidelines</td><td style=\"padding:8px;\">Admin dashboards & Material apps</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong>Inline SVG</strong></td><td style=\"padding:8px;\">No external fonts needed, sharpest rendering, animatable paths</td><td style=\"padding:8px;\">Clutters HTML markup if large</td><td style=\"padding:8px;\">Production sites, logos & custom illustrations</td></tr><tr><td style=\"padding:8px;\"><strong>CSS-Only</strong></td><td style=\"padding:8px;\">Zero network requests, ultra lightweight</td><td style=\"padding:8px;\">Limited to simple geometric shapes</td><td style=\"padding:8px;\">Hambuger menus, plus/close toggles, arrows</td></tr></tbody></table>",
    },

    // ── Best Practices & Common Mistakes ──
    { id: nextId(), type: "heading" as const, content: "6. Best Practices & Accessibility 💡" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><strong>Don't Rely Solely on Icons:</strong> Icons can be culturally ambiguous. Whenever possible, combine icons with text labels (e.g. <code>&lt;i class=\"fa-solid fa-trash\"&gt;&lt;/i&gt; Delete</code>).</li><li><strong>Provide Accessible Labels:</strong> For icon-only buttons (like a search magnifying glass), always add an <code>aria-label=\"Search\"</code> attribute so screen readers can announce the action.</li><li><strong>Maintain Consistent Icon Sizing:</strong> Keep UI icon sizes harmonized (e.g., standard 16px, 20px, 24px) to prevent visual chaos.</li></ul>",
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

    // 1. Find topic "css" (id: 8)
    const topic = await db.collection("topics").findOne({ name: /^css$/i });
    if (!topic) throw new Error('Topic "css" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Typography & Media" (id: 15) for CSS
    const section = await db.collection("sections").findOne({
      name: /^typography/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Typography & Media" not found for CSS.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "Lesson 24: Using CSS Icons — Adding Visual Meaning to Your Website 🎨" (id: 56)
    const collectionTitle = "Lesson 24: Using CSS Icons — Adding Visual Meaning to Your Website 🎨";
    let collection = await db.collection("collections").findOne({
      topics_id: topicId,
      $or: [
        { title: /^icons$/i },
        { title: /^using css icons/i },
        { title: /^lesson 24/i },
        { id: 56 },
      ],
    });

    let collectionId: number;
    if (collection) {
      collectionId = collection.id;
      await db.collection("collections").updateOne(
        { id: collectionId },
        { $set: { title: collectionTitle, topics_id: topicId } }
      );
      console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);
    } else {
      collectionId = await getNextSequence(client, "collections");
      await db.collection("collections").insertOne({
        id: collectionId,
        title: collectionTitle,
        topics_id: topicId,
        title_index: null,
      });
      console.log(`✅ Created new collection "${collectionTitle}" (id: ${collectionId})`);
    }

    // 4. Link section_collections if needed
    let sc = await db.collection("section_collections").findOne({
      collectionId,
      topicId,
    });
    let scId = sc ? sc.id : 0;
    if (!sc) {
      scId = await getNextSequence(client, "section_collections");
      await db.collection("section_collections").insertOne({
        id: scId,
        sectionId,
        collectionId,
        topicId,
        order_no: 3,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 3)`);
    } else {
      console.log(`✅ Section-collection link exists (id: ${sc.id}, order: ${sc.order_no})`);
      scId = sc.id;
    }

    // 5. Update or Create Blog
    const blocks = buildBlogBlocks();
    let blog = await db.collection("blogs").findOne({ collections_id: collectionId });
    let blogId: number;

    if (blog) {
      blogId = blog.id;
      await db.collection("blogs").updateOne(
        { id: blogId },
        {
          $set: {
            heading: collectionTitle,
            content: blocks,
          },
        }
      );
      console.log(`✅ Updated existing blog with ${blocks.length} blocks (id: ${blogId})\n`);
    } else {
      blogId = await getNextSequence(client, "blogs");
      await db.collection("blogs").insertOne({
        id: blogId,
        heading: collectionTitle,
        content: blocks,
        collections_id: collectionId,
      });
      console.log(`✅ Created new blog with ${blocks.length} blocks (id: ${blogId})\n`);
    }

    console.log("┌──────────────────────────────────────────┐");
    console.log("│            Seed Summary                  │");
    console.log("├──────────────────────────────────────────┤");
    console.log(`│  Topic ID:              ${String(topicId).padEnd(16)} │`);
    console.log(`│  Section ID:            ${String(sectionId).padEnd(16)} │`);
    console.log(`│  Collection ID:         ${String(collectionId).padEnd(16)} │`);
    console.log(`│  Section-Collection ID: ${String(scId).padEnd(16)} │`);
    console.log(`│  Blog ID:               ${String(blogId).padEnd(16)} │`);
    console.log(`│  Content blocks:        ${String(blocks.length).padEnd(16)} │`);
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 3).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! CSS Lesson 24 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
