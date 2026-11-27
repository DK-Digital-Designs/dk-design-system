# DK Digital house style

Three styles. Every new site picks one and commits to it. Mixing them is how sites end up looking like a template with the serial number filed off.

The showcase site (`index.html` plus `styles/*.html`) is the live version of this document — read that first, then come back here for the numbers.

---

## Pick a style

| | **Brochure** | **Confident** | **Utility** |
|---|---|---|---|
| Job | Make someone *want* it | Make someone *trust* it | Let someone *do* something |
| Feel | Expressive, cinematic, dark | Quiet, typographic, light | Dense, functional, neutral |
| Use for | Fitness, events, launches, hospitality, consumer brands, portfolios | Advisory, legal, finance, medical, B2B, trades with a premium position | Dashboards, client portals, payment and booking screens, admin, anything behind a login |
| Motion | Central to the design | Barely present | Only as state feedback |
| Reference | Apple product pages, Awwwards | Stripe, Vercel, Basecamp | Linear, Stripe Dashboard, Supabase |
| Risk if wrong | Looks unserious for a law firm | Looks cheap for a nightclub | Looks like a spreadsheet on a marketing site |

If the client's buyers are making an emotional decision, Brochure. If they're making a cautious one, Confident. If they've already decided and now have work to do, Utility.

---

## Brochure

Dark, high-contrast, motion-led. Oversized type doing the work that stock photography can't.

```css
--base:       #09090B;
--surface:    #121216;
--surface-2:  #1A1A20;
--ink:        #F4F4F5;
--muted:      #A1A1AA;
--faint:      #6B6B75;
--accent:     #7C5CFF;
--accent-2:   #22D3EE;
--line:       rgba(244, 244, 245, 0.08);
--radius:     20px;
--ease:       cubic-bezier(0.16, 1, 0.3, 1);
```

- **Type** — display `Bricolage Grotesque` 500–800, body `Inter`. Hero at `clamp(3rem, 9vw, 7.5rem)`, tracking `-0.04em`, line-height `0.95`. The scale jump between hero and body should be violent.
- **Space** — sections `clamp(6rem, 14vw, 12rem)` vertical. Let things breathe or the drama reads as clutter.
- **Colour** — one accent gradient (`--accent` to `--accent-2`), used maybe four times on a page. The rest is near-black and off-white. A gradient on every element is the AI look.
- **Motion** — scroll-reveal on section entry, a sticky or pinned section somewhere, animated numbers on stats. Native `IntersectionObserver` handles reveals in about fifteen lines; reach for GSAP + ScrollTrigger only when you need pinning or scrubbing.
- **Don't** — glassmorphism on everything, glowing borders on every card, three competing gradients, text over busy imagery with no scrim.

## Confident

Light, restrained, typographic. The design is the grid and the type — nothing else is asking for attention.

```css
--base:       #FBFAF8;
--surface:    #FFFFFF;
--surface-2:  #F3F1EC;
--ink:        #15161A;
--muted:      #5C5F66;
--faint:      #8A8D94;
--accent:     #1E4A3A;
--line:       rgba(21, 22, 26, 0.10);
--radius:     6px;
--ease:       cubic-bezier(0.4, 0, 0.2, 1);
```

- **Type** — display `Inter Tight` 600, body `Inter` 400/500. Hero at `clamp(2.25rem, 4.5vw, 3.75rem)`, tracking `-0.02em`. Body copy capped at `62ch` — a full-width paragraph is the fastest way to look amateur.
- **Space** — sections `clamp(4.5rem, 9vw, 8rem)`. Whitespace is the whole effect; cutting it to fit more content defeats the style.
- **Colour** — warm off-white page, white cards, one deep accent for links and primary buttons. No gradients. No shadows beyond a 1px hairline border.
- **Motion** — `160ms` opacity and 2–4px transforms on hover and focus. No scroll animation at all. Stillness is the point.
- **Don't** — pure `#FFFFFF` page background (the warm tint is what stops it feeling like an unstyled document), large drop shadows, decorative icons next to every heading, centred body text.

## Utility

Neutral, dense, functional. Built to be read at a glance and used all day. Supports light and dark.

```css
/* dark */
--base:      #0B0D10;   --surface:   #13161B;   --surface-2: #1A1E25;
--ink:       #E7EAEF;   --muted:     #99A1AE;   --line: rgba(255, 255, 255, 0.08);
/* light */
--base:      #F7F8FA;   --surface:   #FFFFFF;   --surface-2: #F1F3F6;
--ink:       #11151B;   --muted:     #5A6472;   --line: rgba(9, 13, 20, 0.09);
/* both */
--accent: #2563EB;  --ok: #16A34A;  --warn: #D97706;  --err: #DC2626;
--radius: 8px;      --radius-sm: 6px;
```

- **Type** — `Inter` at a **14px** base, not 16px. `JetBrains Mono` for IDs, amounts, timestamps and anything you compare down a column — tabular figures matter more than the typeface.
- **Space** — strict 4px grid. Table rows 40px. Sidebar 240px. Density is a feature here; the generous padding from the other two styles makes a dashboard feel sluggish.
- **Colour** — neutral everywhere, accent reserved for the primary action and active nav state. Semantic colours only for genuine status, never decoration. Never use colour as the *only* signal — pair it with a label or icon.
- **Motion** — `120ms` maximum, and only to confirm something happened. No entrance animations; people open this screen forty times a day.
- **Don't** — marketing-sized headings, hero sections, 16px body type, decorative illustration, more than one primary button per view.

---

## Mobile first — and mean it

**Roughly 99% of our clients' visitors arrive on a phone.** Desktop is where we enjoy working;
it is not where the site gets used. Google also indexes the mobile version, so a site that is
poor on a phone is poor everywhere that matters.

This is a working order, not a slogan:

1. **Design and build at 360px first.** Not "check it afterwards" — start there. If a layout only
   works once you have 1200px, the layout is wrong.
2. **Then let it grow.** `clamp()` and `minmax()` from the small layout outwards. Reach for a
   media query when the content actually needs a different shape, not at a fixed device width.
3. **Desktop last**, as the widest case of the same design. Cap the measure so a 27" screen
   doesn't produce 160-character lines.

The rules:

- **Tap targets 44×44px minimum**, with at least 8px between them. Thumbs are imprecise and
  nobody zooms to tap a link. Where a desktop-dense UI genuinely needs smaller controls — the
  Utility style's 32px icon buttons — bump them under `@media (pointer: coarse)`. All three
  styles do this; copy the pattern.
- **Primary actions in reach of a thumb.** Bottom third of the screen is easy, top corners are
  not. A "Call us" button that needs a second hand doesn't get pressed.
- **Never hover-only.** Anything revealed on hover must also be reachable by tap and by keyboard.
  Tooltips carrying real information are a desktop habit; drop them.
- **Form inputs at 16px minimum.** Anything smaller makes iOS Safari zoom the page on focus, and
  the visitor is now lost somewhere in your layout.
- **Use the right `inputmode` and `autocomplete`.** `type="tel"`, `inputmode="numeric"`,
  `autocomplete="email"`. It costs one attribute and saves the visitor a fight with the keyboard.
- **Phone numbers and addresses are links.** `tel:` and a maps link. On a phone these are the
  two things people actually want.
- **No horizontal scroll, ever.** Check `document.documentElement.scrollWidth` against
  `clientWidth` at 360px before you call anything done.
- **Test on a real mid-range Android**, not just the browser's device emulator. Emulators do not
  reproduce slow CPUs, patchy data, or how heavy a page feels in the hand.

---

## Readability and ease of use

Clean and intuitive beats clever. A visitor should never have to work out how the page works.

### Readability

- **Body text 16px minimum**, 18px on content-heavy pages. Never shrink body copy to fit more in.
- **Measure capped at 60–75 characters.** `max-width: 65ch`. The single highest-leverage
  typography rule there is.
- **Line height 1.5–1.65** for body copy, tighter only for large headings.
- **Left-aligned.** Centred text is fine for one or two lines and painful for a paragraph.
- **Real paragraphs**, 2–4 sentences. A wall of text gets skipped on a phone.
- **Contrast checked against the actual background**, not against white. Muted grey on a tinted
  surface is the usual failure.
- **Plain language.** Write what a customer would say out loud. Delete "leverage", "solutions",
  "bespoke" and "seamless" on sight.
- **Front-load every heading and link.** People scan the first two words.

### Ease of use

- **One obvious primary action per screen.** If everything is a button, nothing is.
- **Say what happens next.** "Send enquiry — we reply within one working day" beats "Submit".
- **Fewer choices.** Five services presented clearly convert better than twelve. Cutting the
  nav is usually the biggest usability win available.
- **Make the important thing findable without scrolling** — on a phone, what the business does
  and how to contact them.
- **Consistent navigation** in the same place on every page, with the current page marked.
- **Links look like links.** No styling a link as body text and hoping.
- **Forms: as few fields as the job needs.** Label every field above it, never placeholder-only.
  Errors appear next to the field, in words, saying how to fix it.
- **Never trap the visitor.** No scroll-jacking, no pop-up before they have read anything, no
  carousel that moves on its own.
- **Loading and empty states are designed**, not left blank. An empty state says what goes there
  and how to add it.

The test: hand the phone to someone who has never seen the site and say nothing. If they ask
"what do I press?", the page has failed.

---

## Non-negotiables, all three styles

These aren't style choices and they don't get traded away for a deadline.

- **Focus is always visible.** `:focus-visible` with a 2px ring and offset. Never `outline: none` without a replacement.
- **Contrast** — body text 4.5:1 minimum, large text 3:1. Check the muted token against its actual background, not against white.
- **`prefers-reduced-motion`** — one media query that kills transforms and scroll animation. Brochure needs this most and is the easiest to forget.
- **Keyboard** — every interactive thing reachable and operable without a mouse. If it needs a drawer or a command menu, use Vaul or cmdk rather than building it (see `ui-libraries.md`).
- **Real text over images** — never bake copy into a graphic.
- **One `<h1>` per page**, headings in order, landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) present.
- **Images** — explicit `width`/`height` to stop layout shift, `loading="lazy"` below the fold (never on the hero), meaningful `alt` or `alt=""` if decorative.
- **Fluid, not breakpoint-driven** — `clamp()` for type and spacing. Build at 360px before anything else.
- **Tap targets 44×44px** on touch, 8px apart. Smaller desktop controls get bumped under `@media (pointer: coarse)`.
- **No horizontal scroll at 360px.** Verify it, don't assume it.
- **Body text 16px minimum**, form inputs 16px minimum, measure capped at 60–75 characters.
- **Unique `<title>`, meta description and canonical on every page.** See `seo.md` — this is not an optional extra on a client site.
- **LCP under 2.5s and CLS under 0.1** on a mid-range phone. A design that can't hit that is a design that changes.

---

## How we build

The reuse ladder, in order. Stop at the first rung that works.

1. **Does this need to exist?** Half the sections in a brief don't.
2. **Is it in this repo already?** Copy the pattern from the matching showcase page.
3. **Does the platform do it?** `<dialog>`, `popover`, `<details>`, `<input type="date">`, scroll-driven animations, view transitions. Check before installing anything.
4. **Is there a known-good library?** `ui-libraries.md`. Toasts, drawers, command menus and date pickers are solved problems.
5. **Only then write it**, and only the minimum that works.

Default stack: **Vite, plain HTML, plain CSS with custom properties, minimal JS.** Move to React only when the project has real application state — a dashboard or portal, not a brochure site. Picking a framework for a five-page site is cost with no return.

If you reach for shadcn, restyle it on day one. Default shadcn has become its own recognisable look, and a client paying for a custom site shouldn't get it.
