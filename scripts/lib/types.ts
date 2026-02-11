// Proposal scaffold — YAML config interfaces

export interface LineItemConfig {
  item: string;
  description: string;
  qty: number;
  days: number;
  rate: number;
  total: number;
}

export interface MetaConfig {
  slug: string;
  componentName: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  footnote: string;
}

export interface SeoConfig {
  title: string;
  description: string;
}

export interface ClientConfig {
  name: string;
}

export interface CompanyConfig {
  name: string;
  brand: string;
  brandSub: string;
  website: string;
  ref: string;
}

export interface BudgetConfig {
  currency: string;
  days: number;
  dayLabel: string;
  minBudget: number;
  maxBudget: number;
}

export interface CoreCostConfig {
  id: string;
  label: string;
  category: string;
  cost: number;
  icon: string;
  items: string[];
  lineItems: LineItemConfig[];
}

export interface OptionalFeatureConfig {
  id: string;
  label: string;
  cost: number;
  color: string;
  iconColor: string;
  iconBg: string;
  icon: string;
  description: string;
  tags: string[];
  lineItem: LineItemConfig;
}

export interface PresetConfig {
  id: string;
  label: string;
  subtitle: string;
  features: string[];
}

export interface TierComparisonConfig {
  tiers: string[];
  tierLabels: string[];
  rows: TierComparisonRowConfig[];
}

export interface TierComparisonRowConfig {
  aspect: string;
  values: string[];
}

export interface CrewConfig {
  icon: string;
  role: string;
  description: string;
}

export interface EquipmentConfig {
  icon: string;
  label: string;
  description: string;
}

export interface ScopeConfig {
  icon: string;
  title: string;
  duration: string;
  description: string;
  items: string[];
}

export interface PortfolioConfig {
  icon: string;
  title: string;
  description: string;
}

export interface MetricConfig {
  target: number;
  suffix: string;
  prefix: string;
  multiplier: number;
  label: string;
  display: string;
}

export interface NavConfig {
  label: string;
  id: string;
}

export interface HeroStatConfig {
  value: string;
  label: string;
}

export interface HeroConfig {
  stats: HeroStatConfig[];
  ctaPrimary: { label: string; target: string };
  ctaSecondary: { label: string; target: string };
}

export interface QuotationConfig {
  title: string;
  terms: string[];
  footer: string;
}

export interface ProposalConfig {
  meta: MetaConfig;
  seo: SeoConfig;
  client: ClientConfig;
  company: CompanyConfig;
  budget: BudgetConfig;
  coreCosts: CoreCostConfig[];
  optionalFeatures: OptionalFeatureConfig[];
  presets: PresetConfig[];
  tierComparison: TierComparisonConfig;
  crew: CrewConfig[];
  equipment: EquipmentConfig[];
  scope: ScopeConfig[];
  portfolio: PortfolioConfig[];
  metrics: MetricConfig[];
  marquee: string[];
  nav: NavConfig[];
  hero: HeroConfig;
  quotation: QuotationConfig;
}
