import type { Metadata } from "next";
import BayuProposal from "./BayuProposal";

export const metadata: Metadata = {
  title: "Bayu — Sabah Smart Tourism AI Platform",
  description:
    "Bayu is an AI-powered smart tourism platform for Sabah with digital wallet stimulus and real-time government dashboard.",
};

export default function BayuProposalPage() {
  return <BayuProposal />;
}
