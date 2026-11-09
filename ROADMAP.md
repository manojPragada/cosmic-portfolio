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

2026-11-08: Added a tested `full`/`lite`/`still` scene tier. Narrow, low-memory and data-saver devices now retain the complete station with static, lower-density CSS ambience and never create the optional WebGL starfield. Next: profile these tiers on a representative low-power mobile browser when browser tooling is available.

2026-11-07: Added a CSS-only orbital aurora and luminous horizon behind the station, with static paused/reduced-motion states and a lower-opacity mobile treatment. Next: profile the layered scene and optional WebGL starfield on a real low-power mobile browser.

2026-11-06: Added three restrained, color-matched floor caustics beneath the holographic portals, with static paused/reduced-motion treatment and a softer mobile treatment. Next: profile the progressive WebGL starfield and corridor transitions on a representative low-power mobile device.

2026-11-05: Added three color-matched ceiling light shafts behind the portal deck, giving the station a shared volumetric room without new markup, assets or hit areas. The ambience becomes static when paused or reduced motion is requested. Next: browser-tune shaft contrast and stacking when Chromium is available.

2026-11-04: Added opposing inset edge lights to focused, hovered and selected portal glass, deepening the translucent 3D material without extra DOM, assets or motion. Paused and reduced-motion behavior remains intact. Next: browser-tune portal contrast and stacking when Chromium is available.

2026-11-03: Added contained projected scanlines to focused, hovered and selected portal glass, strengthening the holographic material without extra DOM, assets or payload. Paused and reduced-motion states remain static. Next: browser-tune portal contrast and stacking when Chromium is available.

2026-11-02: Added per-portal holographic light volumes and landing rings to deepen the station's focal planes without new assets or hit areas. Motion is contained to focused/selected portals and becomes static when paused or reduced motion is requested. Next: browser-tune glow contrast and stacking when Chromium is available.

2026-11-01: Layered two segmented energy sweeps and an inset glow into the portal scanner halo, strengthening the holographic read without adding DOM, dependencies or hit-area changes. Paused and reduced-motion fallbacks remain static. Next: browser-tune scanner contrast when Chromium is available.

2026-10-31: Added a contained scanner halo to hovered, focused and selected project portals. It is decorative, preserves the link hit area, scales on mobile and becomes static when ambience is paused or motion is reduced. Next: browser-tune halo and corridor contrast when Chromium is available.

2026-10-30: Added three nested, direction-aware corridor frames behind the existing light sweep for a stronger room-travel illusion. They remain decorative, interruptible, mobile-scaled and fully absent when motion is paused or reduced. Next: browser-tune frame depth and contrast when Chromium is available.

2026-10-29: Added interruptible `aria-busy` transition state and accurate motion/no-motion announcements so reduced-motion navigation never claims an animation occurred. Next: visually tune corridor depth when browser QA is available.

2026-10-28: Added a short, interruptible direction-aware corridor-light reveal for room travel. Paused and reduced-motion states receive the same navigation and status update with no reveal. Next: visually tune the effect when browser QA is available.

2026-10-27: Added deterministic camera-transition direction state for overview entry and room-to-room travel, exposed to the scene and assistive status without changing reduced-motion behavior. Next: use this state for a short, interruptible corridor reveal after browser QA is available.

2026-10-26: Moved KINETIC into semantic markup so the complete fictional design lab remains discoverable without JavaScript. Next: deepen room transitions without weakening no-script and reduced-motion paths.

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


