import { useRef } from 'react'
import { EASE, gsap, useGSAP } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

/**
 * Counts a number up when it first scrolls into view, then never again.
 * Under reduced motion the final value is simply rendered.
 */
export function useCounter<T extends HTMLElement>(value: number) {
  const ref = useRef<T>(null)
  const { reduced } = useMotionEnvironment()

  useGSAP(
    () => {
      const node = ref.current
      if (!node) return

      if (reduced) {
        node.textContent = String(value)
        return
      }

      const counter = { current: 0 }
      let shown = 0
      node.textContent = '0'

      gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: EASE.enter,
        snap: { current: 1 },
        onUpdate: () => {
          // Writing textContent invalidates layout for the whole line. On the tail of
          // the ease the snapped value repeats for frames at a time, so skipping the
          // writes that would not change anything removes most of that work — and all
          // of it once the count has landed.
          const next = Math.round(counter.current)
          if (next === shown) return
          shown = next
          node.textContent = String(next)
        },
        scrollTrigger: { trigger: node, start: 'top 90%', once: true },
      })
    },
    { dependencies: [value, reduced] },
  )

  return ref
}
