// See https://vercel.com/docs/environment-variables/system-environment-variables

export const APP_ENV = process.env.VERCEL_ENV ?? "local";

export const APP_HOST =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "localhost:3001";

export function isProduction() {
  return APP_ENV === "production";
}
