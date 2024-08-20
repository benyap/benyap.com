import backfire from "firestore-backfire";
import { program } from "commander";
import { readFile, unlink, writeFile } from "fs/promises";

import { demoProject, devProject, prodProject } from "./constants.mjs";

const { dataSourceFactory, exportFirestoreData, importFirestoreData } =
  backfire;

const root = "data";
const projects = ["emulator", "dev", "prod"];
const collections = [];
const ignore = [/\/submissions\//];

// --- helper functions ---

async function toJSON(path) {
  const buffer = await readFile(path);
  const lines = buffer
    .toString()
    .split("\n")
    .filter((x) => x)
    .map((line) => JSON.parse(line));

  const output = path.replace(".ndjson", ".json");
  await writeFile(output, JSON.stringify(lines, null, 2));

  console.log();
  console.log("Converted", path, "to", output);
  console.log();
}

async function toNDJSON(path) {
  const buffer = await readFile(path);
  const array = JSON.parse(buffer.toString());
  const lines = array.map((object) => JSON.stringify(object));

  const output = path.replace(".json", ".ndjson");
  await writeFile(output, lines.join("\n"));

  console.log();
  console.log("Converted", path, "to", output);
  console.log();
}

// --- program ---

program
  .command("export <collection>")
  .description("export a collection from the emulator")
  .action(async (collection) => {
    if (!collections.includes(collection))
      throw new Error(`Unsupported collection "${collection}"`);

    const path = `${root}/${collection}.ndjson`;
    const writer = await dataSourceFactory.createWriter(path);
    await exportFirestoreData(
      { project: demoProject, emulator: true },
      writer,
      {
        paths: [collection],
        overwrite: true,
        ignore,
      },
    );

    await toJSON(path);
    await unlink(path);
  });

program
  .command("seed <collection>")
  .option("--project <project>", "the Firebase project to seed", "emulator")
  .description("seed a Firestore database with local data")
  .action(async (collection, { project }) => {
    if (!collections.includes(collection))
      throw new Error(`Unsupported collection "${collection}"`);
    if (!projects.includes(project))
      throw new Error(`Unsupported project "${project}"`);

    await toNDJSON(`${root}/${collection}.json`);

    if (project === "emulator") project = demoProject;
    else if (project === "dev") project = devProject;
    else if (project === "prod") project = prodProject;

    const path = `${root}/${collection}.ndjson`;
    const reader = await dataSourceFactory.createReader(path);
    await importFirestoreData(
      { project, adc: true, emulator: project === demoProject },
      reader,
      { mode: "overwrite", ignore },
    );

    await unlink(path);
  });

program.parseAsync();
