import { useRef } from 'react'
import { DURATION, EASE, SplitText, gsap, useGSAP } from '../motion/gsap'
import { useInitialLowPower, useMotionEnvironment } from '../motion/useMotionEnvironment'
import { EmberField } from '../motion/EmberField'
import { useContent } from '../i18n/useContent'
import { HeroPhoto } from './HeroPhoto'

export function Hero() {
  const { profile, ui } = useContent()
  const scope = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const { reduced, finePointer, lowPower } = useMotionEnvironment()
  // The intro is choreographed once and must not re-run if the verdict changes
  // later; the glow below is a class and a listener, so it takes the live value.
  const introLowPower = useInitialLowPower()

  useGSAP(
    () => {
      const name = nameRef.current
      const photo = photoRef.current
      if (!name || !photo) return

      const staged = gsap.utils.toArray<HTMLElement>('[data-hero-stage]')

      if (reduced) {
        gsap.set([...staged, photo], { opacity: 1, y: 0, clipPath: 'inset(0%)', scale: 1 })
        return
      }

      // 'words,chars' rather than 'chars' alone: splitting to bare characters makes
      // every character an inline-block, so the browser will happily break a line
      // mid-word. Wrapping words keeps the break points where they belong.
      // aria: 'auto' keeps the full name on the container and hides the split spans,
      // so this does not shred the heading for screen readers.
      const split = new SplitText(name, { type: 'words,chars', aria: 'auto' })

      // Per character is twenty-odd elements animating at the one moment the device
      // is also decoding the hero image and swapping fonts. Where frames are scarce
      // the same gesture runs per word instead — two elements, not twenty. The split
      // itself still happens either way, so the heading's aria handling is identical.
      const [letters, cadence] = introLowPower
        ? ([split.words, { duration: 0.6, stagger: 0.08 }] as const)
        : ([split.chars, { duration: 0.9, stagger: 0.022 }] as const)

      const intro = gsap.timeline({ defaults: { ease: EASE.enter } })

      intro
        .from(letters, { yPercent: 120, opacity: 0, ...cadence })
        .from(
          photo,
          // clip-path is repainted per frame rather than composited, and the photo is
          // the largest thing on the page. The reveal is worth it on a machine that
          // can absorb it and is the first thing to go on one that cannot.
          introLowPower
            ? { opacity: 0, scale: 1.04, duration: 0.8 }
            : { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12, duration: 1.1 },
          '<0.15',
        )
        .from(staged, { y: 22, opacity: 0, duration: DURATION.enter, stagger: 0.09 }, '<0.35')

      // The handoff into About: copy drifts up and dims while the photo eases back.
      // One timeline on one ScrollTrigger rather than two triggers over an identical
      // range — every extra scrub trigger is another thing to evaluate per frame.
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(copyRef.current, { yPercent: -18, opacity: 0.15 }, 0)
        .to(photo, { scale: 0.94 }, 0)

      return () => split.revert()
    },
    { scope, dependencies: [reduced, introLowPower] },
  )

  useGSAP(
    () => {
      const glow = glowRef.current
      const host = photoRef.current
      if (!glow || !host || !finePointer || lowPower) return

      const moveX = gsap.quickTo(glow, 'xPercent', { duration: 0.9, ease: 'power3' })
      const moveY = gsap.quickTo(glow, 'yPercent', { duration: 0.9, ease: 'power3' })

      // The listener was on `window`, so every pointer move anywhere on the page
      // paid for a getBoundingClientRect on the hero — including deep in the footer,
      // where the glow is not on screen. It is now bound to the hero, measured on
      // entry, and re-measured only after something could have moved it.
      let box = host.getBoundingClientRect()
      let stale = false

      const onMove = (event: PointerEvent) => {
        if (stale) {
          box = host.getBoundingClientRect()
          stale = false
        }
        moveX(((event.clientX - box.left) / box.width - 0.5) * 30)
        moveY(((event.clientY - box.top) / box.height - 0.5) * 30)
      }

      const invalidate = () => {
        stale = true
      }

      const section = scope.current
      section?.addEventListener('pointermove', onMove)
      window.addEventListener('scroll', invalidate, { passive: true })
      window.addEventListener('resize', invalidate)

      return () => {
        section?.removeEventListener('pointermove', onMove)
        window.removeEventListener('scroll', invalidate)
        window.removeEventListener('resize', invalidate)
      }
    },
    { dependencies: [finePointer, lowPower] },
  )

  return (
    <section ref={scope} id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="shell grid content-center items-center gap-12 pt-28 pb-16 lg:min-h-[100svh] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-32">
        <div ref={copyRef}>
          <p data-hero-stage className="eyebrow">
            {profile.role} · {profile.org}
          </p>

          <h1
            ref={nameRef}
            id="hero-heading"
            className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] font-semibold"
          >
            {profile.name}
          </h1>

          <p
            data-hero-stage
            className="mt-6 max-w-xl font-serif text-[clamp(1.35rem,2.6vw,1.9rem)] italic text-ember"
          >
            {profile.tagline}
          </p>

          <p data-hero-stage className="mt-5 max-w-xl text-lg text-muted">
            {profile.intro}
          </p>

          <div data-hero-stage className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
            >
              {ui.heroCtaContact}
            </a>
            <a
              href="#experience"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-ember hover:text-ember"
            >
              {ui.heroCtaWork}
            </a>
          </div>
        </div>

        <div className="relative">
          <EmberField />
          <div
            ref={glowRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-[-18%] rounded-full opacity-70 ${
              lowPower ? '' : 'blur-3xl'
            }`}
            style={{
              // A 64px blur over a box this size is one of the more expensive things
              // on the page to rasterise. The gradient's own falloff already does most
              // of the softening, so where the blur is dropped it is stretched to
              // compensate rather than left with a visible edge.
              background: lowPower
                ? 'radial-gradient(closest-side, rgb(var(--ember-rgb) / 0.26), transparent 88%)'
                : 'radial-gradient(closest-side, rgb(var(--ember-rgb) / 0.32), transparent 72%)',
            }}
          />
          <div
            ref={photoRef}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-[var(--shadow)]"
          >
            <HeroPhoto />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-bg/30 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
