# Tony Mikityuk — Personal Brand Site

A static portfolio site built from scratch using AI-assisted development. No templates, no frameworks, no build step. Every line of HTML, CSS, and JavaScript was written collaboratively with Claude (Anthropic) in Cowork mode through natural language iteration.

**Live:** [tqny.github.io/Tony-s-Site](https://tqny.github.io/Tony-s-Site/)

---

## What This Is

A personal brand site for a program manager and customer success professional who is actively building AI/agentic engineering skills. The site serves two purposes: it presents a professional profile, and it *is* a portfolio piece — demonstrating the AI-assisted development workflow described in the skills section.

## Why It Exists

Most portfolio sites are WordPress themes or Next.js starters with swapped-in copy. This one exists to show what happens when someone with program management instincts (not a CS degree) uses AI tooling to build something real from the ground up. The process matters as much as the output.

## What Problem It Represents

Hiring managers evaluating non-traditional candidates (business background pivoting into technical/AI roles) need evidence of capability beyond bullet points. This site is that evidence: a working product with deliberate design decisions, clean architecture, and no shortcuts — built through the exact AI-assisted workflow the candidate claims to be skilled at.

## What's in the Site

- **9 pages:** Home (index.html), Agentic Projects listing (projects.html), 5 dedicated project detail pages (strange-atlas.html, domain-security.html, the-barter.html, project-site.html, espy-arc.html), generic project template (project-detail.html), Contact & FAQ (hire-me.html)
- **Three.js particle hero** with slow wave animation (vanilla JS, CDN r128, no React)
- **Spline 3D robot** in the hero that triggers the AI chatbot on click
- **AI-powered chatbot** on every page — real conversational AI via Kimi 2.5, proxied through a Cloudflare Worker. The bot is loaded with Tony's full background, skills, projects, and target roles, and acts as a warm, informed advocate. Includes typing animation, example question chips, conversation history, and session limits.
- **Cloudflare Worker proxy** (worker/proxy.js) that keeps the API key server-side, enforces CORS, and rate-limits at 60 requests/hour per IP
- **CSS design token system** (tokens.css) with a full custom property architecture for colors, typography, spacing, motion, and layout
- **Interactive button hover system** with slide-out text, slide-in arrows, and expanding dot fills
- **Mouse-tracking gradient glow** on the About section (full-viewport-width breakout)
- **Scroll-reveal animation system** with IntersectionObserver and staggered delays
- **FAQ accordion** shared across index and hire-me pages
- **Responsive breakpoints** at 1023px, 767px, and 639px with mobile nav overlay
- **JHU shield watermark** as a faded background element in the Education section (desktop); on mobile, the shield becomes a clickable card with play button overlay linking to the class project video
- **YouTube thumbnail embed** linking to a class project video (desktop only)

What's intentionally not included: no CMS, no contact form submission handler, no analytics. The contact form is front-end only (`action="#"`). The site is static HTML/CSS/JS hosted on GitHub Pages, with the chatbot proxy as the only server-side component.

## Featured Projects

1. **Strange Atlas** — Interactive 3D globe visualizing ~99,000 real-world mysterious phenomena across 10 categories. Built with Three.js, vanilla JS, and Cloudflare Workers. [Live](https://tqny.github.io/strange-atlas/) | [Code](https://github.com/tqny/strange-atlas)
2. **Brand Protection Control Center** — Domain threat intelligence dashboard with live scanning, multi-source enrichment, AI triage, and full case-to-enforcement workflow. Built with React 19, TypeScript, Tailwind CSS, shadcn/ui, Recharts. [Live](https://tqny.github.io/domain-security-project/) | [Code](https://github.com/tqny/domain-security-project)
3. **Personal Brand Site** — This repo. From-scratch portfolio built entirely with AI-assisted development, featuring Three.js animations, Spline 3D, and an AI chatbot.
4. **The Barter** — AI-assisted customer success workspace for managing retail vendor portfolios, with diagnostics, decision support, and QBR generation. Built with React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts, Framer Motion. [Live](https://tqny.github.io/the-barter/) | [Code](https://github.com/tqny/the-barter)

5. **Espy Arc** — A digital growth and business systems consultancy for small businesses. Two service pillars: Digital Presence & Growth (websites, SEO, lead gen) and Business Systems & Insights (tracking systems, dashboards, CRM tools). Includes LeadPulse, a custom lead intake CRM built for a client. Agency site at [maxtone-group.vercel.app](https://maxtone-group.vercel.app), LeadPulse at [leadpulse-one.vercel.app](https://leadpulse-one.vercel.app) | [Code](https://github.com/tqny/leadpulse)

## Architecture

```
Tony's Site/
├── index.html              # Home — hero, about, skills, education, experience, contact/FAQ
├── projects.html           # Agentic Projects listing page
├── strange-atlas.html      # Project detail — Strange Atlas (3D globe)
├── domain-security.html    # Project detail — Brand Protection Control Center
├── the-barter.html         # Project detail — The Barter (Vendor Growth OS)
├── project-site.html       # Project detail — this site itself
├── espy-arc.html           # Project detail — Espy Arc (digital services consultancy)
├── project-detail.html     # Generic project detail template (placeholder projects)
├── hire-me.html            # Standalone Contact & FAQ page
├── css/
│   ├── tokens.css          # Design tokens (custom properties)
│   └── styles.css          # All component and layout styles
├── js/
│   ├── main.js             # Shared interactivity (~346 lines): scroll reveal, nav, FAQ,
│   │                       #   AI chatbot (Kimi API), typing animation, about glow
│   └── wave.js             # Shared Three.js wave animation (configurable per page)
├── worker/
│   ├── proxy.js            # Cloudflare Worker — Kimi API proxy with CORS + rate limiting
│   └── wrangler.toml       # Wrangler deployment config
├── images/
│   ├── sa-card-globe.png           # Strange Atlas card image
│   ├── sa-gallery-*.png            # Strange Atlas gallery screenshots (5)
│   ├── ds-card-sentinel.png        # Brand Protection card image
│   ├── ds-card-queue.png           # Brand Protection card image (homepage)
│   ├── ds-hero-3screen.png         # Brand Protection hero screenshot
│   ├── ds-gallery-*.png            # Brand Protection gallery screenshots (4)
│   ├── gallery-*.png               # Personal Brand Site gallery screenshots (4)
│   ├── robot-card.png              # Personal Brand Site card image
│   ├── jhu-shield.png              # Education section watermark (desktop)
│   ├── jhu-shield-cropped.png      # Cropped shield for mobile video card
│   ├── jhu-logo.png / .svg         # JHU logo assets
│   └── office pic.webp             # Workspace photo in contact section
├── Tony Mikityuk - Resume 2026 PM.pdf
├── AGENTS.md               # AI agent guide for repo conventions
├── README.md               # This file
└── .gitignore
```

No build tools, no bundler, no package.json. External dependencies loaded via CDN: Three.js r128 and Spline Viewer 1.9.82. The Cloudflare Worker (worker/) is the only piece that deploys separately (`npx wrangler deploy`).

## How to Run / Review

**Local:** Open `index.html` in any browser. For the AI chatbot and Spline 3D to work, use a local server: `python3 -m http.server 8000` and visit `http://localhost:8000`.

**Live:** Visit [tqny.github.io/Tony-s-Site](https://tqny.github.io/Tony-s-Site/). Deployed via GitHub Pages from the `main` branch.

**Code review:** Start with `css/tokens.css` to understand the design system, then `css/styles.css` for component patterns, then `index.html` for the full page structure. `js/main.js` covers all interactivity including the AI chatbot. `js/wave.js` is the shared Three.js wave animation. `worker/proxy.js` is the Cloudflare Worker that proxies chat requests to the Kimi API.

## What Judgment This Project Demonstrates

- **Scope control:** Kept the site static and shippable, adding server-side complexity (the Worker proxy) only when it was the right call for a real AI chatbot.
- **Design system thinking:** Tokens-first architecture that scales. Every color, spacing value, and animation timing is a variable, not a magic number.
- **Taste over templates:** Dark editorial aesthetic with intentional typography (Playfair Display + Inter), deliberate negative space, and interactive details (button hover states, gradient glow tracking, particle animation) that serve the brand without overwhelming it.
- **AI-assisted workflow fluency:** The entire site was built through conversation — describing visual intent in words, debugging layout issues collaboratively, and knowing when to steer vs. when to let the AI lead. This is the skill the site claims to showcase, and the repo history is the proof.
- **Documentation instinct:** Clean file organization, semantic class naming (BEM-influenced), and readable CSS structure that another developer could pick up without a walkthrough.
- **Reusable patterns:** The Cloudflare Worker proxy pattern was adapted from the Strange Atlas project, demonstrating the ability to identify and reuse proven architecture across projects.

## Why This Is a Credible Hiring Artifact

This isn't a tutorial project or a template swap. It's a working product with real content, shipped to a public URL, built using the exact AI-assisted development process the candidate describes professionally. The code is clean enough to review, the design is polished enough to present, and the architecture is simple enough to extend. It demonstrates that someone from a business/PM background can produce production-quality front-end work when paired with the right tooling and the right instincts for what "good" looks like.
