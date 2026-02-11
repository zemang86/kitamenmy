# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Hazman Hassan — no build system, no package manager, no frameworks. Pure HTML5, CSS3, and vanilla JavaScript served as-is.

**Live site:** [www.zemang.my](https://www.zemang.my)
**Repository:** github.com/zemang86/kitamenmy

## Architecture

- **index.html** — Main single-page portfolio (~2,200 lines). Sections: hero (WebGL shader background), services, skills/tools, ventures, stats, portfolio, about, contact.
- **kltower/index.html** — Gaming in the Sky proposal (~2,450 lines). Interactive esports festival budget configurator for KL Tower. Glassmorphism design, tiered pricing, sponsorship packages.
- **ntu/index.html** — NTU x WirForce 2026 proposal (~2,050 lines). Interactive budget configurator with 3 presets, 8 toggleable features, tier comparison table, revenue breakdown, impact metrics, sponsorship packages, risk mitigation. See `ntu/CLAUDE.md` for full docs.
- **src/app/revmediawc26/** — Rev Media × KITAMEN World Cup 2026 livestream production proposal (Next.js). Budget configurator with 3 presets (Essential/Standard/Premium), 8 optional features, tier comparison, quotation generator with printable download. Data layer in `src/lib/budget-data/revmedia.ts`. Client: Rev Social Malaysia Sdn Bhd, from: Kitamen Resources Sdn Bhd.
- **roblox/index.html** — Standalone Roblox tournament registration page with retro design.
- **zakuan/** — Alternative landing pages (index.html, index2.html).
- **a_index.html** — Archived version with different accent color (#00ff41 vs #00ff88).
- **backup.html** — Backup of a previous version.

Each HTML file is fully self-contained (inline `<style>` + `<script>`). No component system or templating.

## Development

No build step. Open HTML files directly in a browser or use any static file server:

```
python3 -m http.server 8000
# or
npx serve .
```

No tests, linter, or CI pipeline exists.

## External Dependencies (CDN)

- **Lucide Icons** — `unpkg.com/lucide@latest` (icon library, initialized via `lucide.createIcons()`)
- **Google Fonts** — Inter (weights: 400, 500, 600, 700, 800)
- **Framer CDN** — Hero profile image hosted on framerusercontent.com
- **Unsplash** — Portfolio section placeholder images

## Design System (CSS Custom Properties in index.html)

Key variables defined on `:root`:
- `--bg-primary: #050508` / `--bg-secondary: #0a0a0f` — Dark backgrounds
- `--accent-primary: #00ff88` (mint green) / `--accent-secondary: #00d4ff` (cyan) / `--accent-tertiary: #a855f7` (purple)
- `--glass-bg: rgba(255,255,255,0.05)` / `--glass-border: rgba(255,255,255,0.1)` — Glassmorphism effect using `backdrop-filter: blur(20px)`

Responsive breakpoints: 480px, 768px, 968px.

## Key JavaScript Patterns

- **WebGL fragment shader** renders the animated plasma background in the hero section canvas (index.html only).
- **IntersectionObserver** triggers scroll-reveal animations with staggered delays (all pages).
- **Counter animation** uses `requestAnimationFrame` to animate statistics from 0 to target values (index.html, ntu/).
- **Passive scroll listeners** update floating orb positions for parallax effect (all pages).
- **Budget configurator** (kltower/, ntu/) — `recalculate()` master function drives preset/toggle state, cost breakdown, revenue breakdown, and tier highlighting.
- **Budget configurator** (revmediawc26/) — React-based with `useMemo`/`useCallback` hooks. Data in `src/lib/budget-data/revmedia.ts`, UI in `RevMediaConfigurator.tsx`. Core RM 32,000 (8 match days), optional features toggle on/off.
- All animations respect `prefers-reduced-motion` media query.

## Subproject Docs

- **kltower/CLAUDE.md** — KL Tower proposal page details
- **ntu/CLAUDE.md** — NTU x WirForce page details, budget logic, JS function reference
- **ntu/budget.md** — Quick-reference budget numbers
- **ntu/budgeting.md** — Comprehensive deck brief for Manus (16-slide structure, talking points, deep dives)

## Assets

Favicons (ico, png at 16/32/180/192/512px) and `og-image.jpg` are in the root. `roblox/edvideo.mp4` is an 18.8MB video asset — be mindful of git history size. `ntu/docs/` contains reference PDFs and deck JPGs (gitignored).
