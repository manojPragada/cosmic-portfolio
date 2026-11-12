import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ProjectDeck } from './components/ProjectDeck'
import { ProjectRoom } from './components/ProjectRoom'
import { SceneFallback } from './components/SceneFallback'
import { projects } from './data/projects'
import { useReducedMotion } from './hooks/useReducedMotion'
import { projectIdFromHash, roomHash } from './navigation/roomRoute'
import type { SceneQuality } from './performance/sceneQuality'

const StationScene = lazy(() => import('./components/StationScene'))

export default function App() {
  const reducedMotion = useReducedMotion()
  const initialRoomId = typeof window === 'undefined' ? null : projectIdFromHash(window.location.hash, projects.map(({ id }) => id))
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, projects.findIndex(({ id }) => id === initialRoomId)))
  const [roomId, setRoomId] = useState<string | null>(initialRoomId)
  const [sceneEnabled, setSceneEnabled] = useState(true)
  const [sceneStatus, setSceneStatus] = useState<'loading' | 'unavailable' | SceneQuality>('loading')
  const enterRoomRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const syncRoute = () => {
      const nextRoomId = projectIdFromHash(window.location.hash, projects.map(({ id }) => id))
      setRoomId(nextRoomId)
      if (nextRoomId) setActiveIndex(projects.findIndex(({ id }) => id === nextRoomId))
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const openRoom = () => {
    const nextRoomId = projects[activeIndex].id
    window.history.pushState(null, '', roomHash(nextRoomId))
    setRoomId(nextRoomId)
  }

  const closeRoom = () => {
    window.history.replaceState(null, '', '#projects')
    setRoomId(null)
    window.requestAnimationFrame(() => enterRoomRef.current?.focus())
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to portfolio</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sai Manoj portfolio home"><i>SM</i><span>ORBITAL<br />SYSTEMS</span></a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#principles">Approach</a>
          <a href="https://github.com/manojPragada" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <button className="scene-toggle" type="button" onClick={() => setSceneEnabled((enabled) => !enabled)} aria-pressed={!sceneEnabled}>
          {sceneEnabled ? 'Use static view' : 'Enable 3D view'}
        </button>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="scene" aria-hidden="true">
            {sceneEnabled ? <Suspense fallback={<SceneFallback />}><StationScene activeIndex={activeIndex} reducedMotion={reducedMotion} roomOpen={Boolean(roomId)} onSelect={setActiveIndex} onQualityChange={setSceneStatus} onFailure={() => setSceneStatus('unavailable')} /></Suspense> : <SceneFallback />}
          </div>
          <div className="hero-copy">
            <p className="kicker"><span /> PORTFOLIO TRANSMISSION · TORONTO</p>
            <h1>Building systems<br />for the <em>next orbit.</em></h1>
            <p className="intro">Sai Manoj Pragada explores dependable developer tools through tactile interfaces, local-first workflows and cinematic web experiences.</p>
            <div className="hero-actions">
              <a href="#projects">Enter project deck</a>
              <span role="status" aria-live="polite">{!sceneEnabled ? 'Static view active' : sceneStatus === 'unavailable' ? '3D unavailable · static fallback' : reducedMotion ? 'Reduced motion respected' : sceneStatus === 'loading' ? 'Initializing local scene' : `3D ready · ${sceneStatus} density`}</span>
            </div>
          </div>
          <div className="telemetry" aria-hidden="true"><span>STATION / 01</span><span>RENDER / ADAPTIVE</span><span>LINK / PUBLIC</span></div>
        </section>

        <ProjectDeck projects={projects} activeIndex={activeIndex} onSelect={setActiveIndex} onEnterRoom={openRoom} enterRoomRef={enterRoomRef} />

        <section className="principles" id="principles" aria-labelledby="principles-title">
          <p className="section-label">OPERATING PRINCIPLES</p>
          <h2 id="principles-title">Software with an<br /><em>observable heartbeat.</em></h2>
          <div className="principle-grid">
            <article><span>01</span><h3>Local first</h3><p>Useful foundations run without hosted services, paid data or hidden infrastructure.</p></article>
            <article><span>02</span><h3>Inspectable</h3><p>States, failures and transitions stay visible instead of disappearing behind decoration.</p></article>
            <article><span>03</span><h3>Progressive</h3><p>The portfolio remains navigable with motion reduced, WebGL unavailable or the scene disabled.</p></article>
          </div>
        </section>
      </main>
      {roomId && <ProjectRoom project={projects.find(({ id }) => id === roomId)!} onClose={closeRoom} />}
      <footer><span>SAI MANOJ PRAGADA</span><span>PUBLIC REPOSITORIES · 2026</span></footer>
    </div>
  )
}
