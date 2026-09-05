import { useRef } from 'react'
import { gsap, useGSAP } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

/**
 * Eases an element toward the cursor while it is hovered, springing back on leave.
 * Bound only when there is a real pointer that can hover — never on touch, never
 * under reduced motion, and never on a device already struggling for frames.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null)
  const { finePointer, lowPower } = useMotionEnvironment()

  useGSAP(
    () => {
      const node = ref.current
      if (!node || !finePointer || lowPower) return

      // quickTo keeps a single interpolator alive instead of spawning a tween per
      // pointermove event — the difference between smooth and a dropped frame budget.
      const moveX = gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3' })
      const moveY = gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3' })

      // Measured once on entry, not per event. getBoundingClientRect() forces the
      // browser to flush pending layout, and a pointer emits these faster than the
      // display refreshes — on a high-polling-rate mouse, several times per frame.
      let centreX = 0
      let centreY = 0
      let stale = true

      // Marking stale rather than re-measuring: both of these fire every frame of a
      // smooth scroll or a drag-resize, and the next pointermove is the only place
      // the number is actually wanted.
      const invalidate = () => {
        stale = true
      }

      // Bound on entry and dropped on leave, so the page carries one of these while
      // a card is hovered instead of one per card for the whole visit.
      const onEnter = () => {
        stale = true
        window.addEventListener('scroll', invalidate, { passive: true })
        window.addEventListener('resize', invalidate)
      }

      const onMove = (event: PointerEvent) => {
        if (stale) {
          const box = node.getBoundingClientRect()
          centreX = box.left + box.width / 2
          centreY = box.top + box.height / 2
          stale = false
        }
        moveX((event.clientX - centreX) * strength)
        moveY((event.clientY - centreY) * strength)
      }

      const onLeave = () => {
        stale = true
        window.removeEventListener('scroll', invalidate)
        window.removeEventListener('resize', invalidate)
        moveX(0)
        moveY(0)
      }

      node.addEventListener('pointerenter', onEnter)
      node.addEventListener('pointermove', onMove)
      node.addEventListener('pointerleave', onLeave)

      return () => {
        node.removeEventListener('pointerenter', onEnter)
        node.removeEventListener('pointermove', onMove)
        node.removeEventListener('pointerleave', onLeave)
        // The card can unmount while hovered — a language switch, say.
        window.removeEventListener('scroll', invalidate)
        window.removeEventListener('resize', invalidate)
      }
    },
    { dependencies: [finePointer, lowPower, strength] },
  )

  return ref
}
