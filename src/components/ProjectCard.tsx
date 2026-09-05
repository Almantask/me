import type { Project } from '../content/types'
import { useUi } from '../i18n/useContent'
import { useMagnetic } from '../motion/useMagnetic'
import { TagList } from './Tag'

interface Props {
  readonly project: Project
}

export function ProjectCard({ project }: Props) {
  const ui = useUi()
  // On the anchor, not the <li>. The <li> is the reveal target, and the reveal tween
  // animates `y` on it — the magnetic pull was writing the same property from a
  // second interpolator, so hovering a card mid-entrance made the two fight.
  const ref = useMagnetic<HTMLAnchorElement>(0.08)

  return (
    <li data-reveal className="group @container">
      <a
        ref={ref}
        href={project.href}
        target="_blank"
        rel="noreferrer noopener"
        className="card relative flex h-full flex-col overflow-hidden p-6 transition-colors hover:border-ember"
      >
        {/* Ember sweep on hover. Decorative, so it never reaches the a11y tree. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px -translate-x-full bg-gradient-to-r from-transparent via-ember to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />

        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold @sm:text-xl">{project.name}</h3>
          {project.badge ? (
            <span className="shrink-0 rounded-full bg-ember-quiet px-2.5 py-1 text-xs font-medium text-ember">
              {project.badge}
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-sm text-muted">{project.years}</p>
        <p className="mt-4 flex-1 text-muted">{project.blurb}</p>

        <TagList items={project.tech} label={ui.techLabel(project.name)} />

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ember">
          {ui.openProject}
          <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true" fill="none">
            <path
              d="M4 12 12 4M6 4h6v6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </li>
  )
}
