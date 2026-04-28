# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio and proposal website for Hazman Hassan — hybrid architecture with static HTML pages and Next.js React pages, deployed via Netlify.

**Live site:** [www.zemang.my](https://www.zemang.my)
**Repository:** github.com/zemang86/kitamenmy

## Architecture

### Next.js Pages (React, `src/app/`)

- **src/app/kltower/** — Gaming in the Sky @ KL Tower 2026 proposal. Interactive esports festival budget configurator with toggleable features, 3 presets (Essential/Standard/Premium), partnership model (KL Tower RM 100K + venue vs KITAMEN production + sponsorship), revenue projection cards with 3-scenario table, sponsorship tiers, timeline, impact metrics. Data in `src/lib/budget-data/kltower.ts`, hook in `src/hooks/useBudgetCalculator.ts`. Components in `src/components/budget/`. See `kltower/CLAUDE.md` for full docs.
- **src/app/revmediawc26/** — Rev Media × KITAMEN World Cup 2026 livestream production proposal. Budget configurator with 3 presets, 8 optional features, tier comparison, quotation generator with printable download. Data in `src/lib/budget-data/revmedia.ts`. Client: Rev Social Malaysia Sdn Bhd.
- **src/app/holidayai/** — Holiday AI investor proposal. 16-slide paginated deck with light mode design (emerald #059669 + gold #d97706 on white), keyboard/touch/dot navigation, floating arrow buttons. Interactive P&L projection and investment calculator. Data in `src/lib/budget-data/holidayai.ts`.
- **src/app/holidayai/pnl/** — Holiday AI financial analysis workbook.
- **src/app/bayu-proposal/** — Bayu Sabah smart tourism AI state funding proposal. 13-slide deck (RM 3M ask) with app screenshots, credit mechanics, competitive landscape. Data in `src/lib/budget-data/bayu-sabah.ts`. Screenshots in `public/bayu-proposal/`.
- **src/app/ntu/** — NTU x WirForce 2026 budget configurator (React port). Data in `src/lib/budget-data/ntu.ts`.

### Static HTML Pages (self-contained, inline CSS + JS)

- **index.html** — Main single-page portfolio (~2,200 lines). Hero (WebGL shader), services, skills/tools, ventures, stats, portfolio, about, contact.
- **ntu/index.html** — NTU x WirForce 2026 proposal (static version). See `ntu/CLAUDE.md`.
- **roblox/index.html** — Roblox tournament registration page.
- **zakuan/** — Alternative landing pages.

## Development

```
npm run dev          # Next.js dev server on localhost:3000 (for React pages)
npm run build        # Production build (TypeScript checked)
```

Static HTML files can also be opened directly or served via `python3 -m http.server 8000`.

## Key Components (`src/components/budget/`)

- **BudgetConfigurator.tsx** — Main orchestrator: features section + budget calculator + partnership model + revenue section. Uses `useBudgetCalculator` hook for state.
- **PartnershipModel.tsx** — Deal structure: KL Tower (RM 100K + venue → 100% GA + 50% VIP) vs KITAMEN (production → sponsorship + participation fees).
- **RevenueBreakdown.tsx** — KL Tower revenue: glass cards per stream + 3-scenario table (conservative/moderate/optimistic). Uses `RevenueStreamKL` type.
- **NtuRevenueBreakdown.tsx** — NTU revenue: percentage-based bar chart. Uses `RevenueStream` type. Separate component to avoid type conflicts.
- **BudgetSummaryCard.tsx** — Animated total, range bar, cost breakdown bars.
- **SponsorshipCards.tsx** — Title/Gold/Silver/Bronze tier cards.
- **TimelineSection.tsx** — Format switcher (2D1N / 3-Day) + day tabs.
- **KLTowerHeader.tsx** — Floating pill nav with smooth scroll.
- **FeatureCard.tsx** — Core (always on) and Optional (toggleable) feature cards.
- **PresetButtons.tsx** — Essential/Standard/Premium preset switcher.

## Design System

Dark glassmorphism theme (CSS custom properties + Tailwind):
- `--bg-primary: #050508` / `--bg-secondary: #0a0a0f`
- `--accent-primary: #00ff88` (mint) / `--accent-secondary: #00d4ff` (cyan) / `--accent-tertiary: #a855f7` (purple)
- `--glass-bg: rgba(255,255,255,0.05)` / `--glass-border: rgba(255,255,255,0.1)` + `backdrop-filter: blur(20px)`
- Additional: `--gold: #ffd700`, `--accent-warm: #ff9f1c`

Light mode proposals (holidayai, bayu-proposal): emerald #059669 + gold #d97706 on white.

## Slide Deck Pattern (holidayai, bayu-proposal)

- Paginated horizontal slides with `translateX(-${current * 100}%)`
- Floating left/right circle buttons at `top-1/2` (hidden at first/last)
- Dot indicators at top center
- Slide counter at bottom right
- Keyboard (arrow keys, space, home/end) + touch swipe navigation

## External Dependencies

- **Lucide React** — Icon library (Next.js pages)
- **Lucide CDN** — `unpkg.com/lucide@latest` (static HTML pages)
- **Google Fonts** — Inter (400-800), Bebas Neue, IBM Plex Mono
- **Tailwind CSS** — Utility classes (Next.js pages only)

## Subproject Docs

- **kltower/CLAUDE.md** — KL Tower proposal details, budget math, section order
- **ntu/CLAUDE.md** — NTU x WirForce page details, budget logic, JS function reference
- **ntu/budget.md** — Quick-reference budget numbers

## Assets

Favicons (ico, png at 16/32/180/192/512px) and `og-image.jpg` in root. `roblox/edvideo.mp4` is 18.8MB. `ntu/docs/` contains reference PDFs (gitignored). `public/bayu-proposal/` contains 9 app screenshots.
