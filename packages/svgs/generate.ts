import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { transform } from "@svgr/core";
import FastGlob from "fast-glob";

import config from "./svgr.config";

const ASSETS_PATH = "assets";
const EXPORT_PATH = "build";
const COMPONENT_SUFFIX = "SVG";

function capitalise(word: string) {
  return word[0]?.toUpperCase() + word.slice(1);
}

async function main() {
  // Find all svgs
  const entries = FastGlob.sync(`${ASSETS_PATH}/**/*.svg`);

  // Transform svgs into jsx
  const components = await Promise.all(
    entries.map(async (entry) => {
      const segments = entry.replace(`${ASSETS_PATH}/`, "").split("/");
      const componentName =
        segments
          .filter((segment) => !/\(.+\)/.test(segment))
          .map(capitalise)
          .join("")
          .replace(".svg", "") + COMPONENT_SUFFIX;
      const svg = await readFile(entry, "utf-8");
      const jsx = await transform(svg, config, { componentName });
      return { name: componentName, jsx };
    }),
  );

  // Write jsx files
  await mkdir(EXPORT_PATH, { recursive: true });
  await Promise.all(
    components.map(async ({ name, jsx }) => {
      await writeFile(join(EXPORT_PATH, `${name}.tsx`), jsx);
    }),
  );

  // Generate index.tsx
  const exports: string[] = [];
  for (const { name } of components) {
    exports.push(`export { ${name} } from "./${name}";`);
  }
  await writeFile(join(EXPORT_PATH, "index.ts"), exports.join("\n"));

  console.log("🚀 Transformed", components.length, "SVGs");
}

main();
