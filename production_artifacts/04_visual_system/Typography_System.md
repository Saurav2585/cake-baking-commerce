# Typography System

**Phase:** 4A — Visual System

**Status:** Reconciled Phase 4A recommendation

## Typeface direction

Use a two-family system:

- **Display/editorial:** Fraunces, variable optical serif, for brand moments and selected headings.
- **UI/content:** Inter, variable sans serif, for navigation, controls, product facts, prices, quantities and long-form reading.
- **Fallbacks:** display `Georgia, "Times New Roman", serif`; UI `Arial, "Helvetica Neue", sans-serif`.

This pairing is a design direction, not a final logo. Font files, licence records, subsetting and self-hosting must be verified during implementation. If either family cannot be shipped with documented licence/provenance and acceptable performance, use the stated fallbacks without changing semantic roles.

## Rationale

Fraunces adds tactile editorial warmth without confectionery script clichés. Inter keeps dense commerce information, units and controls plain and resilient. The serif never carries small critical facts, form labels or data-heavy comparison content.

## Type tokens

Use `rem`-based sizes with a 16 px browser default. Line height is unitless.

| Role/token | Family | Mobile size / line | Desktop size / line | Weight | Tracking |
|---|---|---:|---:|---:|---:|
| `type-display-xl` | Display | 2.5rem / 1.08 | 4.5rem / 1.02 | 600 | -0.025em |
| `type-display-lg` | Display | 2rem / 1.12 | 3.5rem / 1.06 | 600 | -0.02em |
| `type-heading-1` | Display | 2rem / 1.15 | 3rem / 1.1 | 600 | -0.018em |
| `type-heading-2` | Display | 1.625rem / 1.2 | 2.25rem / 1.15 | 600 | -0.012em |
| `type-heading-3` | UI | 1.375rem / 1.25 | 1.5rem / 1.25 | 650 | -0.01em |
| `type-heading-4` | UI | 1.125rem / 1.3 | 1.25rem / 1.3 | 650 | 0 |
| `type-body-lg` | UI | 1.125rem / 1.6 | 1.125rem / 1.6 | 400 | 0 |
| `type-body-md` | UI | 1rem / 1.55 | 1rem / 1.55 | 400 | 0 |
| `type-body-sm` | UI | 0.875rem / 1.5 | 0.875rem / 1.5 | 400 | 0.005em |
| `type-label-md` | UI | 1rem / 1.25 | 1rem / 1.25 | 600 | 0 |
| `type-label-sm` | UI | 0.875rem / 1.25 | 0.875rem / 1.25 | 600 | 0.005em |
| `type-caption` | UI | 0.8125rem / 1.4 | 0.8125rem / 1.4 | 500 | 0.01em |
| `type-data-lg` | UI | 1.25rem / 1.25 | 1.375rem / 1.25 | 650 | -0.01em |
| `type-data-md` | UI | 1rem / 1.35 | 1rem / 1.35 | 550 | 0 |

Desktop values begin at the layout’s `lg` band (1024 px); headings may use a bounded fluid interpolation between mobile and desktop values, clamped to the table endpoints. Body, labels and controls do not scale below their declared values.

## Role assignment

- Display roles: Home opening, department editorial introductions and recipe storytelling only.
- H1/H2 may use Display; dense modal/drawer headings, card headings and H3/H4 use UI.
- Product names on PLP cards use `heading-4`; brand metadata uses `caption`; selected pack, price and quantities use data roles.
- Form labels and buttons use label roles; never uppercase whole phrases.
- Error, unknown and demo disclosures use body/label roles, not tiny captions.
- Recipe methods and policy/help content use body-md with maximum 68ch line length.

## Numeric and unit behaviour

- Enable tabular numerals for aligned prices, quantities, recipe mapping columns and cart totals.
- Use Indian English/INR formatting from the data contract; typography must not manually insert separators.
- Keep the numeric value and its unit together using non-breaking spacing where appropriate.
- Use the multiplication sign `×` for dimensions/count expressions; do not use a decorative letter x.
- Never reduce essential qualifiers such as “Demo price,” required/purchased/leftover or “Information not provided” below body-sm.

## Hierarchy rules

- One descriptive H1 per page. Semantic heading order is independent of visual role.
- Do not use font size or serif alone to communicate heading level; spacing and structure reinforce it.
- Limit most surfaces to three visible type sizes at once to maintain calm hierarchy.
- Product-brand metadata stays subordinate to factual product title and selected variant.
- Avoid centred long-form copy; centre alignment is reserved for very short orientation/empty-state messages.

## Readability and accessibility

- Users may zoom or override fonts without clipped controls, overlapping labels or lost content.
- Do not set body text below 16 px equivalent or supporting text below 13 px equivalent.
- Avoid justified text, long all-caps strings and letter spacing that breaks word recognition.
- Links remain identifiable without colour alone through underline or another persistent non-colour cue in body copy.
- Underlines use sufficient offset/thickness and are not removed on hover/focus.
- Font loading uses a metric-compatible fallback strategy; content remains visible immediately and layout shift must be measured.
- Text over imagery requires an opaque tested surface; no essential copy sits on variable pixels.

## Responsive behaviour

At 320–430 px, headings wrap naturally and cannot force horizontal scroll; manual line breaks are content exceptions, not layout controls. At 200% and 400% zoom, navigation and controls may stack while maintaining labels. Truncation is prohibited for page headings, product titles, selected variants, errors and critical facts. Secondary metadata may use two-line clamping only when the full value is available programmatically and on the destination page.

## Language readiness

V1 is `en-IN`. Token roles—not hard-coded pixel boxes—must tolerate later localisation. Avoid tight fixed widths, typographic puns and letterform-dependent instructions. A future Indian-language expansion requires script coverage and typographic review; these fonts are not approved for that future scope by this document.

## QA specimen

Test every role with: long product/variant names; ₹ values with Indian grouping; `Information not provided`; mixed dimensions such as `203 × 76 mm`; search/filter labels; recipe required/purchased/leftover values; all-caps SKU strings; and fallback fonts before webfonts load. Verify at 320, 390, 768, 1024 and 1440 CSS px plus 200%/400% zoom.
