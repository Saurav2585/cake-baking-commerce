import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = { title: "Shipping and returns" };
export default function Page() {
  return (
    <InformationPage eyebrow="Simulation notice" title="Shipping and returns">
      <p>
        Pantryform is not an operating retailer. There is no real shipping,
        delivery, return or refund service. Any availability or checkout state
        exists only to demonstrate interface behavior.
      </p>
    </InformationPage>
  );
}
