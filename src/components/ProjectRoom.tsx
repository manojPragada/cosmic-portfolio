import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'

type Props = { project: Project; onClose: () => void }

export function ProjectRoom({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog ref={dialogRef} className="project-room" aria-labelledby="room-title" onCancel={(event) => { event.preventDefault(); onClose() }}>
      <button className="room-close" type="button" onClick={onClose} aria-label="Close project room">Close ×</button>
      <div className="room-orbit" aria-hidden="true"><i /><i /><span style={{ background: project.accent }} /></div>
      <div className="room-copy">
        <p style={{ color: project.accent }}>PROJECT ROOM / {project.eyebrow}</p>
        <h2 id="room-title">Inside<br />{project.name}</h2>
        <p>{project.summary}</p>
        <dl>
          <div><dt>Source</dt><dd>Public repository</dd></div>
          <div><dt>Signals</dt><dd>{project.stack.join(' · ')}</dd></div>
          <div><dt>Mode</dt><dd>Verified project summary</dd></div>
        </dl>
        <a className="repo-link" href={project.href} target="_blank" rel="noreferrer">Inspect repository <span aria-hidden="true">↗</span></a>
      </div>
    </dialog>
  )
}
