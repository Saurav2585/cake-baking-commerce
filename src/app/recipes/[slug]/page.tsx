import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes, resolveRecipeMedia } from "@/lib/domain/catalog";
export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}
export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();
  const media = resolveRecipeMedia(recipe.id, "hero");
  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            → <Link href="/recipes">Recipes</Link>
          </li>
          <li aria-current="page">→ {recipe.title}</li>
        </ol>
      </nav>
      <header className="recipe-detail-hero">
        <div>
          <p className="eyebrow">Original demo recipe · {recipe.difficulty}</p>
          <h1>{recipe.title}</h1>
          <p>{recipe.summary}</p>
          <div className="recipe-stats">
            <span>{recipe.yield.display_label}</span>
            <span>{recipe.timings.total} min total</span>
          </div>
          <Link
            className="button coral"
            href={`/recipes/${recipe.slug}/add-to-cart`}
          >
            Review supplies
          </Link>
        </div>
        <div className="recipe-hero-image">
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="(max-width:768px) 100vw, 55vw"
          />
        </div>
      </header>
      <section className="recipe-body">
        <div>
          <h2>Measured ingredients</h2>
          <ul className="ingredient-list">
            {recipe.ingredients.map((i) => (
              <li key={i.id}>
                <strong>
                  {i.base_quantity.value} {i.base_quantity.canonical_unit}
                </strong>
                <span>
                  {i.display_name}
                  {i.optional ? " · optional" : ""}
                  {i.mapping_status === "unmapped" ? " · pantry/unmapped" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Method</h2>
          <ol className="method-list">
            {recipe.steps.map((step) => (
              <li key={step.id}>
                <span>{String(step.order).padStart(2, "0")}</span>
                <p>{step.instruction}</p>
              </li>
            ))}
          </ol>
          <p className="notice">
            Demo editorial method; not independently culinary-tested and no
            result is guaranteed.
          </p>
        </div>
      </section>
    </div>
  );
}
