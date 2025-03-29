/**
 * @type {import("@commitlint/types").UserConfig}
 * @see https://github.com/conventional-changelog/commitlint#readme
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0, "never"],
    "body-case": [0, "never"],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "deps", "revert", "wip"],
    ],
  },
};
