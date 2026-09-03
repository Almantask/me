# almantask.github.io/me

The personal site of Almantas Karpavičius — Engineering Manager at Nord Security, 3× Microsoft MVP, author of two books, conference speaker, and mentor at Idealogue, KTU and Nord Security.

**Live:** https://almantask.github.io/me/

A single scrolling page: hero → about → experience → projects → speaking → community & mentorship → writing & awards → beyond work → contact. English and Lithuanian, dark and light themes, and a lot of deliberate motion.

## Running it

```bash
npm ci
npm run dev        # http://localhost:5173/me/
```

Note the `/me/` — the site is served from a repository subpath, and the dev server mirrors that on purpose.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run e2e` | Playwright — builds, serves and drives the real bundle |
| `npm run budget` | Fails if eager JS exceeds the size budget |
| `npm run images` | Regenerates `public/img/*` from `assets/almantas-source.jpg` |

## Updating the content

**All copy lives in `src/content/`**, split by language. Components render it and never hold text of their own, so a CV update is a one-file diff per language:

```
src/content/
  types.ts        interfaces both languages must satisfy
  index.ts        bundles = { en, lt }
  site.ts         URL and contact-form endpoint (not language-specific)
  en/  lt/        the same seven files, one set per language
```

| File | Holds |
| --- | --- |
| `profile.ts` | Name, role, tagline, about paragraphs, education, hobbies, the pull-quote, nav sections |
| `experience.ts` | Every role. `featured: true` renders expanded; the rest sit behind the disclosure |
| `projects.ts` | Project cards |
| `speaking.ts` | Talks, grouped by year |
| `community.ts` | Mentorship beats, the counted stats, community activities |
| `awards.ts`, `books.ts` | Recognition and writing |
| `ui.ts` | Every string that is chrome rather than CV content — buttons, labels, form errors, page title |

**Edit both languages together.** `src/__tests__/content.test.ts` fails the build if the two drift: matching ids in every collection, the same roles featured, identical dates, links and stat values, the same set of UI string keys, and prose that is actually translated rather than copied. It also enforces unique ids, reverse-chronological roles, `https:` links, and that **no phone number or street address appears in either language** — a deliberate privacy decision, not an oversight.

## Language

Two languages, English and Lithuanian, chosen in this order:

1. `?lang=en` / `?lang=lt` in the URL — so a shared link always opens in the language it was shared in
2. the reader's previous choice, from `localStorage`
3. the browser's own preference (`lt-LT` matches `lt`)
4. English

`src/i18n/language.ts` holds that rule as a pure function; `LanguageProvider` applies it and keeps `<html lang>`, the document title and the meta description in step. Switching rewrites the URL with `replaceState`, preserving whichever section anchor the reader is on.

**Section ids are never translated** — they are URL anchors, and they are what the animation selectors key off. Only the labels change. Dates format per language too: `Jan 2026` in English, `01/2026` in Lithuanian, which is what the Lithuanian CV does and what `Intl` reports for the locale.

Both language bundles ship eagerly. Lazy-loading the inactive one would save a few kB but hand a Lithuanian reader a flash of English on arrival — the wrong trade for the audience the feature exists for. A third language is the point to revisit that.

### The contact form

GitHub Pages cannot process a POST, so `contactFormEndpoint` in `site.ts` is `null` by default and the form opens a prefilled `mailto:` instead. It works with no account and no setup. Point that constant at a Formspree or Web3Forms URL and the same form starts POSTing JSON with proper pending/success/error states — no other change needed.

## Animation

Three libraries animate things here, so ownership is explicit. **No two libraries ever touch the same property on the same element.**

| Library | Owns | Never used for |
| --- | --- | --- |
| **Lenis** | The scroll position itself — inertial scrolling, `scrollTo` for anchor nav | Anything visual |
| **GSAP + ScrollTrigger** | Everything driven *by* scroll: pins, scrubs, reveals, SplitText, the drawn timeline, counters, magnetic hover | React component state |
| **Motion** | Everything driven by *React state*: `AnimatePresence`, the `layoutId` nav indicator, the scroll-progress bar | Scroll-triggered reveals |

Things worth knowing before changing any of it:

- **Lenis and GSAP share one RAF loop** (`src/motion/ScrollProvider.tsx`). Break that sync and every scrubbed animation judders.
- **Every GSAP call goes through `useGSAP()`**, scoped to a ref. React StrictMode double-invokes effects; raw `useEffect` leaves duplicate ScrollTriggers behind.
- **`ScrollTrigger.refresh()` after fonts and images settle**, and after the roles disclosure expands. Positions measured against fallback-font metrics are wrong by tens of pixels.
- **Pre-reveal states are set with `gsap.set()`, never in CSS**, so a thrown error cannot strand a section at `opacity: 0`.
- **`scroll-mt-24` on each section is the single source of truth** for how far below the sticky header an anchor lands. Lenis honours `scroll-margin-top`; passing an extra offset double-counts it.
- **Deep links need explicit handling** (`src/motion/InitialHash.tsx`). The browser resolves `#contact` while the page is still an empty root div, so its own jump does nothing and a shared link lands at the top.

### Reduced motion

`src/motion/environment.ts` resolves the motion environment once, and it is the only place that decision is made. Under `prefers-reduced-motion: reduce`, **Lenis is not mounted at all** — hijacked scroll is exactly what the preference exists to prevent — every GSAP animation renders its final state instantly, counters show their final values, the pinned section does not pin, and the ember canvas never mounts. Pointer effects additionally require `(hover: hover) and (pointer: fine)`, and the pin requires `min-width: 768px`.

`e2e/motion.spec.ts` verifies all of this in a real browser. It is not decoration.

## Stack

Vite 8 (Rolldown + Lightning CSS) · React 19 with React Compiler · TypeScript 7 · Tailwind CSS 4 · GSAP · Motion · Lenis · Vitest · Playwright + axe · oxlint.

A single client-rendered React app rather than Astro or Next: the page ships GSAP, Motion and Lenis regardless, so islands would buy nothing while fragmenting a scroll choreography that needs one Lenis root and triggers spanning section boundaries.

**oxlint runs without the `react-perf` plugin.** React Compiler auto-memoizes, and those rules would push the code toward hoisting things that cannot be hoisted — a `style` object built from a motion value, for one.

## CI/CD

`.github/workflows/ci.yml` — five jobs, and nothing reaches production that has not passed every check.

| Job | When | What |
| --- | --- | --- |
| `verify` | PR + main | lint, typecheck, unit tests |
| `e2e` | PR + main | Playwright on the real production bundle, desktop and mobile; report uploaded on failure |
| `build` | PR + main | production build, bundle-size budget gate |
| `deploy` | main | GitHub Pages |
| `audit` | main, post-deploy | Lighthouse CI against the live URL |

Two things that are easy to get wrong and are therefore checked mechanically:

- **`e2e/smoke.spec.ts` asserts no request resolves outside `/me/`.** A root-absolute `/img/x.jpg` works perfectly in `npm run dev` and 404s in production. This is the guard.
- **`npm run budget` fails the build if eager JS grows past 175 kB gzip.** Motion's DOM feature bundle is dynamically imported and counted separately.
- **axe runs over both languages in both themes.** Lithuanian sets noticeably longer strings, so it can break a layout or a contrast ratio that English never does. The 320px overflow check runs in Lithuanian for the same reason.

### First-time setup

GitHub Pages must be set to deploy from **GitHub Actions** — repository *Settings → Pages → Source*. The workflow cannot set this itself, and the first deploy fails without it.

## Images

`assets/almantas-source.jpg` is the original 5000×3333 photo. `npm run images` crops it 4:3 and emits AVIF, WebP and JPEG at 640/960/1440 plus a 1200×630 social card. **The outputs are committed**, so CI never needs sharp installed.
