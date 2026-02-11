import type { Metadata } from "next";
import {
  Gamepad2,
  Sparkles,
  Calculator,
  Handshake,
  TrendingUp,
  UserCheck,
  Rocket,
  Settings,
  MapPin,
} from "lucide-react";
import MeshGradient from "@/components/effects/MeshGradient";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import ScrollReveal from "@/components/effects/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollingStrip from "@/components/ui/ScrollingStrip";
import DynamicIcon from "@/components/ui/DynamicIcon";
import SponsorshipCards from "@/components/budget/SponsorshipCards";
import BudgetConfigurator from "@/components/budget/BudgetConfigurator";
import KLTowerHeader from "@/components/budget/KLTowerHeader";
import TimelineSection from "@/components/budget/TimelineSection";
import { IMPACT_STATS, MARQUEE_ITEMS } from "@/lib/budget-data/kltower";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Gaming in the Sky @ KL Tower 2026",
  description:
    "Gaming in the Sky -- an international esports & tech festival proposal for KL Tower. Interactive budget configurator, sponsorship tiers, and event details by Special Ops Sdn Bhd.",
  openGraph: {
    title: "Gaming in the Sky @ KL Tower 2026",
    description:
      "International esports, hackathon, tech expo and LAN party at Malaysia's most iconic landmark.",
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center py-32 px-8 max-[600px]:py-24 max-[600px]:px-4 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-1">
        {/* Text */}
        <div className="z-2 max-[600px]:text-center">
          <div className="inline-flex items-center gap-3 bg-glass-bg backdrop-blur-[10px] border border-glass-border px-4 py-2 rounded-full text-sm mb-6 text-accent-primary font-medium">
            <Gamepad2 size={18} />
            International Esports Festival Proposal
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.2rem)] font-extrabold leading-[1.05] mb-2 tracking-tight">
            <span className="bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Gaming in
            </span>
            <br />
            the Sky
          </h1>
          <p className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-text-secondary mb-8 font-medium">
            KL Tower International Esports &amp; Tech Festival
          </p>

          {/* Quick stats */}
          <div className="flex gap-8 mb-10 flex-wrap max-[600px]:justify-center">
            {[
              { value: "5,000+", label: "Attendees" },
              { value: "3", label: "Countries" },
              { value: "2\u20133", label: "Days" },
              { value: "RM 500K\u20131M", label: "Budget Range" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-extrabold bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap max-[600px]:justify-center">
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-accent-primary to-accent-secondary text-bg-primary px-8 py-4 rounded-full no-underline font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(0,255,136,0.3)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(0,255,136,0.5)]"
            >
              <Sparkles size={18} />
              Explore Proposal
            </a>
            <a
              href="#budget"
              className="inline-flex items-center gap-2 bg-glass-bg backdrop-blur-[10px] text-text-primary border border-glass-border px-8 py-4 rounded-full no-underline font-semibold transition-all duration-300 hover:border-accent-primary hover:bg-glass-bg-hover hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]"
            >
              <Calculator size={18} />
              View Budget
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative max-[600px]:hidden">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 blur-[60px] scale-110"
            aria-hidden="true"
          />
          <div className="relative rounded-3xl overflow-hidden border border-glass-border shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/4239538/pexels-photo-4239538.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Menara Kuala Lumpur Tower in Malaysia"
              className="w-full h-auto object-cover"
              loading="eager"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[rgba(0,0,0,0.6)] backdrop-blur-[10px] px-3 py-1.5 rounded-lg text-sm text-text-secondary">
              <MapPin size={14} />
              <span>Menara Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Scrolling marquee strip
// ---------------------------------------------------------------------------

function MarqueeStrip() {
  const items = MARQUEE_ITEMS.map((item) => (
    <span key={item.label} className="flex items-center gap-2 text-text-secondary">
      <DynamicIcon name={item.icon} size={16} className="text-accent-primary" />
      <span>{item.label}</span>
    </span>
  ));
  return <ScrollingStrip items={items} />;
}

// ---------------------------------------------------------------------------
// Sponsorship section
// ---------------------------------------------------------------------------

function SponsorshipSection() {
  return (
    <section
      id="sponsorship"
      className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative"
    >
      <ScrollReveal>
        <SectionHeader
          label="Sponsorship Prospectus"
          labelIcon={<Handshake size={16} />}
          title="Partnership Tiers"
          description="Flexible sponsorship packages designed to deliver maximum ROI for brands entering the gaming and esports space."
        />
      </ScrollReveal>
      <ScrollReveal>
        <SponsorshipCards />
      </ScrollReveal>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Impact section
// ---------------------------------------------------------------------------

function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative"
    >
      <ScrollReveal>
        <SectionHeader
          label="Expected Impact"
          labelIcon={<TrendingUp size={16} />}
          title="Projected Outcomes"
          description="Conservative estimates based on comparable regional esports and tech events."
        />
      </ScrollReveal>
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-[1400px] mx-auto">
          {IMPACT_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="scroll-reveal text-center bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:border-glass-border-hover hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl ${stat.iconBgClass} flex items-center justify-center mx-auto mb-3`}
              >
                <DynamicIcon
                  name={stat.icon}
                  size={22}
                  className={stat.iconColorClass}
                />
              </div>
              <div className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-extrabold mb-1 bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-text-secondary text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team section
// ---------------------------------------------------------------------------

function TeamSection() {
  return (
    <section
      id="team"
      className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative"
    >
      <ScrollReveal>
        <SectionHeader
          label="Team & Partners"
          labelIcon={<UserCheck size={16} />}
          title="Proven Track Record"
        />
      </ScrollReveal>

      <div className="max-w-[1400px] mx-auto">
        {/* Lead profile */}
        <ScrollReveal>
          <div className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-8 max-[600px]:p-5 flex flex-col md:flex-row gap-8 items-center md:items-start mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://framerusercontent.com/images/HtJJ5OHCEucfc6kNrJBGr7vK08.png?scale-down-to=1024"
              alt="Hazman Hassan"
              className="w-32 h-32 rounded-2xl object-cover border border-glass-border shrink-0"
              loading="lazy"
            />
            <div>
              <div className="text-2xl font-extrabold mb-1">Hazman Hassan</div>
              <div className="text-accent-primary font-semibold text-sm mb-4">
                Founder, KITAMEN / Special Ops Sdn Bhd
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Pioneer in Malaysian esports infrastructure. Building KITAMEN as
                the nation&apos;s leading esports event operator, with Special Ops
                Sdn Bhd handling full-scale event production across gaming, tech,
                and creative industries.
              </p>
              <div className="flex gap-8 flex-wrap max-[600px]:justify-center">
                {[
                  { value: "220+", label: "Events Produced" },
                  { value: "500+", label: "Talents Trained" },
                  { value: "RM 2M+", label: "Prize Pools Managed" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-extrabold text-accent-primary">
                      {s.value}
                    </div>
                    <div className="text-text-tertiary text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Partners */}
        <ScrollReveal>
          <div className="text-center text-text-tertiary text-xs uppercase tracking-wider font-semibold mb-6 scroll-reveal">
            International Partners
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4Gamers / WirForce */}
            <div className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 text-center transition-all duration-400 hover:bg-glass-bg-hover hover:border-glass-border-hover hover:-translate-y-0.5">
              <div className="text-xl font-extrabold mb-1">
                4Gamers / WirForce
              </div>
              <div className="text-accent-primary font-semibold text-sm mb-3">
                Taiwan — Gaming Media &amp; BYOC LAN Events
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Asia&apos;s leading gaming media and esports event organizer. Runs
                WirForce — Asia&apos;s largest BYOC LAN party — an 80-hour non-stop
                gaming festival with government backing and major hardware
                sponsors.
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {[
                  "1,200+ BYOC Seats",
                  "150K+ Attendees",
                  "1.5M Viewers",
                  "Est. 2014",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-glass-bg border border-glass-border px-2.5 py-1 rounded-md text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Aura FHE */}
            <div className="scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6 text-center transition-all duration-400 hover:bg-glass-bg-hover hover:border-glass-border-hover hover:-translate-y-0.5">
              <div className="text-xl font-extrabold mb-1">Aura FHE</div>
              <div className="text-accent-primary font-semibold text-sm mb-3">
                Web3 — Encrypted Blockchain (FHE Layer 1)
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                First practical Fully Homomorphic Encryption Layer 1 blockchain.
                Potential Web3 integration partner for on-chain tournament
                infrastructure, encrypted prize pools, and verifiable competitive
                results.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// CTA / Next Steps
// ---------------------------------------------------------------------------

function NextStepsSection() {
  return (
    <section
      id="next-steps"
      className="py-24 px-8 max-[600px]:py-12 max-[600px]:px-4 relative"
    >
      <ScrollReveal>
        <SectionHeader
          label="Next Steps"
          labelIcon={<Rocket size={16} />}
          title="Let's Make History"
        />
      </ScrollReveal>
      <ScrollReveal>
        <div className="scroll-reveal max-w-[700px] mx-auto text-center">
          <p className="text-text-secondary text-lg mb-8">
            Ready to bring &ldquo;Gaming in the Sky&rdquo; to life at KL Tower?
            Let&apos;s discuss your preferred package and customization options.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-glass-bg backdrop-blur-[10px] text-text-primary border border-glass-border px-8 py-4 rounded-full no-underline font-semibold transition-all duration-300 hover:border-accent-primary hover:bg-glass-bg-hover hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]"
            >
              <Settings size={18} />
              Customize Package
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function KLTowerFooter() {
  return (
    <footer className="py-8 px-8 border-t border-glass-border text-center">
      <p className="text-text-tertiary text-sm">
        Gaming in the Sky @ KL Tower 2026 &mdash; A proposal by Special Ops Sdn
        Bhd
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function KLTowerPage() {
  return (
    <div className="font-[family-name:var(--font-inter)] overflow-x-hidden">
      {/* Background effects */}
      <div aria-hidden="true">
        <MeshGradient />
        <NoiseOverlay />
        <FloatingOrbs />
      </div>

      {/* Nav */}
      <KLTowerHeader />

      <main id="main-content">
        {/* Hero */}
        <HeroSection />

        {/* Scrolling marquee */}
        <MarqueeStrip />

        {/* Features + Budget (interactive configurator) */}
        <BudgetConfigurator />

        {/* Sponsorship */}
        <SponsorshipSection />

        {/* Timeline */}
        <TimelineSection />

        {/* Impact */}
        <ImpactSection />

        {/* Team */}
        <TeamSection />

        {/* Next Steps */}
        <NextStepsSection />
      </main>

      {/* Footer */}
      <KLTowerFooter />
    </div>
  );
}
