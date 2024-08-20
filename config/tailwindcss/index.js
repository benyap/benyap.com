// @ts-check

import merge from "deepmerge";
import { withAnimations } from "animated-tailwindcss";

/** @type {Partial<import("tailwindcss").Config>} */
const baseConfig = {
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#F5F8FA",
          100: "#E3E6E8",
          200: "#D3D9DF",
          300: "#A6B1BB",
          400: "#68737F",
          500: "#49545F",
          800: "#2F353B",
          black: "#2C2F32",
        },
        highlight: {
          100: "#C1E0F6",
          300: "#269FDD",
          400: "#0284C7",
          500: "#1A78A8",
          700: "#38657C",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

/** @type {(config: import("tailwindcss").Config) => import("tailwindcss").Config} */
export const mergeConfig = (config) => {
  const mergedConfig = merge(config, baseConfig);
  // See https://github.com/brc-dd/animated-tailwindcss/issues/217
  // @ts-expect-error
  return withAnimations(mergedConfig);
};
