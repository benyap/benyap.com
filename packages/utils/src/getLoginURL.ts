import { getCurrentURL } from "./getHeaders";

export type GetLoginURLOptions = {
  /** The login URL. Defaults to `/login`. */
  baseUrl?: string;
  /** Determines if the current path should be appended as a search parameter to the login URL. */
  returnToCurrentPath?:
    | boolean
    | {
        /** Specify the parameter name to use. Defaults to `redirect`. */
        parameterName?: string;
        /** Specify a list of paths that should not be appended. Defaults to `["/"]`. */
        ignorePaths?: string[];
      };
};

/**
 * Generate a login URL, with the current path optionally appended as a search parameter.
 *
 * If `returnToCurrentPath` behaviour is required, the current URL must be present as a header
 * so that {@link getCurrentURL} will return a valid URL.
 */
export function getLoginURL(options: GetLoginURLOptions = {}): string {
  const { baseUrl = "/login", returnToCurrentPath = false } = options;
  const { parameterName = "redirect", ignorePaths = ["/"] } =
    typeof returnToCurrentPath === "object" ? returnToCurrentPath : {};

  const pathname = getCurrentURL()?.pathname;
  if (!pathname || !returnToCurrentPath || ignorePaths.includes(pathname))
    return baseUrl;

  const searchParams = new URLSearchParams();
  searchParams.append(parameterName, pathname);

  return baseUrl + "?" + searchParams;
}
