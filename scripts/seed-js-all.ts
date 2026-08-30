/**
 * Master Runner Script: Executes all JavaScript Seed Scripts (Lesson 1 to 75+) in sequential order.
 *
 * Usage:
 *   LOCAL:
 *     npx tsx scripts/seed-js-all.ts
 *
 *   PRODUCTION:
 *     MONGODB_URI="mongodb://<user>:<pwd>@<host>:<port>" MONGODB_DB_NAME="u816628190_yuvidev" npx tsx scripts/seed-js-all.ts
 */

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const scriptsDir = path.resolve(__dirname);

function getAllJsLessonScripts(): { lessonNum: number; filename: string; fullPath: string }[] {
  const files = fs.readdirSync(scriptsDir);
  const pattern = /^seed-js-lesson(\d+)\.ts$/;

  const matched = files
    .map((file) => {
      const match = file.match(pattern);
      if (match) {
        return {
          lessonNum: parseInt(match[1], 10),
          filename: file,
          fullPath: path.join(scriptsDir, file),
        };
      }
      return null;
    })
    .filter((item): item is { lessonNum: number; filename: string; fullPath: string } => item !== null);

  // Sort numerically so Lesson 1 runs before Lesson 2, Lesson 10 runs after Lesson 9, etc.
  matched.sort((a, b) => a.lessonNum - b.lessonNum);
  return matched;
}

async function main() {
  const scripts = getAllJsLessonScripts();

  console.log("=========================================================");
  console.log(`🚀 Found ${scripts.length} JavaScript seed scripts to execute sequentially`);
  console.log(`📦 Target Database: ${process.env.MONGODB_DB_NAME ?? "devfullstack"}`);
  console.log(`🔗 MongoDB URI:     ${process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017"}`);
  console.log("=========================================================\n");

  let successCount = 0;
  let failCount = 0;
  const failedLessons: number[] = [];

  const startTime = Date.now();

  for (const script of scripts) {
    console.log(`▶️ [${script.lessonNum}/${scripts[scripts.length - 1].lessonNum}] Executing ${script.filename}...`);
    try {
      execSync(`npx tsx "${script.fullPath}"`, {
        stdio: "inherit",
        env: process.env,
      });
      successCount++;
      console.log(`✅ [Lesson ${script.lessonNum}] Completed successfully.\n`);
    } catch (error) {
      failCount++;
      failedLessons.push(script.lessonNum);
      console.error(`❌ [Lesson ${script.lessonNum}] Failed to execute ${script.filename}\n`);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n=========================================================");
  console.log("📊 JS Seed Execution Summary");
  console.log("=========================================================");
  console.log(`Total Scripts Found: ${scripts.length}`);
  console.log(`✅ Succeeded:         ${successCount}`);
  console.log(`❌ Failed:            ${failCount}`);
  console.log(`⏱️ Duration:          ${durationSec}s`);

  if (failedLessons.length > 0) {
    console.log(`⚠️ Failed Lessons:    ${failedLessons.join(", ")}`);
    process.exit(1);
  } else {
    console.log("🎉 All JavaScript lesson scripts executed perfectly in order!");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
