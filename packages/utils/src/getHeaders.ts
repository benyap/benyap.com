import { headers } from "next/headers";

/**
 * Get the CSRF token from the header.
 */
export function getCsrfToken() {
  return headers().get("X-CSRF-Token") ?? "";
}

/**
 * Get the current URL from the request headers.
 * If no value is specified in the request headers,
 * or if it contains an invalid URL, `null` is returned.
 */
export function getCurrentURL(): URL | null {
  const href = headers().get("X-Current-Url");
  try {
    if (href) return new URL(href);
  } catch {
    // do nothing if the URL is invalid
  }
  return null;
}
