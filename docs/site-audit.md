# Site audit — November 2026

Every DK Digital project in `C:\Dev\GitHub\dk-digital`, mapped onto the house styles. The
point of this was to find out whether three styles actually cover the work. They don't —
one gap, documented at the bottom.

## The map

| Project | Style it is | Style it should be | Notes |
|---|---|---|---|
| **DK-Digital** (own site) | Brochure | Brochure | Dark, mint `#8cffec`, Space Grotesk. The recent "Precision Studio" redesign is the closest thing we had to a house style. |
| **GoalGetters** | Brochure | Brochure | Astro. Dark + gold `#d9a72b`, Bebas Neue. Football club — emotional buy, correct call. |
| **Veloire** | Brochure + Utility | Brochure + Utility | Dark + champagne `#c9a875`, luxury fleet. `admin.html` is a separate operator surface — textbook two-style project. |
| **kineticedgeperformance** | Brochure | **Confident** | Injury prevention and performance screening sold like a nightclub. Dark glass cards (`rgba(255,255,255,0.06)` + stroke) are the AI look, and clinical services need trust, not drama. |
| **nmd-advisory** | Confident, fighting itself | Confident | Playfair + cream `#f9f8f4` + navy/gold is textbook Confident — then 21 scroll/animation hooks and a scroll progress bar were bolted on. The motion is working against the style. |
| **darrylslab.com** | Brochure + Utility | Brochure + Utility | Coaching front end, plus `account.html` and `connect-calendar.html` as the logged-in surface. |
| **skiip-marketing** | Brochure | Brochure | Next.js marketing site for the SKIIP app. |
| **skiip** (the app) | — | **Commerce + Utility** | See below. This is the gap. |
| ID SMASH | n/a | n/a | Brand reference pack, not a site. |
| Company Work | n/a | n/a | Invoice HTML. |

## The gap: SKIIP

SKIIP is a festival and venue ordering platform — buyer signup, vendor storefronts, Stripe
Checkout, live order handling. Its buyer-facing screens are:

```
VendorList → Menu → QuantityControl → Checkout → OrderTracker
plus BottomNav, StatusTimeline, HoldToConfirmButton, LoadingSkeleton
```

None of the three styles fits that. It isn't Brochure — nobody is being seduced, they are
hungry and queuing. It isn't Confident — nobody is weighing up a firm. And it isn't Utility,
which is the important distinction:

> **Utility is for a trained operator using a dense tool repeatedly. Commerce is for a
> stranger spending money once, on a phone, on festival wifi, where every extra tap costs
> money.**

SKIIP proves the two are different by needing both at once: its vendor `Dashboard` genuinely
is Utility, while the attendee flow is something else. Same product, two styles, and we only
had a name for one of them.

**Verdict: a fourth style, Commerce.** Built and documented in `house-style.md`, demo at
`styles/commerce.html`.

## Things worth fixing, in priority order

1. **kineticedgeperformance** should be restyled Confident. A screening service that looks
   like a supplement ad undersells it.
2. **nmd-advisory** should have most of its motion stripped. The palette and type are already
   right; the animation is the only thing making it feel templated.
3. **SKIIP hand-rolls `Toast.jsx` and `ConfirmDialog.jsx`.** Both are solved — Sonner and a
   `<dialog>` respectively. See `ui-libraries.md`. This is exactly the habit this repo exists
   to stop.
4. **Six different accent golds across four projects** (`#d9a72b`, `#c9a875`, `#f2b521`,
   `#c59f59`). Not wrong per project, but it says we were picking colours per site rather than
   per style.
5. **Nothing had a shared token file** before this repo. Every project redefines `--radius`,
   `--container` and an ease curve from scratch.

## Re-audit when

A project doesn't fit one of the four, or two projects in a row need the same thing we don't
have a name for. Not on a schedule.
