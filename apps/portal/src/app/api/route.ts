export function GET() {
  return Response.json({
    version: process.env.VERSION,
    build: process.env.BUILD_ID,
    commit: process.env.COMMIT_HASH,
  });
}
