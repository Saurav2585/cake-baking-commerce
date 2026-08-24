# Demo Pricing and Availability

## Method

Prices are authored INR fixtures in paise for interface and business-rule testing. They are plausible relative demo values, not observed market prices, MRPs, offers or price-history evidence. No compare-at price is used.

Comparable consumables expose a derived unit-price basis from the unrounded SKU price and canonical quantity. Reusable tools, bakeware and unlike-component presentation items use `not_applicable`.

## Availability fixtures

- `available`: normal positive demo path.
- `low_demo_stock`: urgency behavior test; must display as simulated and must not imply real scarcity.
- `unavailable`: alternative-variant and recipe-review behavior test.
- `discontinued`: not used in this bounded seed.

Availability is deterministic fixture data, not inventory. Customer-facing surfaces must disclose the simulated checkout and availability context.

## Guardrails

Variant files are the sole owners of prices and availability. Prices are whole-rupee display fixtures stored as paise. Any later merchandising, discount or tax logic requires a separately approved commerce decision.
