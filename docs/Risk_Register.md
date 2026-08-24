# Risk Register

Scale: likelihood and impact are Low / Medium / High. Owners review risks at every phase exit.

| ID | Risk | L | I | Mitigation / trigger | Owner | Status |
|---|---|---:|---:|---|---|---|
| R-001 | Reference research drifts into copied branding, content, imagery, or UI. | M | H | Capture abstract patterns and citations; originality review before design approval. | PM + Design | Open |
| R-002 | Demo prices, availability, claims, or pack sizes are presented as current facts without evidence. | H | H | Record source/observation date and label demo/simulated data; content audit. | Catalog | Open |
| R-003 | Broad assortment produces shallow taxonomy or inconsistent variants. | M | H | Approve schema and coverage matrix before catalog production; validate all records. | Catalog | Open |
| R-004 | Recipe-to-cart quantities mismatch sellable pack variants. | M | H | Define conversion, rounding, default-variant, substitution, and adjustment rules before implementation. | Catalog + UX | Open |
| R-005 | Motion harms accessibility or performance. | M | H | Define budgets and reduced-motion behavior; test keyboard, motion preference, and mobile performance. | Motion + QA | Open |
| R-006 | Simulated checkout looks like a real transaction or captures sensitive data. | M | H | Prominent demo disclosure; no live charge; minimize/fake personal data; security review. | Engineering + QA | Open |
| R-007 | Accessibility is deferred until QA. | M | H | Annotate requirements in UX/design and add automated/manual checks throughout engineering. | Design + Engineering | Open |
| R-008 | Generated imagery has unclear provenance or inconsistent product depiction. | M | H | Asset brief, manifest, generation metadata, rights review, and visual QA. | Visual Assets | Open |
| R-009 | Future commerce concerns leak into UI and create premature complexity. | M | M | Define typed adapters/interfaces and defer provider-specific behavior. | Commerce + Engineering | Open |
| R-010 | Missing playbook attachment causes divergence from the requested operating method. | M | M | External reviewer reconciled the full playbook and found material conformance; D-014 records closure. | PM | Closed 2026-08-24 |
| R-011 | Audience or language assumptions misdirect research and content. | M | H | Audience/language framing approved in D-010/D-011; behavior and preferences remain explicitly hypothetical pending primary research. | PM + UX Research | Mitigated; monitor |
| R-012 | Generic size/colour fields create contradictory or irrelevant variants across food, tools and packaging. | H | H | Use family-specific attributes and block title/variant/net-quantity mismatches; see Phase 1 E-021/E-026. | Catalog + Engineering | Open |
| R-013 | Mobile reflow passes while unnamed or undersized controls still block accessible use. | M | H | Bind semantic-name, focus, status, reflow and target-size requirements into UX/design/engineering acceptance. | UX + QA | Open |
| R-014 | Competitor operations or assurance language is mistaken for reusable truth. | M | H | Preserve evidence classes; prohibit transfer of promises, reviews, ratings, certifications and promotional claims. | PM + Content | Open |
