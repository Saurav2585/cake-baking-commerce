import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  catalog,
  catalogBySlug,
  recipeMappings,
  recipes,
} from "@/lib/domain/catalog";
import { ProductDetail } from "@/components/product-detail";
import { ProductGrid } from "@/components/product-grid";
import { RecipeCard } from "@/components/recipe-card";
export function generateStaticParams() {
  return catalog.map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = catalogBySlug.get(slug);
  // Decision 4 (Reconciliation_and_R2B2_Implementation_Package.md): the
  // product itself is now a real, verified, sourced item — only the
  // commerce (pricing/availability/checkout) is simulated. Do not
  // mischaracterize the product as fictional.
  return p
    ? {
        title: p.title,
        description: `${p.title} by ${p.brandName}, a real product on Pantryform, a fictional demo store. Pricing, availability and checkout are simulated.`,
      }
    : { title: "Product not found" };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = catalogBySlug.get(slug);
  if (!product) notFound();
  const related = catalog
    .filter(
      (p) => p.department_id === product.department_id && p.id !== product.id,
    )
    .slice(0, 4);
  // Route_UI_Specification.md §4.10: conditional "Used in this recipe"
  // module — present only when this product genuinely appears in
  // Recipe_Product_Mapping.json's mappings[]. Omitted entirely otherwise
  // (no placeholder), since most products have no mapped recipe line.
  const matchedIngredientIds = new Set(
    recipeMappings
      .filter((mapping) => mapping.product_id === product.id)
      .map((mapping) => mapping.recipe_ingredient_id),
  );
  const matchedRecipes = matchedIngredientIds.size
    ? recipes.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          matchedIngredientIds.has(ingredient.id),
        ),
      )
    : [];
  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            → <Link href="/shop">Shop</Link>
          </li>
          <li aria-current="page">→ {product.title}</li>
        </ol>
      </nav>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <section className="related-section">
          <p className="eyebrow">Continue through the department</p>
          <h2>Measured companions.</h2>
          <ProductGrid products={related} />
        </section>
      )}
      {matchedRecipes.length > 0 && (
        <section className="pdp-recipe-section">
          <p className="eyebrow">Usage inspiration</p>
          <h2>
            {matchedRecipes.length > 1
              ? "Used in these recipes."
              : "Used in this recipe."}
          </h2>
          <div className="recipe-grid">
            {matchedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
