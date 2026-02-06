# CLAUDE.md — Gaming in the Sky @ KL Tower 2026

This file provides guidance to Claude Code when working on the `/kltower` subdirectory.

## Purpose

Interactive web proposal pitching "Gaming in the Sky" — an international esports & tech festival at KL Tower — to the KL Tower Board of Directors. Must be presentation-ready (projector, boardroom, mobile).

## Files

- **index.html** — Single self-contained HTML file (~2,700 lines) with inline CSS + JS. The interactive proposal.
- **backup.html** — Backup copy of index.html before adjustments.
- **proposal.md** — Executive summary markdown for Manus to generate a polished slide deck.

## Architecture

Same as root project: no build system, no frameworks. Pure HTML5/CSS3/vanilla JS. Glassmorphism design system copied from the main site (`/index.html`).

No WebGL shader — kept lightweight for projector presentations.

## Branding

- Header: "Gaming In The Sky @ KL TOWER 2026" (not KITAMEN)
- Footer: "Gaming in the Sky @ KL Tower 2026 — A proposal by Special Ops Sdn Bhd"
- Hero image: KL Tower photo from Pexels (ID 4239538)

## Design System

Inherits all CSS custom properties from the main site:
- Dark glassmorphism: `--glass-bg`, `--glass-border`, `backdrop-filter: blur(20px)`
- Accents: `--accent-primary: #00ff88`, `--accent-secondary: #00d4ff`, `--accent-tertiary: #a855f7`
- Additional: `--gold: #ffd700`, `--silver: #c0c0c0`, `--bronze: #cd7f32` (sponsor tiers)

## Page Sections (in order)

1. **Hero** — Headline, quick stats (5,000+ attendees, 3 countries, 2–3 days, RM 500K–1M), CTAs, KL Tower image
2. **Scrolling Strip** — Event pillars ticker (International Esports, Community Tournaments, Hackathon, Tech Expo, LAN Party, Tourism, Livestream & Talent, Ceremony)
3. **Features** (`#features`) — 3 core cards (always on) + 8 toggleable feature cards + 3 preset buttons
4. **Budget Calculator** (`#budget`) — Live animated total, range bar, cost breakdown bars, sponsorship offset (60–85%)
5. **Sponsorship** (`#sponsorship`) — 4 tier cards (Title/Gold/Silver/Bronze)
6. **Timeline** (`#timeline`) — Format switcher (2D1N / 3-Day) + day tab switcher per format
7. **Impact** (`#impact`) — 6 metric cards
8. **Team** (`#team`) — Organizer credentials (Hazman Hassan)
9. **Next Steps** (`#next-steps`) — Contact, Print, Customize CTAs

## Tournament Structure

Two tiers of competition run in parallel:

**Invitational (Main Stage):**
- MLBB + Honor of Kings — MY vs PH vs ID, group stage → grand finals

**Community Open Tournaments (Side Stage):**
- MLBB, HOK, PUBG Mobile, EA FC 26, eFootball
- Open registration (walk-in + pre-reg), Swiss/bracket format
- Full livestream coverage with rotating caster pairs per title
- Side stage schedule is woven into both 2D1N and 3-Day timelines

## JavaScript State & Logic

- **State:** `Set` of active feature IDs (`activeFeatures`), initial: `['invitational', 'opentourneys', 'broadcast']`
- **Toggle handler:** Flip feature → recalculate → animate budget
- **Budget calculator:** `CORE_TOTAL + sum(active optional costs)`, animated with `requestAnimationFrame`
- **Range bar:** Maps total to 0–100% between RM 500K–1M
- **Preset buttons:** Set predefined feature combos → update all toggles + budget
- **Format switcher:** Show/hide 2D1N or 3-Day format containers
- **Day tabs:** Scoped to parent `.format-container` — show/hide timeline content per day within the active format
- **Scroll reveals:** IntersectionObserver with staggered fade-in
- **Print mode:** `@media print` converts dark → light, expands all formats + tabs, hides interactive elements

## Budget Math (verified)

| Component | Cost (RM) |
|-----------|-----------|
| **Core: Event Management** | 130,000 |
| **Core: Venue & Logistics** | 100,000 |
| **Core: Marketing & PR** | 80,000 |
| **Core Subtotal** | **310,000** |
| Optional: International Esports | 120,000 |
| Optional: Community Open Tournaments | 60,000 |
| Optional: Hackathon | 60,000 |
| Optional: Tech Expo | 80,000 |
| Optional: LAN Party | 40,000 |
| Optional: Tourism Package | 50,000 |
| Optional: Livestream, Talent & Broadcast | 80,000 |
| Optional: Ceremony | 40,000 |
| **All Optional Subtotal** | **530,000** |

### Preset Totals

| Preset | Features | Total (RM) |
|--------|----------|------------|
| Essential | Core + Invitational + Community Tournaments + Livestream & Talent | 570,000 |
| Standard | Core + Invitational + Community Tournaments + Hackathon + Tech Expo + Livestream & Talent + Ceremony | 750,000 |
| Premium | Core + All 8 Optional | 840,000 |

**Important:** If you change any cost value, update it in FOUR places:
1. The JS `CORE_COSTS` or `OPTIONAL_FEATURES` object
2. The HTML feature card's `<span class="feature-cost">` display
3. The preset button `<span class="preset-price">` labels (recalculate)
4. `proposal.md` budget tables and tier totals

## External Dependencies (CDN)

- **Lucide Icons** — `unpkg.com/lucide@latest`
- **Google Fonts** — Inter (400, 500, 600, 700, 800)
- **Pexels** — KL Tower hero image (photo ID 4239538)

## Mobile Responsive

CSS mobile optimizations are grouped in two `@media` blocks just before print styles:
- `@media (max-width: 767px)` — Mobile nav dropdown (vertical glass panel below header pill)
- `@media (max-width: 600px)` — Section padding, hero, budget card, sponsor grid/cards, feature tag wrapping
- `@media (max-width: 480px)` — Feature card padding, cost item label/amount widths, impact grid (2-col), timeline track indents

These supplement (not replace) the existing breakpoints at 968px, 600px, and 480px scattered inline.

## Print Mode

`window.print()` triggers `@media print` styles:
- Dark → light theme swap
- Hides: nav, toggles, preset buttons, range bar, format switcher, orbs, mesh gradient, footer
- Expands: both format containers visible, all timeline days visible
- Cleans: removes backdrop-filter, box-shadow, transforms
