import { useContent } from '../i18n/useContent'
import { useReveal } from '../motion/useReveal'
import { ProjectCard } from './ProjectCard'
import { Section } from './Section'

export function Projects() {
  const { projects, ui } = useContent()
  const scope = useReveal<HTMLUListElement>({ stagger: 0.07, y: 30 })

  return (
    <Section
      id="projects"
      eyebrow={ui.projectsEyebrow}
      title={ui.projectsTitle}
      lede={ui.projectsLede}
    >
      <ul ref={scope} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </Section>
  )
}
