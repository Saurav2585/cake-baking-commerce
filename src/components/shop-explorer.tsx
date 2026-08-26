"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { CatalogProduct } from "@/lib/domain/types";
import { ProductGrid } from "./product-grid";
import { emitAnalytics } from "@/lib/domain/analytics";

const DEPARTMENTS: { id: string; slug: string; label: string }[] = [
  { id: "dept_ingredients", slug: "ingredients", label: "Ingredients" },
  { id: "dept_chocolate", slug: "chocolate", label: "Chocolate" },
  {
    id: "dept_colours_flavours",
    slug: "colours-flavours",
    label: "Colours & Flavours",
  },
  {
    id: "dept_fillings_fondant",
    slug: "fillings-fondant",
    label: "Fillings & Fondant",
  },
  { id: "dept_decorating", slug: "decorating", label: "Decorating" },
  {
    id: "dept_bakeware_tools",
    slug: "bakeware-tools",
    label: "Bakeware & Tools",
  },
  { id: "dept_packaging", slug: "packaging", label: "Packaging" },
];

const BRAND_PREVIEW_COUNT = 8;

export function ShopExplorer({
  products,
  initialQuery = "",
  lockedDepartment = "",
  initialBrands = [],
}: {
  products: CatalogProduct[];
  initialQuery?: string;
  lockedDepartment?: string;
  initialBrands?: string[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState(lockedDepartment);
  const [sort, setSort] = useState("featured");
  const [brands, setBrands] = useState<string[]>(initialBrands);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  const allBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brandName))).sort(),
    [products],
  );
  const visibleBrands = brandsExpanded
    ? allBrands
    : allBrands.slice(0, BRAND_PREVIEW_COUNT);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!department || p.department_id === department) &&
        (!brands.length || brands.includes(p.brandName)) &&
        (!normalized ||
          `${p.title} ${p.brandName} ${p.variants.map((v) => v.sku).join(" ")} ${p.applications.join(" ")}`
            .toLowerCase()
            .includes(normalized)),
    );
    return [...list].sort((a, b) =>
      sort === "price-asc"
        ? a.variants[0].price_inr_minor - b.variants[0].price_inr_minor
        : sort === "price-desc"
          ? b.variants[0].price_inr_minor - a.variants[0].price_inr_minor
          : a.title.localeCompare(b.title),
    );
  }, [products, query, department, brands, sort]);

  const apply = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (department) params.set("department", department);
    if (sort !== "featured") params.set("sort", sort);
    if (brands.length) params.set("brand", brands.join(","));
    router.replace(`${location.pathname}?${params}`);
    emitAnalytics({ name: "search", query, resultCount: filtered.length });
  };

  const toggleBrand = (brand: string) => {
    setBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand],
    );
  };

  const clear = () => {
    setQuery("");
    if (!lockedDepartment) setDepartment("");
    setSort("featured");
    setBrands([]);
    router.replace(location.pathname);
  };

  const hasQuery = query.trim().length > 0;
  const activeFilterChips = [
    ...(department
      ? [DEPARTMENTS.find((d) => d.id === department)?.label ?? department]
      : []),
    ...brands,
  ];

  return (
    <>
      <div className="filters" aria-label="Product filters">
        <label>
          Search{" "}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Product, brand or SKU"
          />
        </label>
        {!lockedDepartment && (
          <label>
            Department{" "}
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                emitAnalytics({
                  name: "filter_use",
                  filter: "department",
                  value: e.target.value,
                });
              }}
            >
              <option value="">All departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Sort{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Title A–Z</option>
            <option value="price-asc">Price low–high</option>
            <option value="price-desc">Price high–low</option>
          </select>
        </label>
        {allBrands.length > 1 && (
          <fieldset className="filter-group">
            <legend>Brand</legend>
            <div className="filter-checkboxes">
              {visibleBrands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
            {allBrands.length > BRAND_PREVIEW_COUNT && (
              <button
                type="button"
                className="filter-expander"
                onClick={() => setBrandsExpanded((v) => !v)}
              >
                {brandsExpanded
                  ? "Show fewer brands"
                  : `Show all ${allBrands.length} brands`}
              </button>
            )}
          </fieldset>
        )}
        <button className="button primary" onClick={apply}>
          Apply
        </button>
        <button className="button" onClick={clear}>
          Clear
        </button>
      </div>
      <p className="results-count" role="status">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
      </p>
      {filtered.length ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="empty-state">
          <Image
            src="/brand/pantryform-mark.png"
            alt=""
            width={48}
            height={48}
            className="empty-mark"
          />
          {hasQuery ? (
            <>
              <h2>No results for &ldquo;{query}&rdquo;.</h2>
              <p>Try a department instead:</p>
              <div className="recovery-links">
                {DEPARTMENTS.map((d) => (
                  <Link key={d.id} href={`/shop/${d.slug}`}>
                    {d.label}
                  </Link>
                ))}
              </div>
              <p>
                <Link href="/shop">Or browse everything</Link>
              </p>
            </>
          ) : (
            <>
              <h2>No products match these filters.</h2>
              {activeFilterChips.length > 0 && (
                <ul className="active-filters">
                  {activeFilterChips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              )}
              <button type="button" className="button" onClick={clear}>
                Clear filters
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
