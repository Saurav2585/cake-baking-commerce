# Colour System

**Phase:** 4A — Visual direction and design system
**Status:** Reconciled Phase 4A recommendation
**Target:** WCAG 2.2 AA-oriented light interface

## Intent

The palette translates Measured Joy into warm, ingredient-led colour held together by strong aubergine structure. Colour supports hierarchy; it never establishes department, availability, selection, error, or success by itself. Every state also needs text, iconography, shape, border, or control state.

## Source anchors and correction

The candidate anchors were tested with WCAG relative-luminance contrast calculations. Ink aubergine, warm canvas, turmeric, leaf, and focus blue can retain their proposed values in the roles below. Candidate coral `#C84832` measures **4.49:1 on warm canvas `#FFF8ED`**, narrowly below the 4.5:1 AA threshold for normal text. It is therefore not permitted for normal text on canvas. The corrected semantic action colour is **coral 700 `#C54731`** (4.61:1 on canvas; 4.86:1 on white). The original coral may remain a large decorative fill only when it carries no information and no text depends on it.

Contrast results are calculated from sRGB linearized relative luminance using `(Llighter + 0.05) / (Ldarker + 0.05)`, rounded to two decimals. Implementations must re-test rendered token pairs, including hover/disabled states.

## Palette

| Family/token | Value | Intended role |
|---|---|---|
| `ink.900` | `#2B1B2B` | Primary text, dark surfaces |
| `ink.700` | `#5B5860` | Secondary text on light surfaces |
| `ink.600` | `#767076` | Lowest permitted normal text on canvas/white |
| `canvas.0` | `#FFFFFF` | Raised surface and inputs |
| `canvas.50` | `#FFFDFC` | Quiet surface |
| `canvas.100` | `#FFF8ED` | Primary warm canvas |
| `canvas.200` | `#F2ECE4` | Subtle section surface |
| `line.300` | `#D8D0C8` | Decorative/divider border only |
| `coral.600` | `#C84832` | Non-text decorative accent; restricted |
| `coral.700` | `#C54731` | Corrected action/link text on light surfaces |
| `coral.800` | `#9B3027` | Hover/pressed action; error text where required |
| `turmeric.500` | `#E5A72E` | Warm accent fill with dark ink |
| `turmeric.200` | `#F6DCA5` | Informational/warning surface with dark ink |
| `leaf.700` | `#376348` | Success/available text and strong status icon |
| `focus.700` | `#175CD3` | Focus ring and interactive emphasis |
| `warning.800` | `#815100` | Warning text on light surfaces |
| `error.800` | `#9B3027` | Error text/icon on light surfaces |

`line.300` is not an interactive-boundary colour on canvas because its contrast is only 1.44:1. Use `ink.600` (4.58:1) for control boundaries when the boundary is necessary to identify the component; a subtle decorative border may use `line.300` only when shape/background already identifies the element.

## Semantic roles

| Semantic token | Value | Required pairing/behavior |
|---|---|---|
| `surface.page` | `canvas.100` | Default page background |
| `surface.raised` | `canvas.0` | Cards, inputs, summaries |
| `surface.subtle` | `canvas.200` | Grouping without status meaning |
| `text.primary` | `ink.900` | Default copy |
| `text.secondary` | `ink.700` | Supporting copy |
| `text.muted` | `ink.600` | Captions; do not lighten further for readable content |
| `action.primary.bg` | `coral.700` | White label; ink focus outline separated by canvas gap |
| `action.primary.hover` | `coral.800` | White label |
| `action.link` | `coral.700` | Underline or another non-colour affordance |
| `accent.warm.bg` | `turmeric.500` | Ink text/icon only; never white text |
| `status.success` | `leaf.700` | Text/icon plus explicit status word |
| `status.warning` | `warning.800` | Text/icon on turmeric 200 or canvas |
| `status.error` | `error.800` | Text/icon and error summary/association |
| `focus.ring` | `focus.700` | 2–3px visible outline with separation from component fill |
| `control.border` | `ink.600` | Necessary component boundary |
| `disabled.surface` | `canvas.200` | Disabled state only |
| `disabled.content` | `ink.600` | Preserve readability; disabled state also programmatic |

## Verifiable contrast evidence

| Foreground | Background | Ratio | Use/result |
|---|---|---:|---|
| `#2B1B2B` | `#FFF8ED` | 15.38:1 | Primary text — AAA |
| `#5B5860` | `#FFF8ED` | 6.61:1 | Secondary text — AA/AAA normal text |
| `#767076` | `#FFF8ED` | 4.58:1 | Muted normal text — AA, limited margin |
| `#C84832` | `#FFF8ED` | 4.49:1 | **Fail** for normal text; restricted |
| `#C54731` | `#FFF8ED` | 4.61:1 | Corrected coral text/link — AA |
| `#FFFFFF` | `#C54731` | 4.86:1 | Primary-button label — AA |
| `#FFFFFF` | `#9B3027` | 7.38:1 | Hover/pressed label — AAA |
| `#2B1B2B` | `#E5A72E` | 7.65:1 | Text on turmeric — AAA |
| `#2B1B2B` | `#F6DCA5` | 12.13:1 | Warning-surface text — AAA |
| `#376348` | `#FFF8ED` | 6.55:1 | Success/availability text — AA/AAA |
| `#175CD3` | `#FFF8ED` | 5.67:1 | Focus indicator against page — exceeds 3:1 |
| `#175CD3` | `#FFFFFF` | 5.99:1 | Focus indicator against raised surface — exceeds 3:1 |
| `#D8D0C8` | `#FFF8ED` | 1.44:1 | Decorative divider only; fails necessary boundary role |

## Commerce and status rules

- Demo price uses primary ink. Coral may emphasize the action, not imply discount.
- Demo availability combines a status word and icon; leaf is not a certification or live-stock promise.
- Unavailable uses text and icon/pattern, not reduced opacity alone. Stale/changed states use a labelled warning surface.
- “Information not provided” is normal readable content, not low-contrast placeholder text.
- No sale, dietary, certification, rating, popularity, or urgency badge colour is defined without approved factual data.
- Department colour accents may orient but cannot be the only department label.

## Disabled, selected, focus, and forced-colour behavior

Disabled controls retain readable labels, programmatic disabled state, and a nearby reason where needed. Do not apply blanket opacity to a container containing explanatory content. Selected state combines border weight/check/icon and accessible state with colour. Hover is never the only interactive cue. Focus rings must remain visible on every allowed surface and must not be clipped. In forced-colours mode, preserve native controls/outlines and use system colours rather than forcing this palette.

## Verification gate

Before release, automated token-pair tests and manual browser checks must cover normal/large text, icons and control boundaries, focus against every adjacent colour, hover/active/disabled states, forced colours, high contrast preferences where supported, and screenshot sampling. AA exceptions are release-blocking unless explicitly accepted and documented.
