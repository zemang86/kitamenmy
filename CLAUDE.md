# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for Hazman Hassan — no build system, no package manager, no frameworks. Pure HTML5, CSS3, and vanilla JavaScript served as-is.

## Architecture

- **index.html** — Main single-page portfolio (2,200+ lines). Contains all HTML, CSS (via `<style>`), and JS (via `<script>`) inline. Sections: hero (with WebGL shader background), services, skills/tools, ventures, stats, portfolio, about, contact.
- **roblox/index.html** — Standalone Roblox tournament registration page with retro design.
- **zakuan/** — Alternative landing pages (index.html, index2.html).
- **a_index.html** — Archived version with different accent color (#00ff41 vs #00ff88).
- **backup.html** — Backup of a previous version.

There is no component system or templating. Each HTML file is fully self-contained with its own styles and scripts.

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

- **WebGL fragment shader** renders the animated plasma background in the hero section canvas.
- **IntersectionObserver** triggers scroll-reveal animations with staggered delays.
- **Counter animation** uses `requestAnimationFrame` to animate statistics from 0 to target values.
- **Passive scroll listeners** update floating orb positions for parallax effect.
- All animations respect `prefers-reduced-motion` media query.

## Assets

Favicons (ico, png at 16/32/180/192/512px) and `og-image.jpg` are in the root. `roblox/edvideo.mp4` is an 18.8MB video asset — be mindful of git history size.
