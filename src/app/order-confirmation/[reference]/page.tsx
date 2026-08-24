import type { Metadata } from "next";
import { ConfirmationView } from "@/components/confirmation-view";
export const metadata: Metadata = {
  title: "Demo confirmation",
  robots: { index: false, follow: false },
};
export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  return (
    <div className="page-shell">
      <ConfirmationView reference={reference} />
    </div>
  );
}
