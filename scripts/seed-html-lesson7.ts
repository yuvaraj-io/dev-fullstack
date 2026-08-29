/**
 * Seed Script: "Lesson 07 — HTML Links — Connecting Webpages Together"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson7.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson7.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*gHLjeQSuAYufU6elXdmhSA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction — From Books to Webpages" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Welcome back!</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>So far, you've learned how to structure webpages using HTML, organize content with headings and paragraphs, format text, and display images, videos, and other media. Now imagine you're building a restaurant website with separate pages for <strong>Home</strong>, <strong>About</strong>, <strong>Menu</strong>, and <strong>Contact</strong>. How would visitors move from one page to another? They certainly wouldn't search for each HTML file manually.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This is where <strong>hyperlinks</strong> come in. A hyperlink allows users to move from one webpage to another with a single click, connecting webpages into a seamless browsing experience. In fact, hyperlinks are one of the key technologies that made the World Wide Web possible. Before learning how to create hyperlinks, however, we first need to understand <strong>how browsers locate another webpage</strong>. To answer that, let's begin with an important concept called <strong>file paths</strong>.</p>",
    },

    // ── Understanding File Paths ──
    { id: nextId(), type: "heading" as const, content: "Understanding File Paths" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Imagine you've written several HTML pages for your first website. Your project folder might look like this:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html
├── about.html
├── contact.html
│
├── pages/
│   ├── services.html
│   └── team.html
│
└── assets/
    └── images/
        └── logo.png`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Think of this folder like a small neighborhood. Each file has its own address. Just as a courier needs the correct address to deliver a package, a browser needs the correct path to locate an HTML file, an image, or any other resource. If the address is incorrect, the browser cannot find the file. This address is called a <strong>file path</strong>. Whenever you create a hyperlink, display an image, or load another resource, the browser follows the file path you provide. Understanding file paths is one of the most important skills in HTML because almost every website relies on them. Let's see how browsers interpret these paths.</p>",
    },

    // ── Current Directory ──
    { id: nextId(), type: "heading" as const, content: "Current Directory (./)" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Imagine you're currently inside the <strong>index.html</strong> file.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html   ← You are here
├── about.html
├── contact.html`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser always begins by looking in the same folder as the current HTML file. This folder is called the <strong>current directory</strong>. The symbol used to represent the current directory is: <code>./</code></p><p>Suppose you want to open <strong>about.html</strong>. Since both files are located inside the same folder, the browser simply looks beside the current file.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="./about.html">About Us</a>',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Let\'s understand what happens:</p><ul><li><code>.</code> means "the current folder."</li><li><code>/</code> tells the browser to look inside that folder.</li><li><code>about.html</code> is the destination file.</li></ul><p>Because <strong>about.html</strong> already exists in the same folder, the browser finds it immediately. Interestingly, writing:</p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="about.html">About Us</a>',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>also works because browsers automatically assume the current directory when no path is specified. However, many developers prefer using <code>./</code> because it clearly indicates where the browser should begin searching.</p>",
    },

    // ── Child Directory ──
    { id: nextId(), type: "heading" as const, content: "Child Directory" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Now let's make our project slightly larger.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html
│
├── pages/
│   ├── services.html
│   └── team.html`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This time, <strong>services.html</strong> isn't in the same folder. Instead, it's inside another folder called <strong>pages</strong>. The <strong>pages</strong> folder is a <strong>child directory</strong> of the website folder. To reach it, the browser first enters the folder and then looks for the required file.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="./pages/services.html">Our Services</a>',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Grandchild Directory ──
    { id: nextId(), type: "heading" as const, content: "Grandchild Directory" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Folders can also contain other folders. Let's look at another example.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html
│
└── assets/
    └── images/
        └── logo.png`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <strong>images</strong> folder is inside the <strong>assets</strong> folder. This makes it a <strong>grandchild directory</strong>. Suppose you want to display the website logo. The browser must first enter the <strong>assets</strong> folder and then enter the <strong>images</strong> folder before reaching the image.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<img src="./assets/images/logo.png" alt="Website Logo">',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Let's break it down:</p><ol><li>Start in the current folder.</li><li>Open the <strong>assets</strong> folder.</li><li>Inside it, open the <strong>images</strong> folder.</li><li>Finally, locate <strong>logo.png</strong>.</li></ol><p>Every folder name acts like another step in the journey. The browser simply follows each step until it reaches the destination.</p>",
    },

    // ── Parent Directory ──
    { id: nextId(), type: "heading" as const, content: "Parent Directory (../)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>So far, we've always started from <strong>index.html</strong>. But what happens if the current file is inside another folder? Imagine you're editing <strong>services.html</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html
│
└── pages/
    └── services.html  ← You are here`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now suppose you want to return to <strong>index.html</strong>. The browser cannot find it by looking inside the current folder because <strong>index.html</strong> is located one level above. First, the browser must move back to the parent folder.<br>HTML uses <code>../</code> to represent the <strong>parent directory</strong>.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="../index.html">Home</a>',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Grandparent Directory ──
    { id: nextId(), type: "heading" as const, content: "Grandparent Directory (../../)" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Sometimes moving back one folder isn't enough. Consider the following project:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `website/
│
├── index.html
│
└── assets/
    └── images/
        └── icons/
            └── home.png`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose you're working inside the <strong>icons</strong> folder and need to reach a file located much higher in the folder structure. The browser must move up two folders. This is called the <strong>grandparent directory</strong>. HTML represents it as <code>../../</code>.</p><p>Each <code>../</code> moves the browser back by one folder:</p><ul><li><code>../</code> → Move up one level.</li><li><code>../../</code> → Move up two levels.</li><li><code>../../../</code> → Move up three levels.</li></ul><p>Think of it like climbing stairs. Every <code>../</code> takes one step upward through the folder structure until the browser reaches the correct location. Understanding this simple idea will make working with images, stylesheets, JavaScript files, and hyperlinks much easier as your projects grow larger.</p>",
    },

    // ── Relative Paths vs Absolute Paths ──
    { id: nextId(), type: "heading" as const, content: "Relative Paths vs Absolute Paths" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now that you understand how browsers move through folders using file paths, let's answer another important question: <strong>Is there only one way to locate a webpage?</strong> The answer is <strong>no</strong>. Browsers can locate resources in two different ways:</p><ol><li><strong>Relative Paths</strong></li><li><strong>Absolute Paths</strong></li></ol><p>Choosing the correct one is important because it tells the browser where to begin its search. Let's understand each approach with real-world examples.</p>",
    },

    // ── Relative Paths subsection ──
    { id: nextId(), type: "heading" as const, content: "Relative Paths" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Imagine you\'re giving directions to a friend who is already standing inside your college campus. You don\'t need to tell them the complete address of the college. Instead, you simply say: <em>"Walk straight, turn left, and you\'ll find the library."</em> Because your friend already knows their current location, short directions are enough. Relative paths work in exactly the same way. The browser starts from the location of the <strong>current HTML file</strong> and follows the path you provide.</p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="about.html">About Us</a>\n<a href="pages/services.html">Our Services</a>',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Absolute Paths subsection ──
    { id: nextId(), type: "heading" as const, content: "Absolute Paths" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Now imagine your friend is in another city. This time, saying <em>"Turn left and walk straight"</em> wouldn\'t make sense because they aren\'t starting from the same place. Instead, you would give the complete address. Browsers sometimes need complete addresses too. These complete addresses are called <strong>absolute paths</strong>. Instead of starting from the current folder, an absolute path tells the browser the exact location of the resource.</p><p>For example:</p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="https://example.com">Visit Example</a>',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Here, the browser doesn't search your project folders. Instead, it connects directly to the website located at <code>https://example.com</code>. Absolute paths are commonly used when linking to:</p><ul><li>Another website</li><li>External documentation</li><li>Online resources</li><li>Social media pages</li></ul>",
    },

    // ── Which One Should You Use? ──
    { id: nextId(), type: "heading" as const, content: "Which One Should You Use?" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If you're linking one page of your website to another, use a <strong>relative path</strong>. If you're sending visitors to another website, use an <strong>absolute path</strong>. Knowing the difference will save you from many broken links as your projects become larger.</p>",
    },

    // ── Creating Your First Hyperlink ──
    { id: nextId(), type: "heading" as const, content: "Creating Your First Hyperlink" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Websites usually consist of multiple pages, such as Home, About, Services, and Contact. To allow users to move between these pages, HTML provides the <strong>anchor element</strong>, represented by the <code>&lt;a&gt;</code> tag. The anchor element creates a hyperlink that connects one webpage to another, making navigation simple and seamless.</p><p>Let's create our very first hyperlink:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="about.html">About Us</a>',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Breaking Down Anchor Element ──
    { id: nextId(), type: "heading" as const, content: "Breaking Down the Anchor Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><code>&lt;a href&gt;</code> — This is the <strong>opening anchor tag</strong>. It tells the browser: <em>"Everything inside this element should behave like a hyperlink."</em> The <code>href</code> attribute stands for <strong>Hypertext Reference</strong>. It tells the browser where the hyperlink should go.</p><p><strong>Destination:</strong> The value inside the <code>href</code> attribute tells the browser where the hyperlink should lead. It can point to another HTML page within the same website, an image, a PDF document, a webpage on a different website, an email address, or a phone number.</p><p><strong>Visible Link Text:</strong> Everything placed between the opening and closing anchor tags (<code>About Us</code>) becomes visible to the user and is what they click.</p><p><strong>Closing Tag (<code>&lt;/a&gt;</code>):</strong> Tells the browser where the hyperlink ends.</p>',
    },

    // ── How Browsers Interpret Hyperlinks ──
    { id: nextId(), type: "heading" as const, content: "How Browsers Interpret Hyperlinks" },
    {
      id: nextId(),
      type: "code" as const,
      code: `User clicks the link
        ↓
Read the href attribute
        ↓
Locate about.html
        ↓
Load the webpage
        ↓
Display the new page`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a user clicks a hyperlink, everything happens within a fraction of a second. The browser does not randomly search your computer or the internet for the requested file. Instead, it follows the exact path specified in the <code>href</code> attribute. If the file exists at that location, the browser loads and displays it. If the file cannot be found, the browser typically shows a <strong>404 Page Not Found</strong> error. This is why providing the correct path in the <code>href</code> attribute is essential.</p>",
    },

    // ── Your First Mini Website ──
    { id: nextId(), type: "heading" as const, content: "Your First Mini Website" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Let's connect three pages together. Inside <strong>index.html</strong>, you could write:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h1>Welcome to My Website</h1>
<a href="about.html">About Us</a>
<br><br>
<a href="contact.html">Contact Us</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When visitors open the Home page, they will see two hyperlinks: <strong>About Us</strong> and <strong>Contact Us</strong>. Clicking either opens that respective page. Multiple HTML pages are now connected!</p>",
    },

    // ── Types of HTML Links ──
    { id: nextId(), type: "heading" as const, content: "Types of HTML Links" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Hyperlinks are one of the most powerful features of HTML because they connect webpages, resources, and online content. While every hyperlink is created using the same <code>&lt;a&gt;</code> element, different situations require different types of links:</p>",
    },

    // ── External Links ──
    { id: nextId(), type: "heading" as const, content: "External Links" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="https://developer.mozilla.org">
Visit MDN Web Docs
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Internal Links ──
    { id: nextId(), type: "heading" as const, content: "Internal Links" },
    {
      id: nextId(),
      type: "code" as const,
      code: '<a href="about.html">About Us</a>\n<a href="services.html">Our Services</a>',
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Same Page Links ──
    { id: nextId(), type: "heading" as const, content: "Same Page Links (Anchor Links)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Instead of forcing users to scroll through an entire page, we can create links that jump directly to a specific section. First, assign an <code>id</code> to the destination element, then create a link with <code>#id</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h2 id="contact">Contact Us</h2>\n\n<a href="#contact">Go to Contact Section</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Opening in New Tab ──
    { id: nextId(), type: "heading" as const, content: 'Opening a Link in a New Tab (target="_blank")' },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="https://example.com" target="_blank">
Visit Example
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Email Links ──
    { id: nextId(), type: "heading" as const, content: "Email Links (mailto:)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="mailto:support@example.com?subject=Website Inquiry&body=Hello, I have a question.">
Email Us
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Telephone Links ──
    { id: nextId(), type: "heading" as const, content: "Telephone Links (tel:)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="tel:+919876543210">
Call Us
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Download Links ──
    { id: nextId(), type: "heading" as const, content: "Download Links (download)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="files/HTML-Cheat-Sheet.pdf" download>
Download HTML Cheat Sheet
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Links Containing Other HTML Elements ──
    { id: nextId(), type: "heading" as const, content: "Links Can Contain Other HTML Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>HTML allows hyperlinks to wrap images, headings, buttons, and multiple inline elements to make entire components clickable.</p>",
    },

    // ── Image link ──
    { id: nextId(), type: "heading" as const, content: "Hyperlinks Around Images" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="index.html">
    <img src="assets/images/logo.png" alt="Company Logo">
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Heading link ──
    { id: nextId(), type: "heading" as const, content: "Hyperlinks Around Headings" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="article1.html">
    <h2>Getting Started with HTML</h2>
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Button link ──
    { id: nextId(), type: "heading" as const, content: "Hyperlinks Around Button-Like Elements" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="contact.html" class="button">
    Contact Us
</a>`,
      codeType: "html",
      link: "",
      btn: "",
    },

    // ── Multiple Inline Elements link ──
    { id: nextId(), type: "heading" as const, content: "Hyperlinks Around Multiple Inline Elements" },
    {
      id: nextId(),
      type: "code" as const,
      code: `<a href="course.html">
    Learn <strong>HTML</strong> from <em>Scratch</em>
</a>`,
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
        "<ol><li><strong>Use Descriptive Link Text:</strong> Avoid generic phrases like \"Click Here\". Use descriptive phrases like \"Learn More About Our Company\".</li><li><strong>Prefer Relative Links Within Your Website:</strong> Shorter, easier to manage, and portable.</li><li><strong>Use Absolute URLs for External Websites:</strong> Ensures the browser knows the complete domain address.</li><li><strong>Use <code>target=\"_blank\"</code> Carefully:</strong> Use primarily for external links when keeping the user on your site is helpful.</li><li><strong>Regularly Test Your Links:</strong> Prevent 404 errors by verifying destinations.</li><li><strong>Keep Navigation Simple and Consistent:</strong> Display consistent menus across pages for effortless navigation.</li></ol>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<ul><li>Why hyperlinks are essential for connecting webpages.</li><li>How browsers locate files using file paths (<code>./</code>, <code>../</code>, <code>../../</code>).</li><li>The difference between relative and absolute paths.</li><li>How the <code>&lt;a&gt;</code> (anchor) element creates hyperlinks.</li><li>Different types of HTML links: External, Internal, Same-page (anchor), New tab, Email (<code>mailto:</code>), Phone (<code>tel:</code>), and Download links.</li><li>How hyperlinks can wrap images, headings, buttons, and inline elements.</li><li>Professional best practices for writing meaningful and reliable links.</li></ul>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/lesson-07-html-links-connecting-webpages-together?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-07-html-links-connecting-webpages-together?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Congratulations on completing another important chapter in your HTML journey! Hyperlinks are one of the fundamental building blocks of the <strong>World Wide Web</strong>. Without them, websites would simply be isolated pages with no easy way for users to navigate between them.</p><p>In the next lesson, we'll explore <strong>HTML Images</strong>, where you'll learn how to display images on a webpage, organize image files, use the <code>&lt;img&gt;</code> element, understand the importance of the <code>alt</code> attribute, and discover best practices for creating accessible and visually engaging websites.</p>",
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

    const collectionTitle = "Lesson 7: HTML Links — Connecting Webpages Together";
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

    console.log("🎉 Done! Lesson 7 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
