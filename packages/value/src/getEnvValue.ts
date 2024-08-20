import { Value } from "./Value";

/**
 * Get an environment value.
 */
export function getEnvValue(key: string): Value<string | undefined>;

/**
 * Get an environment value, and use the fallback value if the environment value is not defined.
 */
export function getEnvValue(key: string, fallback: string): Value<string>;

// Implementation
export function getEnvValue(key: string, fallback?: string) {
  const value = process.env[key];
  return Value.from(
    typeof value === "undefined" ? fallback : value,
    key,
    "env",
  );
}
