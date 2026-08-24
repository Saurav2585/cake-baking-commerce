const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), "utf8"));
const products = read("Product_Master_Data.json").products;
const variants = read("SKU_Variant_Data.json").variants;
const content = read("Product_Content_Records.json").records;
const recipes = read("Recipe_Master_Data.json").recipes;
const mappingData = read("Recipe_Product_Mapping.json");
const mappings = mappingData.mappings;
const unmappedRecords = mappingData.unmapped_ingredients;
const assets = read("Catalog_Asset_Manifest.json").records;
const expected = read("data/Catalog_Data_Index.json").expected_counts;

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};
const unique = (values, label) => {
  assert(new Set(values).size === values.length, `${label} values must be unique`);
};
const sameKeys = (left, right) =>
  [...left].sort().join("|") === [...right].sort().join("|");

unique(products.map((item) => item.id), "product ID");
unique(products.map((item) => item.slug), "product slug");
unique(variants.map((item) => item.id), "variant ID");
unique(variants.map((item) => item.sku), "SKU");
unique(content.map((item) => item.product_id), "content product ID");
unique(recipes.map((item) => item.id), "recipe ID");
unique(recipes.map((item) => item.slug), "recipe slug");

assert(products.length === expected.parent_products, `expected ${expected.parent_products} products`);
assert(variants.length === expected.sellable_variants, `expected ${expected.sellable_variants} variants`);
assert(content.length === expected.product_content_records, `expected ${expected.product_content_records} content records`);
assert(recipes.length === expected.recipes, `expected ${expected.recipes} recipes`);

const expectedDistribution = read("data/Catalog_Data_Index.json").department_parent_distribution;
for (const [departmentId, count] of Object.entries(expectedDistribution)) {
  assert(
    products.filter((item) => item.department_id === departmentId).length === count,
    `${departmentId} must contain ${count} parent products`,
  );
}
assert(
  Object.keys(expectedDistribution).includes(products[0]?.department_id) &&
    products.every((item) => Object.hasOwn(expectedDistribution, item.department_id)),
  "every product must use an approved seeded department",
);

const productById = new Map(products.map((item) => [item.id, item]));
for (const product of products) {
  assert(variants.some((item) => item.parent_product_id === product.id), `${product.id} has no SKU`);
  assert(content.filter((item) => item.product_id === product.id).length === 1, `${product.id} must have one content record`);
  assert(
    assets.some((item) => item.relationships?.product_ids?.includes(product.id)),
    `${product.id} has no catalog asset relationship`,
  );
}

for (const variant of variants) {
  const product = productById.get(variant.parent_product_id);
  assert(Boolean(product), `${variant.id} has an unresolved parent`);
  if (product) {
    assert(
      sameKeys(Object.keys(variant.axis_values), product.variant_axes),
      `${variant.id} axes do not exactly match ${product.id}`,
    );
  }
  assert(Number.isInteger(variant.price_inr_minor) && variant.price_inr_minor >= 0, `${variant.id} has an invalid INR minor price`);
  assert(
    ["available", "low_demo_stock", "unavailable", "discontinued"].includes(variant.availability),
    `${variant.id} has an invalid availability fixture`,
  );
}

for (const record of content) {
  assert(productById.has(record.product_id), `${record.product_id} content parent is unresolved`);
  for (const key of ["ingredients", "allergens", "storage"]) {
    assert(Boolean(record.critical_facts?.[key]?.status), `${record.product_id} is missing ${key} fact status`);
  }
}

const ingredientLines = recipes.flatMap((recipe) => recipe.ingredients);
unique(ingredientLines.map((item) => item.id), "recipe ingredient ID");
assert(ingredientLines.length === expected.recipe_ingredient_lines, `expected ${expected.recipe_ingredient_lines} recipe ingredient lines`);
assert(mappings.length === expected.explicit_product_mappings, `expected ${expected.explicit_product_mappings} mappings`);

const ingredientById = new Map(ingredientLines.map((item) => [item.id, item]));
for (const recipe of recipes) {
  unique(recipe.ingredients.map((item) => item.order), `${recipe.id} ingredient order`);
  unique(recipe.steps.map((item) => item.id), `${recipe.id} step ID`);
  unique(recipe.steps.map((item) => item.order), `${recipe.id} step order`);
  assert(recipe.ingredients.some((item) => !item.optional), `${recipe.id} must have a required ingredient`);
  assert(recipe.steps.every((item) => Boolean(item.instruction?.trim())), `${recipe.id} has an empty method step`);
  assert(
    recipe.serving_bounds.min <= recipe.yield.base_servings && recipe.yield.base_servings <= recipe.serving_bounds.max,
    `${recipe.id} base servings fall outside bounds`,
  );
  assert(
    recipe.timings.total >= recipe.timings.preparation + recipe.timings.bake + recipe.timings.cool,
    `${recipe.id} total timing is less than its components`,
  );
  assert(
    assets.some((item) => item.asset_id === recipe.media.primary_asset_id && item.relationships?.recipe_ids?.includes(recipe.id)),
    `${recipe.id} primary asset does not resolve by ID and relationship`,
  );
}

for (const mapping of mappings) {
  assert(ingredientById.has(mapping.recipe_ingredient_id), `${mapping.recipe_ingredient_id} mapping ingredient is unresolved`);
  assert(productById.has(mapping.product_id), `${mapping.product_id} mapping product is unresolved`);
}
for (const ingredient of ingredientLines) {
  const count = mappings.filter((item) => item.recipe_ingredient_id === ingredient.id).length;
  assert(
    ingredient.mapping_status === "mapped" ? count > 0 : count === 0,
    `${ingredient.id} mapping_status disagrees with mapping records`,
  );
}
assert(
  ingredientLines.filter((item) => item.mapping_status === "unmapped").length === expected.explicit_unmapped_lines,
  `expected ${expected.explicit_unmapped_lines} explicit unmapped lines`,
);
assert(unmappedRecords.length === expected.explicit_unmapped_lines, `expected ${expected.explicit_unmapped_lines} unmapped explanation records`);
unique(unmappedRecords.map((item) => item.recipe_ingredient_id), "unmapped explanation ingredient ID");
for (const item of unmappedRecords) {
  assert(ingredientById.get(item.recipe_ingredient_id)?.mapping_status === "unmapped", `${item.recipe_ingredient_id} unmapped explanation is unresolved or disagrees with ingredient state`);
  assert(Boolean(item.reason?.trim()), `${item.recipe_ingredient_id} unmapped explanation is empty`);
}

const summary = {
  result: errors.length ? "FAIL" : "PASS",
  products: products.length,
  variants: variants.length,
  content_records: content.length,
  recipes: recipes.length,
  recipe_ingredient_lines: ingredientLines.length,
  mappings: mappings.length,
  product_asset_coverage: products.filter((product) =>
    assets.some((asset) => asset.relationships?.product_ids?.includes(product.id)),
  ).length,
  recipe_asset_coverage: recipes.filter((recipe) =>
    assets.some((asset) => asset.relationships?.recipe_ids?.includes(recipe.id)),
  ).length,
  errors,
};

console.log(JSON.stringify(summary, null, 2));
if (errors.length) process.exitCode = 1;
