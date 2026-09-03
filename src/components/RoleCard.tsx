import type { Role } from '../content/types'
import { useLanguage } from '../i18n/useContent'
import { formatRange } from '../lib/dates'
import { TagList } from './Tag'

interface Props {
  readonly role: Role
}

export function RoleCard({ role }: Props) {
  const { language, content } = useLanguage()

  return (
    <article data-role className="relative pl-10 md:pl-14">
      <span
        data-node
        aria-hidden="true"
        className="absolute left-[11px] top-2.5 size-3 rounded-full border-2 border-bg bg-ember md:left-[19px]"
      />

      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold md:text-2xl">{role.role}</h3>
        <p className="text-ember">{role.org}</p>
      </header>

      <p className="mt-1 text-sm text-muted">
        {formatRange(role.start, role.end, language, content.ui.present)}
      </p>
      <p className="mt-4 max-w-2xl text-muted">{role.summary}</p>

      {role.highlights.length > 0 ? (
        <ul className="mt-4 max-w-2xl space-y-2">
          {role.highlights.map((highlight) => (
            <li key={highlight.slice(0, 28)} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-ember" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <TagList items={role.tech} label={content.ui.techLabel(role.org)} />
    </article>
  )
}
