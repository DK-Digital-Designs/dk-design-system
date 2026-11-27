---
name: dk-style
description: DK Digital's house style, mobile-first rules, SEO requirements and reuse-first build rules. Use when starting, designing, restyling or reviewing the front end of any DK Digital website or web app — picking a visual direction, writing CSS or tokens, building a landing page, dashboard or client portal, writing page metadata or structured data, or when asked which component library to use. Also use when asked to make something "look less AI", "match our brand", "use our house style", improve a site's SEO, or make a site work properly on phones.
---

# DK Digital house style

Four jobs, in this order: **build for the phone**, **pick the right style and stay inside it**,
**get the SEO right as you go**, and **reuse before you build**.

Full spec lives in `docs/house-style.md`, `docs/seo.md` and `docs/ui-libraries.md` in the
`dk-design-system` repo. Working demo pages are in that repo's `styles/` folder — read the
matching one before writing a new page. `styles/confident.html` is the SEO reference; copy its
head and JSON-LD rather than writing metadata from memory.

## Step 0 — phones are the priority

**Roughly 99% of our clients' visitors are on a phone.** Google indexes the mobile version
too. Build at 360px first and let the layout grow outwards; do not design at desktop width and
squeeze it down afterwards.

- Tap targets **44×44px** minimum on touch, 8px apart. Dense desktop controls get bumped under
  `@media (pointer: coarse)` — all three styles already do this, copy the pattern.
- Form inputs **16px minimum**, or iOS Safari zooms the page on focus.
- Correct `type`, `inputmode` and `autocomplete` on every field.
- Phone numbers are `tel:` links, addresses link to maps.
- Nothing hover-only. Everything reachable by tap and by keyboard.
- Primary action within thumb reach, not in a top corner.
- **No horizontal scroll at 360px** — verify `scrollWidth === clientWidth`, don't assume.

## Step 1 — pick a style, then say which one you picked

Three styles. One per project. Never mix them.

| Style | Job | Use for |
|---|---|---|
| **Brochure** | Make someone *want* it | Fitness, events, launches, hospitality, consumer brands, portfolios |
| **Confident** | Make someone *trust* it | Advisory, legal, finance, medical, B2B, premium trades |
| **Utility** | Let someone *do* something | Dashboards, client portals, payment and booking screens, anything behind a login |

Decide from the buyer, not the brief's adjectives: emotional decision → Brochure; cautious
decision → Confident; already decided and now has work to do → Utility. A marketing site with
a logged-in area uses two styles on purpose — Brochure or Confident for the public pages,
Utility behind the login.

If the project genuinely doesn't fit, say so and ask. Don't invent a fourth style.

## Step 2 — use the tokens, don't invent colours

Copy `src/tokens.css` from the `dk-design-system` repo, put the style's class on `<body>`
(`t-brochure`, `t-confident`, `t-utility`), and build everything from `var(--…)`. Never
hardcode a hex in a component.

Headline numbers, if you need them before reading the file:

- **Brochure** — `#09090b` base, accent `#7c5cff` → `#22d3ee`, radius `20px`, Bricolage
  Grotesque + Inter, hero `clamp(3rem, 9vw, 7.5rem)` at `-0.045em`, sections `clamp(6rem, 14vw, 12rem)`.
- **Confident** — `#fbfaf8` base, accent `#1e4a3a`, radius `6px`, Inter Tight + Inter, hero
  `clamp(2.25rem, 4.5vw, 3.75rem)`, body capped at `62ch`, transitions `160ms`.
- **Utility** — light + dark, accent `#2563eb`, radius `8px`, Inter at a **14px** base +
  JetBrains Mono for figures, 4px grid, 40px rows, 240px sidebar, transitions `120ms`.

## Step 3 — readability and ease of use

Clean and intuitive beats clever. The visitor should never have to work out how the page works.

- Body text **16px minimum** (18px on content-heavy pages), line height 1.5–1.65.
- Measure capped at **60–75 characters** (`max-width: 65ch`). Highest-leverage rule in typography.
- Left-aligned. Short paragraphs, 2–4 sentences.
- Plain language. Delete "leverage", "solutions", "bespoke", "seamless" on sight.
- Front-load headings and link text — people scan the first two words.
- **One obvious primary action per screen.** If everything is a button, nothing is.
- Say what happens next: "Send enquiry — we reply within one working day", not "Submit".
- Fewer choices. Cutting the nav is usually the biggest usability win available.
- Forms: as few fields as the job needs, labels above fields (never placeholder-only), errors
  beside the field in words that say how to fix it.
- No scroll-jacking, no pop-up before they've read anything, no auto-advancing carousel.

## Step 4 — SEO, as you build

SEO is a priority on every client site, not a phase at the end. Our clients are small local
businesses, so **local search is the whole game**. Full checklist in `docs/seo.md`.

Required on every page, every time:

- One `<h1>`, headings in order, no skipped levels.
- Unique `<title>` under ~60 chars — specific thing first, business name last.
- Unique `<meta name="description">`, 140–160 chars, written to be clicked.
- Self-referencing absolute `<link rel="canonical">`.
- Open Graph + Twitter tags with a 1200×630 image. WhatsApp shares are most of our clients'
  referral traffic.
- Descriptive URL (`/services/geyser-repair`, never `/page-4`).
- Meaningful `alt` on content images, `alt=""` on decorative ones.

Per site: `robots.txt`, `sitemap.xml`, HTTPS with redirects to one canonical host, and
`LocalBusiness` structured data (use the specific subtype — `Plumber`, `Dentist`,
`AccountingService`) plus `FAQPage` wherever there's an FAQ.

Performance is SEO: **LCP under 2.5s, CLS under 0.1, INP under 200ms** on a mid-range phone.
Images sized with `width`/`height` and served as AVIF/WebP, `loading="lazy"` below the fold but
never on the hero, `fetchpriority="high"` on the LCP image, `font-display: swap`, at most two
font families. Budget a brochure site at **under 500KB first load**. Every library added is a
Core Web Vitals decision.

Never: keyword stuffing, hidden text, bought links, or promising rankings. And check for a
leftover `noindex` before launch — it is the classic launch bug.

## Step 5 — climb the ladder before writing a component

1. Does this need to exist? Half the sections in a brief don't — say so in one line.
2. Is it in `dk-design-system` already? Copy the pattern from the matching demo page.
3. Does the platform do it? `<dialog>`, `popover`, `<details>`, `<input type="date">`,
   `IntersectionObserver`, scroll-driven animations, view transitions, `@starting-style`.
4. Is there a known-good library? See below.
5. Only then write it, and only the minimum that works.

Default stack is **Vite + plain HTML + plain CSS custom properties + minimal JS**. Move to
React only when there's real application state — a dashboard or portal, not a brochure site.

## Step 6 — reach for these instead of hand-building

Never hand-write a toast, drawer, command menu, date picker, combobox or animated number.
The edge cases (focus trapping, scroll locking, swipe velocity, screen-reader announcements,
reduced motion, iOS keyboard shift) are where hand-rolled versions fail.

**Vanilla:** [Web Awesome](https://webawesome.com) for components (Shoelace is sunset),
[Zag.js](https://zagjs.com) for headless behaviour, [Floating UI](https://floating-ui.com)
for popover positioning, [Motion](https://motion.dev) for tweens and in-view triggers,
[GSAP + ScrollTrigger](https://gsap.com) when a section needs pinning or scrubbing,
[Lenis](https://github.com/darkroomengineering/lenis) for smooth scroll, [Embla](https://www.embla-carousel.com)
for carousels, [Lucide](https://lucide.dev) for icons.

**React:** [shadcn/ui](https://ui.shadcn.com) or [Base UI](https://base-ui.com) as the
foundation, [Sonner](https://sonner.emilkowal.ski) for toasts, [Vaul](https://vaul.emilkowal.ski)
for drawers, [cmdk](https://cmdk.paco.me) for command menus,
[NumberFlow](https://number-flow.barvian.me) for animated numbers,
[TanStack Table](https://tanstack.com/table) for tables,
[React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for forms.

**If you use shadcn, restyle it on day one** — swap the radii, type scale and neutral palette
for the chosen style's tokens. Default shadcn is now its own recognisable AI look, and a
client paying for a custom site shouldn't get it.

## Step 7 — avoid the AI look

These are the tells. Don't ship them.

- A gradient on every element. One accent gradient, used about four times a page, or none.
- Glassmorphism and glowing borders on every card.
- Three nearly identical feature cards with a generic icon above each heading.
- Emoji as interface icons.
- Full-width body paragraphs with no measure.
- Centred text for anything longer than two lines.
- Default shadcn neutrals, default `border-radius: 0.5rem`, default Inter-at-16px everywhere.
- Purple-to-blue gradient on a dark hero with a glowing CTA.
- Marketing-sized headings inside a dashboard.
- Big soft drop shadows in the Confident style — it uses 1px hairlines only.

## Non-negotiables in all three styles

Not style choices; these don't get traded away for a deadline.

- `:focus-visible` ring, 2px with offset, on everything interactive. Never bare `outline: none`.
- Body text 4.5:1 contrast, large text 3:1. Check muted tokens against their real background.
- One `prefers-reduced-motion` block that kills transforms and scroll animation.
- Everything reachable and operable by keyboard.
- Real text, never copy baked into an image.
- One `<h1>`, headings in order, landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- `width`/`height` on images, `loading="lazy"` below the fold, meaningful `alt` or `alt=""`.
- Fluid with `clamp()`, not breakpoint-driven. Build at 360px first.
- 44×44px tap targets on touch, 16px body text and form inputs, measure capped at 60–75 chars.
- No horizontal scroll at 360px.
- Unique title, meta description and canonical on every page.

## Output expectations

- State which style you picked and why, in one line, before writing code.
- Don't restate this skill back to the user.
- If a brief asks for something that breaks the chosen style (a flashy animated hero on a
  Confident site), build what was asked and flag the clash in one sentence. Don't refuse and
  don't quietly substitute.
