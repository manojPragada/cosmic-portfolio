# Cosmic Portfolio

An experimental developer portfolio for Sai Manoj Pragada, staged as an orbital systems station. The WebGL scene is progressive enhancement: the same verified public projects remain reachable through conventional semantic HTML navigation.

**Status:** working foundation. The station, project holograms, adaptive camera movement, project console and static fallback are implemented. Project rooms and fictional company showcases are not implemented yet. There is no hosted demo.

## Quick start

Prerequisites: Node.js 22+ and npm 11+.

```bash
git clone https://github.com/manojPragada/cosmic-portfolio.git
cd cosmic-portfolio
npm install
npm run dev
```

Open the local URL printed by Vite. No API keys or remote data services are used.

## Verified commands

```bash
npm run check
npm run build
```

`npm run check` runs strict TypeScript project compilation and the project-manifest unit test. `npm run build` produces the static `dist/` bundle. No linter is configured yet.

## Experience and accessibility

- Project selection works through native buttons whether or not WebGL is available.
- The “Use static view” control removes the live canvas without hiding content.
- `prefers-reduced-motion` stops ambient station movement and camera interpolation.
- Canvas density is capped at 1.5 device pixels and antialiasing is disabled to limit GPU cost.
- Skip navigation, visible focus styles, semantic sections and an `aria-live` project description support keyboard and assistive-technology use.
- Mobile layouts collapse to one column and keep project links above the visual controls.

## Configuration

No environment variables are required. `.env.example` records that contract. Public repository content lives in `src/data/projects.ts`; do not add biographies, clients, testimonials or achievements without a verifiable source.

## Structure

```text
src/
  components/       WebGL station and conventional project deck
  data/             verified public project manifest and tests
  hooks/            motion preference integration
  App.tsx            portfolio composition and navigation state
  styles.css         responsive visual system and fallbacks
ROADMAP.md           sequenced product work and continuity notes
```

## Architecture

React owns shared project selection state. `ProjectDeck` provides the primary accessible interface; the lazy-loaded `StationScene` mirrors that state into React Three Fiber for hologram emphasis and camera movement without placing Three.js in the initial application chunk. The scene is wrapped in an error boundary and Canvas fallback, and can be disabled by the visitor. No 3D model downloads or runtime network requests are required.

## Data and asset credits

Project names, links and capability summaries are derived from Sai Manoj Pragada's public GitHub repositories. All station geometry is generated in code with Three.js primitives. Typography currently loads Manrope and DM Mono from Google Fonts; system fonts remain the fallback. No stock imagery or generated media is included.

## Deployment

Run `npm run build` and serve `dist/` from any static host with SPA fallback to `index.html`. No external deployment is configured or claimed. Review the font-hosting choice before deploying into a privacy-restricted environment.

## Troubleshooting

- **Blank 3D area:** use “Use static view”; project navigation remains functional. Check WebGL/browser hardware acceleration separately.
- **Slow mobile rendering:** keep the static view enabled or use the browser/OS reduced-motion setting.
- **Install failure:** confirm Node.js 22+ and retry with a clean `npm install`; the committed lockfile pins the verified dependency graph.

## Contributing

Keep changes focused, update `ROADMAP.md`, run both verified commands and test keyboard/static/reduced-motion paths. Do not add unverified personal claims or private repository information.

No license has been selected; public visibility alone does not grant redistribution rights.
