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

## What's in v1

- **4 pages:** Home (index.html), Agentic Projects (projects.html), project detail pages, Contact & FAQ (hire-me.html)
- **Three.js particle hero** with slow wave animation (vanilla JS, CDN r128, no React)
- **Spline 3D robot** in the hero that triggers a chatbot widget on click
- **CSS design token system** (tokens.css) with a full custom property architecture for colors, typography, spacing, motion, and layout
- **Interactive button hover system** with slide-out text, slide-in arrows, and expanding dot fills
- **Mouse-tracking gradient glow** on the About section (full-viewport-width breakout)
- **Chatbot widget** with multi-layer conic gradient borders, auto-resizing textarea, and keyword-matched responses
- **Scroll-reveal animation system** with IntersectionObserver and staggered delays
- **FAQ accordion** shared across index and hire-me pages
- **Responsive breakpoints** at 1023px, 767px, and 639px with mobile nav overlay
- **JHU shield watermark** as a faded background element in the Education section
- **YouTube thumbnail embed** linking to a class project video

What's intentionally *not* in v1: no backend, no CMS, no contact form submission handler, no analytics. The site is pure static HTML/CSS/JS hosted on GitHub Pages. Backend features (real chatbot API, form handling) are planned for future iterations.

## Architecture

```
Tony's Site/
├── index.html              # Home — hero, about, skills, education, experience, contact/FAQ
├── projects.html           # Agentic Projects listing page
├── project-detail.html     # Project detail template (placeholder projects)
├── project-site.html       # Project detail page for this site itself
├── hire-me.html            # Standalone Contact & FAQ page
├── css/
│   ├── tokens.css          # Design tokens (custom properties)
│   └── styles.css          # All component and layout styles
├── js/
│   └── main.js             # Scroll reveal, nav, FAQ accordion, chatbot, about glow
├── images/
│   ├── jhu-shield.png      # Education section watermark
│   ├── jhu-logo.png
│   └── jhu-logo.svg
└── office pic.webp         # Workspace photo in contact section
```

No build tools, no bundler, no package.json. External dependencies are loaded via CDN: Three.js r128 and Spline Viewer 1.9.82. Everything else is vanilla.

## How to Run / Review

**Local:** Open `index.html` in any browser. No server required (though `file://` URLs may block Spline 3D loading in some browsers — a simple local server like `python3 -m http.server` resolves this).

**Live:** Visit [tqny.github.io/Tony-s-Site](https://tqny.github.io/Tony-s-Site/). Deployed via GitHub Pages from the `main` branch.

**Code review:** Start with `css/tokens.css` to understand the design system, then `css/styles.css` for component patterns, then `index.html` for the full page structure. `js/main.js` is ~185 lines covering all interactivity. The inline `<script>` block at the bottom of `index.html` handles the Three.js particle animation and Spline loader.

## What Judgment This Project Demonstrates

- **Scope control:** Kept v1 static and shippable rather than over-engineering a backend nobody asked for.
- **Design system thinking:** Tokens-first architecture that scales. Every color, spacing value, and animation timing is a variable, not a magic number.
- **Taste over templates:** Dark editorial aesthetic with intentional typography (Playfair Display + Inter), deliberate negative space, and interactive details (button hover states, gradient glow tracking, particle animation) that serve the brand without overwhelming it.
- **AI-assisted workflow fluency:** The entire site was built through conversation — describing visual intent in words, debugging layout issues collaboratively, and knowing when to steer vs. when to let the AI lead. This is the skill the site claims to showcase, and the repo history is the proof.
- **Documentation instinct:** Clean file organization, semantic class naming (BEM-influenced), and readable CSS structure that another developer could pick up without a walkthrough.

## Why This Is a Credible Hiring Artifact

This isn't a tutorial project or a template swap. It's a working product with real content, shipped to a public URL, built using the exact AI-assisted development process the candidate describes professionally. The code is clean enough to review, the design is polished enough to present, and the architecture is simple enough to extend. It demonstrates that someone from a business/PM background can produce production-quality front-end work when paired with the right tooling and the right instincts for what "good" looks like.
