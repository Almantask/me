import { useRef } from 'react'
import { useContent } from '../i18n/useContent'
import { SplitText, gsap, useGSAP } from '../motion/gsap'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'
import { useReveal } from '../motion/useReveal'
import { Section } from './Section'

export function Beyond() {
  const { beyond, hobbies, quote, ui } = useContent()
  const scope = useReveal<HTMLDivElement>({ stagger: 0.08 })
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const { reduced } = useMotionEnvironment()

  useGSAP(
    () => {
      const node = quoteRef.current
      if (!node) return

      if (reduced) {
        gsap.set(node, { opacity: 1 })
        return
      }

      // aria: 'none' because the paragraph is already hidden from assistive tech —
      // and SplitText's own aria handling puts aria-label on the element, which is
      // prohibited on a <p> (implicit role "paragraph" does not support naming).
      const split = new SplitText(node, { type: 'words', aria: 'none' })

      // The one place on the page where slow is the point: the line arrives at the
      // pace you scroll it, word by word.
      gsap.from(split.words, {
        opacity: 0.12,
        stagger: 0.5,
        ease: 'none',
        scrollTrigger: { trigger: node, start: 'top 78%', end: 'bottom 55%', scrub: 0.4 },
      })

      return () => split.revert()
    },
    // The quote text itself changes with the language, so this one does re-split.
    { dependencies: [reduced, quote.text] },
  )

  return (
    <Section id="beyond" eyebrow={ui.beyondEyebrow} title={ui.beyondTitle}>
      <div ref={scope} className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div data-reveal>
          <p className="text-lg text-muted">{beyond}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <li
                key={hobby}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm"
              >
                {hobby}
              </li>
            ))}
          </ul>
        </div>

        <figure data-reveal>
          <blockquote>
            {/* The animated copy is decorative; this one is what gets read aloud. */}
            <p className="sr-only">{quote.text}</p>
            <p
              key={quote.text}
              ref={quoteRef}
              aria-hidden="true"
              className="font-serif text-[clamp(1.4rem,3vw,2.15rem)] leading-snug italic text-balance"
            >
              {quote.text}
            </p>
          </blockquote>
          <figcaption className="mt-6 text-sm text-muted">
            <span className="text-ember">— {quote.source}</span>
            <span className="mt-2 block">{quote.note}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}
