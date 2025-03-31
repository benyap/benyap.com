import version from "~/constants/version.json";

export function GET() {
  return Response.json({ version: version.version });
}
