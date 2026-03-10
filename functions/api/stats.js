/**
 * GET /api/stats
 * Returns npm download stats for all openclaw packages.
 * Cached for 1 hour via Cloudflare Cache API.
 */

const PACKAGES = [
  "openclaw-cli", "openclaw-doctor", "openclaw-manage", "openclaw-gateway",
  "openclaw-monitor", "openclaw-watch", "openclaw-daemon", "openclaw-helper",
  "openclaw-tools", "openclaw-utils", "openclaw-run", "openclaw-service",
  "openclaw-start", "openclaw-health", "openclaw-install", "openclaw-upgrade",
  "aiclaw", "fastclaw", "smartclaw", "megaclaw", "volclaw", "aliclaw",
  "autoopenclaw", "claw-open", "qclaw-cli",
];

export async function onRequest(context) {
  const { request, env } = context;

  // CORS
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=3600",
  };

  try {
    const results = await Promise.all(
      PACKAGES.map(async (pkg) => {
        const [week, day] = await Promise.all([
          fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`).then(r => r.json()),
          fetch(`https://api.npmjs.org/downloads/point/last-day/${pkg}`).then(r => r.json()),
        ]);
        return {
          name: pkg,
          weekly: week.downloads ?? 0,
          daily: day.downloads ?? 0,
        };
      })
    );

    // Sort by weekly desc
    results.sort((a, b) => b.weekly - a.weekly);

    const totalWeekly = results.reduce((s, p) => s + p.weekly, 0);
    const totalDaily = results.reduce((s, p) => s + p.daily, 0);

    return Response.json({
      updatedAt: new Date().toISOString(),
      totalWeekly,
      totalDaily,
      packages: results,
    }, { headers });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers });
  }
}
