# Pantryform Phase 4A Review Prototype

This is an isolated static visual-review prototype, not the production ecommerce application. It uses fictional representative products and simulated commerce only.

## Run locally

From the repository root:

```sh
python3 -m http.server 4173 --directory design_review/phase_4a
```

Open `http://127.0.0.1:4173/`. Use the **Review screens** control to switch views. Query links such as `/?view=pdp` are deterministic for screenshot capture.

No installation, build, account, payment, database, fulfilment or external service is required.

## Review routes

- `?view=home`
- `?view=plp`
- `?view=search`
- `?view=pdp`
- `?view=recipe`
- `?view=recipe-cart`
- `?view=wishlist`
- `?view=cart`
- `?view=checkout`
- `?view=confirmation`
- `?view=nav`
- `?view=filters`
- `?view=states`
- `?view=components`

The prototype supports keyboard navigation, visible focus, responsive reflow and `prefers-reduced-motion`. Interactions are illustrative and intentionally do not persist or transact.

Creative review should specifically inspect the five baking-led signatures: measured ingredient opening, department atlas, Ingredient Theatre product study, recipe-to-supplies transformation and PDP pack study. They retain the Phase 3 information hierarchy and linearize intentionally on mobile.

Append `&zoom=200` to a review URL for the deterministic 200% text stress mode, or `&motion=reduce` for the deterministic no-animation mode used in validation.
