const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const tailwindRadix = require("tailwindcss-radix");

module.exports = {
  content: ["./src/**/*.tsx", "../../packages/ui/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          light: "#F8F8F8",
          dark: "#2F353B",
          "dark-300": "#3E464E",
          "dark-400": "#2F353B",
          "dark-500": "#272C31",
        },
        github: {
          black: "#24292F",
          white: "#F0F6FC",
        },
        linkedin: {
          blue: "#0A66C2",
        },
      },
    },
  },
  plugins: [
    // Add utility for disabling transitions during a theme change
    plugin(({ addUtilities }) => {
      addUtilities({
        ".disable-transitions, .disable-transitions *": {
          transition: "none !important",
        },
      });
    }),
    // Add utilities for styling with Radix UI
    tailwindRadix({
      variantPrefix: "rdx",
      skipAttributeNames: true,
    }),
  ],
};
