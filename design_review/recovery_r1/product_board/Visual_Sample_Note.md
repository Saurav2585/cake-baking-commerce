# Recovery R1 — 12-Product Visual Sample

The full 48-product real-catalog proposal lives in `design_review/recovery_r1/catalog/`. For R1 visual testing only, a representative sample of 12 products was locally staged (images downloaded to `design_review/recovery_r1/product_board/images/`) and rendered into a review-board layout, per the instruction to stage only a representative sample rather than the complete 48-product asset library during R1.

## Selection criteria

Spans all 7 departments and demonstrates package-type variety: pouch/bag, slab, poly jar, gel bottle, extract bottle, fondant tub, spread jar, sprinkle pouch, and two boxed items (a tool pack and a decorating kit), plus a folded cake box.

| # | Product | Brand | Department | Package type |
|---|---|---|---|---|
| 1 | 811 Dark Chocolate Callets | Callebaut | Chocolates and cocoa | Pouch/bag |
| 2 | Dark Compound Chocolate Slab | Morde | Chocolates and cocoa | Slab |
| 3 | Double Action Baking Powder | Weikfield | Flour, sugar and baking essentials | Poly jar |
| 4 | Icing Sugar | Eagle | Flour, sugar and baking essentials | Pouch |
| 5 | Spectral Gel Colour — Red | Magic Colours | Colours, flavours and essences | Bottle |
| 6 | Premium Vanilla Extract | Urban Platter | Colours, flavours and essences | Bottle |
| 7 | Vizyon Sugar Paste — White | Bakersville | Fondant, fillings and toppings | Tub |
| 8 | Hazelnut Spread with Cocoa | Nutella (Ferrero) | Fondant, fillings and toppings | Jar |
| 9 | Chocolate Vermicelli Sprinkles | JVG | Sprinkles and edible decoration | Pouch |
| 10 | 16-Inch Disposable Decorating Bags | Wilton | Baking tools and bakeware | Box (12-pack) |
| 11 | Cake Decorating Kit with Turntable | Lukzer | Baking tools and bakeware | Box (kit) |
| 12 | Cake Box with Window | Eco Bags India | Cake boards, boxes and packaging | Folded box |

## Image sourcing method

Each image was located on the product's manufacturer/brand site or a named authorized retailer/marketplace listing (Amazon.in, BigBasket, or the brand's own storefront), the direct image URL was extracted, and the file was downloaded once to local storage under `images/`. No image is hotlinked from the review board — every `<img src>` in `review-board.html` points at a locally staged file. Full per-image source URLs are in `Product_Provenance_Register.md`.

## Correction from the provenance register

Item 11's registered source URL (`amazon.in/Lukzer-Turntable-Table-Baking-Tools/dp/B07G5C95TB`) resolved, on live fetch, to a **46-piece cake decorating kit that includes a turntable** rather than a standalone turntable listing. The visual sample and its card copy reflect the product actually found at that URL ("Cake Decorating Kit with Turntable") rather than the narrower "turntable only" description originally registered — this is noted here rather than silently reconciled, consistent with the project's fail-closed truth-handling pattern.

## Disclosure

All product photography in this sample is third-party brand/manufacturer imagery, staged locally for portfolio/demo design-review purposes only. Pantryform is not affiliated with, sponsored by, or endorsed by any brand shown. See the disclosure banner on the review board itself and in `Real_Catalog_Proposal.md` for the full statement.
