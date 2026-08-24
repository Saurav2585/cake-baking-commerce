# Low-Fidelity Wireframes

Structural Markdown blueprints only. Bracketed blocks describe hierarchy, not styling, colour, typography, imagery or final copy. All screens inherit the global shell, accessibility and responsive rules in companion Phase 3 artifacts.

## Shared shell and behavior

| Layer | Structural block |
|---|---|
| Start | `[Skip to main content]` → `[Demo/prototype notice where context requires]` |
| Header | `[Pantryform + Baking Ingredients & Supplies] [Shop] [Recipes] [Search] [Wishlist count] [Cart count]` |
| Main | One H1; breadcrumbs after header where route hierarchy helps; primary task before supporting content |
| Footer | `[Shop departments] [Help/demo information] [About] [Privacy] [Terms]` |

Route changes focus the page-start target/H1. One status owner announces meaningful dynamic results. At 320 CSS px blocks stack in reading order; animation is never required.

For every numbered blueprint, content priority is the written top-to-bottom order. The global header/footer and the breadcrumb rule above apply unless a screen explicitly overrides them. Sticky behavior defaults to none; secondary actions default to the alternatives named in the objective/action line; loading, empty, error and unavailable behavior inherits the closest named shared state in screen 19 when not repeated. Keyboard focus follows DOM/content order, every state change uses the single status owner, and the global reduced-motion/no-animation equivalent below applies to every screen. These defaults are part of each blueprint, not optional design guidance.

## 1. Homepage

- **Objective/task:** explain Pantryform and help users start by department, intended bake or recipe. **Primary CTA:** Shop ingredients & supplies. **Secondary:** Browse recipes.
- **Desktop:** `[Value introduction + two CTAs] → [8 department links] → [What are you making? task links] → [Curated category/product selection] → [Recipe-led discovery] → [Measured Joy: practical measure-to-make guidance] → [How selection works] → [Portfolio/demo transparency]`.
- **Mobile:** value/CTA first; horizontal rails are replaced by stacked/list or controlled scroll groups with labelled next controls; task links precede optional featured items.
- **Navigation/sticky:** no sticky hero; global header may condense only if content/focus remains stable. **States:** module loading/empty/error isolates itself; no repetitive fallback rails.
- **Focus/status:** DOM follows visual order; headings name modules; product mutations announce once. **Trace:** D-010/D-012/D-015; F1/F4/F5; Home inventory; R-001/R-017/R-019.

## 2. Shop All

- **Objective/task:** scan the full assortment and narrow it. **Primary:** Select product/options. **Secondary:** filter, sort, wishlist.
- **Desktop:** `[Breadcrumb + H1 + result count] → [Department shortcuts] → [Selected chips + clear all + sort] → [Facet sidebar | product grid] → [Pagination/load more]`.
- **Mobile:** `[H1/count] → [Filter trigger with applied count] [Sort] → [chips] → [single/two-column adaptive cards]`; filters use staged drawer.
- **Sticky:** filter/sort bar may become sticky after H1 without hiding focus. **States:** loading, no catalog, filtered zero, partial cards, error.
- **Focus/status:** source order places controls before results; apply returns focus to trigger and announces count. **Trace:** D-015; Search spec; Shop inventory; R-013/R-022/R-024.

## 3. Department landing

- **Objective/task:** understand one department and choose a category/use. **Primary:** Browse category. **Secondary:** view curated products/related recipes.
- **Desktop:** `[Breadcrumb/H1 + factual orientation] → [Category links] → [Use/task links] → [small justified product selection] → [related recipe entry]`.
- **Mobile:** category list precedes products; no decorative module blocks discovery.
- **States/a11y:** empty department links to Shop All; partial module failures isolated; heading hierarchy and link purpose explicit. **Trace:** D-015; Taxonomy; F1; R-003.

## 4. Category / PLP

- **Objective/task:** compare relevant family facts and choose product. **Primary:** Add unambiguous SKU or Select options. **Secondary:** wishlist/filter/sort.
- **Desktop:** `[Breadcrumb/H1/count] → [chips/clear/sort] → [family facets | cards with brand, title, key pack/dimension, demo price, unit price, availability] → [pagination]`.
- **Mobile:** staged filter drawer; cards retain key decision fields; long names wrap, never truncate essential variant facts.
- **Sticky/states:** optional sticky filter bar; invalid URL filter is ignored with notice; unavailable products remain labelled; zero results offer explicit recovery.
- **Focus/status:** result refresh does not steal focus; count live region speaks once. **Trace:** F2/F3/F6; Search spec; D-017; R-012/R-013/R-022.

## 5. Search results

- **Objective/task:** confirm query interpretation and reach matching product/category/recipe. **Primary:** select result. **Secondary:** filter/sort/revise query.
- **Desktop:** `[H1 + search field] → [query/count + chips/sort] → [facets | grouped/typed results] → [zero recovery when needed]`.
- **Mobile:** search field remains near top; result types use explicit labels; filters staged in drawer.
- **States:** loading keeps query visible; deterministic spelling suggestion only; zero state preserves constraints and offers chip removal, clear filters, departments, Shop All/Recipes.
- **Focus/status:** H1 then search then controls/results; count announced after submit/commit. **Trace:** Search spec; F1/F6; R-022/R-024.

## 6. Search suggestions

- **Objective/task:** choose an exact destination without submitting. **Primary:** select suggestion. **Secondary:** submit full query.
- **Desktop/mobile:** `[Named search input] → [listbox: Products | Categories | Brands | Recipes; max 10]`; popup aligns to input but stays in DOM after it.
- **Behavior:** opens after two normalized characters; Up/Down navigates, Enter selects, Escape closes, Tab leaves; no focus trap. Loading/no suggestion/error never blocks full submit.
- **Status:** expanded/active descendant conveyed programmatically; avoid announcing every arrow move twice. **Trace:** Search spec; R-013/R-024.

## 7. Product Detail

- **Objective/task:** select a compatible sellable variant and add confidently. **Primary:** Add to demo cart. **Secondary:** wishlist, related recipe/product.
- **Desktop:** `[Breadcrumb] → [Media | purchase block: fictional brand, H1, demo cue, selected axes, pack/dimensions, price/unit price, availability, quantity, Add, critical compatibility/handling] → [description/use] → [ingredients] → [allergens] → [storage] → [family attributes] → [demo shipping/returns] → [related recipes/products]`.
- **Mobile:** identity and selected-variant media precede purchase block; optional bottom purchase bar may show selected variant/price/Add only after valid selection and must not cover content/keyboard.
- **States:** unselected/invalid/unavailable/stale variant, price unavailable, image failure, add pending/error; “Information not provided” remains visible in relevant critical sections.
- **Focus/status:** axes use labelled native controls/radiogroups; change announces variant/price/availability once; Add receives no focus jump. **Trace:** D-016/D-017; Product model; F2–F4; R-002/R-012/R-024.

## 8. Recipe listing

- **Objective/task:** find a recipe by category/task. **Primary:** View recipe. **Secondary:** filter.
- **Desktop:** `[H1 + intro] → [category/filter controls + count] → [recipe cards: title, time/servings only if known] → [pagination]`.
- **Mobile:** controls stack; cards remain links with descriptive names. **States:** loading, empty, filtered zero, partial media, error.
- **Trace:** D-015; Recipe model; F5; R-019.

## 9. Recipe detail

- **Objective/task:** understand recipe and decide whether to map ingredients. **Primary:** Review ingredients to add. **Secondary:** scale servings, print/share only if later justified.
- **Desktop:** `[Breadcrumb/H1 + factual recipe facts] → [Servings control] → [Ingredients + tools distinct | method] → [Begin recipe-to-cart] → [related products/recipes]`.
- **Mobile:** servings and ingredients precede method; CTA follows ingredient context and may repeat after method as a true link/button.
- **States:** non-scalable quantities labelled; unmapped products do not hide recipe; missing media is nonblocking; recipe mapping failure leaves readable recipe.
- **Focus/status:** scaling announces new servings/quantity completion once. **Trace:** D-016; Recipe model; F5; R-004/R-021/R-024.

## 10. Recipe-to-cart review

- **Objective/task:** review every mapping before cart mutation. **Primary:** Add N selected ingredients. **Secondary:** reset mapping/back to recipe.
- **Desktop:** `[H1 + recipe/servings/demo snapshot] → [summary: selected/unresolved/total] → [ingredient rows: include/pantry-owned/optional; required; product/SKU; selected pack × count; purchased; leftover; demo price; override/reset/substitute] → [unavailable/unmapped rows] → [tools, all unselected] → [omission summary + selected total + explicit Add]`.
- **Mobile:** each row becomes a labelled card in the same field order; summary/Add may be sticky only after all blocking issues are visible and never cover focused controls.
- **States:** calculating, ready, optional unselected, pantry-owned, substitution choice, unavailable/unmapped, stale price/variant, none selected, atomic add failure, post-add summary.
- **Focus/status:** serving/override recalculation announces one row/summary result; blocking summary links to rows; post-add reports added/merged/skipped/unresolved. **Trace:** D-016/D-017; RTC rules; F5; R-004/R-021/R-024.

## 11. Wishlist

- **Objective/task:** revisit saved products and move through PDP/cart. **Primary:** Select options/Add when unambiguous. **Secondary:** remove.
- **Desktop/mobile:** `[H1 + local-demo persistence note] → [saved item list/cards with availability] → [continue shopping]`; mobile uses stacked cards.
- **States:** empty, stale/unavailable, restore loading, corrupt/persistence error. Removal keeps focus at next item or empty heading and announces once. **Trace:** Commerce architecture; R-023/R-024.

## 12. Mini Cart

- **Objective/task:** confirm latest mutation and choose cart/checkout path. **Primary:** View cart. **Secondary:** Continue shopping; checkout only if reconciled.
- **Desktop/mobile:** labelled modal/drawer `[heading/count] → [compact lines] → [warnings] → [demo subtotal] → [View cart]`; it is not the sole mutation confirmation.
- **Behavior:** focus enters, is contained, Escape/Close returns to invoker; background inert. Empty/stale/error states provide cart link. Animation-disabled state opens/closes instantly. **Trace:** Commerce/cart specs; R-006/R-024.

## 13. Cart

- **Objective/task:** resolve lines and prepare demo checkout. **Primary:** Continue to demo checkout. **Secondary:** update/remove/return to shop.
- **Desktop:** `[H1 + demo disclosure] → [line table/list: brand/product, variant/SKU, recipe source, unit price, quantity, line total, status, update/remove] → [changed/unavailable review] → [summary: subtotal; shipping/tax Not calculated in this demo] → [checkout CTA]`.
- **Mobile:** rows become labelled cards; totals follow lines; checkout CTA may be sticky only when cart is valid and must not obscure controls.
- **States:** empty, mutation pending/failure, price changed, unavailable/removed/over-limit, persistence/session warning, conflict. **Focus/status:** errors link to lines; removal focus is deterministic. **Trace:** Commerce/cart specs; D-004; R-006/R-023/R-025.

## 14. Simulated Checkout

- **Objective/task:** demonstrate safe review/validation without a real transaction. **Primary:** Complete demo checkout. **Secondary:** return to cart.
- **Desktop:** `[Persistent demo banner] → [H1] → [Fixed fictional sample profile selection] → [non-identifying demo delivery option] → [cart summary] → [shipping/tax: Not calculated in this demo] → [required demo acknowledgement] → [Complete demo checkout]`.
- **Mobile:** one-column order; summary may collapse only with named disclosure and remains available before submit; no payment/card/UPI or real personal fields.
- **States:** invalid acknowledgement/sample choice, stale cart, submitting/idempotent duplicate, provider failure, success redirect. Error summary receives focus; busy state announced.
- **Trace:** D-004; Checkout spec; R-006/R-025.

## 15. Confirmation

- **Objective/task:** confirm simulation outcome without implying an order. **Primary:** Continue shopping. **Secondary:** view demo summary.
- **Desktop/mobile:** `[Demo checkout complete] → [No payment taken/no real order] → [Demo reference + timestamp] → [item snapshot + demo total; shipping/tax not calculated] → [start over/shop]`.
- **States:** valid session result; expired/direct URL explains no confirmation data and routes to cart/shop; failure never emits completion. Focus lands on H1 after navigation; status is not duplicated.
- **Trace:** Checkout/URL/analytics specs; R-006/R-025.

## 16. Mobile navigation drawer

- **Objective/task:** reach every global/department destination. **Primary:** navigate. **Secondary:** close.
- **Structure:** `[Menu heading + Close] → [Shop disclosure: one branch expanded at a time; seven merchandise departments] → [Recipes] → [Search/Wishlist/Cart] → [help/legal]`.
- **Behavior:** true links; modal focus containment, Escape and return; viewport/virtual-keyboard-safe height and internal scroll; no hover dependency. Loading/count errors never remove links. **Trace:** D-015; Sitemap; R-013/R-024.

## 17. Mobile filter drawer

- **Objective/task:** stage family-specific filters and apply once. **Primary:** Show N results. **Secondary:** Clear all, Cancel/Close.
- **Structure:** `[Heading/current context/Close] → [selected summary] → [facet groups with counts] → [Clear all] → [Show N results]`.
- **Behavior:** staged state; Cancel discards; Apply updates URL, closes, returns focus and announces count. Failure retains choices and exposes retry. **Trace:** Search spec; R-013/R-022/R-024.

## 18. 404

- **Objective/task:** recover from an invalid route. **Primary:** Search or Shop All. **Secondary:** Recipes/Home.
- **Desktop/mobile:** `[H1: page not found] → [plain explanation] → [search] → [Shop/Recipes links]`; no false redirect or decorative dependency.
- **Focus/states:** HTTP 404; focus page start; search retains its own loading/zero/error behavior. **Trace:** URL/state specs.

## 19. Important empty/error states

| State blueprint | Structure and recovery | Focus/status |
|---|---|---|
| Search/PLP zero | `[H1/query/count=0] [active chips] [remove/clear controls] [departments] [Shop/Recipes]` | Announce once; never silently relax |
| Empty wishlist/cart | `[H1] [what is empty] [Shop departments] [Recipes]` | H1 route focus; no alarm |
| Unavailable PDP/variant | `[identity/facts] [unavailable text] [other explicit variants] [category/search]` | Variant change notice; no auto-substitute |
| Stale cart | `[review summary] [affected lines old/new facts] [resolve controls]` | Summary focus only after blocked checkout |
| Recipe partial/unmapped | `[all rows] [reason] [explicit omit/substitute] [updated selected count]` | Link summary to row; no silent omission |
| Persistence/offline | `[persistent warning] [session-only consequence] [retry/continue explicitly]` | Polite once; warning remains visible |
| System/data error | `[stable shell/H1] [affected action] [retry] [safe escape] [sanitized reference if any]` | Alert when blocking; no stack/secrets |

## Global reduced-motion/no-animation equivalent

Drawers/dialogs appear and disappear without transition; sticky changes do not animate position; skeleton shimmer becomes static; content ordering, state commits, focus movement, announcements and navigation are identical. No CTA waits for scroll animation or GSAP completion.
