// ---------------------------------------------------------------------------
// KL Tower "Gaming in the Sky" 2026 -- Budget Data
// ---------------------------------------------------------------------------

export interface CostItem {
  id: string;
  label: string;
  cost: number;
  /** Tailwind-compatible color class or CSS value for the breakdown bar. */
  color: string;
}

export interface OptionalFeature extends CostItem {
  icon: string; // lucide-react icon name (PascalCase)
  iconColorClass: string; // Tailwind text-color class for the icon
  iconBgClass: string; // Tailwind bg class for the icon container
  description: string;
  tags: string[];
}

export interface Preset {
  name: string;
  features: string[]; // IDs of optional features included
  total: number;
}

export interface SponsorshipTier {
  name: string;
  price: string;
  slots: string;
  colorClass: string; // border-top color class
  benefits: string[];
  potentialSponsors: string[];
}

// ---- Core costs (always included) ----------------------------------------

export const CORE_COSTS: CostItem[] = [
  {
    id: "core-mgmt",
    label: "Event Management & Operations",
    cost: 130_000,
    color: "var(--color-accent-primary)",
  },
  {
    id: "core-venue",
    label: "Venue Setup & Logistics",
    cost: 100_000,
    color: "var(--color-accent-primary)",
  },
  {
    id: "core-marketing",
    label: "Marketing & PR",
    cost: 80_000,
    color: "var(--color-accent-primary)",
  },
];

export const CORE_TOTAL = CORE_COSTS.reduce((sum, c) => sum + c.cost, 0); // 310,000

// ---- Optional features (toggleable) --------------------------------------

export const OPTIONAL_FEATURES: OptionalFeature[] = [
  {
    id: "invitational",
    label: "International Invitational Esports",
    cost: 120_000,
    color: "var(--color-accent-tertiary)",
    icon: "Trophy",
    iconColorClass: "text-accent-tertiary",
    iconBgClass: "bg-accent-tertiary/15",
    description:
      "MLBB & Honor of Kings invitational tournament featuring top teams from Malaysia, Philippines, and Indonesia. Full competitive format with group stages and grand finals.",
    tags: ["MLBB", "Honor of Kings", "MY vs PH vs ID", "Prize Pool", "Casters"],
  },
  {
    id: "opentourneys",
    label: "Community Open Tournaments",
    cost: 60_000,
    color: "var(--color-accent-primary)",
    icon: "Swords",
    iconColorClass: "text-accent-primary",
    iconBgClass: "bg-accent-primary/15",
    description:
      "Public registration tournaments across 5 titles -- open to all skill levels. Walk-in and pre-registered slots with prize pools per title. Full stage rotation with livestream coverage.",
    tags: ["MLBB", "Honor of Kings", "PUBG Mobile", "EA FC 26", "eFootball"],
  },
  {
    id: "hackathon",
    label: "Hackathon in the Sky",
    cost: 60_000,
    color: "var(--color-accent-secondary)",
    icon: "Code2",
    iconColorClass: "text-accent-secondary",
    iconBgClass: "bg-accent-secondary/15",
    description:
      "48-hour hackathon challenge at KL Tower's observation deck. Teams build gaming, AI, or tourism-tech prototypes with mentorship from industry leaders.",
    tags: ["48 Hours", "20 Teams", "Mentors", "Demo Day"],
  },
  {
    id: "techexpo",
    label: "Mini Super Tech Expo",
    cost: 80_000,
    color: "var(--color-accent-primary)",
    icon: "Cpu",
    iconColorClass: "text-accent-primary",
    iconBgClass: "bg-accent-primary/15",
    description:
      "Exhibition space featuring gaming peripherals, VR/AR demos, AI showcases, indie game stations, and tech startup booths. Hardware showcases with partners from the WirForce ecosystem (ROG, GIGABYTE, Seasonic) and interactive product launches.",
    tags: ["30+ Booths", "VR/AR Zone", "Product Launches", "Indie Games", "Hardware Showcase"],
  },
  {
    id: "lanparty",
    label: "LAN Party in the Sky",
    cost: 40_000,
    color: "var(--color-accent-warm)",
    icon: "Monitor",
    iconColorClass: "text-accent-warm",
    iconBgClass: "bg-accent-warm/15",
    description:
      "BYOC-inspired LAN gaming zone with 100+ gaming PCs, modelled after WirForce's proven multi-day LAN format. Casual tournaments, community gaming sessions, PC modding showcase, and retro gaming corner at elevation.",
    tags: ["100+ PCs", "Casual Tourneys", "Retro Corner", "BYOC Format", "PC Modding"],
  },
  {
    id: "tourism",
    label: "Tourism & Hospitality Package",
    cost: 50_000,
    color: "var(--color-accent-secondary)",
    icon: "Plane",
    iconColorClass: "text-accent-secondary",
    iconBgClass: "bg-accent-secondary/15",
    description:
      "International player & VIP experience: airport transfers, hotel partnerships, KL city tours, halal food trails, and cultural experiences for visiting teams.",
    tags: ["Airport Transfers", "Hotel Partners", "City Tours", "VIP Lounge"],
  },
  {
    id: "broadcast",
    label: "Livestream, Talent & Broadcast Production",
    cost: 80_000,
    color: "var(--color-accent-tertiary)",
    icon: "Video",
    iconColorClass: "text-accent-tertiary",
    iconBgClass: "bg-accent-tertiary/15",
    description:
      "Full broadcast production with multi-camera setup, live streaming to YouTube, Facebook Gaming & TikTok. Professional talent lineup -- casters, hosts, analysts, and floor MCs. Post-event highlight reels and content packages.",
    tags: ["Multi-Camera", "Live Stream", "Casters & Hosts", "Analysts Desk", "Floor MCs", "Highlight Reels"],
  },
  {
    id: "ceremony",
    label: "Opening / Closing Ceremony",
    cost: 40_000,
    color: "var(--color-gold, #ffd700)",
    icon: "Sparkles",
    iconColorClass: "text-[#ffd700]",
    iconBgClass: "bg-[rgba(255,215,0,0.15)]",
    description:
      "Grand opening with VIP speeches, LED countdown, light shows, and cultural performances. Closing ceremony with awards presentation, cosplay showcase, DJ set, and after-party.",
    tags: ["VIP Speeches", "LED Show", "Cultural Acts", "Awards Night", "Cosplay Showcase"],
  },
];

// ---- Presets --------------------------------------------------------------

export const PRESETS: Preset[] = [
  {
    name: "Essential",
    features: ["invitational", "opentourneys", "broadcast"],
    total: 570_000,
  },
  {
    name: "Standard",
    features: ["invitational", "opentourneys", "hackathon", "techexpo", "broadcast", "ceremony"],
    total: 750_000,
  },
  {
    name: "Premium",
    features: [
      "invitational",
      "opentourneys",
      "hackathon",
      "techexpo",
      "lanparty",
      "tourism",
      "broadcast",
      "ceremony",
    ],
    total: 840_000,
  },
];

// ---- Budget range ---------------------------------------------------------

export const MIN_BUDGET = 500_000;
export const MAX_BUDGET = 1_000_000;

// ---- Sponsorship tiers ----------------------------------------------------

export const SPONSORSHIP_TIERS: SponsorshipTier[] = [
  {
    name: "Title Sponsor",
    price: "RM 250,000 -- 500,000",
    slots: "1 exclusive slot",
    colorClass: "border-t-accent-primary",
    benefits: [
      'Event naming rights ("Gaming in the Sky by [Brand]")',
      "Logo on all marketing & broadcast overlays",
      "Main stage branding & LED integration",
      "Premium booth (largest footprint)",
      "20 VIP passes + exclusive lounge",
      "Speaking slot at opening ceremony",
      "Full social media campaign partnership",
      "Post-event data & analytics report",
    ],
    potentialSponsors: [
      "Telco (Celcom / Maxis / Digi / U Mobile)",
      "Tourism Malaysia / MDEC",
      "Major Tech (Samsung / Huawei / Xiaomi / OPPO)",
    ],
  },
  {
    name: "Gold Sponsor",
    price: "RM 100,000 -- 200,000",
    slots: "3 slots available",
    colorClass: "border-t-[#ffd700]",
    benefits: [
      "Logo on event marketing materials",
      "Stage branding & broadcast mentions",
      "Large exhibition booth",
      "10 VIP passes",
      "Social media feature posts (3x)",
      "Product activation opportunity",
      "Post-event summary report",
    ],
    potentialSponsors: [
      "PC & Gaming Hardware (ROG / GIGABYTE AORUS / MSI / Razer)",
      "Components & Peripherals (Seasonic / HyperX / NVIDIA)",
      "Gaming Publishers (Moonton / Tencent / Garena)",
      "Beverage (100PLUS / Red Bull / Monster)",
    ],
  },
  {
    name: "Silver Sponsor",
    price: "RM 50,000 -- 100,000",
    slots: "5 slots available",
    colorClass: "border-t-[#c0c0c0]",
    benefits: [
      "Logo on event signage & website",
      "Medium exhibition booth",
      "5 VIP passes",
      "Social media mentions (2x)",
      "Product placement opportunity",
    ],
    potentialSponsors: [
      "F&B (Mamee / Milo / KFC Gaming)",
      "Fintech (Touch 'n Go / GrabPay / Boost)",
      "Streaming (YouTube Gaming / TikTok / Facebook Gaming)",
    ],
  },
  {
    name: "Bronze Sponsor",
    price: "RM 20,000 -- 50,000",
    slots: "10 slots available",
    colorClass: "border-t-[#cd7f32]",
    benefits: [
      "Logo on event website & program",
      "Small exhibition booth",
      "2 VIP passes",
      "Social media mention (1x)",
    ],
    potentialSponsors: [
      "Local Gaming Cafes & Retailers",
      "Indie Game Studios",
      "Apparel & Streetwear Brands",
      "Education / Coding Bootcamps",
    ],
  },
];

// ---- Core feature display cards -------------------------------------------

export interface CoreFeatureDisplay {
  id: string;
  icon: string;
  label: string;
  description: string;
  tags: string[];
  cost: number;
}

export const CORE_FEATURES_DISPLAY: CoreFeatureDisplay[] = [
  {
    id: "core-mgmt",
    icon: "ClipboardList",
    label: "Event Management & Operations",
    description:
      "End-to-end event management including project planning, staffing, volunteer coordination, on-site operations, and post-event reporting.",
    tags: ["Project Manager", "50+ Crew", "Safety & Compliance", "Post-Event Report"],
    cost: 130_000,
  },
  {
    id: "core-venue",
    icon: "Building2",
    label: "Venue Setup & Logistics",
    description:
      "Full venue dressing, staging, rigging, power distribution, internet infrastructure, and equipment logistics at KL Tower.",
    tags: ["Main Stage", "Power & Internet", "Signage", "Equipment"],
    cost: 100_000,
  },
  {
    id: "core-marketing",
    icon: "Megaphone",
    label: "Marketing & PR",
    description:
      "Integrated marketing campaign across digital, social media, press outreach, KOL partnerships, and international media coverage.",
    tags: ["Social Media", "Press Kit", "KOL Partners", "PR Campaign"],
    cost: 80_000,
  },
];

// ---- Impact stats ---------------------------------------------------------

export interface ImpactStat {
  icon: string;
  iconColorClass: string;
  iconBgClass: string;
  value: string;
  label: string;
}

export const IMPACT_STATS: ImpactStat[] = [
  {
    icon: "Users",
    iconColorClass: "text-accent-primary",
    iconBgClass: "bg-accent-primary/10",
    value: "5,000+",
    label: "Total Attendees",
  },
  {
    icon: "Share2",
    iconColorClass: "text-accent-secondary",
    iconBgClass: "bg-accent-secondary/10",
    value: "500K+",
    label: "Social Impressions",
  },
  {
    icon: "Tv",
    iconColorClass: "text-accent-tertiary",
    iconBgClass: "bg-accent-tertiary/10",
    value: "50K+",
    label: "Livestream Viewers",
  },
  {
    icon: "Newspaper",
    iconColorClass: "text-accent-warm",
    iconBgClass: "bg-accent-warm/10",
    value: "100+",
    label: "Media Mentions",
  },
  {
    icon: "Globe",
    iconColorClass: "text-accent-secondary",
    iconBgClass: "bg-accent-secondary/10",
    value: "200+",
    label: "International Visitors",
  },
  {
    icon: "Eye",
    iconColorClass: "text-accent-primary",
    iconBgClass: "bg-accent-primary/10",
    value: "30%",
    label: "KL Tower Visibility Boost",
  },
];

// ---- Marquee items --------------------------------------------------------

export interface MarqueeItem {
  icon: string;
  label: string;
}

export const MARQUEE_ITEMS: MarqueeItem[] = [
  { icon: "Trophy", label: "International Esports" },
  { icon: "Swords", label: "Community Tournaments" },
  { icon: "Code2", label: "Hackathon in the Sky" },
  { icon: "Cpu", label: "Mini Super Tech Expo" },
  { icon: "Monitor", label: "LAN Party in the Sky" },
  { icon: "Plane", label: "Tourism & Hospitality" },
  { icon: "Video", label: "Livestream & Talent" },
  { icon: "Sparkles", label: "Opening & Closing Ceremony" },
];
