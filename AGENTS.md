# AGENTS.md — Tony Mikityuk Personal Brand Site

Instructions for AI agents working in this repo.

---

## Source of Truth

- **Design tokens:** `css/tokens.css` — all colors, typography, spacing, motion, and layout variables live here. Never use magic numbers; always reference tokens.
- **Shared styles:** `css/styles.css` — all component and layout styles. BEM-influenced class naming.
- **Interactivity:** `js/main.js` — scroll reveal, nav, FAQ accordion, chatbot, about-section glow. ~185 lines.
- **Wave animation:** `js/wave.js` — shared Three.js dotted-surface animation. Called with page-specific config (container ID, camera position).
- **README.md** — project context, architecture, and reviewer-facing orientation.

## Read Order

1. This file (`AGENTS.md`)
2. `README.md` — understand what the project is and why it exists
3. `css/tokens.css` — understand the design system before touching any styles
4. `css/styles.css` — understand component patterns
5. `index.html` — primary page, most complete reference for structure and conventions
6. `js/main.js` — all shared interactivity

## Architecture

```
Static HTML/CSS/JS — no build tools, no frameworks, no package.json.

index.html          → Home (hero, about, skills, education, experience, contact/FAQ)
projects.html       → Agentic Projects listing
project-detail.html → Generic project detail template (placeholder)
project-site.html   → Detail page for this site itself
hire-me.html        → Standalone Contact & FAQ page

css/tokens.css      → Design tokens (custom properties)
css/styles.css      → All component and layout styles
js/main.js          → Shared interactivity
js/wave.js          → Shared Three.js wave animation (configurable per page)

External CDN deps only:
  - Three.js r128 (wave animation)
  - Spline Viewer 1.9.82 (3D robot on index.html only)
```

## Conventions

- **CSS:** Use custom properties from `tokens.css`. Class names follow BEM-influenced patterns (e.g., `.project-card__image`, `.btn--primary`). No utility-class frameworks.
- **HTML:** Semantic structure. Sections use `.reveal` class for scroll-triggered animation. Staggered delays via `data-delay` attribute.
- **JS:** Vanilla only. No modules, no imports. Shared code goes in `js/main.js`. Page-specific scripts go in inline `<script>` blocks at the bottom of that page.
- **Typography:** Playfair Display (display/headings) + Inter (body). Loaded via Google Fonts link in each HTML file's `<head>` — except they're currently loaded through `styles.css` `@import` or browser defaults. Check `styles.css` for the actual font loading method before adding new pages.
- **Layout containers:** `container` (1200px), `container--mid` (800px). Some sections override to specific widths (e.g., gallery at 1400px, project grids at 1100px).

## Three.js Wave Animation

Synced parameters across all pages that use it:

```
SEPARATION = 150
AMOUNTX    = 40
AMOUNTY    = 60
count     += 0.03 (per frame)
```

These values live in `js/wave.js`. Each page calls `initWaveAnimation()` with page-specific camera config:
- `index.html` — hero background (`useWindow: true`, camera at 0/355/1220)
- `project-site.html` — project header visual (`useWindow: false`, camera at 0/480/1400, lookAt 0/0/200)

## What Not to Change Casually

- **Design tokens** — these cascade everywhere. Changing a token affects the entire site.
- **Three.js parameters** — must stay synced across pages (see above).
- **Nav and footer markup** — duplicated across all pages. Changes must be applied to every HTML file.
- **Chatbot widget** — duplicated across all pages. Same rule applies.
- **Spline 3D robot** — only on `index.html`. Do not add to other pages without considering load performance.

## Sequencing

- Work one scoped task at a time.
- Test changes visually before moving on (open in browser or verify markup).
- If touching shared elements (nav, footer, chatbot), update all HTML files.
- Commit after each meaningful change, not in bulk.

## Current State

- Projects 01, 02, 04, 05 are placeholders with generic content pointing to `project-detail.html`. Do not fill these with fabricated content — they will be replaced with real projects.
- Project 03 (Personal Brand Site) is the only fully built-out project detail page (`project-site.html`).
- The contact form (`index.html`, `hire-me.html`) has no backend — `action="#"` is intentional for v1.
- GitHub Pages deploys from `main` branch.
