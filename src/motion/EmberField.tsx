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

/**
 * lagSmoothing is off so Lenis and ScrollTrigger stay in step, which means a stall
 * arrives here as one enormous delta. Clamping it stops the embers teleporting the
 * length of the canvas on the frame after a long task.
 */
const MAX_STEP_MS = 50

/** Past 2x the pixels stop being visible and start being fill rate. */
const MAX_DPR = 2

function seed(width: number, height: number, count: number): Ember[] {
  return Array.from({ length: count }, () => ({
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
 *
 * The draw loop is deliberately allocation-free and measurement-free: every size is
 * cached from a ResizeObserver and the fill colour is parsed once per theme, so a
 * frame costs forty arcs and nothing else. Reading `getBoundingClientRect()` or
 * building a colour string per ember per frame is what makes a canvas like this
 * show up in a profile.
 */
export function EmberField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reduced, lowPower } = useMotionEnvironment()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced || lowPower) return

    const context = canvas.getContext('2d')
    if (!context) return

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    let embers: Ember[] = []
    let width = 0
    let height = 0
    let visible = true

    const resize = (nextWidth: number, nextHeight: number) => {
      // Assigning canvas.width reallocates the backing store and clears it, so it is
      // worth skipping when the box has not really moved. Mobile browsers fire size
      // changes constantly as the URL bar slides.
      if (Math.abs(nextWidth - width) < 1 && Math.abs(nextHeight - height) < 1) return

      width = nextWidth
      height = nextHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      embers = seed(width, height, COUNT)
    }

    // `--ember-rgb` is a bare "R G B" triplet, so this is a complete colour and the
    // per-ember alpha rides on globalAlpha instead of a fresh string every frame.
    const readFill = () => {
      const rgb = getComputedStyle(canvas).getPropertyValue('--ember-rgb').trim()
      return `rgb(${rgb || '240 145 63'})`
    }

    let fill = readFill()

    const tick = (_time: number, delta: number) => {
      if (!visible || document.hidden || width === 0) return

      const seconds = Math.min(delta, MAX_STEP_MS) / 1000
      context.clearRect(0, 0, width, height)
      context.fillStyle = fill

      for (const ember of embers) {
        ember.y -= ember.speed * seconds
        ember.x += ember.drift * seconds

        if (ember.y < -8) {
          ember.y = height + 8
          ember.x = Math.random() * width
        }

        context.globalAlpha = ember.alpha
        context.beginPath()
        context.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.globalAlpha = 1
    }

    const box = canvas.getBoundingClientRect()
    resize(box.width, box.height)
    gsap.ticker.add(tick)

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
      },
      { threshold: 0 },
    )
    intersection.observe(canvas)

    // ResizeObserver rather than window resize: it fires when this element's box
    // actually changes, not every time the viewport twitches during a scroll.
    const sizes = new ResizeObserver(([entry]) => {
      const next = entry?.contentRect
      if (next) resize(next.width, next.height)
    })
    sizes.observe(canvas)

    // The accent differs per theme, and the theme can change mid-visit. Watching the
    // class attribute costs nothing until someone actually hits the toggle.
    const themes = new MutationObserver(() => {
      fill = readFill()
    })
    themes.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      gsap.ticker.remove(tick)
      intersection.disconnect()
      sizes.disconnect()
      themes.disconnect()
    }
  }, [reduced, lowPower])

  if (reduced || lowPower) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
