"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  MapPin,
  Smartphone,
  Sparkles,
  Store,
  Brain,
  BarChart3,
  Moon,
  Shield,
  Code,
  Wallet,
  Megaphone,
  Users,
  Cloud,
  Settings,
  Download,
  TrendingUp,
  Star,
  User,
  Palette,
  ArrowRight,
  CheckCircle,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  TAGLINE,
  COVER_STATS,
  PROBLEMS,
  PLATFORM_FEATURES,
  CREDIT_MECHANICS,
  CREDIT_PROJECTIONS,
  CREDIT_RULES,
  CREDIT_INSIGHT,
  FUND_ALLOCATIONS,
  PLATFORM_DEV_ITEMS,
  OPERATOR_ITEMS,
  MARKETING_ITEMS,
  COMPETITORS,
  BAYU_ADVANTAGES,
  VOUCHER_COMPARISON,
  TIMELINE,
  KPIS,
  REVENUE_STREAMS,
  totalRevenue,
  TEAM,
  TERMS,
  fmtRM,
  fundsPieGradient,
} from "@/lib/budget-data/bayu-sabah";

const TOTAL_SLIDES = 13;

const APP_SCREENS_1 = [
  { src: "/bayu-proposal/01-login.png", label: "Login" },
  { src: "/bayu-proposal/02-home.png", label: "Home" },
  { src: "/bayu-proposal/03-trip-planner.png", label: "Trip Planner" },
  { src: "/bayu-proposal/04-ibayu-chat.png", label: "iBayu AI Chat" },
  { src: "/bayu-proposal/05-bookings.png", label: "Bookings" },
];

const APP_SCREENS_2 = [
  { src: "/bayu-proposal/06-food-map.png", label: "Food Map" },
  { src: "/bayu-proposal/07-safety-alerts.png", label: "Safety Alerts" },
  { src: "/bayu-proposal/08-badges.png", label: "Travel Badges" },
  { src: "/bayu-proposal/09-profile.png", label: "Profile & Wallet" },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Globe, Clock, MapPin, Smartphone, Sparkles, Store, Brain, BarChart3,
  Moon, Shield, Code, Wallet, Megaphone, Users, Cloud, Settings,
  Download, TrendingUp, Star, User, Palette,
};

// ── Slide shell ──

function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`h-dvh w-full flex-shrink-0 overflow-y-auto p-4 sm:p-6 ${className}`}>
      <div className="max-w-[1400px] w-full min-h-full mx-auto bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_24px_rgba(0,0,0,0.04)] border border-[#e5e7eb]/60 flex items-center justify-center">
        <div className="w-full px-8 sm:px-12 py-10 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

function SlideHeader({ tag, title, subtitle }: { tag?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-8 sm:mb-10">
      {tag && (
        <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#0891b2] py-1.5 px-3 border border-[#0891b2]/20 bg-[#0891b2]/5 font-[family-name:var(--font-ibm-plex-mono)] mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold bg-gradient-to-r from-[#0e7490] to-[#059669] bg-clip-text text-transparent leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#64748b] mt-3 text-[clamp(0.875rem,1.5vw,1.125rem)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Card({ children, className = "", accent }: { children: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <div className={`relative bg-white border border-[#e5e7eb] rounded-lg shadow-sm ${className}`}>
      {accent && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0891b2] to-[#059669]" />}
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════

export default function BayuProposal() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((n: number) => setCurrent(Math.max(0, Math.min(TOTAL_SLIDES - 1, n))), []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(TOTAL_SLIDES - 1); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, goTo]);

  const onTouchStart = useCallback((e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  }, [next, prev]);

  // ═══════════════════════════════════════
  // SLIDES
  // ═══════════════════════════════════════

  const slides = [
    // ── 0: Cover ──
    <Slide key="cover">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold bg-gradient-to-r from-[#0891b2] via-[#059669] to-[#d97706] bg-clip-text text-transparent leading-none tracking-wide font-[family-name:var(--font-bebas-neue)]">
            Bayu
          </h1>
        </div>
        <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-[#64748b] mb-2">{TAGLINE}</p>
        <p className="text-[clamp(0.8rem,1.2vw,1rem)] text-[#94a3b8] mb-12 max-w-xl mx-auto">
          AI-powered smart tourism platform for Sabah. State-backed digital wallet stimulus. Real-time government dashboard. 200+ local operators.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {COVER_STATS.map((s) => (
            <Card key={s.label} className="px-6 sm:px-8 py-4 sm:py-5" accent>
              <div className="text-[clamp(1.25rem,3vw,2rem)] font-bold bg-gradient-to-r from-[#0891b2] to-[#059669] bg-clip-text text-transparent font-[family-name:var(--font-ibm-plex-mono)]">
                {s.value}
              </div>
              <div className="text-[#94a3b8] text-xs sm:text-sm mt-1 font-[family-name:var(--font-ibm-plex-mono)]">{s.label}</div>
            </Card>
          ))}
        </div>
        <p className="text-[#94a3b8] text-xs mt-12 font-[family-name:var(--font-ibm-plex-mono)]">
          Kementerian Pelancongan, Kebudayaan dan Alam Sekitar Sabah
        </p>
      </div>
    </Slide>,

    // ── 1: The Problem ──
    <Slide key="problem">
      <SlideHeader tag="The Problem" title="Sabah Tourism is Under-Digitized" subtitle="World-class assets, fragmented experience." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROBLEMS.map((p) => {
          const Icon = ICON_MAP[p.icon];
          return (
            <Card key={p.title} className="p-6" accent>
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="w-12 h-12 rounded-lg bg-[#0891b2]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#0891b2]" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-1">{p.title}</h3>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-3">{p.description}</p>
                  <div className="inline-flex items-center gap-2 bg-[#0891b2]/5 border border-[#0891b2]/20 rounded px-3 py-1.5">
                    <span className="text-xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#0891b2]">{p.stat}</span>
                    <span className="text-xs text-[#64748b]">{p.statLabel}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Slide>,

    // ── 2: The Solution ──
    <Slide key="solution">
      <SlideHeader tag="The Solution" title="Meet Bayu" subtitle="An all-in-one smart tourism platform built specifically for Sabah." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLATFORM_FEATURES.map((f) => {
          const Icon = ICON_MAP[f.icon];
          return (
            <Card key={f.title} className="p-5" accent>
              {Icon && (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${f.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
              )}
              <h3 className="text-base font-semibold text-[#1e293b] mb-1">{f.title}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{f.description}</p>
            </Card>
          );
        })}
      </div>
    </Slide>,

    // ── 3: Live Demo ──
    <Slide key="demo">
      <SlideHeader tag="Live Demo" title="It's Already Built" subtitle="Download from TestFlight and try it right now." />
      <div className="text-center">
        <Card className="inline-block p-8 sm:p-12" accent>
          <div className="mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0891b2] to-[#059669] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Bayu for iOS</h3>
            <p className="text-[#64748b] text-sm">TestFlight Beta — Try on your iPhone</p>
          </div>
          <a
            href="https://testflight.apple.com/join/HpxejJa9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0891b2] to-[#059669] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <Download className="w-5 h-5" />
            Open TestFlight
          </a>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#0891b2]">6</div>
              <div className="text-xs text-[#94a3b8]">Tabs</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#059669]">iBayu</div>
              <div className="text-xs text-[#94a3b8]">AI Chat</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#d97706]">Full</div>
              <div className="text-xs text-[#94a3b8]">Payment Flow</div>
            </div>
          </div>
        </Card>
      </div>
    </Slide>,

    // ── 4: App Demo — Core Flow ──
    <Slide key="demo-core">
      <SlideHeader tag="App Walkthrough" title="Core User Flow" subtitle="From login to booking — a seamless Sabah travel experience." />
      <div className="flex justify-center gap-3 sm:gap-5 overflow-x-auto pb-4">
        {APP_SCREENS_1.map((s) => (
          <div key={s.label} className="flex flex-col items-center flex-shrink-0">
            <div className="w-[140px] sm:w-[180px] md:w-[200px] rounded-[20px] overflow-hidden border border-[#e5e7eb] shadow-md">
              <img src={s.src} alt={s.label} className="w-full h-auto" loading="lazy" />
            </div>
            <span className="text-xs text-[#64748b] mt-2 font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </Slide>,

    // ── 5: App Demo — Discover & Profile ──
    <Slide key="demo-discover">
      <SlideHeader tag="App Walkthrough" title="Discover & Rewards" subtitle="Local food guides, real-time safety alerts, gamified travel badges, and digital wallet." />
      <div className="flex justify-center gap-3 sm:gap-5 overflow-x-auto pb-4">
        {APP_SCREENS_2.map((s) => (
          <div key={s.label} className="flex flex-col items-center flex-shrink-0">
            <div className="w-[160px] sm:w-[200px] md:w-[220px] rounded-[20px] overflow-hidden border border-[#e5e7eb] shadow-md">
              <img src={s.src} alt={s.label} className="w-full h-auto" loading="lazy" />
            </div>
            <span className="text-xs text-[#64748b] mt-2 font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </Slide>,

    // ── 6: The Math (Bayu Credits) ──
    <Slide key="credits">
      <SlideHeader tag="The Math" title="Every RM 1 = RM 5-20 Economic Impact" subtitle="Why Bayu Credits beat traditional tourism vouchers." />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Multiplier visual */}
        <div className="flex-1 space-y-3">
          {CREDIT_PROJECTIONS.map((p, i) => (
            <Card key={p.label} className="p-4 flex items-center justify-between" accent={i > 0}>
              <div>
                <div className="text-sm font-semibold text-[#1e293b]">{p.label}</div>
                <div className="text-xs text-[#94a3b8]">{p.detail}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold font-[family-name:var(--font-ibm-plex-mono)]" style={{ color: p.color }}>{p.value}</div>
                <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#64748b]">{p.multiplier}</div>
              </div>
            </Card>
          ))}
        </div>
        {/* Right: Rules & insight */}
        <div className="lg:w-[380px] space-y-4">
          <Card className="p-5" accent>
            <h4 className="text-sm font-semibold text-[#1e293b] mb-3 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#059669]" />
              Credit Rules
            </h4>
            <ul className="space-y-2">
              {CREDIT_RULES.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-[#64748b]">
                  <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-5 bg-[#059669]/5 border-[#059669]/20">
            <Zap className="w-5 h-5 text-[#d97706] mb-2" />
            <p className="text-sm text-[#1e293b] leading-relaxed font-medium">{CREDIT_INSIGHT}</p>
          </Card>
        </div>
      </div>
      {/* Comparison */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {VOUCHER_COMPARISON.map((v) => (
          <Card key={v.method} className="p-4" accent={v.method === "Bayu Credits"}>
            <h4 className="text-sm font-semibold text-[#1e293b] mb-2">{v.method}</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-[#94a3b8]">ROI</span><div className="font-[family-name:var(--font-ibm-plex-mono)] font-bold text-[#1e293b] mt-1">{v.roi}</div></div>
              <div><span className="text-[#94a3b8]">Leakage</span><div className="font-[family-name:var(--font-ibm-plex-mono)] font-bold text-[#1e293b] mt-1">{v.leakage}</div></div>
              <div><span className="text-[#94a3b8]">Tracking</span><div className="font-[family-name:var(--font-ibm-plex-mono)] font-bold text-[#1e293b] mt-1">{v.tracking}</div></div>
            </div>
          </Card>
        ))}
      </div>
    </Slide>,

    // ── 5: Budget Breakdown ──
    <Slide key="budget">
      <SlideHeader tag="Budget" title="Fund Allocation" subtitle="Every ringgit accounted for with milestone-based disbursement." />
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Pie chart */}
        <div className="flex-shrink-0 mx-auto">
          <div className="relative w-[240px] h-[240px] rounded-full" style={{ background: fundsPieGradient() }}>
            <div className="absolute inset-[30%] bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-bold font-[family-name:var(--font-ibm-plex-mono)] bg-gradient-to-r from-[#0891b2] to-[#059669] bg-clip-text text-transparent">100%</div>
                <div className="text-[10px] text-[#94a3b8]">ALLOCATION</div>
              </div>
            </div>
          </div>
        </div>
        {/* Items */}
        <div className="flex-1 space-y-3">
          {FUND_ALLOCATIONS.map((a) => {
            const Icon = ICON_MAP[a.icon];
            return (
              <div key={a.label} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                  {Icon && <Icon className="w-4 h-4" style={{ color: a.color }} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-[#1e293b]">{a.label}</span>
                    <span className="text-sm font-bold font-[family-name:var(--font-ibm-plex-mono)]" style={{ color: a.color }}>{a.pct}%</span>
                  </div>
                  <div className="h-2 bg-[#f1f5f9] rounded-full mt-1 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                  </div>
                </div>
                <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#94a3b8] w-8 text-right">{a.pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-center text-[#94a3b8] text-xs mt-8 font-[family-name:var(--font-ibm-plex-mono)]">
        Disbursement: 40% on approval &bull; 30% at Phase 2 &bull; 30% at Phase 3
      </p>
    </Slide>,

    // ── 6: Competitive Landscape ──
    <Slide key="competitive">
      <SlideHeader tag="Competition" title="Why Not Existing Platforms?" subtitle="OTAs charge 15-30% and have zero Sabah-specific intelligence." />
      <Card className="p-4 sm:p-6 overflow-x-auto mb-6" accent>
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              <th className="text-left py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Platform</th>
              <th className="text-left py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Commission</th>
              <th className="text-left py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Local Focus</th>
              <th className="text-center py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Gov Dashboard</th>
              <th className="text-center py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Sabah AI</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((c) => (
              <tr key={c.name} className="border-b border-[#e5e7eb]/50">
                <td className="py-2.5 text-[#1e293b] font-medium">{c.name}</td>
                <td className="py-2.5 text-[#dc2626] font-[family-name:var(--font-ibm-plex-mono)]">{c.commission}</td>
                <td className="py-2.5 text-[#64748b]">{c.localFocus}</td>
                <td className="py-2.5 text-center"><XCircle className="w-4 h-4 text-[#dc2626] mx-auto" /></td>
                <td className="py-2.5 text-center"><XCircle className="w-4 h-4 text-[#dc2626] mx-auto" /></td>
              </tr>
            ))}
            <tr className="bg-[#059669]/5">
              <td className="py-2.5 text-[#059669] font-bold">Bayu</td>
              <td className="py-2.5 text-[#059669] font-[family-name:var(--font-ibm-plex-mono)] font-bold">0-5%</td>
              <td className="py-2.5 text-[#059669] font-bold">100% Sabah</td>
              <td className="py-2.5 text-center"><CheckCircle className="w-4 h-4 text-[#059669] mx-auto" /></td>
              <td className="py-2.5 text-center"><CheckCircle className="w-4 h-4 text-[#059669] mx-auto" /></td>
            </tr>
          </tbody>
        </table>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {BAYU_ADVANTAGES.map((a) => (
          <div key={a} className="flex items-start gap-2 text-sm">
            <Shield className="w-4 h-4 text-[#0891b2] flex-shrink-0 mt-0.5" />
            <span className="text-[#64748b]">{a}</span>
          </div>
        ))}
      </div>
    </Slide>,

    // ── 7: Timeline ──
    <Slide key="timeline">
      <SlideHeader tag="Execution" title="12-Month Roadmap" subtitle="From MVP to 10,000 active users." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIMELINE.map((t) => (
          <Card key={t.phase} className="p-6" accent>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#94a3b8]">{t.duration}</span>
            </div>
            <h3 className="text-lg font-bold text-[#1e293b] mb-1">{t.phase}: {t.title}</h3>
            <ul className="space-y-2 mt-4">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#64748b]">
                  <ArrowRight className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: t.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Slide>,

    // ── 8: KPIs ──
    <Slide key="kpis">
      <SlideHeader tag="Accountability" title="Measurable KPIs" subtitle="Every metric auditable by state-appointed auditor." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPIS.map((k) => {
          const Icon = ICON_MAP[k.icon];
          return (
            <Card key={k.metric} className="p-5 text-center" accent>
              {Icon && <Icon className="w-6 h-6 text-[#0891b2] mx-auto mb-2" />}
              <div className="text-xl font-bold font-[family-name:var(--font-ibm-plex-mono)] bg-gradient-to-r from-[#0891b2] to-[#059669] bg-clip-text text-transparent">
                {k.target}
              </div>
              <div className="text-xs text-[#94a3b8] mt-1">{k.metric}</div>
            </Card>
          );
        })}
      </div>
    </Slide>,

    // ── 9: Sustainability ──
    <Slide key="sustainability">
      <SlideHeader tag="Sustainability" title="Self-Sustaining by Year 2" subtitle="State funding is a one-time catalyst, not a recurring cost." />
      <Card className="p-4 sm:p-6 overflow-x-auto mb-6" accent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5e7eb]">
              <th className="text-left py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Revenue Stream</th>
              <th className="text-right py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Year 1</th>
              <th className="text-right py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Year 2</th>
              <th className="text-right py-2 text-[#94a3b8] font-normal font-[family-name:var(--font-ibm-plex-mono)] text-xs">Year 3</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_STREAMS.map((r) => (
              <tr key={r.stream} className="border-b border-[#e5e7eb]/50">
                <td className="py-2.5 text-[#1e293b]">{r.stream}</td>
                <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#64748b]">{r.y1 ? fmtRM(r.y1) : "—"}</td>
                <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#64748b]">{r.y2 ? fmtRM(r.y2) : "—"}</td>
                <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#059669]">{fmtRM(r.y3)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-[#e5e7eb] font-bold">
              <td className="py-2.5 text-[#1e293b]">Total Revenue</td>
              <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#1e293b]">{fmtRM(totalRevenue("y1"))}</td>
              <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#0891b2]">{fmtRM(totalRevenue("y2"))}</td>
              <td className="py-2.5 text-right font-[family-name:var(--font-ibm-plex-mono)] text-[#059669]">{fmtRM(totalRevenue("y3"))}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Card className="p-5 text-center flex-1" accent>
          <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#0891b2]">Month 18-24</div>
          <div className="text-xs text-[#94a3b8] mt-1">Break-Even Point</div>
        </Card>
        <Card className="p-5 text-center flex-1" accent>
          <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#059669]">{fmtRM(totalRevenue("y3"))}</div>
          <div className="text-xs text-[#94a3b8] mt-1">Year 3 Revenue</div>
        </Card>
        <Card className="p-5 text-center flex-1" accent>
          <div className="text-2xl font-bold font-[family-name:var(--font-ibm-plex-mono)] text-[#d97706]">Permanent</div>
          <div className="text-xs text-[#94a3b8] mt-1">State Dashboard Access</div>
        </Card>
      </div>
    </Slide>,

    // ── 10: Close ──
    <Slide key="close">
      <div className="text-center">
        <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#d97706] py-1.5 px-3 border border-[#d97706]/20 bg-[#d97706]/5 font-[family-name:var(--font-ibm-plex-mono)] mb-6">
          LET&apos;S BUILD THIS
        </span>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold bg-gradient-to-r from-[#0891b2] to-[#059669] bg-clip-text text-transparent leading-tight mb-4">
          Sabah&apos;s Digital Tourism Future
        </h2>
        <p className="text-[#64748b] text-lg mb-10 max-w-xl mx-auto">
          Self-sustaining by Year 2. Dashboard and data belong to the state permanently.
        </p>
        {/* Terms */}
        <Card className="p-6 sm:p-8 max-w-2xl mx-auto text-left mb-8" accent>
          <h3 className="text-sm font-semibold text-[#1e293b] mb-4 font-[family-name:var(--font-ibm-plex-mono)]">TERMS & ACCOUNTABILITY</h3>
          <ul className="space-y-3">
            {TERMS.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-[#64748b]">
                <CheckCircle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </Card>
        {/* Team */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {TEAM.map((t) => {
            const Icon = ICON_MAP[t.icon];
            return (
              <Card key={t.role} className="p-3 text-center">
                {Icon && <Icon className="w-5 h-5 text-[#0891b2] mx-auto mb-1" />}
                <div className="text-xs font-semibold text-[#1e293b]">{t.role}</div>
                <div className="text-[10px] text-[#94a3b8] mt-0.5">{t.desc}</div>
              </Card>
            );
          })}
        </div>
        <p className="text-[#94a3b8] text-xs mt-12 font-[family-name:var(--font-ibm-plex-mono)]">
          Bayu Technologies &bull; Sabah Smart Tourism AI &bull; 2026
        </p>
      </div>
    </Slide>,
  ];

  // ═══════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════

  const SLIDE_LABELS = [
    "Cover", "Problem", "Solution", "Demo", "Core Flow", "Discover",
    "Credits", "Budget", "Compete", "Timeline", "KPIs", "Revenue", "Close",
  ];

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#f8fafc] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide track */}
      <div
        className="h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0">{slide}</div>
        ))}
      </div>

      {/* Nav arrows — left */}
      {current > 0 && (
        <button
          onClick={prev}
          className="fixed left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md flex items-center justify-center text-[#94a3b8] hover:text-[#1e293b] hover:border-[#d1d5db] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {/* Nav arrows — right */}
      {current < TOTAL_SLIDES - 1 && (
        <button
          onClick={next}
          className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#e5e7eb] shadow-md flex items-center justify-center text-[#94a3b8] hover:text-[#1e293b] hover:border-[#d1d5db] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Dot indicators — top center */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={label}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-gradient-to-r from-[#0891b2] to-[#059669]"
                : "w-2 bg-[#94a3b8]/30 hover:bg-[#94a3b8]"
            }`}
            aria-label={`Go to slide ${i + 1}: ${label}`}
          />
        ))}
      </div>

      {/* Slide counter — bottom right */}
      <div className="fixed bottom-4 right-4 z-10 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#94a3b8]">
        {current + 1} / {TOTAL_SLIDES}
      </div>
    </div>
  );
}
