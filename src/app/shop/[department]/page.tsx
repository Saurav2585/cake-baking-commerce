import { notFound } from "next/navigation";
import Link from "next/link";
import { catalog } from "@/lib/domain/catalog";
import { ShopExplorer } from "@/components/shop-explorer";

const departments: Record<string, { id: string; title: string; copy: string }> =
  {
    ingredients: {
      id: "dept_ingredients",
      title: "Ingredients",
      copy: "Flours, sugars, leaveners and add-ins for measured methods.",
    },
    chocolate: {
      id: "dept_chocolate",
      title: "Chocolate",
      copy: "Cocoa, compounds and inclusions in exact baking packs.",
    },
    "colours-flavours": {
      id: "dept_colours_flavours",
      title: "Colours & Flavours",
      copy: "Gel, powder, essence and emulsion formats kept distinct.",
    },
    "fillings-fondant": {
      id: "dept_fillings_fondant",
      title: "Fillings & Fondant",
      copy: "Layering, glazing, covering and modelling formats.",
    },
    decorating: {
      id: "dept_decorating",
      title: "Decorating",
      copy: "Piping, sprinkles and finishing details.",
    },
    "bakeware-tools": {
      id: "dept_bakeware_tools",
      title: "Bakeware & Tools",
      copy: "Pans and preparation tools with dimensions kept visible.",
    },
    packaging: {
      id: "dept_packaging",
      title: "Packaging",
      copy: "Boxes and boards defined by exact dimensions and counts.",
    },
  };
export function generateStaticParams() {
  return Object.keys(departments).map((department) => ({ department }));
}
export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>;
}) {
  const { department } = await params;
  const record = departments[department];
  if (!record) notFound();
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
            Department atlas ·{" "}
            {String(Object.keys(departments).indexOf(department) + 1).padStart(
              2,
              "0",
            )}
          </p>
          <h1>{record.title}</h1>
        </div>
        <p>{record.copy}</p>
      </header>
      <ShopExplorer products={catalog} lockedDepartment={record.id} />
    </div>
  );
}
