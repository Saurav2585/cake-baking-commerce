import type { Metadata } from "next";
import { catalog } from "@/lib/domain/catalog";
import { ShopExplorer } from "@/components/shop-explorer";

export const metadata: Metadata = {
  title: "Shop all baking supplies",
  description:
    "Browse the full Pantryform baking ingredients and supplies catalog.",
};
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; department?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="page-shell">
      <header className="page-hero">
        <div>
          <p className="eyebrow">48 parent products · 51 exact SKUs</p>
          <h1>The working pantry.</h1>
        </div>
        <p>
          Search by product, brand, use or SKU. Packs, prices and availability
          are fictional demo fixtures.
        </p>
      </header>
      <ShopExplorer
        products={catalog}
        initialQuery={params.q ?? ""}
        lockedDepartment={params.department ?? ""}
      />
    </div>
  );
}
