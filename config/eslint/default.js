// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [".turbo/*", "build/*", "eslint.config.js", "vitest.config.mjs"],
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
);
