interface Props {
  readonly children: string
}

export function Tag({ children }: Props) {
  return (
    <li className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
      {children}
    </li>
  )
}

interface ListProps {
  readonly items: readonly string[]
  readonly label: string
}

export function TagList({ items, label }: ListProps) {
  if (items.length === 0) return null

  return (
    <ul aria-label={label} className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  )
}
