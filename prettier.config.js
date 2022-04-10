/**
 * @type {import("prettier").Config}
 */
module.exports = {
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./apps/web/tailwind.config.js",
  // Formatting options
  printWidth: 88,
};
