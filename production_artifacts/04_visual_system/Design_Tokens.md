# Design Tokens

**Phase:** 4A — Visual System

**Status:** Reconciled Phase 4A recommendation

## Token architecture

Use three layers so the system can evolve without component-specific colour drift:

1. **Primitive:** raw colour, spacing, size, radius and elevation values.
2. **Semantic:** purpose such as `text-primary`, `surface-canvas`, `action-primary` or `status-error`.
3. **Component:** aliases only where a component has a durable need, for example `button-primary-bg`; component values must reference semantic tokens.

Components must not consume raw colour primitives. Token names express purpose, not appearance or department.

## Colour primitives

| Token | Value | Character |
|---|---:|---|
| `color-canvas-100` | `#FFF8ED` | page canvas |
| `color-canvas-0` | `#FFFFFF` | working surface |
| `color-canvas-200` | `#F2ECE4` | quiet grouped surface |
| `color-line-300` | `#D8D0C8` | decorative divider only |
| `color-ink-900` | `#2B1B2B` | primary ink/dark surface |
| `color-ink-700` | `#5B5860` | secondary ink |
| `color-ink-600` | `#767076` | muted text or necessary control boundary |
| `color-coral-700` | `#C54731` | primary action/link on light |
| `color-coral-800` | `#9B3027` | hover/pressed and error ink |
| `color-coral-600` | `#C84832` | decorative accent only; fails normal-text AA on canvas |
| `color-coral-100` | `#F7DFD8` | warm emphasis surface |
| `color-leaf-700` | `#376348` | success/available text |
| `color-leaf-100` | `#E1EEE5` | success surface |
| `color-turmeric-500` | `#E5A72E` | editorial highlight |
| `color-turmeric-200` | `#F6DCA5` | warning surface |
| `color-focus-700` | `#175CD3` | focus ring |
| `color-warning-800` | `#815100` | warning ink |

`color-line-300` and `color-coral-600` are not approved for necessary boundaries or normal text. `Colour_System.md` is authoritative for pairing evidence.

## Semantic colour roles

| Semantic token | Primitive/default | Usage |
|---|---|---|
| `surface-canvas` | canvas-100 | page background |
| `surface-primary` | canvas-0 | cards, forms, overlays |
| `surface-subtle` | canvas-200 | facts, recipe calculations, quiet groups |
| `surface-brand` | coral-100 | restrained brand/editorial emphasis |
| `surface-inverse` | ink-900 | rare high-contrast footer/editorial panel |
| `text-primary` | ink-900 | headings, body, prices, quantities |
| `text-secondary` | ink-700 | supporting copy and metadata |
| `text-inverse` | canvas-0 | content on inverse/action surfaces |
| `text-link` | coral-700 | underlined links on light surfaces |
| `border-default` | line-300 | decorative separation only |
| `border-strong` | ink-600 | necessary control/active structure |
| `action-primary-bg` | coral-700 | primary filled control |
| `action-primary-text` | canvas-0 | primary control label |
| `action-secondary-bg` | canvas-0 | secondary control surface |
| `action-secondary-text` | ink-900 | secondary control label |
| `focus-core` | focus-700 | 2–3 px focus core |
| `focus-gap` | canvas-0 | 2 px separation from component |
| `status-success-text` | leaf-700 | confirmed operation text |
| `status-success-bg` | leaf-100 | confirmed operation surface |
| `status-error-text` | coral-800 | error text/icon |
| `status-error-bg` | coral-100 | error surface |
| `status-warning-text` | warning-800 | warning text |
| `status-warning-bg` | turmeric-200 | warning surface |
| `state-disabled-bg` | canvas-200 | disabled fill |
| `state-disabled-text` | ink-600 | disabled label; still readable |

## Verified contrast pairs

Ratios below use WCAG relative-luminance calculation and must be rechecked after any value change.

| Foreground / background | Ratio | Approved role |
|---|---:|---|
| ink-900 / canvas-100 | 15.38:1 | all text |
| ink-700 / canvas-100 | 6.61:1 | normal supporting text |
| canvas-0 / coral-700 | 4.86:1 | primary button |
| ink-900 / turmeric-500 | 7.65:1 | warm accent content |
| ink-900 / turmeric-200 | 12.13:1 | warning content |
| leaf-700 / canvas-100 | 6.55:1 | success/availability text |
| focus-700 / canvas-100 | 5.67:1 | focus indicator against page |
| focus-700 / canvas-0 | 5.99:1 | focus indicator against raised surface |
| coral-700 / canvas-100 | 4.61:1 | links on canvas |
| line-300 / canvas-100 | 1.44:1 | decorative only; not a necessary boundary |

Contrast compliance is pairing-specific. Passing values do not license opacity changes, gradients, image overlays or different neighbouring colours without testing.

## Spacing

Base unit: 4 CSS px. Use semantic spacing rather than arbitrary values.

| Token | px | Typical use |
|---|---:|---|
| `space-0` | 0 | reset |
| `space-1` | 4 | icon/label micro-gap |
| `space-2` | 8 | inline gap |
| `space-3` | 12 | compact control/card gap |
| `space-4` | 16 | default mobile rhythm |
| `space-5` | 20 | control grouping |
| `space-6` | 24 | card padding / small section gap |
| `space-8` | 32 | section internal spacing |
| `space-10` | 40 | medium section gap |
| `space-12` | 48 | desktop section rhythm |
| `space-16` | 64 | large section rhythm |
| `space-20` | 80 | editorial maximum |

Semantic aliases: `content-gap-inline = space-2`, `control-gap = space-3`, `card-padding-compact = space-4`, `card-padding = space-6`, `section-gap-mobile = space-10`, `section-gap-desktop = space-16`. Dense commerce rows may use compact values but cannot reduce control targets.

## Sizing and touch targets

| Token | Value | Rule |
|---|---:|---|
| `control-height-sm` | 40 px | compact desktop only with adequate spacing |
| `control-height-md` | 44 px | default minimum target goal |
| `control-height-lg` | 52 px | primary/mobile and form controls |
| `icon-sm` | 16 px | inline/support |
| `icon-md` | 20 px | control icon |
| `icon-lg` | 24 px | standalone control/status |
| `content-readable` | 68ch | long-form maximum |
| `content-form` | 640 px | comfortable form maximum |

If a visible target is smaller than 44×44 CSS px, its interactive hit area and spacing must still satisfy WCAG 2.2 target-size intent and be documented for QA.

## Radius

| Token | Value | Usage |
|---|---:|---|
| `radius-xs` | 4 px | data cells, compact inner elements |
| `radius-sm` | 8 px | inputs, chips, small controls |
| `radius-md` | 12 px | cards and panels |
| `radius-lg` | 20 px | editorial cards/drawers |
| `radius-pill` | 999 px | filter chips/status tokens only |

Do not use pill geometry for every button; it weakens hierarchy and encourages confectionery-cute styling.

## Border and elevation

- `border-thin = 1px`; `border-strong = 2px`; both use semantic colours.
- `shadow-1 = 0 1px 2px rgb(35 31 26 / 0.08), 0 4px 12px rgb(35 31 26 / 0.06)` for raised cards only when border is insufficient.
- `shadow-2 = 0 12px 32px rgb(35 31 26 / 0.16)` for modal overlays/menus.
- Focus ring: `0 0 0 2px focus-gap, 0 0 0 4px focus-core`; never substitute box shadow elevation for focus.
- Forced-colours mode must use system outlines/borders and must not depend on shadows.

## Layering

| Token | Value | Role |
|---|---:|---|
| `layer-base` | 0 | page content |
| `layer-sticky` | 20 | sticky header/action |
| `layer-dropdown` | 40 | disclosure/suggestions |
| `layer-backdrop` | 60 | modal backdrop |
| `layer-modal` | 70 | drawer/dialog/mini cart |
| `layer-toast` | 80 | transient status, never sole feedback |

Components must not invent larger values. Native top-layer dialogs may supersede this scale.

## State rules

- Hover modifies tone/border but is never the only affordance.
- Active state gives immediate non-motion feedback.
- Selected combines text, icon/check and border/surface change.
- Disabled controls remain readable and expose semantic disabled state; use only when an action truly cannot run.
- Loading preserves geometry, uses static placeholders under reduced motion and exposes busy state.
- Demo, unavailable, unknown, warning and error states have distinct explicit labels; they cannot share an unexplained badge.

## Implementation mapping

Expose semantic tokens as CSS custom properties and map Tailwind theme aliases to them. Keep light mode as the approved v1 theme; dark mode is deferred because it needs a complete contrast and asset review. Any token modification requires automated contrast checks for registered pairs plus manual forced-colours, zoom and real-component inspection.
