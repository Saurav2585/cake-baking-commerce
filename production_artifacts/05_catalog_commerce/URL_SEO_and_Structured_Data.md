# URL, SEO and Structured Data Architecture

## Scope and integrity boundary

This is an architecture contract for a portfolio/demo store. SEO must help machines understand pages without representing demo prices, availability, checkout, fulfilment, reviews, certifications or product claims as real-world commercial facts. The working retailer name Pantryform is prototype-only and must not be described as legally cleared.

## Route model

| Resource | Canonical pattern | Notes |
|---|---|---|
| Home | `/` | Retailer overview |
| Shop all | `/shop` | All published products |
| Department | `/shop/{department-slug}` | Seven commerce departments; Recipes has its own root |
| Category | `/shop/{department-slug}/{category-slug}` | Add subcategory segment only when approved IA needs it; avoid deeper catalog paths |
| Product | `/products/{product-slug}` | Parent product canonical; variant is selected via query/fragment, not a duplicate indexable page |
| Brands | `/brands`, `/brands/{brand-slug}` | Secondary discovery path only |
| Search | `/search?q=…` | Utility results, not a canonical acquisition page |
| Recipes | `/recipes`, `/recipes/{recipe-slug}` | Editorial and recipe-to-cart entry |
| Wishlist/cart | `/wishlist`, `/cart` | Utility state |
| Checkout/confirmation | `/checkout`, `/order-confirmation/{demo-reference}` | Simulated and non-indexable |
| Information | `/about`, `/contact`, `/faq`, `/shipping-returns`, `/privacy`, `/terms` | Shipping/returns must state demo boundary |

Use lowercase ASCII slugs, hyphens between words, no dates, prices, stock, pack size or mutable category labels in product/recipe slugs. Stable IDs remain internal. Redirect an old slug to the current canonical when a slug changes; never reuse an old slug for another record. Unknown routes return a real 404 status.

## Parameter and canonical policy

- Product variant parameters (`variant=<stable-variant-id>`) canonicalize to the parent product URL unless a later business case creates materially distinct, indexable variant content.
- Filter, sort, pagination and search parameters are user-state URLs. Their canonical is the clean base category/department URL; search pages canonicalize to `/search` and are `noindex,follow`.
- Remove tracking parameters from canonical URLs. Normalize trailing slashes consistently according to framework configuration.
- Brand and recipe pages self-canonicalize when published and substantive.
- Invalid or unavailable product slugs return 404/410 as appropriate; temporarily unavailable but valid products remain 200 with honest on-page state and no false Offer availability.
- Canonical links must be absolute and environment-aware. Preview/staging origins must never leak production canonicals accidentally.

## Environment indexing policy

All local, preview, portfolio-review and staging deployments emit `noindex,nofollow` through both robots meta and an `X-Robots-Tag` response header where available. Their `robots.txt` disallows crawling and they publish no discoverable production sitemap. This is the v1 default because catalog, prices and commerce are simulated.

Changing an environment to indexable production requires a separate release decision confirming legal name clearance, factual catalog/price/availability provenance, real commerce boundaries, privacy/terms, host/canonical configuration and structured-data eligibility. Until then, no page claims that products can be purchased or fulfilled.

## Metadata contract

Every index-eligible content type has a unique, factual title and description:

- Product: `{factual product title} | Pantryform` and a short description limited to known attributes; variant pack may appear only when the page is variant-canonical later.
- Department/category: plain assortment label plus “Baking Ingredients & Supplies”; avoid “best”, “top”, “trusted”, “premium” and unsupported breadth claims.
- Recipe: `{recipe title} | Pantryform Recipes`; description summarizes the method/use without dietary, result or expertise claims.
- Utility pages: clear functional titles; cart/checkout/confirmation use `noindex`.

Open Graph/Twitter metadata follows the same factual boundary. Images need stable URLs, declared dimensions and text alternatives in HTML. Alt text describes relevant visible content and does not repeat SEO keywords, inferred flavour/quality or decorative detail. Decorative images use empty alt text.

## Breadcrumbs

Visible semantic breadcrumbs and `BreadcrumbList` JSON-LD must agree. Product path: Home → Department → Category → Product. Recipe path: Home → Recipes → Recipe. Brand may appear as metadata or a secondary brand path, not as a marketplace seller. Current page is text with `aria-current="page"`; breadcrumb collapse must remain keyboard/screen-reader comprehensible.

## Sitemaps and robots

An indexable production deployment may generate a sitemap index for static, product, category/department, brand and recipe URLs. Include only canonical, published, 200-status pages; `lastmod` must reflect a real content change timestamp. Exclude search, filters, sort, cart, wishlist, checkout, confirmation, API routes, drafts and error pages. Robots rules are not a security mechanism; sensitive or private data must not exist in the static demo.

## Structured-data boundaries

JSON-LD is server-rendered from the same validated source as visible content. It must not add facts absent on the page. Each entity has one stable `@id` rooted at its canonical URL.

### Product

Use `Product` only after the release gate determines that the page represents an eligible offering. Permitted properties: `name`, factual `description`, canonical `url`, representative `image`, fictional `brand` labelled as a brand entity, `sku` for a selected variant, and factual typed variant attributes. Do not emit `aggregateRating`, `review`, awards, certification, dietary/safety claims, popularity, shipping details, return policy or merchant guarantees.

For the portfolio/demo environment, omit `Offer` entirely. Demo INR prices and availability are not real offers and must not be exposed to crawlers as purchasable inventory. If future real commerce is approved, `Offer` is adapter-owned and requires verified currency, price, availability, URL, seller identity and update timing that match visible content. Variant offers must use variant SKU/price/availability, never parent-level guesses.

### Recipe

Use `Recipe` only when the page contains a complete, independently authored recipe with visible ingredient quantities and instructions. Allowed: `name`, factual description, images, `recipeIngredient`, `recipeInstructions`, yield/servings, and times only when recorded in the recipe source model. Do not infer nutrition, dietary suitability, cuisine, ratings, reviews, author credentials or results. Product mappings and recipe-to-cart selections are commerce UI and are not recipe ingredients unless the recipe visibly states them.

### Other types

Use `BreadcrumbList` where visible breadcrumbs exist and `Organization`/`WebSite` only with prototype-safe factual identity fields. Do not emit `SearchAction` unless the production search target and query behaviour are index-safe. FAQ structured data is omitted in v1; visible FAQs remain ordinary content.

## Localization readiness

V1 is English-only (D-011). Do not emit alternate-language `hreflang`. Set document language to `en-IN`; use INR formatting in visible demo commerce. Future locales require distinct localized URLs, translated canonical metadata and reciprocal hreflang, not automated query parameters.

## Failure and migration behaviour

- Deleted without replacement: 410 when intentionally removed; otherwise 404. Replacement: one-hop 301 to the closest true successor, never to Home.
- Unavailable product: retain 200 only if useful factual content remains; clearly mark demo unavailability and remove any future Offer.
- Missing image: use a neutral accessible placeholder and omit invalid image schema rather than broken URLs.
- Invalid structured-data field: omit that field/entity and report validation; never fabricate a fallback.

## Validation

1. Crawl verifies one self-consistent canonical per eligible page and no indexable parameter duplication.
2. Preview/staging/local responses are `noindex,nofollow`; no public sitemap exposes them.
3. Sitemap includes only canonical published 200 URLs.
4. Metadata is unique, factual and free of unsupported claims.
5. Visible breadcrumbs and JSON-LD paths agree.
6. Portfolio/demo Product JSON-LD contains no Offer, rating, review, certification or inferred fact.
7. Recipe JSON-LD matches visible, complete recipe data and omits unverified nutrition/dietary data.
8. URL changes produce one-hop redirects; bad routes return correct status.
9. Automated schema validation and manual rendered-page checks run before release.

## Dependencies and risks

- Final slug registry depends on approved taxonomy and catalog records.
- Search/filter URL query keys must match `Search_Filter_Sort_Spec.md`.
- Product structured data in a simulated catalog has high misrepresentation risk; omission of Offer is mandatory until a real-commerce gate.
- Prototype indexing can expose fictional data as fact. The default noindex posture remains until explicit release approval.
