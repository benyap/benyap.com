#!/usr/bin/env node

const { writeFileSync, rmSync } = require("fs");

const { readPackageJson } = require("./utils/dependencies");

function main() {
  const [, , directory] = process.argv;
  if (typeof directory !== "string") throw new Error("Directory not provided.");

  const packageJsonPath = `${directory}/package.json`;
  const packageDirectory = `${directory}/.packages`;

  // Restore package.json
  const { packageJsonString } = readPackageJson(
    `${packageDirectory}/package.json.backup`,
  );
  writeFileSync(packageJsonPath, packageJsonString);
  console.log(`Restored ${packageJsonPath}`);

  // Clear package directory
  rmSync(packageDirectory, { recursive: true, force: true });
  console.log(`Cleared ${packageDirectory}`);
}

main();
