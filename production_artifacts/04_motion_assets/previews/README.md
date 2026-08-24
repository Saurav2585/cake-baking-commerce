# Phase 4B Motion Review Evidence

Deterministic viewport captures from `design_review/phase_4b/` on 2026-08-24. PNGs are lightweight state evidence, not production assets. Screen recordings were intentionally omitted because deterministic states fully demonstrate this specification without unnecessary media weight.

| File | Route / moment | Viewport | State | Capture method |
|---|---|---:|---|---|
| `homepage-opening-before-desktop-1440x1000.png` | `?view=home&motionState=before` | 1440×1000 | declared initial | browser viewport screenshot |
| `homepage-opening-mid-desktop-1440x1000.png` | `?view=home&motionState=mid` | 1440×1000 | deterministic midpoint | browser viewport screenshot |
| `homepage-opening-final-desktop-1440x1000.png` | `?view=home&motionState=final` | 1440×1000 | final | browser viewport screenshot |
| `homepage-opening-final-mobile-390x844.png` | home | 390×844 | final/mobile | browser viewport screenshot |
| `homepage-opening-reduced-desktop-1440x1000.png` | `?view=home&motion=reduce` | 1440×1000 | reduced/final | browser viewport screenshot |
| `department-atlas-final-desktop-1440x1000.png` | home atlas | 1440×1000 | final/scrolled | browser scroll + viewport screenshot |
| `ingredient-theatre-final-desktop-1440x1000.png` | home Ingredient Theatre | 1440×1000 | final/scrolled | browser scroll + viewport screenshot |
| `recipe-transform-before-desktop-1440x1000.png` | recipe-to-cart | 1440×1000 | initial connectors | browser viewport screenshot |
| `recipe-transform-mid-desktop-1440x1000.png` | recipe-to-cart | 1440×1000 | half connectors | browser viewport screenshot |
| `recipe-transform-final-desktop-1440x1000.png` | recipe-to-cart | 1440×1000 | final | browser viewport screenshot |
| `recipe-transform-reduced-mobile-390x844.png` | recipe-to-cart | 390×844 | reduced/mobile | browser viewport screenshot |
| `pdp-pack-before-desktop-1440x1000.png` | PDP | 1440×1000 | selected 500g baseline | browser viewport screenshot |
| `pdp-pack-final-desktop-1440x1000.png` | PDP | 1440×1000 | selected 1kg/latest state | semantic click + screenshot |
| `navigation-drawer-mobile-390x844.png` | mobile navigation | 390×844 | open/final | browser viewport screenshot |
| `filter-drawer-mobile-390x844.png` | mobile filters | 390×844 | open/final | browser viewport screenshot |
| `add-feedback-desktop-1440x1000.png` | PDP Add | 1440×1000 | pre-action | browser viewport screenshot |
| `add-feedback-mid-desktop-1440x1000.png` | PDP Add | 1440×1000 | active feedback | semantic click + screenshot |
| `error-feedback-desktop-1280x900.png` | important states | 1280×900 | error/static equivalent | browser viewport screenshot |
| `confirmation-final-desktop-1280x900.png` | simulated confirmation | 1280×900 | final | browser viewport screenshot |

Validation evidence summarized in `Phase_4B_Readout.md`: 112 route/viewport checks, 56 narrow regression checks, 14 high-zoom reduced checks, rapid input/cancellation, focus interruption, orientation/resize and console review.
