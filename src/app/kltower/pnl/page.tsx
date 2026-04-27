import type { Metadata } from "next";
import PnLView from "./PnLView";

export const metadata: Metadata = {
  title: "Gaming in the Sky · KL Tower — P&L",
  description:
    "Year 1 financial P&L for Gaming in the Sky @ KL Tower 2026. Revenue streams, cost categories, sponsorship targets, in-kind offsets, and cash flow timeline across three scenarios.",
};

export default function Page() {
  return <PnLView />;
}
