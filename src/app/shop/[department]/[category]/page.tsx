import { notFound } from "next/navigation";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ProductGrid } from "@/components/product-grid";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ department: string; category: string }>;
}) {
  const { department, category } = await params;
  const departmentId = `dept_${department.replaceAll("-", "_")}`;
  const categoryId = `cat_${category.replaceAll("-", "_")}`;
  const rows = catalog.filter(
    (p) => p.department_id === departmentId && p.category_id === categoryId,
  );
  if (!rows.length) notFound();
  return (
    <section className="page-shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>·</li>
          <li>
            <Link href={`/shop/${department}`}>{department}</Link>
          </li>
          <li>·</li>
          <li aria-current="page">{category}</li>
        </ol>
      </nav>
      <div className="page-hero">
        <div>
          <p className="eyebrow">Focused shelf</p>
          <h1>{category.replaceAll("-", " ")}</h1>
        </div>
        <p>
          {rows.length} canonical product{rows.length === 1 ? "" : "s"}.
        </p>
      </div>
      <ProductGrid products={rows} />
    </section>
  );
}
