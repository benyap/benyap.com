import type { FirebaseOptions } from "firebase/app";

/**
 * Exposes server-side environment variables.
 */
export class NodeEnv {}

/**
 * Exposes public environment variables.
 */
export class PublicEnv {
  static get TZ(): string {
    // See https://stackoverflow.com/a/34602679
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Australia/Melbourne";
  }

  static get FIREBASE_CONFIG(): FirebaseOptions {
    return JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "null");
  }
}
