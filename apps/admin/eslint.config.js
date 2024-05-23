// @ts-check

const config = require("@config/eslint/default");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(...config, {
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
    },
  },
});
