"use client";

import type { RevenueStream } from "@/lib/budget-data/ntu";

interface RevenueBreakdownProps {
  streams: RevenueStream[];
  total: number;
  currencyPrefix?: string;
}

export default function RevenueBreakdown({
  streams,
  total,
  currencyPrefix = "$",
}: RevenueBreakdownProps) {
  const maxHighPct = Math.max(...streams.map((s) => s.highPct));

  return (
    <div className="mt-6">
      <div className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold mb-4">
        Potential Revenue Streams
      </div>
      <div className="space-y-2.5">
        {streams.map((stream) => {
          const low = Math.round(total * stream.lowPct);
          const high = Math.round(total * stream.highPct);
          const barPct = (stream.highPct / maxHighPct) * 100;

          return (
            <div
              key={stream.label}
              className="flex items-center gap-3 flex-wrap md:flex-nowrap"
            >
              <div className="w-full md:w-[180px] text-[0.78rem] text-text-secondary font-medium shrink-0">
                {stream.label}
              </div>
              <div className="flex-1 h-3.5 bg-[rgba(255,255,255,0.04)] rounded overflow-hidden relative">
                <div
                  className="h-full rounded bg-gradient-to-r from-accent-secondary to-accent-tertiary opacity-70 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ width: `${barPct}%` }}
                />
              </div>
              <div className="w-full md:w-[140px] text-right md:text-right text-[0.75rem] font-medium text-text-tertiary tabular-nums shrink-0">
                {currencyPrefix}
                {low.toLocaleString()} &mdash; {currencyPrefix}
                {high.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
