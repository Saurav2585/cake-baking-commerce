"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { catalog, formatINR, recipeMappings } from "@/lib/domain/catalog";
import {
  selectSingleVariant,
  selectSmallestSufficient,
} from "@/lib/domain/recipe-solver";
import { useCommerce } from "./commerce-provider";
type Ingredient = {
  id: string;
  display_name: string;
  base_quantity: { kind: string; value: number; canonical_unit: string };
  optional: boolean;
  pantry_default: string;
  mapping_status: string;
};
type Recipe = {
  id: string;
  slug: string;
  title: string;
  yield: { base_servings: number; display_label: string };
  serving_bounds: { min: number; max: number; step: number };
  ingredients: Ingredient[];
};
export function RecipeReview({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { addLine } = useCommerce();
  const [servings, setServings] = useState(recipe.yield.base_servings);
  const [included, setIncluded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      recipe.ingredients.map((i) => [
        i.id,
        !i.optional && i.pantry_default === "assume_needed",
      ]),
    ),
  );
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const rows = useMemo(
    () =>
      recipe.ingredients.map((ingredient) => {
        const mapping = recipeMappings.find(
          (m) => m.recipe_ingredient_id === ingredient.id,
        );
        const product = mapping
          ? catalog.find((p) => p.id === mapping.product_id)
          : undefined;
        const required =
          ingredient.base_quantity.value *
          (servings / recipe.yield.base_servings);
        if (!product)
          return { ingredient, required, product: null, selection: null };
        const compatible = product.variants.filter(
          (v) =>
            v.normalized_sell_quantity.kind === ingredient.base_quantity.kind &&
            v.normalized_sell_quantity.canonical_unit ===
              ingredient.base_quantity.canonical_unit &&
            !["unavailable", "discontinued"].includes(v.availability),
        );
        const options = compatible.map((v) => ({
          variantId: v.id,
          sku: v.sku,
          quantity: v.normalized_sell_quantity.canonical_value,
          pricePaise: v.price_inr_minor,
        }));
        const override = overrides[ingredient.id];
        const selected = override
          ? selectSingleVariant(
              required,
              options.find((o) => o.variantId === override)!,
            )
          : selectSmallestSufficient(required, options);
        return { ingredient, required, product, selection: selected };
      }),
    [recipe, servings, overrides],
  );
  const addSelected = () => {
    for (const row of rows) {
      if (!included[row.ingredient.id] || !row.product || !row.selection)
        continue;
      for (const line of row.selection.lines) {
        const variant = row.product.variants.find(
          (v) => v.id === line.variantId,
        )!;
        addLine({
          sku: variant.sku,
          quantity: line.count,
          observedUnitPricePaise: variant.price_inr_minor,
          productId: row.product.id,
          variantId: variant.id,
          productTitle: row.product.title,
          variantLabel: variant.normalized_sell_quantity.display_label,
          brandName: row.product.brandName,
          sources: [
            {
              kind: "recipe",
              recipeId: recipe.id,
              recipeRevision: "phase5b",
              mappingId: row.ingredient.id,
            },
          ],
        });
      }
    }
    router.push("/cart");
  };
  return (
    <>
      <div className="servings-control">
        <label>
          Servings{" "}
          <input
            type="number"
            min={recipe.serving_bounds.min}
            max={recipe.serving_bounds.max}
            step={recipe.serving_bounds.step}
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
          />
        </label>
        <p role="status">
          Requirements scaled from {recipe.yield.base_servings} to {servings}{" "}
          servings.
        </p>
      </div>
      <div className="mapping-list">
        {rows.map((row, index) => (
          <article key={row.ingredient.id}>
            <span className="mapping-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{row.ingredient.display_name}</h2>
              <p>
                Required{" "}
                <strong>
                  {row.required} {row.ingredient.base_quantity.canonical_unit}
                </strong>
              </p>
              {row.product && row.selection ? (
                <>
                  <p>
                    Selected{" "}
                    <strong>
                      {row.selection.lines
                        .map(
                          (l) =>
                            `${l.count} × ${row.product!.variants.find((v) => v.id === l.variantId)!.normalized_sell_quantity.display_label}`,
                        )
                        .join(" + ")}
                    </strong>
                  </p>
                  <p>
                    Purchased {row.selection.purchased}{" "}
                    {row.ingredient.base_quantity.canonical_unit} · leftover{" "}
                    {row.selection.leftover}{" "}
                    {row.ingredient.base_quantity.canonical_unit} ·{" "}
                    {formatINR(row.selection.totalPricePaise)}
                  </p>
                  <label>
                    Override pack{" "}
                    <select
                      value={overrides[row.ingredient.id] ?? ""}
                      onChange={(e) =>
                        setOverrides((o) => ({
                          ...o,
                          [row.ingredient.id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Smallest sufficient</option>
                      {row.product.variants
                        .filter(
                          (v) =>
                            !["unavailable", "discontinued"].includes(
                              v.availability,
                            ),
                        )
                        .map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.normalized_sell_quantity.display_label} · {v.sku}
                          </option>
                        ))}
                    </select>
                  </label>
                </>
              ) : (
                <p className="notice">
                  No bounded catalog mapping. Keep as a visible pantry check; it
                  will not be added.
                </p>
              )}
            </div>
            <label className="include-control">
              <input
                type="checkbox"
                checked={included[row.ingredient.id] ?? false}
                disabled={!row.product || !row.selection}
                onChange={(e) =>
                  setIncluded((current) => ({
                    ...current,
                    [row.ingredient.id]: e.target.checked,
                  }))
                }
              />{" "}
              {row.ingredient.optional
                ? "Include optional item"
                : row.ingredient.pantry_default === "suggest_owned"
                  ? "I need this pantry item"
                  : "Add mapped supply"}
            </label>
          </article>
        ))}
      </div>
      <button
        className="button coral recipe-add"
        disabled={!rows.some((r) => included[r.ingredient.id] && r.selection)}
        onClick={addSelected}
      >
        Add selected supplies to demo cart
      </button>
    </>
  );
}
