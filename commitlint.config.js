/**
 * @type {import("@commitlint/types").UserConfig}
 * @see https://github.com/conventional-changelog/commitlint#readme
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore"]],
  },
};
