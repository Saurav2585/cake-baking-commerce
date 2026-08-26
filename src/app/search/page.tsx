import type { Metadata } from "next";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ShopExplorer } from "@/components/shop-explorer";

const DEPARTMENT_SHORTCUTS: { slug: string; label: string }[] = [
  { slug: "ingredients", label: "Ingredients" },
  { slug: "chocolate", label: "Chocolate" },
  { slug: "colours-flavours", label: "Colours & Flavours" },
  { slug: "fillings-fondant", label: "Fillings & Fondant" },
  { slug: "decorating", label: "Decorating" },
  { slug: "bakeware-tools", label: "Bakeware & Tools" },
  { slug: "packaging", label: "Packaging" },
];

export const metadata: Metadata = { title: "Search" };
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">
            {q ? "Search results" : "Search the full catalog"}
          </p>
          <h1>{q ? `Results for “${q}”` : "What are you making?"}</h1>
        </div>
        <p>
          Search factual canonical fields. Unsupported suitability claims are
          never used as filters.
        </p>
      </header>
      {q ? (
        <ShopExplorer products={catalog} initialQuery={q} />
      ) : (
        <div className="category-chips" aria-label="Browse a department">
          {DEPARTMENT_SHORTCUTS.map((d) => (
            <Link key={d.slug} href={`/shop/${d.slug}`} className="category-chip">
              {d.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
