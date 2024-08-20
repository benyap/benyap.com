declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface ProcessEnv {
      NODE_ENV?: "development" | "production";
      FORCE_COLOR?: unknown;
    }
  }
}

export {};
