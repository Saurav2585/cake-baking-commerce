# Analytics Event Model

## Purpose and privacy boundary

This model supports deterministic portfolio/demo journey verification, not advertising, user profiling or evidence of real demand. Analytics is disabled by default in local/test and may use a debug adapter in review environments. It must not emit personal data, free-form checkout fields, full search text containing possible personal data, payment data, IP-derived traits, authentication identifiers or persistent cross-site identifiers.

V1 has no authentication, live inventory, real payment or real order. `simulated_purchase_complete` is the only completion event; emitting `purchase` is prohibited.

## Event envelope

Every event uses a typed envelope:

| Field | Type | Rule |
|---|---|---|
| `event_name` | enum | One event below; no dynamic names |
| `event_version` | integer | Starts at 1; increment on breaking semantics |
| `event_id` | UUID/string | Unique per emitted event for deduplication |
| `occurred_at` | ISO timestamp | Client occurrence time |
| `session_id` | ephemeral string | Random first-party demo session; no identity meaning |
| `page_type` | enum | home, department, category, search, product, recipe_list, recipe, wishlist, cart, checkout, confirmation, info, error |
| `route_template` | enum/string | Parameter-free template, never a URL containing personal data |
| `environment` | enum | local, test, preview, portfolio, production |
| `data_version` | string | Catalog/recipe fixture version |
| `demo_mode` | boolean | Always `true` in v1 |
| `consent_state` | enum | not_required_for_debug, denied, granted, unknown; production policy pending |

Shared commerce item fields: `product_id`, `variant_id` where selected, fictional `brand_id`, department/category IDs, `quantity`, `unit_price_inr` and `currency: INR`. Recipe item context may add `recipe_id` and `mapping_source: recipe`. Never send product description, ingredient/allergen content or user-entered notes.

## Event catalog

| Event | Trigger (exactly once per action/state) | Required properties |
|---|---|---|
| `view_item_list` | A list becomes meaningfully visible after successful load or committed query/filter/sort | `list_id`, `list_type`, `result_count`, ordered product/recipe IDs; query classification but not raw query by default |
| `select_item` | User activates a product/recipe result | `list_id`, `item_type`, ID, `position`, active filter count, `sort_id` |
| `view_item` | Product parent page successfully resolves and primary content is available | `product_id`, default/selected `variant_id` if any, item fields |
| `select_variant` | User explicitly changes to a valid variant | `product_id`, `from_variant_id` nullable, `variant_id`, axis and value IDs, availability state |
| `search` | User explicitly submits a normalized nonblank query | `query_token_count`, `query_length_band`, `result_count`, `zero_results`; raw query excluded unless separately privacy-reviewed |
| `filter` | User commits a facet change; on mobile only after Apply | `context_id`, `facet_id`, stable value IDs, `action` add/remove/clear_all, resulting count |
| `sort` | User changes sort | `context_id`, `sort_id`, result count |
| `add_to_wishlist` | User explicitly adds product/variant; never on render | product/item fields, source page/list |
| `add_to_cart` | A user action successfully mutates cart | item fields, source, `cart_quantity_after`; recipe bulk addition additionally uses its dedicated event |
| `view_cart` | Full cart becomes meaningfully visible, once per page view | cart item IDs/quantities, `cart_value_inr`, stale/unavailable count, `demo_mode` |
| `begin_checkout` | User activates checkout and cart validation allows the simulated flow to begin | cart summary, `checkout_type: simulated`, `demo_mode: true` |
| `simulated_purchase_complete` | Demo confirmation is generated after explicit confirmation action | ephemeral `demo_reference`, cart summary, `checkout_type: simulated`, `payment_taken: false`, `order_created: false` |
| `view_recipe` | Recipe page successfully resolves | `recipe_id`, default servings, mapped required/optional/tool counts |
| `scale_recipe` | User commits a serving change that recalculates quantities | `recipe_id`, from/to servings, scale factor band |
| `begin_recipe_to_cart` | User opens mapping review after mappings resolve | `recipe_id`, servings, required/optional/tool counts, unavailable count |
| `modify_recipe_mapping` | User changes pantry-owned, optional, substitution, variant or pack quantity selection | `recipe_id`, ingredient line ID, action enum, prior/new product/variant IDs where applicable; no free text |
| `add_recipe_items_to_cart` | User confirms review and at least one mapped item mutates cart | `recipe_id`, servings, selected line count, excluded line count, unavailable line count, purchased/leftover normalized summary, merge outcome |

Optional diagnostic events may be added only through schema review. Error telemetry is operational, sanitized and separate from behavioural events; stack traces and form values must not enter analytics.

## Deterministic emission and deduplication

- Events follow successful domain state transitions, not click intent, animation completion or component mounting alone.
- Route rerenders, Strict Mode, hydration and back/forward restoration must not duplicate `view_*`; deduplicate by event name + resource/list ID + navigation instance.
- Failed/rejected cart actions do not emit `add_to_cart`; they produce accessible UI feedback and optional sanitized operational error.
- Recipe additions emit one `add_recipe_items_to_cart` for the confirmed batch and one `add_to_cart` per successfully mutated sellable variant using the same batch ID. Documentation/queries must avoid double-counting by choosing batch or line metrics explicitly.
- Repeated valid additions are new actions, not deduplicated. Cart merge reports `merged_existing`, `created_line` or `mixed`.
- Consent denial or unavailable provider is a no-op and cannot block navigation, cart, checkout or confirmation.
- Analytics never owns commerce state and animation never triggers a business event.

## Simulation-safe reporting

Dashboards label the project “Portfolio demo / simulated commerce”. `simulated_purchase_complete` is reported as “Demo completions”, never orders, purchases, revenue or conversion. Any summed INR value is “simulated basket value”, not sales. Demo availability is not inventory. No event supplies testimonials, popularity badges, “best seller” ordering or customer-count claims.

## Accessibility and control

Analytics scripts must not alter focus, announcements, keyboard handlers, semantic content or reduced-motion behaviour. Failure to load/emit is silent to the user and non-blocking. If a consent interface is later required, it must be keyboard operable, labelled, non-coercive, and allow withdrawal; that UI is outside this phase.

## Typed provider seam

Frontend depends on an `AnalyticsPort` with `track(ValidatedAnalyticsEvent): void|Promise<void>` and `setConsent(state)`; adapters include `NoopAnalytics`, `DebugAnalytics` and a future approved provider. Runtime schema validation drops and reports invalid events without leaking their payload. Provider-specific IDs and script loading stay outside domain components.

## Validation and QA fixtures

1. Schema tests accept every documented event and reject unknown names, fields, PII keys and `purchase`.
2. End-to-end tests assert one event per successful search/filter/sort/variant/cart/recipe transition and none for cancelled/failed actions.
3. Strict Mode, rerender, reload and history navigation do not create duplicate view events.
4. A simulated confirmation contains `payment_taken:false`, `order_created:false` and never emits real purchase semantics.
5. Denied/unavailable analytics leaves all journeys functional.
6. Raw search queries, names, emails, addresses, phone numbers, payment fields and free text are absent from captured payload snapshots.
7. Item prices and availability equal the same variant state shown to the user at event time.
8. Recipe batch/line event linkage prevents ambiguous double-counting.

## Open risks

- Search terms can contain personal data; v1 records only token count/length band and controlled category, not raw text.
- A future vendor may impose reserved field meanings; map in the adapter without changing domain semantics.
- Debug data can still be mistaken for customer evidence; dashboards/export labels and retention must remain demo-specific.
- Consent and retention requirements need jurisdiction/provider review before any production analytics activation.

