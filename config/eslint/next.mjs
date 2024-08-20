// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { fixupPluginRules } from "@eslint/compat";
import { config } from "typescript-eslint";

import defaultConfig from "./default.mjs";

/**
 * Create config with Next.js plugins that are compatible with ESLint 9.
 *
 * @see https://eslint.org/blog/2024/05/eslint-compatibility-utilities/
 * @see https://blog.linotte.dev/eslint-9-next-js-935c2b6d0371
 *
 * @param {string} baseDirectory Pass the `__dirname` of the configuration file where this function is being used.
 */
export function createNextConfig(baseDirectory) {
  const compat = new FlatCompat({ baseDirectory });

  const PLUGINS_TO_PATCH = ["@next/next", "react", "react-hooks"];

  const patchedConfig = compat.extends("next/core-web-vitals").map((entry) => {
    const plugins = entry.plugins;
    for (const key in plugins) {
      if (plugins.hasOwnProperty(key) && PLUGINS_TO_PATCH.includes(key)) {
        plugins[key] = fixupPluginRules(plugins[key]);
      }
    }
    return entry;
  });

  return patchedConfig;
}

export default config(
  ...defaultConfig,
  {
    ignores: [".next/*", "next.config.mjs"],
  },
  {
    // Rule overrides for this config
    rules: {},
  },
);
