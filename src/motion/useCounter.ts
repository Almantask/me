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
      node.textContent = '0'

      gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: EASE.enter,
        snap: { current: 1 },
        onUpdate: () => {
          node.textContent = String(Math.round(counter.current))
        },
        scrollTrigger: { trigger: node, start: 'top 90%', once: true },
      })
    },
    { dependencies: [value, reduced] },
  )

  return ref
}
