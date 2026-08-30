/**
 * Seed Script: React Lesson 14 — "React 14: Using Images in React"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-react-lesson14.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-react-lesson14.ts
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
    // ── Introduction ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Handling images in React may seem straightforward, but modern React applications use bundlers like <strong>Vite</strong>, <strong>Webpack</strong>, or <strong>Parcel</strong> that process, optimize, hash, and sometimes even convert image assets into <strong>Base64 data URIs</strong>.</p><p>In this guide, we will explore the <strong>three proper image loading methods in React</strong>, understand the difference between <code>src/assets/</code> and the <code>public/</code> folder, explore why Base64 conversion happens in dev mode, and inspect best practices for production deployment.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*uSBI6Y5WVFwIS2BeKfY-ZQ.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Interactive Playground on StackBlitz:</strong> <a href="https://stackblitz.com/edit/react-images-demo?file=src%2FApp.jsx" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/react-images-demo?file=src%2FApp.jsx</a></p>',
    },

    // ── The Three Loading Methods Overview ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ The Three Ways to Load Images in React 🖼️" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>React categorizes images into three distinct sources depending on optimization and storage requirements:</p><ol><li><strong>Local Bundled Assets (<code>src/assets/</code>):</strong> Imported into components, optimized, hashed, and bundled by Vite/Webpack.</li><li><strong>Static Public Assets (<code>public/</code>):</strong> Served unprocessed directly from root URL (e.g. <code>/logo.png</code>).</li><li><strong>Remote Images:</strong> External CDN or API URLs fetched by the browser at runtime.</li></ol>",
    },

    // ── Method 1: Local Assets ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Method 1: Local Images via src/assets/ (Bundled) 📦" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Importing local files into components allows your bundler to optimize the image, apply cache-busting filename hashes (e.g. <code>cat.83af321a.avif</code>), and eliminate dead/unused files during build:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/components/LocalImageExample.jsx
import React from "react";
// 1. Import local image directly from assets
import localCat from "./assets/cat.avif";

export default function LocalImageExample() {
  return (
    <div className="image-card">
      <h3>1. Bundled Local Asset</h3>
      <img 
        src={localCat} 
        width={250} 
        height="auto" 
        alt="Adorable Kitten" 
        loading="lazy"
      />
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Method 2: Public Folder ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Method 2: Static Public Folder Images (public/) 📁" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Files placed in the <code>public/</code> folder are copied directly to the build output without hashing or renaming. Reference them with an absolute path starting with <code>/</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Correct: Reference via root URL
<img src="/dog.avif" width={250} alt="Static Dog" />

// ❌ NEVER do this (Imports from public folder are invalid):
// import dog from "/public/dog.avif";`,
      codeType: "jsx",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>When to use <code>public/</code>:</strong> Favicons, <code>manifest.json</code>, <code>robots.txt</code>, very large videos/banners that shouldn't be processed by the bundler, or assets referenced dynamically by name from a database.</p>",
    },

    // ── Method 3: Remote Images ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Method 3: Remote Images via External URLs 🌐" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When displaying dynamic images from APIs, user avatars, or image CDNs (e.g. Unsplash, Cloudinary):</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<img
  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
  width={250}
  alt="Remote Landscape"
  loading="lazy"
/>`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Base64 In-Depth Explanation ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Why Do Images Sometimes Turn Into Base64? 🔍" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In developer tools, you might notice an image source like <code>data:image/avif;base64,AAAA...</code>. Here is why bundlers do this:</p><ul><li><strong>In Development Mode:</strong> Vite and Webpack inline images as Base64 strings to speed up Hot Module Replacement (HMR) and eliminate local HTTP network roundtrips.</li><li><strong>In Production Mode:</strong> Only very small images (typically &lt; 4KB) are inlined into the JavaScript bundle to save HTTP request overhead. Larger images are emitted as separate hashed files for browser caching.</li></ul>",
    },

    // ── Complete App Code ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Complete Working Example in App.jsx 🚀" },
    {
      id: nextId(),
      type: "code" as const,
      code: `// src/App.jsx
import React from "react";
import localImg from "./assets/cat.avif";

export default function App() {
  return (
    <div className="gallery-container">
      <h1>React Image Handling Showcase 🚀</h1>

      {/* 1. Local Image (Bundled & Hashed) */}
      <section className="card">
        <h2>1. Local Image via src/assets/</h2>
        <img src={localImg} width={220} alt="Local Cat" />
      </section>

      {/* 2. Public Folder Image (Unprocessed) */}
      <section className="card">
        <h2>2. Public Folder Image via /</h2>
        <img src="/dog.avif" width={220} alt="Dog" />
      </section>

      {/* 3. Remote Image (External URL) */}
      <section className="card">
        <h2>3. Remote CDN Image</h2>
        <img
          src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
          width={220}
          alt="Remote Kitten"
        />
      </section>
    </div>
  );
}`,
      codeType: "jsx",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ React Image Loading Methods Comparison" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Source</th><th style=\"padding:8px;\">Syntax</th><th style=\"padding:8px;\">Bundler Processing</th><th style=\"padding:8px;\">Best For</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong><code>src/assets/</code></strong></td><td style=\"padding:8px;\"><code>import img from './assets/cat.png'</code></td><td style=\"padding:8px;\">✅ Optimized, hashed, cache-busting</td><td style=\"padding:8px;\">Component icons, logos, illustrations</td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><strong><code>public/</code></strong></td><td style=\"padding:8px;\"><code>&lt;img src=\"/logo.png\" /&gt;</code></td><td style=\"padding:8px;\">❌ Untouched, static URL</td><td style=\"padding:8px;\">Favicons, robots.txt, dynamic filenames</td></tr><tr><td style=\"padding:8px;\"><strong>Remote URL</strong></td><td style=\"padding:8px;\"><code>&lt;img src=\"https://...\" /&gt;</code></td><td style=\"padding:8px;\">❌ Fetched by browser at runtime</td><td style=\"padding:8px;\">User avatars, database content, CDN assets</td></tr></tbody></table>",
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

    // 1. Find topic "react"
    const topic = await db.collection("topics").findOne({ name: /^react$/i });
    if (!topic) throw new Error('Topic "react" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction" for React
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found for React.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Find or update collection "React 14: Using Images in React" (collectionId: 116)
    const collectionTitle = "React 14: Using Images in React";
    const collectionId = 116;

    await db.collection("collections").updateOne(
      { id: collectionId },
      { $set: { title: collectionTitle, topics_id: topicId } },
      { upsert: true }
    );
    console.log(`✅ Updated collection title to "${collectionTitle}" (id: ${collectionId})`);

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
        order_no: 15,
      });
      console.log(`✅ Linked section → collection (id: ${scId}, order: 15)`);
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
    console.log(`│  Order in section:      ${String(sc ? sc.order_no : 15).padEnd(16)} │`);
    console.log("└──────────────────────────────────────────┘\n");

    console.log("🎉 Done! React Lesson 14 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
