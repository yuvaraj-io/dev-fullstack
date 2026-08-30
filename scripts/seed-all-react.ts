/**
 * Master Seed Script: Runs all React Lesson seed scripts in sequential order (0 to 24)
 *
 * Usage:
 *   LOCAL:
 *     npx tsx scripts/seed-all-react.ts
 *
 *   PRODUCTION:
 *     MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-all-react.ts
 */

import { execSync } from "child_process";
import path from "path";

const lessons = Array.from({ length: 25 }, (_, i) => i); // 0 to 24

console.log("==================================================");
console.log("🚀 Running Master React Seed (Lessons 0 to 24)");
console.log("==================================================\n");

for (const lesson of lessons) {
  const scriptName = `seed-react-lesson${lesson}.ts`;
  const scriptPath = path.join(__dirname, scriptName);
  console.log(`\n▶️  [${lesson + 1}/25] Executing: ${scriptName}...`);
  try {
    execSync(`npx tsx "${scriptPath}"`, {
      stdio: "inherit",
      env: process.env,
    });
  } catch (error) {
    console.error(`❌ Failed at ${scriptName}`);
    process.exit(1);
  }
}

console.log("\n==================================================");
console.log("🎉 All 25 React Lessons seeded successfully!");
console.log("==================================================");
