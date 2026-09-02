import { useEffect, useRef } from 'react'
import { gsap } from './gsap'
import { useMotionEnvironment } from './useMotionEnvironment'

const COUNT = 40

interface Ember {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  alpha: number
}

function seed(width: number, height: number): Ember[] {
  return Array.from({ length: COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 0.6 + Math.random() * 1.8,
    speed: 6 + Math.random() * 18,
    drift: (Math.random() - 0.5) * 12,
    alpha: 0.15 + Math.random() * 0.45,
  }))
}

/**
 * Drifting sparks behind the hero photo, in the accent colour.
 *
 * Runs off the GSAP ticker rather than its own RAF loop so there is exactly one
 * animation clock on the page, and pauses entirely while scrolled out of view.
 */
export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reduced } = useMotionEnvironment()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return

    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let embers: Ember[] = []
    let visible = true

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      embers = seed(width, height)
    }

    const colour = () =>
      getComputedStyle(canvas).getPropertyValue('--ember-rgb').trim() || '240 145 63'

    let rgb = colour()

    const tick = (_time: number, delta: number) => {
      if (!visible) return
      const seconds = delta / 1000
      const { width, height } = canvas.getBoundingClientRect()

      context.clearRect(0, 0, width, height)
      for (const ember of embers) {
        ember.y -= ember.speed * seconds
        ember.x += ember.drift * seconds

        if (ember.y < -8) {
          ember.y = height + 8
          ember.x = Math.random() * width
        }

        context.beginPath()
        context.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2)
        context.fillStyle = `rgb(${rgb} / ${ember.alpha})`
        context.fill()
      }
    }

    resize()
    gsap.ticker.add(tick)

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    const onResize = () => {
      resize()
      rgb = colour()
    }
    window.addEventListener('resize', onResize)

    return () => {
      gsap.ticker.remove(tick)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
