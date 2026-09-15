import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react'
import type { ProjectScreenshot } from '../content/types'
import { useUi } from '../i18n/useContent'
import { wrapIndex } from '../lib/carousel'
import { useMotionEnvironment } from '../motion/useMotionEnvironment'

const BASE = import.meta.env.BASE_URL
const INTERVAL_MS = 4200
const SWIPE_PX = 40

interface Props {
  readonly projectId: string
  readonly projectName: string
  readonly screenshots: readonly ProjectScreenshot[]
}

export function ProjectCarousel({ projectId, projectName, screenshots }: Props) {
  const ui = useUi()
  const { reduced } = useMotionEnvironment()
  const count = screenshots.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const swipeRef = useRef<number | null>(null)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting === true), {
      threshold: 0.4,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const canAutoplay = count > 1 && !reduced && !paused && inView

  useEffect(() => {
    if (!canAutoplay) return
    const timer = window.setInterval(() => setIndex((current) => wrapIndex(current, 1, count)), INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [canAutoplay, count])

  if (count === 0) return null

  const go = (delta: number) => setIndex((current) => wrapIndex(current, delta, count))

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    swipeRef.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current
    swipeRef.current = null
    if (start === null || count < 2) return
    const dx = event.clientX - start
    if (Math.abs(dx) < SWIPE_PX) return
    go(dx < 0 ? 1 : -1)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  const onBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false)
    }
  }

  const position = ui.screenshotPosition(index + 1, count)

  return (
    <section
      ref={rootRef}
      data-carousel={projectId}
      aria-roledescription="carousel"
      aria-label={ui.projectGallery(projectName)}
      className="relative isolate aspect-[16/10] overflow-hidden bg-surface-2"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={onBlurCapture}
    >
      <div
        className="flex h-full touch-pan-y transition-transform duration-500"
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeRef.current = null
        }}
      >
        {screenshots.map((shot, slide) => {
          const nearby =
            slide === index || slide === wrapIndex(index, -1, count) || slide === wrapIndex(index, 1, count)

          return (
            <div key={shot.file} className="h-full w-full shrink-0" aria-hidden={slide !== index}>
              {nearby ? (
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${BASE}img/projects/${projectId}/${shot.file}.webp`}
                  />
                  <img
                    src={`${BASE}img/projects/${projectId}/${shot.file}.jpg`}
                    alt={slide === index ? `${projectName} — ${shot.alt}` : ''}
                    width={800}
                    height={500}
                    loading={slide === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover object-top"
                  />
                </picture>
              ) : null}
            </div>
          )
        })}
      </div>

      {count > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />

          <CarouselButton
            dir="left"
            label={ui.previousScreenshot}
            onClick={() => go(-1)}
            onKeyDown={onKeyDown}
          />
          <CarouselButton
            dir="right"
            label={ui.nextScreenshot}
            onClick={() => go(1)}
            onKeyDown={onKeyDown}
          />

          <div className="absolute inset-x-0 bottom-2 flex items-center justify-between gap-3 px-3">
            <p
              data-carousel-position
              className="rounded-full bg-black/80 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white"
            >
              {position}
            </p>
            <ol aria-hidden="true" className="flex flex-wrap items-center justify-end gap-1.5">
              {screenshots.map((shot, slide) => (
                <li key={shot.file}>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={shot.alt}
                    onClick={() => setIndex(slide)}
                    className={`block size-1.5 rounded-full transition-colors ${
                      slide === index ? 'bg-ember' : 'bg-white/70'
                    }`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </>
      ) : null}
    </section>
  )
}

function CarouselButton({
  dir,
  label,
  onClick,
  onKeyDown,
}: {
  readonly dir: 'left' | 'right'
  readonly label: string
  readonly onClick: () => void
  readonly onKeyDown: (event: KeyboardEvent) => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-sm transition-colors hover:border-ember hover:text-ember ${
        dir === 'left' ? 'left-2' : 'right-2'
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true" fill="none">
        <path
          d={dir === 'left' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
