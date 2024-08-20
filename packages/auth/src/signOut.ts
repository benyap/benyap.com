"use server";

import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUser } from "./getUser";
import { SESSION_COOKIE_NAME } from "./constants";

/**
 * Server action for signing out the user by revoking their
 * Firebase tokens and deleting their `session` cookie.
 *
 * @param formData Use {@link FormData} to specify a `redirect` field to specify a path to redirect to after signing out.
 */
export async function signOut(formData: FormData) {
  const user = await getUser();
  if (user) await getAuth().revokeRefreshTokens(user.sub);
  cookies().delete(SESSION_COOKIE_NAME);
  const redirectUrl = formData.get("redirect")?.toString() || "/";
  redirect(redirectUrl.startsWith("/") ? redirectUrl : "/");
}
