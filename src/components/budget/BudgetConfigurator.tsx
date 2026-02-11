"use client";

import { useBudgetCalculator } from "@/hooks/useBudgetCalculator";
import {
  CORE_FEATURES_DISPLAY,
  OPTIONAL_FEATURES,
} from "@/lib/budget-data/kltower";
import PresetButtons from "./PresetButtons";
import { CoreFeatureCard, OptionalFeatureCard } from "./FeatureCard";
import BudgetSummaryCard from "./BudgetSummaryCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Calculator, Layers } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";

export default function BudgetConfigurator() {
  const { state, toggleFeature, applyPreset } = useBudgetCalculator();

  return (
    <>
      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative">
        <ScrollReveal>
          <SectionHeader
            label="Event Features"
            labelIcon={<Layers size={16} />}
            title="Build Your Custom Package"
            description="Select a preset or toggle individual features to create the perfect event package for KL Tower."
          />
          <p className="text-center text-text-tertiary text-xs -mt-14 mb-16">
            Developed in collaboration with 4Gamers &amp; WirForce — Asia&apos;s
            largest BYOC LAN party (est. 2014, 150K+ attendees, 1.5M streaming
            viewers)
          </p>
        </ScrollReveal>

        <div className="max-w-[1400px] mx-auto">
          {/* Preset buttons */}
          <PresetButtons
            currentTier={state.tierName}
            onPreset={applyPreset}
          />

          {/* Core cards */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {CORE_FEATURES_DISPLAY.map((f, i) => (
                <div
                  key={f.id}
                  className="scroll-reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <CoreFeatureCard feature={f} />
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Optional toggleable cards */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {OPTIONAL_FEATURES.map((f, i) => (
                <div
                  key={f.id}
                  className="scroll-reveal"
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <OptionalFeatureCard
                    feature={f}
                    isActive={state.activeFeatures.has(f.id)}
                    onToggle={toggleFeature}
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== BUDGET CALCULATOR SECTION ==================== */}
      <section id="budget" className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative">
        <ScrollReveal>
          <SectionHeader
            label="Budget Calculator"
            labelIcon={<Calculator size={16} />}
            title="Live Cost Estimate"
            description="Your total updates in real-time as you toggle features above."
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="scroll-reveal">
            <BudgetSummaryCard state={state} />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
