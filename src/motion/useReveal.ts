import { useRef } from 'react'
import { DURATION, EASE, ScrollTrigger, gsap, useGSAP } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

interface RevealOptions {
  /** CSS selector for the children to stagger in. Defaults to `[data-reveal]`. */
  readonly selector?: string
  readonly stagger?: number
  readonly y?: number
  readonly start?: string
}

/**
 * The workhorse entrance: children fade and rise as the container scrolls in.
 *
 * Pre-reveal state is set from JS, never CSS, so a thrown error or a failed chunk
 * cannot strand a section at opacity 0 with the content unreadable.
 */
export function useReveal<T extends HTMLElement>({
  selector = '[data-reveal]',
  stagger = 0.08,
  y = 24,
  start = 'top 80%',
}: RevealOptions = {}) {
  const scope = useRef<T>(null)
  const { reduced } = useMotionEnvironment()

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector)
      if (targets.length === 0) return

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(targets, { opacity: 0, y })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: DURATION.enter,
        ease: EASE.enter,
        stagger,
        scrollTrigger: { trigger: scope.current, start, once: true },
      })
    },
    { scope, dependencies: [reduced, selector, stagger, y, start] },
  )

  return scope
}

/** Re-measure every trigger. Call after anything that changes document height. */
export function refreshTriggers() {
  ScrollTrigger.refresh()
}
