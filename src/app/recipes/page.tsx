import type { Metadata } from "next";
import { recipes } from "@/lib/domain/catalog";
import { RecipeCard } from "@/components/recipe-card";
export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Original demo baking recipes with transparent recipe-to-cart planning.",
};
export default function RecipesPage() {
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Inspiration keeps its measurements</p>
          <h1>Recipes become supply plans.</h1>
        </div>
        <p>
          Six original portfolio recipes connect method to exact canonical
          packs. Results are illustrative, not guaranteed or independently
          culinary-tested.
        </p>
      </header>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
