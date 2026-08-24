# Local Setup

**Phase:** 6 — Production Application Engineering  
**Status:** Pre-scaffold contract; commands must be reconciled with the committed package scripts

## Prerequisites

- Git
- A current Node.js LTS release compatible with the locked Next.js version
- npm (use the repository lockfile; do not mix package managers)
- A Chromium-family browser for local review

Do not install a database, Supabase, authentication service, CMS or payment tooling. Pantryform uses committed local canonical data and assets.

## Clean setup

```bash
git clone https://github.com/Saurav2585/cake-baking-commerce.git
cd cake-baking-commerce
git switch main
npm ci
npm run data:validate
npm run data:generate
npm run dev
```

Open the local URL printed by Next.js. The interface must disclose that it is a portfolio/demo and that pricing, availability and checkout are simulated.

If the final scripts differ during implementation, update this file rather than leaving illustrative commands. `npm ci` is authoritative for reproducible installation after the lockfile exists.

## Expected scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server. |
| `npm run data:validate` | Validate canonical Phase 5B identities, joins, required fields, mappings and assets. |
| `npm run data:generate` | Rebuild the typed application derivative deterministically. |
| `npm run data:check` | Generate to a temporary location or regenerate and fail when committed derivatives drift. |
| `npm run format:check` | Check formatting without rewriting files. |
| `npm run lint` | Run configured lint rules. |
| `npm run typecheck` | Run strict TypeScript checking without emit. |
| `npm test` | Run unit/component/integration tests. |
| `npm run test:e2e` | Run critical browser journeys. |
| `npm run build` | Produce the deployment-ready production build. |
| `npm run start` | Serve the production build for final local inspection. |
| `npm run verify` | Run the full non-visual engineering gate in the documented order. |

## Development sequence

1. Run canonical validation before changing application code.
2. Regenerate only through the committed generator; never edit its output as catalog authoring.
3. Start the development server and implement against domain/provider boundaries.
4. Run focused tests while working.
5. Before handoff, run the complete verification command and serve the production build.
6. Inspect all review viewports, network failures, console output, keyboard behavior, reduced motion and screenshot evidence.

## Local-state reset and recovery

Cart and wishlist use versioned browser-local demo storage. Use the application’s reset controls where available. Browser DevTools storage clearing is acceptable during QA but must not be required for ordinary stale/corrupt-state recovery. A direct confirmation URL or expired session must reveal no customer data and must offer a path back to cart/shop.

## Troubleshooting

- **Canonical validation fails:** do not patch generated data or UI arrays. Fix an authorized canonical source issue or the generator/validator join logic, then rerun.
- **Generated drift:** run `npm run data:generate`, inspect the exact diff, and confirm it is wholly derived from canonical records.
- **Missing image:** verify its manifest record, relationship and local export path. Do not add a generic/hotlinked fallback.
- **Stored cart cannot load:** confirm the adapter rejects unsupported/corrupt envelopes and announces the recoverable reset; it must not crash rendering.
- **Motion differs from content state:** treat the semantic/static state as authoritative and repair or disable the motion layer.

## Phase boundary

Local setup must not deploy publicly, configure provider credentials, collect payment or personal information, or create a real order. Deployment and Phase 7 require separate authorization.

