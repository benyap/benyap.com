// @ts-check
import defaultTheme from "tailwindcss/defaultTheme";
import { mergeConfig } from "@config/tailwindcss";

const BASE_PX = 16;

/** @param {number} px The pixel size to convert to rem. */
const pxToRem = (px) => `${px / BASE_PX}rem`;

export default mergeConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontSize: {
      "display-base": [
        pxToRem(32),
        {
          fontWeight: 800,
          lineHeight: pxToRem(36),
        },
      ],
      "heading-lg": [
        pxToRem(32),
        {
          fontWeight: 800,
          lineHeight: pxToRem(36),
        },
      ],
      "heading-base": [
        pxToRem(24),
        {
          fontWeight: 800,
          lineHeight: pxToRem(28),
        },
      ],
      "heading-sm": [
        pxToRem(20),
        {
          fontWeight: 800,
          lineHeight: pxToRem(24),
        },
      ],
      lg: [
        pxToRem(16),
        {
          fontWeight: 500,
          lineHeight: pxToRem(22),
        },
      ],
      base: [
        pxToRem(14),
        {
          fontWeight: 500,
          lineHeight: pxToRem(20),
        },
      ],
      sm: [
        pxToRem(12),
        {
          fontWeight: 500,
          lineHeight: pxToRem(18),
        },
      ],
      "label-lg": [
        pxToRem(16),
        {
          fontWeight: 600,
          lineHeight: pxToRem(22),
        },
      ],
      "label-base": [
        pxToRem(14),
        {
          fontWeight: 600,
          lineHeight: pxToRem(20),
        },
      ],
    },
    borderRadius: {
      none: "0",
      sm: pxToRem(3),
      DEFAULT: pxToRem(6),
      md: pxToRem(9),
      lg: pxToRem(12),
      xl: pxToRem(15),
      full: "9999px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
});
