// @ts-check
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "typescript-eslint";

import defaultConfig from "@config/eslint/default.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default config(...defaultConfig, {
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
    },
  },
});
