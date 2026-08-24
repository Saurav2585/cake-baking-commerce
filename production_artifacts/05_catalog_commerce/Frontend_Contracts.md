# Frontend Contracts

## Purpose

These conceptual TypeScript-style contracts align architecture, UX, engineering and QA without constituting application code. Names may be refined during technical design, but their semantics and safety boundaries require Phase 2B approval before change.

## Shared primitives

```ts
type StableId = string
type Slug = string
type ISODateTime = string
type INRMoney = { currency: 'INR'; amountPaise: number }
type DataState<T> =
  | { state: 'known'; value: T; provenanceId: string }
  | { state: 'information_not_provided' }
  | { state: 'not_applicable' }
type CommerceMode = 'demo' // future expansion requires approval
type Availability = 'available' | 'low_demo_stock' | 'unavailable' | 'discontinued'
```

`amountPaise` is an integer. A `DataState` cannot carry a value outside `known`. Critical ingredient, allergen and storage fields use this type and must render the exact customer-facing phrase “Information not provided” for that state.

## Result and accessibility metadata

```ts
type DomainErrorCode =
  | 'not_found' | 'invalid_input' | 'unavailable' | 'limit_exceeded'
  | 'stale_revision' | 'price_changed' | 'persistence_failed'
  | 'provider_failed' | 'conflict' | 'simulation_only'

type AccessibleNotice = {
  message: string
  urgency: 'polite' | 'assertive'
  focusTargetId?: string
}

type Result<T> =
  | { ok: true; value: T; notice?: AccessibleNotice }
  | { ok: false; code: DomainErrorCode; message: string; fieldIds?: string[]; notice: AccessibleNotice }
```

UI must render the same underlying result with or without animation. `focusTargetId` identifies a semantic destination; it is not a DOM timing or GSAP callback contract.

## Catalog-facing projection

```ts
type VariantSummary = {
  variantId: StableId
  sku: string
  productId: StableId
  label: string
  price: INRMoney
  compareAtPrice?: INRMoney
  availability: Availability
  availabilityLabel: string // must qualify demo state
  normalizedMeasure?: { kind: 'mass'|'volume'|'length'|'count'; value: number; unit: 'g'|'ml'|'mm'|'count' }
  mediaId?: StableId
  catalogRevision: string
}

type ProductCardProjection = {
  productId: StableId
  slug: Slug
  fictionalBrandName: string
  title: string
  department: string
  selectedVariant: VariantSummary
  requiresOptionSelection: boolean
  image: { srcRef: string; alt: string; width: number; height: number }
  badges: Array<{ label: string; meaning: string }> // allow-listed factual/demo states only
}
```

Cards cannot invent a universal size or colour value. `requiresOptionSelection` prevents direct add when the displayed variant is not an explicit valid selection.

## Cart contracts

```ts
type CartLineSource =
  | { kind: 'manual' }
  | { kind: 'recipe'; recipeId: StableId; recipeRevision: string; mappingId: StableId }

type CartLineStatus =
  | 'valid' | 'refreshed' | 'price_changed' | 'unavailable'
  | 'removed' | 'quantity_adjustment_required'

type CartLine = {
  lineId: StableId
  sku: string
  productId: StableId
  quantity: number
  observedUnitPrice: INRMoney
  currentUnitPrice?: INRMoney
  observedCatalogRevision: string
  status: CartLineStatus
  sources: CartLineSource[]
  snapshot: { productTitle: string; variantLabel: string; fictionalBrandName: string }
  recipeContexts?: Array<{
    mappingId: StableId
    required: { value: number; unit: string }
    purchased: { value: number; unit: string }
    leftover: { value: number; unit: string }
  }>
}

type Cart = {
  cartId: StableId
  mode: CommerceMode
  revision: number
  lines: CartLine[]
  state: 'empty'|'active'|'needs_review'|'checkout_ready'|'checkout_submitting'|'simulated_confirmed'
  subtotal: INRMoney
  shipping: { state: 'not_calculated_in_demo' }
  tax: { state: 'not_calculated_in_demo' }
  updatedAt: ISODateTime
}

type AddCartInput = { sku: string; quantity: number; expectedCartRevision: number; source: CartLineSource }
type CartMutation = { cart: Cart; changedLineIds: StableId[]; merge?: { previous: number; added: number; final: number } }
```

Quantity is a positive integer pack count. Mutations accept an expected revision, return `conflict` when stale, and never silently overwrite a newer cart.

## Recipe review handoff

```ts
type RecipeCartSelection = {
  mappingId: StableId
  ingredientId: StableId
  inclusion: 'selected'|'pantry_owned'|'optional_excluded'|'unresolved'
  selectedSku?: string
  packCount?: number
  required: { value: number; unit: string }
  purchased?: { value: number; unit: string }
  leftover?: { value: number; unit: string }
  isUserOverride: boolean
  issue?: 'no_compatible_variant'|'unavailable'|'mapping_stale'
}

type AddRecipeSelectionInput = {
  recipeId: StableId
  recipeRevision: string
  expectedCartRevision: number
  selections: RecipeCartSelection[]
  partialAddAcknowledged: boolean
}
```

Only rows with `inclusion: selected`, a valid SKU and positive pack count can enter the cart. Optional ingredients, tools and pantry-owned rows require an explicit state change to `selected`. The cart accepts the reviewed mapping; it does not silently choose a lower-unit-price or substitute SKU.

## Checkout contracts

```ts
type DemoCheckoutDraft = {
  mode: 'demo'
  cartId: StableId
  cartRevision: number
  sampleProfileId: string
  sampleDeliveryOptionId: string
  demoDisclosureAccepted: boolean
}

type DemoCheckoutRequest = DemoCheckoutDraft & { idempotencyKey: string }

type DemoCheckoutConfirmation = {
  mode: 'demo'
  demoReference: string
  cartRevision: number
  items: Array<{ sku: string; label: string; quantity: number; unitPrice: INRMoney }>
  demoItemTotal: INRMoney
  shipping: { state: 'not_calculated_in_demo' }
  tax: { state: 'not_calculated_in_demo' }
  completedAt: ISODateTime
  disclosure: 'No payment was taken and no real order was placed.'
}
```

There are deliberately no name, email, phone, address, PIN code, note, payment, invoice or shipment fields. A future live checkout must use a separate approved contract; it cannot widen `DemoCheckoutDraft` unnoticed.

## Provider capabilities

```ts
interface CatalogProvider {
  getProduct(slug: Slug): Promise<Result<unknown>>
  getVariants(productId: StableId): Promise<Result<VariantSummary[]>>
  getCurrentSkuSnapshots(skus: string[]): Promise<Result<VariantSummary[]>>
}

interface InventoryProvider {
  getAvailability(skus: string[]): Promise<Result<Array<{ sku: string; state: Availability; maxQuantity?: number }>>>
}

interface CartPersistence {
  load(): Promise<Result<Cart | null>>
  save(cart: Cart, expectedRevision: number): Promise<Result<{ revision: number }>>
  clear(expectedRevision: number): Promise<Result<void>>
}

interface CheckoutProvider {
  completeDemo(request: DemoCheckoutRequest): Promise<Result<DemoCheckoutConfirmation>>
}

interface CustomerIdentityProvider { // future; unused in v1
  getCustomerReference(): Promise<Result<{ customerRef: string } | null>>
}

interface OrderService { // future; unavailable in demo mode
  submitLiveOrder(input: never): Promise<Result<never>>
}

interface ContentProvider {
  getPage(slug: Slug): Promise<Result<unknown>>
  getRecipe(slug: Slug): Promise<Result<unknown>>
}

interface AnalyticsAdapter {
  track(event: AllowedAnalyticsEvent): Promise<Result<void>>
}
```

The `never` live-order input makes the v1 prohibition explicit conceptually. Provider responses are normalized before presentation; vendor exceptions and SDK objects do not cross these boundaries.

## Analytics contract

```ts
type AllowedAnalyticsEvent =
  | { name: 'add_to_cart'; sku: string; quantity: number; source: 'manual'|'recipe' }
  | { name: 'view_cart'; lineCount: number; value: INRMoney }
  | { name: 'begin_checkout'; cartRevision: number; value: INRMoney; mode: 'demo' }
  | { name: 'simulated_purchase_complete'; demoReference: string; value: INRMoney; mode: 'demo' }
  | { name: 'modify_recipe_mapping'; recipeId: StableId; action: string }
  | { name: 'add_recipe_items_to_cart'; recipeId: StableId; selectedCount: number; skippedCount: number }
```

This subset complements the full analytics artifact. It prohibits `purchase` in v1 and contains no search text tied to identity, contact fields, addresses, free text or provider credentials.

## Persistence envelope and migration

```ts
type PersistedCartEnvelope = {
  schemaVersion: 1
  savedAt: ISODateTime
  cart: Cart
}
```

Parsing is fail-closed: validate version, allowed keys, integer quantities/prices and size bounds before use. Unknown/newer versions yield a recoverable state rather than executing arbitrary migrations. Storage keys and adapters are implementation choices for engineering approval.

## Presentation invariants

- All loading operations expose a semantic busy state without replacing headings or removing recovery navigation.
- Mutations provide a notice; repeated announcements are concise and do not steal focus unless blocking.
- Modal/drawer contracts include invoker identity for deterministic focus restoration.
- Form errors have stable IDs and associate with labelled controls; error summaries link to them.
- At 320 CSS px, contract data can serialize into stacked presentation without truncating required facts.
- Availability and line status always include text/icon semantics, not colour alone.
- Content and actions exist in the DOM/reading order independently of GSAP; reduced motion changes presentation only.

## Test obligations derived from contracts

- Integer-money calculations, same-SKU merge and different-variant separation.
- Optimistic revision conflict and persistence failure recovery.
- Reconciliation for repriced, unavailable, removed and over-limit lines.
- Recipe explicit-inclusion and repeated-add behavior.
- Demo checkout idempotency, no-PII shape and absence of real `purchase` event.
- Exact unknown-data rendering and demo labels.
- Keyboard-operable mutations, focus destinations, live notices, reduced-motion independence and 320px reflow at implementation time.
