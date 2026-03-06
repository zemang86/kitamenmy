"use client";

import { useMemo } from "react";
import type { RevenueStreamKL } from "@/lib/budget-data/kltower";
import DynamicIcon from "@/components/ui/DynamicIcon";

interface RevenueBreakdownProps {
  streams: RevenueStreamKL[];
  activeFeatures: Set<string>;
  total: number;
}

const UNIT_LABELS: Record<string, string> = {
  pax: "person",
  teams: "team",
  entries: "entry",
  seats: "seat",
  booths: "booth",
};

export default function RevenueBreakdown({
  streams,
  activeFeatures,
  total,
}: RevenueBreakdownProps) {
  const { visibleStreams, conTotal, modTotal, optTotal } = useMemo(() => {
    let con = 0,
      mod = 0,
      opt = 0;
    const visible = streams.map((s) => {
      const isVisible =
        s.featureTied === null || activeFeatures.has(s.featureTied);
      const lowRev = s.lowVol * s.lowPrice;
      const highRev = s.highVol * s.highPrice;
      const midVol = Math.round((s.lowVol + s.highVol) / 2);
      const midPrice = Math.round((s.lowPrice + s.highPrice) / 2);
      const modRev = midVol * midPrice;
      if (isVisible) {
        con += lowRev;
        mod += modRev;
        opt += highRev;
      }
      return { ...s, isVisible, lowRev, highRev, modRev };
    });

    return {
      visibleStreams: visible,
      conTotal: con,
      modTotal: mod,
      optTotal: opt,
    };
  }, [streams, activeFeatures, total]);

  const conCoverage = Math.round((conTotal / total) * 100);
  const modCoverage = Math.round((modTotal / total) * 100);
  const optCoverage = Math.round((optTotal / total) * 100);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Revenue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {visibleStreams.map((s) => (
          <div
            key={s.id}
            className={`bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl p-6 transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.2)] ${
              s.isVisible
                ? "opacity-100 max-h-[600px]"
                : "opacity-0 max-h-0 !p-0 !border-0 overflow-hidden"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl ${s.iconBgClass} flex items-center justify-center mb-4`}
            >
              <DynamicIcon
                name={s.icon}
                size={24}
                className={s.iconColorClass}
              />
            </div>
            <h3 className="text-[1.1rem] font-bold mb-2">{s.label}</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              {s.desc}
            </p>
            {s.note && (
              <p className="text-sm italic text-accent-warm mb-4 px-3 py-2 bg-[rgba(255,159,28,0.08)] border-l-2 border-accent-warm rounded-r-md">
                {s.note}
              </p>
            )}
            <div className="flex gap-6 pt-4 border-t border-glass-border">
              <div>
                <div className="text-base font-extrabold text-accent-primary">
                  {s.lowVol.toLocaleString()} – {s.highVol.toLocaleString()}
                </div>
                <div className="text-[0.7rem] text-text-tertiary mt-0.5">
                  {s.unit}
                </div>
              </div>
              <div>
                <div className="text-base font-extrabold text-accent-primary">
                  RM {s.lowPrice.toLocaleString()} –{" "}
                  {s.highPrice.toLocaleString()}
                </div>
                <div className="text-[0.7rem] text-text-tertiary mt-0.5">
                  per {UNIT_LABELS[s.unit] ?? s.unit}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-[rgba(0,255,136,0.05)] border border-[rgba(0,255,136,0.15)] rounded-xl text-center">
              <div className="text-[0.7rem] text-text-tertiary uppercase tracking-wider mb-0.5">
                Projected Revenue
              </div>
              <div className="text-[1.1rem] font-extrabold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                RM {s.lowRev.toLocaleString()} –{" "}
                {s.highRev.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scenario table */}
      <div className="mb-8">
        <h3 className="text-[1.1rem] font-bold mb-4">Revenue Scenarios</h3>
        <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border bg-[rgba(255,255,255,0.03)]">
                <th className="text-left py-3 px-4 text-[0.7rem] uppercase tracking-wider text-text-tertiary font-semibold">
                  Revenue Stream
                </th>
                <th className="text-right py-3 px-4 text-[0.7rem] uppercase tracking-wider text-text-secondary font-semibold">
                  Conservative
                </th>
                <th className="text-right py-3 px-4 text-[0.7rem] uppercase tracking-wider text-accent-secondary font-semibold">
                  Moderate
                </th>
                <th className="text-right py-3 px-4 text-[0.7rem] uppercase tracking-wider text-accent-primary font-semibold">
                  Optimistic
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleStreams.map((s) => (
                <tr
                  key={s.id}
                  className={`border-b border-glass-border ${
                    s.isVisible ? "" : "opacity-30 line-through"
                  }`}
                >
                  <td className="py-2.5 px-4 text-text-secondary font-medium">
                    {s.label}
                  </td>
                  <td className="py-2.5 px-4 text-right text-text-secondary tabular-nums">
                    RM {s.lowRev.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-4 text-right text-accent-secondary tabular-nums">
                    RM {s.modRev.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-4 text-right text-accent-primary tabular-nums">
                    RM {s.highRev.toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr className="border-t-2 border-glass-border font-extrabold">
                <td className="py-3 px-4">Total Revenue</td>
                <td className="py-3 px-4 text-right text-text-secondary tabular-nums">
                  RM {conTotal.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-accent-secondary tabular-nums">
                  RM {modTotal.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-accent-primary tabular-nums">
                  RM {optTotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget coverage summary */}
      <div className="bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] rounded-2xl p-5 flex justify-between items-center flex-wrap gap-3">
        <div className="text-[0.85rem] text-text-tertiary uppercase tracking-wider font-semibold">
          Revenue vs Budget (excl. sponsorship)
        </div>
        <div className="text-[1.5rem] font-extrabold bg-gradient-to-r from-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
          {conCoverage}% — {modCoverage}% — {optCoverage}%
        </div>
        <div className="w-full text-[0.8rem] text-text-tertiary">
          Conservative / Moderate / Optimistic against RM{" "}
          {total.toLocaleString()} budget. Sponsorship packages detailed in Partnership Tiers above.
        </div>
      </div>
    </div>
  );
}
