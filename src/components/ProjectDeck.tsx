import type { Project } from '../data/projects'

type Props = {
  projects: readonly Project[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function ProjectDeck({ projects, activeIndex, onSelect }: Props) {
  const active = projects[activeIndex]
  return (
    <section className="project-console" id="projects" aria-labelledby="projects-title">
      <div className="console-heading">
        <p>DOCK 02 / PUBLIC SYSTEMS</p>
        <span>{String(activeIndex + 1).padStart(2, '0')} — {String(projects.length).padStart(2, '0')}</span>
      </div>
      <div className="project-copy" aria-live="polite">
        <p className="project-eyebrow" style={{ color: active.accent }}>{active.eyebrow}</p>
        <h2 id="projects-title">{active.name}</h2>
        <p>{active.summary}</p>
        <ul className="tech-list" aria-label="Project technologies">
          {active.stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a className="repo-link" href={active.href} target="_blank" rel="noreferrer">Open public repository <span aria-hidden="true">↗</span></a>
      </div>
      <div className="deck-tabs" role="tablist" aria-label="Select a project">
        {projects.map((project, index) => (
          <button key={project.id} type="button" role="tab" aria-selected={index === activeIndex} aria-controls="projects-title" onClick={() => onSelect(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{project.name}
          </button>
        ))}
      </div>
    </section>
  )
}
