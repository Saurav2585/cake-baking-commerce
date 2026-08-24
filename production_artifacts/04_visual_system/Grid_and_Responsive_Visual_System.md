# Grid and Responsive Visual System

**Phase:** 4A — Visual System

**Status:** Reconciled Phase 4A recommendation

## Approach

Use a mobile-first fluid grid with bounded containers. Breakpoints respond to content pressure and align with the approved Phase 3 validation widths; they do not identify device models. Page hierarchy and destinations remain constant while layout density changes.

## Breakpoint bands

| Token | Minimum width | Grid | Outer gutter | Intended transformation |
|---|---:|---:|---:|---|
| `base` | 0 | 4 columns | 16 px | stacked content, modal drawers, full-width primary actions |
| `sm` | 430 px | 4 columns | 20 px | wider mobile cards/controls |
| `md` | 768 px | 8 columns | 24 px | two-up cards, tablet navigation decisions, side-by-side content where stable |
| `lg` | 1024 px | 12 columns | 32 px | desktop header, inline PLP facets, two-region PDP/cart |
| `xl` | 1280 px | 12 columns | 48 px | expanded catalog density and editorial composition |
| `2xl` | 1440 px | 12 columns | 60 px | bounded wide composition, not unrestrained line length |

Validation widths are 320, 360, 390, 430, 768, 1024, 1280 and 1440 CSS px. Behaviour between breakpoints must remain fluid.

## Container tokens

| Token | Maximum | Use |
|---|---:|---|
| `container-page` | 1320 px | global shell and commerce pages |
| `container-content` | 1120 px | balanced editorial/commerce content |
| `container-reading` | 68ch | recipes, policies and long help |
| `container-form` | 640 px | checkout and focused forms |

Containers remain `width: 100%` minus current gutters. Never reduce page gutters below 16 px at narrow widths. Full-bleed media may escape the container only when content controls and text remain aligned to it.

## Columns and gaps

- Base/sm: four equal fluid columns, 16 px gap.
- Md: eight columns, 20 px gap.
- Lg: twelve columns, 24 px gap.
- Xl/2xl: twelve columns, 24–32 px gap depending on content density.
- Dense factual grids use nested grids but retain the 4 px spacing system and readable minimum columns.

Do not use a fixed column count for product cards. Use minimum card widths plus available container space, with explicit visual review so cards never become too narrow for titles, variant facts and 44 px controls.

## Page templates

### Global shell

- Base–md: compact header; mobile navigation when primary links/actions no longer fit without truncation.
- Lg+: logo/descriptor, Shop disclosure, Recipes, Search, Wishlist and Cart in one stable header system.
- Header may be sticky, but must not exceed a reasonable viewport fraction at zoom and cannot cover route-focus targets.

### Home

- Base: one-column semantic sequence; departments as a two-column link grid only when labels remain readable, otherwise one column.
- Md: orientation copy and supporting media may split 4/4; department/task cards two or three across.
- Lg+: 5/7 or 6/6 opening composition; department grid may reach four across; required content is never carousel-only.

### PLP/search

- Base–md: controls above results; filters in modal drawer; two product columns only when a card preserves content/actions, otherwise one.
- Lg+: facets span 3 columns and results 9 columns; summary/chips/sort align above results.
- Xl+: facets remain bounded; results may use three or four columns according to minimum card width, not forced density.

### PDP

- Base: identity → media → selection/purchase → critical facts → supporting detail.
- Md: media and purchase may split evenly if all variant controls remain readable.
- Lg+: media 7 columns, purchase 5; long detail below in bounded content grid.
- A sticky mobile purchase action is conditional on valid selection and cannot hide focused content or system UI.

### Recipe detail and review

- Recipe detail: base stack; lg may place ingredients/tools beside method while preserving reading order.
- Recipe review: base converts every row to a labelled vertical card; lg uses aligned rows/columns with tabular numerals.
- Required, selected, purchased and leftover fields never disappear during reflow.

### Cart and simulated checkout

- Cart: base line cards and following summary; lg 8/4 split.
- Checkout: form/review content remains at `container-form` or uses a restrained 7/5 split with summary.
- Sticky summaries/actions must yield to keyboard, zoom, errors and mobile browser chrome.

## Image ratios

| Use | Preferred ratio | Rule |
|---|---|---|
| Product card | 4:5 | consistent product recognition; object visible without decorative crop |
| PDP primary | 1:1 or 4:5 | variant media uses stable reserved space |
| Recipe card | 4:3 | process/outcome context without panoramic loss |
| Editorial/department | 3:2 or controlled full-bleed | nonessential; never the only navigation cue |
| Texture/detail | 1:1 | supporting Ingredient Theatre crop only |

Reserve intrinsic aspect-ratio space to prevent layout shift. Art direction may provide distinct mobile/desktop crops, each requiring manifest provenance and content review.

## Vertical rhythm

- Page start to H1: 24–40 px mobile, 40–64 px desktop depending on breadcrumbs.
- H1 to task controls/content: 24–32 px.
- Section gaps: 40 px mobile, 64 px desktop; compact transactional sections may use 24–32 px.
- Card padding: 16 px compact, 24 px standard.
- Labels to controls: 8 px; control groups: 16–24 px.

Use spacing tokens rather than breakpoint-specific one-offs. Error text enters the flow and may increase height; reserve or tolerate it without overlap.

## Reflow and zoom rules

- At 320 CSS px and 400% zoom, no two-dimensional page scrolling except intrinsically dimensional content; data tables transform into labelled cards rather than relying on horizontal scroll for critical journeys.
- Never hide filters, sort, variant facts, recipe quantities, demo disclosure or recovery actions because of width.
- DOM order follows the narrow layout. Desktop positioning must not create a reading/focus sequence that differs from visual order.
- Long names and translated-length stress strings wrap; fixed heights are prohibited for text-bearing cards and controls.
- Drawers/dialogs use dynamic viewport units, internal scrolling and persistent access to heading/Close; mobile keyboard appearance cannot strand the primary action.

## Density and target rules

Commerce density may increase at lg+ through columns and compact gaps, not smaller body text or targets. Target goal remains 44×44 CSS px across breakpoints. Closely spaced inline links require adequate target spacing. Quantity steppers, icon actions and pagination receive explicit hit areas even when glyphs are smaller.

## Layout stability

- Reserve media space and use predictable placeholders.
- Result count changes and error insertion cannot move focus or place an activated control under a new element.
- Font fallbacks should be metric-compatible and headings/cards must tolerate wrap changes.
- Sticky elements do not animate position under reduced motion and must not create cumulative layout shift.

## Implementation and QA handoff

Map breakpoint, container, grid, gap and spacing values to shared Tailwind theme aliases backed by CSS variables where runtime semantics are needed. Do not embed arbitrary media queries inside components without a documented exception. Verify every template at all approved widths, keyboard-only, 200%/400% zoom, long content, empty/error states and with images/fonts unavailable.
