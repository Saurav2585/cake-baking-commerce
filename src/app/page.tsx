import Image from "next/image";
import Link from "next/link";
import { catalog, recipes } from "@/lib/domain/catalog";
import { ProductGrid } from "@/components/product-grid";
import { MotionEnhancer } from "@/components/motion-enhancer";

const departments = [
  [
    "ingredients",
    "Ingredients",
    "Flours, sugars, leaveners and pantry add-ins",
  ],
  ["chocolate", "Chocolate", "Cocoa, compounds and inclusions"],
  [
    "colours-flavours",
    "Colours & Flavours",
    "Gels, powders, essences and emulsions",
  ],
  ["fillings-fondant", "Fillings & Fondant", "Layer, glaze, cover and model"],
  ["decorating", "Decorating", "Piping, sprinkles and finishing detail"],
  ["bakeware-tools", "Bakeware & Tools", "Shape, measure, mix and prepare"],
  ["packaging", "Packaging", "Boxes, boards and bags"],
  ["recipes", "Recipes", "Turn method into a measured supply plan"],
] as const;

export default function Home() {
  const cocoaRecipe = recipes.find((r) => r.slug === "cocoa-celebration-cake")!;
  return (
    <MotionEnhancer>
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow" data-measure-reveal>
            Raw ingredient · exact measure · joyful making
          </p>
          <h1 data-measure-reveal>From pantry measure to finished bake.</h1>
          <p data-measure-reveal>
            Curated baking ingredients and supplies, with exact packs and
            recipe-led planning. Every price and availability state is a
            fictional demo fixture.
          </p>
          <div className="hero-actions" data-measure-reveal>
            <Link className="button primary" href="/shop">
              Shop exact packs
            </Link>
            <Link className="text-link" href="/recipes">
              Plan from a recipe
            </Link>
          </div>
        </div>
        <div className="hero-stage" data-measure-reveal>
          <Image
            src="/assets/catalog/asset_pf5b_recipe_demo-cocoa-celebration-cake_hero_1536x1024_v1.webp"
            alt="Cocoa celebration cake beside measured cocoa, an illustrative demo recipe presentation"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
          />
          <div className="measure-mark">
            <span>180 g</span>
            <small>ingredient → method</small>
          </div>
        </div>
      </section>
      <div className="process-ruler" aria-label="Measured making sequence">
        <span>01 Raw</span>
        <span>02 Measure</span>
        <span>03 Method</span>
        <span>04 Make</span>
      </div>
      <section className="section-shell">
        <header className="editorial-heading">
          <p className="eyebrow">The pantry atlas</p>
          <h2>Discover by making material.</h2>
          <p>
            Eight useful ways into a broad baking supply cupboard—without
            marketplace clutter.
          </p>
        </header>
        <div className="department-atlas">
          {departments.map(([slug, name, copy], index) => (
            <Link
              key={slug}
              href={slug === "recipes" ? "/recipes" : `/shop/${slug}`}
              className={`department-tile tile-${index + 1}`}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-shell ingredient-theatre">
        <div>
          <p className="eyebrow">Ingredient theatre · factual shopping</p>
          <h2>See the form. Read the facts. Choose the measure.</h2>
          <p>
            Art direction carries the feeling; structured catalog data carries
            the decision.
          </p>
        </div>
        <ProductGrid products={catalog.slice(0, 4)} />
      </section>
      <section className="recipe-bridge">
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
    </MotionEnhancer>
  );
}
