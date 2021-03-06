module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "deps", "docs", "chore", "tooling", "revert", "wip", "test"],
    ],
  },
};
