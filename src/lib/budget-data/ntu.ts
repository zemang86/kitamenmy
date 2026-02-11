// NTU x WirForce 2026 — Budget Data (SGD)

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
  color: string;
  iconColor: string;
  iconBg: string;
  icon: string;
  description: string;
  tags: string[];
  items: string[];
}

export interface Preset {
  id: string;
  label: string;
  subtitle: string;
  attendees: string;
  price: string;
  features: string[];
}

export interface RevenueStream {
  label: string;
  lowPct: number;
  highPct: number;
}

export interface SponsorshipTier {
  id: string;
  tier: string;
  name: string;
  priceRange: string;
  slots: string;
  colorClass: string;
  benefits: string[];
}

export interface ImpactMetric {
  target: number;
  suffix: string;
  prefix: string;
  multiplier: number;
  label: string;
  display: string;
}

export interface RiskItem {
  icon: string;
  title: string;
  description: string;
}

export interface CostAdvantage {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

export interface TierComparisonRow {
  aspect: string;
  launch: string;
  standard: string;
  fullscale: string;
}

// ── Core Costs ──

export const CORE_COSTS: CoreCostItem[] = [
  {
    id: "core-venue",
    label: "Venue & Infrastructure",
    cost: 120_000,
    color: "var(--color-accent-primary)",
    icon: "Building2",
    items: [
      "Power grid setup & industrial cabling",
      "Basic networking & internet uplinks",
      "Venue preparation & layout design",
    ],
  },
  {
    id: "core-ops",
    label: "Operations & Safety",
    cost: 90_000,
    color: "var(--color-accent-primary)",
    icon: "ShieldCheck",
    items: [
      "Base security team (24/7)",
      "On-site medical & first aid",
      "H&S compliance & permits",
    ],
  },
  {
    id: "core-prod",
    label: "Production Baseline",
    cost: 50_000,
    color: "var(--color-accent-primary)",
    icon: "Clapperboard",
    items: [
      "Signage & wayfinding",
      "Basic branding package",
      "Digital presence & comms",
    ],
  },
];

export const CORE_TOTAL = 260_000;

// ── Optional Features ──

export const OPTIONAL_FEATURES: OptionalFeature[] = [
  {
    id: "overdex",
    label: "Overdex Platform",
    cost: 80_000,
    color: "var(--color-accent-secondary)",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.12)",
    icon: "Smartphone",
    description:
      "Smart wristbands, event app, campus beacons, quest system & gamification.",
    tags: ["Wristbands", "App", "Beacons", "Quests"],
    items: [
      "Wristband hardware & encoding",
      "Event app (iOS / Android)",
      "Beacon deployment (20+ nodes)",
      "Quest engine & gamification",
    ],
  },
  {
    id: "lanarena",
    label: "LAN Arena Network",
    cost: 100_000,
    color: "var(--color-accent-primary)",
    iconColor: "text-accent-primary",
    iconBg: "rgba(0,255,136,0.12)",
    icon: "Wifi",
    description:
      "High-speed fiber backbone, VLAN setup, BYOC seating for 800-1,200 gamers.",
    tags: ["Fiber", "VLAN", "800+ BYOC", "Redundancy"],
    items: [
      "Fiber backbone & core switches",
      "VLAN segmentation (800+ ports)",
      "Cable management & trunking",
      "Network monitoring & NOC",
    ],
  },
  {
    id: "esports",
    label: "Esports Tournament",
    cost: 140_000,
    color: "var(--color-accent-tertiary)",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.12)",
    icon: "Trophy",
    description:
      "Main stage + side stage, tournament management systems, professional caster & analyst talent.",
    tags: ["Main Stage", "Side Stage", "Casters", "Tournament Ops"],
    items: [
      "Main stage build & LED wall",
      "Side stage setup",
      "Tournament platform & admin",
      "Caster & analyst talent fees",
    ],
  },
  {
    id: "broadcast",
    label: "Live Broadcast",
    cost: 100_000,
    color: "var(--color-accent-secondary)",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.12)",
    icon: "Video",
    description:
      "Multi-camera HD/4K streaming, replay & graphics suite, satellite viewing areas.",
    tags: ["Multi-Cam", "4K Ready", "Replay Suite", "Satellite"],
    items: [
      "Multi-camera rig (6+ cams)",
      "Streaming encoder & CDN",
      "Replay & graphics workstation",
      "Satellite screen deployment",
    ],
  },
  {
    id: "campus",
    label: "Campus Activations",
    cost: 90_000,
    color: "var(--color-accent-warm)",
    iconColor: "text-accent-warm",
    iconBg: "rgba(255,107,107,0.12)",
    icon: "Sparkles",
    description:
      "Cosplay runway, LED Campfire sleepover, Showcase City (FYP expo), Screenverse cinema.",
    tags: ["Cosplay", "LED Campfire", "Showcase City", "Screenverse"],
    items: [
      "Cosplay runway & judging panel",
      "LED Campfire sleepover zone",
      "Showcase City booth build",
      "Screenverse cinema conversion",
    ],
  },
  {
    id: "music",
    label: "Music & Entertainment",
    cost: 80_000,
    color: "var(--color-accent-tertiary)",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.12)",
    icon: "Music",
    description:
      "Anisong concert, multi-DJ lineup, performance stage & sound system.",
    tags: ["Anisong", "DJ Sets", "Live Stage", "Sound"],
    items: [
      "Anisong performer booking",
      "DJ lineup & fees",
      "Performance stage & PA system",
      "Lighting & effects rig",
    ],
  },
  {
    id: "marketing",
    label: "Marketing Campaign",
    cost: 140_000,
    color: "var(--color-accent-primary)",
    iconColor: "text-accent-primary",
    iconBg: "rgba(0,255,136,0.12)",
    icon: "Megaphone",
    description:
      "Integrated multi-channel campaign, KOL & influencer partnerships, professional content crew, campus ambassador programme.",
    tags: ["Digital", "KOL Network", "Content", "Media Buys"],
    items: [
      "Integrated digital campaign (social, SEM)",
      "KOL & influencer partnerships",
      "Professional content crew (photo / video)",
      "Traditional media buys & PR",
      "Campus ambassador programme",
    ],
  },
  {
    id: "premium",
    label: "Premium Scale-Up",
    cost: 250_000,
    color: "#ffd700",
    iconColor: "text-[#ffd700]",
    iconBg: "rgba(255,215,0,0.12)",
    icon: "Crown",
    description:
      "International headline acts, Innovation Dome, Wellness Village, custom stage design, expanded multi-zone security, ambulance standby.",
    tags: ["International", "Innovation Dome", "Wellness", "Custom Stages"],
    items: [
      "International headline acts",
      "Innovation Dome fabrication",
      "Wellness Village setup",
      "Custom stage design & premium branding",
      "Expanded security + ambulance",
    ],
  },
  {
    id: "fnb",
    label: "F&B & Vendor Village",
    cost: 100_000,
    color: "var(--color-accent-warm)",
    iconColor: "text-accent-warm",
    iconBg: "rgba(255,107,107,0.12)",
    icon: "Utensils",
    description:
      "Food court infrastructure, food truck coordination, hydration stations across campus, vendor licensing & management.",
    tags: ["Food Court", "Food Trucks", "Hydration", "Vendors"],
    items: [
      "Food court infrastructure & power",
      "Food truck coordination (10+ vendors)",
      "Hydration stations across campus",
      "Vendor licensing & management",
    ],
  },
  {
    id: "vip",
    label: "VIP & Hospitality",
    cost: 80_000,
    color: "#ffd700",
    iconColor: "text-[#ffd700]",
    iconBg: "rgba(255,215,0,0.12)",
    icon: "Gem",
    description:
      "VIP lounge build-out, sponsor hospitality suites, premium viewing areas, dedicated concierge & exclusive merch.",
    tags: ["VIP Lounge", "Sponsor Suites", "Premium View", "Concierge"],
    items: [
      "VIP lounge build-out",
      "Sponsor hospitality suites",
      "Premium viewing areas",
      "Dedicated concierge & exclusive merch",
    ],
  },
  {
    id: "prizepool",
    label: "Prize Pool & Awards",
    cost: 120_000,
    color: "var(--color-accent-tertiary)",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.12)",
    icon: "Award",
    description:
      "Tournament prize money, community awards, NTU scholarship fund, best-in-show prizes for cosplay & Showcase City.",
    tags: ["Prize Money", "Awards", "Scholarship", "Trophies"],
    items: [
      "Tournament prize money",
      "Community awards ceremony",
      "NTU scholarship fund",
      "Best-in-show prizes (cosplay, Showcase City)",
    ],
  },
];

// ── Presets ──

export const PRESETS: Preset[] = [
  {
    id: "launch",
    label: "5,000 Attendees",
    subtitle: "The Launch",
    attendees: "5,000",
    price: "~$600,000",
    features: ["lanarena", "esports", "broadcast"],
  },
  {
    id: "standard",
    label: "7,500 Attendees",
    subtitle: "Standard",
    attendees: "7,500",
    price: "~$850,000",
    features: ["overdex", "lanarena", "esports", "broadcast", "campus", "music"],
  },
  {
    id: "fullscale",
    label: "10,000 Attendees",
    subtitle: "Full Scale",
    attendees: "10,000",
    price: "~$1,540,000",
    features: [
      "overdex",
      "lanarena",
      "esports",
      "broadcast",
      "campus",
      "music",
      "marketing",
      "premium",
      "fnb",
      "vip",
      "prizepool",
    ],
  },
];

// ── Budget Constraints ──

export const MIN_BUDGET = 600_000;
export const MAX_BUDGET = 1_600_000;
export const SPONSORSHIP_LOW_PCT = 0.55;
export const SPONSORSHIP_HIGH_PCT = 0.80;
export const CURRENCY_PREFIX = "$";

// ── Revenue Streams ──

export const REVENUE_STREAMS: RevenueStream[] = [
  { label: "Title sponsorship", lowPct: 0.13, highPct: 0.20 },
  { label: "Gold/Silver/Bronze sponsors", lowPct: 0.13, highPct: 0.17 },
  { label: "BYOC seat fees", lowPct: 0.04, highPct: 0.05 },
  { label: "General admission tickets", lowPct: 0.08, highPct: 0.14 },
  { label: "Exhibitor booth fees", lowPct: 0.05, highPct: 0.07 },
  { label: "F&B & merchandise", lowPct: 0.03, highPct: 0.07 },
];

// ── Tier Comparison Table ──

export const TIER_COMPARISON: TierComparisonRow[] = [
  {
    aspect: "LAN Arena",
    launch: "800 BYOC seats",
    standard: "1,000 BYOC seats",
    fullscale: "1,200+ BYOC seats",
  },
  {
    aspect: "Stages",
    launch: "Main + 1 side",
    standard: "Main + 1 side + rotating",
    fullscale: "Main + 2 sides + satellite",
  },
  {
    aspect: "Broadcast",
    launch: "HD multi-cam",
    standard: "HD multi-cam",
    fullscale: "4K broadcast-quality",
  },
  {
    aspect: "Overdex",
    launch: "\u2014",
    standard: "v1 (entry + quests)",
    fullscale: "Full (cashless + analytics)",
  },
  {
    aspect: "Programming",
    launch: "Core activations",
    standard: "Core + music & campus",
    fullscale: "Full campus takeover",
  },
  {
    aspect: "Security",
    launch: "Standard",
    standard: "Standard + expanded",
    fullscale: "Full-scale + ambulance",
  },
  {
    aspect: "F&B / VIP",
    launch: "\u2014",
    standard: "\u2014",
    fullscale: "Full vendor village + VIP",
  },
  {
    aspect: "Prize Pool",
    launch: "\u2014",
    standard: "\u2014",
    fullscale: "$120K prize fund",
  },
  {
    aspect: "Per Attendee",
    launch: "~$120",
    standard: "~$113",
    fullscale: "~$154",
  },
];

// ── Sponsorship Packages ──

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    id: "title",
    tier: "Title Sponsor",
    name: "Presenting Partner",
    priceRange: "$150,000\u2013$300,000",
    slots: "1 exclusive slot",
    colorClass: "title",
    benefits: [
      'Event naming rights ("Presented by X")',
      "Main stage & all broadcast branding",
      "Keynote/demo slot at Opening Ceremony",
      "Premium booth (largest, prime location)",
      "All social media & marketing features",
      "VIP passes & hospitality suite",
      "Post-event analytics & leads report",
    ],
  },
  {
    id: "gold",
    tier: "Gold",
    name: "Stage Partner",
    priceRange: "$50,000\u2013$80,000",
    slots: "3 slots available",
    colorClass: "gold",
    benefits: [
      "Stage branding (1 stage)",
      "Booth in Showcase City",
      "Social media feature posts",
      "On-screen graphics & overlays",
      "VIP passes (10)",
      "Post-event recap inclusion",
    ],
  },
  {
    id: "silver",
    tier: "Silver",
    name: "Zone Partner",
    priceRange: "$20,000\u2013$40,000",
    slots: "5 slots available",
    colorClass: "silver",
    benefits: [
      "Booth in designated zone",
      "Social media mentions",
      "Branding in 1 campus zone",
      "General passes (20)",
      "Logo on event materials",
    ],
  },
  {
    id: "bronze",
    tier: "Bronze",
    name: "Community Partner",
    priceRange: "$5,000\u2013$15,000",
    slots: "10 slots available",
    colorClass: "bronze",
    benefits: [
      "Logo placement on event materials",
      "Social media mention",
      "Product sampling opportunity",
      "General passes (5)",
    ],
  },
];

// ── Impact Metrics ──

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    target: 5000,
    suffix: "\u201310,000",
    prefix: "",
    multiplier: 1,
    label: "Total Attendees",
    display: "5,000\u201310,000",
  },
  {
    target: 800,
    suffix: "\u20131,200",
    prefix: "",
    multiplier: 1,
    label: "BYOC Gamers",
    display: "800\u20131,200",
  },
  {
    target: 500,
    suffix: "K+",
    prefix: "",
    multiplier: 1000,
    label: "Social Media Reach",
    display: "500K+",
  },
  {
    target: 50,
    suffix: "K+",
    prefix: "",
    multiplier: 1000,
    label: "Livestream Viewers",
    display: "50K+",
  },
  {
    target: 2,
    suffix: "M+",
    prefix: "$",
    multiplier: 1000000,
    label: "Gamer-Owned Hardware",
    display: "$2M+",
  },
  {
    target: 100,
    suffix: "+",
    prefix: "",
    multiplier: 1,
    label: "Media Mentions",
    display: "100+",
  },
];

// ── Risk Mitigation ──

export const RISK_ITEMS: RiskItem[] = [
  {
    icon: "CloudRain",
    title: "Weather (Outdoor Zones)",
    description:
      "Indoor backup venues available across NTU campus \u2014 lecture halls and covered walkways can absorb outdoor programming.",
  },
  {
    icon: "TrendingDown",
    title: "Sponsor Shortfall",
    description:
      "Tier 1 (The Launch) designed to be viable with minimal sponsorship \u2014 core features run independently of sponsor funding.",
  },
  {
    icon: "UserMinus",
    title: "Attendance Below Target",
    description:
      "Scalable programming \u2014 reduce zones without waste. BYOC seating and activations flex down gracefully.",
  },
  {
    icon: "ShieldAlert",
    title: "Technical Failure",
    description:
      "Redundant power and networking at Full Scale tier. NOC team monitors infrastructure 24/7 during the event.",
  },
];

// ── NTU Cost Advantages ──

export const COST_ADVANTAGES: CostAdvantage[] = [
  {
    icon: "Landmark",
    iconColor: "text-accent-primary",
    iconBg: "rgba(0,255,136,0.1)",
    title: "$0 Venue Rental",
    description:
      "NTU provides auditoriums, lecture halls, and green spaces \u2014 eliminating the largest single cost for any large-scale event.",
  },
  {
    icon: "Monitor",
    iconColor: "text-accent-secondary",
    iconBg: "rgba(0,212,255,0.1)",
    title: "$0 Hardware (BYOC)",
    description:
      "Gamers bring their own rigs \u2014 at 10K scale, that's $2M+ worth of equipment the festival doesn't need to provide.",
  },
  {
    icon: "Zap",
    iconColor: "text-accent-tertiary",
    iconBg: "rgba(168,85,247,0.1)",
    title: "Existing Infrastructure",
    description:
      "Campus power grid, Wi-Fi backbone, and security systems provide a foundation that commercial venues can't match.",
  },
  {
    icon: "Users",
    iconColor: "text-accent-warm",
    iconBg: "rgba(255,107,107,0.1)",
    title: "Student Volunteers",
    description:
      "NTU's volunteer programme reduces professional staffing costs by 30\u201340% while building campus ownership of the event.",
  },
];

// ── Marquee Items ──

export const MARQUEE_ITEMS = [
  "LAN Arena",
  "Esports Tournament",
  "Live Broadcast",
  "Campus Activations",
  "Overdex Platform",
  "Music & Entertainment",
  "Marketing Campaign",
  "Premium Scale-Up",
  "F&B Village",
  "VIP Hospitality",
  "Prize Pool",
];

// ── NTU-specific attendee estimate ──

/**
 * Linear interpolation: (260K = 2,000) to (1,120K = 10,000), rounded to nearest 500.
 * Clamped between 2,000 and 10,000.
 */
export function estimateAttendees(total: number): number {
  const raw = 2000 + ((total - 260000) / (1120000 - 260000)) * 8000;
  return Math.round(Math.max(2000, Math.min(10000, raw)) / 500) * 500;
}
