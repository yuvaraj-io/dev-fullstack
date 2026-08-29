/**
 * Seed Script: "Lesson 06 — Typography Elements in HTML — Structuring Text for Better Readability"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-html-lesson6.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-html-lesson6.ts
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
      image: "https://miro.medium.com/v2/resize:fit:700/1*ldXsl4QkWKVk3PWhnAP5qw.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── Introduction ──
    { id: nextId(), type: "heading" as const, content: "Introduction" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In the previous lessons, we've built a strong foundation in HTML. We learned how an HTML document is structured, understood the difference between <strong>HTML tags and elements</strong>, and discovered how <strong>HTML comments</strong> help developers organize and document their code.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>We can move to the part of HTML that users actually see. Before we talk about HTML, let's take a small journey back in time.<br>Long before websites, smartphones, and computers became a part of our daily lives, people relied on <strong>newspapers</strong> to stay informed about what was happening around the world.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Take a close look at a newspaper. People immediately notice the <strong>large headline</strong> at the top of the page. After that, their eyes move toward the <strong>smaller headlines</strong> that divide different stories. Then they begin reading the <strong>paragraphs</strong> that explain each story in detail. Occasionally, they notice an <strong>important quote</strong> highlighted inside the article or a <strong>special note</strong> that stands out from the surrounding text.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Interestingly, websites follow the same analogy. HTML was <strong>not inspired by newspapers</strong>, but both newspapers and HTML organize information using <strong>hierarchy</strong>. They guide readers from the most important information to supporting details in a logical and meaningful order.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>We will be exploring these typography elements in HTML. Let's see how HTML gives headings.</p>",
    },

    // ── Why Typography Matters ──
    { id: nextId(), type: "heading" as const, content: "Why Typography Matters" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine creating a webpage that contains useful information but no structure at all. It might look something like this:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "Welcome to Nature Explorer We love traveling around the world This website shares travel stories photography camping hiking safety tips travel guides equipment recommendations and much more Contact us to know more.",
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Everything appears as one continuous block of text.</p><p>There are no headings.</p><p>— No paragraphs.</p><p>— No sections.</p><p>— No visual clues.</p><p>Even though the information is valuable, most people wouldn't enjoy reading it.</p><p>Now let's organize the same content:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Welcome to Nature Explorer
Explore Amazing Destinations
We love traveling around the world and sharing unforgettable experiences.
Travel Guides
Photography Tips
Camping Essentials
Contact Us`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Notice how much easier it becomes to read. The words haven't changed very much. What changed is the <strong>structure</strong>. Your brain immediately recognizes the page title. The section headings divide the information into meaningful topics. Paragraphs make the content comfortable to read.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Typography isn't simply about making webpages look beautiful. Its primary purpose is to make information easier to understand. But typography helps more than just readers. Browsers also rely on typography elements to understand the structure of a webpage. Search engines analyze headings to determine the main topics of a page. Screen readers announce headings differently from paragraphs, allowing visually impaired users to navigate large webpages quickly. Let's address our first typography elements.</p>",
    },

    // ── HTML Headings (H1–H6) ──
    { id: nextId(), type: "heading" as const, content: "HTML Headings (H1–H6)" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Let's return to our newspaper example. Every newspaper has one <strong>main headline</strong>. This is usually the biggest text on the page because it represents the most important story. Below the main headline, you'll often find smaller headlines introducing different sections of the newspaper. Each section may contain even smaller headings that divide the article into individual topics.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>The hierarchy looks something like this:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `Main Headline
        ↓
Section Heading
        ↓
Subsection Heading
        ↓
Smaller Heading`,
      codeType: "text",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Books follow exactly the same pattern. A book has one title. Each chapter has its own heading. Inside each chapter, there are section headings and sometimes even smaller subheadings. This organized hierarchy makes books much easier to navigate. HTML uses the same concept. Instead of providing just one heading element, HTML offers <strong>six different heading levels</strong>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Smaller Heading</h4>
<h5>Minor Heading</h5>
<h6>Smallest Heading</h6>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>At first glance, these may simply appear to be different font sizes. However, they represent something much more important. Each heading level describes the <strong>importance</strong> of the content rather than its appearance.<br>The <code>&lt;h1&gt;</code> element represents the main topic of the webpage.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>For example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<h1>Learn HTML from Scratch</h1>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When the browser reads this element, it understands that this is the primary heading of the page. Search engines also pay special attention to <code>&lt;h1&gt;</code> because it often summarizes the entire webpage. The <code>&lt;h2&gt;</code> element divides the page into major sections.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>For example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h2>Introduction</h2>
<h2>What is HTML?</h2>
<h2>Creating Your First Webpage</h2>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>If one of these sections needs to be divided further, we continue using <code>&lt;h3&gt;</code>.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<h2>Creating Your First Webpage</h2>
<h3>Installing Visual Studio Code</h3>
<h3>Writing HTML Code</h3>
<h3>Running the Webpage</h3>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>This hierarchy continues naturally through <code>&lt;h4&gt;</code>, <code>&lt;h5&gt;</code>, and <code>&lt;h6&gt;</code> whenever additional levels are required. Think of headings as the table of contents of your webpage. Each heading helps readers and browsers understand how different topics are organized.</p>",
    },

    // ── Single H1 ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Does a Webpage Usually Have Only One <h1>?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>A common question beginners ask is:<br><em>"Can I use multiple <code>&lt;h1&gt;</code> elements?"</em><br>Technically, HTML5 allows multiple <code>&lt;h1&gt;</code> elements in certain document structures. However, for most webpages, the recommended practice is to have <strong>one primary <code>&lt;h1&gt;</code></strong> representing the main topic of the page.<br>Your webpage should have one main heading that clearly tells readers and search engines what the page is about. The remaining content should be organized using <code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code>, and lower heading levels in a logical sequence.</p>',
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p><strong>Developer Tip:</strong><br>Never choose a heading tag simply because you like its size. Choose it based on the importance of the content. If you want text to appear larger or smaller purely for design purposes, use CSS instead of selecting an incorrect heading level.</p>",
    },

    // ── The Paragraph Element ──
    { id: nextId(), type: "heading" as const, content: "The Paragraph Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now that we've learned how to create headings, another question naturally arises. Where do we write the actual information?<br>A heading introduces a topic. But it doesn't explain the topic. That's the job of a <strong>paragraph</strong>.<br>HTML uses the <code>&lt;p&gt;</code> element to represent paragraphs.</p>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>For example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>
    HTML is the standard markup language used to create webpages. It provides the structure that browsers use to display content on the internet.
</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When a browser reads this element, it recognizes that the enclosed text is a paragraph. It automatically places spacing before and after the paragraph, making the content easier to read. Imagine reading an entire novel without paragraph breaks. Every sentence would blend into the next. Following the story would become difficult because there would be no natural pauses between ideas.<br>Webpages work exactly the same way. Paragraphs group related information together and help readers move comfortably from one idea to another. Just as headings create hierarchy, paragraphs create rhythm. They make content feel organized instead of overwhelming. Now that we've learned how to organize information using headings and paragraphs, the next question becomes:<br><strong>What if we want certain words or sentences to stand out from the rest?</strong><br>That's exactly what we'll explore in the next section, where we'll learn how HTML allows us to emphasize important text without losing its meaning.</p>",
    },

    // ── Bold Text: <b> vs <strong> ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Bold Text with Different Meanings — <b> vs <strong>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose you're creating an online shopping website. You want to display the product name in bold. You could write:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Buy our new <b>Wireless Mouse</b> today.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When the browser displays this code, the words <strong>Wireless Mouse</strong> appear in bold. The <code>&lt;b&gt;</code> element simply changes the appearance of the text. Now consider another example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p><strong>Warning:</strong> Keep this medicine away from children.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>The word <strong>Warning</strong> also appears bold. Visually, both examples look almost identical. So why does HTML provide two different elements? The answer lies in <strong>meaning</strong>. The <code>&lt;b&gt;</code> element simply tells the browser,<br><em>"<strong>Display this text in bold.</strong>"</em><br>The <code>&lt;strong&gt;</code> element tells the browser,<br><em>"This information is especially important."</em><br>That extra meaning makes a big difference. Search engines can recognize that the text carries importance. Screen readers may announce it with additional emphasis, helping visually impaired users understand that the content deserves special attention.</p>',
    },

    // ── Italics: <i> vs <em> ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Italics with Purpose — <i> vs <em>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now let's look at another pair of elements that often confuse beginners. Imagine you're writing a travel blog. One sentence says:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<p>The French word <i>Bonjour</i> means "Hello."</p>',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The word <em>Bonjour</em> appears in italics. Here, italics simply indicate that the word belongs to another language. Now consider another example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>You <em>must</em> wear a helmet while riding a motorcycle.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The word <em>must</em> is also displayed in italics. But something is different.</p><p>This time, you're emphasizing the importance of the word. The browser understands that the sentence carries stronger meaning. Just like <code>&lt;strong&gt;</code>, the <code>&lt;em&gt;</code> element adds semantic value. Screen readers often change their tone when reading emphasized text, making the message clearer for users who rely on assistive technologies.</p>",
    },

    // ── When Should You Use Each One? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "When Should You Use Each One?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Use <code>&lt;i&gt;</code> when text is visually different from its surrounding content, such as:</p><ul><li>Foreign words</li><li>Scientific names</li><li>Book titles</li><li>Technical terms</li></ul><p>Use <code>&lt;em&gt;</code> when you want to emphasize a particular word or phrase. The appearance may be similar, but the purpose is completely different.</p><p><strong>Did You Know?</strong><br>Many HTML elements look similar on a webpage but communicate different meanings behind the scenes. Modern web development focuses not only on how content looks, but also on what that content means. That's why semantic HTML is considered a best practice.</p>",
    },

    // ── <u> vs <mark> ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Drawing the Reader's Attention — <u> vs <mark>",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Sometimes making text bold or italic isn't enough. Imagine you're reading an exam timetable. The date of your exam is highlighted with a yellow marker. Even before reading the sentence, your eyes immediately notice that highlighted date. HTML provides an element for this exact purpose.<br>Consider the following example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Your examination begins on <mark>15 August</mark>.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser usually displays the marked text with a yellow background. This makes it stand out naturally. The <code>&lt;mark&gt;</code> element is commonly used for:</p><ul><li>Search results</li><li>Important dates</li><li>Keywords</li><li>Highlighted information</li></ul><p>Now let's look at another element:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Please <u>read the instructions carefully</u>.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;u&gt;</code> element underlines the text. Although this may seem useful, there's something important to remember. On most websites, underlined text usually represents hyperlinks. Using <code>&lt;u&gt;</code> unnecessarily can confuse users into thinking the text is clickable. For that reason, developers use <code>&lt;u&gt;</code> only when underlining has a specific meaning. Whenever your goal is simply to attract attention, <code>&lt;mark&gt;</code> is usually the better choice.</p><p><strong>Developer Tip:</strong><br>Whenever you have a choice between changing appearance and describing meaning, always choose the element that best represents the meaning. Well-structured HTML makes your webpages more accessible, easier to maintain, and easier for search engines to understand.</p>",
    },

    // ── Special Typography Elements ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Special Typography Elements",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Most of the typography elements we've learned so far are used frequently. However, HTML also provides a few specialized elements designed for specific situations. Although you won't use them on every webpage, they're extremely useful whenever the need arises. Let's explore them.</p>",
    },

    // ── <small> ──
    { id: nextId(), type: "heading" as const, content: "The <small> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p>Imagine you\'re visiting an online shopping website. At the bottom of the page, you notice text like:<br><em>© 2026 Tech Store. All Rights Reserved.</em><br>Or perhaps you see a legal disclaimer explaining the website\'s terms and conditions. This information is important. But it doesn\'t need the same visual emphasis as the main content. That\'s exactly why the <code>&lt;small&gt;</code> element exists.</p><p>Example:</p>',
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<small>© 2026 HTML Learning Series. All Rights Reserved.</small>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Browsers usually display this text slightly smaller than the surrounding content. Developers commonly use <code>&lt;small&gt;</code> for:</p><ul><li>Copyright notices</li><li>Legal disclaimers</li><li>Terms and conditions</li><li>Fine print</li><li>Additional notes</li></ul><p>Remember, the purpose isn't simply to reduce the font size. It's to indicate that the information is secondary to the main content.</p>",
    },

    // ── <sub> ──
    { id: nextId(), type: "heading" as const, content: "The <sub> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now imagine writing the chemical formula for water. If you type: <code>H2O</code>, the number appears on the same line as the letters. But in science, the correct notation is: <code>H₂O</code>.<br>To achieve this, HTML provides the <code>&lt;sub&gt;</code> element.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Water is represented as H<sub>2</sub>O.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser automatically displays the number slightly below the normal text. Subscripts are commonly used in:</p><ul><li>Chemistry</li><li>Biology</li><li>Mathematics</li><li>Scientific research</li></ul>",
    },

    // ── <sup> ──
    { id: nextId(), type: "heading" as const, content: "The <sup> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Just as some text needs to appear below the normal line, other text needs to appear above it. Imagine writing: <code>x²</code>. Without superscript formatting, it would simply appear as <code>x2</code>.<br>Using HTML, we can display it correctly.</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>x<sup>2</sup> + y<sup>2</sup></p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser displays the numbers slightly above the baseline. The <code>&lt;sup&gt;</code> element is commonly used for:</p><ul><li>Mathematical expressions</li><li>Footnotes</li><li>Ordinal numbers</li></ul>",
    },

    // ── Quotes & Citations ──
    { id: nextId(), type: "heading" as const, content: "Quotes & Citations" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>As you continue building websites, you'll eventually create more than just simple webpages. Perhaps you'll start a personal blog where you share your thoughts. Maybe you'll write a news article about a recent event. Or perhaps you'll prepare a research paper or a book review for your college assignment. In all these situations, there will be times when you want to include someone else's words or mention the title of a book, article, or movie.</p><p>Simply typing quotation marks around the text works visually, but it doesn't tell the browser that the content is actually a quotation. To solve this problem, HTML provides dedicated elements for quotes and citations. Let's explore them one by one.</p>",
    },

    // ── <blockquote> ──
    { id: nextId(), type: "heading" as const, content: "The <blockquote> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine you're writing an article about motivation. You want to include a famous quote from Nelson Mandela. Since the quotation is longer than a single sentence, it deserves its own section. HTML provides the <code>&lt;blockquote&gt;</code> element for long quotations.</p><p>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<blockquote>
Education is the most powerful weapon which you can use to change the world.
</blockquote>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>When browsers display a blockquote, they usually indent it slightly from the surrounding text. This helps readers immediately recognize that the text comes from another source.</p>",
    },

    // ── <q> ──
    { id: nextId(), type: "heading" as const, content: "The <q> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Sometimes quotations are much shorter. For example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: '<p>Albert Einstein once said <q>Imagination is more important than knowledge.</q></p>',
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Unlike <code>&lt;blockquote&gt;</code>, the <code>&lt;q&gt;</code> element is used for short quotations that appear inside a sentence. Most browsers automatically insert quotation marks around the quoted text. This makes your HTML cleaner and more meaningful.</p>",
    },

    // ── <cite> ──
    { id: nextId(), type: "heading" as const, content: "The <cite> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose you're writing a review of your favorite book. Instead of writing <code>&lt;p&gt;Atomic Habits changed my perspective.&lt;/p&gt;</code>, you can identify the title using the <code>&lt;cite&gt;</code> element:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>One of my favorite books is <cite>Atomic Habits</cite>.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The <code>&lt;cite&gt;</code> element is commonly used for:</p><ul><li>Books</li><li>Movies</li><li>Research papers</li><li>Articles</li><li>Songs</li><li>Paintings</li></ul><p>It helps identify the title of a creative work rather than emphasizing ordinary text.</p>",
    },

    // ── Code Elements ──
    { id: nextId(), type: "heading" as const, content: "Code Elements" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Since you're learning HTML, you'll often visit programming websites and tutorials. Have you noticed that programming code usually appears in a different font from the rest of the article? That's because HTML provides dedicated elements for displaying code. These elements make programming examples easier to read while helping browsers recognize that the content is code rather than ordinary text.</p>",
    },

    // ── <code> ──
    { id: nextId(), type: "heading" as const, content: "The <code> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Suppose you're explaining how to create a paragraph. You can write:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Use the <code>&lt;p&gt;</code> element to create a paragraph.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>The browser displays the code using a monospace font. This makes code snippets stand out from normal text. The <code>&lt;code&gt;</code> element is best suited for short pieces of code that appear inside a sentence.</p>",
    },

    // ── <pre> ──
    { id: nextId(), type: "heading" as const, content: "The <pre> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content: "<p>Sometimes code contains multiple lines. For example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<pre>
    <h1>Welcome</h1>
    <p>Hello World!</p>
</pre>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Normally, browsers ignore extra spaces and line breaks. However, the <code>&lt;pre&gt;</code> element preserves the formatting exactly as written. This makes it perfect for programming tutorials because indentation and spacing remain intact.</p>",
    },

    // ── <kbd> ──
    { id: nextId(), type: "heading" as const, content: "The <kbd> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Imagine you're teaching users how to save a file. Instead of simply writing: Press Ctrl + S, HTML provides a dedicated element for keyboard input:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save your file.</p>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Most browsers display keyboard keys with a distinctive appearance, making them easy to recognize. The <code>&lt;kbd&gt;</code> element is commonly used in technical documentation and programming tutorials.</p>",
    },

    // ── Horizontal Rule & Line Break ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "Horizontal Rule & Line Break",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Sometimes content needs to be separated into different sections. Instead of creating a completely new heading, you may simply want a visual divider. HTML provides the <code>&lt;hr&gt;</code> element for this purpose.<br>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: "<hr>",
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Most browsers display a horizontal line across the page. Readers immediately understand that one topic has ended and another is about to begin.</p>",
    },

    // ── <br> ──
    { id: nextId(), type: "heading" as const, content: "The <br> Element" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Now imagine you're writing a poem or an address. Each line should appear separately. The <code>&lt;br&gt;</code> element creates a line break.<br>Example:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<p>
Rose is red.<br>
Violets are blue.<br>
HTML is fun,<br>
And coding is too.
</p>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Each sentence appears on a new line while remaining inside the same paragraph.</p>",
    },

    // ── When Should You Avoid <br>? ──
    {
      id: nextId(),
      type: "heading" as const,
      content: "When Should You Avoid <br>?",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Many beginners use multiple <code>&lt;br&gt;</code> elements to create empty space:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `<br>
<br>
<br>`,
      codeType: "html",
      link: "",
      btn: "",
    },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Although this works visually, it isn't considered good practice. The <code>&lt;br&gt;</code> element should only create line breaks inside content. Spacing between sections should be controlled using CSS, not repeated line breaks. Think of HTML as describing <strong>structure</strong>, while CSS controls <strong>appearance</strong>.</p>",
    },

    // ── Best Practices ──
    { id: nextId(), type: "heading" as const, content: "Best Practices" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>As you continue learning HTML, following a few simple practices will make your code cleaner, more accessible, and easier to maintain.</p><ul><li><strong>Don't skip heading levels.</strong> Move naturally from <code>&lt;h1&gt;</code> to <code>&lt;h2&gt;</code>, then <code>&lt;h3&gt;</code>. A logical hierarchy helps browsers, search engines, and readers understand the structure of your content.</li><li><strong>Use only one <code>&lt;h1&gt;</code> on most webpages.</strong> Your main heading should clearly describe the page's primary topic.</li><li><strong>Prefer <code>&lt;strong&gt;</code> over <code>&lt;b&gt;</code> when meaning matters.</strong> <code>&lt;strong&gt;</code> communicates importance, while <code>&lt;b&gt;</code> only changes appearance.</li><li><strong>Prefer <code>&lt;em&gt;</code> over <code>&lt;i&gt;</code> when emphasis matters.</strong> Use <code>&lt;em&gt;</code> when you want to stress a word or phrase instead of simply displaying it in italics.</li><li><strong>Don't use <code>&lt;br&gt;</code> for layout.</strong> Create spacing using CSS instead.</li><li><strong>Separate structure from design.</strong> Use HTML to describe the meaning of your content and CSS to control how it looks. Following these practices helps you write HTML that is easier to understand for both people and machines.</li></ul>",
    },

    // ── Quick Recap ──
    { id: nextId(), type: "heading" as const, content: "Quick Recap" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>In this lesson, you explored some of the most important typography elements in HTML. You learned:</p><ul><li>Why typography improves readability.</li><li>How headings create a hierarchy of information.</li><li>Why paragraphs organize related ideas.</li><li>The difference between <code>&lt;b&gt;</code> and <code>&lt;strong&gt;</code>.</li><li>The difference between <code>&lt;i&gt;</code> and <code>&lt;em&gt;</code>.</li><li>When to use <code>&lt;u&gt;</code> and <code>&lt;mark&gt;</code>.</li><li>How <code>&lt;small&gt;</code>, <code>&lt;sub&gt;</code>, and <code>&lt;sup&gt;</code> solve specific real-world problems.</li><li>How to display quotations using <code>&lt;blockquote&gt;</code> and <code>&lt;q&gt;</code>.</li><li>How to reference creative works with <code>&lt;cite&gt;</code>.</li><li>How to display programming code using <code>&lt;code&gt;</code>, <code>&lt;pre&gt;</code>, and <code>&lt;kbd&gt;</code>.</li><li>When to use <code>&lt;hr&gt;</code> and <code>&lt;br&gt;</code>.</li><li>Professional practices for writing semantic HTML.</li></ul><p>Together, these elements help create webpages that are organized, meaningful, and easy to read.</p>",
    },

    // ── Try Now ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try Now:</strong> <a href="https://stackblitz.com/edit/typography-elements-in-html?file=index.html" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/typography-elements-in-html?file=index.html</a></p>',
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>At first, typography may seem like it's only about making text look attractive. However, you've discovered that typography elements serve a much greater purpose. They organize information into a clear hierarchy, improve readability, guide visitors through your content, and help browsers, search engines, and assistive technologies understand the meaning behind your webpage. By choosing the right typography elements, you're not only creating webpages that look professional but also building websites that are more accessible, maintainable, and search-engine friendly.</p><p>In the next lesson, we'll explore <strong>HTML Lists</strong>, where you'll learn how to organize related information using <strong>ordered lists, unordered lists, and description lists</strong>. These elements are essential for presenting steps, menus, features, and structured information in a clean and organized way.</p><p>Happy coding, and I'll see you in the next lesson!</p>",
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

    const collectionTitle = "Lesson 6: Typography Elements in HTML — Structuring Text for Better Readability";
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

    console.log("🎉 Done! Lesson 6 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => { console.error("❌ Seed failed:", err); process.exit(1); });
