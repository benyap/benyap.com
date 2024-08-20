// @ts-check
import eslint from "@eslint/js";
import tseslint, { config } from "typescript-eslint";

export default config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      ".turbo/*",
      "dist/*",
      "build/*",
      "eslint.config.mjs",
      "postcss.config.js",
      "tailwind.config.js",
    ],
  },
  {
    // Rule overrides for this config
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
);
