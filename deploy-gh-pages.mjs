/* eslint-disable max-statements, no-process-exit, no-console */
import { execa } from "execa";
import * as fs from "fs";
import * as path from "path";

const ghPagesPath = ".gh-pages-temp";

(async () => {
  try {
    // Clean up previous temp dir if exists
    if (fs.existsSync(ghPagesPath)) {
      fs.rmSync(ghPagesPath, { recursive: true, force: true });
    }

    console.log("📦 Building project...");
    await execa("npm", ["run", "build"]);

    const folderName = fs.existsSync("dist") ? "dist" : "build";

    console.log("🌿 Creating worktree for gh-pages...");
    await execa("git", ["worktree", "add", ghPagesPath, "gh-pages"]);

    console.log("📁 Copying build output to worktree...");
    fs.rmSync(path.join(ghPagesPath), { recursive: true, force: true });
    fs.cpSync(folderName, ghPagesPath, { recursive: true });

    console.log("📤 Committing and pushing...");
    await execa("git", ["-C", ghPagesPath, "add", "--all"]);
    await execa("git", ["-C", ghPagesPath, "commit", "-m", "Deploy to gh-pages", "--allow-empty"]);
    await execa("git", ["-C", ghPagesPath, "push", "origin", "gh-pages", "--force"]);

    console.log("🧹 Cleaning up...");
    await execa("git", ["worktree", "remove", ghPagesPath, "--force"]);
    fs.rmSync(ghPagesPath, { recursive: true, force: true });

    console.log("✅ Successfully deployed!");
  } catch (e) {
    console.error(`❌ Deployment failed: ${e.message}`);
    process.exit(1);
  }
})();
