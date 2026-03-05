// ── Bayu Sabah — State Government Funding Proposal Data ──

export const TAGLINE = "Sabah Smart Tourism AI Platform";
export const ASK_TOTAL = 3_000_000;

export const COVER_STATS = [
  { value: "RM 3M", label: "Funding Ask" },
  { value: "RM 500K", label: "Bayu Credits" },
  { value: "5-20x", label: "ROI Multiplier" },
  { value: "200+", label: "Local Operators" },
  { value: "7/7", label: "Districts" },
];

// ── Slide 1: The Problem ──
export const PROBLEMS = [
  {
    icon: "Globe",
    title: "Fragmented Ecosystem",
    description:
      "Hundreds of local operators with no unified platform. Travelers rely on TripAdvisor, random Google, or expensive middlemen. 15-25% revenue leaks to OTAs.",
    stat: "RM 2.1B",
    statLabel: "lost to OTA commissions annually",
  },
  {
    icon: "MapPin",
    title: "80/20 District Imbalance",
    description:
      "80% of tourists visit only KK and Semporna. Kudat, Tenom, Keningau, and interior regions have incredible assets but near-zero digital visibility.",
    stat: "80/20",
    statLabel: "tourist concentration problem",
  },
  {
    icon: "Clock",
    title: "No Real-Time Data",
    description:
      "State tourism planning relies on annual surveys with 12-18 month data lag. No visibility into visitor flows, spending patterns, or operator capacity.",
    stat: "12-18mo",
    statLabel: "data lag in current reporting",
  },
  {
    icon: "Smartphone",
    title: "Missing Digital Travelers",
    description:
      "87% of travelers book via mobile. Sabah has no state-level travel app. Sarawak, Langkawi, and Bali are investing heavily in smart tourism.",
    stat: "87%",
    statLabel: "book via mobile",
  },
];

// ── Slide 2: The Solution (Platform Features) ──
export const PLATFORM_FEATURES = [
  {
    icon: "Sparkles",
    title: "iBayu AI Concierge",
    description:
      "Chat-based AI that understands Sabah. Describe your dream trip — iBayu suggests destinations, builds itineraries, checks permits, monitors crowds, and books with local operators.",
    color: "#0891b2",
  },
  {
    icon: "Store",
    title: "Local Operator Marketplace",
    description:
      "Verified directory of 200+ Sabah operators — dive shops, homestays, guides, transport, food tours. 0% commission year 1, then 5% (vs 15-25% OTA).",
    color: "#059669",
  },
  {
    icon: "Brain",
    title: "Sabah-Specific Intelligence",
    description:
      "Real-time crowd monitoring, tide predictions for islands, Sipadan/Kinabalu permit tracking, wildlife sighting alerts, eco-tourism ratings.",
    color: "#7C3AED",
  },
  {
    icon: "BarChart3",
    title: "Government Dashboard",
    description:
      "Real-time analytics: visitor flow by district, spending patterns, seasonal trends, operator performance, credit redemption, sustainability metrics.",
    color: "#0EA5E9",
  },
  {
    icon: "Moon",
    title: "Muslim-Friendly Hub",
    description:
      "Prayer times, qibla direction, JAKIM-certified restaurants, halal food map. Captures the massive $220B Muslim travel market.",
    color: "#059669",
  },
  {
    icon: "Shield",
    title: "Safety & Emergency",
    description:
      "Weather alerts, trail conditions, tide warnings, wildlife advisories. One-tap emergency contacts integrated with Sabah Parks and marine police.",
    color: "#EF4444",
  },
];

// ── Slide 3: Bayu Credits — The Math ──
export const CREDIT_MECHANICS = {
  investment: 500_000,
  creditValue: 500,
  creditQuantity: 1_000,
  minSpendRequired: 1_500,
  avgActualSpend: 3_000,
  redemptionRate: 0.85,
  expiryMonths: 6,
};

export const CREDIT_PROJECTIONS = [
  {
    label: "State Investment",
    value: "RM 500,000",
    detail: "1,000 x RM 500 credits",
    multiplier: "1.0x",
    color: "#64748b",
  },
  {
    label: "Minimum Guaranteed Spend",
    value: "RM 1,500,000",
    detail: "1,000 x RM 1,500 min spend",
    multiplier: "3.0x",
    color: "#059669",
  },
  {
    label: "Realistic Spend",
    value: "RM 2,550,000",
    detail: "850 redeemed x RM 3,000 avg",
    multiplier: "5.1x",
    color: "#0891b2",
  },
  {
    label: "With Tourism Multiplier",
    value: "RM 5.1M - 10.2M",
    detail: "2x-3x secondary spend (F&B, retail, transport)",
    multiplier: "10-20x",
    color: "#d97706",
  },
];

export const CREDIT_RULES = [
  "Redeemable ONLY with Sabah-registered operators",
  "Minimum trip spend of RM 1,500 to activate RM 500 credit",
  "Malaysian IC holders only (domestic tourism boost)",
  "Credits expire in 6 months — drives urgency",
  "Full audit trail via digital ledger",
  "Can be district-targeted to spread tourism",
];

export const CREDIT_INSIGHT =
  "People don't travel to Sabah to spend exactly RM 1,500. They book flights (RM 400-800), accommodation (RM 600-2,000), activities (RM 300-1,500), food & shopping (RM 300-1,000). The RM 500 credit is the NUDGE — actual spend is 3x-6x higher. Every ringgit goes directly to Sabah operators.";

// ── Slide 4: Budget Breakdown ──
export const FUND_ALLOCATIONS = [
  { label: "Platform Development", amount: 1_200_000, pct: 40, color: "#0891b2", icon: "Code" },
  { label: "Bayu Credit Stimulus", amount: 500_000, pct: 17, color: "#059669", icon: "Wallet" },
  { label: "Marketing & Launch", amount: 500_000, pct: 17, color: "#7C3AED", icon: "Megaphone" },
  { label: "Operator Onboarding", amount: 400_000, pct: 13, color: "#d97706", icon: "Users" },
  { label: "Cloud & Security", amount: 250_000, pct: 8, color: "#0EA5E9", icon: "Cloud" },
  { label: "Operations & Contingency", amount: 150_000, pct: 5, color: "#6B7280", icon: "Settings" },
];

export const PLATFORM_DEV_ITEMS = [
  "Mobile app (iOS + Android) — Expo/React Native",
  "AI concierge (iBayu) with natural language",
  "Government tourism dashboard & analytics",
  "Operator marketplace & booking engine",
  "Payment gateway (FPX, e-wallets, BNPL)",
  "Multi-language (BM, English, Mandarin)",
];

export const OPERATOR_ITEMS = [
  "200 operators across 7 districts",
  "Digital literacy workshops (2-day program)",
  "Smartphone/tablet grants for rural operators",
  "Photography & listing optimization training",
  "Halal compliance & safety certification",
  "12-month helpdesk support",
];

export const MARKETING_ITEMS = [
  "National digital campaign (Meta, Google, TikTok)",
  "10 travel KOL/influencer partnerships",
  "MATTA Fair & Sabah Fest booth",
  "PR: national media + travel publications",
  "App Store optimization & launch event",
];

// ── Slide 5: Competitive Advantage ──
export const COMPETITORS = [
  {
    name: "Booking.com / Agoda",
    commission: "15-25%",
    localFocus: "None",
    govDash: false,
    sabahAI: false,
  },
  {
    name: "TripAdvisor",
    commission: "Ads-based",
    localFocus: "Minimal",
    govDash: false,
    sabahAI: false,
  },
  {
    name: "Klook / KKDay",
    commission: "20-30%",
    localFocus: "Activity only",
    govDash: false,
    sabahAI: false,
  },
];

export const BAYU_ADVANTAGES = [
  "0-5% commission (vs 15-30% OTA)",
  "100% Sabah-focused with local intelligence",
  "State government tourism dashboard",
  "AI concierge trained on Sabah knowledge",
  "Crowd monitoring, permits, tides, wildlife",
  "Digital wallet stimulus (Bayu Credits)",
];

export const VOUCHER_COMPARISON = [
  { method: "Traditional vouchers", roi: "1.5-2x", leakage: "High (redeemed anywhere)", tracking: "None" },
  { method: "Bayu Credits", roi: "5-20x", leakage: "Zero (Sabah only)", tracking: "Real-time dashboard" },
];

// ── Slide 6: Timeline ──
export const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Foundation",
    duration: "Month 1-3",
    color: "#0891b2",
    items: [
      "Core platform MVP complete",
      "iBayu AI concierge v1",
      "50 operators onboarded (KK + Semporna)",
      "Bayu Credit system activated",
      "Beta launch (TestFlight / Play Store)",
    ],
  },
  {
    phase: "Phase 2",
    title: "State-Wide Rollout",
    duration: "Month 4-6",
    color: "#059669",
    items: [
      "200+ operators across all 7 districts",
      "Government dashboard live",
      "National marketing campaign",
      "1,000 Bayu Credits distributed",
      "Public App Store + Play Store launch",
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale & Sustain",
    duration: "Month 7-12",
    color: "#d97706",
    items: [
      "Advanced AI (multilingual, voice)",
      "International markets (SG, BN, CN)",
      "Sustainability scoring & eco-cert",
      "B2B agent tools for agencies",
      "Revenue model activated",
    ],
  },
];

// ── Slide 7: KPIs ──
export const KPIS = [
  { metric: "App Downloads", target: "50,000", icon: "Download" },
  { metric: "Monthly Active Users", target: "10,000", icon: "Users" },
  { metric: "Operators Onboarded", target: "200+", icon: "Store" },
  { metric: "Credits Redeemed", target: "850 / 1,000", icon: "Wallet" },
  { metric: "Tourism Spend (platform)", target: "RM 2.5M+", icon: "TrendingUp" },
  { metric: "Districts Covered", target: "7 / 7", icon: "MapPin" },
  { metric: "App Rating", target: "4.5+ stars", icon: "Star" },
  { metric: "Dashboard Uptime", target: "99.9%", icon: "Shield" },
];

// ── Slide 8: Sustainability / Revenue ──
export const REVENUE_STREAMS = [
  { stream: "Operator Commission (5%)", y1: 125_000, y2: 500_000, y3: 1_200_000 },
  { stream: "Premium Listings", y1: 50_000, y2: 200_000, y3: 500_000 },
  { stream: "User Credit Top-ups", y1: 0, y2: 300_000, y3: 800_000 },
  { stream: "Data & Analytics", y1: 0, y2: 100_000, y3: 300_000 },
  { stream: "B2B Agent Tools (SaaS)", y1: 0, y2: 150_000, y3: 400_000 },
];

export function totalRevenue(year: "y1" | "y2" | "y3") {
  return REVENUE_STREAMS.reduce((sum, r) => sum + r[year], 0);
}

// ── Slide 9: Team ──
export const TEAM = [
  { role: "Project Lead / Product", icon: "User", desc: "Vision, stakeholder management, delivery" },
  { role: "Lead Developer (Full Stack)", icon: "Code", desc: "Architecture, AI, technical execution" },
  { role: "Mobile Developer", icon: "Smartphone", desc: "iOS & Android (Expo/React Native)" },
  { role: "UI/UX Designer", icon: "Palette", desc: "Experience, brand, interface" },
  { role: "Operator Relations", icon: "Users", desc: "District outreach, onboarding, training" },
  { role: "Marketing & Growth", icon: "Megaphone", desc: "Digital marketing, KOL, acquisition" },
];

// ── Slide 10: Terms ──
export const TERMS = [
  "Funding disbursed in 3 tranches: 40% approval, 30% Phase 2, 30% Phase 3",
  "Quarterly progress reports with full financial transparency",
  "IP co-owned by state and development team",
  "Platform data belongs to the state permanently",
  "KPIs auditable by state-appointed auditor at any time",
  "Source code held in escrow for state continuity",
];

// ── Helpers ──
export function fmtRM(n: number): string {
  if (n >= 1_000_000) return `RM ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `RM ${(n / 1_000).toFixed(0)}K`;
  return `RM ${n.toLocaleString()}`;
}

export function fundsPieGradient(): string {
  let cumPct = 0;
  const stops = FUND_ALLOCATIONS.map((a) => {
    const start = cumPct;
    cumPct += a.pct;
    return `${a.color} ${start}% ${cumPct}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}
