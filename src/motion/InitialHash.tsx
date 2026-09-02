import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { ScrollTrigger } from './gsap'

/**
 * Handles a hash in the URL on first load.
 *
 * The browser resolves `#contact` while the page is still an empty `<div id="root">`,
 * so its own jump is a no-op and a shared deep link silently lands at the top. This
 * redoes it once React has rendered and the layout has settled.
 */
export function InitialHash() {
  const lenis = useLenis()

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return

    let cancelled = false

    const jump = () => {
      if (cancelled) return
      const target = document.getElementById(id)
      if (!target) return

      // Immediate rather than animated: the reader asked for this position, they did
      // not ask to watch the whole page scroll past on arrival.
      if (lenis) lenis.scrollTo(target, { immediate: true })
      else target.scrollIntoView({ block: 'start' })

      // Reveals below the fold are `once: true`; refreshing makes the ones now
      // behind us fire immediately instead of leaving the section blank.
      ScrollTrigger.refresh()
    }

    void document.fonts.ready.then(() => {
      requestAnimationFrame(() => requestAnimationFrame(jump))
    })

    return () => {
      cancelled = true
    }
  }, [lenis])

  return null
}
