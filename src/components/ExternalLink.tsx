import type { ReactNode } from 'react'

interface Props {
  readonly href: string
  readonly children: ReactNode
  readonly className?: string
  /** Screen-reader-only context when the visible text alone is ambiguous out of order. */
  readonly describedAs?: string
}

export function ExternalLink({ href, children, className = '', describedAs }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      // Underlined at rest, not just on hover: a link identifiable only by hovering
      // is not identifiable at all on touch or by keyboard.
      className={`underline decoration-muted/40 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember ${className}`}
    >
      {children}
      {describedAs ? <span className="sr-only"> — {describedAs}</span> : null}
    </a>
  )
}
