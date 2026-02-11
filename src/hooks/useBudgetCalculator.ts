"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CORE_TOTAL,
  MIN_BUDGET,
  MAX_BUDGET,
  OPTIONAL_FEATURES,
  PRESETS,
} from "@/lib/budget-data/kltower";

export interface BudgetState {
  /** Set of active optional-feature IDs. */
  activeFeatures: Set<string>;
  /** Actual computed total (core + active optional). */
  total: number;
  /** The value currently shown on screen (animated). */
  displayedTotal: number;
  /** 0-100 percentage for the range bar. */
  rangePct: number;
  /** Matched preset name or "Custom". */
  tierName: string;
  /** Low end of sponsorship offset (60%). */
  sponsorLow: number;
  /** High end of sponsorship offset (85%). */
  sponsorHigh: number;
}

const INITIAL_FEATURES = new Set(["invitational", "opentourneys", "broadcast"]);

function computeTotal(active: Set<string>): number {
  let opt = 0;
  active.forEach((id) => {
    const feat = OPTIONAL_FEATURES.find((f) => f.id === id);
    if (feat) opt += feat.cost;
  });
  return CORE_TOTAL + opt;
}

function matchPreset(active: Set<string>): string {
  for (const preset of PRESETS) {
    const pSet = new Set(preset.features);
    if (
      pSet.size === active.size &&
      [...pSet].every((f) => active.has(f))
    ) {
      return preset.name;
    }
  }
  return "Custom";
}

export function useBudgetCalculator() {
  const [activeFeatures, setActiveFeatures] = useState<Set<string>>(
    () => new Set(INITIAL_FEATURES)
  );
  const [displayedTotal, setDisplayedTotal] = useState(() =>
    computeTotal(INITIAL_FEATURES)
  );

  const animationRef = useRef<number | null>(null);
  const currentRef = useRef(displayedTotal);

  const total = computeTotal(activeFeatures);
  const rangePct = Math.max(
    0,
    Math.min(100, ((total - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100)
  );
  const tierName = matchPreset(activeFeatures);
  const sponsorLow = Math.round(total * 0.6);
  const sponsorHigh = Math.round(total * 0.85);

  // Animate displayed total toward actual total
  useEffect(() => {
    const start = currentRef.current;
    const diff = total - start;
    if (diff === 0) return;

    const duration = 500;
    const startTime = performance.now();

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      currentRef.current = current;
      setDisplayedTotal(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        animationRef.current = null;
      }
    }

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [total]);

  // Toggle a single feature on/off
  const toggleFeature = useCallback((id: string) => {
    setActiveFeatures((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Apply a named preset
  const applyPreset = useCallback((presetName: string) => {
    const preset = PRESETS.find(
      (p) => p.name.toLowerCase() === presetName.toLowerCase()
    );
    if (!preset) return;
    setActiveFeatures(new Set(preset.features));
  }, []);

  const state: BudgetState = {
    activeFeatures,
    total,
    displayedTotal,
    rangePct,
    tierName,
    sponsorLow,
    sponsorHigh,
  };

  return { state, toggleFeature, applyPreset, OPTIONAL_FEATURES };
}
