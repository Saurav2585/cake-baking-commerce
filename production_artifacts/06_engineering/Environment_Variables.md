# Environment Variables

**Phase:** 6 — Production Application Engineering  
**Policy:** No environment variables are required for the approved local demo architecture.

## Required variables

None. Canonical data, approved assets, demo catalog revision and simulated checkout behavior are local and deterministic. The application must build, test and run without secrets, provider accounts or `.env` files.

## Prohibited or unnecessary configuration

Do not add credentials or endpoints for:

- payment gateways, UPI, wallets or banking;
- authentication/customer accounts;
- databases, Supabase or hosted storage;
- CMS platforms;
- email/SMS providers;
- live inventory, shipping, tax or order services;
- third-party analytics or advertising trackers;
- image-generation providers.

Do not place real personal data, tokens or provider credentials in source, tests, screenshots, fixtures or browser storage.

## Optional non-secret configuration

Prefer checked-in typed application constants for invariant demo mode and canonical revision. If tooling later requires an environment-specific public value, it must be documented here before use and satisfy all of these rules:

1. it is non-secret and safe to expose to the browser;
2. it cannot disable the demo/simulation disclosure;
3. it cannot enable payment, real ordering, identity collection or external tracking;
4. production build and tests have a deterministic default;
5. `.env*` remains ignored and is never committed (an intentionally documented `.env.example` would require a recorded decision).

`NEXT_PUBLIC_*` values are public by definition and must never contain secrets. Runtime behavior must not infer a live-commerce mode from an unset or user-controlled variable.

## Verification

- Run the production build in a clean shell without project environment variables.
- Search tracked files and staged diffs for credential patterns before commit.
- Confirm browser network inspection shows no unintended third-party requests.
- Confirm checkout remains simulated and emits only the local semantic event `simulated_purchase_complete`.

## Future integrations

Future commerce/provider variables require an approved architecture and security review. Adding a variable does not itself authorize an integration or broaden the v1 data contract.

