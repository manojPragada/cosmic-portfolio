import { lazy, Suspense, useState } from 'react'
import { ProjectDeck } from './components/ProjectDeck'
import { SceneFallback } from './components/SceneFallback'
import { projects } from './data/projects'
import { useReducedMotion } from './hooks/useReducedMotion'

const StationScene = lazy(() => import('./components/StationScene'))

export default function App() {
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [sceneEnabled, setSceneEnabled] = useState(true)

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
            {sceneEnabled ? <Suspense fallback={<SceneFallback />}><StationScene activeIndex={activeIndex} reducedMotion={reducedMotion} onSelect={setActiveIndex} /></Suspense> : <SceneFallback />}
          </div>
          <div className="hero-copy">
            <p className="kicker"><span /> PORTFOLIO TRANSMISSION · TORONTO</p>
            <h1>Building systems<br />for the <em>next orbit.</em></h1>
            <p className="intro">Sai Manoj Pragada explores dependable developer tools through tactile interfaces, local-first workflows and cinematic web experiences.</p>
            <div className="hero-actions">
              <a href="#projects">Enter project deck</a>
              <span>{reducedMotion ? 'Reduced motion respected' : 'Scene telemetry online'}</span>
            </div>
          </div>
          <div className="telemetry" aria-hidden="true"><span>STATION / 01</span><span>RENDER / ADAPTIVE</span><span>LINK / PUBLIC</span></div>
        </section>

        <ProjectDeck projects={projects} activeIndex={activeIndex} onSelect={setActiveIndex} />

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
      <footer><span>SAI MANOJ PRAGADA</span><span>PUBLIC REPOSITORIES · 2026</span></footer>
    </div>
  )
}
