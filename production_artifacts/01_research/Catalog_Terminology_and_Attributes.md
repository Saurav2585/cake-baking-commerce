# Catalog Terminology and Attributes

## Recommended customer-facing departments

This is an original synthesis for the approved curated retailer, subject to the Phase 1 human gate.

1. **Ingredients** — flour, mixes, essentials, sugar, dry fruits/nuts.
2. **Chocolate** — compound, couverture, cocoa, chips/decorations, fillings.
3. **Colours & Flavours** — food colours by medium/form; extracts, emulsions and essences.
4. **Fillings & Fondant** — fruit/chocolate fillings, glaze, fondant, gum paste and icing.
5. **Decorating** — sprinkles, edible decor and non-edible presentation materials kept visibly distinct.
6. **Bakeware & Tools** — pans/moulds, measuring, mixing, piping and decorating tools.
7. **Packaging** — boxes, boards, liners, bags, containers and bake-and-serve.
8. **Recipes** — structured inspiration and recipe-to-cart entry.

**Evidence:** E-001, E-009, E-012–E-015, E-030.  
**Confidence:** High for coverage; Medium for label comprehension pending primary research.

## Universal product fields

- Product family, subfamily, original fictional brand, title, slug and factual short description.
- Parent product ID; variant/SKU ID; current and optional compare-at INR price; price observation/provenance; availability state.
- Variant label, normalized quantity/dimension value and display label; unit price where meaningful.
- Application/use tags, images with alt-text intent, demo disclosure and provenance status.
- `known`, `not_provided` and `not_applicable` states for safety- or suitability-sensitive fields.

## Family-specific fields

| Family | Required or conditionally required attributes | Do not infer |
|---|---|---|
| Ingredients | Net quantity/unit, form, verified ingredients, verified allergen declaration, shelf life, storage, use/dilution, packaging type | “Free from,” vegetarian/vegan, certification, bake stability |
| Chocolate | Compound/couverture/cocoa/etc.; dark/milk/white; cocoa %; cocoa-butter/fat % if verified; button/chip/block/powder; fluidity; tempering requirement; heat/transit note | Quality, origin prestige, melt resistance |
| Colours | Colour name/family, medium/base, gel/liquid/oil/powder/airbrush/spray, compatible applications, concentration/use | “Edible,” natural, allergen-free or chocolate-safe without verification |
| Flavours | Flavour, essence/extract/emulsion/oil-soluble type, carrier/compatibility, volume, use rate if verified | Strength, purity or natural origin |
| Fillings | Fruit/flavour, texture/fluidity, ready-to-use/dilution, bake/freeze stability only if verified, after-opening storage | Fruit percentage or stability without source |
| Fondant/decor | Type, colour, mass/count, covering/modelling/use fit, working/storage guidance | Dietary status, food-contact or climate performance |
| Bakeware | Internal dimensions, unit, material, finish, shape, cavity/set count, care and verified temperature/appliance compatibility | Oven/freezer/dishwasher safety or warranty |
| Tools | Dimensions, material, set count, intended task, care, sharp/heat-use note where applicable | Professional quality or durability |
| Packaging | Internal dimensions, material, GSM if known, pack count/MOQ, colour/window, flat/self-assemble, compatible board/cake only if verified | Food contact, capacity, grease resistance or eco claims |

## Variant rules

1. Consumable pack size, fondant colour/size, packaging dimensions/count and bakeware size are variant axes, not free text.
2. Price, stock, SKU and image belong to the sellable variant.
3. Normalize `g`, `kg`, `ml`, `L`, `cm`, `mm`, `in` and count for comparison while preserving a readable display label.
4. Reject publication when title quantity, variant value and net quantity conflict (E-021).
5. Do not expose irrelevant universal colour/size filters; facets are family-specific.

## Search and filter vocabulary

- Normalize colour/color, flavour/flavor, g/gm/grams, kg/kgs and common spelling variants.
- Search title, original brand, family/subfamily, application, form/medium and pack token.
- Chocolate facets: subtype, cocoa band, form, weight, application and fluidity when known.
- Colour facets: medium/base, form, colour family and application.
- Packaging/bakeware facets: dimensions, shape, material and pack/cavity count.
- Never expose dietary/certification filters unless every included value has verified provenance.

## External-fact boundary

FSSAI official materials support retaining source-verified ingredient, allergen, net-quantity and storage information for pre-packaged foods (E-024–E-025). Phase 2 must obtain compliance review before treating the demo schema as legally sufficient.
