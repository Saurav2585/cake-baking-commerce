import type { Metadata } from "next";
import { InformationPage } from "@/components/information-page";
export const metadata: Metadata = { title: "Frequently asked questions" };
export default function Page() {
  return (
    <InformationPage
      eyebrow="Clear by design"
      title="Frequently asked questions"
    >
      <h2>Can I place a real order?</h2>
      <p>No. Cart, checkout and confirmation are local simulations.</p>
      <h2>Are product claims verified?</h2>
      <p>
        No claims are inferred. Unknown critical facts are shown as “Information
        not provided”.
      </p>
      <h2>Is payment information collected?</h2>
      <p>
        No card, UPI, address, phone or personal contact data is requested or
        stored.
      </p>
    </InformationPage>
  );
}
