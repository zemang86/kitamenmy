// ---------------------------------------------------------------------------
// Gaming in the Sky @ KL Tower — Full Line-Item Cost Detail
// Source: kltower/costing-brief.md (v2)
// ---------------------------------------------------------------------------

export interface CostLineItem {
  item: string;
  detail: string;
  qty: string;
  unitRM: number; // 0 = TBC
  totalRM: number; // 0 = TBC
}

export interface CostGroup {
  code: string;
  name: string;
  items: CostLineItem[];
}

export interface CostCategoryDetail {
  code: string;
  name: string;
  groups: CostGroup[];
  subtotal: number;
  inKind?: boolean; // true = Category A (KL Tower fills)
}

// Helper: line item with computed total
const li = (
  item: string,
  detail: string,
  qty: string,
  unitRM: number,
  totalRM: number,
): CostLineItem => ({ item, detail, qty, unitRM, totalRM });

// TBC item (KL Tower-side)
const tbc = (item: string, detail: string, qty: string): CostLineItem =>
  li(item, detail, qty, 0, 0);

export const COST_DETAIL: CostCategoryDetail[] = [
  // ── A. Venue & Facilities (KL Tower fills) ────────────────────────────
  {
    code: "A",
    name: "Venue & Facilities (KL Tower)",
    inKind: true,
    subtotal: 0,
    groups: [
      {
        code: "A1",
        name: "Hall & Space Hire",
        items: [
          tbc("Megaview Banquet Hall", "Main event hall (event days)", "3 days"),
          tbc("Megaview — bump-in / strike", "Build + dismantle access", "3 days"),
          tbc("Outdoor plaza / forecourt", "Expo overflow / opening", "3 days"),
          tbc("Observation Deck", "Hackathon 48hr", "2 days"),
          tbc("Sky Box / Sky Deck", "VIP allocation", "1 lot"),
          tbc("Backstage / green rooms", "Talent, casters, intl teams", "3 rooms"),
          tbc("Storage / lock-up", "Crew + exhibitor crates", "2 rooms"),
          tbc("Press / media room", "Working space + interview booth", "1 room"),
        ],
      },
      {
        code: "A2",
        name: "Power, HVAC & Utilities",
        items: [
          tbc("3-phase power supply", "Base load + uplift", "1 lot"),
          tbc("Additional power capacity", "Stage + LAN + expo simultaneous", "1 lot"),
          tbc("HVAC — extended hours", "24/7 LAN zone cooling", "60 hrs"),
          tbc("Backup generator / UPS", "Continuity for broadcast + tournament", "1 unit"),
        ],
      },
      {
        code: "A3",
        name: "Access & Movement",
        items: [
          tbc("Lift / escalator extended hours", "Crowd movement", "5 days"),
          tbc("Loading bay access", "Bump-in / strike windows", "5 days"),
          tbc("Freight lift dedicated slot", "Equipment movement", "5 days"),
          tbc("Parking — crew", "Validated bays", "30 bays"),
          tbc("Parking — VIP", "Reserved bays", "25 bays"),
          tbc("Parking — exhibitors", "Validated bays", "30 bays"),
        ],
      },
      {
        code: "A4",
        name: "Cleaning, Waste & Restrooms",
        items: [
          tbc("Pre-event deep clean", "Before bump-in", "1 lot"),
          tbc("Daily cleaning during event", "3 shifts/day", "3 days"),
          tbc("Post-event cleaning", "After strike", "1 lot"),
          tbc("Restroom servicing — extended/overnight", "Public + LAN", "5 days"),
          tbc("Waste management & haulage", "Daily pickup", "5 days"),
        ],
      },
      {
        code: "A5",
        name: "Safety, Permits & Insurance",
        items: [
          tbc("BOMBA fire safety standby", "Mandatory for crowd events", "3 days"),
          tbc("DBKL permit / venue insurance", "Per KL Tower standing arrangement", "1 lot"),
          tbc("Venue F&B minimum / exclusive caterer fee", "If applicable", "1 lot"),
        ],
      },
      {
        code: "A6",
        name: "Branding & Existing Infrastructure",
        items: [
          tbc("Interior signage rights", "Lobby + tower interiors", "1 lot"),
          tbc("Exterior tower body signage", "LED / projection / wrap", "1 lot"),
          tbc("In-house AV / PA infrastructure", "Existing systems usable", "1 lot"),
        ],
      },
    ],
  },

  // ── B. Event Management & Operations ──────────────────────────────────
  {
    code: "B",
    name: "Event Management & Operations",
    subtotal: 220_000,
    groups: [
      {
        code: "B1",
        name: "Core Production Team",
        items: [
          li("Project Director", "Senior lead, 3 months", "3 months", 14_000, 42_000),
          li("Production Manager", "Day-to-day execution, 3 months", "3 months", 9_000, 27_000),
          li("Tournament Director", "Esports format owner, 2 months", "2 months", 8_000, 16_000),
          li("Stage Manager — Main", "Event days (incl. rehearsal)", "4 days", 1_500, 6_000),
          li("Stage Manager — Side", "Event days", "4 days", 1_000, 4_000),
          li("Volunteer Coordinator", "Recruit + brief + onsite", "1.5 months", 6_000, 9_000),
          li("Pre-event recces & vendor visits", "Site + supplier walks", "1 lot", 6_000, 6_000),
        ],
      },
      {
        code: "B2",
        name: "Crew (Bump-in to Bump-out, 5 days)",
        items: [
          li("Riggers", "Truss, LED, drape", "8 pax × 5 days", 450, 18_000),
          li("AV technicians", "Sound, lighting, video", "6 pax × 5 days", 500, 15_000),
          li("IT / network technicians", "LAN, Wi-Fi, broadcast IT", "4 pax × 5 days", 600, 12_000),
          li("General crew / runners", "Setup + onsite ops", "8 pax × 5 days", 280, 11_200),
        ],
      },
      {
        code: "B3",
        name: "Volunteers (90 pax)",
        items: [
          li("Volunteer T-shirts (2 per pax)", "Branded uniform", "180 pcs", 35, 6_300),
          li("Volunteer meals", "3 meals/day × 3 days", "810 meals", 18, 14_500),
          li("Volunteer transport allowance", "Per-day stipend", "90 pax × 3 days", 15, 4_000),
        ],
      },
      {
        code: "B4",
        name: "Safety & Security",
        items: [
          li("Safety officer / first-aid medic", "24h shift coverage", "3 days", 1_500, 4_500),
          li("Ambulance standby", "Finals day", "1 day", 4_000, 4_000),
          li("Private security supplement (day)", "Day shift", "10 pax × 3 days", 280, 8_500),
          li("Private security — overnight LAN", "Night shift", "5 pax × 2 nights", 1_200, 12_000),
        ],
      },
      {
        code: "B5",
        name: "Accreditation & Comms",
        items: [
          li("Accreditation / pass system (RFID)", "Anti-counterfeit", "1 lot", 9_000, 9_000),
          li("Two-way radios (rental)", "Crew comms", "35 units × 5 days", 35, 6_000),
          li("IFB / talkback headsets", "Production comms", "14 units × 5 days", 60, 4_000),
        ],
      },
      {
        code: "B6",
        name: "Site Office & Logistics",
        items: [
          li("Site office setup", "Printer, copier, supplies", "1 lot", 3_500, 3_500),
          li("Production van rental", "Equipment runs", "2 vans × 5 days", 400, 4_000),
          li("Fuel + tolls", "Across run", "1 lot", 700, 700),
          li("Crew teardown party", "Wrap appreciation", "1 lot", 3_500, 3_500),
        ],
      },
    ],
  },

  // ── C. Main Stage Production ──────────────────────────────────────────
  {
    code: "C",
    name: "Main Stage Production (Invitational)",
    subtotal: 260_000,
    groups: [
      {
        code: "C1",
        name: "Stage Build",
        items: [
          li("Truss system", "Goal post + roof", "1 lot", 22_000, 22_000),
          li("Stage deck + riser", "12m × 8m × 0.6m", "96 sqm", 150, 14_400),
          li("Skirting + black drape", "Stage front + sides", "1 lot", 5_000, 5_000),
        ],
      },
      {
        code: "C2",
        name: "Video / LED",
        items: [
          li("Main LED wall", "P3.9 indoor, 6m × 3.5m", "21 sqm", 1_500, 31_500),
          li("LED rigging + processor", "Controller + cabling", "1 lot", 7_500, 7_500),
          li("Side wing LED panels", "2 × (3m × 2m)", "12 sqm", 1_500, 18_000),
          li("Spare LED panels", "10% redundancy hot spares", "2.5 sqm", 1_500, 3_750),
        ],
      },
      {
        code: "C3",
        name: "Lighting",
        items: [
          li("Moving heads (wash + spot)", "Intelligent fixtures", "18 units", 850, 15_300),
          li("LED PAR cans", "Front + side wash", "28 units", 200, 5_600),
          li("Hazer / smoke", "Atmosphere", "2 units", 600, 1_200),
          li("Lighting console + LD", "grandMA + operator", "1 lot", 5_500, 5_500),
          li("Lighting cabling + dimmers", "Distribution", "1 lot", 5_000, 5_000),
        ],
      },
      {
        code: "C4",
        name: "Sound",
        items: [
          li("Line array FOH", "L+R hangs", "1 lot", 12_500, 12_500),
          li("Subwoofers", "Stage front", "4 units", 700, 2_800),
          li("Stage monitors / IEMs", "Caster + host", "8 units", 450, 3_600),
          li("Audio console + A1 engineer", "Digital desk", "1 lot", 7_000, 7_000),
        ],
      },
      {
        code: "C5",
        name: "Tournament Setup (Pro Spec)",
        items: [
          li("Soundproof player booths", "5v5 × 2 sides", "10 booths", 2_800, 28_000),
          li("Player chairs (gaming)", "Pro chairs", "14 units", 400, 5_600),
          li("Player monitors", "240Hz competition", "14 units", 850, 11_900),
          li("Casting desk build", "LED-accented", "1 unit", 6_500, 6_500),
          li("Analysis desk build", "3-seat", "1 unit", 5_500, 5_500),
          li("Tournament server", "Publisher-spec compliance", "1 lot", 14_000, 14_000),
          li("LAN switch + cabling (stage)", "Match network", "1 lot", 2_500, 2_500),
        ],
      },
      {
        code: "C6",
        name: "Power & Misc",
        items: [
          li("Power distribution + cabling", "Stage zone", "1 lot", 9_000, 9_000),
          li("Cable matting / ramps", "Crowd safety", "1 lot", 4_500, 4_500),
          li("Stage backdrop / scenic", "Branded build", "1 lot", 9_000, 9_000),
          li("Spare audio + monitors", "Backup", "1 lot", 4_000, 4_000),
        ],
      },
    ],
  },

  // ── D. Side Stage / Community ─────────────────────────────────────────
  {
    code: "D",
    name: "Side Stage / Community Tournaments",
    subtotal: 80_000,
    groups: [
      {
        code: "D1",
        name: "Side Stage Build",
        items: [
          li("Truss + deck", "6m × 4m", "24 sqm", 380, 9_000),
          li("Skirting + drape", "Black", "1 lot", 4_000, 4_000),
        ],
      },
      {
        code: "D2",
        name: "Side Stage AV",
        items: [
          li("Side LED screen", "4m × 2.5m P4", "10 sqm", 1_400, 14_000),
          li("Compact PA", "L+R + sub", "1 lot", 7_000, 7_000),
          li("Lighting (PARs + wash)", "Smaller rig", "1 lot", 4_000, 4_000),
        ],
      },
      {
        code: "D3",
        name: "Mobile Tournament Devices",
        items: [
          li("Tournament-spec phones (rental + insurance)", "iPhone 15 / equiv", "25 phones", 450, 11_250),
          li("Phone holders + cooling pads", "Per device", "25 units", 80, 2_000),
          li("Tournament SIM cards", "Dedicated network", "25 SIMs", 100, 2_500),
        ],
      },
      {
        code: "D4",
        name: "Console Rigs",
        items: [
          li("EA FC 26 — PS5 + 4K monitor", "Per station", "4 stations", 1_300, 5_200),
          li("eFootball — PS5 + 4K monitor", "Per station", "2 stations", 1_300, 2_600),
          li("Controllers + chargers + spares", "Tournament standard", "1 lot", 1_200, 1_200),
        ],
      },
      {
        code: "D5",
        name: "Crew & Talent",
        items: [
          li("Side stage casters (rotating)", "5 caster-days", "5 days", 1_800, 9_000),
          li("Hype MC", "3 days", "3 days", 1_200, 3_600),
          li("Side stage producer / TD", "3 days", "3 days", 1_500, 4_500),
        ],
      },
    ],
  },

  // ── E. Broadcast & Streaming ──────────────────────────────────────────
  {
    code: "E",
    name: "Broadcast & Streaming",
    subtotal: 250_000,
    groups: [
      {
        code: "E1",
        name: "Production Control",
        items: [
          li("Switcher (vMix rig) + control PC", "8-input", "1 lot", 11_000, 11_000),
          li("Replay system", "EVS-style", "1 unit", 6_000, 6_000),
          li("PGM/PVW broadcast monitors", "4 monitors", "1 lot", 4_000, 4_000),
          li("Multiviewer + processor", "Quad-split + control", "1 lot", 3_500, 3_500),
          li("Clear-Com / RTS intercom", "12-channel", "1 lot", 10_000, 10_000),
        ],
      },
      {
        code: "E2",
        name: "Cameras",
        items: [
          li("Broadcast cameras + lenses", "Sony FS7 / equiv", "6 units × 4 days", 850, 20_400),
          li("Jib / crane", "Main stage", "1 unit × 4 days", 1_300, 5_200),
          li("Roaming / handheld", "Crowd + reaction", "2 units × 4 days", 600, 4_800),
          li("Camera operators (senior)", "4 days", "8 pax × 4 days", 600, 19_000),
        ],
      },
      {
        code: "E3",
        name: "Production Crew",
        items: [
          li("Director / TD (senior)", "4 days incl. rehearsal", "4 days", 3_000, 12_000),
          li("Replay operator", "4 days", "4 days", 1_000, 4_000),
          li("Graphics operator (live)", "4 days", "4 days", 900, 3_600),
          li("Audio engineer (broadcast)", "4 days", "4 days", 800, 3_200),
          li("Onsite graphics designer", "Live updates", "4 days", 800, 3_200),
          li("Tournament observer / spectator client op", "Esports-specific", "4 days", 800, 3_200),
        ],
      },
      {
        code: "E4",
        name: "Streaming & Connectivity",
        items: [
          li("Streaming encoder + multi-platform CDN", "YT / FB / TT / Twitch", "1 lot", 6_000, 6_000),
          li("Stream redundancy / failover encoder", "Backup", "1 lot", 3_500, 3_500),
          li("Dedicated 1Gbps fibre — broadcast", "Event run", "1 line", 12_000, 12_000),
          li("4G/5G bonded failover", "Backup uplink", "1 lot", 6_500, 6_500),
        ],
      },
      {
        code: "E5",
        name: "Tournament Software",
        items: [
          li("Toornament / Tournify license", "Bracket + scoreboard", "1 lot", 3_500, 3_500),
          li("OBS / scene management + automation", "Setup + ops", "1 lot", 2_500, 2_500),
        ],
      },
      {
        code: "E6",
        name: "On-Air Talent",
        items: [
          li("Casters — MLBB invitational", "2 senior × 3 days", "6 caster-days", 3_000, 18_000),
          li("Casters — HOK invitational (mandarin-capable)", "2 senior × 3 days", "6 caster-days", 3_200, 19_200),
          li("Hosts / MCs", "Main stage hosting", "2 pax × 3 days", 1_800, 10_800),
          li("Analysts", "Pre/post match desk", "2 pax × 3 days", 1_500, 9_000),
          li("Floor MCs", "Crowd hype", "2 pax × 3 days", 1_000, 6_000),
        ],
      },
      {
        code: "E7",
        name: "Talent Logistics",
        items: [
          li("Talent travel + accommodation", "Intl casters if non-MY", "1 lot", 14_000, 14_000),
          li("Hair / makeup / stylist", "On-air talent", "4 days", 1_750, 7_000),
        ],
      },
      {
        code: "E8",
        name: "Rehearsal Day",
        items: [
          li("Rehearsal day — full crew + equipment", "D-1 PM, mandatory", "1 day", 16_000, 16_000),
        ],
      },
      {
        code: "E9",
        name: "Graphics & Post",
        items: [
          li("Graphics package design", "Overlays, lower thirds, intros", "1 lot", 14_000, 14_000),
          li("Highlights editor + 3 reels", "Post-event", "1 lot", 8_000, 8_000),
          li("Aftermovie / sizzle (3-min cut)", "Hero piece", "1 reel", 6_000, 6_000),
        ],
      },
    ],
  },

  // ── F. International Invitational ─────────────────────────────────────
  {
    code: "F",
    name: "International Invitational (Teams)",
    subtotal: 380_000,
    groups: [
      {
        code: "F1",
        name: "Prize Pool (Tier-1 Sanctioned)",
        items: [
          li("MLBB — 1st place", "Champion", "1", 50_000, 50_000),
          li("MLBB — 2nd place", "Runner-up", "1", 30_000, 30_000),
          li("MLBB — 3rd place", "Semi-finalist", "1", 20_000, 20_000),
          li("HOK — 1st place", "Champion", "1", 50_000, 50_000),
          li("HOK — 2nd place", "Runner-up", "1", 30_000, 30_000),
          li("HOK — 3rd place", "Semi-finalist", "1", 20_000, 20_000),
        ],
      },
      {
        code: "F2",
        name: "Team Appearance Fees",
        items: [
          li("Foreign team appearance fee", "PH + ID tier-1", "8 teams", 12_000, 96_000),
          li("MY team appearance", "Local teams", "4 teams", 0, 0),
        ],
      },
      {
        code: "F3",
        name: "Flights (8 foreign teams × 7 pax = 56 pax)",
        items: [
          li("KL ↔ Manila return", "Economy, early-booked", "28 pax", 1_000, 28_000),
          li("KL ↔ Jakarta return", "Economy, early-booked", "28 pax", 1_000, 28_000),
        ],
      },
      {
        code: "F4",
        name: "Hotel",
        items: [
          li("4★ twin share rooms", "4 nights (D-1 → D+0)", "30 rooms × 4 nights", 380, 45_600),
        ],
      },
      {
        code: "F5",
        name: "Per Diem & F&B",
        items: [
          li("Player meal allowance", "RM 120/pax/day", "84 pax × 4 days", 120, 40_300),
        ],
      },
      {
        code: "F6",
        name: "Ground Transport",
        items: [
          li("Coaster bus — hotel ↔ venue", "Daily shuttle", "4 days", 1_500, 6_000),
          li("MPV airport pickup", "Arrival + departure", "8 trips", 280, 2_200),
        ],
      },
      {
        code: "F7",
        name: "Practice & Officials",
        items: [
          li("Practice room (D-1)", "Scrim setup", "1 day", 4_500, 4_500),
          li("Visa / immigration support", "Letters + agent fee", "1 lot", 4_000, 4_000),
          li("Player insurance (group)", "Event-day cover", "84 pax", 50, 4_200),
          li("Tournament referees (Tier 1, cert)", "Publisher-cert refs", "4 refs × 3 days", 800, 9_600),
          li("Game publisher liaison", "Moonton / Tencent", "1 lot", 8_000, 8_000),
        ],
      },
      {
        code: "F8",
        name: "Welcome Packs",
        items: [
          li("Team gift bags + jerseys", "Per team", "12 teams", 400, 4_800),
        ],
      },
    ],
  },

  // ── G. Community Tournament Operations ────────────────────────────────
  {
    code: "G",
    name: "Community Tournament Operations",
    subtotal: 70_000,
    groups: [
      {
        code: "G1",
        name: "Prize Pools",
        items: [
          li("MLBB community", "1st/2nd/3rd", "3 places", 0, 10_000),
          li("HOK community", "1st/2nd/3rd", "3 places", 0, 10_000),
          li("PUBG Mobile", "1st/2nd/3rd", "3 places", 0, 8_000),
          li("EA FC 26 (solo)", "1st/2nd/3rd", "3 places", 0, 5_000),
          li("eFootball (solo)", "1st/2nd/3rd", "3 places", 0, 5_000),
        ],
      },
      {
        code: "G2",
        name: "Awards & Recognition",
        items: [
          li("Trophies", "Custom, 5 titles × 3 places", "15 trophies", 280, 4_200),
          li("Medals", "Participants", "100 medals", 25, 2_500),
        ],
      },
      {
        code: "G3",
        name: "Software & Operations",
        items: [
          li("Bracket software / check-in app", "Toornament / Battlefy", "1 license", 2_500, 2_500),
          li("Player notification + RFID wristbands", "Comms + entry verification", "1 lot", 5_000, 5_000),
          li("Tournament admins", "One per title × 3 days", "5 admins × 3 days", 700, 10_500),
          li("Game licenses + publisher coordination", "Sanction docs", "1 lot", 3_500, 3_500),
        ],
      },
      {
        code: "G4",
        name: "Player Comfort & Anti-Cheat",
        items: [
          li("Lockboxes (phone-deposit)", "Anti-cheat", "25 units", 100, 2_500),
          li("Phone charger stations", "Comfort", "12 units", 100, 1_200),
          li("Player rest / waiting area", "Furniture + signage", "1 lot", 5_000, 5_000),
        ],
      },
    ],
  },

  // ── H. Hackathon ──────────────────────────────────────────────────────
  {
    code: "H",
    name: "Hackathon (48hr, 80 hackers)",
    subtotal: 90_000,
    groups: [
      {
        code: "H1",
        name: "Prize Pool",
        items: [
          li("Grand Prize", "1st place team", "1", 15_000, 15_000),
          li("2nd Place", "Runner-up", "1", 8_000, 8_000),
          li("3rd Place", "Third team", "1", 4_000, 4_000),
          li("Special category prizes", "Best UI, Best AI, etc.", "4", 1_250, 5_000),
        ],
      },
      {
        code: "H2",
        name: "Mentors & Judges",
        items: [
          li("Mentor honorarium", "6 mentors", "6", 1_500, 9_000),
          li("Judges (sponsor seats)", "Complimentary", "5", 0, 0),
        ],
      },
      {
        code: "H3",
        name: "Hacker Kits",
        items: [
          li("T-shirts", "Branded", "90", 35, 3_150),
          li("Lanyards + ID badges", "Access control", "90", 8, 720),
          li("Welcome swag", "Sticker, notebook, pen", "90", 25, 2_250),
        ],
      },
      {
        code: "H4",
        name: "Workspace Setup",
        items: [
          li("Tables (per team pod)", "6ft tables", "20", 80, 1_600),
          li("Chairs", "4 per pod", "80", 25, 2_000),
          li("Power strips (8-port)", "Per pod", "20", 60, 1_200),
          li("Multiplugs / extension cords", "Distribution", "1 lot", 200, 200),
          li("Whiteboards + markers + post-its", "Per team", "20 sets", 80, 1_600),
          li("UPS for hackathon zone", "Power continuity", "1 lot", 4_000, 4_000),
        ],
      },
      {
        code: "H5",
        name: "Connectivity",
        items: [
          li("High-capacity Wi-Fi mesh", "Separate SSID", "1 lot", 4_500, 4_500),
        ],
      },
      {
        code: "H6",
        name: "Hacker F&B (24/7)",
        items: [
          li("Catered meals", "3 meals × 3 days × 80 pax", "720 meals", 22, 15_800),
          li("Pizza nights / late dinners", "2 nights", "2 nights", 1_200, 2_400),
          li("Snacks + sweets", "Self-serve", "1 lot", 1_500, 1_500),
          li("Energy drinks", "24/7 stock", "1 lot", 1_500, 1_500),
          li("Coffee station", "24/7", "1 lot", 1_800, 1_800),
        ],
      },
      {
        code: "H7",
        name: "Demo Day",
        items: [
          li("Mini stage + screen", "Demo presentations", "1 lot", 4_500, 4_500),
          li("Demo audio (PA, mics)", "Showcase", "1 lot", 2_000, 2_000),
        ],
      },
      {
        code: "H8",
        name: "Hacker Welfare",
        items: [
          li("Sleep zone / nap mats / bean bags", "48hr endurance", "1 lot", 3_000, 3_000),
        ],
      },
      {
        code: "H9",
        name: "Cloud / API Credits",
        items: [
          li("AWS / Vercel / OpenAI credits", "Sponsor-offset target", "1 lot", 0, 0),
        ],
      },
    ],
  },

  // ── I. LAN Party ──────────────────────────────────────────────────────
  {
    code: "I",
    name: "LAN Party (BYOC, 150 seats, 60h continuous)",
    subtotal: 140_000,
    groups: [
      {
        code: "I1",
        name: "Furniture",
        items: [
          li("6ft tables (2 seats each)", "Standard LAN", "75", 80, 6_000),
          li("Chairs", "Per seat", "150", 20, 3_000),
        ],
      },
      {
        code: "I2",
        name: "Power Distribution",
        items: [
          li("Power strips (8-port, surge)", "Per 2-seat table", "75", 70, 5_250),
          li("Spare power strips", "10% redundancy", "8", 70, 560),
          li("Extension drops + heavy-gauge cables", "Distribution to row", "1 lot", 2_500, 2_500),
        ],
      },
      {
        code: "I3",
        name: "Network Hardware",
        items: [
          li("Managed switches (24-port, gigabit)", "Per row", "8", 1_500, 12_000),
          li("Spare managed switch", "Hot spare", "1", 1_500, 1_500),
          li("Core switch + 10G uplink", "Aggregation", "1", 5_000, 5_000),
          li("Wi-Fi APs (high-density)", "Roam coverage", "6", 100, 600),
        ],
      },
      {
        code: "I4",
        name: "Cabling",
        items: [
          li("Cat6 cable (run + label)", "~1.5km", "1.5 km", 5_500, 8_250),
          li("Cable strain relief + ties", "Tidy + safe", "1 lot", 1_500, 1_500),
          li("Spare cabling stock", "10% redundancy", "1 lot", 1_500, 1_500),
        ],
      },
      {
        code: "I5",
        name: "Internet (Critical)",
        items: [
          li("Primary 2Gbps dedicated line", "Burstable, separate from broadcast", "1 line", 16_000, 16_000),
          li("Backup 1Gbps redundant line", "Failover", "1 line", 8_000, 8_000),
          li("Latency monitoring + analyzer", "Smokeping / similar", "1 lot", 1_500, 1_500),
          li("Local game server hosting", "CS2/Valorant/Dota2 dedicated", "1 lot", 4_000, 4_000),
        ],
      },
      {
        code: "I6",
        name: "LAN Operations Crew",
        items: [
          li("Senior network engineer (24/7)", "2 engineers, 60h coverage", "2 × 60h", 200, 24_000),
          li("Swing-shift network engineer", "Handover", "1 × 30h", 200, 6_000),
          li("LAN admins / community ops", "4 staff × 3 days", "12 admin-days", 800, 9_600),
          li("Overnight security supplement", "2 nights", "2 nights", 3_500, 7_000),
        ],
      },
      {
        code: "I7",
        name: "Casual Tournament + Activations",
        items: [
          li("Casual tournament prizes", "LAN-zone side comps", "1 lot", 6_000, 6_000),
          li("Retro corner — CRTs + console pods", "6 stations", "1 lot", 8_000, 8_000),
          li("PC modding showcase build", "Mod-rig display + voting", "1 lot", 5_500, 5_500),
        ],
      },
      {
        code: "I8",
        name: "Signage & Wayfinding",
        items: [
          li("LAN-zone signage", "Branded entry + row labels", "1 lot", 3_500, 3_500),
        ],
      },
    ],
  },

  // ── J. Mini Tech Expo ─────────────────────────────────────────────────
  {
    code: "J",
    name: "Mini Tech Expo (30+ booths)",
    subtotal: 115_000,
    groups: [
      {
        code: "J1",
        name: "Booth Build",
        items: [
          li("Modular shell scheme (3m × 3m)", "Standard build per booth", "30 booths", 1_650, 49_500),
        ],
      },
      {
        code: "J2",
        name: "Flooring & Power",
        items: [
          li("Carpet / flooring", "Across expo zone", "1 lot", 8_000, 8_000),
          li("Raised platform sections", "Where required", "1 lot", 3_500, 3_500),
          li("Booth power distribution (15A)", "Per booth", "30", 280, 8_400),
        ],
      },
      {
        code: "J3",
        name: "Booth Lighting",
        items: [
          li("Booth spotlights", "2 per booth", "60", 100, 6_000),
        ],
      },
      {
        code: "J4",
        name: "Booth Connectivity",
        items: [
          li("Booth Wi-Fi access", "Per booth", "30", 100, 3_000),
          li("Booth LAN drops (premium)", "Where requested", "10", 300, 3_000),
        ],
      },
      {
        code: "J5",
        name: "Booth Furniture",
        items: [
          li("Standard furniture pack", "Table, 2 chairs, info counter", "30", 320, 9_600),
        ],
      },
      {
        code: "J6",
        name: "Common Areas",
        items: [
          li("Expo lounge / rest area", "Soft seating + tables", "1 lot", 6_000, 6_000),
          li("Info desk / registration counter", "Branded", "1 lot", 4_000, 4_000),
        ],
      },
      {
        code: "J7",
        name: "Signage",
        items: [
          li("Booth fascia print", "Per exhibitor", "30", 220, 6_600),
        ],
      },
      {
        code: "J8",
        name: "Pre-Event & Onsite Ops",
        items: [
          li("Floor plan design", "Pre-event", "1 lot", 1_500, 1_500),
          li("Exhibitor manual + briefing", "Pre-event", "1 lot", 1_500, 1_500),
          li("Exhibitor liaison", "1 month run-up + onsite", "1 lot", 7_000, 7_000),
          li("Loading + dismantling crew", "Bump-in / out", "1 lot", 5_500, 5_500),
          li("Exhibitor freight handling", "Storage + return", "1 lot", 2_500, 2_500),
        ],
      },
    ],
  },

  // ── K. Marketing, PR & Content ────────────────────────────────────────
  {
    code: "K",
    name: "Marketing, PR & Content",
    subtotal: 200_000,
    groups: [
      {
        code: "K1",
        name: "Digital Advertising (MY/PH/ID)",
        items: [
          li("Meta (FB + IG) ad spend", "6-week, geo-targeted", "1 lot", 30_000, 30_000),
          li("TikTok ad spend", "6-week, intl reach", "1 lot", 25_000, 25_000),
          li("Google / YouTube ad spend", "Search + pre-roll", "1 lot", 18_000, 18_000),
          li("Twitch / esports media buys", "Niche reach", "1 lot", 8_000, 8_000),
        ],
      },
      {
        code: "K2",
        name: "KOL / Influencer",
        items: [
          li("Mid-tier MY KOLs (gaming/tech)", "6 creators × RM 6K", "6", 6_000, 36_000),
          li("Top-tier crossover KOL × 1", "Mainstream reach", "1", 18_000, 18_000),
          li("PH/ID gaming creators", "2 each × RM 4K", "4", 4_000, 16_000),
        ],
      },
      {
        code: "K3",
        name: "PR & Media",
        items: [
          li("PR agency retainer (senior tier)", "3 months", "3 months", 14_000, 42_000),
          li("Press launch event", "1-month-out activation", "1 event", 12_000, 12_000),
        ],
      },
      {
        code: "K4",
        name: "Brand & Web",
        items: [
          li("Brand identity / key visuals", "Logo lock-up + collateral", "1 lot", 10_000, 10_000),
          li("Website + ticketing landing page", "Custom build", "1 lot", 14_000, 14_000),
        ],
      },
      {
        code: "K5",
        name: "Content (2 Photo + 2 Video Teams)",
        items: [
          li("Photographer Team A (main stage)", "3 event days", "3 days", 1_800, 5_400),
          li("Photographer Team B (B-roll)", "3 event days", "3 days", 1_500, 4_500),
          li("Videographer Team A (main stage)", "3 event days", "3 days", 2_800, 8_400),
          li("Videographer Team B (B-roll, intl team profiles)", "3 event days", "3 days", 2_300, 6_900),
          li("Hype reel (pre-event)", "60s social cut", "1 reel", 7_000, 7_000),
          li("Aftermovie", "90s recap", "1 reel", 9_000, 9_000),
        ],
      },
      {
        code: "K6",
        name: "Social Media Management (Live)",
        items: [
          li("Real-time SM team (during event)", "4 days, 2-pax shifts", "1 lot", 18_000, 18_000),
        ],
      },
      {
        code: "K7",
        name: "Print & Merch",
        items: [
          li("Print collateral", "Brochures, posters, wayfinding", "1 lot", 7_000, 7_000),
          li("Merchandise — T-shirts", "Run of 800", "800", 18, 14_400),
          li("Merchandise — lanyards + badges", "Run of 1,200", "1,200", 3, 3_600),
          li("Step-and-repeat / photo walls", "3 locations", "3 builds", 2_200, 6_600),
        ],
      },
    ],
  },

  // ── L. Opening / Closing Ceremony ─────────────────────────────────────
  {
    code: "L",
    name: "Opening / Closing Ceremony",
    subtotal: 60_000,
    groups: [
      {
        code: "L1",
        name: "Opening Production",
        items: [
          li("LED countdown + visual package", "Custom motion graphics", "1 lot", 10_000, 10_000),
          li("Cultural performance × 1–2 acts", "Local artists", "1 lot", 12_000, 12_000),
          li("Cold-spark / indoor pyro", "BOMBA-approved", "1 lot", 6_500, 6_500),
          li("VIP gifts + speeches AV support", "Lectern, mic, prompter", "1 lot", 4_500, 4_500),
        ],
      },
      {
        code: "L2",
        name: "Awards Ceremony",
        items: [
          li("Trophies + presentation flow", "All categories", "1 lot", 9_000, 9_000),
        ],
      },
      {
        code: "L3",
        name: "Closing After-Party",
        items: [
          li("DJ booth + DJ set", "3-hour set, mid-tier", "1 set", 6_000, 6_000),
          li("Closing canapés + drinks", "VIP + finalists", "100 pax", 90, 9_000),
          li("Ambient lighting / atmospheric design", "Closing party", "1 lot", 4_500, 4_500),
        ],
      },
    ],
  },

  // ── M. F&B (Crew, Talent, VIP) ────────────────────────────────────────
  {
    code: "M",
    name: "F&B (Crew, Talent, VIP)",
    subtotal: 65_000,
    groups: [
      {
        code: "M1",
        name: "Crew Meals",
        items: [
          li("Crew meals", "90 pax × 3 meals × 5 days, halal", "1,350 meals", 30, 40_500),
        ],
      },
      {
        code: "M2",
        name: "VIP / Sponsor Hospitality",
        items: [
          li("VIP / sponsor lunches × 2 days", "Buffet", "60 pax × 2 days", 110, 13_200),
        ],
      },
      {
        code: "M3",
        name: "Talent Green Room",
        items: [
          li("Caster / talent green room catering", "4 days incl. rehearsal", "4 days", 1_500, 6_000),
        ],
      },
      {
        code: "M4",
        name: "Hydration & Coffee Stations",
        items: [
          li("Water cooler stations", "All-day", "5 days", 250, 1_250),
          li("Coffee / tea stations", "All-day", "5 days", 800, 4_000),
        ],
      },
    ],
  },

  // ── N. Tourism & Hospitality ──────────────────────────────────────────
  {
    code: "N",
    name: "Tourism & Hospitality (Intl + VIP)",
    subtotal: 65_000,
    groups: [
      {
        code: "N1",
        name: "Transfers",
        items: [
          li("Coaster bus airport transfers", "Arrival + departure", "4 trips", 1_500, 6_000),
          li("MPV airport transfers (VIP / casters)", "Premium", "14 trips", 280, 3_900),
        ],
      },
      {
        code: "N2",
        name: "VIP Lounge",
        items: [
          li("Lounge dressing / décor", "At KL Tower", "1 lot", 7_000, 7_000),
          li("Lounge furniture rental", "Sofa, side tables, AV", "1 lot", 4_500, 4_500),
          li("Lounge F&B uplift", "Premium catering", "1 lot", 5_000, 5_000),
          li("VIP concierge service", "Senior politicians/sponsors", "1 lot", 8_000, 8_000),
        ],
      },
      {
        code: "N3",
        name: "Cultural Experience",
        items: [
          li("KL city tour (optional half-day)", "Guides + transport", "1 lot", 8_000, 8_000),
          li("Halal food trail / welcome dinner", "Off-site", "100 pax", 130, 13_000),
        ],
      },
      {
        code: "N4",
        name: "Liaison Officers",
        items: [
          li("Liaison officers (multilingual incl. mandarin)", "4 days each", "4 pax × 4 days", 550, 8_800),
        ],
      },
    ],
  },

  // ── O. Insurance, Permits, Contingency ────────────────────────────────
  {
    code: "O",
    name: "Insurance, Permits, Contingency",
    subtotal: 290_000,
    groups: [
      {
        code: "O1",
        name: "Insurance",
        items: [
          li("Public liability insurance", "RM 10M cover, 5,000-attendee event", "1 policy", 22_000, 22_000),
          li("Equipment all-risk insurance", "RM 1M+ hire-in coverage", "1 policy", 14_000, 14_000),
        ],
      },
      {
        code: "O2",
        name: "Permits & Licensing",
        items: [
          li("BOMBA permit + safety inspection", "Per crowd capacity", "1 lot", 6_000, 6_000),
          li("DBKL entertainment permit", "Local council", "1 lot", 3_500, 3_500),
          li("PRSM / MACP music licensing", "Commercial music play", "1 lot", 3_500, 3_500),
          li("MOTAC / MDEC compliance", "Tourism + digital", "1 lot", 3_000, 3_000),
        ],
      },
      {
        code: "O3",
        name: "Contingency (12%)",
        items: [
          li("Contingency reserve", "Industry-standard pilot risk buffer", "1 lot", 240_000, 240_000),
        ],
      },
    ],
  },

  // ── P. Pre-Event Activations ──────────────────────────────────────────
  {
    code: "P",
    name: "Pre-Event Activations",
    subtotal: 50_000,
    groups: [
      {
        code: "P1",
        name: "Roadshow (3-City: KL, Penang, JB)",
        items: [
          li("Mall / community pop-up booths", "3 cities × 2 days", "3", 8_000, 24_000),
          li("Roadshow staff", "4 pax × 3 cities", "12 staff-days", 400, 4_800),
          li("Roadshow merchandise / giveaways", "Hype seeding", "1 lot", 4_000, 4_000),
          li("Travel + accommodation", "Penang + JB legs", "1 lot", 5_000, 5_000),
        ],
      },
      {
        code: "P2",
        name: "Press Launch (1-Month-Out)",
        items: [
          li("Press launch venue + F&B", "60 media + sponsors", "1 event", 8_000, 8_000),
          li("Media kit production", "Print + digital", "1 lot", 4_000, 4_000),
        ],
      },
    ],
  },

  // ── Q. Tournament Integrity & Welfare ─────────────────────────────────
  {
    code: "Q",
    name: "Tournament Integrity & Welfare",
    subtotal: 35_000,
    groups: [
      {
        code: "Q1",
        name: "Anti-Cheat & Integrity",
        items: [
          li("Tournament observer / spectator client setup", "Per-match monitoring", "1 lot", 6_000, 6_000),
          li("Replay analysis tools", "Post-match review", "1 lot", 3_000, 3_000),
          li("Independent integrity officer", "Suspicion adjudication", "3 days", 1_500, 4_500),
        ],
      },
      {
        code: "Q2",
        name: "Player & Crew Welfare",
        items: [
          li("Mental health / sports physio standby", "Players + crew", "3 days", 1_500, 4_500),
          li("Prayer / meditation room dressing", "Player welfare", "1 lot", 2_500, 2_500),
        ],
      },
      {
        code: "Q3",
        name: "Translation Services",
        items: [
          li("Mandarin interpreter (HOK)", "3 days", "3 days", 1_200, 3_600),
          li("Tagalog / Bahasa interpreter", "3 days", "3 days", 1_000, 3_000),
        ],
      },
      {
        code: "Q4",
        name: "Crisis Comms & Government Liaison",
        items: [
          li("Pre-drafted crisis statements + onsite spokesperson", "Built into PR retainer", "1 lot", 0, 0),
          li("Government liaison (MOTAC / MOC / MDEC)", "Relationship management", "1 lot", 8_000, 8_000),
        ],
      },
    ],
  },

  // ── R. Post-Event Reporting & Analytics ───────────────────────────────
  {
    code: "R",
    name: "Post-Event Reporting & Analytics",
    subtotal: 30_000,
    groups: [
      {
        code: "R1",
        name: "Sponsor Report & Data",
        items: [
          li("Third-party analytics", "Footfall, dwell, social", "1 lot", 12_000, 12_000),
          li("Sponsor ROI report (per tier)", "Custom decks", "1 lot", 8_000, 8_000),
          li("Post-event documentary (5–7 min)", "Sales tool for Year 2", "1 lot", 10_000, 10_000),
        ],
      },
    ],
  },
];

// ── CSV Generator (Detailed Line Items) ───────────────────────────────────

export function generateDetailedCostCSV(): string {
  const rows: string[] = [];
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;

  rows.push("Gaming in the Sky @ KL Tower — Full Cost Breakdown");
  rows.push("All figures in RM (Ringgit Malaysia)");
  rows.push("");
  rows.push(
    "Category Code,Category,Group Code,Group,Item,Detail,Qty,Unit (RM),Total (RM)",
  );

  COST_DETAIL.forEach((cat) => {
    cat.groups.forEach((grp) => {
      grp.items.forEach((it) => {
        rows.push(
          [
            cat.code,
            escape(cat.name),
            grp.code,
            escape(grp.name),
            escape(it.item),
            escape(it.detail),
            escape(it.qty),
            it.unitRM,
            it.totalRM,
          ].join(","),
        );
      });
    });
    rows.push(
      [
        cat.code,
        escape(cat.name),
        "",
        "SUBTOTAL",
        "",
        "",
        "",
        "",
        cat.subtotal,
      ].join(","),
    );
  });

  const grandTotal = COST_DETAIL.reduce((sum, c) => sum + c.subtotal, 0);
  rows.push(
    `,GRAND TOTAL (excl. Category A — KL Tower in-kind),,,,,,,${grandTotal}`,
  );

  return rows.join("\n");
}
