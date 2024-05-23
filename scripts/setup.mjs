import { mkdir } from "node:fs/promises";

const CI = process.env.CI;

/** @param {string} reason */
function ciSkipMsg(reason) {
  console.log(`Detected CI environment, ${reason}`);
}

async function main() {
  // Install husky
  if (CI) ciSkipMsg("skipping husky install");
  else {
    const husky = await import("husky");
    husky.default();
  }

  // Set up directories
  if (CI) ciSkipMsg("skipping directory setup");
  else {
    const directories = ["apps", "config", "packages"];
    await Promise.all(
      directories.map((directory) => mkdir(directory, { recursive: true })),
    );
  }
}

main();
