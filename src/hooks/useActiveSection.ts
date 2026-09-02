import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../motion/gsap'

/**
 * Which section the reader is currently in, for the nav indicator.
 *
 * Uses ScrollTrigger rather than a hand-rolled scroll listener so it reads the same
 * scroll position Lenis and every other animation are working from.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const triggers = ids.flatMap((id) => {
      const element = document.getElementById(id)
      if (!element) return []

      return ScrollTrigger.create({
        trigger: element,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActive(id)
        },
      })
    })

    return () => {
      for (const trigger of triggers) trigger.kill()
    }
  }, [ids])

  return active
}
