import backfire from "firestore-backfire";
import { program } from "commander";
import { customAlphabet } from "nanoid/non-secure";

import { demoProject } from "./constants.mjs";

const { dataSourceFactory, importFirestoreData } = backfire;

/** @see https://github.com/firebase/firebase-js-sdk/blob/master/packages/firestore/src/util/misc.ts#L28 */
const docId = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  20,
);

function timestamp(date = new Date()) {
  const _seconds = Math.floor(date.getTime() / 1000);
  const _nanoseconds = date.getMilliseconds() * 1000;
  return { _seconds, _nanoseconds };
}

// --- data source ---

class TextReader {
  /** @param {string} path */
  constructor(path) {
    this.path = "[text]";
    this.data = path.replace("text://", "");
  }

  /** @param {(data: string) => void} onData */
  async read(onData) {
    onData(this.data);
  }
}

dataSourceFactory.register({
  id: "text",
  match: (path) => path.startsWith("text://"),
  reader: { useClass: TextReader },
});

/**
 * Import {@link backfire.SerializedFirestoreDocument} objects into Firestore.
 *
 * @param {backfire.SerializedFirestoreDocument[]} objects
 */
async function importDocuments(objects) {
  const data = objects.map((object) => JSON.stringify(object)).join("\n");
  await importFirestoreData(
    { emulator: true, project: demoProject },
    await dataSourceFactory.createReader(`text://${data}`),
    {},
  );
}

// --- program ---

// TODO: Add commands

// program
//   .command("")
//   .description("")
//   .action(async (name, id = name, { path }) => {
//     const documentId = docId();
//     await importDocuments([
//       {
//         path: `${path}/${id}`,
//         data: {},
//       },
//     ]);
//   });

program.parseAsync();
