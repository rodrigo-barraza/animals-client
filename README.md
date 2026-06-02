# Animals Client

Wildlife species tracker — species encyclopedia, sightings, habitats, and conservation.

## Quick Start

```bash
# Secrets are resolved from vault-service automatically.
npm install
npm run dev
```

## Pages

| Path        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `/`         | Dashboard — species overview, recent sightings, stats    |

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Vanilla CSS with emerald/nature dark theme
- **Backend:** animals-service (port 5616)
- **Secrets:** Vault service

## Scripts

```bash
npm run start         # Start production server (port 3016)
npm run dev           # Start dev server (port 3016)
npm run build         # Build for production
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix lint issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting
npm test              # Run tests (Vitest)
npm run test:watch    # Run tests in watch mode
npm run deploy        # Deploy to production
npm run deploy:dry    # Validate deployment without deploying
```
