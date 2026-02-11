"use client";

import type { TierComparisonRow } from "@/lib/budget-data/ntu";

interface TierComparisonTableProps {
  rows: TierComparisonRow[];
  activeTier: string | null;
}

const TIER_KEYS = ["launch", "standard", "fullscale"] as const;

const TIER_HEADERS: Record<(typeof TIER_KEYS)[number], string> = {
  launch: "5K \u2014 Launch",
  standard: "7.5K \u2014 Standard",
  fullscale: "10K \u2014 Full Scale",
};

function cellClass(tier: string, activeTier: string | null): string {
  if (tier === activeTier) {
    return "bg-[rgba(0,255,136,0.06)] text-accent-primary font-semibold";
  }
  return "text-text-tertiary";
}

function headerCellClass(tier: string, activeTier: string | null): string {
  if (tier === activeTier) {
    return "bg-[rgba(0,255,136,0.1)] text-accent-primary shadow-[inset_0_2px_0_var(--color-accent-primary)]";
  }
  return "bg-[rgba(255,255,255,0.02)] text-text-tertiary";
}

export default function TierComparisonTable({
  rows,
  activeTier,
}: TierComparisonTableProps) {
  return (
    <div className="mt-8">
      <div className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold mb-4">
        Tier Comparison
      </div>
      <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
        <table className="w-full border-collapse text-[0.78rem]">
          <thead>
            <tr>
              <th className="py-2.5 px-3.5 text-left border-b border-glass-border font-semibold text-text-tertiary uppercase tracking-[0.05em] text-[0.7rem] bg-[rgba(255,255,255,0.02)] rounded-tl-[10px]">
                Aspect
              </th>
              {TIER_KEYS.map((tier, idx) => (
                <th
                  key={tier}
                  className={`py-2.5 px-3.5 text-left border-b border-glass-border font-semibold uppercase tracking-[0.05em] text-[0.7rem] transition-colors duration-300 ${headerCellClass(tier, activeTier)} ${idx === TIER_KEYS.length - 1 ? "rounded-tr-[10px]" : ""}`}
                >
                  {TIER_HEADERS[tier]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.aspect}>
                <td className="py-2.5 px-3.5 border-b border-glass-border text-text-secondary font-medium">
                  {row.aspect}
                </td>
                {TIER_KEYS.map((tier) => (
                  <td
                    key={tier}
                    className={`py-2.5 px-3.5 border-b border-glass-border transition-colors duration-300 ${cellClass(tier, activeTier)}`}
                  >
                    {row[tier]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
