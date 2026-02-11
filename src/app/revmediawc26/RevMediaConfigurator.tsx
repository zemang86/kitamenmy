"use client";

import { useState, useCallback, useRef, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import {
  CORE_COSTS,
  CORE_TOTAL,
  DAYS,
  OPTIONAL_FEATURES,
  PRESETS,
  MIN_BUDGET,
  MAX_BUDGET,
  TIER_COMPARISON,
  IMPACT_METRICS,
  CREW_MEMBERS,
  EQUIPMENT_LIST,
  SHOW_SEGMENTS,
  PORTFOLIO_ITEMS,
  MARQUEE_ITEMS,
  generateQuotationItems,
} from "@/lib/budget-data/revmedia";

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
            const dur = 1500;

            function step(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / dur, 1);
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
      <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-none p-8 text-center scroll-reveal">
        <div
          className={`text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-1.5 font-[family-name:var(--font-ibm-plex-mono)] bg-clip-text text-transparent ${
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
      </div>
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
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-secondary whitespace-nowrap px-6 font-[family-name:var(--font-ibm-plex-mono)]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-accent-primary shrink-0 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Nav Links ──

const NAV_LINKS = [
  { label: "Scope", id: "format" },
  { label: "matchops.my", id: "matchop" },
  { label: "Budget", id: "budget" },
  { label: "Equipment", id: "equipment" },
  { label: "Team", id: "team" },
  { label: "Portfolio", id: "portfolio" },
];

// ── Tier Table Keys ──

const TIER_KEYS = ["essential", "standard", "premium"] as const;
const TIER_HEADERS: Record<(typeof TIER_KEYS)[number], string> = {
  essential: "Essential",
  standard: "Standard",
  premium: "Premium",
};

// ── Main Component ──

export default function RevMediaConfigurator() {
  // Budget state
  const [activeFeatureIds, setActiveFeatureIds] = useState<Set<string>>(
    () => new Set(PRESETS[0].features)
  );

  // Header state
  const [scrolled, setScrolled] = useState(false);

  // Derived calculations
  const optionalTotal = useMemo(() => {
    let sum = 0;
    for (const feat of OPTIONAL_FEATURES) {
      if (activeFeatureIds.has(feat.id)) sum += feat.cost;
    }
    return sum;
  }, [activeFeatureIds]);

  const total = CORE_TOTAL + optionalTotal;
  const perDay = Math.round(total / DAYS);
  const displayedTotal = useAnimatedTotal(total);
  const displayedPerDay = useAnimatedTotal(perDay);

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
    const preset = PRESETS.find((p) => p.id === activeTier);
    return preset ? preset.label : "Custom";
  }, [activeTier]);

  // Max cost for bar widths
  const maxCost = useMemo(() => {
    return Math.max(
      ...CORE_COSTS.map((c) => c.cost),
      ...OPTIONAL_FEATURES.map((f) => f.cost)
    );
  }, []);

  // Quotation items
  const quotationItems = useMemo(
    () => generateQuotationItems(activeFeatureIds),
    [activeFeatureIds]
  );

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

  // Smooth scroll
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Download quotation as printable HTML
  const downloadQuotation = useCallback(() => {
    const items = generateQuotationItems(activeFeatureIds);
    const grandTotal = items.reduce((sum, i) => sum + i.total, 0);
    const daily = Math.round(grandTotal / DAYS);
    const preset = PRESETS.find((p) => {
      const s = new Set(p.features);
      return (
        s.size === activeFeatureIds.size &&
        [...s].every((f) => activeFeatureIds.has(f))
      );
    });
    const label = preset ? preset.label : "Custom";
    const today = new Date().toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let lastCat = "";
    const rowsHtml = items
      .map((item) => {
        let catRow = "";
        if (item.category !== lastCat) {
          lastCat = item.category;
          catRow = `<tr><td colspan="7" style="padding:14px 12px 6px;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#888;border-bottom:none;">${item.category}</td></tr>`;
        }
        return `${catRow}<tr>
      <td style="text-align:center;color:#999;width:36px;">${item.no}</td>
      <td style="font-weight:500;">${item.item}</td>
      <td style="color:#666;">${item.description}</td>
      <td style="text-align:center;">${item.qty}</td>
      <td style="text-align:center;">${item.days}</td>
      <td style="text-align:right;">RM ${item.rate.toLocaleString()}</td>
      <td style="text-align:right;font-weight:600;">RM ${item.total.toLocaleString()}</td>
    </tr>`;
      })
      .join("");

    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quotation \u2014 KITAMEN \u00d7 Rev Media WC26</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#1a1a1a;padding:48px;max-width:900px;margin:0 auto;font-size:14px;line-height:1.5}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:16px;border-bottom:3px solid #00c96a}
.brand{font-size:28px;font-weight:800;letter-spacing:0.08em}
.brand-sub{font-size:12px;color:#888;margin-top:2px}
.meta{text-align:right;font-size:12px;color:#666;line-height:1.8}
h1{font-size:18px;font-weight:700;margin-bottom:6px}
.client-info{font-size:13px;color:#555;margin-bottom:24px;line-height:1.7}
table{width:100%;border-collapse:collapse}
th{background:#f7f7f7;text-align:left;padding:10px 12px;border-bottom:2px solid #ddd;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:#555}
td{padding:7px 12px;border-bottom:1px solid #eee;font-size:13px}
.totals{margin-top:0;border-top:2px solid #333}
.totals td{padding:10px 12px;font-weight:700;font-size:14px}
.per-day td{font-weight:600;font-size:13px;color:#555;border-top:1px solid #eee}
.terms{margin-top:40px;font-size:12px;color:#777}
.terms h3{font-size:13px;color:#333;font-weight:600;margin-bottom:8px}
.terms ul{padding-left:20px}
.terms li{margin-bottom:4px}
.footer{margin-top:48px;padding-top:16px;border-top:1px solid #ddd;font-size:11px;color:#aaa;text-align:center}
@media print{body{padding:24px}}
</style></head><body>
<div class="header"><div><div class="brand">KITAMEN</div><div class="brand-sub">Kitamen Resources Sdn Bhd &middot; matchops.my</div></div><div class="meta"><div><strong>Date:</strong> ${today}</div><div><strong>Ref:</strong> KTM-WC26-001</div><div><strong>Valid:</strong> 30 days</div></div></div>
<h1>Quotation &mdash; World Cup 2026 Livestream Production</h1>
<div class="client-info"><strong>Client:</strong> Rev Social Malaysia Sdn Bhd<br><strong>Package:</strong> ${label} (${DAYS} match days)<br><strong>Prepared by:</strong> Kitamen Resources Sdn Bhd &times; matchops.my</div>
<table><thead><tr><th style="width:36px;text-align:center">No.</th><th>Item</th><th>Description</th><th style="width:40px;text-align:center">Qty</th><th style="width:45px;text-align:center">Days</th><th style="width:90px;text-align:right">Rate (RM)</th><th style="width:100px;text-align:right">Total (RM)</th></tr></thead><tbody>${rowsHtml}</tbody></table>
<table class="totals"><tr><td style="text-align:right" colspan="6">Grand Total (${DAYS} Match Days)</td><td style="text-align:right;width:100px">RM ${grandTotal.toLocaleString()}</td></tr></table>
<table><tr class="per-day"><td style="text-align:right" colspan="6">Per Match Day</td><td style="text-align:right;width:100px">RM ${daily.toLocaleString()}</td></tr></table>
<div class="terms"><h3>Terms &amp; Conditions</h3><ul><li>All prices in Malaysian Ringgit (RM). This quotation is valid for 30 days from date of issue.</li><li>50% deposit required upon confirmation. Balance due upon project completion.</li><li>matchops.my live data integration is complimentary if KITAMEN is appointed for production.</li><li>Equipment transport and accommodation (if applicable) are not included in the above pricing.</li><li>Internet connectivity to be provided by Rev Media / venue.</li><li>All key artworks provided by Rev Media. KITAMEN will iterate when needed — supported formats: Adobe Illustrator (AI), Figma, or SVG.</li><li>Final scope and pricing subject to detailed scoping discussion and written agreement.</li></ul></div>
<div class="footer">KITAMEN &middot; zemang.my &middot; World Cup 2026 Livestream Production Proposal</div>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  }, [activeFeatureIds]);

  // ── Scroll listener for header ──
  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // ── Tier comparison helpers ──
  function cellClass(tier: string): string {
    if (tier === activeTier) {
      return "bg-[rgba(0,255,136,0.06)] text-accent-primary font-semibold";
    }
    return "text-text-tertiary";
  }

  function headerCellClass(tier: string): string {
    if (tier === activeTier) {
      return "bg-[rgba(0,255,136,0.1)] text-accent-primary shadow-[inset_0_2px_0_var(--color-accent-primary)]";
    }
    return "bg-[rgba(255,255,255,0.02)] text-text-tertiary";
  }

  return (
    <div ref={scrollContainerRef} className="font-[family-name:var(--font-inter)]">
      {/* ════════════════════ MOBILE WARNING ════════════════════ */}
      <div className="fixed inset-0 z-[200] bg-bg-primary flex items-center justify-center p-8 md:hidden">
        <div className="text-center max-w-[320px]">
          <div className="w-16 h-16 mx-auto mb-6 bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center">
            <DynamicIcon name="Monitor" size={28} className="text-accent-primary" />
          </div>
          <h2 className="text-lg font-bold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
            Desktop Only
          </h2>
          <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-4">
            This proposal is optimised for desktop viewing. Please open on a laptop or desktop for the best experience.
          </p>
          <span className="inline-block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-accent-primary py-1.5 px-4 border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
            KITAMEN &times; Rev Media
          </span>
        </div>
      </div>

      <div aria-hidden="true">
        <FloatingOrbs />
      </div>

      {/* ════════════════════ HEADER ════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] px-8 py-3.5 border-b border-glass-border transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(5,5,8,0.95)] backdrop-blur-[20px]"
            : "bg-[rgba(5,5,8,0.6)] backdrop-blur-[10px]"
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-sm text-text-primary no-underline font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.05em]"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <DynamicIcon name="Radio" size={16} className="text-bg-primary" />
            </div>
            KITAMEN
          </Link>

          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[0.7rem] text-text-tertiary hover:text-text-primary transition-colors uppercase tracking-[0.1em] font-[family-name:var(--font-ibm-plex-mono)] bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content">
        {/* ════════════════════ HERO ════════════════════ */}
        <section className="pt-32 pb-16 text-center relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-primary py-1.5 px-4 border border-[rgba(0,255,136,0.2)] mb-6 bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
              Livestream Production Proposal
            </span>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-[family-name:var(--font-ibm-plex-mono)]">
              World Cup 2026
            </h1>
            <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-text-primary mb-4 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.05em]">
              Live Reaction Show
            </h2>
            <p className="text-[clamp(0.9rem,1.8vw,1.1rem)] text-text-secondary max-w-[600px] mx-auto mb-12">
              Rev Media &times; KITAMEN &mdash; Pre-production &amp; technical
              coordination for an 8-day World Cup host reaction show with live
              data integration via matchops.my.
            </p>

            <div className="grid grid-cols-4 gap-4 max-w-[800px] mx-auto">
              {[
                { value: "8", label: "Match Days" },
                { value: "3h", label: "Per Show" },
                { value: "6+", label: "Crew" },
                { value: "Multi", label: "Platform" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-5 text-center scroll-reveal"
                >
                  <div className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-[family-name:var(--font-ibm-plex-mono)]">
                    {stat.value}
                  </div>
                  <div className="text-[0.7rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => scrollTo("budget")}
                className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] py-3 px-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary border-none cursor-pointer transition-opacity hover:opacity-90 font-[family-name:var(--font-ibm-plex-mono)]"
              >
                View Budget
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] py-3 px-8 bg-transparent text-text-primary border border-glass-border cursor-pointer transition-colors hover:border-glass-border-hover hover:bg-glass-bg font-[family-name:var(--font-ibm-plex-mono)]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════ MARQUEE ════════════════════ */}
        <Marquee items={MARQUEE_ITEMS} />

        {/* ════════════════════ PRODUCTION SCOPE ════════════════════ */}
        <section id="format" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Scope
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Our Scope
              </h2>
              <p className="text-text-secondary max-w-[550px] mx-auto text-[0.95rem]">
                KITAMEN handles pre-production, technical setup, and on-site
                coordination. Rev Media runs the show content and talent.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {SHOW_SEGMENTS.map((seg, idx) => (
                <div
                  key={seg.title}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-7 scroll-reveal relative overflow-hidden"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
                      <DynamicIcon name={seg.icon} size={20} className="text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="text-[0.9rem] font-bold font-[family-name:var(--font-ibm-plex-mono)]">
                        {seg.title}
                      </h3>
                      <span className="text-[0.7rem] text-accent-primary font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                        {seg.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-[0.8rem] text-text-secondary mb-3 leading-relaxed">
                    {seg.description}
                  </p>
                  <ul className="list-none p-0">
                    {seg.items.map((item) => (
                      <li
                        key={item}
                        className="text-[0.75rem] text-text-tertiary py-1 pl-5 relative leading-[1.4]"
                      >
                        <Check
                          size={12}
                          className="absolute left-0 top-[0.35rem] text-accent-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ MATCHOPS.MY INTEGRATION ════════════════════ */}
        <section id="matchop" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-tertiary py-1.5 px-3 border border-[rgba(168,85,247,0.2)] mb-4 bg-[rgba(168,85,247,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Unique Selling Point
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                matchops.my Integration
              </h2>
              <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
                Live match data pushed directly to broadcast overlays &mdash; scorers,
                stats, and standings at your fingertips.
              </p>
            </div>

            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-10 scroll-reveal">
              {/* Data flow */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { icon: "Globe", label: "Match Data API", desc: "Live scores, events, standings" },
                  { icon: "Cpu", label: "matchops.my", desc: "Web controller + data processing" },
                  { icon: "Monitor", label: "VMix Overlays", desc: "Real-time graphics & lower thirds" },
                  { icon: "Tv", label: "Live Stream", desc: "Viewers see data instantly" },
                ].map((step, idx) => (
                  <div key={step.label} className="text-center relative">
                    <div className="w-14 h-14 mx-auto mb-3 bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.2)] flex items-center justify-center">
                      <DynamicIcon name={step.icon} size={24} className="text-accent-tertiary" />
                    </div>
                    <h4 className="text-[0.8rem] font-bold mb-1 font-[family-name:var(--font-ibm-plex-mono)]">
                      {step.label}
                    </h4>
                    <p className="text-[0.72rem] text-text-tertiary">{step.desc}</p>
                    {idx < 3 && (
                      <div className="absolute top-7 -right-2 text-accent-tertiary text-lg">
                        &rarr;
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="h-px bg-glass-border my-6" />

              {/* Features */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: "Smartphone", title: "iPad / Phone Controller", desc: "Host or GFX operator triggers data displays from any device on the local network." },
                  { icon: "Zap", title: "Real-Time Updates", desc: "Goal scorers, match stats, and group standings update automatically as events happen." },
                  { icon: "LayoutGrid", title: "VMix Integration", desc: "Data is pushed directly to VMix as web sources \u2014 no manual graphics needed." },
                ].map((feat) => (
                  <div key={feat.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 bg-[rgba(168,85,247,0.1)] flex items-center justify-center">
                      <DynamicIcon name={feat.icon} size={18} className="text-accent-tertiary" />
                    </div>
                    <div>
                      <h4 className="text-[0.85rem] font-bold mb-1 font-[family-name:var(--font-ibm-plex-mono)]">
                        {feat.title}
                      </h4>
                      <p className="text-[0.78rem] text-text-secondary leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-glass-border my-6" />

              <div className="text-center">
                <span className="inline-block text-[0.7rem] font-semibold tracking-[0.1em] uppercase py-2 px-5 border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] text-accent-primary font-[family-name:var(--font-ibm-plex-mono)]">
                  Courtesy Development &mdash; Added Value (FOC if appointed)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ BUDGET CONFIGURATOR ════════════════════ */}
        <section id="budget" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Configure
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Production Budget
              </h2>
              <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">
                Select a preset or toggle individual features to build your
                production package. All prices for 8 match days.
              </p>
            </div>

            {/* Preset Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              {PRESETS.map((preset) => {
                const isActive = activeTier === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`py-4 px-7 border font-semibold text-[0.85rem] flex flex-col items-center gap-1.5 min-w-[160px] backdrop-blur-[10px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:-translate-y-0.5 font-[family-name:var(--font-ibm-plex-mono)] ${
                      isActive
                        ? "border-[rgba(0,255,136,0.4)] bg-[rgba(0,255,136,0.08)] shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                        : "border-glass-border bg-glass-bg hover:border-glass-border-hover hover:bg-glass-bg-hover"
                    }`}
                  >
                    <span className="text-text-primary">{preset.label}</span>
                    <span className="text-[0.65rem] text-text-tertiary font-medium">
                      {preset.subtitle}
                    </span>
                    <span className="text-[0.7rem] text-accent-primary font-medium">
                      {preset.price} &middot; {preset.perDay}/day
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Core Costs Banner */}
            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 px-8 mb-8 scroll-reveal">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[0.8rem] font-semibold text-text-secondary uppercase tracking-[0.1em] font-[family-name:var(--font-ibm-plex-mono)]">
                  Core Costs &mdash; Always Included
                </h3>
                <span className="text-[0.85rem] font-bold text-accent-primary font-[family-name:var(--font-ibm-plex-mono)]">
                  RM 32,000
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {CORE_COSTS.map((core) => (
                  <div
                    key={core.id}
                    className="flex items-center gap-3 py-3 px-4 bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.1)]"
                  >
                    <DynamicIcon
                      name={core.icon}
                      size={16}
                      className="text-accent-primary shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.72rem] font-medium text-text-primary leading-tight">
                        {core.label}
                      </div>
                      <div className="text-[0.68rem] text-accent-primary font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                        RM {core.cost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {OPTIONAL_FEATURES.map((feat) => {
                const isActive = activeFeatureIds.has(feat.id);
                return (
                  <div
                    key={feat.id}
                    className={`relative overflow-hidden p-6 backdrop-blur-[20px] border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-accent-primary before:to-accent-secondary before:origin-left before:transition-transform before:duration-400 ${
                      isActive
                        ? "border-glass-border-hover bg-glass-bg-hover shadow-[0_0_20px_rgba(0,255,136,0.08)] before:scale-x-100"
                        : "border-glass-border bg-glass-bg opacity-65 hover:opacity-85 before:scale-x-0 hover:before:scale-x-100"
                    }`}
                  >
                    {/* Header: icon + toggle */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ background: feat.iconBg }}
                      >
                        <DynamicIcon
                          name={feat.icon}
                          size={20}
                          className={feat.iconColor}
                        />
                      </div>
                      {/* Square Toggle Switch */}
                      <label className="relative inline-block w-12 h-[26px] shrink-0 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleFeature(feat.id)}
                          className="opacity-0 w-0 h-0 peer"
                          aria-label={`Toggle ${feat.label}`}
                        />
                        <span className="absolute inset-0 bg-[rgba(255,255,255,0.1)] border border-glass-border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:bg-[rgba(0,255,136,0.3)] peer-checked:border-[rgba(0,255,136,0.5)] peer-checked:shadow-[0_0_10px_var(--color-accent-primary)] before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:left-[3px] before:bottom-[3px] before:bg-text-secondary before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:before:translate-x-[22px] peer-checked:before:bg-accent-primary peer-checked:before:shadow-[0_0_10px_var(--color-accent-primary)]" />
                      </label>
                    </div>

                    <h3 className="text-[0.85rem] font-bold mb-2 leading-[1.3] font-[family-name:var(--font-ibm-plex-mono)]">
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
                          className="text-[0.62rem] py-0.5 px-2 bg-[rgba(255,255,255,0.05)] text-text-tertiary font-medium border border-[rgba(255,255,255,0.06)] font-[family-name:var(--font-ibm-plex-mono)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Cost */}
                    <div className="flex items-center justify-between">
                      <span className="text-[0.8rem] font-bold text-accent-primary font-[family-name:var(--font-ibm-plex-mono)]">
                        RM {feat.cost.toLocaleString()}
                      </span>
                      <span className="text-[0.65rem] text-text-tertiary font-[family-name:var(--font-ibm-plex-mono)]">
                        RM {feat.perDay}/day
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Budget Summary Card ── */}
            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-10 mb-10 scroll-reveal">
              {/* Total */}
              <div className="text-center mb-8">
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.15em] font-semibold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                  Total Investment &mdash; 8 Match Days
                </div>
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                  RM {displayedTotal.toLocaleString()}
                </div>
                <div className="flex justify-center gap-6">
                  <span className="text-[0.8rem] font-semibold py-1 px-4 bg-[rgba(0,255,136,0.1)] text-accent-primary border border-[rgba(0,255,136,0.2)] font-[family-name:var(--font-ibm-plex-mono)]">
                    {tierLabel}
                  </span>
                  <span className="text-[0.8rem] font-semibold py-1 px-4 bg-[rgba(0,212,255,0.1)] text-accent-secondary border border-[rgba(0,212,255,0.2)] font-[family-name:var(--font-ibm-plex-mono)]">
                    RM {displayedPerDay.toLocaleString()}/day
                  </span>
                </div>
              </div>

              {/* Range Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2 text-[0.7rem] text-text-tertiary font-medium font-[family-name:var(--font-ibm-plex-mono)]">
                  <span>RM 32,000</span>
                  <span>RM 52,000</span>
                </div>
                <div className="h-2 bg-[rgba(255,255,255,0.06)] relative overflow-visible">
                  <div
                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
                    style={{ width: `${rangePct}%`, minWidth: "10px" }}
                  >
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-primary shadow-[0_0_15px_var(--color-accent-primary),0_0_30px_rgba(0,255,136,0.3)] transition-all duration-600" />
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mb-8">
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold mb-4 font-[family-name:var(--font-ibm-plex-mono)]">
                  Cost Breakdown
                </div>

                {/* Core costs */}
                {CORE_COSTS.map((core) => {
                  const pct = (core.cost / maxCost) * 100;
                  return (
                    <div key={core.id}>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-[160px] text-[0.75rem] text-text-secondary font-medium shrink-0">
                          {core.label}
                        </div>
                        <div className="flex-1 h-[18px] bg-[rgba(255,255,255,0.04)] overflow-hidden">
                          <div
                            className="h-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{ width: `${pct}%`, background: core.color }}
                          />
                        </div>
                        <div className="w-[90px] text-right text-[0.75rem] font-semibold text-text-secondary tabular-nums shrink-0 font-[family-name:var(--font-ibm-plex-mono)]">
                          RM {core.cost.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 pb-2 pl-[176px] ml-4">
                        {core.items.map((item) => (
                          <span
                            key={item}
                            className="text-[0.65rem] text-text-tertiary relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-glass-border-hover"
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
                        <div className="w-[160px] text-[0.75rem] text-text-secondary font-medium shrink-0">
                          {feat.label}
                        </div>
                        <div className="flex-1 h-[18px] bg-[rgba(255,255,255,0.04)] overflow-hidden">
                          <div
                            className="h-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{ width: `${pct}%`, background: feat.color }}
                          />
                        </div>
                        <div className="w-[90px] text-right text-[0.75rem] font-semibold text-text-secondary tabular-nums shrink-0 font-[family-name:var(--font-ibm-plex-mono)]">
                          {isActive
                            ? `RM ${feat.cost.toLocaleString()}`
                            : "\u2014"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tier Comparison Table */}
              <div className="mt-8">
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold mb-4 font-[family-name:var(--font-ibm-plex-mono)]">
                  Tier Comparison
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[0.75rem]">
                    <thead>
                      <tr>
                        <th className="py-2.5 px-3.5 text-left border-b border-glass-border font-semibold text-text-tertiary uppercase tracking-[0.05em] text-[0.65rem] bg-[rgba(255,255,255,0.02)] font-[family-name:var(--font-ibm-plex-mono)]">
                          Aspect
                        </th>
                        {TIER_KEYS.map((tier) => (
                          <th
                            key={tier}
                            className={`py-2.5 px-3.5 text-left border-b border-glass-border font-semibold uppercase tracking-[0.05em] text-[0.65rem] transition-colors duration-300 font-[family-name:var(--font-ibm-plex-mono)] ${headerCellClass(tier)}`}
                          >
                            {TIER_HEADERS[tier]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TIER_COMPARISON.map((row) => (
                        <tr key={row.aspect}>
                          <td className="py-2.5 px-3.5 border-b border-glass-border text-text-secondary font-medium">
                            {row.aspect}
                          </td>
                          {TIER_KEYS.map((tier) => (
                            <td
                              key={tier}
                              className={`py-2.5 px-3.5 border-b border-glass-border transition-colors duration-300 font-[family-name:var(--font-ibm-plex-mono)] ${cellClass(tier)}`}
                            >
                              {row[tier]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footnote */}
              <div className="mt-6 pt-4 border-t border-glass-border text-center">
                <p className="text-[0.68rem] text-text-tertiary leading-[1.6] italic">
                  * All figures in RM and subject to change. matchops.my development
                  is FOC / courtesy if Rev Media appoints KITAMEN for production.
                  Internet connectivity to be provided by Rev Media / venue.
                  All key artworks provided by Rev Media — KITAMEN will iterate when
                  needed (supported formats: AI, Figma, SVG).
                  Final budgets confirmed upon detailed scoping.
                </p>
              </div>
            </div>

            {/* ── Quotation Breakdown ── */}
            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-10 mb-16 scroll-reveal">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                  Quotation Breakdown
                </div>
                <button
                  onClick={downloadQuotation}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] py-2 px-5 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary border-none cursor-pointer transition-opacity hover:opacity-90 font-[family-name:var(--font-ibm-plex-mono)] flex items-center gap-2"
                >
                  <DynamicIcon name="Download" size={14} className="text-bg-primary" />
                  Download Quotation
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.75rem]">
                  <thead>
                    <tr>
                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-10">
                        No.
                      </th>
                      <th className="py-2 px-3 text-left border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                        Item
                      </th>
                      <th className="py-2 px-3 text-left border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                        Description
                      </th>
                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-10">
                        Qty
                      </th>
                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-12">
                        Days
                      </th>
                      <th className="py-2 px-3 text-right border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-24">
                        Rate
                      </th>
                      <th className="py-2 px-3 text-right border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-28">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotationItems.map((item, idx) => {
                      const showCategoryHeader =
                        idx === 0 || item.category !== quotationItems[idx - 1].category;
                      return (
                        <Fragment key={item.no}>
                          {showCategoryHeader && (
                            <tr>
                              <td
                                colSpan={7}
                                className="py-2.5 px-3 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-accent-primary border-b border-glass-border bg-[rgba(0,255,136,0.03)] font-[family-name:var(--font-ibm-plex-mono)]"
                              >
                                {item.category}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="py-2 px-3 border-b border-glass-border text-text-tertiary text-center font-[family-name:var(--font-ibm-plex-mono)]">
                              {item.no}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-primary font-medium">
                              {item.item}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary">
                              {item.description}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-center font-[family-name:var(--font-ibm-plex-mono)]">
                              {item.qty}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-center font-[family-name:var(--font-ibm-plex-mono)]">
                              {item.days}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-right font-[family-name:var(--font-ibm-plex-mono)]">
                              RM {item.rate.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 border-b border-glass-border text-text-primary font-semibold text-right font-[family-name:var(--font-ibm-plex-mono)]">
                              RM {item.total.toLocaleString()}
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                    {/* Grand Total */}
                    <tr>
                      <td
                        colSpan={6}
                        className="py-3 px-3 border-t-2 border-accent-primary text-right text-text-primary font-bold text-[0.8rem] font-[family-name:var(--font-ibm-plex-mono)]"
                      >
                        Grand Total ({DAYS} Match Days)
                      </td>
                      <td className="py-3 px-3 border-t-2 border-accent-primary text-right text-accent-primary font-bold text-[0.85rem] font-[family-name:var(--font-ibm-plex-mono)]">
                        RM {total.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={6}
                        className="py-2 px-3 text-right text-text-secondary font-semibold text-[0.75rem] font-[family-name:var(--font-ibm-plex-mono)]"
                      >
                        Per Match Day
                      </td>
                      <td className="py-2 px-3 text-right text-accent-secondary font-semibold text-[0.8rem] font-[family-name:var(--font-ibm-plex-mono)]">
                        RM {perDay.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════ EQUIPMENT ════════════════════ */}
        <section id="equipment" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Gear
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Equipment List
              </h2>
              <p className="text-text-secondary max-w-[550px] mx-auto text-[0.95rem]">
                Professional broadcast equipment provided for every show day.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {EQUIPMENT_LIST.map((item, idx) => (
                <div
                  key={item.label}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 flex gap-4 items-start scroll-reveal"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="w-11 h-11 shrink-0 bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={20} className="text-accent-secondary" />
                  </div>
                  <div>
                    <h3 className="text-[0.85rem] font-bold mb-1 font-[family-name:var(--font-ibm-plex-mono)]">
                      {item.label}
                    </h3>
                    <p className="text-[0.78rem] text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ CREW / TEAM ════════════════════ */}
        <section id="team" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-primary py-1.5 px-3 border border-[rgba(0,255,136,0.2)] mb-4 bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Team
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Core Crew
              </h2>
              <p className="text-text-secondary max-w-[550px] mx-auto text-[0.95rem]">
                Six dedicated professionals on every show day.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-5">
              {CREW_MEMBERS.map((member, idx) => (
                <div
                  key={member.role}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 text-center scroll-reveal"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
                    <DynamicIcon name={member.icon} size={22} className="text-accent-primary" />
                  </div>
                  <h3 className="text-[0.8rem] font-bold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                    {member.role}
                  </h3>
                  <p className="text-[0.72rem] text-text-secondary leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ PORTFOLIO ════════════════════ */}
        <section id="portfolio" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Track Record
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Past Broadcast Work
              </h2>
              <p className="text-text-secondary max-w-[550px] mx-auto text-[0.95rem]">
                Proven experience across sports, esports, music, and corporate livestreams.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {PORTFOLIO_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-7 scroll-reveal relative overflow-hidden"
                  style={{ transitionDelay: `${idx * 0.08}s` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-secondary to-accent-tertiary" />
                  <div className="w-11 h-11 mb-4 bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={20} className="text-accent-secondary" />
                  </div>
                  <h3 className="text-[0.9rem] font-bold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                    {item.title}
                  </h3>
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ IMPACT METRICS ════════════════════ */}
        <section className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Projected Impact
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                At a Glance
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-4">
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

      </main>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="py-10 border-t border-glass-border text-center relative z-[1]">
        <div className="max-w-[1200px] mx-auto px-8">
          <p className="text-[0.75rem] text-text-tertiary font-[family-name:var(--font-ibm-plex-mono)]">
            &copy; 2026 KITAMEN &middot; World Cup 2026 Livestream
            Production Proposal &middot;{" "}
            <Link href="/" className="text-accent-primary no-underline">
              zemang.my
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
