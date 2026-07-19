# Animals Client

Helping animals worldwide — browse adoptable animals from shelters and rescues, and donate to animal charities around the world.

The platform is an **aggregator + giving layer**: listings sync from Petfinder/RescueGroups (and direct partner shelters) via animals-service; donations go straight through Every.org / GlobalGiving, who handle all payment processing.

## Quick Start

```bash
# Secrets are resolved from vault-service automatically.
npm install
npm run dev
```

Tip: run `npm run seed` in animals-service to get sample listings before any external API keys are configured.

## Pages

| Path                  | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `/`                   | Landing — hero, adopt/donate/shelter actions, stats, featured pets |
| `/adopt`              | Browse adoptable animals — species chips, age/sex/size, search     |
| `/adopt/[id]`         | Listing detail — photos, attributes, shelter card, adopt link      |
| `/organizations`      | Shelters & rescues directory with search                           |
| `/organizations/[id]` | Org profile + their adoptable animals                              |
| `/donate`             | Giving — curated charity collections + live charity search         |
| `/favorites`          | Saved animals (localStorage, no account needed)                    |
| `/shelters`           | Pitch + self-serve interest form for shelters/rescues              |

## Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Vanilla CSS with emerald/nature theme (components-library base)
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
