// ---------------------------------------------------------------------------
// Gaming in the Sky @ KL Tower — Year 1 P&L Data
// Source: kltower/costing-brief.md (v2) and kltower/revenue-brief.md (v2)
// ---------------------------------------------------------------------------

export type ScenarioKey = "conservative" | "realistic" | "optimistic";

export const SCENARIO_LABELS: Record<ScenarioKey, string> = {
  conservative: "Conservative",
  realistic: "Realistic",
  optimistic: "Optimistic",
};

// ── Cost Categories ────────────────────────────────────────────────────────

export interface CostCategory {
  code: string; // A, B, C...
  name: string;
  total: number; // RM (cash cost — A is venue, fully offset by KL Tower)
  note?: string;
}

export const COST_CATEGORIES: CostCategory[] = [
  {
    code: "A",
    name: "Venue & Facilities",
    total: 0,
    note: "Provided in-kind by KL Tower — venue hire, power, HVAC, BOMBA, cleaning, parking, signage rights.",
  },
  { code: "B", name: "Event Management & Operations", total: 220_000 },
  { code: "C", name: "Main Stage Production", total: 260_000 },
  { code: "D", name: "Side Stage / Community Tournaments", total: 80_000 },
  { code: "E", name: "Broadcast & Streaming", total: 250_000 },
  { code: "F", name: "International Invitational", total: 380_000 },
  { code: "G", name: "Community Tournament Operations", total: 70_000 },
  { code: "H", name: "Hackathon", total: 90_000 },
  { code: "I", name: "LAN Party (BYOC)", total: 140_000 },
  { code: "J", name: "Mini Tech Expo", total: 115_000 },
  { code: "K", name: "Marketing, PR & Content", total: 200_000 },
  { code: "L", name: "Opening / Closing Ceremony", total: 60_000 },
  { code: "M", name: "F&B (Crew, Talent, VIP)", total: 65_000 },
  { code: "N", name: "Tourism & Hospitality", total: 65_000 },
  { code: "O", name: "Insurance, Permits, Contingency", total: 290_000 },
  { code: "P", name: "Pre-Event Activations", total: 50_000 },
  { code: "Q", name: "Tournament Integrity & Welfare", total: 35_000 },
  { code: "R", name: "Post-Event Reporting & Analytics", total: 30_000 },
];

export const TOTAL_GROSS_COST = COST_CATEGORIES.reduce(
  (sum, c) => sum + c.total,
  0,
); // 2,400,000

// ── In-Kind Sponsor Offsets ────────────────────────────────────────────────

export interface InKindOffset {
  partner: string;
  description: string;
  conservative: number;
  realistic: number;
  optimistic: number;
}

export const IN_KIND_OFFSETS: InKindOffset[] = [
  {
    partner: "Title Sponsor",
    description: "Marketing co-spend",
    conservative: 40_000,
    realistic: 80_000,
    optimistic: 120_000,
  },
  {
    partner: "Moonton / Tencent",
    description: "Prize pool subsidy + publisher sanction",
    conservative: 75_000,
    realistic: 150_000,
    optimistic: 200_000,
  },
  {
    partner: "Tourism Malaysia / Airline",
    description: "International team flights + hotels",
    conservative: 50_000,
    realistic: 100_000,
    optimistic: 150_000,
  },
  {
    partner: "Hardware Sponsor",
    description: "LAN PCs + stage rigs (ROG / GIGABYTE / Razer)",
    conservative: 30_000,
    realistic: 60_000,
    optimistic: 80_000,
  },
  {
    partner: "Cloud Sponsor",
    description: "Hackathon API credits (AWS / Vercel / OpenAI)",
    conservative: 15_000,
    realistic: 30_000,
    optimistic: 40_000,
  },
  {
    partner: "Beverage Sponsor",
    description: "Hydration in-kind (100PLUS / Red Bull)",
    conservative: 10_000,
    realistic: 15_000,
    optimistic: 25_000,
  },
  {
    partner: "KL Tower",
    description: "RM 60K cash + venue & facilities (existing partnership)",
    conservative: 30_000,
    realistic: 60_000,
    optimistic: 85_000,
  },
];

export const totalInKindByScenario = (s: ScenarioKey): number =>
  IN_KIND_OFFSETS.reduce((sum, o) => sum + o[s], 0);

// ── Revenue Streams ────────────────────────────────────────────────────────

export interface RevenueStream {
  code: string; // A, B, C...
  name: string;
  conservative: number;
  realistic: number;
  optimistic: number;
  note?: string;
}

export const REVENUE_STREAMS: RevenueStream[] = [
  {
    code: "A",
    name: "Admission / Tickets (incl. KL Tower pass bundle)",
    conservative: 356_650,
    realistic: 512_400,
    optimistic: 809_900,
  },
  {
    code: "B",
    name: "Tournament Entry Fees",
    conservative: 0,
    realistic: 0,
    optimistic: 0,
    note: "Free entry — gated by ticket purchase. Drives footfall.",
  },
  {
    code: "C",
    name: "Hackathon (Sponsor-backed + Demo Day pass)",
    conservative: 3_920,
    realistic: 112_400,
    optimistic: 144_700,
  },
  {
    code: "D",
    name: "LAN Party BYOC Seats",
    conservative: 28_642,
    realistic: 44_845,
    optimistic: 61_645,
  },
  {
    code: "E",
    name: "VIP & Hospitality Upsells",
    conservative: 42_000,
    realistic: 69_785,
    optimistic: 116_460,
  },
  {
    code: "F",
    name: "Exhibitor / Booth Sales",
    conservative: 131_500,
    realistic: 187_000,
    optimistic: 287_000,
  },
  {
    code: "G",
    name: "F&B Concession Revenue Share (15%)",
    conservative: 15_750,
    realistic: 23_625,
    optimistic: 45_000,
  },
  {
    code: "H",
    name: "Merchandise (net margin)",
    conservative: 50_845,
    realistic: 93_510,
    optimistic: 161_900,
  },
  {
    code: "I",
    name: "Tourism Bundles (conditional on MOU)",
    conservative: 0,
    realistic: 32_100,
    optimistic: 61_075,
  },
  {
    code: "J",
    name: "Broadcast / Content (standalone)",
    conservative: 18_500,
    realistic: 37_000,
    optimistic: 65_000,
  },
  {
    code: "K",
    name: "Sponsorship (cash)",
    conservative: 570_000,
    realistic: 1_195_000,
    optimistic: 1_835_000,
  },
];

export const totalRevenueByScenario = (s: ScenarioKey): number =>
  REVENUE_STREAMS.reduce((sum, r) => sum + r[s], 0);

// ── Sponsorship Tier Detail ────────────────────────────────────────────────

export interface SponsorshipTier {
  name: string;
  slots: string;
  unitPrice: string;
  conservative: number;
  realistic: number;
  optimistic: number;
}

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    name: "Title Sponsor",
    slots: "1",
    unitPrice: "RM 250K – 500K",
    conservative: 250_000,
    realistic: 350_000,
    optimistic: 500_000,
  },
  {
    name: "Gold Sponsor",
    slots: "2 – 3",
    unitPrice: "RM 100K – 200K",
    conservative: 100_000,
    realistic: 300_000,
    optimistic: 525_000,
  },
  {
    name: "Silver Sponsor",
    slots: "2 – 5",
    unitPrice: "RM 50K – 100K",
    conservative: 120_000,
    realistic: 260_000,
    optimistic: 400_000,
  },
  {
    name: "Bronze Sponsor",
    slots: "4 – 8",
    unitPrice: "RM 20K – 50K",
    conservative: 100_000,
    realistic: 180_000,
    optimistic: 280_000,
  },
  {
    name: "Hackathon Title Sponsor",
    slots: "1",
    unitPrice: "RM 80K",
    conservative: 0,
    realistic: 80_000,
    optimistic: 80_000,
  },
  {
    name: "Hackathon Track Sponsor",
    slots: "1 – 2",
    unitPrice: "RM 25K",
    conservative: 0,
    realistic: 25_000,
    optimistic: 50_000,
  },
];

// ── Cash Flow Timeline (Realistic Scenario) ────────────────────────────────

export interface CashFlowMonth {
  phase: string;
  monthLabel: string;
  cashIn: number;
  cashOut: number;
}

export const CASH_FLOW_TIMELINE: CashFlowMonth[] = [
  {
    phase: "T-6",
    monthLabel: "Foundation",
    cashIn: 350_000,
    cashOut: 50_000,
  },
  {
    phase: "T-5",
    monthLabel: "Hackathon sponsor + pre-prod",
    cashIn: 80_000,
    cashOut: 80_000,
  },
  {
    phase: "T-4",
    monthLabel: "Tourism MOUs + Gold #1",
    cashIn: 150_000,
    cashOut: 120_000,
  },
  {
    phase: "T-3",
    monthLabel: "Public launch + early-bird",
    cashIn: 250_000,
    cashOut: 200_000,
  },
  {
    phase: "T-2",
    monthLabel: "Activation reg + balance sponsor",
    cashIn: 450_000,
    cashOut: 450_000,
  },
  {
    phase: "T-1",
    monthLabel: "Marketing blitz",
    cashIn: 480_000,
    cashOut: 650_000,
  },
  {
    phase: "Event",
    monthLabel: "Walk-in + onsite",
    cashIn: 547_665,
    cashOut: 355_000,
  },
];

// ── Computed Summaries ─────────────────────────────────────────────────────

export interface ScenarioSummary {
  scenario: ScenarioKey;
  label: string;
  totalRevenue: number;
  grossCost: number;
  inKindOffset: number;
  netCost: number;
  netPL: number;
  netMargin: number;
  sponsorshipCash: number;
  nonSponsorshipRevenue: number;
}

export function computeScenarioSummary(
  scenario: ScenarioKey,
): ScenarioSummary {
  const totalRevenue = totalRevenueByScenario(scenario);
  const grossCost = TOTAL_GROSS_COST;
  const inKindOffset = totalInKindByScenario(scenario);
  const netCost = grossCost - inKindOffset;
  const netPL = totalRevenue - netCost;
  const netMargin = totalRevenue > 0 ? (netPL / totalRevenue) * 100 : 0;
  const sponsorshipCash =
    REVENUE_STREAMS.find((r) => r.code === "K")?.[scenario] ?? 0;
  const nonSponsorshipRevenue = totalRevenue - sponsorshipCash;

  return {
    scenario,
    label: SCENARIO_LABELS[scenario],
    totalRevenue,
    grossCost,
    inKindOffset,
    netCost,
    netPL,
    netMargin,
    sponsorshipCash,
    nonSponsorshipRevenue,
  };
}

// ── Format Helpers ─────────────────────────────────────────────────────────

export function formatRM(value: number, abbreviate = false): string {
  if (abbreviate && Math.abs(value) >= 1_000_000) {
    return `RM ${(value / 1_000_000).toFixed(2)}M`;
  }
  if (abbreviate && Math.abs(value) >= 1_000) {
    return `RM ${(value / 1_000).toFixed(0)}K`;
  }
  return `RM ${value.toLocaleString("en-MY")}`;
}

export function formatPct(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

// ── CSV Export ─────────────────────────────────────────────────────────────

export function generateCSV(): string {
  const rows: string[] = [];
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;

  rows.push("Gaming in the Sky @ KL Tower — Year 1 P&L");
  rows.push("All figures in RM (Ringgit Malaysia)");
  rows.push("");

  // Summary
  rows.push("SCENARIO SUMMARY");
  rows.push("Metric,Conservative,Realistic,Optimistic");
  const c = computeScenarioSummary("conservative");
  const r = computeScenarioSummary("realistic");
  const o = computeScenarioSummary("optimistic");
  rows.push(
    `Total Revenue,${c.totalRevenue},${r.totalRevenue},${o.totalRevenue}`,
  );
  rows.push(
    `Gross Cost,${c.grossCost},${r.grossCost},${o.grossCost}`,
  );
  rows.push(
    `In-Kind Sponsor Offset,${c.inKindOffset},${r.inKindOffset},${o.inKindOffset}`,
  );
  rows.push(`Net Cash Cost,${c.netCost},${r.netCost},${o.netCost}`);
  rows.push(`Net P&L,${c.netPL},${r.netPL},${o.netPL}`);
  rows.push(
    `Net Margin %,${c.netMargin.toFixed(2)}%,${r.netMargin.toFixed(2)}%,${o.netMargin.toFixed(2)}%`,
  );
  rows.push("");

  // Revenue streams
  rows.push("REVENUE STREAMS");
  rows.push("Code,Stream,Conservative,Realistic,Optimistic,Notes");
  REVENUE_STREAMS.forEach((rev) => {
    rows.push(
      [
        rev.code,
        escape(rev.name),
        rev.conservative,
        rev.realistic,
        rev.optimistic,
        escape(rev.note ?? ""),
      ].join(","),
    );
  });
  rows.push(
    `,TOTAL REVENUE,${totalRevenueByScenario("conservative")},${totalRevenueByScenario("realistic")},${totalRevenueByScenario("optimistic")},`,
  );
  rows.push("");

  // Sponsorship breakdown
  rows.push("SPONSORSHIP BREAKDOWN");
  rows.push("Tier,Slots,Unit Price,Conservative,Realistic,Optimistic");
  SPONSORSHIP_TIERS.forEach((t) => {
    rows.push(
      [
        escape(t.name),
        escape(t.slots),
        escape(t.unitPrice),
        t.conservative,
        t.realistic,
        t.optimistic,
      ].join(","),
    );
  });
  rows.push("");

  // Cost categories
  rows.push("COST CATEGORIES");
  rows.push("Code,Category,Cost,Notes");
  COST_CATEGORIES.forEach((cat) => {
    rows.push(
      [
        cat.code,
        escape(cat.name),
        cat.total,
        escape(cat.note ?? ""),
      ].join(","),
    );
  });
  rows.push(`,TOTAL GROSS COST,${TOTAL_GROSS_COST},`);
  rows.push("");

  // In-kind offsets
  rows.push("IN-KIND SPONSOR OFFSETS");
  rows.push("Partner,Description,Conservative,Realistic,Optimistic");
  IN_KIND_OFFSETS.forEach((o) => {
    rows.push(
      [
        escape(o.partner),
        escape(o.description),
        o.conservative,
        o.realistic,
        o.optimistic,
      ].join(","),
    );
  });
  rows.push(
    `,TOTAL IN-KIND OFFSET,${totalInKindByScenario("conservative")},${totalInKindByScenario("realistic")},${totalInKindByScenario("optimistic")}`,
  );
  rows.push("");

  // Cash flow
  rows.push("CASH FLOW TIMELINE (REALISTIC SCENARIO)");
  rows.push("Phase,Activity,Cash In,Cash Out,Net,Cumulative");
  let cumulative = 0;
  CASH_FLOW_TIMELINE.forEach((cf) => {
    const net = cf.cashIn - cf.cashOut;
    cumulative += net;
    rows.push(
      [
        cf.phase,
        escape(cf.monthLabel),
        cf.cashIn,
        cf.cashOut,
        net,
        cumulative,
      ].join(","),
    );
  });

  return rows.join("\n");
}
