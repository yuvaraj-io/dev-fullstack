/**
 * Master Seed Script: Runs all CSS Lesson seed scripts in sequential order (1 to 25)
 *
 * Usage:
 *   LOCAL:
 *     npx tsx scripts/seed-all-css.ts
 *
 *   PRODUCTION:
 *     MONGODB_URI="mongodb://..." MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-all-css.ts
 */

import { execSync } from "child_process";
import path from "path";

const lessons = Array.from({ length: 25 }, (_, i) => i + 1); // 1 to 25

console.log("==================================================");
console.log("🚀 Running Master CSS Seed (Lessons 1 to 25)");
console.log("==================================================\n");

for (const lesson of lessons) {
  const scriptName = `seed-css-lesson${lesson}.ts`;
  const scriptPath = path.join(__dirname, scriptName);
  console.log(`\n▶️  [${lesson}/25] Executing: ${scriptName}...`);
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
console.log("🎉 All 25 CSS Lessons seeded successfully!");
console.log("==================================================");
