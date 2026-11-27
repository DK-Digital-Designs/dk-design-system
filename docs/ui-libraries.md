# Library research list

The rule this file exists to enforce: **don't hand-build a component that someone has already built better.** Toasts, drawers, command menus, date pickers, comboboxes and animated numbers all have well-known edge cases — focus traps, scroll locking, swipe velocity, screen-reader announcements, reduced-motion, iOS keyboard shifts. We get those wrong when we write them ourselves at 11pm.

Verified November 2026. Where a project has been renamed or sunset it's flagged — stale bookmarks are the main way a list like this goes wrong.

---

## Track A — Vanilla (HTML + CSS + Vite)

Our default. Most DK Digital sites are static pages: no framework, no build step beyond Vite. Everything here works from a `<script>` tag or a plain npm import.

### Primitives and components

| Need | Use | Notes |
|---|---|---|
| Accessible component set | [Web Awesome](https://webawesome.com) (`shoelace-style/webawesome`) | **Shoelace is sunset** — no active development, 2.20.1 was the last release. Web Awesome is the successor from the Font Awesome team. MIT, v3.x. A paid Pro tier adds combobox, date picker and data grid. |
| Headless behaviour, framework-agnostic | [Zag.js](https://zagjs.com) | State machines for menu, dialog, combobox, date picker. You bring the markup and CSS. The honest answer when Web Awesome's styling fights our tokens. |
| Popover / tooltip / dropdown positioning | [Floating UI](https://floating-ui.com) | The collision-detection engine under most popovers. Reach for this before writing `getBoundingClientRect` maths. |
| CSS-only utility layer | [Open Props](https://open-props.style) | Plain CSS custom properties. Sits alongside our own tokens rather than replacing them. |
| Carousel / slider | [Embla](https://www.embla-carousel.com) or [Splide](https://splidejs.com) | Embla if you want to style everything yourself, Splide if you want it working in ten minutes. |
| Icons | [Lucide](https://lucide.dev), [Phosphor](https://phosphoricons.com), [Tabler](https://tabler.io/icons) | Lucide is our default — consistent 24px grid, 1.5px stroke, sits well in Confident and Utility. |
| Fonts | [Fontshare](https://fontshare.com), [Google Fonts](https://fonts.google.com) | Fontshare for display faces with character (Satoshi, Bricolage). Self-host anything we ship repeatedly. |

### Motion

| Need | Use | Notes |
|---|---|---|
| Simple tweens, scroll and in-view triggers | [Motion](https://motion.dev) | Formerly **Motion One**. The vanilla package is roughly 3.8KB over the native Web Animations API. Right answer most of the time. |
| Scroll-linked timelines, pinning, scrubbing | [GSAP](https://gsap.com) + ScrollTrigger | Free for commercial use since May 2025. ScrollTrigger has no real competition for pinned, scrubbed sections — the Brochure style's bread and butter. |
| Smooth scrolling | [Lenis](https://github.com/darkroomengineering/lenis) | A scroll engine, not an animation library. Standard pairing: drive Lenis from GSAP's ticker and feed its events into ScrollTrigger. Use sparingly — it overrides a browser behaviour people rely on. |
| Nothing at all | CSS and the platform | `@starting-style`, `transition-behavior: allow-discrete`, scroll-driven animations, view transitions, `popover`, `<dialog>`, `<details>`. These cover far more than they used to. Check here first. |

---

## Track B — React (shadcn / Base UI era)

For app-shaped work: dashboards, client portals, anything with real state. Not for a five-page brochure site — a framework there is cost with no return.

### Foundations

| Library | What it is | When |
|---|---|---|
| [shadcn/ui](https://ui.shadcn.com) | Copy-paste components you own, built on Radix | Default starting point. **Restyle it.** Default shadcn has become its own recognisable AI look — swap the radii, type scale and neutral palette for one of our styles on day one. |
| [Base UI](https://base-ui.com) | Unstyled primitives from the Radix and MUI people | When we want total styling control and a fresh slate rather than shadcn's defaults. |
| [Radix Primitives](https://www.radix-ui.com) | The accessibility layer underneath shadcn | Rarely used directly now. Worth reading when debugging focus behaviour. |

### Components worth never writing ourselves

| Need | Use |
|---|---|
| Toasts | [Sonner](https://sonner.emilkowal.ski) |
| Drawers and bottom sheets | [Vaul](https://vaul.emilkowal.ski) |
| Command menu | [cmdk](https://cmdk.paco.me) |
| Animated numbers | [NumberFlow](https://number-flow.barvian.me) |
| Animation | [Motion](https://motion.dev) — the React package, formerly Framer Motion |
| Tables | [TanStack Table](https://tanstack.com/table) |
| Forms and validation | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Charts | Pick the palette and chart form before the library. The library matters less than those two. |

### Effect and marketing libraries

Pre-built flashy sections. Genuinely useful for Brochure work, but each has a strong house look of its own — one component is a shortcut, five is somebody else's brand on our client's site.

- [Magic UI](https://magicui.design) — marquees, beams, shimmer, bento grids
- [Aceternity UI](https://ui.aceternity.com) — big expressive hero effects
- [21st.dev](https://21st.dev) — community shadcn-compatible blocks
- [RareUI](https://rareui.in) — component collection
- [Beautiful UI](https://beautifului.dev) — curated patterns

---

## Design inspiration

Go here before designing anything. Steal structure and rhythm, not pixels.

### Tier one — study these properly

- [Apple](https://www.apple.com) — the reference for scroll-driven product storytelling, restraint in type, and photography carrying the page
- [Linear](https://linear.app) — dark UI, precise spacing, motion that explains rather than decorates
- [Stripe](https://stripe.com) — the ceiling for Confident: dense information, zero shouting
- [Vercel](https://vercel.com) — monochrome plus one accent, hierarchy built entirely from type

### Galleries

| Site | For |
|---|---|
| [Awwwards](https://www.awwwards.com) | Jury-picked ambitious work. Where the Brochure style lives. |
| [Recent](https://recent.design) | **Formerly Godly** — godly.website now redirects here. Best curated feed of high-end sites. |
| [SiteInspire](https://www.siteinspire.com) | Filterable by style and industry. Best for "what do good accountancy sites actually look like". |
| [Land-book](https://land-book.com) | Landing pages across a wide spread of industries. |
| [Lapa Ninja](https://www.lapa.ninja) | Landing pages, browsable without an account. |
| [One Page Love](https://onepagelove.com) | Single-page sites — closest to what we usually ship. |
| [Httpster](https://httpster.net) | Less polished, more character. |

### App and product UI

| Site | For |
|---|---|
| [Mobbin](https://mobbin.com) | Real app flows, screen by screen. The Utility reference. Paid — check current pricing. |
| [Refero](https://refero.design) | Web app UI patterns, searchable by component. |
| [ScreensDesign](https://screensdesign.com) | Mobile app screens and flows. |
| [Collect UI](https://collectui.com) | Daily UI component shots. |

### Type and colour

- [Typewolf](https://www.typewolf.com) — what font pairings look like in the wild
- [Fonts In Use](https://fontsinuse.com) — type used in real design work
- [Coolors](https://coolors.co) — palette generation
- [Realtime Colors](https://www.realtimecolors.com) — test a palette on a real layout before committing to it
- [APCA contrast](https://www.myndex.com/APCA/) — contrast checking that tracks perception better than WCAG 2 ratios

---

## The pick-ui-library skill

Emil Kowalski — author of Sonner and Vaul — publishes a skill that maps a frontend task to a library he trusts: numbers, OTP inputs, charts, command menus, virtualization, drag and drop, toasts, state, styling.

```
npx -y skills add emilkowalski/skills --skill pick-ui-library --agent claude-code
```

Worth installing on any React project. It only runs when invoked by name, so it won't fight our own `dk-style` skill.

---

## Keeping this current

Three things rot: renames (Godly to Recent, Motion One to Motion), sunsets (Shoelace to Web Awesome), and licence changes (GSAP going free). Skim this file when starting a new project and fix what's wrong then. Don't schedule a review nobody will do.
