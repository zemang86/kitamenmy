import type { Metadata } from "next";
import { bebasNeue, spaceGrotesk, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Zakuan Architect | Innovative Architecture & Design Studio",
  description:
    "Zakuan Architect — Malaysian Registered Architect (A/M 305). Innovative design solutions for modern living across residential, commercial, and urban projects.",
};

export default function ZakuanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      {children}
    </div>
  );
}
