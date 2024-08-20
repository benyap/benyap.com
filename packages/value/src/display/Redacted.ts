import { inspect } from "util";
import { red } from "ansi-colors";

export class RedactedDisplay {
  static create() {
    return new RedactedDisplay() as RedactedDisplay | string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  inspect() {
    return this[inspect.custom]();
  }

  [inspect.custom]() {
    return red("<redacted>");
  }
}
