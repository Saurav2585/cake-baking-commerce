# Reduced Motion and No-Animation Contract

**Phase:** 4B — Motion System and Asset Production Blueprint

**Status:** Reconciled Phase 4B recommendation

## Modes and precedence

- **Reduced:** activated by `prefers-reduced-motion: reduce`; cannot be overridden to full without an explicit future accessibility decision.
- **None:** review/test/user flag; all durations and delays are zero.
- **No JavaScript:** server/static rendering without enhancement code.
- **Constrained:** capability fallback; keeps only short P1 orientation effects.

Precedence is no-JS/static → none → reduced → constrained → full. A mode change cancels active timelines and applies the newest semantic final state immediately.

## Invariants in every mode

- Same content, source order, controls, accessible names, selected/expanded/busy/error states and destinations.
- Focus transfer/return, route focus and error-summary focus remain immediate and visible.
- Live status is emitted once after domain state commit; animation produces no announcement.
- No element is hidden, inert, unclickable or removed solely because enhancement did not run.
- Demo disclosures, price/availability, critical facts and recipe quantities remain unchanged.

## Exact signature replacements

| Full-motion pattern | Reduced | None / no JavaScript |
|---|---|---|
| Measured ingredient opening placement/rule draw | Final field, rule, marker, H1 and actions rendered together; no travel/scale/stagger | Same final static opening |
| Department atlas grouped alignment and tile feedback | Static final atlas; focus ring/selected marker changes immediately | Static ordered links; CSS focus remains |
| Ingredient Theatre texture/annotation connection | Static premise, pack and texture; selected study swaps immediately or ≤100 ms opacity | Default complete study; ordinary links/content for alternatives |
| Recipe-to-supplies path and recalculation | Static labelled path; values replace atomically, optional ≤100 ms opacity | Static explanation; no false interactive add if application JS absent |
| PDP pack crossfade/scale | Immediate media/fact replacement after resolved selection; no scale | Server/default variant complete; progressive variant path remains truthful |

## Exact utility replacements

| Pattern | Reduced / none behaviour |
|---|---|
| Disclosure/search suggestions | Appears/disappears immediately at expanded-state change; active descendant unchanged |
| Navigation/filter/mini-cart drawer | Final open/closed position immediately; scrim immediate; focus/inert/return unchanged |
| Dialog | Immediate visibility; initial focus and return unchanged |
| Product-card hover/focus | No media movement/elevation transition; persistent focus boundary and static hover treatment |
| Wishlist/cart feedback | Immediate pressed/count/status change; no burst, spring or pulse |
| Add success | Persistent text/status and cart count update immediately; no button/cart emphasis required |
| Media/gallery change | Immediate loaded swap in reserved frame |
| Quantity/price/total change | Immediate text replacement with tabular layout; status once |
| Filter/search results | Immediate committed results; no grid crossfade/cascade |
| Recipe include/override/substitute | Immediate marker/text/math; blocking summary and focus immediate |
| Cart line remove/reconcile | Focus placed first, then immediate final list; no collapse |
| Loading spinner/shimmer | Static busy icon/label and reserved neutral skeleton; semantic busy remains |
| Error/unavailable | Immediate persistent panel/inline text; never shake/flicker |
| Confirmation flourish | Static decorative key frame or omitted; confirmation prose unchanged |
| Scroll entrances/parallax/sticky animation | Final composition visible; no scroll-linked transforms; optional sticky layout remains only if non-obscuring |
| Smooth scroll | Instant programmatic scroll when required to expose focused target |

## Animation-disabled implementation

Apply a root motion mode before first paint where possible. Set semantic durations/delays to zero, disable scroll observers/tickers and ensure animation initial styles are never shipped as the base CSS state. The final state is the stylesheet/HTML default; enhancement code opt-in creates temporary animation values.

Testing mode must be directly selectable (for example, a documented query or review control) without changing commerce/data semantics. It cannot merely speed animations to near zero; callbacks must not be required at all.

## No-JavaScript contract

- Navigation links, department atlas, product facts, recipe content, demo disclosures and recovery paths render in HTML.
- Search/filter/variant/cart functionality follows the production application’s declared progressive-enhancement boundary; unavailable client-only actions are explicitly unavailable and never simulate success.
- Drawers/disclosures use native/platform-capable fallbacks where implemented or expose equivalent links/content in the page.
- No `opacity: 0`, translated-offscreen content, animation-only class or loading skeleton obscures server content.
- Static/default media has dimensions and alternatives; generated decorative layers may be absent.

## Focus visibility and dynamic status

Focus styling is never transitioned through invisible/low-contrast states. Opening overlays establishes semantics and focus synchronously. Closing restores focus even if visual animation is disabled or interrupted. Route focus and linked error-summary focus use instant scrolling under reduced/none.

Status text is owned by the Phase 3 region contracts. Reduced/no-animation does not add, remove, delay or duplicate messages. Busy state has static text/icon alternatives and does not rely on rotation.

## Content equivalence audit

For each animated element, record: semantic owner; final visible content; whether decorative; reduced replacement; no-JS result; focus/state dependency; and status owner. A difference in product facts, control availability, cart math, recipe mapping, error recovery or demo qualification is release-blocking.

## Testing requirements

1. OS-level reduced motion before initial load and toggled while every signature/overlay is active.
2. None mode on every representative route and all approved viewport widths.
3. JavaScript blocked before load; inspect server/static content and link recovery.
4. Keyboard-only completion of navigation, search, filters, variants, recipe review, cart and simulated checkout in reduced mode.
5. Screen-reader spot checks confirm unchanged names/states and one status announcement.
6. Rapid repeated actions and Escape during opening/closing leave final state and focus correct.
7. 320 CSS px, 200%/400% zoom, forced colours, orientation and virtual keyboard.
8. Automated style inspection finds no active animation/transition/scroll timeline in none mode.
9. Screenshot diff verifies the same final information hierarchy across full/reduced/none.

## Acceptance

Reduced motion is a deliberately complete experience, not a degraded fallback. Failure to meet an invariant removes the optional motion from full mode until corrected.
