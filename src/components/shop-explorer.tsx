"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogProduct } from "@/lib/domain/types";
import { ProductGrid } from "./product-grid";
import { emitAnalytics } from "@/lib/domain/analytics";

export function ShopExplorer({
  products,
  initialQuery = "",
  lockedDepartment = "",
}: {
  products: CatalogProduct[];
  initialQuery?: string;
  lockedDepartment?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [department, setDepartment] = useState(lockedDepartment);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!department || p.department_id === department) &&
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
  }, [products, query, department, sort]);
  const apply = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (department) params.set("department", department);
    if (sort !== "featured") params.set("sort", sort);
    router.replace(`${location.pathname}?${params}`);
    emitAnalytics({ name: "search", query, resultCount: filtered.length });
  };
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
              <option value="dept_ingredients">Ingredients</option>
              <option value="dept_chocolate">Chocolate</option>
              <option value="dept_colours_flavours">
                Colours &amp; Flavours
              </option>
              <option value="dept_fillings_fondant">
                Fillings &amp; Fondant
              </option>
              <option value="dept_decorating">Decorating</option>
              <option value="dept_bakeware_tools">Bakeware &amp; Tools</option>
              <option value="dept_packaging">Packaging</option>
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
        <button className="button primary" onClick={apply}>
          Apply
        </button>
        <button
          className="button"
          onClick={() => {
            setQuery("");
            if (!lockedDepartment) setDepartment("");
            setSort("featured");
            router.replace(location.pathname);
          }}
        >
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
          <h2>No exact pantry match</h2>
          <p>Clear the current filters or browse all departments.</p>
        </div>
      )}
    </>
  );
}
