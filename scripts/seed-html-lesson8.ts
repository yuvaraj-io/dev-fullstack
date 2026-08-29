/**
 * Seed Script: "Lesson 08 — HTML Media — Working with Images, Videos & Audio"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson8.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson8.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*o-VTa5VdR1nbqnt1ZmGQxw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — The Evolution of Web Media" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Modern websites are much more than plain text. They use images, videos, audio, animations, and other multimedia elements to make content more engaging, easier to understand, and more memorable. While early websites were mostly text-based due to slow internet connections, limited browser capabilities, and less powerful computers, the web has evolved dramatically over the years.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the past, browsers couldn't play videos or audio on their own. Websites relied on browser plugins like <strong>Adobe Flash Player</strong> to display multimedia, which often required users to install additional software and came with performance, compatibility, and security issues. The introduction of <strong>HTML5</strong> changed everything by providing built-in media elements such as <code>&lt;img&gt;</code>, <code>&lt;video&gt;</code>, and <code>&lt;audio&gt;</code>. These elements allowed browsers to display images, play videos, and stream audio without external plugins.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Today, multimedia is an essential part of almost every website, from online learning platforms and news websites to e-commerce stores and social media applications. As a web developer, you'll frequently work with these media elements to create rich and interactive user experiences. Before learning how to add images, videos, and audio to a webpage, it's important to understand one fundamental concept — how browsers locate and access media files.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;img&gt;</code> tag is used to display images on a webpage. It is an empty (self-closing) HTML element that uses the <code>src</code> attribute to specify the image location and the <code>alt</code> attribute to provide alternative text.</p><p><strong>Example:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<img src="images/sunset.jpg" alt="Beautiful sunset over the mountains">',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Accessing Media Files ──
    { id: nextId(), type: "heading" as const, content: "Accessing Media Files" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the previous lesson, you learned that browsers use <strong>file paths</strong> to locate webpages. The exact same idea applies to media files. Just like webpages, images are also stored as files, and the browser needs to know where to find them before it can display them. The <code>&lt;img&gt;</code> tag uses the <code>src</code> (source) attribute to specify the location of an image. The value of the <code>src</code> attribute can be either a <strong>relative path</strong>, when the image is stored within your project, or an <strong>absolute path</strong>, when the image is hosted on another website.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p><strong>Relative Path Example:</strong></p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<img src="images/sunset.jpg" alt="Beautiful sunset">',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>In this example, the browser looks for the <code>sunset.jpg</code> file inside the <code>images</code> folder of the current project.</p><p><strong>Absolute Path Example:</strong></p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<img src="https://example.com/images/logo.png" alt="Company Logo">',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here, the browser downloads the image directly from the specified website instead of looking inside your project folder. Since you've already learned how relative and absolute paths work, the same concept applies when displaying images using the <code>&lt;img&gt;</code> tag.</p>",
    },

    // ── Working with Images ──
    { id: nextId(), type: "heading" as const, content: "Working with Images" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Imagine opening a restaurant website for the very first time. Instead of seeing mouth-watering pictures of delicious food, you only read descriptions like: <em>"Freshly baked pizza with melted cheese."</em>, <em>"Creamy chocolate cake topped with strawberries."</em> The descriptions may sound appealing, but wouldn\'t it be much more convincing if you could actually <strong>see</strong> the dishes? Images help visitors understand information much faster than text alone. They capture attention, explain ideas visually, and make webpages more engaging. That\'s why almost every website you visit contains images. To display an image, HTML provides the <strong><code>&lt;img&gt;</code> element</strong>.</p><p>Unlike most HTML elements, the <code>&lt;img&gt;</code> element doesn\'t wrap content. Instead, it simply tells the browser which image to display. For this reason, <code>&lt;img&gt;</code> is known as a <strong>Void Element</strong>, meaning it <strong>does not have a closing tag</strong>. Let\'s look at a simple example:</p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<img src="images/mountain.jpg" alt="Snow-covered mountain during sunrise">',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── The src Attribute ──
    { id: nextId(), type: "heading" as const, content: "The src Attribute" },
    {
      id: nextId(),
      type: "code" as const,
      code: 'src="images/mountain.jpg"',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>src</code> attribute stands for <strong>source</strong>. Its job is to tell the browser where the image is located. When the browser reads this attribute, it begins searching for the specified file. If the file exists, the browser downloads it and displays it on the webpage. If the file cannot be found, the browser cannot display the image. That's why providing the correct path is essential. Think of the <code>src</code> attribute as giving the browser the address of the image.</p>",
    },

    // ── The alt Attribute ──
    { id: nextId(), type: "heading" as const, content: "The alt Attribute" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Now let\'s imagine a different situation. Suppose the image cannot be loaded because the internet connection is slow or the file has been deleted. What should the browser show instead? This is where the <strong><code>alt</code> attribute</strong> becomes important.</p><p>The word <strong>alt</strong> stands for <strong>alternative text</strong>. If the browser cannot display the image, it displays the alternative text instead. But that\'s not the only reason this attribute exists. People with visual impairments often use <strong>screen readers</strong>, which read webpages aloud. Since a screen reader cannot describe an image by itself, it reads the value of the <code>alt</code> attribute instead.</p><p>For example, instead of saying <em>"Image,"</em> it can announce <em>"Snow-covered mountain during sunrise."</em> This helps users understand what the image represents. The <code>alt</code> attribute also provides useful information to search engines, improving both <strong>accessibility</strong> and <strong>SEO</strong>.</p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Poor example: <code>alt="image"</code></p><p>Better example: <code>alt="Student learning HTML on a laptop"</code></p>',
    },

    // ── How Browsers Load Images ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Load Images" },
    {
      id: nextId(),
      type: "code" as const,
      code: `Read the HTML document
          ↓
Find the <img> element
          ↓
Read the src attribute
          ↓
Locate the image file
          ↓
Download the image
          ↓
Display it on the webpage`,
      codeType: "text",
      link: "",
      btn: "",
    },

    // ── Common Image Formats ──
    { id: nextId(), type: "heading" as const, content: "Common Image Formats" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Not all image formats are created for the same purpose. Choosing the right format helps maintain good visual quality while keeping file sizes small:</p><ul><li><strong>JPEG (.jpg / .jpeg):</strong> Best suited for photographs, travel pictures, and nature images. Displays millions of colors with small file sizes.</li><li><strong>PNG (.png):</strong> Used when an image requires a <strong>transparent background</strong>, such as logos, icons, and illustrations.</li><li><strong>SVG (.svg):</strong> Scalable Vector Graphics based on mathematical shapes. Stays perfectly sharp at any zoom level, perfect for logos and icons.</li><li><strong>GIF (.gif):</strong> Supports simple animations and looping graphics.</li><li><strong>WebP (.webp):</strong> Modern format that provides excellent quality with significantly smaller file sizes than JPEG or PNG.</li></ul>",
    },

    // ── Working with Videos ──
    { id: nextId(), type: "heading" as const, content: "Working with Videos" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Images are excellent for showing products and diagrams, but some ideas require motion and sound. Videos combine visuals, movement, sound, and narration, making them one of the most effective ways to communicate information. HTML5 introduced the <strong><code>&lt;video&gt;</code> element</strong> so browsers can play videos natively without external plugins like Flash.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<video controls>
    <source src="videos/introduction.mp4" type="video/mp4">
</video>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Video Attributes ──
    { id: nextId(), type: "heading" as const, content: "Key Video Attributes" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li><code>controls</code>: Displays built-in play, pause, volume, progress bar, and fullscreen controls.</li><li><code>autoplay</code>: Automatically starts playing the video when the page loads.</li><li><code>muted</code>: Starts the video with audio muted (required by most browsers for autoplay to work).</li><li><code>loop</code>: Repeats the video continuously from the beginning once it ends.</li><li><code>poster</code>: Specifies an image to show before the video starts playing (thumbnail).</li></ul>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<video controls poster="images/video-thumbnail.jpg" autoplay muted loop>
    <source src="videos/tutorial.mp4" type="video/mp4">
</video>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Multiple Video Sources ──
    { id: nextId(), type: "heading" as const, content: "Providing Multiple Video Sources & Fallback" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Different browsers support different video formats. You can provide multiple <code>&lt;source&gt;</code> tags so the browser uses the first format it supports:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<video controls>
    <source src="videos/tutorial.mp4" type="video/mp4">
    <source src="videos/tutorial.webm" type="video/webm">
    <source src="videos/tutorial.ogv" type="video/ogg">
    Your browser does not support HTML5 video.
</video>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Working with Audio ──
    { id: nextId(), type: "heading" as const, content: "Working with Audio" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When you only need sound — such as for podcasts, music preview clips, or language learning — HTML5 provides the dedicated <strong><code>&lt;audio&gt;</code> element</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<audio controls>
    <source src="audio/podcast.mp3" type="audio/mpeg">
    <source src="audio/podcast.ogg" type="audio/ogg">
    Your browser does not support HTML5 audio.
</audio>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;audio&gt;</code> element supports attributes like <code>controls</code>, <code>autoplay</code>, <code>muted</code>, and <code>loop</code> just like the <code>&lt;video&gt;</code> element.</p>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ol><li><strong>Organize Media Files into Folders:</strong> Keep projects clean by separating files into <code>images/</code>, <code>videos/</code>, and <code>audio/</code> directories.</li><li><strong>Prefer Relative Paths Within Your Project:</strong> Makes code portable across machines and servers.</li><li><strong>Write Meaningful <code>alt</code> Text:</strong> Improves accessibility for screen readers and boosts SEO.</li><li><strong>Compress Large Media Files:</strong> Smaller files ensure faster page load times.</li><li><strong>Avoid Autoplaying Audio:</strong> Unprompted sound disrupts user experience; always let users control audio playback.</li><li><strong>Choose the Right Image Format:</strong> JPEG for photos, PNG for transparency, SVG for icons/vectors, and WebP for optimal modern compression.</li><li><strong>Optimize Videos for the Web:</strong> Compress videos and provide poster frames for engaging thumbnails.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>How browsers locate media files using relative and absolute paths.</li><li>How to display images using the void <code>&lt;img&gt;</code> element with <code>src</code> and <code>alt</code> attributes.</li><li>Common image formats: JPEG, PNG, SVG, GIF, and WebP.</li><li>Playing videos natively with HTML5 <code>&lt;video&gt;</code> using <code>controls</code>, <code>autoplay</code>, <code>muted</code>, <code>loop</code>, and <code>poster</code>.</li><li>Playing sound natively with HTML5 <code>&lt;audio&gt;</code> and multiple <code>&lt;source&gt;</code> tags.</li><li>Professional guidelines for organizing and compressing web media.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-08-html-media-working-with-images-videos-audio?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-08-html-media-working-with-images-videos-audio?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Congratulations on completing this lesson on HTML Media! HTML5 made multimedia on the web native, accessible, and high-performance without cumbersome external plugins.</p><p>In the next lesson, we'll explore <strong>HTML Tables</strong>, where you'll learn how to organize information into rows and columns using elements such as <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code>. Tables are perfect for displaying structured data like timetables, product comparisons, pricing plans, and reports.</p><p>Happy coding, and see you in the next lesson!</p>",
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

    const collectionTitle = "Lesson 8: HTML Media — Working with Images, Videos & Audio";
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

    console.log("🎉 Done! Lesson 8 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
