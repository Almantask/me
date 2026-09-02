import type { ReactNode } from 'react'

interface Props {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly lede?: string
  readonly children: ReactNode
  readonly className?: string
}

/**
 * The one section frame used everywhere. Consistency in the frame is what lets the
 * motion inside it read as intentional rather than chaotic.
 */
export function Section({ id, eyebrow, title, lede, children, className = '' }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 py-20 md:py-28 ${className}`}
    >
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {lede ? <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{lede}</p> : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
