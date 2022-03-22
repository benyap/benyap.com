import { green } from "ansi-colors";
import { existsSync, mkdirSync } from "fs";

import { Logger } from "./log";

export function createDirectory(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
    Logger.debug(`Created directory ${green(path)}`);
  }
}
