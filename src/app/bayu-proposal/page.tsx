import type { Metadata } from "next";
import BayuProposal from "./BayuProposal";

export const metadata: Metadata = {
  title: "Bayu — Sabah Smart Tourism AI | State Funding Proposal",
  description:
    "RM 3M state funding proposal for Bayu, an AI-powered smart tourism platform for Sabah with digital wallet stimulus and government dashboard.",
};

export default function BayuProposalPage() {
  return <BayuProposal />;
}
