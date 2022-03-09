const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx", "../../packages/ui/components/**/*.tsx"],
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
        },
        linkedin: {
          blue: "#0A66C2",
        },
      },
    },
  },
  plugins: [],
};
