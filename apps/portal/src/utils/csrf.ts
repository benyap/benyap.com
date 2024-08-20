import { NextRequest, NextResponse } from "next/server";
import { CsrfError, createCsrfProtect } from "@edge-csrf/nextjs";

const csrfProtect = createCsrfProtect({
  cookie: {
    name: "csrf",
    secure: process.env.NODE_ENV === "production",
  },
});

/**
 * Verifies that a request has a valid CSRF token if required.
 * If the check fails, the error is returned.
 */
export async function checkCsrf(
  request: NextRequest,
  response: NextResponse,
): Promise<{ ok: true } | { ok: false; error: CsrfError }> {
  try {
    await csrfProtect(request, response);
    return { ok: true };
  } catch (error) {
    if (error instanceof CsrfError) return { ok: false, error };
    throw error;
  }
}
