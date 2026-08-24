# Task Package: UX and Competitor Research

**Package ID:** UX-R1  
**Owner:** UX Research  
**Contributors:** Catalog/Commerce Architecture  
**Approver:** PM; human approval at synthesis gate  
**Phase:** 1 — Discovery  
**Status:** Ready after Phase 0 approvals

## Objective

Produce evidence-backed guidance for an original India-focused baking-supplies ecommerce experience. Study `bakindia.in` and `bakerykart.com` for market, assortment, terminology, and commerce-pattern understanding only.

## Inputs and dependencies

- Approved Charter, Decision Log, Risk Register, and audience/language decisions.
- Reference sites plus authoritative public sources required to validate market or terminology claims.
- Observation date, page URL, and evidence note for every factual website observation.

## Research questions

1. Which customer segments, jobs, confidence levels, and purchase occasions should v1 prioritize?
2. How are baking supplies grouped, named, filtered, sized, priced, and cross-sold in the Indian market?
3. What information reduces uncertainty for ingredients, colours/flavours, chocolate, fondant, tools, bakeware, and packaging?
4. How should variants, units, availability, price display, recipe quantities, and recipe-to-cart behave?
5. Which discovery, cart, and checkout patterns are useful; which create friction or accessibility risk?
6. What gaps offer an original, credible product opportunity without copying either reference?

## Method

- Conduct a structured heuristic walkthrough of both reference sites across mobile and desktop views where available.
- Sample representative category, listing, product, search/filter, cart, recipe/content, and checkout-adjacent pages; do not transact.
- Build an assortment/attribute matrix using representative observations, not scraped or reproduced catalogs.
- Separate direct observation, source-backed fact, researcher inference, and recommendation.
- Capture short paraphrased notes; do not reproduce proprietary copy, photography, page compositions, or distinctive UI.
- Evaluate findability, decision support, variant clarity, cart confidence, responsive behavior, keyboard/accessibility signals, and performance signals observable without invasive testing.
- If primary-user interviews are unavailable, label personas and needs as hypotheses, not findings.

## Deliverables

Create within `production_artifacts/01_research/`:

1. `Research_Plan.md` — method, sampling, ethics, limitations, dates.
2. `Evidence_Log.md` — source, URL, observation date, page type, observation/paraphrase, evidence class, screenshot reference if permitted.
3. `Competitor_Pattern_Matrix.md` — comparable catalog and UX patterns, strengths/frictions, accessibility notes; no copied UI specification.
4. `Audience_and_Jobs_Hypotheses.md` — segments, jobs, contexts, confidence and validation needs.
5. `Catalog_Terminology_and_Attributes.md` — candidate category/attribute vocabulary with source and confidence.
6. `Research_Synthesis.md` — findings, opportunities, constraints, recommendations, open questions, and traceability to evidence.
7. `Research_Readout.md` — concise approval summary and only material decisions.

## Acceptance criteria

- Both reference sites are covered using the same evaluation frame.
- Evidence includes URLs and observation dates; broken/inaccessible areas are noted.
- At least one representative observation covers every v1 product family and every critical journey relevant to the sites.
- Findings distinguish observation, inference, hypothesis, and recommendation.
- No copied brand language, UI, layout, imagery, or unverified market claim appears.
- Recommendations address taxonomy, search/filter/sort, product data, variants, wishlist/cart, recipes/recipe-to-cart, checkout simulation, responsive behavior, and accessibility.
- Audience and terminology conclusions carry confidence levels and validation gaps.
- All material unresolved choices are presented as bounded options with consequences.
- PM confirms traceability, scope compliance, and readiness for Phase 2.

## Exclusions

- Brand naming, identity, voice production, moodboards, UI concepts, wireframes, production copy, full catalog creation, image generation, technical architecture, or application code.
- Automated bulk scraping, purchasing, account creation, or reuse of reference assets/content.
- Claims about sales, popularity, quality, certification, dietary suitability, or customer sentiment without authoritative evidence.

## Human approval gate

Approve the research synthesis, priority audience, and any material taxonomy/terminology direction before Brand Strategy, UX definition, or Catalog Architecture advances. Minor research gaps may be owned and scheduled by the PM; unresolved material audience or product-scope questions block dependent work.

## Handoff

UX Research submits the seven deliverables with a completed self-check. Catalog/Commerce reviews terminology and variant evidence; PM accepts or returns the package. The Decision Log is updated only after human approval.
