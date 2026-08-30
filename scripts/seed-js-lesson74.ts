/**
 * Seed Script: JavaScript "Lesson 74: Understanding Prototypes and Class Inheritance in JavaScript"
 *
 * Usage:
 *   LOCAL:       npx tsx scripts/seed-js-lesson74.ts
 *   PRODUCTION:  MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-lesson74.ts
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
        "<p>JavaScript is built on a <strong>prototypal inheritance model</strong> where every object maintains a hidden link (<code>[[Prototype]]</code> / <code>__proto__</code>) to a parent prototype object.</p><p>With ES6 classes, developers can express hierarchical relationships using classical keywords like <strong><code>extends</code></strong> and <strong><code>super()</code></strong>. In this lesson, we examine how class inheritance compiles directly into the prototype chain, how constructor initialization cascades through <code>super()</code>, and how multi-level inheritance functions across DOM and custom objects.</p>",
    },

    // ── Header Graphic ──
    {
      id: nextId(),
      type: "image" as const,
      image: "https://miro.medium.com/v2/resize:fit:700/1*xV6YHfg_bThCisqxKk0NmA.png",
      assetId: "",
      link: "",
      btn: "",
    },

    // ── StackBlitz Link ──
    {
      id: nextId(),
      type: "content" as const,
      content:
        '<p><strong>Try on StackBlitz:</strong> <a href="https://stackblitz.com/edit/lesson-74-prototypes-class-inheritance?file=index.html,script.js" target="_blank" rel="noopener noreferrer">https://stackblitz.com/edit/lesson-74-prototypes-class-inheritance?file=index.html,script.js</a></p>',
    },

    // ── 1. The Prototype Chain in the DOM ──
    { id: nextId(), type: "heading" as const, content: "1️⃣ Visualizing the Prototype Chain in the DOM" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Every object in JavaScript (including DOM nodes) forms a linked chain that terminates at the root <code>Object.prototype</code>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Inspecting an HTMLHeadingElement in browser console:
console.dir(document.querySelector('h1'));

/*
🔗 Prototype Chain Traversal:
HTMLHeadingElement 
  └─► HTMLElement 
        └─► Element 
              └─► Node 
                    └─► EventTarget 
                          └─► Object.prototype 
                                └─► null (end of chain)
*/`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 2. Base Class Definition ──
    { id: nextId(), type: "heading" as const, content: "2️⃣ Base Parent Class (User)" },
    {
      id: nextId(),
      type: "code" as const,
      code: `class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  getBirthYear() {
    return 2025 - this.age;
  }
}

const user1 = new User("John", "Doe", 25);
console.log(user1.fullName);       // "John Doe"
console.log(user1.getBirthYear()); // 2000`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 3. Class Inheritance with extends & super() ──
    { id: nextId(), type: "heading" as const, content: "3️⃣ Subclassing with 'extends' & 'super()'" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>To inherit from a parent class, use the <code>extends</code> keyword. Inside the derived class constructor, <strong><code>super()</code> must be called before accessing <code>this</code></strong>:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `class Student extends User {
  constructor(firstName, lastName, age, standard) {
    // 🔑 1. Call the parent class constructor
    super(firstName, lastName, age);
    
    // 🔑 2. Initialize subclass-specific properties
    this.standard = standard;
  }

  study() {
    console.log(\`\${this.fullName} is studying in \${this.standard} standard.\`);
  }
}

const student1 = new Student("Mike", "Tyson", 16, "10th");
student1.study(); // "Mike Tyson is studying in 10th standard."

// 🔍 Inherited from User parent class:
console.log("Birth Year:", student1.getBirthYear()); // 2009`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 4. Sibling Subclasses ──
    { id: nextId(), type: "heading" as const, content: "4️⃣ Reusing Base Features across Multiple Subclasses" },
    {
      id: nextId(),
      type: "code" as const,
      code: `class Employee extends User {
  constructor(firstName, lastName, age, company) {
    super(firstName, lastName, age);
    this.company = company;
  }

  work() {
    console.log(\`\${this.fullName} works at \${this.company}.\`);
  }
}

const emp1 = new Employee("Alice", "Brown", 28, "Google");
emp1.work(); // "Alice Brown works at Google."`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 5. Multi-Level Inheritance ──
    { id: nextId(), type: "heading" as const, content: "5️⃣ Multi-Level Inheritance Architecture" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<p>Classes can form deep multi-level inheritance hierarchies, passing down capabilities through each prototype link:</p>",
    },
    {
      id: nextId(),
      type: "code" as const,
      code: `// Level 1: Grandparent Class
class Person {
  live() {
    console.log("I'm alive! 🌱");
  }
}

// Level 2: Parent Class
class HumanUser extends Person {
  constructor(firstName, lastName) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

// Level 3: Child Class
class CollegeStudent extends HumanUser {
  constructor(firstName, lastName, major) {
    super(firstName, lastName);
    this.major = major;
  }
}

const s1 = new CollegeStudent("Ravi", "Kumar", "Computer Science");
s1.live(); // Output: "I'm alive! 🌱" (Inherited through 2 prototype levels)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── 6. The Prototype Chain Under the Hood ──
    { id: nextId(), type: "heading" as const, content: "6️⃣ Behind the Scenes: Prototypal Chain Mechanics" },
    {
      id: nextId(),
      type: "code" as const,
      code: `console.log(student1.__proto__ === Student.prototype); // ✅ true
console.log(Student.prototype.__proto__ === User.prototype); // ✅ true
console.log(User.prototype.__proto__ === Object.prototype);  // ✅ true
console.log(Object.prototype.__proto__);                     // null (end of chain)`,
      codeType: "javascript",
      link: "",
      btn: "",
    },

    // ── Summary Table ──
    { id: nextId(), type: "heading" as const, content: "✅ Class & Prototype Inheritance Summary" },
    {
      id: nextId(),
      type: "content" as const,
      content:
        "<table style=\"width:100%; border-collapse: collapse;\"><thead><tr style=\"border-bottom: 2px solid #ccc; text-align:left;\"><th style=\"padding:8px;\">Keyword / Concept</th><th style=\"padding:8px;\">Role &amp; Responsibility</th><th style=\"padding:8px;\">Underlying Mechanism</th></tr></thead><tbody><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>extends</code></td><td style=\"padding:8px;\">Establishes prototype inheritance between classes</td><td style=\"padding:8px;\">Sets <code>Child.prototype.__proto__ = Parent.prototype</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\"><code>super(...)</code></td><td style=\"padding:8px;\">Executes parent constructor with arguments</td><td style=\"padding:8px;\">Initializes parent properties onto child instance <code>this</code></td></tr><tr style=\"border-bottom: 1px solid #eee;\"><td style=\"padding:8px;\">Multi-Level Chain</td><td style=\"padding:8px;\">Allows cascaded inheritance across N tiers</td><td style=\"padding:8px;\">Traverses sequential <code>__proto__</code> links up to <code>Object</code></td></tr><tr><td style=\"padding:8px;\"><code>Object.prototype</code></td><td style=\"padding:8px;\">The universal root prototype in JavaScript</td><td style=\"padding:8px;\">Provides standard methods (<code>toString</code>, <code>hasOwnProperty</code>)</td></tr></tbody></table>",
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
    const collectionTitle = "Lesson 74: Understanding Prototypes and Class Inheritance in JavaScript";
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
    const nextOrder = lastSc.length > 0 ? (lastSc[0].order_no as number) + 1 : 74;

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

    console.log("🎉 Done! JS Lesson 74 blog post is now in your database.");
    console.log(`   View it at: /learn?id=${Buffer.from(String(topicId)).toString("base64")}&blog=${Buffer.from(String(collectionId)).toString("base64")}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
