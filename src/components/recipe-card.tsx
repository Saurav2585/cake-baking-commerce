import Image from "next/image";
import Link from "next/link";
import { resolveRecipeMedia } from "@/lib/domain/catalog";
type Recipe = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  yield: { display_label: string };
  difficulty: string;
  timings: { total: number };
};
export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const media = resolveRecipeMedia(recipe.id);
  return (
    <article className="recipe-card">
      <Link className="recipe-card-image" href={`/recipes/${recipe.slug}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(max-width:640px) 100vw, 33vw"
        />
      </Link>
      <p className="eyebrow">Original demo recipe · {recipe.difficulty}</p>
      <h2>
        <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
      </h2>
      <p>{recipe.summary}</p>
      <div>
        <span>{recipe.yield.display_label}</span>
        <span>{recipe.timings.total} min</span>
      </div>
    </article>
  );
}
