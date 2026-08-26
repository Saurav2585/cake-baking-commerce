import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/domain/catalog";
import { DepartmentAtlas } from "@/components/department-atlas";
import { HeroCollage } from "@/components/hero-collage";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { ProductRail } from "@/components/product-rail";
import {
  getHomepageProduct,
  homepageProductsByBadge,
  homepageSelectedProducts,
} from "@/data/real-products";

const popularBrands = [
  "Callebaut",
  "Morde",
  "Van Houten",
  "Amul",
  "Weikfield",
  "Hershey's",
  "Wilton",
  "Nutella",
  "Urban Platter",
  "Magic Colours",
  "Bakersville",
  "JVG",
];

export default function Home() {
  const cocoaRecipe = recipes.find((r) => r.slug === "cocoa-celebration-cake")!;
  const bestsellers = homepageProductsByBadge("bestseller");
  const newArrivals = homepageProductsByBadge("new");
  const essentials = homepageProductsByBadge("essential");
  const toolsAndPackaging = homepageProductsByBadge("tool");
  const chocolatePromoImage = getHomepageProduct("prod_real_callebaut_811");
  const decoratingPromoImage = getHomepageProduct(
    "prod_real_lukzer_decorating_kit",
  );
  const heroLarge = getHomepageProduct("prod_real_callebaut_811");
  const heroA = getHomepageProduct("prod_real_magic_colours_gel");
  const heroB = getHomepageProduct("prod_real_wilton_decorating_bags");
  const heroSmall = getHomepageProduct("prod_real_bakersville_vizyon_fondant");
  const lowestPrice = Math.min(
    ...homepageSelectedProducts.map((p) => p.variants[0].price_inr_minor / 100),
  );

  return (
    <MotionEnhancer>
      <section className="commerce-hero">
        <div className="hero-copy-panel">
          <span className="promo-label" data-measure-reveal>
            Featured edit
          </span>
          <h1 data-measure-reveal>Real brands. Exact packs. Ready to bake.</h1>
          <p data-measure-reveal>
            Chocolate, colour, fondant and tools from real, verified
            baking-supply brands — demo prices, real packshots.
          </p>
          <div className="hero-actions" data-measure-reveal>
            <Link className="button primary" href="/shop">
              Shop baking essentials
            </Link>
            <Link className="text-link" href="/recipes">
              Explore recipes
            </Link>
          </div>
          <ul className="hero-meta" data-measure-reveal>
            <li>7 departments</li>
            <li>12 real brands</li>
            <li>Demo prices from ₹{lowestPrice}</li>
          </ul>
        </div>
        <HeroCollage
          large={heroLarge}
          secondaryA={heroA}
          secondaryB={heroB}
          foreground={heroSmall}
        />
      </section>
      <section className="section-shell">
        <header className="editorial-heading">
          <p className="eyebrow">Shop by category</p>
          <h2>Discover by making material.</h2>
          <p>
            48 real, provenance-backed products proposed across 7 departments —
            a representative sample is shoppable here now.
          </p>
        </header>
        <DepartmentAtlas />
      </section>
      <section className="section-shell brand-strip-section">
        <header className="editorial-heading">
          <p className="eyebrow">Popular brands</p>
          <h2>Names you already trust in your kitchen.</h2>
          <p>
            A curated subset of the 30 real, verified brands referenced in the
            demo catalog proposal. Typographic placeholder treatment—brand logo
            assets pending clearance.
          </p>
        </header>
        <ul className="brand-strip">
          {popularBrands.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ul>
        <Link className="text-link" href="/shop">
          Browse the assortment →
        </Link>
      </section>
      <section className="section-shell">
        <header className="editorial-heading">
          <p className="eyebrow">Bestsellers · demo-curated</p>
          <h2>Reached for again and again.</h2>
          <p>Curated picks, not real sales data.</p>
        </header>
        <ProductRail
          products={bestsellers}
          ariaLabel="Bestsellers"
          badge="Bestseller"
          pattern="editorial"
          featureId="prod_real_callebaut_811"
          featureCaption="Dark couverture callets — melt, mould or temper for ganache, coatings and shells."
        />
      </section>
      <section className="section-shell promo-split-section">
        <div className="promo-split">
          <Link href="/shop/chocolate" className="promo-panel">
            <div className="promo-image">
              <Image
                src={chocolatePromoImage.media.src}
                alt={chocolatePromoImage.media.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="eyebrow">Chocolate &amp; cocoa essentials</p>
            <h3>Stock the melt-and-mould basics.</h3>
            <span className="text-link">Shop chocolate →</span>
          </Link>
          <Link href="/shop/decorating" className="promo-panel">
            <div className="promo-image">
              <Image
                src={decoratingPromoImage.media.src}
                alt={decoratingPromoImage.media.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="eyebrow">Cake decorating favourites</p>
            <h3>Gear up for your next celebration cake.</h3>
            <span className="text-link">Shop decorating →</span>
          </Link>
        </div>
      </section>
      <section className="section-shell">
        <header className="editorial-heading editorial-heading-compact">
          <h2>Freshly added to the demo assortment.</h2>
          <p>Recently staged in the R1 real-catalog proposal.</p>
        </header>
        <ProductRail
          products={newArrivals}
          ariaLabel="New arrivals"
          badge="New"
          pattern="filmstrip"
        />
      </section>
      <section className="section-shell ingredient-theatre">
        <header className="editorial-heading">
          <p className="eyebrow">Baking essentials</p>
          <h2>The repeat-purchase shelf.</h2>
          <p>
            Flour, sugar, leavening and fondant staples — the highest-frequency
            category for real bakers.
          </p>
        </header>
        <ProductRail
          products={essentials}
          ariaLabel="Baking essentials"
          badge="Essential"
          pattern="split"
          splitPanelId="prod_real_bakersville_vizyon_fondant"
        />
      </section>
      <section className="section-shell">
        <header className="editorial-heading editorial-heading-compact">
          <h2>Finish, box and gift it properly.</h2>
          <p>Piping, decorating kits and cake packaging in one place.</p>
        </header>
        <ProductRail
          products={toolsAndPackaging}
          ariaLabel="Tools, bakeware and packaging"
          badge="Tool pick"
          pattern="shelf"
        />
      </section>
      <section className="recipe-bridge recipe-bridge-compact">
        <div className="recipe-image">
          <Image
            src="/assets/catalog/asset_pf5b_recipe_orange-glaze-loaf_hero_1536x1024_v1.webp"
            alt="Orange glaze loaf with measured orange ingredients, illustrative demo recipe"
            fill
            sizes="(max-width:768px) 100vw, 56vw"
          />
        </div>
        <div>
          <p className="eyebrow">Recipe → reviewed supplies</p>
          <h2>{cocoaRecipe.title} becomes a transparent pack plan.</h2>
          <p>
            Required, purchased and leftover amounts remain visible before
            selected items enter the demo cart.
          </p>
          <Link
            className="button primary"
            href={`/recipes/${cocoaRecipe.slug}`}
          >
            Explore recipe planning
          </Link>
        </div>
      </section>
      <section className="trust-strip">
        <div>
          <h3>Wide selection</h3>
          <p>7 departments spanning real, verified baking-supply brands.</p>
        </div>
        <div>
          <h3>Clear pack sizes</h3>
          <p>Every listing states an exact pack size, not a vague estimate.</p>
        </div>
        <div>
          <h3>Recipe-led planning</h3>
          <p>Turn a method into a measured, reviewable supply plan.</p>
        </div>
        <div>
          <h3>Simulated secure checkout</h3>
          <p>A demo experience only — no real payment is ever taken.</p>
        </div>
      </section>
    </MotionEnhancer>
  );
}
