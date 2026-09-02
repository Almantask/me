import { projects } from '../content/projects'
import { useReveal } from '../motion/useReveal'
import { ProjectCard } from './ProjectCard'
import { Section } from './Section'

export function Projects() {
  const scope = useReveal<HTMLUListElement>({ stagger: 0.07, y: 30 })

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I build when nobody asked me to."
      lede="Mostly born from a need at my own table — a campaign that wanted a soundtrack, a course that wanted exercises, a question that wanted an answer."
    >
      <ul ref={scope} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </Section>
  )
}
