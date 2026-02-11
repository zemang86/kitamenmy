# CLAUDE.md — NTU x WirForce 2026

## Project Overview

Budget configurator and proposal documents for the NTU x WirForce 2026 campus gaming festival in Singapore. Interactive budgeting tool + reference docs for deck production.

## Architecture

- **index.html** — Interactive budget configurator + full proposal page (~2050 lines, self-contained HTML/CSS/JS, glassmorphism design)
- **budget.md** — Budget reference document (2 tiers, 5 categories, for deck slides 11 & 12)
- **budgeting.md** — Comprehensive budgeting brief for deck generation via Manus
- **docs/** — Reference PDFs (NTU-Wirforce-Campus-main.pdf, NTUxWIRForce-2026-base.pdf, feedback deck, maindeck/)

## Page Flow (index.html)

```
Nav
Hero
Scrolling Marquee (CSS-only infinite ticker)
Configurator
  ├─ Preset buttons (3 tiers)
  ├─ Core costs banner ($260K always-on)
  ├─ Feature cards grid (11 toggleable)
  └─ Budget card
       ├─ Animated total + range bar
       ├─ Cost breakdown (bar chart)
       ├─ Tier Comparison Table (highlights active tier)
       ├─ Revenue Breakdown (6 streams, dynamic bars)
       └─ Sponsorship offset total
Impact Metrics (6 animated counters, IntersectionObserver)
NTU Cost Advantages (4 cards)
Sponsorship Packages (Title/Gold/Silver/Bronze cards)
Risk Mitigation (4 risk+mitigation cards)
Footer
```

## Key Numbers

- **Currency:** SGD ($)
- **Budget range:** $600K – $1.5M SGD
- **Tier 1 "The Launch":** $600,000 / 5,000 attendees (~$120/head)
- **Tier 2 "Standard":** $850,000 / ~7,500 attendees (~$113/head)
- **Tier 3 "Full Scale":** $1,540,000 / 10,000 attendees (~$154/head)
- **Core costs (always on):** $260,000
- **Sponsorship offset:** 55–80% cost recovery

## Budget Configurator Logic

**3 Core costs (always on, $260K):**
| Item | Cost |
|------|------|
| Venue & Infrastructure | $120,000 |
| Operations & Safety | $90,000 |
| Production Baseline | $50,000 |

**11 Optional features (toggleable, $1,280K total):**
| Feature | Cost |
|---------|------|
| Overdex Platform | $80,000 |
| LAN Arena Network | $100,000 |
| Esports Tournament | $140,000 |
| Live Broadcast | $100,000 |
| Campus Activations | $90,000 |
| Music & Entertainment | $80,000 |
| Marketing Campaign | $140,000 |
| Premium Scale-Up | $250,000 |
| F&B & Vendor Village | $100,000 |
| VIP & Hospitality | $80,000 |
| Prize Pool & Awards | $120,000 |

**3 Presets (attendee-based):**
- **5K — The Launch ($600K):** LAN Arena + Esports + Broadcast
- **7.5K — Standard ($850K):** + Overdex + Campus + Music
- **Full Scale ($1,540K):** All 11 features (10K attendees)

**Revenue streams (% of total, dynamic):**
Title sponsorship (13–20%), Gold/Silver/Bronze sponsors (13–17%), BYOC seat fees (4–5%), General admission (8–14%), Exhibitor booths (5–7%), F&B & merch (3–7%)

**Sponsorship packages (SGD):**
Title $150K–$300K (1 slot), Gold $50K–$80K (3), Silver $20K–$40K (5), Bronze $5K–$15K (10)

## Key JS Functions

- `recalculate()` — Master function: computes total, calls `animateTotal()`, `renderBreakdown()`, `renderRevenueBreakdown()`, `updateTierHighlight()`
- `renderRevenueBreakdown(total)` — Renders 6 revenue stream bars based on % of total
- `updateTierHighlight()` — Adds `.active-tier` class to matching tier column in comparison table
- `animateTotal(target)` — requestAnimationFrame counter animation for budget total
- Impact counter observer — IntersectionObserver triggers counter animations on `.impact-card[data-counter]`

## Design System

Same as main portfolio — see root CLAUDE.md for CSS custom properties, glassmorphism patterns, responsive breakpoints (480/768/968px). Lucide icons via CDN, Google Fonts (Inter).

## Baseline Reference

Alpha Launch deck budgeted $300K SGD for 2,000 BYOC gamers (infrastructure-only). The new budgets cover the full festival: LAN Arena + Campus Programming + Broadcast + Operations.
