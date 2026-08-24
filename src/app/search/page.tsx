import type { Metadata } from "next";
import { catalog } from "@/lib/domain/catalog";
import { ShopExplorer } from "@/components/shop-explorer";
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
          <p className="eyebrow">Search the measured pantry</p>
          <h1>{q ? `Results for “${q}”` : "What are you making?"}</h1>
        </div>
        <p>
          Search factual canonical fields. Unsupported suitability claims are
          never used as filters.
        </p>
      </header>
      <ShopExplorer products={catalog} initialQuery={q} />
    </div>
  );
}
