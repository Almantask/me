import { useRef } from 'react'
import { gsap, useGSAP } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

/**
 * Eases an element toward the cursor while it is hovered, springing back on leave.
 * Bound only when there is a real pointer that can hover — never on touch, never
 * under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null)
  const { finePointer } = useMotionEnvironment()

  useGSAP(
    () => {
      const node = ref.current
      if (!node || !finePointer) return

      // quickTo keeps a single interpolator alive instead of spawning a tween per
      // pointermove event — the difference between smooth and a dropped frame budget.
      const moveX = gsap.quickTo(node, 'x', { duration: 0.5, ease: 'power3' })
      const moveY = gsap.quickTo(node, 'y', { duration: 0.5, ease: 'power3' })

      const onMove = (event: PointerEvent) => {
        const box = node.getBoundingClientRect()
        moveX((event.clientX - (box.left + box.width / 2)) * strength)
        moveY((event.clientY - (box.top + box.height / 2)) * strength)
      }

      const onLeave = () => {
        moveX(0)
        moveY(0)
      }

      node.addEventListener('pointermove', onMove)
      node.addEventListener('pointerleave', onLeave)

      return () => {
        node.removeEventListener('pointermove', onMove)
        node.removeEventListener('pointerleave', onLeave)
      }
    },
    { dependencies: [finePointer, strength] },
  )

  return ref
}
