import { MongoClient } from "mongodb";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const sqlPath = process.argv[2] ?? "u816628190_yuvidev.sql";
const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME ?? process.env.DB_NAME ?? "u816628190_yuvidev";
const tables = ["topics", "collections", "sections", "section_collections", "blogs"];

if (!existsSync(sqlPath)) {
  console.error(`SQL file not found: ${sqlPath}`);
  process.exit(1);
}

const splitRows = (input) => {
  const rows = [];
  let current = "";
  let inString = false;
  let depth = 0;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (inString) {
      current += char;
      if (char === "\\" && next !== undefined) {
        current += next;
        i += 1;
      } else if (char === "'" && next === "'") {
        current += next;
        i += 1;
      } else if (char === "'") {
        inString = false;
      }
      continue;
    }

    if (char === "'") {
      inString = true;
      current += char;
      continue;
    }

    if (char === "(") {
      depth += 1;
      if (depth > 1) current += char;
      continue;
    }

    if (char === ")") {
      depth -= 1;
      if (depth === 0) {
        rows.push(current.trim());
        current = "";
      } else {
        current += char;
      }
      continue;
    }

    if (depth > 0) {
      current += char;
    }
  }

  return rows;
};

const splitValues = (row) => {
  const values = [];
  let current = "";
  let inString = false;

  for (let i = 0; i < row.length; i += 1) {
    const char = row[i];
    const next = row[i + 1];

    if (inString) {
      current += char;
      if (char === "\\" && next !== undefined) {
        current += next;
        i += 1;
      } else if (char === "'" && next === "'") {
        current += next;
        i += 1;
      } else if (char === "'") {
        inString = false;
      }
      continue;
    }

    if (char === "'") {
      inString = true;
      current += char;
      continue;
    }

    if (char === ",") {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const parseString = (value) => {
  let output = "";
  for (let i = 1; i < value.length - 1; i += 1) {
    const char = value[i];
    const next = value[i + 1];

    if (char === "\\" && next !== undefined) {
      const escapes = { 0: "\0", b: "\b", n: "\n", r: "\r", t: "\t", Z: "\u001a" };
      output += escapes[next] ?? next;
      i += 1;
    } else if (char === "'" && next === "'") {
      output += "'";
      i += 1;
    } else {
      output += char;
    }
  }
  return output;
};

const parseValue = (value) => {
  if (/^null$/i.test(value)) return null;
  if (value.startsWith("'") && value.endsWith("'")) return parseString(value);
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
};

const splitSqlStatements = (sql) => {
  const statements = [];
  let current = "";
  let inString = false;

  for (let i = 0; i < sql.length; i += 1) {
    const char = sql[i];
    const next = sql[i + 1];
    current += char;

    if (inString) {
      if (char === "\\" && next !== undefined) {
        current += next;
        i += 1;
      } else if (char === "'" && next === "'") {
        current += next;
        i += 1;
      } else if (char === "'") {
        inString = false;
      }
      continue;
    }

    if (char === "'") {
      inString = true;
      continue;
    }

    if (char === ";") {
      statements.push(current.trim());
      current = "";
    }
  }

  if (current.trim()) {
    statements.push(current.trim());
  }

  return statements;
};

const parseSqlDump = async () => {
  const sql = await readFile(sqlPath, "utf8");
  const data = Object.fromEntries(tables.map((table) => [table, []]));
  const insertPattern = /INSERT INTO `([^`]+)` \(([^)]+)\) VALUES\s*([\s\S]*);$/;

  for (const statement of splitSqlStatements(sql)) {
    const match = statement.match(insertPattern);
    if (!match) continue;

    const [, table, rawColumns, rawRows] = match;
    if (!tables.includes(table)) continue;

    const columns = rawColumns.split(",").map((column) => column.trim().replaceAll("`", ""));
    splitRows(rawRows).forEach((row) => {
      const values = splitValues(row).map(parseValue);
      const document = Object.fromEntries(columns.map((column, index) => [column, values[index]]));
      data[table].push(document);
    });
  }

  data.blogs = data.blogs.map((blog) => {
    try {
      return { ...blog, content: JSON.parse(blog.content ?? "[]") };
    } catch {
      return { ...blog, content: [] };
    }
  });

  data.counters = tables.map((table) => ({
    _id: table,
    seq: data[table].reduce((max, item) => Math.max(max, Number(item.id) || 0), 0),
  }));

  return data;
};

const data = await parseSqlDump();
const client = new MongoClient(mongoUri);

try {
  await client.connect();
  const db = client.db(dbName);

  for (const [collection, documents] of Object.entries(data)) {
    await db.collection(collection).deleteMany({});

    if (documents.length > 0) {
      await db.collection(collection).insertMany(documents);
    }

    console.log(`Imported ${documents.length} ${collection} document(s).`);
  }

  console.log(`Migrated ${tables.map((table) => `${data[table].length} ${table}`).join(", ")} into ${dbName}.`);
} finally {
  await client.close();
}
