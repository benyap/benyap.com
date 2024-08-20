import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { checkCsrf } from "./utils/csrf";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  const csrf = await checkCsrf(request, response);
  // TODO: show a nice error page instead of a plain 403 response
  if (!csrf.ok) return new NextResponse("Invalid request", { status: 403 });

  response.headers.set("X-Current-Url", request.nextUrl.href);

  return response;
};

export const config = {
  matcher: [
    // match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
