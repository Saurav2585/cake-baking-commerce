# Catalog asset tooling
## Validate committed assets

The validator uses only Node.js built-ins and runs from the repository root:

```sh
node production_artifacts/05_catalog_production/tools/validate_catalog_assets.js
```

It is the release-facing command and does not require `node_modules`.

## Rebuild deterministic assets

The builder requires Sharp for SVG rasterisation and contact-sheet composition. In the Codex desktop workspace, load the bundled workspace dependencies and expose their Node package directory through `NODE_PATH`; do not commit `node_modules`.

Example for the current bundled runtime:

```sh
NODE_PATH=/Users/codeclouds-saurav/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules /Users/codeclouds-saurav/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node production_artifacts/05_catalog_production/tools/build_catalog_assets.js
```

Run validation immediately after a rebuild. The builder deletes only files beginning `asset_pf5b_` within this phase's `masters`, `exports` and `previews` directories before regenerating them.
