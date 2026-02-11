"use client";

import { useCounterAnimation } from "@/hooks/useCounterAnimation";

function StatBox({
  value,
  suffix,
  prefix,
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const { ref, displayValue } = useCounterAnimation(value);

  return (
    <div
      ref={ref}
      className="bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-8 transition-all duration-400 hover:-translate-y-0.5 hover:border-glass-border-hover hover:shadow-[0_15px_30px_rgba(0,0,0,0.3),0_0_20px_rgba(0,255,136,0.05)] text-center"
    >
      <div className="text-[2.5rem] font-bold text-accent-primary mb-2">
        {prefix}
        {displayValue}
        {suffix}
      </div>
      <div className="text-text-secondary text-sm">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 px-8 border-y border-glass-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 text-center max-md:grid-cols-2 max-[480px]:grid-cols-1">
          <StatBox value={220} suffix="+" label="Esports Events Delivered" />
          <StatBox
            value={500}
            suffix="+"
            label="Professionals Trained in AI"
          />
          <StatBox value={2} prefix="RM " suffix="M+" label="Prize Pools Managed" />
          <StatBox value={13} label="Ventures Launched" />
        </div>
      </div>
    </section>
  );
}
