#!/usr/bin/env tsx

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { transform } from "@svgr/core";
import FastGlob from "fast-glob";
import { watch } from "chokidar";
import { format } from "prettier";

import config from "./svgr.config";

const [, , ...FLAGS] = process.argv;

function findBooleanFlag(flag: string, defaultValue = false) {
  if (FLAGS.includes(flag)) return true;
  return defaultValue;
}

const WATCH = findBooleanFlag("--watch");

function findStringFlag(flag: string, defaultValue: string) {
  const match = FLAGS.find((value) => value.startsWith(flag));
  if (match) {
    const DELIMITER = "=";
    const [, ...value] = match.split(DELIMITER);
    return value.join(DELIMITER);
  }
  return defaultValue ?? null;
}

const SVGS_PATH = findStringFlag("--src", "assets/icons");
const OUTPUT_PATH = findStringFlag("--out", "src/components/icons");
const COMPONENT_SUFFIX = findStringFlag("--suffix", "Icon");

function capitalise(word: string) {
  return word[0]?.toUpperCase() + word.slice(1);
}

function sanitise(word: string) {
  return word.replace(/[^a-z.]/gi, "");
}

async function getAllSvgPaths() {
  return FastGlob.sync(`${SVGS_PATH}/**/*.svg`);
}

async function getAllOutputPaths() {
  return FastGlob.sync(`${OUTPUT_PATH}/**/*.tsx`);
}

function svgPathToOutput(svgPath: string) {
  const segments = svgPath.replace(`${SVGS_PATH}/`, "").split("/");
  const componentName =
    segments
      .filter((segment) => !/\(.+\)/.test(segment))
      .map((word) => word.split(" ").map(capitalise).map(sanitise).join(""))
      .join("")
      .replace(".svg", "") + COMPONENT_SUFFIX;
  return {
    svgPath,
    componentName,
  };
}

async function transformSvg(options: {
  svgPath: string;
  componentName: string;
}) {
  const { svgPath, componentName } = options;
  const svg = await readFile(svgPath, "utf-8");
  const content =
    svg.length === 0 ? "" : await transform(svg, config, { componentName });
  return {
    content: await format(content, { parser: "babel-ts" }),
    filename: `${componentName}.tsx`,
  };
}

async function generateIndexFile(componentNames: string[]) {
  const content = componentNames
    .map((name) => `export { ${name} } from "./${name}";`)
    .join("\n");
  return {
    content: await format(content, { parser: "babel-ts" }),
    filename: "index.ts",
  };
}

async function writeToOutput(options: { content: string; filename: string }) {
  const { content, filename } = options;
  await mkdir(OUTPUT_PATH, { recursive: true });
  await writeFile(join(OUTPUT_PATH, filename), content);
}

async function removeFromOutput(filename: string) {
  let path = filename;
  if (!filename.startsWith(OUTPUT_PATH)) path = join(OUTPUT_PATH, filename);
  await rm(path, { force: true });
}

// #region runners

async function transformAll() {
  const paths = await getAllSvgPaths();
  const outputs = paths.map(svgPathToOutput);
  const transforms = outputs.map(transformSvg);
  const writes = transforms.map((t) => t.then(writeToOutput));

  const components = outputs.map((o) => o.componentName);
  const indexFile = generateIndexFile(components).then(writeToOutput);
  writes.push(indexFile);

  await Promise.all(writes);

  return paths;
}

async function removeUnrecognised() {
  const paths = await getAllSvgPaths();
  const outputs = await getAllOutputPaths();

  const expectedOutputs = paths.map(svgPathToOutput);

  const unrecognisedOutputs = outputs.filter(
    (path) =>
      !expectedOutputs.find(({ componentName }) =>
        path.endsWith(`${componentName}.tsx`),
      ),
  );

  await Promise.all(unrecognisedOutputs.map(removeFromOutput));

  return unrecognisedOutputs;
}

async function transformSingle(path: string) {
  const output = svgPathToOutput(path);
  const transform = await transformSvg(output);

  const allPaths = await getAllSvgPaths();
  const components = allPaths.map(svgPathToOutput).map((o) => o.componentName);
  const indexFile = await generateIndexFile(components);

  await Promise.all([writeToOutput(transform), writeToOutput(indexFile)]);

  return output.componentName;
}

async function removeSingle(path: string) {
  const { componentName } = svgPathToOutput(path);
  await removeFromOutput(`${componentName}.tsx`);

  const allPaths = await getAllSvgPaths();
  const components = allPaths.map(svgPathToOutput).map((o) => o.componentName);
  const indexFile = await generateIndexFile(components);
  await writeToOutput(indexFile);

  return componentName;
}

// #endregion

transformAll()
  .then((paths) => {
    console.log("🚀 Transformed", paths.length, "SVGs");
  })
  .then(() => removeUnrecognised())
  .then((paths) => {
    if (paths.length > 0) console.log("🗑️  Removed unrecognised files", paths);
    console.log();
  })
  .then(() => {
    if (!WATCH) return;

    console.log("👀 Watching for changes in", SVGS_PATH);
    console.log();

    const watcher = watch(SVGS_PATH, { ignoreInitial: true });

    watcher.on("add", async (path: string) => {
      if (!path.endsWith(".svg")) return;
      const componentName = await transformSingle(path);
      console.log("🚀 Transformed", componentName);
    });

    watcher.on("change", async (path: string) => {
      if (!path.endsWith(".svg")) return;
      const componentName = await transformSingle(path);
      console.log("🚀 Transformed", componentName);
    });

    watcher.on("unlink", async (path: string) => {
      if (!path.endsWith(".svg")) return;
      const componentName = await removeSingle(path);
      console.log("🗑️  Removed", componentName);
    });
  });
