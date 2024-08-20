// @ts-check
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "typescript-eslint";

import nextConfig, { createNextConfig } from "@config/eslint/next.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  ...createNextConfig(__dirname),
  ...config(...nextConfig, {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  }),
];
