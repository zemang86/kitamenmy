"use client";

import { PRESETS } from "@/lib/budget-data/kltower";

interface PresetButtonsProps {
  currentTier: string;
  onPreset: (name: string) => void;
}

export default function PresetButtons({ currentTier, onPreset }: PresetButtonsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {PRESETS.map((preset) => {
        const isActive =
          currentTier.toLowerCase() === preset.name.toLowerCase();
        return (
          <button
            key={preset.name}
            onClick={() => onPreset(preset.name)}
            className={`
              relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
              border backdrop-blur-[10px] cursor-pointer
              flex flex-col items-center gap-1
              ${
                isActive
                  ? "bg-accent-primary/15 border-accent-primary text-accent-primary shadow-[0_0_20px_rgba(0,255,136,0.2)]"
                  : "bg-glass-bg border-glass-border text-text-secondary hover:border-glass-border-hover hover:bg-glass-bg-hover hover:text-text-primary"
              }
            `}
          >
            <span>{preset.name}</span>
            <span className="text-xs font-normal opacity-70">
              ~RM {preset.total.toLocaleString()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
