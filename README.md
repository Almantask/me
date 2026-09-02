# almantask.github.io/me

The personal site of Almantas Karpavičius — Engineering Manager at Nord Security, 3× Microsoft MVP, author of two books, conference speaker, and mentor at Idealogue, KTU and Nord Security.

**Live:** https://almantask.github.io/me/

A single scrolling page: hero → about → experience → projects → speaking → community & mentorship → writing & awards → beyond work → contact. Dark by default, with a light theme, and a lot of deliberate motion.

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

**All copy lives in `src/content/`.** Components render it and never hold text of their own, so a CV update is a one-file diff:

| File | Holds |
| --- | --- |
| `profile.ts` | Name, role, tagline, about paragraphs, education, hobbies, the pull-quote, nav sections |
| `experience.ts` | Every role. `featured: true` renders expanded; the rest sit behind the disclosure |
| `projects.ts` | Project cards |
| `speaking.ts` | Talks, grouped by year |
| `community.ts` | Mentorship beats, the counted stats, community activities |
| `awards.ts`, `books.ts` | Recognition and writing |
| `site.ts` | URL, meta description, contact-form endpoint |

`src/content/types.ts` defines the shapes. `src/__tests__/content.test.ts` enforces unique ids, reverse-chronological roles, `https:` links — and that **no phone number or street address ever appears in the content bundle**, which is a deliberate privacy decision, not an oversight.

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
- **`npm run budget` fails the build if eager JS grows past 165 kB gzip.** Motion's DOM feature bundle is dynamically imported and counted separately.

### First-time setup

GitHub Pages must be set to deploy from **GitHub Actions** — repository *Settings → Pages → Source*. The workflow cannot set this itself, and the first deploy fails without it.

## Images

`assets/almantas-source.jpg` is the original 5000×3333 photo. `npm run images` crops it 4:3 and emits AVIF, WebP and JPEG at 640/960/1440 plus a 1200×630 social card. **The outputs are committed**, so CI never needs sharp installed.
