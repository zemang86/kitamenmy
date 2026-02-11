// Proposal scaffold — config validation

import type { ProposalConfig } from "./types";

const KNOWN_ICONS = new Set([
  "Award", "BarChart2", "BarChart3", "Bot", "Box", "Brain", "Building2",
  "Clapperboard", "ClipboardList", "Cloud", "CloudRain", "Code", "Code2",
  "Cpu", "CreditCard", "Crown", "Database", "Eye", "File", "FileText",
  "Gamepad2", "Gem", "GitBranch", "Globe", "Hash", "Image", "Landmark",
  "Layout", "LayoutGrid", "Megaphone", "MessageCircle", "MessageSquare",
  "Monitor", "Music", "Newspaper", "Palette", "PenTool", "Plane", "Radio",
  "RefreshCw", "Rocket", "Ruler", "Share2", "ShieldAlert", "ShieldCheck",
  "Smartphone", "Sparkles", "Swords", "Terminal", "TrendingDown",
  "TrendingUp", "Trophy", "Tv", "UserMinus", "Users", "Utensils", "Video",
  "Wand2", "Wifi", "Zap",
  // Common extras not yet in registry but valid Lucide names
  "Download", "Check", "Headphones", "Triangle", "Lightbulb", "BatteryCharging",
]);

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export function validateConfig(config: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const c = config as ProposalConfig;

  // ── Required top-level keys ──
  const requiredKeys = [
    "meta", "seo", "client", "company", "budget", "coreCosts",
    "optionalFeatures", "presets", "tierComparison", "crew", "equipment",
    "scope", "portfolio", "metrics", "marquee", "nav", "hero", "quotation",
  ];
  for (const key of requiredKeys) {
    if (!(key in (config as Record<string, unknown>))) {
      errors.push(`Missing required top-level key: "${key}"`);
    }
  }
  if (errors.length > 0) return { errors, warnings };

  // ── Meta ──
  if (!c.meta.slug) errors.push("meta.slug is required");
  else if (!/^[a-z0-9-]+$/.test(c.meta.slug)) {
    errors.push(`meta.slug must be lowercase alphanumeric + hyphens, got "${c.meta.slug}"`);
  }
  if (!c.meta.componentName) errors.push("meta.componentName is required");
  if (!c.meta.title) errors.push("meta.title is required");
  if (!c.meta.tagline) errors.push("meta.tagline is required");

  // ── Budget ──
  if (!c.budget.currency) errors.push("budget.currency is required");
  if (!c.budget.days || c.budget.days <= 0) errors.push("budget.days must be > 0");
  if (c.budget.minBudget >= c.budget.maxBudget) {
    errors.push("budget.minBudget must be less than budget.maxBudget");
  }

  // ── Referential integrity: preset features ──
  const featureIds = new Set(c.optionalFeatures.map((f) => f.id));
  for (const preset of c.presets) {
    for (const fId of preset.features) {
      if (!featureIds.has(fId)) {
        errors.push(`Preset "${preset.id}" references unknown feature "${fId}"`);
      }
    }
  }

  // ── Referential integrity: tier IDs must match presets ──
  const presetIds = new Set(c.presets.map((p) => p.id));
  for (const tierId of c.tierComparison.tiers) {
    if (!presetIds.has(tierId)) {
      errors.push(`tierComparison.tiers references unknown preset "${tierId}"`);
    }
  }
  if (c.tierComparison.tiers.length !== c.tierComparison.tierLabels.length) {
    errors.push("tierComparison.tiers and tierComparison.tierLabels must have the same length");
  }
  for (const row of c.tierComparison.rows) {
    if (row.values.length !== c.tierComparison.tiers.length) {
      errors.push(`tierComparison row "${row.aspect}" has ${row.values.length} values but ${c.tierComparison.tiers.length} tiers`);
    }
  }

  // ── Icon check (non-fatal) ──
  const allIcons: string[] = [];
  for (const cc of c.coreCosts) allIcons.push(cc.icon);
  for (const f of c.optionalFeatures) allIcons.push(f.icon);
  for (const m of c.crew) allIcons.push(m.icon);
  for (const e of c.equipment) allIcons.push(e.icon);
  for (const s of c.scope) allIcons.push(s.icon);
  for (const p of c.portfolio) allIcons.push(p.icon);
  for (const icon of allIcons) {
    if (!KNOWN_ICONS.has(icon)) {
      warnings.push(`Icon "${icon}" not found in icon-registry.ts — add it manually if needed`);
    }
  }

  // ── Math check: lineItem totals vs category cost ──
  for (const cc of c.coreCosts) {
    if (cc.lineItems && cc.lineItems.length > 0) {
      const lineSum = cc.lineItems.reduce((s, li) => s + li.total, 0);
      if (lineSum !== cc.cost) {
        warnings.push(`Core cost "${cc.id}" lineItems sum to ${lineSum} but cost is ${cc.cost}`);
      }
    }
  }
  for (const feat of c.optionalFeatures) {
    if (feat.lineItem && feat.lineItem.total !== feat.cost) {
      warnings.push(`Feature "${feat.id}" lineItem total is ${feat.lineItem.total} but cost is ${feat.cost}`);
    }
  }

  return { errors, warnings };
}
