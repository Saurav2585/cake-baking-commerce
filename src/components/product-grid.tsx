import type { CatalogProduct } from "@/lib/domain/types";
import { departments } from "@/lib/shop-departments";
import { ProductCard } from "./product-card";

/** id -> display title, derived from the same department registry the
 * shop/department pages already use — not a second source of truth. */
const DEPARTMENT_TITLE_BY_ID: Record<string, string> = Object.fromEntries(
  Object.values(departments).map((d) => [d.id, d.title]),
);

const FIRST_BREAK_AT = 8;
const BREAK_INTERVAL = 16;

/** One line of context for a merchandising break: the department name when
 * every product in the chunk just shown belongs to the same one, otherwise
 * a plain running count — never a fabricated label for a mixed chunk. */
function breakLabel(
  chunk: CatalogProduct[],
  shownSoFar: number,
  total: number,
) {
  const departmentIds = new Set(chunk.map((p) => p.department_id));
  const count = `${shownSoFar} of ${total} products`;
  if (departmentIds.size !== 1) return count;
  const [onlyId] = departmentIds;
  const title = DEPARTMENT_TITLE_BY_ID[onlyId];
  return title ? `${title} · ${count}` : count;
}

/**
 * Route_UI_Specification-adjacent PLP scanability fix (Remediation_Specification.md
 * "PLP/Category/Search"): a flat 48-item grid reads as a spreadsheet. Insert one
 * full-width divider row after the first 8 items, then every 16 items after
 * that, carrying department + running-count context. Pure markup/CSS — does
 * not touch `.product-card`, its count, or any commerce state.
 */
export function ProductGrid({ products }: { products: CatalogProduct[] }) {
  const total = products.length;
  const nodes: React.ReactNode[] = [];
  let chunkStart = 0;
  let nextBreak = FIRST_BREAK_AT;
  let breakCount = 0;

  products.forEach((product, index) => {
    nodes.push(<ProductCard key={product.id} product={product} />);
    const shown = index + 1;
    if (shown === nextBreak && shown < total) {
      const chunk = products.slice(chunkStart, shown);
      nodes.push(
        <div
          key={`grid-merch-break-${breakCount}`}
          className="grid-merch-break"
          role="presentation"
        >
          <span>{breakLabel(chunk, shown, total)}</span>
        </div>,
      );
      chunkStart = shown;
      nextBreak = shown + BREAK_INTERVAL;
      breakCount += 1;
    }
  });

  return <div className="product-grid">{nodes}</div>;
}
