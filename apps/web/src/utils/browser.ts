/**
 * Returns `true` if the code is currently executing in the browser.
 */
export function isBrowser() {
  return typeof window === "object";
}
