"use client";

import type { BudgetState } from "@/hooks/useBudgetCalculator";
import CostBreakdown from "./CostBreakdown";

interface BudgetSummaryCardProps {
  state: BudgetState;
}

export default function BudgetSummaryCard({ state }: BudgetSummaryCardProps) {
  const {
    displayedTotal,
    rangePct,
    tierName,
    sponsorLow,
    sponsorHigh,
    activeFeatures,
  } = state;

  const fillWidth = Math.max(2, rangePct);

  return (
    <div className="max-w-3xl mx-auto bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl p-8 max-[600px]:p-5">
      {/* Total */}
      <div className="text-center mb-8">
        <div className="text-text-secondary text-sm mb-2">
          Estimated Total Investment
        </div>
        <div className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent leading-tight">
          RM {displayedTotal.toLocaleString()}
        </div>
        <div className="text-accent-primary text-sm font-semibold mt-1">
          {tierName}
        </div>
      </div>

      {/* Range bar */}
      <div className="mb-8">
        <div className="flex justify-between text-text-tertiary text-xs mb-2">
          <span>RM 500,000</span>
          <span>RM 1,000,000</span>
        </div>
        <div className="h-3 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
            style={{ width: `${fillWidth}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_var(--color-accent-primary)] border-2 border-accent-primary" />
          </div>
        </div>
      </div>

      {/* Cost breakdown bars */}
      <CostBreakdown activeFeatures={activeFeatures} />

      {/* Sponsorship offset */}
      <div className="mt-8 pt-6 border-t border-glass-border text-center">
        <div className="text-text-secondary text-sm mb-1">
          Potential Sponsorship Cost Recovery
        </div>
        <div className="text-lg font-bold bg-gradient-to-br from-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
          RM {sponsorLow.toLocaleString()} &mdash; RM{" "}
          {sponsorHigh.toLocaleString()}
        </div>
        <div className="text-text-tertiary text-xs mt-1">
          Estimated 60--85% offset through sponsorship tiers
        </div>
      </div>
    </div>
  );
}
