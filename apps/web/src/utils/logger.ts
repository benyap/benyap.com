import { blue, bold, cyan, green, magenta, red, stripColor, yellow } from "ansi-colors";
import format from "date-fns-tz/format";

import { PublicEnv } from "~/config/env";
import { isBrowser } from "~/utils/browser";

export type LogLevel = "debug" | "info" | "warn" | "error" | "success";

const OutputMap: Record<LogLevel, typeof console.log> = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  success: console.info,
};

const OutputTokenMap: Record<LogLevel, (x: string) => string> = {
  debug: (x) => bold(magenta(x)),
  warn: (x) => bold(yellow(x)),
  info: (x) => bold(cyan(x)),
  error: (x) => bold(red(x)),
  success: (x) => bold(green(x)),
};

export class Logger {
  private static instance = new Logger();

  static debug = Logger.instance.debug.bind(Logger.instance);
  static info = Logger.instance.info.bind(Logger.instance);
  static success = Logger.instance.success.bind(Logger.instance);
  static warn = Logger.instance.warn.bind(Logger.instance);
  static error = Logger.instance.error.bind(Logger.instance);

  constructor(private readonly context?: string) {}

  debug(message: any, ...optionalParams: any[]) {
    this.log("debug", message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.log("info", message, ...optionalParams);
  }

  success(message: any, ...optionalParams: any[]) {
    this.log("success", message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.log("warn", message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.log("error", message, ...optionalParams);
  }

  private log(
    level: "debug" | "info" | "warn" | "error" | "success",
    message: any,
    ...optionalParams: any[]
  ) {
    const logFunction = OutputMap[level];

    const date = new Date();
    const dateToken = format(date, "yyyy-MM-dd", { timeZone: PublicEnv.TZ });
    const timeToken = format(date, "HH:mm:ss.SSSX", { timeZone: PublicEnv.TZ });

    const preambleTokens: string[] = [];

    if (isBrowser()) preambleTokens.push(blue(timeToken));
    // Use the date and time on server only
    else preambleTokens.push(green(dateToken), blue(timeToken));

    preambleTokens.push(OutputTokenMap[level](level));

    if (this.context) preambleTokens.push(bold(this.context));

    if (isBrowser()) {
      logFunction(
        preambleTokens.join(" "),
        // Ensure all ANSI codes are stripped from browser output
        typeof message === "string" ? stripColor(message) : message,
        ...optionalParams.map((x) => (typeof x === "string" ? stripColor(x) : x))
      );
    } else {
      // On the server, colorize any warning or error messages
      const colorize =
        level === "warn" ? yellow : level === "error" ? red : (x: string) => x;
      logFunction(
        preambleTokens.join(" "),
        typeof message === "string" ? colorize(message) : message,
        ...optionalParams.map((x) => (typeof x === "string" ? colorize(x) : x))
      );
    }
  }
}
