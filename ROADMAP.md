# Roadmap

## Completed

- [x] Working static prototype and separated model/UI files
- [x] Behavioral tests and verified setup commands
- [x] Responsive styles, visible focus and reduced-motion support

## Next

- [x] Add CSS room geometry, per-room camera poses and station return controls
- [ ] Evaluate Three.js progressive enhancement with a non-WebGL fallback
- [ ] Add a clearly fictional motorcycle company showcase under examples/

## Continuity

Initial prototype created 2026-10-17. Re-read repository contents and latest commits before continuing. No hosted deployment. No live data integrations.

## Verification

- 2 model tests passed with Node.js 24.
- JavaScript syntax checks passed.
- Local HTTP document/module/style serving and HTML anchor/ID integrity checked.
- Browser rendering and interaction QA **not completed**: no installed Chromium; browser download failed. No screenshot is claimed.
- Implementation is proposed on `feat/initial-experience` for review; inspect open PRs before starting the next change. Prioritize desktop/mobile and keyboard browser review next.


2026-10-18: Added room deep links, Back/Forward support, Previous/Next/Exit controls, focus return, Escape navigation, structural station rails/ring and live reduced-motion handling. Five model tests pass. Browser installation retry failed; visual/interaction QA remains pending. Continue this draft branch rather than starting another initial implementation.
