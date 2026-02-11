"use client";

import {
  CORE_COSTS,
  OPTIONAL_FEATURES,
  type CostItem,
} from "@/lib/budget-data/kltower";

interface CostBreakdownProps {
  activeFeatures: Set<string>;
}

export default function CostBreakdown({ activeFeatures }: CostBreakdownProps) {
  const allCosts: CostItem[] = [...CORE_COSTS, ...OPTIONAL_FEATURES];
  const maxCost = Math.max(...allCosts.map((c) => c.cost));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Cost Breakdown</h3>

      {/* Core items */}
      {CORE_COSTS.map((item) => (
        <CostRow key={item.id} item={item} maxCost={maxCost} isActive={true} />
      ))}

      {/* Optional items */}
      {OPTIONAL_FEATURES.map((item) => {
        const isActive = activeFeatures.has(item.id);
        return (
          <CostRow
            key={item.id}
            item={item}
            maxCost={maxCost}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}

function CostRow({
  item,
  maxCost,
  isActive,
}: {
  item: CostItem;
  maxCost: number;
  isActive: boolean;
}) {
  const widthPct = isActive ? (item.cost / maxCost) * 100 : 0;

  return (
    <div
      className={`flex items-center gap-3 mb-2.5 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-30"
      }`}
    >
      <div className="w-[120px] max-[480px]:w-[100px] text-text-secondary text-xs shrink-0 truncate">
        {item.label}
      </div>
      <div className="flex-1 h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: `${widthPct}%`,
            background: item.color,
          }}
        />
      </div>
      <div className="w-[80px] max-[480px]:w-[70px] text-right text-xs font-mono shrink-0">
        {isActive ? `RM ${item.cost.toLocaleString()}` : "\u2014"}
      </div>
    </div>
  );
}
