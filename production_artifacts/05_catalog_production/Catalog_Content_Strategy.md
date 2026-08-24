# Catalog Content Strategy

## Customer task

Lead with the facts needed to identify a material, choose a pack or dimension, and understand what remains unknown. Product titles stay generic and pack-neutral; sellable values live on SKUs.

## Content hierarchy

1. Factual product identity and form.
2. Variant-specific pack, dimension or count.
3. Demo price, comparable unit price where meaningful, and clearly simulated availability.
4. Known family attributes.
5. Critical unknowns rendered exactly as **Information not provided**.
6. Plain application tags for discovery, never proof of performance.

## Voice and claim controls

- Use Pantryform's precise, encouraging Indian-English voice.
- Prefer “for measuring dry ingredients” to “professional precision”.
- Do not use best, premium, pure, natural, safe, food-grade, eco-friendly, guaranteed or similar unverified language.
- Do not convert an application tag into suitability or outcome copy.
- Recipes describe a method, not a guaranteed result; fictional product mappings indicate a demo shopping bridge, not endorsement.

## Data ownership

`Product_Master_Data.json` owns identity and taxonomy. `SKU_Variant_Data.json` owns price, availability and axes. `Product_Content_Records.json` owns authored descriptions, fact states, SEO and media intent. Recipe files own editorial method and explicit mappings. Duplicate commerce facts are prohibited.

The files form a normalized authoring bundle rather than independent publishable documents. The `en-IN` locale declared by each text-bearing file wraps its authored strings as `LocalizedText` at assembly; record defaults are materialized on every compiled record; content and manifest relationships are joined by stable product IDs. A compiled record must fail validation if any join, default or required fact cannot resolve.

## Fallbacks

Missing imagery uses the approved neutral generated fallback with descriptive text outside the image. Missing critical facts remain visible; they are never omitted or replaced with optimistic copy.
