// @ts-check

const tseslint = require("typescript-eslint");
const defaultConfig = require("./default");

module.exports = tseslint.config(
  ...defaultConfig,
  {
    ignores: [
      ".next/*",
      "next.config.js",
      "postcss.config.js",
      "tailwind.config.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
);
