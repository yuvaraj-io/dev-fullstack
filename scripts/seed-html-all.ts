/**
 * Master Seed Script: HTML Lessons 1 to 17
 *
 * Runs all individual seed scripts sequentially in order (Lesson 1 through Lesson 17).
 *
 * Usage:
 *   LOCAL / ENV:  npx tsx scripts/seed-html-all.ts
 *   CUSTOM DB:    MONGODB_URI="mongodb://..." MONGODB_DB_NAME="..." npx tsx scripts/seed-html-all.ts
 */

import { execSync } from "child_process";
import path from "path";

const scripts = [
  "seed-html-lesson1.ts",
  "seed-html-lesson2.ts",
  "seed-html-lesson3.ts",
  "seed-html-lesson4.ts",
  "seed-html-lesson5.ts",
  "seed-html-lesson6.ts",
  "seed-html-lesson7.ts",
  "seed-html-lesson8.ts",
  "seed-html-lesson9.ts",
  "seed-html-lesson10.ts",
  "seed-html-lesson11.ts",
  "seed-html-lesson12.ts",
  "seed-html-lesson13.ts",
  "seed-html-lesson14.ts",
  "seed-html-lesson15.ts",
  "seed-html-lesson16.ts",
  "seed-html-lesson17.ts",
];

async function runAll() {
  console.log("==================================================");
  console.log("🚀 Starting Bulk HTML Lessons Seed (1 to 17)...");
  console.log("==================================================\n");

  const cwd = path.resolve(__dirname, "..");

  for (const script of scripts) {
    const scriptPath = path.join("scripts", script);
    console.log(`\n▶️  Executing: ${scriptPath}...`);
    try {
      execSync(`npx tsx ${scriptPath}`, {
        cwd,
        stdio: "inherit",
        env: process.env,
      });
      console.log(`✅ Finished: ${script}`);
    } catch (error) {
      console.error(`❌ Error running ${scriptPath}:`, error);
      process.exit(1);
    }
  }

  console.log("\n==================================================");
  console.log("🎉 All 17 HTML Lessons Seeded Successfully!");
  console.log("==================================================");
}

runAll();
