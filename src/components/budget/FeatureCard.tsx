"use client";

import DynamicIcon from "@/components/ui/DynamicIcon";
import type { CoreFeatureDisplay, OptionalFeature } from "@/lib/budget-data/kltower";

// ---- Core Feature Card (always included, no toggle) -----------------------

interface CoreFeatureCardProps {
  feature: CoreFeatureDisplay;
}

export function CoreFeatureCard({ feature }: CoreFeatureCardProps) {
  return (
    <div className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-glass-bg-hover hover:border-glass-border-hover hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-primary/15 flex items-center justify-center">
          <DynamicIcon name={feature.icon} size={22} className="text-accent-primary" />
        </div>
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent-primary bg-accent-primary/10 px-2.5 py-1 rounded-md">
          Core
        </span>
      </div>
      <h3 className="text-base font-bold mb-2">{feature.label}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {feature.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-glass-bg border border-glass-border px-2.5 py-1 rounded-md text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-glass-border">
        <span className="text-sm font-bold bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
          RM {feature.cost.toLocaleString()}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-accent-primary bg-accent-primary/10 px-2.5 py-1 rounded-md">
          Always Included
        </span>
      </div>
    </div>
  );
}

// ---- Toggleable Optional Feature Card -------------------------------------

interface OptionalFeatureCardProps {
  feature: OptionalFeature;
  isActive: boolean;
  onToggle: (id: string) => void;
}

export function OptionalFeatureCard({
  feature,
  isActive,
  onToggle,
}: OptionalFeatureCardProps) {
  return (
    <div
      className={`
        scroll-reveal bg-glass-bg backdrop-blur-[10px] border rounded-2xl p-6
        transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${
          isActive
            ? "border-glass-border-hover shadow-[0_0_20px_rgba(0,255,136,0.08)] hover:bg-glass-bg-hover hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]"
            : "border-glass-border opacity-50 hover:opacity-70"
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.iconBgClass}`}
        >
          <DynamicIcon
            name={feature.icon}
            size={22}
            className={feature.iconColorClass}
          />
        </div>
        {/* Toggle switch */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => onToggle(feature.id)}
            className="sr-only peer"
          />
          <div
            className="
              w-11 h-6 rounded-full
              bg-[rgba(255,255,255,0.1)]
              peer-checked:bg-accent-primary/40
              after:content-[''] after:absolute after:top-0.5 after:left-[2px]
              after:bg-text-secondary after:rounded-full after:h-5 after:w-5
              after:transition-all after:duration-300
              peer-checked:after:translate-x-full peer-checked:after:bg-accent-primary
              transition-colors duration-300
            "
          />
        </label>
      </div>
      <h3 className="text-base font-bold mb-2">{feature.label}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {feature.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-glass-bg border border-glass-border px-2.5 py-1 rounded-md text-xs text-text-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="pt-4 border-t border-glass-border">
        <span className="text-sm font-bold bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
          RM {feature.cost.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
