// Proposal scaffold — budget data TS generator

import type { ProposalConfig } from "./types";

/** Format a number with underscore separators for readability: 14800 → "14_800" */
function numLit(n: number): string {
  if (n >= 1000) return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");
  return n.toString();
}

/** Format a number with comma separators for display strings: 32000 → "32,000" */
function numFmt(n: number): string {
  return n.toLocaleString("en-US");
}

/** Escape a string for use in a TS string literal */
function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function generateDataLayer(config: ProposalConfig): string {
  const {
    meta, budget, coreCosts, optionalFeatures, presets,
    tierComparison, metrics, crew, equipment, scope, portfolio, marquee,
  } = config;

  const coreTotal = coreCosts.reduce((sum, c) => sum + c.cost, 0);
  const tiers = tierComparison.tiers;

  const lines: string[] = [];

  // ── Header ──
  lines.push(`// ${meta.componentName} — Budget Data (${budget.currency})`);
  lines.push("");

  // ── Interfaces ──
  lines.push(`export interface CoreCostItem {
  id: string;
  label: string;
  cost: number;
  color: string;
  icon: string;
  items: string[];
}

export interface OptionalFeature {
  id: string;
  label: string;
  cost: number;
  perDay: number;
  color: string;
  iconColor: string;
  iconBg: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface Preset {
  id: string;
  label: string;
  subtitle: string;
  perDay: string;
  price: string;
  features: string[];
}

export interface ImpactMetric {
  target: number;
  suffix: string;
  prefix: string;
  multiplier: number;
  label: string;
  display: string;
}

export interface TierComparisonRow {
  aspect: string;`);
  for (const tier of tiers) {
    lines.push(`  ${tier}: string;`);
  }
  lines.push(`}

export interface CrewMember {
  icon: string;
  role: string;
  description: string;
}

export interface EquipmentItem {
  icon: string;
  label: string;
  description: string;
}

export interface ShowSegment {
  icon: string;
  title: string;
  duration: string;
  description: string;
  items: string[];
}

export interface PortfolioItem {
  icon: string;
  title: string;
  description: string;
}

export interface QuotationLineItem {
  no: number;
  category: string;
  item: string;
  description: string;
  qty: number;
  days: number;
  rate: number;
  total: number;
}`);

  // ── Constants ──
  lines.push("");
  lines.push("// ── Constants ──");
  lines.push("");
  lines.push(`export const DAYS = ${budget.days};`);
  lines.push(`export const CURRENCY_PREFIX = "${budget.currency}";`);

  // ── Core Costs ──
  lines.push("");
  lines.push(`// ── Core Costs (${budget.currency} ${numFmt(coreTotal)} = ${budget.currency} ${numFmt(Math.round(coreTotal / budget.days))}/day × ${budget.days} days) ──`);
  lines.push("");
  lines.push("export const CORE_COSTS: CoreCostItem[] = [");
  for (const cc of coreCosts) {
    lines.push("  {");
    lines.push(`    id: "${esc(cc.id)}",`);
    lines.push(`    label: "${esc(cc.label)}",`);
    lines.push(`    cost: ${numLit(cc.cost)},`);
    lines.push(`    color: "var(--color-accent-primary)",`);
    lines.push(`    icon: "${esc(cc.icon)}",`);
    lines.push(`    items: [${cc.items.map((i) => `"${esc(i)}"`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("];");

  lines.push("");
  lines.push(`export const CORE_TOTAL = ${numLit(coreTotal)};`);

  // ── Optional Features ──
  lines.push("");
  lines.push("// ── Optional Features ──");
  lines.push("");
  lines.push("export const OPTIONAL_FEATURES: OptionalFeature[] = [");
  for (const feat of optionalFeatures) {
    const perDay = Math.round(feat.cost / budget.days);
    lines.push("  {");
    lines.push(`    id: "${esc(feat.id)}",`);
    lines.push(`    label: "${esc(feat.label)}",`);
    lines.push(`    cost: ${numLit(feat.cost)},`);
    lines.push(`    perDay: ${perDay},`);
    lines.push(`    color: "${esc(feat.color)}",`);
    lines.push(`    iconColor: "${esc(feat.iconColor)}",`);
    lines.push(`    iconBg: "${esc(feat.iconBg)}",`);
    lines.push(`    icon: "${esc(feat.icon)}",`);
    lines.push(`    description:`);
    lines.push(`      "${esc(feat.description)}",`);
    lines.push(`    tags: [${feat.tags.map((t) => `"${esc(t)}"`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("];");

  // ── Presets ──
  lines.push("");
  lines.push("// ── Presets ──");

  // Comment showing preset math
  for (const preset of presets) {
    const optTotal = preset.features.reduce((sum, fId) => {
      const f = optionalFeatures.find((o) => o.id === fId);
      return sum + (f ? f.cost : 0);
    }, 0);
    const presetTotal = coreTotal + optTotal;
    const featureStr = preset.features.length === 0
      ? "core only"
      : "+ " + preset.features.map((fId) => {
          const f = optionalFeatures.find((o) => o.id === fId);
          return `${fId}(${numFmt(f ? f.cost : 0)})`;
        }).join(" + ");
    lines.push(`// ${preset.label}: ${featureStr} = ${budget.currency} ${numFmt(presetTotal)}`);
  }

  lines.push("");
  lines.push("export const PRESETS: Preset[] = [");
  for (const preset of presets) {
    const optTotal = preset.features.reduce((sum, fId) => {
      const f = optionalFeatures.find((o) => o.id === fId);
      return sum + (f ? f.cost : 0);
    }, 0);
    const presetTotal = coreTotal + optTotal;
    const presetPerDay = Math.round(presetTotal / budget.days);
    lines.push("  {");
    lines.push(`    id: "${esc(preset.id)}",`);
    lines.push(`    label: "${esc(preset.label)}",`);
    lines.push(`    subtitle: "${esc(preset.subtitle)}",`);
    lines.push(`    perDay: "${budget.currency} ${numFmt(presetPerDay)}",`);
    lines.push(`    price: "${budget.currency} ${numFmt(presetTotal)}",`);
    lines.push(`    features: [${preset.features.map((f) => `"${esc(f)}"`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("];");

  lines.push("");
  lines.push(`export const MIN_BUDGET = ${numLit(budget.minBudget)};`);
  lines.push(`export const MAX_BUDGET = ${numLit(budget.maxBudget)};`);

  // ── Tier Comparison ──
  lines.push("");
  lines.push("// ── Tier Comparison ──");
  lines.push("");
  lines.push("export const TIER_COMPARISON: TierComparisonRow[] = [");
  for (const row of tierComparison.rows) {
    const tierValues = tiers.map((tier, i) => `${tier}: "${esc(row.values[i])}"`).join(", ");
    lines.push(`  { aspect: "${esc(row.aspect)}", ${tierValues} },`);
  }
  lines.push("];");

  // ── Impact Metrics ──
  lines.push("");
  lines.push("// ── Impact Metrics ──");
  lines.push("");
  lines.push("export const IMPACT_METRICS: ImpactMetric[] = [");
  for (const m of metrics) {
    lines.push(`  { target: ${m.target}, suffix: "${esc(m.suffix)}", prefix: "${esc(m.prefix)}", multiplier: ${m.multiplier}, label: "${esc(m.label)}", display: "${esc(m.display)}" },`);
  }
  lines.push("];");

  // ── Crew ──
  lines.push("");
  lines.push("// ── Crew ──");
  lines.push("");
  lines.push("export const CREW_MEMBERS: CrewMember[] = [");
  for (const m of crew) {
    lines.push(`  { icon: "${esc(m.icon)}", role: "${esc(m.role)}", description: "${esc(m.description)}" },`);
  }
  lines.push("];");

  // ── Equipment ──
  lines.push("");
  lines.push("// ── Equipment ──");
  lines.push("");
  lines.push("export const EQUIPMENT_LIST: EquipmentItem[] = [");
  for (const e of equipment) {
    lines.push(`  { icon: "${esc(e.icon)}", label: "${esc(e.label)}", description: "${esc(e.description)}" },`);
  }
  lines.push("];");

  // ── Production Scope ──
  lines.push("");
  lines.push("// ── Production Scope ──");
  lines.push("");
  lines.push("export const SHOW_SEGMENTS: ShowSegment[] = [");
  for (const seg of scope) {
    lines.push("  {");
    lines.push(`    icon: "${esc(seg.icon)}",`);
    lines.push(`    title: "${esc(seg.title)}",`);
    lines.push(`    duration: "${esc(seg.duration)}",`);
    lines.push(`    description: "${esc(seg.description)}",`);
    lines.push(`    items: [${seg.items.map((i) => `"${esc(i)}"`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("];");

  // ── Portfolio ──
  lines.push("");
  lines.push("// ── Portfolio ──");
  lines.push("");
  lines.push("export const PORTFOLIO_ITEMS: PortfolioItem[] = [");
  for (const p of portfolio) {
    lines.push(`  { icon: "${esc(p.icon)}", title: "${esc(p.title)}", description: "${esc(p.description)}" },`);
  }
  lines.push("];");

  // ── Marquee ──
  lines.push("");
  lines.push("// ── Marquee Items ──");
  lines.push("");
  lines.push("export const MARQUEE_ITEMS = [");
  for (const item of marquee) {
    lines.push(`  "${esc(item)}",`);
  }
  lines.push("];");

  // ── Quotation ──
  lines.push("");
  lines.push("// ── Quotation Generator ──");
  lines.push("");

  // Core line items comment
  for (const cc of coreCosts) {
    if (cc.lineItems.length > 0) {
      const itemTotals = cc.lineItems.map((li) => numFmt(li.total)).join(" + ");
      lines.push(`// ${cc.category}: ${itemTotals} = ${numFmt(cc.cost)}`);
    }
  }
  lines.push("");

  lines.push('const CORE_LINE_ITEMS: Omit<QuotationLineItem, "no">[] = [');
  for (const cc of coreCosts) {
    for (const li of cc.lineItems) {
      lines.push(`  { category: "${esc(cc.category)}", item: "${esc(li.item)}", description: "${esc(li.description)}", qty: ${li.qty}, days: ${li.days}, rate: ${li.rate}, total: ${numLit(li.total)} },`);
    }
  }
  lines.push("];");

  lines.push("");
  lines.push('const OPTIONAL_LINE_ITEMS: Record<string, Omit<QuotationLineItem, "no">> = {');
  for (const feat of optionalFeatures) {
    if (feat.lineItem) {
      const li = feat.lineItem;
      lines.push(`  "${esc(feat.id)}": { category: "Add-On", item: "${esc(li.item)}", description: "${esc(li.description)}", qty: ${li.qty}, days: ${li.days}, rate: ${li.rate}, total: ${numLit(li.total)} },`);
    }
  }
  lines.push("};");

  lines.push("");
  lines.push(`export function generateQuotationItems(activeFeatureIds: Set<string>): QuotationLineItem[] {
  const items: QuotationLineItem[] = [];
  let no = 1;

  for (const core of CORE_LINE_ITEMS) {
    items.push({ ...core, no: no++ });
  }

  for (const feat of OPTIONAL_FEATURES) {
    if (activeFeatureIds.has(feat.id) && OPTIONAL_LINE_ITEMS[feat.id]) {
      items.push({ ...OPTIONAL_LINE_ITEMS[feat.id], no: no++ });
    }
  }

  return items;
}`);

  return lines.join("\n") + "\n";
}
