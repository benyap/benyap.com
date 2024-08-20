"use server";

import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { DEFAULT_MAX_AGE, SESSION_COOKIE_NAME } from "./constants";
import { assertValidRedirectPath } from "./redirectPath";

/**
 * Server action for signing in a user using their Firebase Auth ID token.
 *
 * @param options Sign in options.
 * @param formData The request's form data, which should contain a `token` field with the user's Firebase Auth ID token.
 */
export async function signInWithIDToken(
  options: {
    /** Options for the session cookie. */
    cookie?: Partial<Omit<ResponseCookie, "name" | "value">>;
    /** Specify the path to redirect to after a sign in. Defaults to "/". */
    redirect?: string;
  },
  formData: FormData,
) {
  const { cookie: cookieOptions, redirect: redirectPath = "/" } = options;
  const auth = getAuth();

  const token = formData.get("token")?.toString() ?? "";

  const maxAge = cookieOptions?.maxAge || DEFAULT_MAX_AGE;
  const cookie = await auth.createSessionCookie(token, {
    expiresIn: maxAge * 1000,
  });

  cookies().set(SESSION_COOKIE_NAME, cookie, {
    sameSite: "strict",
    httpOnly: true,
    maxAge,
    ...cookieOptions,
  });

  redirect(assertValidRedirectPath(redirectPath));
}
