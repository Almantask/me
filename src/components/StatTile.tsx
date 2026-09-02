import type { Stat } from '../content/types'
import { useCounter } from '../motion/useCounter'

interface Props {
  readonly stat: Stat
}

export function StatTile({ stat }: Props) {
  const ref = useCounter<HTMLSpanElement>(stat.value)

  return (
    <li className="card p-6">
      <p className="text-4xl font-semibold tracking-tight text-ember md:text-5xl">
        {stat.prefix}
        {/*
          The animated span is hidden from assistive tech: mid-count values are noise.
          The parent paragraph carries the real number via aria-label.
        */}
        <span ref={ref} aria-hidden="true">
          {stat.value}
        </span>
        {stat.suffix}
        <span className="sr-only">
          {stat.prefix}
          {stat.value}
          {stat.suffix}
        </span>
      </p>
      <p className="mt-2 text-sm text-muted">{stat.label}</p>
    </li>
  )
}
