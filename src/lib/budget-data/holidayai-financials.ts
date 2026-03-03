// ── Holiday AI — Financial Analysis Data Layer ──
// All financial statements derive from the Assumptions object via pure functions.

import {
  type PLLineItem,
  type FundAllocation,
  PL_BASE,
  FUND_ALLOCATIONS,
  EXIT_MULTIPLES,
} from "./holidayai";

// ── Types ──

export type Scenario = "conservative" | "base" | "aggressive";

export interface Assumptions {
  scenario: Scenario;
  growthMultiplier: number;
  // Conversion & take rates by year
  conversionRates: [number, number, number]; // % plan-to-book Y1/Y2/Y3
  takeRates: [number, number, number]; // % blended take rate Y1/Y2/Y3
  // COGS breakdown (% of revenue)
  cogsAI: number;
  cogsPayment: number;
  cogsCloud: number;
  cogsSupport: number;
  // OpEx (RM millions per year)
  opexEngineering: [number, number, number];
  opexMarketing: [number, number, number];
  opexGA: [number, number, number];
  // Operations
  mau: [number, number, number];
  tripsBooked: [number, number, number];
  b2bSubs: [number, number, number];
  proSubs: [number, number, number];
  headcount: [number, number, number];
  // Working capital
  receivableDays: number;
  payableDays: number;
  capex: [number, number, number]; // RM millions
  // Cap table
  currentRaise: number; // RM
  currentValuation: number; // RM pre-money
  seedRaiseRange: [number, number]; // RM min/max
  seedValuationRange: [number, number];
  seriesARaiseRange: [number, number];
  seriesAValuationRange: [number, number];
  fundAllocation: FundAllocation[];
}

export interface FinancialRow {
  key: string;
  label: string;
  y1: number;
  y2: number;
  y3: number;
  type: "header" | "line" | "total" | "spacer";
}

export interface CashFlowRow {
  key: string;
  label: string;
  y1: number;
  y2: number;
  y3: number;
  type: "header" | "line" | "total" | "spacer";
}

export interface BalanceSheetRow {
  key: string;
  label: string;
  y1: number;
  y2: number;
  y3: number;
  type: "header" | "line" | "total" | "spacer";
  side: "asset" | "liability" | "both";
}

export interface UnitEconItem {
  label: string;
  value: number;
  isSubtotal?: boolean;
  isNegative?: boolean;
}

export interface CACChannel {
  channel: string;
  cac: number;
  ltv: number;
  ratio: number;
  color: string;
}

export interface DilutionRound {
  round: string;
  raise: number;
  valuation: number;
  newEquity: number;
  founderPct: number;
  investorPct: number;
  cumulativeInvestorPct: number;
}

// ── Constants ──

export const DEFAULT_ASSUMPTIONS: Assumptions = {
  scenario: "base",
  growthMultiplier: 1.0,
  conversionRates: [8, 10, 12],
  takeRates: [8.6, 10.8, 9.9],
  cogsAI: 6.5,
  cogsPayment: 2.5,
  cogsCloud: 4.0,
  cogsSupport: 5.0,
  opexEngineering: [1.2, 2.5, 5.0],
  opexMarketing: [0.8, 3.0, 8.0],
  opexGA: [0.4, 0.8, 1.5],
  mau: [50000, 250000, 1000000],
  tripsBooked: [5000, 36000, 160000],
  b2bSubs: [200, 1500, 5000],
  proSubs: [500, 5000, 30000],
  headcount: [8, 18, 35],
  receivableDays: 30,
  payableDays: 45,
  capex: [0.2, 0.5, 1.0],
  currentRaise: 500000,
  currentValuation: 7000000,
  seedRaiseRange: [3000000, 5000000],
  seedValuationRange: [25000000, 35000000],
  seriesARaiseRange: [25000000, 40000000],
  seriesAValuationRange: [150000000, 200000000],
  fundAllocation: [...FUND_ALLOCATIONS],
};

export const SCENARIO_PRESETS: Record<Scenario, Partial<Assumptions>> = {
  conservative: {
    scenario: "conservative",
    growthMultiplier: 0.7,
    conversionRates: [6, 8, 9],
    takeRates: [7.5, 9.0, 8.5],
    mau: [30000, 150000, 600000],
    tripsBooked: [3000, 22000, 100000],
    b2bSubs: [100, 800, 3000],
    proSubs: [250, 2500, 15000],
  },
  base: {
    scenario: "base",
    growthMultiplier: 1.0,
  },
  aggressive: {
    scenario: "aggressive",
    growthMultiplier: 1.5,
    conversionRates: [10, 14, 18],
    takeRates: [10, 12, 11.5],
    mau: [80000, 400000, 1500000],
    tripsBooked: [8000, 55000, 250000],
    b2bSubs: [350, 2500, 8000],
    proSubs: [1000, 10000, 50000],
  },
};

export const COGS_SEGMENTS = [
  { key: "ai", label: "AI Compute", color: "#059669" },
  { key: "payment", label: "Payment Processing", color: "#d97706" },
  { key: "cloud", label: "Cloud Infra", color: "#0891b2" },
  { key: "support", label: "Customer Support", color: "#7c3aed" },
] as const;

export const CAC_CHANNELS: CACChannel[] = [
  { channel: "Organic / SEO", cac: 15, ltv: 450, ratio: 30, color: "#059669" },
  { channel: "Social Media Ads", cac: 35, ltv: 450, ratio: 12.9, color: "#0891b2" },
  { channel: "Influencer / KOL", cac: 25, ltv: 450, ratio: 18, color: "#d97706" },
  { channel: "Google Ads", cac: 60, ltv: 450, ratio: 7.5, color: "#dc2626" },
  { channel: "B2B Trade Shows", cac: 300, ltv: 7500, ratio: 25, color: "#7c3aed" },
];

export const PL_REVENUE_BASE = {
  commission: { y1: 1.5, y2: 11.0, y3: 44.0 },
  saas: { y1: 0.4, y2: 4.5, y3: 15.0 },
  fintech: { y1: 0.1, y2: 2.0, y3: 10.0 },
  ads: { y1: 0.1, y2: 1.5, y3: 6.0 },
  premium: { y1: 0.05, y2: 0.5, y3: 4.0 },
} as const;

// ── Calculator Functions ──

/**
 * Compute full P&L from assumptions.
 * Revenue scales by growthMultiplier. COGS derived from % breakdown.
 * OpEx scales at 0.7x leverage rate. Totals recomputed.
 */
export function computePL(a: Assumptions): FinancialRow[] {
  const m = a.growthMultiplier;
  const opexM = 1 + (m - 1) * 0.7;
  const totalCogsPct = (a.cogsAI + a.cogsPayment + a.cogsCloud + a.cogsSupport) / 100;

  // Revenue streams scaled
  const commission = { y1: PL_REVENUE_BASE.commission.y1 * m, y2: PL_REVENUE_BASE.commission.y2 * m, y3: PL_REVENUE_BASE.commission.y3 * m };
  const saas = { y1: PL_REVENUE_BASE.saas.y1 * m, y2: PL_REVENUE_BASE.saas.y2 * m, y3: PL_REVENUE_BASE.saas.y3 * m };
  const fintech = { y1: PL_REVENUE_BASE.fintech.y1 * m, y2: PL_REVENUE_BASE.fintech.y2 * m, y3: PL_REVENUE_BASE.fintech.y3 * m };
  const ads = { y1: PL_REVENUE_BASE.ads.y1 * m, y2: PL_REVENUE_BASE.ads.y2 * m, y3: PL_REVENUE_BASE.ads.y3 * m };
  const premium = { y1: PL_REVENUE_BASE.premium.y1 * m, y2: PL_REVENUE_BASE.premium.y2 * m, y3: PL_REVENUE_BASE.premium.y3 * m };

  const totalRev = {
    y1: commission.y1 + saas.y1 + fintech.y1 + ads.y1 + premium.y1,
    y2: commission.y2 + saas.y2 + fintech.y2 + ads.y2 + premium.y2,
    y3: commission.y3 + saas.y3 + fintech.y3 + ads.y3 + premium.y3,
  };

  const cogs = { y1: -totalRev.y1 * totalCogsPct, y2: -totalRev.y2 * totalCogsPct, y3: -totalRev.y3 * totalCogsPct };
  const grossProfit = { y1: totalRev.y1 + cogs.y1, y2: totalRev.y2 + cogs.y2, y3: totalRev.y3 + cogs.y3 };

  const eng = { y1: -a.opexEngineering[0] * opexM, y2: -a.opexEngineering[1] * opexM, y3: -a.opexEngineering[2] * opexM };
  const mkt = { y1: -a.opexMarketing[0] * opexM, y2: -a.opexMarketing[1] * opexM, y3: -a.opexMarketing[2] * opexM };
  const ga = { y1: -a.opexGA[0] * opexM, y2: -a.opexGA[1] * opexM, y3: -a.opexGA[2] * opexM };
  const totalOpex = { y1: eng.y1 + mkt.y1 + ga.y1, y2: eng.y2 + mkt.y2 + ga.y2, y3: eng.y3 + mkt.y3 + ga.y3 };
  const ebitda = { y1: grossProfit.y1 + totalOpex.y1, y2: grossProfit.y2 + totalOpex.y2, y3: grossProfit.y3 + totalOpex.y3 };

  const gmv = { y1: 25 * m, y2: 180 * m, y3: 800 * m };

  return [
    { key: "gmv", label: "GMV", ...gmv, type: "line" },
    { key: "s1", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "rev_header", label: "Revenue", y1: 0, y2: 0, y3: 0, type: "header" },
    { key: "commission", label: "Booking Commission", ...commission, type: "line" },
    { key: "saas", label: "B2B SaaS", ...saas, type: "line" },
    { key: "fintech", label: "Fintech (BNPL + Wallet)", ...fintech, type: "line" },
    { key: "ads", label: "Advertising", ...ads, type: "line" },
    { key: "premium", label: "Consumer Premium", ...premium, type: "line" },
    { key: "total_rev", label: "Total Revenue", ...totalRev, type: "total" },
    { key: "s2", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "cogs", label: "COGS", ...cogs, type: "line" },
    { key: "gross", label: "Gross Profit", ...grossProfit, type: "total" },
    { key: "s3", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "opex_header", label: "Operating Expenses", y1: 0, y2: 0, y3: 0, type: "header" },
    { key: "engineering", label: "Engineering", ...eng, type: "line" },
    { key: "marketing", label: "Sales & Marketing", ...mkt, type: "line" },
    { key: "ga", label: "G&A", ...ga, type: "line" },
    { key: "total_opex", label: "Total OpEx", ...totalOpex, type: "total" },
    { key: "s4", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "ebitda", label: "EBITDA", ...ebitda, type: "total" },
  ];
}

/** Extract a value from P&L by key */
function plVal(pl: FinancialRow[], key: string, year: "y1" | "y2" | "y3"): number {
  return pl.find((r) => r.key === key)?.[year] ?? 0;
}

/**
 * Compute Cash Flow Statement from P&L + Assumptions.
 * Operating: EBITDA ± working capital changes
 * Investing: capex
 * Financing: equity raises
 */
export function computeCashFlow(pl: FinancialRow[], a: Assumptions): CashFlowRow[] {
  const ebitda = (y: "y1" | "y2" | "y3") => plVal(pl, "ebitda", y);
  const rev = (y: "y1" | "y2" | "y3") => plVal(pl, "total_rev", y);

  // Working capital changes (simplified)
  const wcChange = (y: "y1" | "y2" | "y3") => {
    const receivables = (rev(y) * a.receivableDays) / 365;
    const payables = (Math.abs(plVal(pl, "cogs", y)) * a.payableDays) / 365;
    // Y1 is the initial buildup, Y2/Y3 is the delta — simplified as fraction of revenue growth
    return payables - receivables;
  };

  const opCF = (y: "y1" | "y2" | "y3") => ebitda(y) + wcChange(y);
  const invCF = (y: "y1" | "y2" | "y3", i: number) => -a.capex[i];
  const finCF = { y1: a.currentRaise / 1000000, y2: 0, y3: 0 }; // seed raise in Y1

  const netChange = {
    y1: opCF("y1") + invCF("y1", 0) + finCF.y1,
    y2: opCF("y2") + invCF("y2", 1) + finCF.y2,
    y3: opCF("y3") + invCF("y3", 2) + finCF.y3,
  };

  const beginCash = { y1: 0.1, y2: 0, y3: 0 }; // small starting cash
  beginCash.y2 = beginCash.y1 + netChange.y1;
  beginCash.y3 = beginCash.y2 + netChange.y2;

  const endCash = {
    y1: beginCash.y1 + netChange.y1,
    y2: beginCash.y2 + netChange.y2,
    y3: beginCash.y3 + netChange.y3,
  };

  return [
    { key: "begin_cash", label: "Beginning Cash", y1: beginCash.y1, y2: beginCash.y2, y3: beginCash.y3, type: "line" },
    { key: "s1", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "op_header", label: "Operating Activities", y1: 0, y2: 0, y3: 0, type: "header" },
    { key: "ebitda_cf", label: "EBITDA", y1: ebitda("y1"), y2: ebitda("y2"), y3: ebitda("y3"), type: "line" },
    { key: "wc_change", label: "Working Capital Changes", y1: wcChange("y1"), y2: wcChange("y2"), y3: wcChange("y3"), type: "line" },
    { key: "op_cf", label: "Operating Cash Flow", y1: opCF("y1"), y2: opCF("y2"), y3: opCF("y3"), type: "total" },
    { key: "s2", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "inv_header", label: "Investing Activities", y1: 0, y2: 0, y3: 0, type: "header" },
    { key: "capex", label: "Capital Expenditure", y1: invCF("y1", 0), y2: invCF("y2", 1), y3: invCF("y3", 2), type: "line" },
    { key: "inv_cf", label: "Investing Cash Flow", y1: invCF("y1", 0), y2: invCF("y2", 1), y3: invCF("y3", 2), type: "total" },
    { key: "s3", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "fin_header", label: "Financing Activities", y1: 0, y2: 0, y3: 0, type: "header" },
    { key: "equity", label: "Equity Raised", y1: finCF.y1, y2: finCF.y2, y3: finCF.y3, type: "line" },
    { key: "fin_cf", label: "Financing Cash Flow", y1: finCF.y1, y2: finCF.y2, y3: finCF.y3, type: "total" },
    { key: "s4", label: "", y1: 0, y2: 0, y3: 0, type: "spacer" },
    { key: "net_change", label: "Net Change in Cash", y1: netChange.y1, y2: netChange.y2, y3: netChange.y3, type: "total" },
    { key: "end_cash", label: "Ending Cash", y1: endCash.y1, y2: endCash.y2, y3: endCash.y3, type: "total" },
  ];
}

/**
 * Compute Balance Sheet from Cash Flow + P&L.
 * Assets = Cash + Receivables + PP&E
 * Liabilities = Payables + Deferred Revenue
 * Equity = Share Capital + Retained Earnings (plug)
 */
export function computeBalanceSheet(
  cf: CashFlowRow[],
  pl: FinancialRow[],
  a: Assumptions,
): BalanceSheetRow[] {
  const cash = (y: "y1" | "y2" | "y3") => cf.find((r) => r.key === "end_cash")?.[y] ?? 0;
  const rev = (y: "y1" | "y2" | "y3") => plVal(pl, "total_rev", y);
  const cogsAbs = (y: "y1" | "y2" | "y3") => Math.abs(plVal(pl, "cogs", y));

  const receivables = (y: "y1" | "y2" | "y3") => (rev(y) * a.receivableDays) / 365;
  const ppe = (y: "y1" | "y2" | "y3", i: number) => a.capex[i] * 0.8; // net of depreciation
  const totalAssets = (y: "y1" | "y2" | "y3", i: number) => cash(y) + receivables(y) + ppe(y, i);

  const payables = (y: "y1" | "y2" | "y3") => (cogsAbs(y) * a.payableDays) / 365;
  const deferredRev = (y: "y1" | "y2" | "y3") => rev(y) * 0.05; // 5% deferred

  const shareCapital = a.currentRaise / 1000000;
  const retainedEarnings = (y: "y1" | "y2" | "y3", i: number) => {
    // Equity = Total Assets - Total Liabilities
    const tA = totalAssets(y, i);
    const tL = payables(y) + deferredRev(y);
    return tA - tL - shareCapital;
  };

  const totalEquity = (y: "y1" | "y2" | "y3", i: number) => shareCapital + retainedEarnings(y, i);
  const totalLE = (y: "y1" | "y2" | "y3", i: number) => payables(y) + deferredRev(y) + totalEquity(y, i);

  return [
    { key: "a_header", label: "Assets", y1: 0, y2: 0, y3: 0, type: "header", side: "asset" },
    { key: "cash", label: "Cash & Equivalents", y1: cash("y1"), y2: cash("y2"), y3: cash("y3"), type: "line", side: "asset" },
    { key: "receivables", label: "Accounts Receivable", y1: receivables("y1"), y2: receivables("y2"), y3: receivables("y3"), type: "line", side: "asset" },
    { key: "ppe", label: "PP&E (Net)", y1: ppe("y1", 0), y2: ppe("y2", 1), y3: ppe("y3", 2), type: "line", side: "asset" },
    { key: "total_assets", label: "Total Assets", y1: totalAssets("y1", 0), y2: totalAssets("y2", 1), y3: totalAssets("y3", 2), type: "total", side: "asset" },
    { key: "s1", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", side: "both" },
    { key: "l_header", label: "Liabilities", y1: 0, y2: 0, y3: 0, type: "header", side: "liability" },
    { key: "payables", label: "Accounts Payable", y1: payables("y1"), y2: payables("y2"), y3: payables("y3"), type: "line", side: "liability" },
    { key: "deferred", label: "Deferred Revenue", y1: deferredRev("y1"), y2: deferredRev("y2"), y3: deferredRev("y3"), type: "line", side: "liability" },
    { key: "s2", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", side: "both" },
    { key: "e_header", label: "Equity", y1: 0, y2: 0, y3: 0, type: "header", side: "liability" },
    { key: "share_capital", label: "Share Capital", y1: shareCapital, y2: shareCapital, y3: shareCapital, type: "line", side: "liability" },
    { key: "retained", label: "Retained Earnings", y1: retainedEarnings("y1", 0), y2: retainedEarnings("y2", 1), y3: retainedEarnings("y3", 2), type: "line", side: "liability" },
    { key: "total_equity", label: "Total Equity", y1: totalEquity("y1", 0), y2: totalEquity("y2", 1), y3: totalEquity("y3", 2), type: "total", side: "liability" },
    { key: "s3", label: "", y1: 0, y2: 0, y3: 0, type: "spacer", side: "both" },
    { key: "total_le", label: "Total Liabilities + Equity", y1: totalLE("y1", 0), y2: totalLE("y2", 1), y3: totalLE("y3", 2), type: "total", side: "both" },
  ];
}

/**
 * Compute Unit Economics — per-trip waterfall + sensitivity scenarios.
 */
export function computeUnitEconomics(a: Assumptions): {
  waterfall: UnitEconItem[];
  b2cMetrics: { label: string; value: string }[];
  b2bMetrics: { label: string; value: string }[];
  sensitivity: { scenario: string; label: string; cm: number; delta: number }[];
} {
  const avgGMV = 5000;
  const commissionRate = a.takeRates[2] / 100; // use Y3 take rate
  const commissionRev = avgGMV * commissionRate;
  const bnplRev = 35;
  const addonRev = 40;
  const totalRevPerTrip = commissionRev + bnplRev + addonRev;
  const cogsPct = (a.cogsAI + a.cogsPayment + a.cogsCloud + a.cogsSupport) / 100;
  const cogsPerTrip = totalRevPerTrip * cogsPct;
  const grossProfitPerTrip = totalRevPerTrip - cogsPerTrip;
  const blendedCAC = 30;
  const cm = grossProfitPerTrip - blendedCAC;

  const waterfall: UnitEconItem[] = [
    { label: "Avg Trip GMV", value: avgGMV },
    { label: `Commission Revenue (${(commissionRate * 100).toFixed(1)}%)`, value: commissionRev },
    { label: "BNPL Revenue", value: bnplRev },
    { label: "Add-on Revenue", value: addonRev },
    { label: "Total Revenue / Trip", value: totalRevPerTrip, isSubtotal: true },
    { label: `COGS (${(cogsPct * 100).toFixed(0)}%)`, value: -cogsPerTrip, isNegative: true },
    { label: "Gross Profit / Trip", value: grossProfitPerTrip, isSubtotal: true },
    { label: "CAC (blended)", value: -blendedCAC, isNegative: true },
    { label: "Contribution Margin", value: cm, isSubtotal: true },
  ];

  const b2cMetrics = [
    { label: "LTV:CAC", value: `${(grossProfitPerTrip * 1.8 / blendedCAC).toFixed(0)}:1` },
    { label: "Gross Margin", value: `${((grossProfitPerTrip / totalRevPerTrip) * 100).toFixed(0)}%` },
    { label: "Blended CAC", value: `RM ${blendedCAC}` },
    { label: "Payback", value: "<1 mo" },
  ];

  const b2bMetrics = [
    { label: "Monthly ARPU", value: "RM 400" },
    { label: "LTV (30mo)", value: "RM 10,200" },
    { label: "CAC", value: "RM 300" },
    { label: "LTV:CAC", value: "34:1" },
  ];

  // Sensitivity analysis
  const baseCM = cm;
  const convDrop = (() => {
    const newRate = (a.takeRates[2] - 2) / 100;
    const newRev = avgGMV * newRate + bnplRev + addonRev;
    return newRev * (1 - cogsPct) - blendedCAC;
  })();
  const cacIncrease = (() => {
    return grossProfitPerTrip - blendedCAC * 1.5;
  })();
  const takeRateDrop = (() => {
    const newRate = (a.takeRates[2] - 1) / 100;
    const newRev = avgGMV * newRate + bnplRev + addonRev;
    return newRev * (1 - cogsPct) - blendedCAC;
  })();

  const sensitivity = [
    { scenario: "base", label: "Base Case", cm: baseCM, delta: 0 },
    { scenario: "conv_drop", label: "Take Rate −2%", cm: convDrop, delta: convDrop - baseCM },
    { scenario: "cac_up", label: "CAC +50%", cm: cacIncrease, delta: cacIncrease - baseCM },
    { scenario: "take_drop", label: "Take Rate −1%", cm: takeRateDrop, delta: takeRateDrop - baseCM },
  ];

  return { waterfall, b2cMetrics, b2bMetrics, sensitivity };
}

/**
 * Compute ROI: equity calc, exit matrix, dilution modeling.
 */
export function computeROI(
  investment: number,
  valuation: number,
  pl: FinancialRow[],
  a: Assumptions,
): {
  equity: { postMoney: number; equityPct: number; foundersRetain: number };
  scenarioComparison: { scenario: string; y3Revenue: number; y3EBITDA: number }[];
  exitMatrix: { multiple: number; conservative: number; base: number; aggressive: number }[];
  dilution: DilutionRound[];
  fundAllocation: { label: string; amount: number; pct: number; color: string }[];
} {
  const postMoney = valuation + investment;
  const equityPct = (investment / postMoney) * 100;
  const foundersRetain = 100 - equityPct;

  // Scenario comparison
  const scenarios: { scenario: string; mul: number }[] = [
    { scenario: "Conservative", mul: 0.7 },
    { scenario: "Base", mul: 1.0 },
    { scenario: "Aggressive", mul: 1.5 },
  ];

  const scenarioComparison = scenarios.map(({ scenario, mul }) => {
    const cogsPct = (a.cogsAI + a.cogsPayment + a.cogsCloud + a.cogsSupport) / 100;
    const opexM = 1 + (mul - 1) * 0.7;
    const y3Rev =
      (PL_REVENUE_BASE.commission.y3 +
        PL_REVENUE_BASE.saas.y3 +
        PL_REVENUE_BASE.fintech.y3 +
        PL_REVENUE_BASE.ads.y3 +
        PL_REVENUE_BASE.premium.y3) * mul;
    const y3COGS = y3Rev * cogsPct;
    const y3Opex = (a.opexEngineering[2] + a.opexMarketing[2] + a.opexGA[2]) * opexM;
    const y3EBITDA = y3Rev - y3COGS - y3Opex;
    return { scenario, y3Revenue: y3Rev, y3EBITDA };
  });

  // Exit matrix
  const multiples = [5, 6, 7];
  const exitMatrix = multiples.map((multiple) => ({
    multiple,
    conservative: scenarioComparison[0].y3Revenue * multiple * (equityPct / 100),
    base: scenarioComparison[1].y3Revenue * multiple * (equityPct / 100),
    aggressive: scenarioComparison[2].y3Revenue * multiple * (equityPct / 100),
  }));

  // Dilution modeling
  const seedMid = (a.seedRaiseRange[0] + a.seedRaiseRange[1]) / 2;
  const seedValMid = (a.seedValuationRange[0] + a.seedValuationRange[1]) / 2;
  const seriesAMid = (a.seriesARaiseRange[0] + a.seriesARaiseRange[1]) / 2;
  const seriesAValMid = (a.seriesAValuationRange[0] + a.seriesAValuationRange[1]) / 2;

  const currentEquity = equityPct;
  const seedEquity = (seedMid / (seedValMid + seedMid)) * 100;
  const seriesAEquity = (seriesAMid / (seriesAValMid + seriesAMid)) * 100;

  // Founder dilution chain
  const founderAfterCurrent = foundersRetain;
  const founderAfterSeed = founderAfterCurrent * (1 - seedEquity / 100);
  const founderAfterSeriesA = founderAfterSeed * (1 - seriesAEquity / 100);

  const dilution: DilutionRound[] = [
    {
      round: "Current (Seed)",
      raise: investment,
      valuation: valuation,
      newEquity: currentEquity,
      founderPct: foundersRetain,
      investorPct: currentEquity,
      cumulativeInvestorPct: currentEquity,
    },
    {
      round: "Seed",
      raise: seedMid,
      valuation: seedValMid,
      newEquity: seedEquity,
      founderPct: founderAfterSeed,
      investorPct: seedEquity,
      cumulativeInvestorPct: 100 - founderAfterSeed,
    },
    {
      round: "Series A",
      raise: seriesAMid,
      valuation: seriesAValMid,
      newEquity: seriesAEquity,
      founderPct: founderAfterSeriesA,
      investorPct: seriesAEquity,
      cumulativeInvestorPct: 100 - founderAfterSeriesA,
    },
  ];

  // Fund allocation
  const fundAllocation = a.fundAllocation.map((f) => ({
    label: f.label,
    amount: (investment * f.pct) / 100,
    pct: f.pct,
    color: f.color,
  }));

  return { equity: { postMoney, equityPct, foundersRetain }, scenarioComparison, exitMatrix, dilution, fundAllocation };
}

// ── Utility Helpers ──

export function formatRM(value: number, inMillions = true): string {
  if (inMillions) {
    if (Math.abs(value) < 0.01) return "—";
    const abs = Math.abs(value);
    const formatted = abs >= 10 ? abs.toFixed(1) : abs.toFixed(2);
    return value < 0 ? `(${formatted})` : formatted;
  }
  // Raw RM formatting
  if (Math.abs(value) >= 1000000) {
    return `RM ${(value / 1000000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1000) {
    return `RM ${(value / 1000).toFixed(0)}K`;
  }
  return `RM ${value.toFixed(0)}`;
}

export function formatPct(value: number): string {
  return `${value >= 0 ? "" : ""}${value.toFixed(1)}%`;
}

export function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toFixed(0);
}
