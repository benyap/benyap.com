#!/usr/bin/env node

const { execSync } = require("child_process");
const { rmSync, mkdirSync, writeFileSync, existsSync } = require("fs");

const {
  readPackageJson,
  extractCustomDependencies,
} = require("./utils/dependencies");

function main() {
  const [, , directory] = process.argv;
  if (typeof directory !== "string") throw new Error("Directory not provided.");

  const ts = Date.now();
  const packageJsonPath = `${directory}/package.json`;
  const packageDirectory = `${directory}/.packages`;

  // Clear package directory
  rmSync(packageDirectory, { recursive: true, force: true });
  mkdirSync(`${packageDirectory}/${ts}`, { recursive: true });

  // Find dependencies to prepare
  const { packageJson, packageJsonString } = readPackageJson(packageJsonPath);
  const { dependencies, devDependencies } =
    extractCustomDependencies(packageJson);

  // Pack dependencies
  const allDependencies = new Set(
    dependencies.concat(devDependencies).map(([dependency]) => dependency),
  );

  console.log("Packing", allDependencies.size, "dependencies");
  console.log(Array.from(allDependencies));

  // Use an NPM implementation for best portability
  for (const dependency of allDependencies) {
    const [, packageName] = dependency.split("/");
    const npmPackageName = dependency.replace("@", "").replace("/", "-");
    execSync(
      [
        `cd ${dependency}`,
        `npm pack --pack-destination ../../${packageDirectory}/${ts}`,
        `mv ../../${packageDirectory}/${ts}/${npmPackageName}-0.0.0.tgz ../../${packageDirectory}/${packageName}-${ts}.tgz`,
      ].join(" && "),
    );
  }

  // Set custom package to use packed versions
  for (const [key] of dependencies) {
    const [, packageName] = key.split("/");
    packageJson.dependencies[key] = `./.packages/${packageName}-${ts}.tgz`;
  }
  for (const [key] of devDependencies) {
    const [, packageName] = key.split("/");
    packageJson.devDependencies[key] = `./.packages/${packageName}-${ts}.tgz`;
  }

  console.log("Updating dependencies");
  console.log(dependencies);
  console.log("Updating devDependencies");
  console.log(devDependencies);

  // Update package.json file
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Back up package.json
  const backupPath = `${packageDirectory}/package.json.backup`;
  if (existsSync(backupPath)) {
    console.log("Existing package.json backup exists at", backupPath);
  } else {
    writeFileSync(backupPath, packageJsonString);
    console.log("Backed up package.json to", backupPath);
  }
}

main();
