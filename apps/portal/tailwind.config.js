import { mergeConfig } from "@config/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default mergeConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
});
