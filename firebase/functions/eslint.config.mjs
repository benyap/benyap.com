// @ts-check
import eslint from "@eslint/js";
import tseslint, { config } from "typescript-eslint";

export default config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: ["build/*"],
  },
);
