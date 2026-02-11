"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Check,
  CloudRain,
  TrendingDown,
  UserMinus,
  ShieldAlert,
} from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import GlassCard from "@/components/ui/GlassCard";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import RevenueBreakdown from "@/components/budget/RevenueBreakdown";
import TierComparisonTable from "@/components/budget/TierComparisonTable";
import {
  CORE_COSTS,
  CORE_TOTAL,
  OPTIONAL_FEATURES,
  PRESETS,
  MIN_BUDGET,
  MAX_BUDGET,
  SPONSORSHIP_LOW_PCT,
  SPONSORSHIP_HIGH_PCT,
  REVENUE_STREAMS,
  TIER_COMPARISON,
  SPONSORSHIP_TIERS,
  IMPACT_METRICS,
  RISK_ITEMS,
  COST_ADVANTAGES,
  MARQUEE_ITEMS,
  estimateAttendees,
} from "@/lib/budget-data/ntu";

// ── Risk icon map ──
const RISK_ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  CloudRain,
  TrendingDown,
  UserMinus,
  ShieldAlert,
};

// ── Sponsor color maps ──
const SPONSOR_TIER_TEXT: Record<string, string> = {
  title: "text-accent-primary",
  gold: "text-[#ffd700]",
  silver: "text-[#c0c0c0]",
  bronze: "text-[#cd7f32]",
};

const SPONSOR_PRICE_STYLE: Record<string, string> = {
  title: "bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent",
  gold: "text-[#ffd700]",
  silver: "text-[#c0c0c0]",
  bronze: "text-[#cd7f32]",
};

// ── Animated Total ──
function useAnimatedTotal(target: number, duration = 500) {
  const [displayed, setDisplayed] = useState(target);
  const currentRef = useRef(target);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const start = currentRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();
    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      currentRef.current = current;
      setDisplayed(current);
      if (progress < 1) {
        animIdRef.current = requestAnimationFrame(step);
      }
    }
    animIdRef.current = requestAnimationFrame(step);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [target, duration]);

  return displayed;
}

// ── Impact Counter ──
function ImpactCounter({
  target,
  suffix,
  prefix,
  label,
  display,
  even,
}: {
  target: number;
  suffix: string;
  prefix: string;
  label: string;
  display: string;
  even: boolean;
}) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            const duration = 1500;

            function step(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const text = hasAnimated
    ? `${prefix}${value.toLocaleString()}${suffix}`
    : display;

  return (
    <div ref={ref}>
      <GlassCard className="p-8 text-center scroll-reveal">
        <div
          className={`text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-1.5 bg-clip-text text-transparent ${
            even
              ? "bg-gradient-to-r from-accent-secondary to-accent-tertiary"
              : "bg-gradient-to-r from-accent-primary to-accent-secondary"
          }`}
        >
          {text}
        </div>
        <div className="text-[0.8rem] text-text-secondary font-medium">
          {label}
        </div>
      </GlassCard>
    </div>
  );
}

// ── Scrolling Marquee ──
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-glass-bg backdrop-blur-[20px] border-y border-glass-border py-3.5 relative z-[1]">
      <div className="flex w-max animate-marquee-scroll">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-text-secondary whitespace-nowrap px-6">
              {item}
            </span>
            <span className="w-[5px] h-[5px] rounded-full bg-accent-primary shrink-0 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ──
export default function NtuConfigurator() {
  // Budget state
  const [activeFeatureIds, setActiveFeatureIds] = useState<Set<string>>(
    () => new Set(PRESETS[0].features)
  );

  // Derived calculations
  const optionalTotal = useMemo(() => {
    let sum = 0;
    for (const feat of OPTIONAL_FEATURES) {
      if (activeFeatureIds.has(feat.id)) sum += feat.cost;
    }
    return sum;
  }, [activeFeatureIds]);

  const total = CORE_TOTAL + optionalTotal;
  const displayedTotal = useAnimatedTotal(total);

  const attendees = estimateAttendees(total);
  const perHead = Math.round(total / attendees);

  const rangePct = Math.max(
    2,
    Math.min(
      100,
      ((total - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100
    )
  );

  // Tier detection
  const activeTier = useMemo(() => {
    for (const preset of PRESETS) {
      const presetSet = new Set(preset.features);
      if (
        presetSet.size === activeFeatureIds.size &&
        [...presetSet].every((f) => activeFeatureIds.has(f))
      ) {
        return preset.id;
      }
    }
    return null;
  }, [activeFeatureIds]);

  const tierLabel = useMemo(() => {
    if (activeTier === "launch") return "5K \u2014 The Launch";
    if (activeTier === "standard") return "7.5K \u2014 Standard";
    if (activeTier === "fullscale") return "10K \u2014 Full Scale";
    return "Custom";
  }, [activeTier]);

  // Sponsorship offset
  const sponsorLow = Math.round(total * SPONSORSHIP_LOW_PCT);
  const sponsorHigh = Math.round(total * SPONSORSHIP_HIGH_PCT);

  // Max cost for bar widths
  const maxCost = useMemo(() => {
    return Math.max(
      ...CORE_COSTS.map((c) => c.cost),
      ...OPTIONAL_FEATURES.map((f) => f.cost)
    );
  }, []);

  // Toggle a feature
  const toggleFeature = useCallback((featureId: string) => {
    setActiveFeatureIds((prev) => {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  }, []);

  // Apply preset
  const applyPreset = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setActiveFeatureIds(new Set(preset.features));
    }
  }, []);

  // ── Scroll reveal ──
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const children = el.querySelectorAll(".scroll-reveal");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollContainerRef} className="font-[family-name:var(--font-inter)]">
      <div aria-hidden="true">
        <FloatingOrbs />
      </div>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 bg-[rgba(5,5,8,0.8)] backdrop-blur-[20px] border-b border-glass-border">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-base text-text-primary no-underline"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-[10px] flex items-center justify-center">
              <Gamepad2 size={20} className="text-bg-primary" />
            </div>
            NTU x WirForce 2026
          </Link>
          <span className="text-[0.7rem] font-semibold py-1 px-2.5 rounded-[20px] bg-[rgba(0,255,136,0.1)] text-accent-primary border border-[rgba(0,255,136,0.2)] tracking-[0.05em] uppercase">
            Budget Configurator
          </span>
        </div>
      </nav>

      <main id="main-content">
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 text-center relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <span className="inline-block text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-accent-primary py-1.5 px-4 border border-[rgba(0,255,136,0.2)] rounded-full mb-6 bg-[rgba(0,255,136,0.05)]">
            Interactive Budget Tool
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Build Your Festival Budget
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-text-secondary max-w-[600px] mx-auto mb-12">
            Toggle features and presets to configure the NTU x WirForce 2026
            campus gaming festival and see real-time budget impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[700px] mx-auto">
            {[
              { value: "5K\u201310K", label: "Attendees" },
              { value: "$600K\u2013$1.5M", label: "Budget Range (SGD)" },
              { value: "~$120", label: "Per Attendee" },
            ].map((stat) => (
              <GlassCard
                key={stat.label}
                className="p-6 text-center scroll-reveal"
                hover={false}
              >
                <div className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ── Configurator ── */}
      <section className="py-16 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] rounded-full mb-4 bg-[rgba(0,212,255,0.05)]">
              Configure
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
              Festival Budget Configurator
            </h2>
            <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
              Select a preset or toggle individual features to build your custom
              festival scope.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {PRESETS.map((preset) => {
              const isActive = activeTier === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`py-4 px-7 rounded-2xl border font-semibold text-[0.9rem] flex flex-col items-center gap-1.5 min-w-[160px] backdrop-blur-[10px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:-translate-y-0.5 ${
                    isActive
                      ? "border-[rgba(0,255,136,0.4)] bg-[rgba(0,255,136,0.08)] shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                      : "border-glass-border bg-glass-bg hover:border-glass-border-hover hover:bg-glass-bg-hover"
                  }`}
                >
                  <span className="text-text-primary">{preset.label}</span>
                  <span className="text-[0.7rem] text-text-tertiary font-medium">
                    {preset.subtitle}
                  </span>
                  <span className="text-[0.75rem] text-accent-primary font-medium">
                    {preset.price}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Core Costs Banner */}
          <GlassCard
            className="p-6 md:px-8 mb-8 scroll-reveal"
            hover={false}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[0.85rem] font-semibold text-text-secondary uppercase tracking-[0.08em]">
                Core Costs &mdash; Always Included
              </h3>
              <span className="text-[0.85rem] font-bold text-accent-primary">
                $260,000
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CORE_COSTS.map((core) => (
                <div
                  key={core.id}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.1)]"
                >
                  <DynamicIcon
                    name={core.icon}
                    size={18}
                    className="text-accent-primary shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.8rem] font-medium text-text-primary">
                      {core.label}
                    </div>
                    <div className="text-[0.75rem] text-accent-primary font-semibold">
                      ${core.cost.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {OPTIONAL_FEATURES.map((feat) => {
              const isActive = activeFeatureIds.has(feat.id);
              return (
                <div
                  key={feat.id}
                  className={`relative overflow-hidden p-6 rounded-[20px] backdrop-blur-[20px] border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-accent-primary before:to-accent-secondary before:origin-left before:transition-transform before:duration-400 ${
                    isActive
                      ? "border-glass-border-hover bg-glass-bg-hover shadow-[0_0_20px_rgba(0,255,136,0.08)] before:scale-x-100"
                      : "border-glass-border bg-glass-bg opacity-65 hover:opacity-85 before:scale-x-0 hover:before:scale-x-100"
                  }`}
                >
                  {/* Header: icon + toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                      style={{ background: feat.iconBg }}
                    >
                      <DynamicIcon
                        name={feat.icon}
                        size={22}
                        className={feat.iconColor}
                      />
                    </div>
                    {/* Toggle Switch */}
                    <label className="relative inline-block w-12 h-[26px] shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleFeature(feat.id)}
                        className="opacity-0 w-0 h-0 peer"
                        aria-label={`Toggle ${feat.label}`}
                      />
                      <span className="absolute inset-0 bg-[rgba(255,255,255,0.1)] border border-glass-border rounded-[26px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:bg-[rgba(0,255,136,0.3)] peer-checked:border-[rgba(0,255,136,0.5)] peer-checked:shadow-[0_0_10px_var(--color-accent-primary)] before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:left-[3px] before:bottom-[3px] before:bg-text-secondary before:rounded-full before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:before:translate-x-[22px] peer-checked:before:bg-accent-primary peer-checked:before:shadow-[0_0_10px_var(--color-accent-primary)]" />
                    </label>
                  </div>

                  <h3 className="text-[0.9rem] font-bold mb-2 leading-[1.3]">
                    {feat.label}
                  </h3>
                  <p className="text-[0.75rem] text-text-secondary leading-[1.5] mb-3">
                    {feat.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {feat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] py-0.5 px-2 rounded-[6px] bg-[rgba(255,255,255,0.05)] text-text-tertiary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer: cost */}
                  <div className="flex items-center justify-between">
                    <span className="text-[0.85rem] font-bold text-accent-primary">
                      ${feat.cost.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Budget Summary Card ── */}
          <GlassCard
            className="p-6 md:p-10 mb-16 scroll-reveal"
            hover={false}
          >
            {/* Total */}
            <div className="text-center mb-8">
              <div className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold mb-2">
                Estimated Total Investment
              </div>
              <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2">
                ${displayedTotal.toLocaleString()}
              </div>
              <div className="flex justify-center gap-3 md:gap-8 flex-wrap">
                <span className="text-[0.85rem] font-semibold py-1 px-4 rounded-full bg-[rgba(0,255,136,0.1)] text-accent-primary border border-[rgba(0,255,136,0.2)]">
                  {tierLabel}
                </span>
                <span className="text-[0.85rem] font-semibold py-1 px-4 rounded-full bg-[rgba(0,212,255,0.1)] text-accent-secondary border border-[rgba(0,212,255,0.2)]">
                  ~{attendees.toLocaleString()} attendees
                </span>
                <span className="text-[0.85rem] font-semibold py-1 px-4 rounded-full bg-[rgba(168,85,247,0.1)] text-accent-tertiary border border-[rgba(168,85,247,0.2)]">
                  ~${perHead} / head
                </span>
              </div>
            </div>

            {/* Range Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-[0.75rem] text-text-tertiary font-medium">
                <span>$600,000</span>
                <span>$1,600,000</span>
              </div>
              <div className="h-2.5 bg-[rgba(255,255,255,0.06)] rounded-[10px] relative overflow-visible">
                <div
                  className="h-full rounded-[10px] bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
                  style={{ width: `${rangePct}%`, minWidth: "10px" }}
                >
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent-primary rounded-full shadow-[0_0_15px_var(--color-accent-primary),0_0_30px_rgba(0,255,136,0.3)] transition-all duration-600" />
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="mb-8">
              <div className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold mb-4">
                Cost Breakdown
              </div>

              {/* Core costs */}
              {CORE_COSTS.map((core) => {
                const pct = (core.cost / maxCost) * 100;
                return (
                  <div key={core.id}>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-[180px] text-[0.8rem] text-text-secondary font-medium shrink-0">
                        {core.label}
                      </div>
                      <div className="flex-1 h-[22px] bg-[rgba(255,255,255,0.04)] rounded-[6px] overflow-hidden">
                        <div
                          className="h-full rounded-[6px] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{
                            width: `${pct}%`,
                            background: core.color,
                          }}
                        />
                      </div>
                      <div className="w-[90px] text-right text-[0.8rem] font-semibold text-text-secondary tabular-nums shrink-0">
                        ${core.cost.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 pb-2 pl-0 md:pl-[196px] ml-4">
                      {core.items.map((item) => (
                        <span
                          key={item}
                          className="text-[0.68rem] text-text-tertiary relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-glass-border-hover"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Optional features */}
              {OPTIONAL_FEATURES.map((feat) => {
                const isActive = activeFeatureIds.has(feat.id);
                const pct = isActive ? (feat.cost / maxCost) * 100 : 0;
                return (
                  <div key={feat.id}>
                    <div
                      className={`flex items-center gap-4 mb-2 transition-opacity duration-300 ${isActive ? "" : "opacity-25"}`}
                    >
                      <div className="w-[180px] text-[0.8rem] text-text-secondary font-medium shrink-0">
                        {feat.label}
                      </div>
                      <div className="flex-1 h-[22px] bg-[rgba(255,255,255,0.04)] rounded-[6px] overflow-hidden">
                        <div
                          className="h-full rounded-[6px] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                          style={{
                            width: `${pct}%`,
                            background: feat.color,
                          }}
                        />
                      </div>
                      <div className="w-[90px] text-right text-[0.8rem] font-semibold text-text-secondary tabular-nums shrink-0">
                        {isActive
                          ? `$${feat.cost.toLocaleString()}`
                          : "\u2014"}
                      </div>
                    </div>
                    {isActive && (
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 pb-2 pl-0 md:pl-[196px] ml-4">
                        {feat.items.map((item) => (
                          <span
                            key={item}
                            className="text-[0.68rem] text-text-tertiary relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-glass-border-hover"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tier Comparison Table */}
            <TierComparisonTable
              rows={TIER_COMPARISON}
              activeTier={activeTier}
            />

            {/* Divider */}
            <div className="h-px bg-glass-border my-6" />

            {/* Revenue Breakdown */}
            <RevenueBreakdown
              streams={REVENUE_STREAMS}
              total={total}
              currencyPrefix="$"
            />

            {/* Divider */}
            <div className="h-px bg-glass-border my-4" />

            {/* Sponsorship Offset */}
            <div className="text-center">
              <div className="text-[0.8rem] text-text-tertiary uppercase tracking-[0.08em] font-semibold mb-2">
                Total Sponsorship &amp; Revenue Offset
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-accent-secondary to-accent-tertiary bg-clip-text text-transparent mb-1.5">
                ${sponsorLow.toLocaleString()} &mdash; $
                {sponsorHigh.toLocaleString()}
              </div>
              <div className="text-[0.75rem] text-text-tertiary">
                Estimated 55&ndash;80% recovery through sponsorship, tickets,
                exhibitors &amp; F&amp;B
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-6 pt-4 border-t border-glass-border text-center">
              <p className="text-[0.7rem] text-text-tertiary leading-[1.6] italic">
                * All figures are estimates in SGD and subject to change. Actual
                deployment costs may vary based on vendor quotations, scope
                adjustments, and on-ground requirements. Final budgets to be
                confirmed upon detailed planning and procurement.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── Impact Metrics ── */}
      <section className="py-16 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] rounded-full mb-4 bg-[rgba(0,212,255,0.05)]">
              Projected Impact
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
              Festival at a Glance
            </h2>
            <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
              Key metrics that demonstrate the scale and reach of NTU x WirForce
              2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_METRICS.map((metric, idx) => (
              <ImpactCounter
                key={metric.label}
                target={metric.target}
                suffix={metric.suffix}
                prefix={metric.prefix}
                label={metric.label}
                display={metric.display}
                even={idx % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NTU Cost Advantages ── */}
      <section className="py-16 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] rounded-full mb-4 bg-[rgba(0,212,255,0.05)]">
              Why It Works
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
              NTU Cost Advantages
            </h2>
            <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
              Campus partnership fundamentally changes the cost equation for a
              festival of this scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COST_ADVANTAGES.map((adv) => (
              <GlassCard
                key={adv.title}
                className="p-8 flex gap-5 items-start scroll-reveal"
                hover={false}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: adv.iconBg }}
                >
                  <DynamicIcon
                    name={adv.icon}
                    size={24}
                    className={adv.iconColor}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-1.5">{adv.title}</h3>
                  <p className="text-[0.85rem] text-text-secondary leading-[1.5]">
                    {adv.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sponsorship Packages ── */}
      <section className="py-16 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] rounded-full mb-4 bg-[rgba(0,212,255,0.05)]">
              Partner With Us
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
              Sponsorship Packages
            </h2>
            <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
              Tiered sponsorship opportunities to maximise brand visibility and
              engagement with Southeast Asia&apos;s gaming community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPONSORSHIP_TIERS.map((sponsor) => (
              <GlassCard
                key={sponsor.id}
                className="p-7 relative overflow-hidden scroll-reveal"
                hover={false}
              >
                {/* Top color bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] ${
                    sponsor.colorClass === "title"
                      ? "bg-gradient-to-r from-accent-primary to-accent-secondary"
                      : sponsor.colorClass === "gold"
                        ? "bg-[#ffd700]"
                        : sponsor.colorClass === "silver"
                          ? "bg-[#c0c0c0]"
                          : "bg-[#cd7f32]"
                  }`}
                />

                <div
                  className={`text-[0.7rem] font-semibold uppercase tracking-[0.1em] mb-1.5 ${SPONSOR_TIER_TEXT[sponsor.colorClass]}`}
                >
                  {sponsor.tier}
                </div>
                <h3 className="text-[1.1rem] font-bold mb-1">{sponsor.name}</h3>
                <div
                  className={`text-[0.85rem] font-semibold mb-1 ${SPONSOR_PRICE_STYLE[sponsor.colorClass]}`}
                >
                  {sponsor.priceRange}
                </div>
                <div className="text-[0.7rem] text-text-tertiary mb-4">
                  {sponsor.slots}
                </div>
                <ul className="list-none p-0">
                  {sponsor.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="text-[0.78rem] text-text-secondary py-1 pl-5 relative leading-[1.4]"
                    >
                      <Check
                        size={14}
                        className="absolute left-0 top-[0.35rem] text-accent-primary"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Risk Mitigation ── */}
      <section className="py-16 relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] rounded-full mb-4 bg-[rgba(0,212,255,0.05)]">
              Risk Management
            </span>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3">
              Contingency Planning
            </h2>
            <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
              Every major risk has been anticipated with built-in mitigation
              strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RISK_ITEMS.map((risk) => {
              const IconComp = RISK_ICON_MAP[risk.icon];
              return (
                <GlassCard
                  key={risk.title}
                  className="p-7 flex gap-5 items-start scroll-reveal"
                  hover={false}
                >
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 bg-[rgba(255,107,107,0.1)]">
                    {IconComp && (
                      <IconComp size={22} className="text-accent-warm" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-[0.95rem] font-bold mb-1.5 text-text-primary">
                      {risk.title}
                    </h3>
                    <p className="text-[0.85rem] text-text-secondary leading-[1.5]">
                      {risk.description}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <p className="text-center mt-6 text-[0.75rem] text-text-tertiary italic">
            Budget includes ~5% contingency buffer within Operations &amp;
            Security.
          </p>
        </div>
      </section>

      </main>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-glass-border text-center relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-[0.8rem] text-text-tertiary">
            NTU x WirForce 2026 &mdash; Budget Configurator &middot;{" "}
            <Link href="/" className="text-accent-primary no-underline">
              zemang.my
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
