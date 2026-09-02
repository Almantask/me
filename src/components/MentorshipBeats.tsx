import { useRef } from 'react'
import { mentorshipBeats } from '../content/community'
import { gsap, useGSAP } from '../motion/gsap'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'

/**
 * The one pinned set-piece on the site. Scrolling through the pinned viewport
 * cross-fades the three beats of why he mentors.
 *
 * On narrow screens the pin is skipped entirely — pinning on a phone fights the
 * browser's own scroll gestures — and the beats simply stack.
 */
export function MentorshipBeats() {
  const scope = useRef<HTMLDivElement>(null)

  const { reduced, canPin } = useMotionEnvironment()
  const pinned = canPin && !reduced

  useGSAP(
    () => {
      const beats = gsap.utils.toArray<HTMLElement>('[data-beat]')
      if (beats.length === 0) return

      if (!pinned) {
        gsap.set(beats, { opacity: 1, y: 0, position: 'relative' })
        return
      }

      gsap.set(beats, { position: 'absolute', opacity: 0, y: 30 })
      gsap.set(beats[0] ?? {}, { opacity: 1, y: 0 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top+=96',
          end: `+=${beats.length * 420}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      for (const [index, beat] of beats.entries()) {
        if (index === 0) continue
        timeline
          .to(beats[index - 1] ?? {}, { opacity: 0, y: -30, duration: 1 })
          .to(beat, { opacity: 1, y: 0, duration: 1 }, '<0.3')
      }

      // Hold on the last beat so it does not vanish the instant the pin releases.
      timeline.to({}, { duration: 0.6 })
    },
    { scope, dependencies: [pinned] },
  )

  return (
    <div
      ref={scope}
      className={pinned ? 'grid min-h-[42vh] place-items-center' : 'space-y-6'}
    >
      {mentorshipBeats.map((beat) => (
        <p
          key={beat.slice(0, 24)}
          data-beat
          className="max-w-3xl text-center font-serif text-[clamp(1.5rem,3.6vw,2.75rem)] leading-tight italic text-balance"
        >
          {beat}
        </p>
      ))}
    </div>
  )
}
