/**
 * Seed Script: JavaScript "Lesson 21: Date and Time Handling in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson21.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson21.ts
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
        "<p>In this lesson, we explore <strong>Date and Time Handling in JavaScript</strong>.</p><p>Working with dates in real-world applications involves handling diverse formats, time zones, UTC offsets, timestamps, and parsing. JavaScript's built-in <code>Date</code> object gives us complete control to create, parse, format, and compare dates reliably.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/0*UTyWOZjF_8xjzDQE",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-21-date-and-time-handling-in-javascript?file=script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-21-date-and-time-handling-in-javascript?file=script.js</a></p>',
    },

    // ── 1. Creating Dates ──
    { id: nextId(), type: "heading" as const, content: "1. Creating Dates" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>There are multiple ways to instantiate a <code>Date</code> object in JavaScript:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Current date and time
const now = new Date();
console.log('Now:', now);

// 2. Specific date components (YYYY, MonthIndex, DD) - Month is 0-indexed! (0 = Jan, 11 = Dec)
const jsCreated = new Date(1995, 11, 4); // December 4, 1995
console.log('JS Created:', jsCreated);

// 3. From ISO/date string
const fromString = new Date('2025-10-11T14:30:00');
console.log('From String:', fromString);

// 4. From Unix timestamp (milliseconds elapsed since Jan 1, 1970 UTC)
const fromTimestamp = new Date(1700000000000);
console.log('From Timestamp:', fromTimestamp);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Getting Date and Time Components ──
    { id: nextId(), type: "heading" as const, content: "2. Getting Date & Time Components" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Extract individual calendar and clock components using the getter methods:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const today = new Date();

console.log('Year:', today.getFullYear());
console.log('Month:', today.getMonth() + 1); // +1 because months are 0-11
console.log('Date:', today.getDate());       // Day of the month (1-31)
console.log('Hours:', today.getHours());
console.log('Minutes:', today.getMinutes());
console.log('Seconds:', today.getSeconds());
console.log('Day of Week:', today.getDay()); // 0 = Sunday, 6 = Saturday`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Setting Date and Time ──
    { id: nextId(), type: "heading" as const, content: "3. Setting Date and Time" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Modify date and time values dynamically with setter methods:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const meetingDate = new Date();

meetingDate.setFullYear(2026);
meetingDate.setMonth(2); // March (0=Jan, 1=Feb, 2=Mar)
meetingDate.setDate(10);
meetingDate.setHours(9, 30, 0);

console.log('Updated Meeting:', meetingDate);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Understanding Time Zones and UTC ──
    { id: nextId(), type: "heading" as const, content: "4. Understanding Time Zones & UTC" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>JavaScript dates store absolute timestamps in UTC internally, but string representations default to the user's local operating system timezone:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const zoneExample = new Date('2025-10-11T10:00:00Z'); // 'Z' denotes UTC

console.log('Local Time:', zoneExample.toString());
console.log('UTC Time:',   zoneExample.toUTCString());
console.log('ISO Format:', zoneExample.toISOString()); // Standard for backend APIs`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Comparing Dates & Differences ──
    { id: nextId(), type: "heading" as const, content: "5. Comparing Dates and Calculating Differences" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Subtracting two date objects automatically converts them into millisecond numbers, allowing easy calculation of duration:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `const start = new Date('2025-01-01');
const end = new Date('2025-12-31');

if (start < end) {
  console.log('Start comes before end');
}

const diffMs = end - start; // Difference in milliseconds
const diffDays = diffMs / (1000 * 60 * 60 * 24); // 1 day = 1000ms * 60s * 60m * 24h

console.log('Days Difference:', diffDays); // Output: 364`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. Formatting & Parsing Custom Dates ──
    { id: nextId(), type: "heading" as const, content: "6. Formatting and Parsing Custom Dates" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Custom display formats and bidirectional conversion back to JavaScript <code>Date</code> objects:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// 1. Format Date -> "DD/MM/YYYY HH:mm"
const formatDate = new Date('2025-10-11T17:45:00');
const formatted =
  formatDate.getDate() +
  '/' +
  (formatDate.getMonth() + 1) +
  '/' +
  formatDate.getFullYear() +
  ' ' +
  formatDate.getHours() +
  ':' +
  formatDate.getMinutes();

console.log('Formatted Date:', formatted); // "11/10/2025 17:45"

// 2. Parse Custom String back -> Date Object
function parseFormattedDate(str) {
  const [datePart, timePart] = str.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}

const parsedDate = parseFormattedDate('11/10/2025 17:45');
console.log('Parsed Date:', parsedDate);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 7. Measuring Execution Time ──
    { id: nextId(), type: "heading" as const, content: "7. Measuring Code Execution Time (Date.now())" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const taskStart = Date.now();

for (let i = 0; i < 1_000_000; i++) {
  // Heavy computation simulation
}

const taskEnd = Date.now();
console.log('Execution Time (ms):', taskEnd - taskStart);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 8. Real-world Example: Countdown ──
    { id: nextId(), type: "heading" as const, content: "8. Practical Example: Days Until New Year 🎉" },
    {
      id: nextId(),
      type: "code" as const,
      code: `const currentDay = new Date();
const nextNewYear = new Date(currentDay.getFullYear() + 1, 0, 1);
const msRemaining = nextNewYear - currentDay;
const daysRemaining = Math.floor(msRemaining / (1000 * 60 * 60 * 24));

console.log(\`Days until New Year: \${daysRemaining}\`);`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Conclusion ──
    { id: nextId(), type: "heading" as const, content: "Conclusion" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Managing dates and timestamps effectively is vital for calendars, countdown timers, token expiration tracking, and localized UI displays. Remember to always store and transmit dates in <strong>ISO / UTC format</strong> and only convert to local time when rendering for the end user.</p>",
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

    // 1. Find topic "javascript"
    const topic = await db.collection("topics").findOne({ name: /^javascript$/i });
    if (!topic) throw new Error('Topic "javascript" not found.');
    const topicId = topic.id as number;
    console.log(`✅ Found topic "${topic.name}" (id: ${topicId})`);

    // 2. Find section "Introduction"
    const section = await db.collection("sections").findOne({
      name: /^introduction$/i,
      topic_id: topicId,
    });
    if (!section) throw new Error('Section "Introduction" not found.');
    const sectionId = section.id as number;
    console.log(`✅ Found section "${section.name}" (id: ${sectionId})`);

    // 3. Create collection
    const collectionTitle = "Lesson 21: Date and Time Handling in JavaScript";
    const collectionId = await getNextSequence(client, "collections");
    await db.collection("collections").insertOne({
      id: collectionId,
      title: collectionTitle,
      topics_id: topicId,
      title_index: null,
    });
    console.log(`✅ Created collection "${collectionTitle}" (id: ${collectionId})`);

    // 4. Link section_collections
    const lastSc = await db.collection("section_collections").find({ sectionId }).sort({ order_no: -1 }).limit(1).toArray();
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 21;

    const scId = await getNextSequence(client, "section_collections");
    await db.collection("section_collections").insertOne({
      id: scId,
      sectionId,
      collectionId,
      topicId,
      order_no: nextOrder,
    });
    console.log(`✅ Linked section → collection (id: ${scId}, order: ${nextOrder})`);

    // 5. Create Blog
    const blogId = await getNextSequence(client, "blogs");
    const blocks = buildBlogBlocks();
    await db.collection("blogs").insertOne({
      id: blogId,
      heading: collectionTitle,
      content: blocks,
      collections_id: collectionId,
    });
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

    console.log("🎉 Done! JS Lesson 21 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
