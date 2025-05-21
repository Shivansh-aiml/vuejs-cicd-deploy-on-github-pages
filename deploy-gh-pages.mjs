import { execa } from "execa";
import * as fs from "fs";
import * as path from "path";

const ghPagesPath = ".gh-pages-temp";

(async () => {
  try {
    if (fs.existsSync(ghPagesPath)) {
      console.log("🧹 Removing existing worktree...");
      await execa("git", ["worktree", "remove", ghPagesPath, "--force"]);
      if (fs.existsSync(ghPagesPath)) {
        fs.rmSync(ghPagesPath, { recursive: true, force: true });
      }
    }

    console.log("📦 Building project...");
    await execa("npm", ["run", "build"]);

    const folderName = fs.existsSync("dist") ? "dist" : "build";

    console.log("🌿 Creating worktree for gh-pages...");
    await execa("git", ["worktree", "add", ghPagesPath, "gh-pages"]);

    console.log("📁 Copying build output to worktree...");
    fs.rmSync(ghPagesPath, { recursive: true, force: true });
    fs.mkdirSync(ghPagesPath);
    fs.cpSync(folderName, ghPagesPath, { recursive: true });

    console.log("📤 Committing and pushing...");
    await execa("git", ["-C", ghPagesPath, "add", "--all"]);
    await execa("git", ["-C", ghPagesPath, "commit", "-m", "Deploy to gh-pages", "--allow-empty"]);
    await execa("git", ["-C", ghPagesPath, "push", "origin", "gh-pages", "--force"]);

    console.log("🧹 Cleaning up...");
    await execa("git", ["worktree", "remove", ghPagesPath, "--force"]);

    console.log("✅ Successfully deployed!");
  } catch (e) {
    console.error(`❌ Deployment failed: ${e.message}`);
    process.exit(1);
  }
})();
