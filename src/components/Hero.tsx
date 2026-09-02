import { useRef } from 'react'
import { DURATION, EASE, SplitText, gsap, useGSAP } from '../motion/gsap'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'
import { EmberField } from '../motion/EmberField'
import { heroFacts, profile } from '../content/profile'
import { HeroPhoto } from './HeroPhoto'

export function Hero() {
  const scope = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const { reduced, finePointer } = useMotionEnvironment()

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

      const intro = gsap.timeline({ defaults: { ease: EASE.enter } })

      intro
        .from(split.chars, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          stagger: 0.022,
        })
        .from(
          photo,
          { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.12, duration: 1.1 },
          '<0.15',
        )
        .from(staged, { y: 22, opacity: 0, duration: DURATION.enter, stagger: 0.09 }, '<0.35')

      // The handoff into About: copy drifts up and dims while the photo eases back.
      gsap.to(copyRef.current, {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(photo, {
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      return () => split.revert()
    },
    { scope, dependencies: [reduced] },
  )

  useGSAP(
    () => {
      const glow = glowRef.current
      const host = photoRef.current
      if (!glow || !host || !finePointer) return

      const moveX = gsap.quickTo(glow, 'xPercent', { duration: 0.9, ease: 'power3' })
      const moveY = gsap.quickTo(glow, 'yPercent', { duration: 0.9, ease: 'power3' })

      const onMove = (event: PointerEvent) => {
        const box = host.getBoundingClientRect()
        moveX(((event.clientX - box.left) / box.width - 0.5) * 30)
        moveY(((event.clientY - box.top) / box.height - 0.5) * 30)
      }

      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    },
    { dependencies: [finePointer] },
  )

  return (
    <section ref={scope} id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="shell grid min-h-[100svh] items-center gap-12 pt-28 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-32">
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
              Get in touch
            </a>
            <a
              href="#experience"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-ember hover:text-ember"
            >
              See my work
            </a>
          </div>

          <ul
            data-hero-stage
            aria-label="At a glance"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {heroFacts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ember" />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <EmberField />
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-18%] rounded-full opacity-70 blur-3xl"
            style={{
              background:
                'radial-gradient(closest-side, rgb(var(--ember-rgb) / 0.32), transparent 72%)',
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
