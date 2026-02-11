"use client";

import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { type ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCard({ icon, value, suffix = "+", label }: StatCardProps) {
  const { ref, displayValue } = useCounterAnimation(value);

  return (
    <div
      ref={ref}
      className="text-center p-8 bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl transition-all duration-400 hover:-translate-y-0.5 hover:border-glass-border-hover"
    >
      <div className="w-12 h-12 mx-auto mb-4 bg-glass-bg border border-glass-border rounded-xl flex items-center justify-center text-accent-primary">
        {icon}
      </div>
      <div className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold mb-2 bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
        {displayValue}
        {suffix}
      </div>
      <div className="text-text-secondary text-sm">{label}</div>
    </div>
  );
}
