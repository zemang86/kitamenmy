import type { Metadata } from "next";
import NtuConfigurator from "./NtuConfigurator";

export const metadata: Metadata = {
  title: "NTU x WirForce 2026 \u2014 Budget Configurator",
  description:
    "Interactive budget configurator for NTU x WirForce 2026 campus gaming festival.",
};

export default function NtuPage() {
  return <NtuConfigurator />;
}
