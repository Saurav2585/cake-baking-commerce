import Image from "next/image";
import Link from "next/link";
import { recipes } from "@/lib/domain/catalog";
import { MotionEnhancer } from "@/components/motion-enhancer";
import { RealProductCard } from "@/components/real-product-card";
import { RealProductRail } from "@/components/real-product-rail";
import {
  departmentDisplay,
  departmentTileImage,
  realProductsByBadge,
  realProductsById,
  type RealProductDepartment,
} from "@/data/real-products";

const shopDepartments = Object.keys(
  departmentDisplay,
) as RealProductDepartment[];

const heroProductIds = [
  "rp_callebaut_811",
  "rp_magic_colours_gel_red",
  "rp_bakersville_vizyon_fondant",
  "rp_wilton_decorating_bags",
];

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
  const bestsellers = realProductsByBadge("bestseller");
  const newArrivals = realProductsByBadge("new");
  const essentials = realProductsByBadge("essential");
  const toolsAndPackaging = realProductsByBadge("tool");
  const chocolatePromoImage = realProductsById.get("rp_callebaut_811")!;
  const decoratingPromoImage = realProductsById.get(
    "rp_lukzer_decorating_kit",
  )!;

  return (
    <MotionEnhancer>
      <section className="commerce-hero">
        <div className="hero-copy-panel">
          <p className="eyebrow" data-measure-reveal>
            Real brands · exact packs · demo baking marketplace
          </p>
          <h1 data-measure-reveal>
            Stock the pantry with the brands bakers actually reach for.
          </h1>
          <p data-measure-reveal>
            Chocolate, colour, fondant, tools and packaging from real,
            recognisable baking-supply brands — every price, pack size and
            availability state shown is a fictional demo fixture.
          </p>
          <div className="hero-actions" data-measure-reveal>
            <Link className="button primary" href="/shop">
              Shop baking essentials
            </Link>
            <Link className="text-link" href="/recipes">
              Plan from a recipe
            </Link>
          </div>
        </div>
        <div className="hero-product-stage" data-measure-reveal>
          {heroProductIds.map((id, index) => (
            <RealProductCard
              key={id}
              product={realProductsById.get(id)!}
              priority={index === 0}
            />
          ))}
        </div>
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
        <div className="department-atlas">
          {shopDepartments.map((slug, index) => {
            const info = departmentDisplay[slug];
            const image = departmentTileImage[slug];
            return (
              <Link
                key={slug}
                href={`/shop/${slug}`}
                className={`department-tile tile-${index + 1}`}
              >
                <div className="tile-image">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{info.title}</h3>
                <p>{info.blurb}</p>
              </Link>
            );
          })}
          <Link href="/recipes" className="department-tile tile-8 recipes-tile">
            <span>08</span>
            <h3>Recipes</h3>
            <p>Turn method into a measured supply plan</p>
          </Link>
        </div>
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
        <RealProductRail products={bestsellers} ariaLabel="Bestsellers" />
      </section>
      <section className="section-shell promo-split-section">
        <div className="promo-split">
          <Link href="/shop/chocolate" className="promo-panel">
            <div className="promo-image">
              <Image
                src={chocolatePromoImage.image.src}
                alt={chocolatePromoImage.image.alt}
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
                src={decoratingPromoImage.image.src}
                alt={decoratingPromoImage.image.alt}
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
        <header className="editorial-heading">
          <p className="eyebrow">New arrivals · demo-curated</p>
          <h2>Freshly added to the demo assortment.</h2>
          <p>Recently staged in the R1 real-catalog proposal.</p>
        </header>
        <RealProductRail products={newArrivals} ariaLabel="New arrivals" />
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
        <RealProductRail products={essentials} ariaLabel="Baking essentials" />
      </section>
      <section className="section-shell">
        <header className="editorial-heading">
          <p className="eyebrow">Tools, bakeware &amp; packaging</p>
          <h2>Finish, box and gift it properly.</h2>
          <p>Piping, decorating kits and cake packaging in one place.</p>
        </header>
        <RealProductRail
          products={toolsAndPackaging}
          ariaLabel="Tools, bakeware and packaging"
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
