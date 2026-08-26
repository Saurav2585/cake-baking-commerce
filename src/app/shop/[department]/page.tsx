import { notFound } from "next/navigation";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ShopExplorer } from "@/components/shop-explorer";
import { departments } from "@/lib/shop-departments";

export function generateStaticParams() {
  return Object.keys(departments).map((department) => ({ department }));
}
export default async function DepartmentPage({
  params,
  searchParams,
}: {
  params: Promise<{ department: string }>;
  searchParams: Promise<{ brand?: string }>;
}) {
  const { department } = await params;
  const { brand } = await searchParams;
  const record = departments[department];
  if (!record) notFound();
  const departmentProducts = catalog.filter(
    (p) => p.department_id === record.id,
  );
  const categories = Array.from(
    new Set(departmentProducts.map((p) => p.category_id)),
  )
    .sort()
    .map((id) => ({
      id,
      slug: id.replace("cat_", "").replaceAll("_", "-"),
      label: id.replace("cat_", "").replaceAll("_", " "),
    }));
  return (
    <div className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            → <Link href="/shop">Shop</Link>
          </li>
          <li aria-current="page">→ {record.title}</li>
        </ol>
      </nav>
      <header className="page-hero">
        <div>
          <p className="eyebrow">
            {Object.keys(departments).indexOf(department) + 1} of{" "}
            {Object.keys(departments).length} departments ·{" "}
            {departmentProducts.length} product
            {departmentProducts.length === 1 ? "" : "s"}
          </p>
          <h1>{record.title}</h1>
        </div>
        <p>{record.copy}</p>
      </header>
      {categories.length > 1 && (
        <nav className="category-chips" aria-label="Categories">
          <Link
            href={`/shop/${department}`}
            className="category-chip"
            aria-current="page"
          >
            All {record.title}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop/${department}/${c.slug}`}
              className="category-chip"
            >
              {c.label}
            </Link>
          ))}
        </nav>
      )}
      <ShopExplorer
        products={catalog}
        lockedDepartment={record.id}
        initialBrands={brand ? brand.split(",") : []}
      />
    </div>
  );
}
