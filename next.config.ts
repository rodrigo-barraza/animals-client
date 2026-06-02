// ============================================================
// Animals Client — Next.js Configuration
// ============================================================
// Bootstraps secrets from Vault at startup
// and injects them into process.env for the app.
// ============================================================

import { createVaultClient } from "@rodrigo-barraza/utilities-library/node";
import type { NextConfig } from "next";

// ── Bootstrap secrets at build/dev time ────────────────────────
const vault = createVaultClient();

const secrets = vault.fetchSync();

// Inject into process.env so config.ts can read them
Object.assign(process.env, secrets);

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [],
  turbopack: {},
  transpilePackages: [
    "@rodrigo-barraza/components-library",
    "@rodrigo-barraza/utilities-library",
  ],

  env: {

    // ── Sessions ──────────────────────────────────────────────
    SESSIONS_SERVICE_URL: secrets.SESSIONS_SERVICE_URL,
    SESSIONS_SERVICE_PUBLIC_URL: secrets.SESSIONS_SERVICE_PUBLIC_URL,
    ANIMALS_CLIENT_PORT: secrets.ANIMALS_CLIENT_PORT,
    ANIMALS_CLIENT_DOMAIN: secrets.ANIMALS_CLIENT_DOMAIN,
    ANIMALS_SERVICE_URL: secrets.ANIMALS_SERVICE_URL,
    ANIMALS_SERVICE_PUBLIC_URL: secrets.ANIMALS_SERVICE_PUBLIC_URL,

    // Explicit NEXT_PUBLIC_ variables for Turbopack client-side injection
    NEXT_PUBLIC_ANIMALS_CLIENT_PORT: secrets.ANIMALS_CLIENT_PORT,
    NEXT_PUBLIC_ANIMALS_CLIENT_DOMAIN: secrets.ANIMALS_CLIENT_DOMAIN,
    NEXT_PUBLIC_ANIMALS_SERVICE_URL: secrets.ANIMALS_SERVICE_URL,
    NEXT_PUBLIC_ANIMALS_SERVICE_PUBLIC_URL: secrets.ANIMALS_SERVICE_PUBLIC_URL,
  },
};

export default nextConfig;
