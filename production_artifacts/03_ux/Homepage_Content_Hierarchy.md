# Homepage Content Hierarchy

**Phase:** 3 — UX Definition
**Status:** Approved and binding at Phase 3 commit `1b0c5fa60a0b50290cad6bf5bb3ec5de3ee55d01`

## Homepage job

Help a home baker understand the specialist retail offer, enter the correct department or recipe path quickly, and see that inspiration is connected to exact shopping choices. Secondary micro-bakery needs are supported through assortment breadth and practical decision fields, not a separate trade storefront.

## Required content sequence

### 1. Orientation and primary entry

The opening region contains one H1, a concise expression of the approved value proposition, and direct paths to **Shop supplies** and **Explore recipes**. It may embody Measured Joy—the movement from idea to measured preparation—but final copy and imagery are deferred.

Requirements:

- Establish Pantryform as a curated baking ingredients and supplies retailer, using the prototype identity boundary.
- Do not imply marketplace sellers, manufacturer ownership, expert endorsement, product superiority or legal name clearance.
- Keep both actions available without motion or media.
- Any demo disclosure needed to prevent a purchasing misconception is visible before a user reaches transactional actions.

### 2. Shop by department

Show all seven merchandise departments with concise factual labels and distinct links:

1. Ingredients
2. Chocolate
3. Colours & Flavours
4. Fillings & Fondant
5. Decorating
6. Bakeware & Tools
7. Packaging

Recipes follows as a clearly editorial peer entry, preserving its status as the eighth approved department without presenting recipes as merchandise. Cards/links may include a short scope cue drawn only from approved taxonomy. No department is hidden behind a carousel-only interaction.

### 3. Find by making task

A compact task-led discovery region may connect controlled applications to canonical products or collections, for example decorating, chocolate work, piping, gifting or micro-bakery batching. It supplements departments rather than creating new taxonomy.

Requirements:

- Use only approved controlled application values represented in the catalog.
- Do not label collections “popular”, “trending”, “best” or performance-led.
- Empty or unsupported tasks are omitted rather than filled with invented content.

### 4. Curated product set

Show a small, explicitly curated selection whose rule is documented in catalog data (for example, an editorial starter set), followed by Shop All. Product cards follow the PLP contract: fictional brand, factual title, relevant pack/dimension, demo INR price, unit price when comparable, demo availability, wishlist, and Add only for one unambiguous available SKU; otherwise Select options.

This module is optional at runtime when no valid curated set exists. It must never use ratings, review counts, bestseller language, discount theatre or inferred suitability as filler.

### 5. Recipe-to-supplies bridge

Feature available editorial recipes with factual title/category and a route to recipe detail. Explain the workflow conceptually: choose a recipe, adjust servings, review mapped packs, then add selected supplies. Do not claim that a recipe card adds a complete basket directly.

Requirements:

- At least one valid recipe is required to render this module.
- Recipe imagery or sensory framing cannot imply guaranteed results.
- Recipe-to-cart language preserves user review and smallest-sufficient-pack behaviour under D-016.
- Unmapped or unavailable ingredients are handled later in review, never hidden here.

### 6. Practical confidence cues

A brief informational region may explain only implemented experience commitments: family-relevant product details, explicit unknown critical information, and transparent recipe pack selection. These are service explanations, not badges or superiority claims.

Do not show fabricated certifications, testimonials, review aggregates, customer counts, delivery promises, years of expertise or “trusted by” modules.

### 7. Secondary utility and footer

Close with paths to FAQ, About, demo Shipping & Returns, Contact, Privacy and Terms, plus repeated Shop and Recipes navigation. Newsletter capture, live-chat claims, account prompts, social proof and real fulfilment promises are outside v1 unless separately approved.

## Desktop and mobile behaviour

Desktop may place related entry points side by side while retaining the semantic order above. Mobile presents a single readable sequence; department access cannot require horizontal swiping. Tablet adapts by available width. The H1, primary paths, all departments, Recipes and core utility links remain present at every viewport.

Visual prominence may vary, but DOM/reading order must make sense without CSS. Media loads cannot move primary controls unexpectedly. Any carousel introduced later must be optional enhancement with visible controls, pause support where applicable and non-carousel access to essential links; a static group is preferred for required content.

## State matrix

| Region/state | Required response |
|---|---|
| Whole-page loading | Render structural heading/landmarks and stable placeholders; do not announce every placeholder |
| Department data failure | Retain global navigation and valid department links from controlled configuration; identify failed dynamic content |
| No curated products | Omit product module and keep Shop All/department access; never fabricate products |
| Partial product data | Render only publishable cards; card-level fallback for media; missing critical PDP facts are not converted into card claims |
| No valid recipes | Omit recipe module and retain Recipes destination if listing is valid; otherwise identify unavailable section |
| Media failure | Neutral fallback; informative image gets useful alt text, decorative media empty alt |
| Region error | Plain explanation and scoped Retry; previously loaded safe regions remain usable |

## Accessibility acceptance criteria

- One descriptive H1; section headings follow a logical hierarchy.
- Landmark and link names distinguish repeated Shop/Recipe paths by context where needed.
- Every required link is keyboard reachable with visible focus and a 44×44 CSS px target goal.
- Information and link purpose do not depend on imagery, colour, hover or animation.
- At 320 CSS px and 400% zoom, content reflows without two-dimensional scrolling.
- Deferred motion respects reduced motion and never delays access to navigation or content.

## Content and claim boundary

Final prose, imagery and merchandising selections require downstream review. The homepage must not add unsupported modules merely to create visual density. Every module needs valid source content, a user job and a stable destination.
