import { selectProject, adjacentRoom, cameraFor, roomFromURL } from './model.js';
const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const portals = [...document.querySelectorAll('[data-room]')];
let paused = reduced.matches;
let active = null;
let lastPortal = null;
function applyMotion() {
  const stopped = paused || reduced.matches;
  document.body.classList.toggle('paused', stopped);
  $('#motion').textContent = reduced.matches ? 'Reduced motion enabled' : stopped ? 'Resume ambience' : 'Pause ambience';
  $('#motion').disabled = reduced.matches;
  $('#motion').setAttribute('aria-pressed', String(stopped));
  const camera = cameraFor(active);
  $('#scene').style.transform = stopped ? 'none' : `translateX(${camera.x}%) rotateY(${camera.yaw}deg) scale(${camera.scale})`;
}
function renderRoom(id, { focus = false, updateURL = false } = {}) {
  const project = selectProject(id);
  active = project?.id ?? null;
  for (const portal of portals) {
    const current = portal.dataset.room === active;
    portal.classList.toggle('selected', current);
    if (current) portal.setAttribute('aria-current', 'page'); else portal.removeAttribute('aria-current');
  }
  $('#station').classList.toggle('in-room', Boolean(project));
  document.documentElement.style.setProperty('--room-color', project?.color ?? '#77f4d2');
  $('#room-type').textContent = project ? `ROOM ${project.room} / ${project.type}` : 'WELCOME ABOARD';
  $('#room-title').textContent = project?.title ?? 'Choose your next destination.';
  $('#room-description').textContent = project?.description ?? 'Every room opens a real project. Keyboard navigation and direct repository links are always available.';
  $('#room-link').href = project?.url ?? 'https://github.com/manojPragada';
  $('#room-link').textContent = project ? 'Open project repository ↗' : 'Explore GitHub ↗';
  $('#room-controls').hidden = !project;
  $('#navigation-status').textContent = project ? `${project.title} room selected.` : 'Station overview.';
  applyMotion();
  if (updateURL) {
    const url = new URL(location.href);
    if (active) url.searchParams.set('room', active); else url.searchParams.delete('room');
    history.pushState(null, '', url);
  }
  if (focus && project) {
    $('#room').scrollIntoView({ behavior: paused || reduced.matches ? 'instant' : 'smooth', block: 'nearest' });
    $('#room').focus({ preventScroll: true });
  } else if (focus) {
    (lastPortal ?? portals[0]).focus();
  }
}
for (const portal of portals) portal.addEventListener('click', event => {
  if (!selectProject(portal.dataset.room) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); lastPortal = portal;
  renderRoom(portal.dataset.room, { focus: true, updateURL: true });
});
$('#previous-room').addEventListener('click', () => renderRoom(adjacentRoom(active, -1), { focus: true, updateURL: true }));
$('#next-room').addEventListener('click', () => renderRoom(adjacentRoom(active, 1), { focus: true, updateURL: true }));
function exitRoom() { if (active) renderRoom(null, { focus: true, updateURL: true }); }
$('#exit-room').addEventListener('click', exitRoom);
document.addEventListener('keydown', event => { if (event.key === 'Escape') exitRoom(); });
$('#motion').addEventListener('click', () => { paused = !paused; applyMotion(); });
reduced.addEventListener('change', applyMotion);
window.addEventListener('popstate', () => renderRoom(roomFromURL(location.href)));
renderRoom(roomFromURL(location.href));
