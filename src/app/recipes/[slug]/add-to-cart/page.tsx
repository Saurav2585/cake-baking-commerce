import Link from "next/link";
import { notFound } from "next/navigation";
import { recipes } from "@/lib/domain/catalog";
import { RecipeReview } from "@/components/recipe-review";
export default async function RecipeCartPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();
  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/recipes">Recipes</Link>
          </li>
          <li>
            → <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
          </li>
          <li aria-current="page">→ Review supplies</li>
        </ol>
      </nav>
      <header className="page-hero">
        <div>
          <p className="eyebrow">Recipe → reviewed supply</p>
          <h1>Required, selected, purchased, leftover.</h1>
        </div>
        <p>
          Only eligible mapped ingredients start selected. Pantry checks,
          optional and unmapped lines are never silently added.
        </p>
      </header>
      <RecipeReview recipe={recipe} />
    </div>
  );
}
