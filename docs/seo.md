# SEO

SEO is not a phase at the end. Most of it is decided by how the page is built, and
retrofitting it costs more than doing it right the first time.

Our clients are small local businesses. That means **local search is the whole game** —
ranking for "plumber in Claremont" matters more than any amount of content marketing.

Work down this file. Everything in **Ship blockers** is required on every site we deliver.

---

## Ship blockers

A site does not go live without these.

### Per page

- [ ] **One `<h1>`**, describing that page. Headings in order, no skipped levels.
- [ ] **`<title>`** — unique per page, under ~60 characters, the specific thing first and the business name last. `Emergency plumber, Claremont | Northgate Plumbing`, not `Home | Northgate Plumbing`.
- [ ] **`<meta name="description">`** — unique per page, 140–160 characters, written to be clicked rather than to list keywords.
- [ ] **`<link rel="canonical">`** — absolute URL, self-referencing. Stops duplicate-content splits between `/`, `/index.html`, `www` and non-`www`.
- [ ] **Descriptive URL** — `/services/geyser-repair`, not `/page-4` or `/services?id=7`. Lowercase, hyphens, no trailing junk.
- [ ] **Open Graph + Twitter tags** — `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`, `twitter:card`. This is what gets shared in WhatsApp, which for our clients is most of their referral traffic.
- [ ] **Meaningful `alt`** on content images, `alt=""` on decorative ones. Describe the thing, don't stuff keywords.
- [ ] **Real text, not images of text.** Nothing important baked into a graphic.

### Per site

- [ ] **`robots.txt`** at the root, with the sitemap URL in it.
- [ ] **`sitemap.xml`** listing every indexable page.
- [ ] **HTTPS**, with `http://` and the non-canonical host 301-redirecting to the canonical one.
- [ ] **Mobile-friendly** — see `house-style.md`. Google indexes the mobile version. A site that fails on a phone does not rank, full stop.
- [ ] **Structured data** — at minimum `LocalBusiness` (or `Organization`) on the homepage. `FAQPage` where there's an FAQ, `BreadcrumbList` on deep pages, `Service` on service pages.
- [ ] **Google Business Profile claimed and filled in**, with name, address and phone **character-for-character identical** to the site footer. Inconsistent NAP is the single most common local-SEO own goal.
- [ ] **Google Search Console verified**, sitemap submitted. Hand this over to the client at launch.
- [ ] **Analytics** installed and the client shown where to look.

---

## Core Web Vitals

Google measures real visitors, mostly on mid-range Android phones on patchy mobile data —
not your laptop on fibre. Test accordingly.

| Metric | Target | What usually breaks it |
|---|---|---|
| **LCP** (loading) | under 2.5s | An unoptimised hero image, a webfont blocking render, a slow host |
| **CLS** (layout shift) | under 0.1 | Images without `width`/`height`, webfonts swapping, banners injected above content |
| **INP** (responsiveness) | under 200ms | Too much JavaScript on the main thread |

How we hit them:

- **Images.** Correct dimensions, AVIF or WebP, `width` and `height` always set, `loading="lazy"` below the fold and **never** on the hero image. `fetchpriority="high"` on the LCP image.
- **Fonts.** `font-display: swap`, `preconnect` to the font host, and no more than two families with the weights we actually use. Self-host on sites where it matters.
- **JavaScript.** Our default stack is plain HTML and CSS precisely because it starts at zero. Every library added is a Core Web Vitals decision — check `ui-libraries.md` before reaching for one.
- **Nothing above the fold that shifts.** Reserve space for anything that loads late.

Budget for a brochure site: **under 500KB total on first load, under 1s LCP on a good connection.** If a design can't hit that, the design changes.

---

## Content structure

Search engines and readers want the same thing, which is convenient.

- **Answer the question in the first paragraph.** No warm-up copy.
- **One page per intent.** A page trying to rank for "plumber", "geyser repair" and "blocked drains" ranks for none of them. Separate pages, each genuinely about its own thing.
- **Headings are a table of contents**, not decoration. Someone skimming the `<h2>`s should understand the page.
- **Internal links with descriptive text.** "Read about our geyser repair service", never "click here" or a bare URL.
- **Local signals in the copy** — suburb and city names where they read naturally. Naturally. A paragraph stuffed with "plumber Cape Town plumber Claremont" reads as spam to people and to Google.
- **A real address and phone number in the footer**, as text, matching the Google Business Profile exactly. Phone as `tel:` link.

---

## Structured data

Use the `LocalBusiness` type that actually matches (`Plumber`, `Dentist`, `Accountant`,
`HealthClub`…). Validate at [validator.schema.org](https://validator.schema.org) and in
Search Console's Rich Results test before launch.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Northgate Plumbing",
  "url": "https://northgateplumbing.co.za",
  "telephone": "+27215550198",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "14 Main Road",
    "addressLocality": "Claremont",
    "addressRegion": "Western Cape",
    "postalCode": "7708",
    "addressCountry": "ZA"
  },
  "areaServed": ["Claremont", "Newlands", "Rondebosch"],
  "openingHours": "Mo-Fr 07:00-17:00",
  "priceRange": "$$"
}
</script>
```

`styles/confident.html` carries a working `LocalBusiness` + `FAQPage` example — copy from
there rather than from memory.

---

## What we don't do

- Keyword stuffing, hidden text, doorway pages, bought links. These get sites penalised and
  they get us fired.
- Promising rankings. We promise a technically sound, fast, well-structured site. Where it
  ranks depends on competition and the client's own reputation.
- Blocking the client from editing their own copy. If they can't update it, it goes stale and
  stale pages slide.

---

## Launch checklist

Run this the day you go live, not a week after.

- [ ] Every page has a unique title, description and canonical
- [ ] `robots.txt` and `sitemap.xml` live and correct
- [ ] No `noindex` left over from staging — **check this twice**, it is the classic launch bug
- [ ] Old URLs 301-redirected if this replaces an existing site
- [ ] Structured data validates
- [ ] Lighthouse mobile: performance, accessibility, best practices and SEO all 90+
- [ ] Tested on a real mid-range Android phone, not just the browser's device emulator
- [ ] Search Console verified, sitemap submitted
- [ ] Google Business Profile NAP matches the footer exactly
- [ ] Analytics firing, client shown the dashboard
