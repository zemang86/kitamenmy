import type { Metadata } from "next";
import RevMediaConfigurator from "./RevMediaConfigurator";

export const metadata: Metadata = {
  title: "World Cup 2026 \u2014 Livestream Production Proposal",
  description:
    "KITAMEN \u00d7 matchops.my livestream production package for Rev Media World Cup 2026. Pre-production & technical coordination with live data integration.",
  openGraph: {
    title: "World Cup 2026 \u2014 Livestream Production Proposal",
    description:
      "KITAMEN \u00d7 matchops.my livestream production package for Rev Media World Cup 2026. Pre-production & technical coordination with live data integration.",
  },
};

export default function RevMediaPage() {
  return <RevMediaConfigurator />;
}
