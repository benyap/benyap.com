// See https://vercel.com/docs/environment-variables/system-environment-variables

export const VERCEL_ENV = process.env["VERCEL_ENV"];

export const VERCEL_PROJECT_PRODUCTION_URL =
  process.env["VERCEL_PROJECT_PRODUCTION_URL"];

export function isProduction() {
  return VERCEL_ENV === "production";
}
