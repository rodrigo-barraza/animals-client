// ============================================================
// Animals Client — Runtime Configuration
// ============================================================
// Typed accessor layer over process.env. The Vault service is
// the single source of truth — next.config.ts hydrates
// process.env from the Vault before any module imports run.
//
// This file contains NO defaults, NO secrets, and NO hardcoded
// URLs. All public domain URLs come from the vault registry
// (projects.json → ANIMALS_SERVICE_PUBLIC_URL).
//
// Browser requests must NEVER hit localhost or LAN IPs when loaded
// from a public domain — that triggers Chrome's Private Network
// Access (PNA) prompt. URL resolution is delegated to
// resolveClientServiceUrl from @rodrigo-barraza/utilities-library:
//
//   Production (*.rod.dev):
//     • ANIMALS_SERVICE_URL → ANIMALS_SERVICE_PUBLIC_URL from vault
//
//   Local dev (localhost):
//     • ANIMALS_SERVICE_URL → vault value (LAN IP — same network)
//
//   Server-side (SSR):
//     • All URLs use full values from vault (LAN IPs for Docker)
// ============================================================

import {
  isProductionHostname,
  resolveClientServiceUrl,
} from "@rodrigo-barraza/utilities-library";

export const IS_PRODUCTION = isProductionHostname();
export const IS_LOCALHOST = !IS_PRODUCTION;

export const PROJECT_NAME = IS_PRODUCTION ? "animals-client" : "animals-client-dev";

export const ANIMALS_CLIENT_PORT =
  process.env.NEXT_PUBLIC_ANIMALS_CLIENT_PORT || process.env.ANIMALS_CLIENT_PORT;

// ── Animals Service URL ────────────────────────────────────────
export const ANIMALS_SERVICE_URL = resolveClientServiceUrl({
  internalUrl:
    process.env.NEXT_PUBLIC_ANIMALS_SERVICE_URL || process.env.ANIMALS_SERVICE_URL,
  publicUrl:
    process.env.NEXT_PUBLIC_ANIMALS_SERVICE_PUBLIC_URL ||
    process.env.ANIMALS_SERVICE_PUBLIC_URL,
});
