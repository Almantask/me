import { useRef } from 'react'
import { useContent } from '../i18n/useContent'
import { DURATION, EASE, gsap, useGSAP } from '../motion/gsap'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'

/**
 * A band rather than a full section: it deliberately has no nav entry. Three values
 * do not need their own destination, and an eighth item would crowd the desktop nav
 * — especially in Lithuanian, where every label is longer.
 */
export function Values() {
  const { values, ui } = useContent()
  const scope = useRef<HTMLElement>(null)
  const { reduced } = useMotionEnvironment()

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-value]')
      const rules = gsap.utils.toArray<HTMLElement>('[data-value-rule]')

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 })
        gsap.set(rules, { scaleX: 1 })
        return
      }

      gsap.set(cards, { opacity: 0, y: 26 })
      gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' })

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: 'top 78%', once: true },
      })

      timeline
        .to(rules, { scaleX: 1, duration: 0.7, ease: EASE.enter, stagger: 0.12 })
        .to(
          cards,
          { opacity: 1, y: 0, duration: DURATION.enter, ease: EASE.enter, stagger: 0.12 },
          '<0.1',
        )
    },
    { scope, dependencies: [reduced] },
  )

  return (
    <section
      ref={scope}
      id="values"
      aria-labelledby="values-heading"
      className="scroll-mt-24 border-y border-line py-20 md:py-24"
    >
      <div className="shell">
        <p className="eyebrow">{ui.valuesEyebrow}</p>
        <h2
          id="values-heading"
          className="mt-3 max-w-3xl text-2xl font-semibold md:text-3xl lg:text-4xl"
        >
          {ui.valuesTitle}
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {values.map((value, index) => (
            <li key={value.id} data-value>
              <span
                data-value-rule
                aria-hidden="true"
                className="block h-px w-full bg-ember"
              />
              <p className="mt-5 font-serif text-sm italic text-ember">
                {/* Decorative numbering: the ordered list already conveys the order. */}
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </p>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">{value.name}</h3>
              <p className="mt-3 text-muted">{value.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
