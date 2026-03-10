/**
 * GET /api/health
 * Simple health check endpoint.
 */
export async function onRequest() {
  return Response.json({
    status: "ok",
    ts: new Date().toISOString(),
  });
}
