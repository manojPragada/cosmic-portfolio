# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [x] Add CSS room geometry, per-room camera poses and station return controls
- [x] Evaluate WebGL progressive enhancement and ship a dependency-free, budget-gated starfield with CSS fallback
- [x] Add a clearly fictional motorcycle company showcase under examples/
- [x] Add a clearly fictional architecture studio showcase under examples/
- [x] Complete the fictional design-lab trio with a creative-studio showcase

## Continuity

2026-10-25: Added KINETIC, a standalone fictional creative-studio study with original CSS poster art, maximalist responsive layout and explicit non-client/non-project labeling. The three-showcase design lab is complete. Next: link it from the portfolio surface, then deepen room transitions without weakening reduced-motion fallbacks.

2026-10-24: Added ATELIER 27, a standalone fictional architecture-studio study with original CSS geometry, responsive editorial layout and explicit non-client/non-project labeling. Next: complete the design-lab trio with a distinctly different creative-studio showcase.

2026-10-23: Added VOLTAGE, a standalone fictional electric-motorcycle landing-page study under `examples/voltage/`, using original CSS artwork, responsive layout and explicit non-product disclaimers. Next: add architecture and creative-studio showcases only if each can maintain this separation and accessibility baseline.

2026-10-22: Added a strictly decorative raw-WebGL depth starfield only on wide, capable, non-reduced-motion devices. CSS stars remain the universal fallback; low-memory/mobile/reduced-motion users never create a GL context. This avoids a Three.js payload for one lightweight effect. Next: fictional motorcycle showcase under `examples/`.

2026-10-21: Added spatial Left/Right/Home/End portal navigation with live announcements plus a holographic connection beam tying the three rooms together. Keyboard behavior is model- and browser-tested without changing ordinary link semantics. Next: prototype a strictly optional WebGL enhancement behind capability and performance checks.

2026-10-21: Added bounded fine-pointer station parallax and a cursor-following cinematic light as progressive enhancement. Touch, reduced-motion and paused states remain static; semantic links/navigation are unchanged. Model and real-browser coverage updated. Next: evaluate WebGL only if its fallback and mobile budget match this foundation.

2026-10-20: Added repeatable Playwright regression checks and a public-repository-only CI workflow. Desktop, mobile and motion-enabled scenarios passed locally using Chromium 153; model tests and syntax checks passed. Screenshots generated locally for inspection. Earlier browser-unavailable notes below are historical. No deployment or live-provider validation performed. Next: expand browser coverage and review the existing PR before merging.

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 2 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Added room deep links, Back/Forward support, Previous/Next/Exit controls, focus return, Escape navigation, structural station rails/ring and live reduced-motion handling. Five model tests pass. Browser installation retry failed; visual/interaction QA remains pending. Continue this draft branch rather than starting another initial implementation.


