import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = { title: "Demo terms" };
export default function Page() {
  return (
    <InformationPage eyebrow="Not a retail offer" title="Demo terms">
      <p>
        All products, brands, INR prices, availability states and references are
        fictional demonstration content. Completing checkout creates no payment,
        purchase, contract, delivery or fulfilment obligation.
      </p>
    </InformationPage>
  );
}
