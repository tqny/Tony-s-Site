# AGENTS.md — Tony Mikityuk Personal Brand Site

Instructions for AI agents working in this repo.

---

## Source of Truth

- **Design tokens:** `css/tokens.css` — all colors, typography, spacing, motion, and layout variables live here. Never use magic numbers; always reference tokens.
- **Shared styles:** `css/styles.css` — all component and layout styles. BEM-influenced class naming.
- **Interactivity:** `js/main.js` — scroll reveal, nav, FAQ accordion, AI chatbot (Kimi API), typing animation, example chips, about-section glow. ~346 lines.
- **Wave animation:** `js/wave.js` — shared Three.js dotted-surface animation. Called with page-specific config (container ID, camera position).
- **Chatbot proxy:** `worker/proxy.js` — Cloudflare Worker that proxies chat requests to Moonshot's Kimi API. Keeps API key server-side, enforces CORS whitelist, rate-limits per IP.
- **README.md** — project context, architecture, and reviewer-facing orientation.

## Read Order

1. This file (`AGENTS.md`)
2. `README.md` — understand what the project is and why it exists
3. `css/tokens.css` — understand the design system before touching any styles
4. `css/styles.css` — understand component patterns
5. `index.html` — primary page, most complete reference for structure and conventions
6. `js/main.js` — all shared interactivity including AI chatbot

## Architecture

```
Static HTML/CSS/JS — no build tools, no frameworks, no package.json.

index.html          → Home (hero, about, skills, education, experience, contact/FAQ)
projects.html       → Agentic Projects listing
strange-atlas.html  → Detail page for the Strange Atlas project
domain-security.html → Detail page for the Brand Protection Control Center
the-barter.html     → Detail page for The Barter (Vendor Growth OS)
project-site.html   → Detail page for this site itself
project-detail.html → Generic project detail template (placeholder projects 04, 05)
hire-me.html        → Standalone Contact & FAQ page

css/tokens.css      → Design tokens (custom properties)
css/styles.css      → All component and layout styles
js/main.js          → Shared interactivity + AI chatbot
js/wave.js          → Shared Three.js wave animation (configurable per page)

worker/proxy.js     → Cloudflare Worker — Kimi API proxy (CORS, rate limiting, API key)
worker/wrangler.toml → Wrangler deployment config (deploys separately via `npx wrangler deploy`)

External CDN deps only:
  - Three.js r128 (wave animation)
  - Spline Viewer 1.9.82 (3D robot on index.html only)
```

## AI Chatbot

The chatbot is on every page. It uses a real AI backend (Kimi 2.5 via Moonshot API) proxied through a Cloudflare Worker.

**Flow:** Browser → `fetch(CHAT_API_URL)` → Cloudflare Worker (`worker/proxy.js`) → Moonshot Kimi API → response → typing animation in browser.

**Key details:**
- System prompt lives in `js/main.js` (var `CHAT_SYSTEM_PROMPT`). It contains Tony's full background, experience, skills, projects, and tone instructions.
- Conversation history: last 10 messages sent with each request for context.
- Session limit: 30 messages per page load.
- Rate limit: 60 requests/hour per IP (enforced server-side in the Worker).
- Typing animation: character-by-character reveal with bouncing dot indicator while waiting.
- Example question chips shown in empty state, removed on first message.
- Worker URL is hardcoded in `js/main.js` (var `CHAT_API_URL`).

**To update the chatbot's knowledge:** Edit `CHAT_SYSTEM_PROMPT` in `js/main.js`. No Worker redeployment needed.

**To redeploy the Worker:** `cd worker && npx wrangler deploy`. API key is stored as a Cloudflare secret (`npx wrangler secret put KIMI_API_KEY`).

## Conventions

- **CSS:** Use custom properties from `tokens.css`. Class names follow BEM-influenced patterns (e.g., `.project-card__image`, `.btn--primary`). No utility-class frameworks.
- **HTML:** Semantic structure. Sections use `.reveal` class for scroll-triggered animation. Staggered delays via `data-delay` attribute.
- **JS:** Vanilla only. No modules, no imports. Shared code goes in `js/main.js`. Page-specific scripts go in inline `<script>` blocks at the bottom of that page.
- **Typography:** Playfair Display (display/headings) + Inter (body). Loaded via `@import` in `styles.css`.
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
- **Nav and footer markup** — duplicated across all 9 HTML pages. Changes must be applied to every file.
- **Chatbot widget markup** — duplicated across all 9 HTML pages. Same rule applies.
- **Chatbot system prompt** — contains Tony's professional narrative. Changes affect how the bot represents him to visitors.
- **Worker CORS origins** — must include all domains that will call the API (currently `tqny.github.io` + localhost variants).
- **Spline 3D robot** — only on `index.html`. Do not add to other pages without considering load performance.

## Sequencing

- Work one scoped task at a time.
- Test changes visually before moving on (open in browser or verify markup).
- If touching shared elements (nav, footer, chatbot markup), update all 9 HTML files.
- Commit after each meaningful change, not in bulk.

## Current State

- Project 01 (Strange Atlas) has a dedicated detail page (`strange-atlas.html`) with real screenshots.
- Project 02 (Brand Protection Control Center) has a dedicated detail page (`domain-security.html`) with real screenshots and card images.
- Project 03 (Personal Brand Site) has a dedicated detail page (`project-site.html`) with real screenshots.
- Project 04 (The Barter) has a dedicated detail page (`the-barter.html`) with real screenshots and card images. Promoted to Featured.
- Project 05 (Espy Arc) has a dedicated detail page (`espy-arc.html`) with placeholder images. Links to the agency site (maxtone-group.vercel.app) and LeadPulse (leadpulse-one.vercel.app).
- `project-detail.html` still exists as a generic template (currently titled "Multi-Agent Research Assistant") with placeholder gallery. No dedicated project wired to it yet.
- All project cards and Related Projects sections have real images wired in.
- The contact form (`index.html`, `hire-me.html`) has no backend — `action="#"` is intentional.
- The AI chatbot is live on all pages via Cloudflare Worker proxy.
- GitHub Pages deploys from `main` branch.
