// ── Holiday AI — Investor Proposal Data ──

// ── Types ──

export interface StatItem {
  label: string;
  value: string;
}

export interface PainPoint {
  icon: string;
  title: string;
  description: string;
}

export interface Capability {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface MarketTier {
  label: string;
  sublabel: string;
  value: string;
  size: number; // percentage for concentric circle sizing
  color: string;
}

export interface RevenueStream {
  label: string;
  pct: number;
  color: string;
}

export interface WaterfallItem {
  label: string;
  value: number;
  isSubtotal?: boolean;
  isNegative?: boolean;
}

export interface Competitor {
  name: string;
  weakness: string;
  holidayAI: string;
}

export interface PLRow {
  label: string;
  y1: number;
  y2: number;
  y3: number;
  isHeader?: boolean;
  isTotal?: boolean;
  isBold?: boolean;
  indent?: boolean;
}

export interface GoToMarketPhase {
  phase: string;
  timeline: string;
  market: string;
  items: string[];
  color: string;
}

export interface Milestone {
  metric: string;
  target: string;
}

export interface TeamStage {
  year: string;
  count: number;
  roles: string;
}

export interface TermItem {
  term: string;
  detail: string;
}

export interface FundAllocation {
  label: string;
  pct: number;
  color: string;
}

// ── Cover Slide ──

export const COVER_STATS: StatItem[] = [
  { label: "SEA OTA Market", value: "$40B" },
  { label: "Raising", value: "RM 500K" },
  { label: "Equity Offered", value: "6.67%" },
];

export const TAGLINE = "AI-Powered Travel Planning for Everyone";

// ── Problem Slide ──

export const PAIN_POINTS: PainPoint[] = [
  {
    icon: "Clock",
    title: "Planning takes 10-15 hours",
    description:
      "Travelers spend days switching between apps comparing flights, hotels, activities, and restaurants across multiple platforms.",
  },
  {
    icon: "Layers",
    title: "No end-to-end platform",
    description:
      "Existing tools handle search or booking, not both. Nobody generates a complete, bookable itinerary with real-time pricing.",
  },
  {
    icon: "UserX",
    title: "Limited personalization",
    description:
      "Current solutions ignore dietary needs, accessibility requirements, cultural preferences, and budget constraints.",
  },
];

// ── Solution Slide ──

export const CAPABILITIES: Capability[] = [
  {
    icon: "Brain",
    title: "AI Planning",
    description:
      "Complete itineraries in under 60 seconds with flights, hotels, activities, and restaurants — all with real-time pricing.",
    color: "from-accent-primary to-accent-secondary",
  },
  {
    icon: "Globe",
    title: "Real-Time Booking",
    description:
      "One-tap booking integrated with 25+ travel APIs. Real inventory, real prices, instant confirmation.",
    color: "from-accent-secondary to-accent-tertiary",
  },
  {
    icon: "Calculator",
    title: "Smart Budgeting",
    description:
      "Three-tier options (Budget, Comfort, Luxury) with BNPL integration and travel wallet savings goals.",
    color: "from-accent-tertiary to-accent-warm",
  },
  {
    icon: "Heart",
    title: "Cultural Intelligence",
    description:
      "Halal dining, prayer times, dietary filters, accessibility options, and family-friendly scoring built in.",
    color: "from-accent-warm to-accent-primary",
  },
];

// ── Market Slide ──

export const MARKET_TIERS: MarketTier[] = [
  {
    label: "TAM",
    sublabel: "Global Halal Travel",
    value: "$220B",
    size: 100,
    color: "var(--color-accent-tertiary)",
  },
  {
    label: "SAM",
    sublabel: "SEA OTA Market",
    value: "$33B",
    size: 60,
    color: "var(--color-accent-secondary)",
  },
  {
    label: "SOM (Y1)",
    sublabel: "Malaysia Focus",
    value: "RM 25M",
    size: 25,
    color: "var(--color-accent-primary)",
  },
];

export const SOM_TARGETS: StatItem[] = [
  { label: "Y1 GMV", value: "RM 25M" },
  { label: "Y2 GMV", value: "RM 180M" },
  { label: "Y3 GMV", value: "RM 800M" },
];

// ── Business Model Slide ──

export const REVENUE_STREAMS: RevenueStream[] = [
  { label: "Booking Commission", pct: 55, color: "var(--color-accent-primary)" },
  { label: "B2B SaaS", pct: 20, color: "var(--color-accent-secondary)" },
  { label: "Fintech (BNPL)", pct: 12, color: "var(--color-accent-tertiary)" },
  { label: "Advertising", pct: 8, color: "var(--color-accent-warm)" },
  { label: "Premium", pct: 5, color: "rgba(255,255,255,0.4)" },
];

// ── Unit Economics Slide ──

export const WATERFALL: WaterfallItem[] = [
  { label: "Avg Trip GMV", value: 5000 },
  { label: "Commission Revenue (10%)", value: 500 },
  { label: "BNPL Revenue", value: 35 },
  { label: "Add-on Revenue", value: 40 },
  { label: "Total Revenue", value: 575, isSubtotal: true },
  { label: "COGS (20%)", value: -115, isNegative: true },
  { label: "Gross Profit", value: 460, isSubtotal: true },
  { label: "CAC (blended)", value: -30, isNegative: true },
  { label: "Contribution Margin", value: 430, isSubtotal: true },
];

export const KEY_RATIOS: StatItem[] = [
  { label: "LTV:CAC", value: "15:1" },
  { label: "Gross Margin", value: "80%" },
  { label: "Blended CAC", value: "RM 30" },
  { label: "Payback", value: "<1 mo" },
];

// ── Competitive Landscape Slide ──

export const COMPETITORS: Competitor[] = [
  {
    name: "Traveloka / Agoda",
    weakness: "Search-based — you tell them what you want",
    holidayAI: "AI-generated — we tell you what's best",
  },
  {
    name: "Booking.com",
    weakness: "Accommodation-heavy, no trip planning or itinerary",
    holidayAI: "Full itinerary with flights, stays & activities",
  },
  {
    name: "Trip.com",
    weakness: "OTA with no personalization, generic recommendations",
    holidayAI: "AI-curated plans tailored to your preferences",
  },
  {
    name: "Skyscanner",
    weakness: "Flight comparison only — no hotels, no itinerary",
    holidayAI: "All-in-one: flights + stays + activities in one plan",
  },
  {
    name: "Google Travel",
    weakness: "Aggregator only, no booking, no personalization",
    holidayAI: "End-to-end booking with cultural filters",
  },
  {
    name: "ChatGPT",
    weakness: "Generic, no real-time pricing, no booking",
    holidayAI: "Real inventory, real prices, one-tap booking",
  },
  {
    name: "Travel Agents",
    weakness: "Slow (days), expensive (hidden markup)",
    holidayAI: "60-second plans, transparent pricing",
  },
];

export const DEFENSIBILITY: string[] = [
  "Data flywheel: more users, better AI recommendations, more users",
  "Agent network: 5,000+ agents as distribution channel",
  "Direct supplier contracts for better margins at scale",
  "Fintech lock-in: wallet balance committed to platform",
];

// ── P&L Projection (Slide 7) — Base Case ──

export interface PLLineItem {
  key: string;
  label: string;
  y1: number;
  y2: number;
  y3: number;
  type: "header" | "line" | "total" | "spacer";
  scaleType?: "revenue" | "cogs" | "opex" | "none";
}

export const PL_BASE: PLLineItem[] = [
  { key: "gmv", label: "GMV", y1: 25, y2: 180, y3: 800, type: "line", scaleType: "revenue" },
  { key: "s1", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", scaleType: "none" },
  { key: "rev_header", label: "Revenue", y1: 0, y2: 0, y3: 0, type: "header", scaleType: "none" },
  { key: "commission", label: "Booking Commission", y1: 1.5, y2: 11.0, y3: 44.0, type: "line", scaleType: "revenue" },
  { key: "saas", label: "B2B SaaS", y1: 0.4, y2: 4.5, y3: 15.0, type: "line", scaleType: "revenue" },
  { key: "fintech", label: "Fintech (BNPL + Wallet)", y1: 0.1, y2: 2.0, y3: 10.0, type: "line", scaleType: "revenue" },
  { key: "ads", label: "Advertising", y1: 0.1, y2: 1.5, y3: 6.0, type: "line", scaleType: "revenue" },
  { key: "premium", label: "Consumer Premium", y1: 0.05, y2: 0.5, y3: 4.0, type: "line", scaleType: "revenue" },
  { key: "total_rev", label: "Total Revenue", y1: 2.15, y2: 19.5, y3: 79.0, type: "total", scaleType: "revenue" },
  { key: "s2", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", scaleType: "none" },
  { key: "cogs", label: "COGS", y1: -0.45, y2: -3.9, y3: -15.8, type: "line", scaleType: "cogs" },
  { key: "gross", label: "Gross Profit", y1: 1.7, y2: 15.6, y3: 63.2, type: "total", scaleType: "revenue" },
  { key: "s3", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", scaleType: "none" },
  { key: "opex_header", label: "Operating Expenses", y1: 0, y2: 0, y3: 0, type: "header", scaleType: "none" },
  { key: "engineering", label: "Engineering", y1: -1.2, y2: -2.5, y3: -5.0, type: "line", scaleType: "opex" },
  { key: "marketing", label: "Sales & Marketing", y1: -0.8, y2: -3.0, y3: -8.0, type: "line", scaleType: "opex" },
  { key: "ga", label: "G&A", y1: -0.4, y2: -0.8, y3: -1.5, type: "line", scaleType: "opex" },
  { key: "total_opex", label: "Total OpEx", y1: -2.4, y2: -6.3, y3: -14.5, type: "total", scaleType: "opex" },
  { key: "s4", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", scaleType: "none" },
  { key: "ebitda", label: "EBITDA", y1: -0.7, y2: 9.3, y3: 48.7, type: "total", scaleType: "none" },
];

/**
 * Scale P&L by growth multiplier.
 * Revenue & GMV scale linearly. COGS scales proportionally.
 * OpEx scales at 0.7x rate (operating leverage).
 * EBITDA is recomputed from scaled values.
 */
export function scalePL(multiplier: number): PLLineItem[] {
  const scaled = PL_BASE.map((row) => {
    if (row.type === "spacer" || row.type === "header") return { ...row };
    if (row.scaleType === "revenue") {
      return { ...row, y1: row.y1 * multiplier, y2: row.y2 * multiplier, y3: row.y3 * multiplier };
    }
    if (row.scaleType === "cogs") {
      return { ...row, y1: row.y1 * multiplier, y2: row.y2 * multiplier, y3: row.y3 * multiplier };
    }
    if (row.scaleType === "opex") {
      const opexMul = 1 + (multiplier - 1) * 0.7;
      return { ...row, y1: row.y1 * opexMul, y2: row.y2 * opexMul, y3: row.y3 * opexMul };
    }
    return { ...row };
  });

  // Recompute totals
  const rev = (year: "y1" | "y2" | "y3") =>
    scaled.filter((r) => r.scaleType === "revenue" && r.type === "line").reduce((s, r) => s + r[year], 0);
  const cogs = (year: "y1" | "y2" | "y3") =>
    scaled.find((r) => r.key === "cogs")![year];
  const opex = (year: "y1" | "y2" | "y3") =>
    scaled.filter((r) => r.scaleType === "opex" && r.type === "line").reduce((s, r) => s + r[year], 0);

  for (const row of scaled) {
    if (row.key === "total_rev") {
      row.y1 = rev("y1"); row.y2 = rev("y2"); row.y3 = rev("y3");
    }
    if (row.key === "gross") {
      row.y1 = rev("y1") + cogs("y1");
      row.y2 = rev("y2") + cogs("y2");
      row.y3 = rev("y3") + cogs("y3");
    }
    if (row.key === "total_opex") {
      row.y1 = opex("y1"); row.y2 = opex("y2"); row.y3 = opex("y3");
    }
    if (row.key === "ebitda") {
      row.y1 = rev("y1") + cogs("y1") + opex("y1");
      row.y2 = rev("y2") + cogs("y2") + opex("y2");
      row.y3 = rev("y3") + cogs("y3") + opex("y3");
    }
    if (row.key === "gmv") {
      // GMV scales with revenue multiplier (already done)
    }
  }

  return scaled;
}

/** Compute gross margin % for a given year */
export function grossMargin(pl: PLLineItem[], year: "y1" | "y2" | "y3"): number {
  const totalRev = pl.find((r) => r.key === "total_rev")![year];
  const gross = pl.find((r) => r.key === "gross")![year];
  if (totalRev === 0) return 0;
  return (gross / totalRev) * 100;
}

/** Compute EBITDA margin % for a given year */
export function ebitdaMargin(pl: PLLineItem[], year: "y1" | "y2" | "y3"): number {
  const totalRev = pl.find((r) => r.key === "total_rev")![year];
  const ebitda = pl.find((r) => r.key === "ebitda")![year];
  if (totalRev === 0) return 0;
  return (ebitda / totalRev) * 100;
}

// ── Go-to-Market Slide ──

export const GTM_PHASES: GoToMarketPhase[] = [
  {
    phase: "Phase 1",
    timeline: "M1-6",
    market: "Malaysia",
    items: [
      "Launch on App Store + Play Store",
      "Partner with 10 travel influencers/KOLs",
      "Attend MATTA Fair (100K+ visitors)",
      "Onboard 200 travel agents",
    ],
    color: "var(--color-accent-primary)",
  },
  {
    phase: "Phase 2",
    timeline: "M7-18",
    market: "ASEAN",
    items: [
      "Expand to Singapore, Indonesia, Brunei",
      "Localize currency and payment methods",
      "Partner with regional airlines",
      "1,500 agent subscribers",
    ],
    color: "var(--color-accent-secondary)",
  },
  {
    phase: "Phase 3",
    timeline: "M18-36",
    market: "Global",
    items: [
      "GCC markets (UAE, Saudi, Qatar)",
      "Umrah/Hajj planning features",
      "Arabic language support",
      "5,000 agent network",
    ],
    color: "var(--color-accent-tertiary)",
  },
];

// ── Traction & Milestones Slide ──

export const MILESTONES_12MO: Milestone[] = [
  { metric: "Registered Users", target: "50,000" },
  { metric: "Completed Bookings", target: "5,000" },
  { metric: "GMV", target: "RM 15-20M" },
  { metric: "Agency Partners", target: "50+" },
  { metric: "Regional Markets", target: "1" },
];

export const CURRENT_STATUS: StatItem[] = [
  { label: "Platform", value: "Built (web + mobile)" },
  { label: "TestFlight", value: "Live" },
  { label: "APIs Integrated", value: "25+" },
  { label: "AI Engine", value: "Operational" },
];

// ── Team Slide ──

export const TEAM_SCALING: TeamStage[] = [
  { year: "Y1", count: 8, roles: "2 founders, 3 engineers, 1 AI/ML, 1 designer, 1 growth" },
  { year: "Y2", count: 18, roles: "+backend, mobile, data, sales, ops" },
  { year: "Y3", count: 35, roles: "+regional teams, fintech, customer success" },
];

// ── Investment Calculator (Slide 11) ──

export const FUND_ALLOCATIONS: FundAllocation[] = [
  { label: "Technology", pct: 40, color: "var(--color-accent-primary)" },
  { label: "Marketing", pct: 30, color: "var(--color-accent-secondary)" },
  { label: "Operations", pct: 20, color: "var(--color-accent-tertiary)" },
  { label: "Working Capital", pct: 10, color: "var(--color-accent-warm)" },
];

export const EXIT_MULTIPLES = [5, 6, 7] as const;

export interface InvestmentCalc {
  investment: number;
  preMoney: number;
  postMoney: number;
  equityPct: number;
  foundersRetainPct: number;
}

export function calcInvestment(investmentRM: number, valuationRM: number): InvestmentCalc {
  const postMoney = valuationRM + investmentRM;
  const equityPct = (investmentRM / postMoney) * 100;
  return {
    investment: investmentRM,
    preMoney: valuationRM,
    postMoney,
    equityPct,
    foundersRetainPct: 100 - equityPct,
  };
}

export interface ExitReturn {
  multiple: number;
  y3Valuation: number;
  investorShare: number;
  returnMultiple: number;
}

export function calcExitReturns(
  calc: InvestmentCalc,
  y3Revenue: number,
): ExitReturn[] {
  return EXIT_MULTIPLES.map((multiple) => {
    const y3Valuation = y3Revenue * multiple;
    const investorShare = y3Valuation * (calc.equityPct / 100);
    const returnMultiple = investorShare / calc.investment;
    return { multiple, y3Valuation, investorShare, returnMultiple };
  });
}

/** Build conic-gradient CSS from fund allocations scaled to an investment amount */
export function fundsPieGradient(allocations: FundAllocation[]): string {
  let cumulative = 0;
  const stops = allocations.map((a) => {
    const start = cumulative;
    cumulative += a.pct;
    return `${a.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

// ── Terms Slide ──

export const TERMS: TermItem[] = [
  { term: "Security Type", detail: "Seed Preferred Shares" },
  { term: "Liquidation Preference", detail: "1x non-participating" },
  { term: "Anti-dilution", detail: "Weighted average" },
  { term: "Board", detail: "1 observer seat" },
  { term: "Pro-rata Rights", detail: "Yes, for future rounds" },
  { term: "Information Rights", detail: "Standard quarterly reporting" },
  { term: "ESOP", detail: "10% reserved post-round" },
];

// ── Y3 Base Revenue for exit calc ──
export const Y3_BASE_REVENUE = 79; // RM millions
