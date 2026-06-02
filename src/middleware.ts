// ============================================================
// Animals — Next.js Middleware
// ============================================================
// No authentication required — this app is publicly accessible.
// Middleware is a no-op passthrough.
// ============================================================

export function middleware() {
  // Allow all requests — no auth gate.
}

export const config = {
  matcher: [],
};
