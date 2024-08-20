const { readFileSync } = require("fs");

/**
 * Read a package.json file at the specified path.
 *
 * @param {string} path
 * @returns {{
 *  packageJson:{
 *    dependencies: Record<string, string>,
 *    devDependencies: Record<string, string>, [key: string]: any
 *  };
 *  packageJsonString: string;
 * }}
 */
function readPackageJson(path) {
  const packageJsonString = readFileSync(path).toString();
  const packageJson = JSON.parse(packageJsonString);
  return { packageJson, packageJsonString };
}

/**
 * Extract any packages from dependencies and devDependencies
 * that have a version of "*".
 *
 * @param {{
 *  dependencies: Record<string, string>,
 *  devDependencies: Record<string, string>, [key: string]: any
 * }} packageJson
 * @returns {{
 *  dependencies: [string, string][],
 *  devDependencies: [string, string][]
 * }}
 */
function extractCustomDependencies(packageJson) {
  const dependencies = Object.entries(packageJson.dependencies).filter(
    ([, version]) => version === "*" || version === "workspace:*",
  );
  const devDependencies = Object.entries(packageJson.devDependencies).filter(
    ([, version]) => version === "*" || version === "workspace:*",
  );
  return { dependencies, devDependencies };
}

module.exports = {
  readPackageJson,
  extractCustomDependencies,
};
