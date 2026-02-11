// Rev Media WC26 — Livestream Production Budget Data (RM)

export interface CoreCostItem {
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
  aspect: string;
  essential: string;
  standard: string;
  premium: string;
}

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
}

// ── Constants ──

export const DAYS = 8;
export const CURRENCY_PREFIX = "RM";

// ── Core Costs (RM 32,000 = RM 4,000/day × 8 days) ──

export const CORE_COSTS: CoreCostItem[] = [
  {
    id: "core-crew",
    label: "Production Crew (6 pax)",
    cost: 14_800,
    color: "var(--color-accent-primary)",
    icon: "Users",
    items: ["Director", "Camera Operator ×2", "Assistant Director", "Switcher", "GFX Operator"],
  },
  {
    id: "core-equipment",
    label: "Equipment",
    cost: 8_400,
    color: "var(--color-accent-primary)",
    icon: "Monitor",
    items: ["Sony PXW-Z190 (main)", "Sony PXW-Z90 (2nd)", "VMix PC", "Capture cards", "3× Monitors", "Audio interface", "Intercom (×5)", "Tripods", "Tally lights", "UPS"],
  },
  {
    id: "core-technical",
    label: "Technical",
    cost: 1_800,
    color: "var(--color-accent-primary)",
    icon: "Wifi",
    items: ["Power supply", "Cabling", "Contingency"],
  },
  {
    id: "core-preproduction",
    label: "Pre-Production & Management",
    cost: 4_000,
    color: "var(--color-accent-primary)",
    icon: "ClipboardList",
    items: ["Planning", "Scheduling", "Rehearsal", "Coordination"],
  },
  {
    id: "core-studio",
    label: "Studio / Location Setup",
    cost: 3_000,
    color: "var(--color-accent-primary)",
    icon: "Building2",
    items: ["Set dressing", "Basic lighting", "Backdrop"],
  },
];

export const CORE_TOTAL = 32_000;

// ── Optional Features ──

export const OPTIONAL_FEATURES: OptionalFeature[] = [
  {
    id: "third-camera",
    label: "3rd Camera + Operator",
    cost: 2_800,
    perDay: 350,
    color: "var(--color-accent-secondary)",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.12)",
    icon: "Video",
    description:
      "Third camera angle (Sony PXW-Z90) with dedicated operator for premium multi-angle coverage.",
    tags: ["Sony PXW-Z90", "3rd Angle", "Dedicated Op"],
  },
  {
    id: "social-media",
    label: "Social Media Content Manager",
    cost: 2_400,
    perDay: 300,
    color: "var(--color-accent-primary)",
    iconColor: "text-accent-primary",
    iconBg: "rgba(0,255,136,0.12)",
    icon: "Smartphone",
    description:
      "Dedicated social media manager creating real-time clips, stories, and engagement content during broadcasts.",
    tags: ["Real-Time Clips", "Stories", "Engagement"],
  },
  {
    id: "highlights",
    label: "Post-Show Highlight Reels",
    cost: 3_200,
    perDay: 400,
    color: "var(--color-accent-tertiary)",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.12)",
    icon: "Sparkles",
    description:
      "Professional highlight reels edited and delivered within 24 hours of each broadcast for social distribution.",
    tags: ["24h Turnaround", "Social-Ready"],
  },
  {
    id: "premium-gfx",
    label: "Premium Motion Graphics Package",
    cost: 3_600,
    perDay: 450,
    color: "var(--color-accent-secondary)",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.12)",
    icon: "Wand2",
    description:
      "Custom-designed motion graphics including lower thirds, transitions, stingers, and branded overlay package.",
    tags: ["Lower Thirds", "Transitions", "Stingers"],
  },
  {
    id: "multistream",
    label: "Multi-Platform Streaming",
    cost: 1_600,
    perDay: 200,
    color: "var(--color-accent-primary)",
    iconColor: "text-accent-primary",
    iconBg: "rgba(0,255,136,0.12)",
    icon: "Globe",
    description:
      "Simultaneous streaming to multiple platforms with platform-specific encoding and chat management.",
    tags: ["YouTube", "Facebook", "TikTok"],
  },
  {
    id: "floor-manager",
    label: "Dedicated Floor Manager",
    cost: 2_000,
    perDay: 250,
    color: "var(--color-accent-warm)",
    iconColor: "text-accent-warm",
    iconBg: "rgba(255,107,107,0.12)",
    icon: "ClipboardList",
    description:
      "On-site floor manager handling talent cues, timing, audience management, and production communication.",
    tags: ["Talent Cues", "Timing", "Comms"],
  },
  {
    id: "replay",
    label: "Replay & Analysis System",
    cost: 2_400,
    perDay: 300,
    color: "var(--color-accent-tertiary)",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.12)",
    icon: "RefreshCw",
    description:
      "Instant replay system for key match moments with slow-motion capability and telestrator analysis tools.",
    tags: ["Instant Replay", "Slow-Mo", "Analysis"],
  },
  {
    id: "backup",
    label: "Redundancy & Backup Stream",
    cost: 1_200,
    perDay: 150,
    color: "var(--color-accent-secondary)",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.12)",
    icon: "ShieldCheck",
    description:
      "Backup streaming encoder and redundant internet connection ensuring zero downtime during live broadcasts.",
    tags: ["Backup Encoder", "Redundant Net"],
  },
];

// ── Presets ──
// Essential: core only = RM 32,000
// Standard: + multistream(1,600) + social-media(2,400) + highlights(3,200) = RM 39,200
// Premium: + multistream + social-media + highlights + third-camera(2,800) + premium-gfx(3,600) + floor-manager(2,000) = RM 47,600

export const PRESETS: Preset[] = [
  {
    id: "essential",
    label: "Essential",
    subtitle: "Core Production",
    perDay: "RM 4,000",
    price: "RM 32,000",
    features: [],
  },
  {
    id: "standard",
    label: "Standard",
    subtitle: "Enhanced Coverage",
    perDay: "RM 4,900",
    price: "RM 39,200",
    features: ["multistream", "social-media", "highlights"],
  },
  {
    id: "premium",
    label: "Premium",
    subtitle: "Full Production",
    perDay: "RM 5,950",
    price: "RM 47,600",
    features: ["multistream", "social-media", "highlights", "third-camera", "premium-gfx", "floor-manager"],
  },
];

export const MIN_BUDGET = 32_000;
export const MAX_BUDGET = 52_000;

// ── Tier Comparison ──

export const TIER_COMPARISON: TierComparisonRow[] = [
  { aspect: "Production Crew", essential: "6 pax", standard: "6 pax", premium: "7 pax (+ 3rd cam op)" },
  { aspect: "Camera Setup", essential: "2 cams (Z190 + Z90)", standard: "2 cams (Z190 + Z90)", premium: "3 cams (Z190 + 2\u00d7 Z90)" },
  { aspect: "Streaming", essential: "Single platform", standard: "Multi-platform", premium: "Multi-platform" },
  { aspect: "Social Content", essential: "\u2014", standard: "Content manager", premium: "Content manager" },
  { aspect: "Highlight Reels", essential: "\u2014", standard: "24h delivery", premium: "24h delivery" },
  { aspect: "Graphics", essential: "Standard overlays", standard: "Standard overlays", premium: "Premium motion GFX" },
  { aspect: "Floor Manager", essential: "AD handles", standard: "AD handles", premium: "Dedicated FM" },
  { aspect: "matchops.my", essential: "Included", standard: "Included", premium: "Included" },
  { aspect: "Per Day", essential: "RM 4,000", standard: "RM 4,900", premium: "RM 5,950" },
];

// ── Impact Metrics ──

export const IMPACT_METRICS: ImpactMetric[] = [
  { target: 8, suffix: "", prefix: "", multiplier: 1, label: "Match Days", display: "8" },
  { target: 24, suffix: "h+", prefix: "", multiplier: 1, label: "Live Content", display: "24h+" },
  { target: 3, suffix: "+", prefix: "", multiplier: 1, label: "Platforms", display: "3+" },
  { target: 6, suffix: "+", prefix: "", multiplier: 1, label: "Crew Members", display: "6+" },
  { target: 1, suffix: "", prefix: "", multiplier: 1, label: "Integrated Data System", display: "1" },
];

// ── Crew ──

export const CREW_MEMBERS: CrewMember[] = [
  { icon: "Eye", role: "Director", description: "Overall show vision, shot calling, pacing, and creative direction of the live broadcast." },
  { icon: "Video", role: "Camera Operators (\u00d72)", description: "Sony PXW-Z190 (main) and PXW-Z90 (2nd angle) \u2014 framing, movement, and live shot execution." },
  { icon: "ClipboardList", role: "Assistant Director", description: "Rundown management, talent cues, timing, and coordination between all departments." },
  { icon: "LayoutGrid", role: "Technical Director / Switcher", description: "VMix operation, source switching, transition execution, and technical broadcast control." },
  { icon: "Palette", role: "Graphics Operator", description: "Real-time graphics triggering, matchops.my data overlay management, and lower thirds." },
];

// ── Equipment ──

export const EQUIPMENT_LIST: EquipmentItem[] = [
  { icon: "Video", label: "Sony PXW-Z190", description: "Main camera \u2014 3-chip 4K sensor, 25\u00d7 optical zoom, professional broadcast quality." },
  { icon: "Video", label: "Sony PXW-Z90", description: "2nd camera \u2014 compact 4K camcorder for secondary angle coverage." },
  { icon: "Cpu", label: "VMix Computer", description: "High-performance switching and streaming workstation with VMix Pro." },
  { icon: "LayoutGrid", label: "Capture Cards", description: "Multi-input capture for camera feeds, game sources, and data overlays." },
  { icon: "Monitor", label: "Monitors (\u00d73)", description: "Program, preview, and multiview monitoring for production control." },
  { icon: "Radio", label: "Audio Interface + Mixer", description: "Multi-channel audio mixing for host mics, game audio, and music." },
  { icon: "Zap", label: "Cabling & Accessories", description: "SDI/HDMI runs, power distribution, audio cables, and backup components." },
  { icon: "Headphones", label: "Intercom System (×5)", description: "Wired crew communication headsets for director, camera ops, AD, switcher, and GFX operator." },
  { icon: "Triangle", label: "Professional Tripods (×2)", description: "Fluid-head tripods for stable camera support on both Z190 and Z90 setups." },
  { icon: "Lightbulb", label: "Tally Light System", description: "On-air indicator lights for camera operators — red for live, green for preview." },
  { icon: "BatteryCharging", label: "UPS / Power Backup", description: "Uninterruptible power supply protecting VMix PC and critical switching equipment." },
];

// ── Production Scope ──

export const SHOW_SEGMENTS: ShowSegment[] = [
  {
    icon: "ClipboardList",
    title: "Pre-Production",
    duration: "2\u20134 weeks before",
    description: "Planning, scheduling, and coordination ahead of show days.",
    items: ["Production planning & scheduling", "Crew briefing & assignment", "Technical rehearsal", "matchops.my data integration setup", "Key artwork iteration (AI / Figma / SVG — originals by Rev Media)"],
  },
  {
    icon: "Radio",
    title: "Show Day (Technical)",
    duration: "Per match day",
    description: "On-site technical setup and production execution. Rev Media handles show content & talent.",
    items: ["Equipment setup & testing", "Camera positioning & framing", "VMix configuration & switching", "Live graphics & data overlay operation"],
  },
  {
    icon: "Sparkles",
    title: "Post-Production",
    duration: "24\u201348h after",
    description: "Deliverables and content distribution after each show day.",
    items: ["Highlight reel editing (if selected)", "Social media content delivery", "Technical debrief & notes", "Equipment breakdown & wrap"],
  },
];

// ── Portfolio ──

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { icon: "Trophy", title: "Malaysia Premier Futsal League", description: "Full multi-camera livestream production for national-level futsal competition across multiple match days." },
  { icon: "Swords", title: "Liga A1 Semi Pro", description: "Broadcast production for semi-professional football league with live graphics and multi-platform streaming." },
  { icon: "Gamepad2", title: "Esports Tournaments", description: "Tournament livestream production including player cams, instant replay, and custom overlay packages." },
  { icon: "Music", title: "Concert Livestreams", description: "Live music broadcast with multi-camera setups, audio mixing, and real-time social media content." },
  { icon: "Building2", title: "Corporate Events", description: "Professional livestream production for corporate conferences, launches, and hybrid events." },
];

// ── Marquee Items ──

export const MARQUEE_ITEMS = [
  "Malaysia Premier Futsal League",
  "Liga A1 Semi Pro",
  "Esports Tournaments",
  "Concert Livestreams",
  "Corporate Events",
  "Multi-Camera Production",
  "VMix Workflows",
  "Live Data Integration",
];

// ── Quotation Generator ──

// Core line items breakdown (must sum to CORE_TOTAL = 32,000)
// Crew: 2,800 + 2,400 + 2,400 + 2,000 + 2,800 + 2,400 = 14,800
// Equipment: 1,200 + 800 + 2,000 + 1,200 + 800 + 800 + 800 + 400 + 400 = 8,400
// Technical: 1,200 + 600 = 1,800
// Pre-Production: 2,000 + 2,000 = 4,000
// Studio: 3,000

const CORE_LINE_ITEMS: Omit<QuotationLineItem, "no">[] = [
  { category: "Crew", item: "Director", description: "Show vision, shot calling & creative direction", qty: 1, days: 8, rate: 350, total: 2_800 },
  { category: "Crew", item: "Camera Operator (Main)", description: "Sony PXW-Z190 \u2014 main camera operation", qty: 1, days: 8, rate: 300, total: 2_400 },
  { category: "Crew", item: "Camera Operator (2nd)", description: "Sony PXW-Z90 \u2014 2nd angle operation", qty: 1, days: 8, rate: 300, total: 2_400 },
  { category: "Crew", item: "Assistant Director", description: "Rundown management, talent cues & coordination", qty: 1, days: 8, rate: 250, total: 2_000 },
  { category: "Crew", item: "Technical Director / Switcher", description: "VMix operation & live switching", qty: 1, days: 8, rate: 350, total: 2_800 },
  { category: "Crew", item: "Graphics Operator", description: "Real-time graphics & matchops.my overlays", qty: 1, days: 8, rate: 300, total: 2_400 },
  { category: "Equipment", item: "Sony PXW-Z190 (Main Cam)", description: "3-chip 4K broadcast camera, 25\u00d7 zoom", qty: 1, days: 8, rate: 150, total: 1_200 },
  { category: "Equipment", item: "Sony PXW-Z90 (2nd Cam)", description: "Compact 4K camcorder", qty: 1, days: 8, rate: 100, total: 800 },
  { category: "Equipment", item: "VMix PC + Capture Cards", description: "Switching workstation, multi-input capture", qty: 1, days: 8, rate: 250, total: 2_000 },
  { category: "Equipment", item: "Monitors (\u00d73)", description: "Program, preview & multiview", qty: 3, days: 8, rate: 50, total: 1_200 },
  { category: "Equipment", item: "Audio Interface + Mixer", description: "Multi-channel audio mixing", qty: 1, days: 8, rate: 100, total: 800 },
  { category: "Equipment", item: "Intercom System (×5)", description: "Wired crew communication headsets", qty: 5, days: 8, rate: 20, total: 800 },
  { category: "Equipment", item: "Professional Tripods (×2)", description: "Fluid-head tripods for Z190 & Z90", qty: 2, days: 8, rate: 50, total: 800 },
  { category: "Equipment", item: "Tally Light System", description: "On-air indicators for camera ops", qty: 1, days: 8, rate: 50, total: 400 },
  { category: "Equipment", item: "UPS / Power Backup", description: "Uninterruptible power for critical gear", qty: 1, days: 8, rate: 50, total: 400 },
  { category: "Technical", item: "Power & Cabling", description: "Power distribution, SDI/HDMI runs", qty: 1, days: 8, rate: 150, total: 1_200 },
  { category: "Technical", item: "Contingency", description: "Technical contingency buffer", qty: 1, days: 1, rate: 600, total: 600 },
  { category: "Pre-Production", item: "Planning & Scheduling", description: "Production planning, show scheduling", qty: 1, days: 1, rate: 2_000, total: 2_000 },
  { category: "Pre-Production", item: "Rehearsal & Coordination", description: "Tech rehearsal & crew coordination", qty: 1, days: 1, rate: 2_000, total: 2_000 },
  { category: "Studio", item: "Set Dressing & Lighting", description: "Set design, basic lighting, backdrop", qty: 1, days: 1, rate: 3_000, total: 3_000 },
];

const OPTIONAL_LINE_ITEMS: Record<string, Omit<QuotationLineItem, "no">> = {
  "third-camera": { category: "Add-On", item: "3rd Camera + Operator", description: "Sony PXW-Z90 + dedicated cam op", qty: 1, days: 8, rate: 350, total: 2_800 },
  "multistream": { category: "Add-On", item: "Multi-Platform Streaming", description: "Simultaneous YouTube, Facebook, TikTok", qty: 1, days: 8, rate: 200, total: 1_600 },
  "social-media": { category: "Add-On", item: "Social Media Manager", description: "Real-time clips, stories & engagement", qty: 1, days: 8, rate: 300, total: 2_400 },
  "highlights": { category: "Add-On", item: "Post-Show Highlight Reels", description: "Edited highlights, 24h turnaround", qty: 1, days: 8, rate: 400, total: 3_200 },
  "premium-gfx": { category: "Add-On", item: "Premium Motion Graphics", description: "Custom lower thirds, transitions, stingers", qty: 1, days: 1, rate: 3_600, total: 3_600 },
  "floor-manager": { category: "Add-On", item: "Floor Manager", description: "Talent cues, timing & on-site comms", qty: 1, days: 8, rate: 250, total: 2_000 },
  "replay": { category: "Add-On", item: "Replay & Analysis System", description: "Instant replay, slow-mo & telestrator", qty: 1, days: 8, rate: 300, total: 2_400 },
  "backup": { category: "Add-On", item: "Redundancy & Backup", description: "Backup encoder + redundant internet", qty: 1, days: 8, rate: 150, total: 1_200 },
};

export function generateQuotationItems(activeFeatureIds: Set<string>): QuotationLineItem[] {
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
}
