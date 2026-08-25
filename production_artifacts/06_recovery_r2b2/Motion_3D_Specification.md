# Motion / 3D Specification — R2B2A (Real-Catalog Motion System)

**Gate:** R2B2A — Recovery Multi-Agent Execution Plan, Task 4 (3D/Parallax Experience Expert)
**Status:** Specification only. No implementation code written by this task.
**Repository state analyzed:** branch `recovery/real-commerce-visuals`, HEAD `15e621d8077ac60af9adf1e4d668ecf2416cd695`.

**CLAUDE-GENERATED IMAGES: 0**

**Asset Requests filed by this task: none.** Every sequence specified below is storyboarded exclusively against real photographic assets already present in the repository (`src/data/real-products.ts` entries and `public/real-products-v2/*` / department tile imagery). `production_artifacts/06_recovery_r2b2/Asset_Requests_For_External_Generation.md` was checked and does not yet exist; this task does not create it because it has nothing to append.

---

## 0. Method

Simplest-technique-first is applied to every candidate moment: **CSS → 2D GSAP → 2.5D GSAP → WebGL**. A heavier technique is used only where the lighter one cannot express a *coordinated, interruption-safe, multi-element* transform (per `Motion_Principles.md` §"Library boundary": "GSAP is justified only for a coordinated signature timeline, interruptible multi-element transform or deterministic review seeking that CSS cannot express maintainably"). Where existing CSS `:hover`/`:focus-within` transitions already satisfy a moment (they do, in several places — see §1), that CSS is left in place and not re-implemented in GSAP.

---

## 1. Supersession audit of the Phase 4B fictional-catalog motion system

`production_artifacts/04_motion_assets/*` and `production_artifacts/04_visual_system/Motion_Opportunity_Map.md` were written for **The Measured Pantry** — an illustrated/fictional-packaging visual premise ("Measureloom" system, ingredient-macro "Ingredient Theatre," CSS/SVG "measurement rule" marks, a fictional homepage "ingredient composition" hero) that **no longer exists in this codebase**. The current homepage (`src/app/page.tsx`, `src/app/globals.css`) uses 48 real, provenance-verified product photographs (Callebaut, Magic Colours, Wilton, Bakersville, etc. — see `design_review/recovery_r2b1/R2B1_Catalog_Summary.md`) inside a plain 4-image collage grid, real department photography in `.department-atlas`, and real product rails. There is no measurement-rule SVG, no ingredient macro texture, no fictional packaging label system, and no "raw → measure → method → make" illustrated sequence anywhere in `src/`.

**Explicitly superseded (stale — do not carry forward as-is):**

| Phase 4B artifact / concept | Why it is stale |
|---|---|
| `Signature_Motion_Choreography.md` §1 "Measured ingredient homepage opening" (ingredient field, measurement rule draw, spoon/quantity marker) | No such illustrated assets exist; the real hero is a 4-photo product collage, not an ingredient-abundance composition. |
| `Signature_Motion_Choreography.md` §3 "Controlled Ingredient Theatre product study" (ingredient macro texture → pack) | No ingredient-macro asset family was produced for the real catalog; product cards show only the verified packshot, no macro texture layer. |
| `Page_Level_Motion_Map.md` rows "Homepage opening," "Homepage raw → measured → made sequence," "Ingredient Theatre product study" | Depend on the same non-existent illustrated asset family. |
| `Packaging_and_Label_System.md`, `Product_Asset_Matrix.md`, `Asset_Pilot_Brief.md`, `Asset_Production_Strategy.md` | Entire fictional-packaging production framework; the real catalog uses verified third-party photography instead, governed by `production_artifacts/05_catalog_production/Catalog_Asset_Manifest.json`, not the Phase 4B manifest schema. |
| `Motion_and_Asset_Traceability_Matrix.md` rows tied to "Measured ingredient homepage opening asset," "Ingredient Theatre product transition," "Department and ingredient macro assets," "Packaging and label family," "Recipe imagery" (as fictional/illustrated) | Traceability chain assumes the fictional asset family; the real catalog's provenance chain is `Product_Provenance_Register.md` → `Catalog_Asset_Manifest.json`, unrelated to this matrix. |
| `Phase_4B_Readout.md` "Demonstrated moments" and "Asset-system recommendation" | Describes the illustrated-prototype demonstration and the fictional packaging framework as delivered; neither exists in this real-catalog implementation. |

**Explicitly retained (the underlying principle is reusable and is re-applied below, unchanged in spirit):**

| Retained principle | Source | How it is reused in this spec |
|---|---|---|
| Duration/easing/distance/stagger token table | `Motion_Tokens.md` | Every storyboard below cites these exact tokens (e.g. `motion-duration-section` 420 ms, `motion-stagger-tight` 35 ms, `motion-distance-large` 20 px max) rather than inventing new timing. |
| Interruption/cancellation contract (latest-state-wins, kill-on-route-change/resize/visibility-loss) | `Motion_Principles.md` §"Interruption and cancellation" | Applied verbatim to the PDP variant swap (§5) and hero parallax (§4). |
| Reduced-motion invariants and exact-replacement table shape | `Reduced_Motion_and_No_Animation_Contract.md` | Reused as the template for every "Reduced motion" row below; the codebase's actual `@media (prefers-reduced-motion: reduce)` block in `globals.css:1231-1243` already implements the CSS half of this contract (kills all `animation`/`transition` duration to 0.01ms) and `motion-enhancer.tsx:15` already implements the JS half (`matchMedia("(prefers-reduced-motion: reduce)").matches` early-return before any GSAP timeline is created). Nothing new needs to be invented here — only extended to new targets. |
| Performance budget shape (frame cadence, long-task ceiling, concurrency caps, LCP protection) | `Motion_Performance_Budget.md` (Phase 4B) | Re-derived with real-catalog-specific numbers in the companion `Motion_Performance_Budget.md` (this gate), not reused blindly since the asset weights differ (real JPEG/WebP photography vs. planned illustrated SVG/AVIF). |
| "No pin beyond one viewport," "at most one optional scrub region," R-026 sticky caution | `Motion_Tokens.md` §"Scroll-linked limits"; `docs/Risk_Register.md` R-026 | Directly governs the hero decision in §4 — result: **no pin used anywhere in this spec.** |
| Generic-motion test | `Motion_Principles.md` | Applied to each classified moment in its own section. |

The five *specific* Phase 4A/4B "signature moments" are not carried forward by name — they were authored against assets that don't exist. Instead, this spec independently classifies the five real moments named in the R2B2A task brief and builds new, real-catalog-native storyboards using the same token/contract *system*.

---

## 2. Classification summary

| # | Signature moment | Classification | Storyboard below? |
|---|---|---|---|
| 1 | Homepage real-product hero (`.hero-collage`) | **2.5D GSAP (bounded, non-scroll-scrubbed)** | §4 — Storyboard A |
| 2a | Department atlas tiles (entrance) | **2D GSAP (grouped stagger, reused pattern already proven in `motion-enhancer.tsx`)** | §5 — Storyboard B |
| 2b | Department atlas tiles (hover/focus) | **MICRO-MOTION — already implemented in CSS** (`globals.css:563-570`, `.tile-image img` `transform: scale(1.05)` on hover/focus-visible, 0.25s) | Not re-specified; left as-is |
| 2c | Bestseller / new-arrival / essentials rails (entrance) | **2D GSAP (single-group settle, no per-card stagger)** | §5 — Storyboard B |
| 2d | Product cards (hover/focus, wishlist, quick-add) | **MICRO-MOTION — already implemented in CSS** (`globals.css:725-816`, `.rp-card` lift + shadow, `.rp-image img` scale, `.rp-add:active` press) | Not re-specified; left as-is |
| 3a | PDP gallery — variant-owned pack change (primary image + fact panel) | **2D GSAP (atomic swap)** | §6 — Storyboard C |
| 3b | PDP gallery — thumbnail click / quantity input | **MICRO-MOTION or STATIC** (immediate swap; no motion adds value to a pressed thumbnail or a typed number) | Not storyboarded — see §6.4 |
| 4 | Recipe-to-cart measured transformation (`recipe-review.tsx`) | **STATIC, with MICRO-MOTION only on the one changed row's math** | §7.1 — no storyboard required |
| 5 | Cart feedback (add-to-cart, `count-badge`) | **MICRO-MOTION (CSS spring, no GSAP)** | §7.2 — no storyboard required |

No moment in this scope is classified TRUE 3D or WEBGL. See §9 for the explicit verdict and reasoning.

---

## 3. Shared Z-axis vocabulary (Z0–Z6)

A consistent depth vocabulary is used across every storyboard so QA and engineering read them the same way. Not every sequence uses every layer — each storyboard states which layers are populated for it.

| Layer | Meaning | General rule |
|---|---|---|
| **Z0** | Static section/page background (gradient, solid surface) | Never animates. |
| **Z1** | Farthest static content (body copy, headings, non-interactive text blocks) | Only opacity/small-y entrance permitted; never continuous motion. |
| **Z2** | Primary/anchor media (the LCP-critical or largest product image) | Minimal or zero parallax travel; protected from anything that risks LCP or legibility. |
| **Z3** | Secondary supporting media | Small parallax/entrance travel, always less than Z4. |
| **Z4** | Foreground/overlapping accent media (already visually "closest" via z-index, rotation, or shadow in the existing design) | Largest parallax/entrance travel, bounded by `motion-distance-large` (20 px) or `motion-distance-signature` ceiling in `Motion_Tokens.md`. |
| **Z5** | Interactive controls (buttons, links, form inputs) | **Never transforms as part of a decorative sequence.** Always full opacity, full pointer-events, from the first rendered frame. |
| **Z6** | Optional cursor-reactive decorative accent | Desktop-only, opt-in, first to be removed under any constraint; unused unless a storyboard explicitly populates it. |

---

## 4. Storyboard A — Homepage hero controlled 2.5D depth (`.hero-collage`)

### User value
The hero collage (`src/app/page.tsx:78-120`, `globals.css:414-458`) already stages four real, verified packshots with an implied depth relationship the static CSS can't fully sell: `.collage-large` (Callebaut 811, LCP image) fills the left column; `.collage-a`/`.collage-b` (Magic Colours gel, Wilton bags) stack on the right; `.collage-small` (Bakersville fondant) is absolutely positioned, rotated −6°, drop-shadowed and z-indexed above the large image — i.e. the design already *tells* the viewer "this one is physically closer." A bounded 2.5D treatment makes that implied physicality legible on interaction (subtle parallax response) and on arrival (staged depth-ordered settle), reinforcing "real brands, exact packs, ready to bake" — the literal H1 — with a tangible-object cue, not a generic hero fade. It must not compete with or delay the "Shop baking essentials" CTA, which is copy-panel content, not part of this sequence at all.

### Classification justification (why above 2D GSAP)
A single-plane fade/slide (2D GSAP) would treat all four packshots as one flat block, discarding the depth relationship the layout already encodes. Expressing *different* travel distances for Z2/Z3/Z4 in a coordinated, interruption-safe, pointer-reactive way is a coordinated multi-element transform — the case `Motion_Principles.md` reserves for GSAP. It is **not** WebGL/true-3D: no 3D scene, camera, mesh, or off-DOM rendering is needed — 2D `transform: translate()` on stacked DOM layers is sufficient, which is why this stays at "2.5D GSAP," the lightest technique that can express the effect.

### Z-layer map (this sequence only)
| Layer | Occupant | Populated? |
|---|---|---|
| Z0 | `.hero-collage` gradient background panel | static |
| Z1 | `.hero-copy-panel` (eyebrow, H1, description, meta list) | unchanged — continues to use the existing `data-measure-reveal` entrance already in `motion-enhancer.tsx`; not touched by this storyboard |
| Z2 | `.collage-large` (Callebaut 811 packshot, `priority` LCP image) | yes — minimal travel |
| Z3 | `.collage-a` + `.collage-b` (Magic Colours gel, Wilton bags) | yes — moderate travel |
| Z4 | `.collage-small` (Bakersville fondant, rotated/overlapping) | yes — largest travel |
| Z5 | `.hero-actions` (Shop baking essentials / Explore recipes) | populated only to state the invariant: **never transforms, never delayed, always interactive from first frame** |
| Z6 | — | unused; no invented decorative element |

### Phases
- **ENTRY** (page ready, once, not scroll-triggered — hero is above the fold at all reference widths per `design_review/recovery_r2a_rework/screenshots/01-desktop-1440x900-above-the-fold.png`): Z2 settles from `y: 6px, opacity: soft(0.72)` → final over 0–420 ms; Z3 pair settles from `y: 10px` → final over 100–520 ms; Z4 settles from `y: 14px, rotate: -8deg` (2° short of its resting −6°) → final `rotate: -6deg` over 180–620 ms. Copy panel (Z1) entrance is unchanged and runs concurrently via the existing mechanism, not re-timed.
- **BUILD** (desktop pointer only, `hover`-capable + fine-pointer media query; begins on `mousemove` inside `.hero-collage` bounds, after ENTRY completes): a `gsap.quickTo`-driven offset is computed from pointer position relative to the collage center; Z3 receives ~40% of the coefficient, Z4 receives ~100%, Z2 receives ~10% (near-zero, protecting the LCP image from any legibility risk).
- **PEAK**: offsets clamp at Z3 ≤ 12 px, Z4 ≤ 18 px (both under the `motion-distance-large` 20 px ceiling), Z2 ≤ 3 px. No layer ever exceeds this regardless of how far the pointer travels.
- **EXIT**: on `mouseleave`, route change, resize, orientation change, visibility loss, or `prefers-reduced-motion` toggling mid-session, all layers ease back to `(0,0)` over 220 ms (`motion-duration-local`) and the GSAP context is reverted/killed — no stray inline transform survives.

### Trigger / start / end
Trigger: component mount (ENTRY) + `mousemove`/`mouseleave` (BUILD/PEAK/EXIT), scoped inside a `gsap.context()` rooted on `.hero-collage`, following the exact pattern already used in `motion-enhancer.tsx`. **Not scroll-triggered, not scroll-scrubbed.**

### Duration / ease
ENTRY: `motion-duration-section` (420 ms) to `motion-duration-signature` (720 ms) per layer, staggered per §above; ease `motion-ease-enter` (`cubic-bezier(0.16,1,0.3,1)`). BUILD/PEAK pointer response: continuous but interpolated via `gsap.quickTo` (short internal duration ~0.4s per axis update, effectively a responsive follow, not a fixed-length tween). EXIT: `motion-duration-local` (220 ms), ease `motion-ease-standard`.

### Scrub / pin
**Scrub: no. Pin: no.** This is the explicit design decision this task was asked to make. Justification: `Motion_Tokens.md` caps scroll-linked work to "at most one optional signature scrub region per page... progress span ≤60% of one viewport"; `docs/Risk_Register.md` R-026 flags sticky/pinned/dense controls obscuring content or focus on small/zoomed viewports as a Medium/High risk requiring the Phase 3 sticky budget before approval. Since the hero is fully visible above the fold already, a scroll-driven reveal adds no value and a pin would hold the CTA hostage to scroll position — directly against the task's constraint. Using pointer-driven (not scroll-driven) parallax sidesteps both the scrub-budget and the pin risk entirely: it consumes 0 of the "1 optional scrub region" and 0 of the "0 pinned sections" budget defined in the companion `Motion_Performance_Budget.md`.

### Transforms used
`translateX`/`translateY` and `rotate` only (Z4's rotate stays within its existing authored −6° to −8° range, never introduces a new rotation axis), plus `opacity` for the ENTRY phase only. No `filter`, `blur`, `box-shadow` animation, or `scale` beyond what CSS already does on hover for other components. Transform/opacity-only — no flags.

### Breakpoint behaviour
- **Desktop (≥1024px, fine pointer + hover):** full ENTRY + BUILD/PEAK pointer parallax as specified.
- **Tablet/narrow desktop (640–1024px):** ENTRY only; BUILD/PEAK pointer parallax disabled (`hover: none` or coarse-pointer media query is common on hybrid devices; do not assume hover capability from viewport width alone — gate on `(hover: hover) and (pointer: fine)`).
- **Mobile (≤640px):** `globals.css:1159-1177` already collapses `.collage-a`/`.collage-b` to `display:none` and stacks `.collage-large`/`.collage-small` only. ENTRY reduces to 2 groups (Z2, Z4) at ≤8 px travel each, matching the "mobile: maximum three groups, travel ≤8 px" ceiling this task's own §1 retains from `Motion_Principles.md`. No pointer parallax on touch devices under any circumstance (no hover state to build/peak from).

### Reduced-motion equivalent
Full final composition (all four images in their resting position/rotation, exactly as authored in CSS) renders immediately. `motion-enhancer.tsx:15`'s existing `matchMedia("(prefers-reduced-motion: reduce)").matches` early-return is extended to also skip attaching the `mousemove` listener entirely — not just skip the tween. This is a real usable equivalent, not "disabled": the shopper sees the identical finished collage and identical CTA with zero missing information, per `Reduced_Motion_and_No_Animation_Contract.md`'s invariant that reduced mode is "a deliberately complete experience, not a degraded fallback."

### Low-power/mobile equivalent
Identical to the mobile breakpoint behaviour above (ENTRY-only, 2 groups, ≤8px) — mobile devices are, by definition in this spec, also the low-power/coarse-pointer case, so no separate fallback tier is needed beyond the `(hover: hover) and (pointer: fine)` gate already specified.

### Asset dependency
**Existing files only.** `heroLarge`, `heroA`, `heroB`, `heroSmall` are already resolved in `page.tsx:44-49` from `realProductsById` — real, provenance-verified photographs already shipping. Zero new Asset Requests.

### Performance note
Only the pointer-driven layers (Z2/Z3/Z4, 3 elements) receive `will-change: transform` and only while the pointer is inside `.hero-collage` bounds; it is removed on `mouseleave`/unmount. The LCP image (Z2) is never delayed, never starts at `opacity: 0`, and receives ≤3px of travel specifically so no legibility or paint-cost risk touches the largest asset on the page. See `Motion_Performance_Budget.md` §"Hero parallax budget" for exact numeric limits.

---

## 5. Storyboard B — Department atlas + discovery rail entrance

### User value
The department atlas (`.department-atlas`, `globals.css:540-603`) is the primary catalog-discovery moment on the homepage: 7 real departments (Chocolates & Cocoa, Baking Essentials, Colours/Flavours/Essences, Fondant/Fillings/Toppings, Sprinkles & Edible Decoration, Baking Tools & Bakeware, Cake Boards/Boxes/Packaging — see `R2B1_Catalog_Summary.md`) plus a Recipes tile, already laid out in the deliberately irregular 4-column/2-row grid with `tile-2`/`tile-3` offset `translateY(3rem)`. A short, grouped entrance communicates "this is an organized, browsable assortment" the instant it scrolls into view, exactly the effect `Signature_Motion_Choreography.md`'s (now-superseded-in-asset-terms, but structurally reusable) "irregular department atlas" pattern targeted — this repository's real 8-tile layout is coincidentally almost identical in shape (8 links, paired grouping) to that original spec, so the *choreography* transfers even though the *imagery* is entirely different.

### Classification justification
CSS alone can do a single fade-in but cannot cleanly express "boundary resolves first, then four *paired* groups settle with a small stagger" as one cancellable, re-triggerable (on route restoration) sequence without either JS-driven class orchestration (which is just GSAP with extra steps) or overly clever CSS animation-delay chains that can't be cancelled mid-flight on interruption. This qualifies as the "coordinated timeline CSS can't express maintainably" case. It stays **2D**, not 2.5D — there is no depth-layer relationship to express here (unlike the hero), only a grouped-reveal relationship.

### Z-layer map (this sequence only)
| Layer | Occupant | Populated? |
|---|---|---|
| Z0 | `.department-atlas` grid container | static |
| Z1 | `.tile-image` (real department photography, `object-fit: cover`) | yes — settles as part of each tile's group |
| Z2 | `.department-tile::after` gradient overlay | static, unchanged |
| Z3 | Tile text (`span` number, `h3`, `p`) | static — **never moves independently of its tile**, per `Component_Motion_Specification.md`'s binding restriction that "department-atlas transforms never alter DOM order or destination geometry during activation" |
| Z4 | Rail cards (`.rp-rail` container as one unit) | yes — single-group settle only |
| Z5 | Tile/card links themselves, wishlist buttons, quick-add buttons | untouched — existing CSS hover/focus states (`globals.css:567-570`, `730-735`, `810-816`) remain the only motion here |
| Z6 | — | unused |

### Phases (department atlas)
- **ENTRY:** triggers once at 20% visibility via `IntersectionObserver` (one observer for the whole `.department-atlas` region, not one per tile). BUILD: atlas boundary/container resolves first (`opacity: soft → 1`, 0–160 ms). PEAK: four paired groups — (tile-1, tile-2), (tile-3, tile-4), (tile-5, tile-6), (tile-7, tile-8/recipes) — each receive a `motion-stagger-tight` (35 ms) offset, total group settle 420 ms per `motion-duration-section`, each tile animating `y: 6px → 0, opacity: soft → 1`. EXIT: none needed — the sequence terminates at its resting (already-authored) CSS position, including the pre-existing `translateY(3rem)` offset on tile-2/tile-3, which this entrance animates *into*, not *away from*.

### Phases (rails — bestsellers / new arrivals / essentials / tools)
- **ENTRY:** same `IntersectionObserver` pattern, one observer per rail section (or one shared observer watching all rail `<section>` elements). BUILD/PEAK: the entire `.rp-rail` container settles as **one single group** — `y: 8px → 0, opacity: soft → 1` over 420 ms, `motion-ease-enter`. **No per-card stagger.** This is a hard rule, not a preference: `Motion_Tokens.md` §"Delay and stagger" states "Never stagger result cards" and `Motion_Performance_Budget.md` (Phase 4B) caps simultaneous animated elements at ≤6 desktop/≤3 mobile — a 4–8 card stagger would blow both. EXIT: none.

### Trigger / start / end
`IntersectionObserver`, 20% threshold, `once: true` semantics (matches `Motion_Tokens.md`'s "Entrances trigger once at a 15–25% visibility threshold"). If the region is already visible on load (e.g. tall viewport, or Back/forward restoration mid-scroll), settle immediately without delay — no replay on Back navigation, per `Page_Level_Motion_Map.md`'s retained restoration rule.

### Duration / ease
Atlas boundary: `motion-duration-local` (220 ms). Paired tile groups: `motion-duration-section` (420 ms) + ≤105 ms total stagger extension (4 groups × ~35ms, well under the 240ms `motion-stagger-cap`). Rail single-group settle: `motion-duration-section` (420 ms). Ease: `motion-ease-enter` throughout.

### Scrub / pin
No scroll scrub, no pin — this is a one-shot intersection-triggered entrance, not a scroll-linked progress effect.

### Transforms used
`translateY` + `opacity` only. No scale, no blur, no rotation. Transform/opacity-only.

### Breakpoint behaviour
- **Desktop:** full 4-paired-group atlas entrance as specified; rail single-group settle.
- **Tablet (≤1024px):** `globals.css:1074-1080` already resets `tile-2`/`tile-3`'s `translateY(3rem)` offset and collapses the grid to 2 columns — the entrance simplifies to a single boundary settle (no pairing), matching the retained "mobile: entrance becomes a single boundary/number settle, no tile cascade" rule.
- **Mobile (≤640px):** atlas and rails both collapse to 1-column (`globals.css:1181-1191`); same single-group settle rule applies to both.

### Reduced-motion equivalent
Static final atlas and rails, all tiles/cards visible in their authored resting position (including the irregular `translateY(3rem)` offset, which is layout, not motion, and is untouched by `prefers-reduced-motion`). Immediate, no observer-driven timeline initializes at all — `motion-enhancer.tsx`'s existing top-of-effect reduced-motion check is extended to also skip attaching the `IntersectionObserver`.

### Low-power/mobile equivalent
Same as mobile breakpoint above; if a sustained dropped-frame condition is measured (per `Motion_Performance_Budget.md`'s constrained-mode trigger), the atlas/rail entrance is the first decorative sequence removed, before the hero parallax, because it is the more replaceable of the two (the hero already has a static fallback that reads as fully finished; the atlas entrance's absence is even less noticeable since the grid's real content is discovery-critical and already fully static-legible without it).

### Asset dependency
**Existing files only** — real department tile imagery (`departmentTileImage`, `page.tsx:143`) and real product rail thumbnails already resolved from `realProductsByBadge`. Zero new Asset Requests.

### Performance note
One shared `IntersectionObserver` for the atlas region and one (or one shared) for the rail sections — never one observer per card, per `Motion_Performance_Budget.md`'s "one observer per signature region or shared observer, not one observer/timeline per card." See companion budget file for the exact simultaneous-layer ceiling this must respect.

---

## 6. Storyboard C — PDP variant-owned atomic pack swap

### User value
`product-detail.tsx:56-89` currently renders `<Image key={media.src} .../>` — a React `key` change on variant selection forces a full unmount/remount, which is a hard visual cut with no continuity between the previously-selected pack and the newly-selected one. For a store built on "exact packs, ready to bake," the moment a shopper switches from a 400g to a 1kg Callebaut pack (or between fondant colours) is exactly the moment continuity matters most: the pack, its price, its unit price, and its availability must read as *one resolved fact set*, not a flash of new content. A short, coordinated crossfade — image and fact panel moving together — makes that atomicity visible without implying anything about stock, price change, or performance.

### Classification justification
This is the textbook case `Motion_Principles.md` reserves for GSAP: coordinating two DOM regions (image layer + price/pack fact block) as one interruption-safe unit, where a rapid second variant click must cancel the first crossfade mid-flight and jump straight to the latest selection with no visual queue. A bare CSS transition on a re-keyed element cannot express "cancel the in-flight tween and restart from wherever it currently is" as cleanly as `gsap.context()` + `kill()`. It stays 2D — this is a flat crossfade + scale-settle, not a depth relationship, so 2.5D is not warranted here.

### Z-layer map (this sequence only)
| Layer | Occupant | Populated? |
|---|---|---|
| Z0 | `.pdp-primary` frame background | static |
| Z1 | — | unused (no separate far-background element in the PDP gallery) |
| Z2 | Incoming variant image | yes — scales in from 0.98, opacity 0→1 |
| Z3 | Outgoing variant image (kept mounted only for the crossfade duration) | yes — opacity 1→0, then unmounted |
| Z4 | — | unused (no foreground accent layer on PDP) |
| Z5 | Fact panel (price, pack size/SKU, availability paragraph), variant selector buttons, thumbnails | fact panel crossfades atomically with Z2/Z3; buttons/thumbnails themselves never transform, only their `aria-pressed` state changes instantly |
| Z6 | — | unused |

### Phases
- **ENTRY:** none — this sequence has no page-load entrance; it is purely action-triggered.
- **BUILD:** on a valid variant button click (`onClick={() => setSelectedId(v.id)}`, `product-detail.tsx:77`), the incoming image is preloaded into a second, absolutely-positioned layer stacked over the outgoing one (both occupy the same reserved `.pdp-primary` frame — no CLS). `aria-pressed` on the clicked variant button updates immediately, synchronously with the click, not gated on the animation.
- **PEAK:** incoming layer (Z2) animates `opacity: 0 → 1, scale: 0.98 → 1` over 220 ms while outgoing layer (Z3) animates `opacity: 1 → 0` over the same window; the fact panel (Z5-adjacent text block: price/pack/availability) crossfades as one paired unit in the same 220 ms; its leading rule/border receives one 160 ms non-colour highlight (background/border-color pulse, not a colour-only signal — text also updates) confirming the swap landed.
- **EXIT:** on a second, rapid variant click before the first crossfade finishes, the in-flight timeline is killed via `gsap.context().revert()` (or a scoped `tween.kill()`) and a new crossfade starts immediately from whatever opacity/scale the layers are currently at, resolving to the newest clicked variant — never queuing, never visually settling on an intermediate variant the user already abandoned. This directly implements `Motion_Principles.md`'s "a new action affecting the same target cancels the prior timeline and resolves... to the newest committed state" and the already-documented PDP acceptance criterion in `Signature_Motion_Choreography.md` §5: "three rapid selections end on the last variant with no queue."

### Trigger / start / end
Trigger: valid variant `onClick`. Start: image/fact-panel opacity states at click time. End: fully resolved image + fact panel + `aria-pressed` state for the newly selected variant, with no residual transform, opacity, or extra DOM node left behind (outgoing layer unmounts after its fade completes or is killed).

### Duration / ease
220 ms (`motion-swap-atomic` composition token = local + standard + crossfade), plus a 160 ms non-colour highlight capped separately — total sequence ≤ 260 ms, matching the token ceiling `Signature_Motion_Choreography.md` (retained principle) sets for this exact pattern. Ease: `motion-ease-standard`.

### Scrub / pin
Not applicable — this is not a scroll effect. No pin: `.pdp-primary`'s existing layout is not sticky-dependent for this sequence, and nothing here alters sticky purchase-panel behaviour.

### Transforms used
`opacity` + `scale` (image layers only, 0.98→1, within the `motion-scale-enter` token ceiling). Fact panel: `opacity` only. No `blur`, no layout-property animation (no width/height/position changes — the frame is reserved and fixed).

### Breakpoint behaviour
- **Desktop:** full crossfade + scale as specified.
- **Mobile / coarse-pointer / low-memory:** crossfade only — the `scale: 0.98 → 1` on the incoming image is removed (opacity-only swap), per the retained Phase 4B PDP rule "mobile: crossfade only; remove scale on low-memory/coarse-pointer devices," which remains valid engineering guidance independent of the illustrated-asset premise it was originally written next to.

### Reduced-motion equivalent
Immediate atomic replacement: incoming image and fact panel appear in their final state the instant the variant click commits, with no scale, no travel, no crossfade — matching `Reduced_Motion_and_No_Animation_Contract.md`'s existing row "PDP pack crossfade/scale → Immediate media/fact replacement after resolved selection; no scale," which this spec reuses verbatim since it was never asset-dependent in the first place.

### Low-power/mobile equivalent
Same as the mobile breakpoint above (crossfade only, no scale); if profiling shows even the opacity crossfade contends with interaction latency on a representative low-tier Android-class device, fall back further to the current hard-cut `key`-remount behaviour (i.e., ship no PDP motion at all) rather than degrade interaction responsiveness — per `Motion_Performance_Budget.md`'s (Phase 4B, retained principle) failure policy: "Remove in order: blur/filter; spring; stagger; scroll-link; decorative media layer; entire signature animation."

### Asset dependency
**Existing files only.** Every variant's media already resolves via `resolveMedia(product.id, variant.id)` (`product-detail.tsx:24`) from the real catalog's asset manifest. Zero new Asset Requests. (Two of the 48 R2B1 products were flagged "quality-limited" and are Agent 1's remit to resolve in this same gate — not a motion concern; whatever image ships is what this crossfade uses, unchanged.)

### Performance note
At most 2 raster layers are concurrently mounted in this region during the crossfade window (incoming + outgoing), matching `Motion_Performance_Budget.md`'s "Concurrent incoming/outgoing raster layers: 2 in one region" ceiling; the outgoing layer is released (unmounted) immediately after the crossfade completes or is killed — never left promoted to a compositor layer indefinitely.

### 6.4 Non-storyboarded PDP items
Thumbnail clicks and the quantity `<input type="number">` are classified **MICRO-MOTION/STATIC**: thumbnails already act as the variant selector (same `onClick={() => setSelectedId(v.id)}` mechanism, so they trigger Storyboard C, not a separate effect); the quantity input must never animate mid-typing per `Motion_Tokens.md`'s "typed edits remain static," and a single-digit committed-quantity crossfade would be motion for its own sake on a value shoppers scan, not admire — STATIC is correct here, no storyboard needed.

---

## 7. Non-storyboarded moments (STATIC / MICRO-MOTION only)

### 7.1 Recipe-to-cart measured transformation (`recipe-review.tsx`)

**Classification: STATIC, data-integrity-first, with MICRO-MOTION permitted only on the one row a user just changed.**

This is a deliberate conclusion, not an omission. `recipe-review.tsx` computes required/selected/purchased/leftover quantities via `selectSmallestSufficient`/`selectSingleVariant` (`src/lib/domain/recipe-solver.ts`) and renders them as a dense, scannable table of facts a shopper needs to trust before committing to a cart addition. `Motion_Principles.md` explicitly prohibits motion "for unsupported product transformation" and lists "recipe calculations" among the surfaces springs are prohibited on; `Motion_Tokens.md` states plainly that "recipe calculations" cannot host spring behaviour; and this repository's own Risk Register (R-004, R-021, R-041) treats recipe-to-pack mapping correctness as a high-likelihood/high-impact risk requiring the math to stay verifiably exact — the correct instinct here is to keep this the calmest surface in the product, matching the intensity gradient every retained Phase 4B document agrees on ("recipe review, cart and checkout are calmest").

The one permitted micro-motion: when a shopper changes the "Override pack" `<select>` on a row (`recipe-review.tsx:160-185`), the row's Purchased/leftover/price text (`recipe-review.tsx:153-159`) may receive a single ≤160 ms non-colour background/border emphasis (CSS `transition: background-color` triggered by a class toggle on state change, not a GSAP timeline) so the shopper notices *which* row responded to their override — never a stagger across other rows, never before the new value is already committed and rendered (the text itself updates synchronously with React state; the emphasis is purely a "look here" cue layered on top of already-correct content). This is CSS, not GSAP — no coordinated multi-element transform is needed for a single row's background-color pulse, so 2D GSAP would be reaching for a heavier tool than the goal requires.

The servings-change status text (`role="status"`, `recipe-review.tsx:121-124`) and the `included`/checkbox state must never animate at all — they are the surface's core trust signal.

### 7.2 Cart feedback (add-to-cart confirmation, `count-badge`)

**Classification: MICRO-MOTION, CSS-only spring, no GSAP.**

`site-header.tsx:191/200/272/279` already renders `<span className="count-badge">{cartCount}</span>` conditionally; `commerce-provider.tsx:86-99`'s `addLine` already updates cart state synchronously and emits the one `announcement` live-region text ("Product, pack, added to demo cart") that owns the accessible confirmation — the functional confirmation already exists and is correct today. The only thing worth adding is a brief, critically-damped visual acknowledgement on the badge itself when its count changes, exactly matching `Motion_Tokens.md`'s explicit allowance: "Springs are permitted only for a small decorative ingredient placement or successful wishlist/cart-count acknowledgement... critically damped... total ≤320 ms, displacement ≤6 px or scale ≤1.02."

This is implementable as a pure CSS `@keyframes` pulse (scale 1 → 1.02 → 1, ≤320 ms, one settle, no overshoot) triggered by toggling a short-lived class when `cartCount` changes (e.g. via a `useEffect` comparing previous/current count in `site-header.tsx` — implementation detail for Agent 5, not this task). **No GSAP timeline is justified**: a single element's scale pulse is not a coordinated multi-element transform and CSS `@keyframes` already expresses "one settle, no overshoot, deterministic duration" natively and more cheaply than instantiating a GSAP tween for it. This is the clearest example in this spec of the simplest-technique-first rule resolving to CSS even though the moment is real and worth doing.

Add-to-cart button itself: the existing `.rp-add:active { transform: translateY(1px); }` (`globals.css:814-816`) already provides pressed-state feedback; no addition needed. No "fly to cart" motion is introduced anywhere — explicitly prohibited by `Motion_Principles.md` and `Motion_Opportunity_Map.md` alike, and this task agrees with that prohibition on its own merits: a flying-product animation implies a spectacle the count-badge pulse already communicates more honestly and faster.

---

## 8. GSAP technical notes

- **Installed version:** `gsap@3.15.0` (`package.json`). Confirmed against `node_modules/gsap/package.json`. This is a post-"GSAP is now free" release — every plugin (`ScrollTrigger.js`, `Flip.js`, `Observer.js`, `MorphSVGPlugin.js`, etc.) ships in the base package and is importable via `gsap/ScrollTrigger` etc. without a separate club license. This spec does **not** require `ScrollTrigger` — every trigger used above is either mount-time, `IntersectionObserver`-driven, or pointer/click-driven — but it is confirmed available if Agent 5 (Frontend/GSAP Architect) prefers `ScrollTrigger`'s `once: true` ergonomics over a hand-rolled `IntersectionObserver` for Storyboard B; either is acceptable and the choice belongs to that task's `Frontend_GSAP_Architecture.md`, not this one.
- **Existing integration point:** `src/components/motion-enhancer.tsx` is the only GSAP usage in the codebase today — a single `gsap.context()` scoped to a wrapper `<div>`, targeting `[data-measure-reveal]`, with an early `matchMedia` reduced-motion return and `context.revert()` cleanup on unmount. Every storyboard in this spec is designed to extend this exact pattern (additional scoped `gsap.context()` calls, additional data-attribute-selected targets) rather than introduce a second animation architecture.
- **Proposed attribute convention** (for Agent 5 to adopt or supersede): `data-measure-reveal` continues to mean "single-group opacity/y entrance, no depth distinction" (its current, correct use on the hero copy panel, department atlas boundary, and rail containers). A new `data-parallax-layer="z2|z3|z4"` attribute is proposed for the hero collage's four images specifically, so Storyboard A's per-layer coefficients can be selected without inventing a second wrapper component.
- **Interruption pattern:** every storyboard above relies on `gsap.context().revert()` (mount/unmount) or a scoped `tween.kill()` (rapid re-trigger, e.g. PDP variant re-click) — never `gsap.killTweensOf(document.body)` or any unscoped kill that could affect an unrelated timeline.

---

## 9. WebGL / true-3D verdict

**No WebGL or true-3D technique is recommended anywhere in this scope, and this is the correct conclusion, not a gap.** Every moment classified above is fully expressible with DOM `transform`/`opacity` (2D or 2.5D via stacked-layer parallax). A commerce site whose entire value proposition is "real brands, exact packs, verified provenance" gains nothing from a 3D product viewer or WebGL scene — if anything it would work against the site's credibility positioning, which rests on photographic truth (see `docs/Risk_Register.md` R-002, R-008, R-030 on imagery/claim provenance), not synthetic rendering. No signature moment in this task's scope — hero, discovery, PDP, recipe, cart — has a "rotate the object in space" or "explore a 3D environment" user need. If a future 3D product configurator were ever proposed (e.g. a rotatable cake-board mockup), it would need its own justified brief with real user value stated up front, per this spec's own method; nothing in the current five signature moments meets that bar.

---

## 10. Handoff

**Completed:** Classification of all five R2B2A signature moments (homepage hero, discovery/rails, PDP gallery, recipe-to-cart, cart feedback) using simplest-technique-first; full ENTRY/BUILD/PEAK/EXIT storyboards with Z0–Z6 layer maps for the three moments classified 2D GSAP or heavier (hero 2.5D, atlas/rail entrance 2D, PDP variant swap 2D); explicit STATIC/MICRO-MOTION rationale for recipe-to-cart and cart feedback; explicit supersession audit of the Phase 4B fictional-catalog motion system distinguishing stale asset references from reusable token/contract principles; explicit no-WebGL verdict.

**Artifacts created or updated:**
- `production_artifacts/06_recovery_r2b2/Motion_3D_Specification.md` (this file)
- `production_artifacts/06_recovery_r2b2/Motion_Performance_Budget.md` (companion, numeric budgets)
- No Asset Request file created — none was needed.

**Key decisions:**
1. Hero collage gets a bounded, non-scroll-linked 2.5D pointer parallax (desktop-only) plus a depth-staggered entrance — not a scroll-scrubbed or pinned effect, and not "plain 2D entrance only" (justified in §4, since the collage already visually encodes depth the current single-block entrance discards).
2. Department atlas and product rails get a 2D GSAP grouped/single-group entrance, reusing the existing `motion-enhancer.tsx` mechanism and attribute convention; per-card rail stagger is explicitly rejected as a token-contract violation.
3. PDP variant selection gets a 2D GSAP atomic crossfade (image + fact panel as one cancellable unit), replacing the current hard-cut `key`-remount.
4. Recipe-to-cart stays STATIC with one row-scoped CSS micro-highlight — GSAP is explicitly rejected here as reaching for a heavier tool than a data-integrity surface should ever use.
5. Cart-count feedback stays a CSS-only spring pulse — GSAP is explicitly rejected as unnecessary for a single-element scale pulse.
6. No WebGL/3D anywhere in scope.

**Constraints preserved:** No pin used anywhere (0 pinned sections, honouring R-026 and the Phase 4B "no pinning beyond one viewport" token rule). No scroll-scrub used anywhere (0 of the "≤1 optional scrub region" budget consumed). No per-card/per-row stagger on rails or recipe rows. LCP image (hero `.collage-large`) receives ≤3px of parallax travel and zero entrance delay. Reduced-motion and mobile/low-power equivalents specified for every storyboard and are real usable end-states, not disabled states. Zero new imagery generated or requested.

**Open risks:**
- The PDP crossfade (Storyboard C) requires Agent 5's engineering judgment on how to keep two image layers mounted simultaneously against Next.js `<Image>`'s current `key`-remount pattern without introducing layout shift — flagged as a technical dependency for `Frontend_GSAP_Architecture.md`, not resolved here.
- The hero pointer-parallax's exact `gsap.quickTo` coefficients (§4 BUILD) are specified as bounded maximums (Z2 ≤3px, Z3 ≤12px, Z4 ≤18px) but not as exact interpolation curves — real-device tuning is expected during implementation, within these ceilings.
- This spec assumes the current `.hero-collage`/`.department-atlas`/`.rp-rail`/PDP DOM structure remains stable; if Agent 3's `Route_UI_Specification.md` proposes structural changes to any of these regions, this spec's Z-layer maps need re-validation against the new DOM.

**Unresolved questions or assumptions:**
- Assumed `(hover: hover) and (pointer: fine)` is the correct gate for enabling hero pointer-parallax (rather than a raw viewport-width breakpoint) — standard practice, not confirmed against a specific device-testing matrix in this gate.
- Assumed the two "quality-limited" PDP images Agent 1 is independently resolving will not change the *number* of variants per product (which would not affect this spec) — if Agent 1's resolution changes variant *count* materially, Storyboard C's "2 concurrent raster layer" ceiling is unaffected either way.

**Dependencies for next task:** Agent 5 (`Frontend_GSAP_Architecture.md`) needs this file's §8 (technical notes, attribute convention, interruption pattern) and all three storyboards' exact trigger/duration/transform specs to define file ownership and the `gsap.context()`/`gsap.matchMedia()` module boundaries. Agent 6 (QA) needs this file's storyboards plus the companion `Motion_Performance_Budget.md` to build verification steps for concurrency, CLS, LCP, and reduced-motion equivalence.

**Next responsible agent:** Specialist Agent 5 (GSAP/Frontend Architect) for module-boundary and file-ownership planning; Specialist Agent 6 (QA) for acceptance-criteria authoring against this spec's storyboards and the companion budget file.

**Required next action:** Orchestrator reconciles this spec against Agent 3's `Route_UI_Specification.md` (DOM/breakpoint agreement) and Agent 5's `Frontend_GSAP_Architecture.md` (implementation feasibility) before R2B2 implementation begins.

**Verification evidence:** Every classification and DOM reference in this file was checked directly against the live repository at the stated HEAD: `src/app/page.tsx`, `src/app/globals.css` (lines cited throughout), `src/components/motion-enhancer.tsx`, `src/components/real-product-card.tsx`, `src/components/real-product-rail.tsx`, `src/components/product-detail.tsx`, `src/components/recipe-review.tsx`, `src/components/commerce-provider.tsx`, `src/components/site-header.tsx`, `package.json`/`node_modules/gsap/package.json` (version 3.15.0 confirmed), and the R2A-rework screenshots in `design_review/recovery_r2a_rework/screenshots/`. No implementation code was written; no image was generated; no file outside this task's writable scope (`Motion_3D_Specification.md`, `Motion_Performance_Budget.md`) was modified.
