// @ts-check

import merge from "deepmerge";

/** @type {(config: import("tailwindcss").Config) => import("tailwindcss").Config} */
export const mergeConfig = (config) =>
  merge(config, {
    theme: {},
    plugins: [
      require("@tailwindcss/forms"),
      require("@tailwindcss/typography"),
      require("@tailwindcss/container-queries"),
    ],
  });
