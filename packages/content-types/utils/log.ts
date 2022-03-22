import { bold, magenta, cyan, yellow, red, green } from "ansi-colors";

export class Logger {
  static debug(...data: any) {
    console.log(bold(magenta("debug")), ...data);
  }

  static info(...data: any) {
    console.log(bold(cyan("info")), ...data);
  }

  static warn(...data: any) {
    console.log(bold(yellow("warn")), ...data);
  }

  static error(...data: any) {
    console.log(bold(red("info")), ...data);
  }

  static success(...data: any) {
    console.log(bold(green("success")), ...data);
  }

  static fail(...data: any) {
    console.log(bold(red("fail")), ...data);
  }
}
