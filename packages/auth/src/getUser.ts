"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type DecodedIdToken, getAuth } from "firebase-admin/auth";

import { SESSION_COOKIE_NAME } from "./constants";

/**
 * Check the `session` cookie for a user session on the server.
 * If the session exists, the user's details are returned.
 * Otherwise, `null` is returned.
 */
export async function getUser(): Promise<DecodedIdToken | null> {
  try {
    const session = cookies().get(SESSION_COOKIE_NAME)?.value ?? "";
    const user = await getAuth().verifySessionCookie(session, true);
    return user;
  } catch {
    return null;
  }
}

/**
 * Check the `session` cookie for a user session on the server.
 * If the session exists, the user's details are returned.
 * Otherwise, redirect to the specified url.
 */
export async function authenticate(
  redirectUrl: string,
): Promise<DecodedIdToken> {
  const user = await getUser();
  if (user) return user;
  redirect(redirectUrl);
}
