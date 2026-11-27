# DK Digital — design system

Three house styles, a reuse-first library list, and a showcase site that demonstrates both.

Every new DK Digital project starts here instead of from an empty stylesheet. The point is to
stop designing from scratch and stop hand-building components that are already solved.

```powershell
npm install; npm run dev
```

## What's in here

| Path | What it is |
|---|---|
| `index.html` | The hub. The three styles, the reuse ladder, the non-negotiables. |
| `styles/brochure.html` | **Brochure** demo — expressive, dark, motion-led. Fictional cycling studio. |
| `styles/confident.html` | **Confident** demo — light, restrained, typographic. Fictional accountancy firm. |
| `styles/utility.html` | **Utility** demo — dense, functional, light + dark. Fictional payments portal. |
| `src/tokens.css` | **The source of truth.** Reset plus all three token sets as `.t-*` classes. |
| `src/brochure.css`, `src/confident.css`, `src/utility.css` | Each style's components. |
| `src/reveal.js` | Scroll reveal and count-up on `IntersectionObserver`. No animation library. |
| `docs/house-style.md` | Full spec: every token, what each style is for, the explicit don'ts. |
| `docs/ui-libraries.md` | Library research list and inspiration galleries. Verified Nov 2026. |
| `.claude/skills/dk-style/` | Claude Code skill that applies all of the above automatically. |

The demo clients are fictional. The tokens are real — copy them.

## Using this on a new project

1. Pick a style. Buyer making an emotional decision → **Brochure**. Cautious decision →
   **Confident**. Already decided, now has work to do → **Utility**. A site with a logged-in
   area uses two: a marketing style out front, Utility behind the login.
2. Copy `src/tokens.css` into the new project.
3. Put the class on `<body>`: `t-brochure`, `t-confident` or `t-utility`.
4. Open the matching demo page and copy the patterns you need. Don't start from blank.
5. Build everything from `var(--…)`. No hardcoded hex in a component.

## Installing the skill

Makes Claude Code pick a style, use the tokens, and reach for a known-good library instead of
hand-rolling a drawer. Install it once globally rather than per project:

```powershell
Copy-Item -Recurse .claude\skills\dk-style "$env:USERPROFILE\.claude\skills\dk-style"
```

Then on any project: *"Use the dk-style skill. This is an accountancy firm."*

Worth pairing with Emil Kowalski's library-picker on React projects:

```powershell
npx -y skills add emilkowalski/skills --skill pick-ui-library --agent claude-code
```

## The rule this repo exists to enforce

Stop at the first rung that works.

1. Does this need to exist? Half the sections in a brief don't.
2. Is it in this repo already? Copy the pattern.
3. Does the platform do it? `<dialog>`, `popover`, `<details>`, `<input type="date">`,
   scroll-driven animations, view transitions.
4. Is there a known-good library? See `docs/ui-libraries.md`.
5. Only then write it, and only the minimum that works.

## Deploying

Vite, multi-page, relative asset paths — so it works on a GitHub Pages subpath with no extra
config. `vite.config.js` globs `styles/*.html`, so a new style page needs no config change.

```powershell
npm run deploy
```

Publishes `dist` to the `gh-pages` branch. Enable Pages on that branch in repo settings once.
