/**
 * Asserts that the given path is a valid redirect path.
 *
 * If an invalid redirect path is given, a warning is logged
 * and the path "/" will be returned.
 *
 * A valid redirect path must start with "/".
 *
 * @param redirectPath The redirect path to assert.
 */
export function assertValidRedirectPath(redirectPath: string): string {
  if (redirectPath.startsWith("/")) return redirectPath;
  console.warn(`Invalid redirect path "${redirectPath}". Falling back to "/"`);
  return "/";
}

/**
 * Get a valid redirect path from a {@link FormData} object.
 *
 * A valid redirect path must start with "/".
 */
export function getRedirectPath(
  formData: FormData,
  options: {
    /** The name of the field containing the redirect path in the form data. Defaults to "redirect". */
    name?: string;
    /** The fallback path to use if none is available. Defaults to "/". */
    fallback?: string;
  } = {},
): string {
  const { name = "redirect", fallback = "/" } = options;
  const redirect = formData.get(name)?.toString() || fallback;
  return assertValidRedirectPath(redirect);
}
