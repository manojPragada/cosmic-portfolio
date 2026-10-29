import { selectProject, adjacentRoom, cameraFor, roomFromURL, stationTilt, portalIndexForKey, shouldEnhanceScene, transitionPlan } from './model.js';
import { createStarfield } from './starfield.js';
const $ = selector => document.querySelector(selector);
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const portals = [...document.querySelectorAll('[data-room]')];
const station = $('#station');
let paused = reduced.matches;
let active = null;
let lastPortal = null;
let transitionTimer = null;
const canvas=document.createElement('canvas');canvas.id='webgl-stars';canvas.className='webgl-stars';canvas.setAttribute('aria-hidden','true');station.prepend(canvas);
let starfield=null;
if(shouldEnhanceScene({reducedMotion:reduced.matches,width:innerWidth,deviceMemory:navigator.deviceMemory??null,webgl:Boolean(window.WebGLRenderingContext)})){
  try{starfield=createStarfield(canvas);canvas.hidden=!starfield;}catch{canvas.hidden=true;}
}else canvas.hidden=true;
function applyMotion() {
  const stopped = paused || reduced.matches;
  document.body.classList.toggle('paused', stopped);
  $('#motion').textContent = reduced.matches ? 'Reduced motion enabled' : stopped ? 'Resume ambience' : 'Pause ambience';
  $('#motion').disabled = reduced.matches;
  $('#motion').setAttribute('aria-pressed', String(stopped));
  const camera = cameraFor(active);
  $('#scene').style.transform = stopped ? 'none' : `translateX(${camera.x}%) rotateY(${camera.yaw}deg) scale(${camera.scale})`;
  if (stopped) { station.style.setProperty('--tilt-x','0deg'); station.style.setProperty('--tilt-y','0deg'); }
  starfield?.pause(stopped);
}
function renderRoom(id, { focus = false, updateURL = false } = {}) {
  const project = selectProject(id);
  const plan=transitionPlan(active,project?.id,{reducedMotion:reduced.matches,paused});const direction=plan.direction;
  clearTimeout(transitionTimer);station.classList.remove('traveling');station.dataset.transition=direction;
  if(plan.duration){station.classList.add('traveling');transitionTimer=setTimeout(()=>station.classList.remove('traveling'),plan.duration);}
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
  $('#navigation-status').textContent = project ? `${project.title} room selected via ${direction} camera transition.` : 'Station overview.';
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
for (const [index, portal] of portals.entries()) portal.addEventListener('keydown', event => {
  const next = portalIndexForKey(index, event.key, portals.length);
  if (next === null) return;
  event.preventDefault(); portals[next].focus();
  $('#navigation-status').textContent = `${portals[next].querySelector('strong').textContent} portal focused.`;
});
$('#previous-room').addEventListener('click', () => renderRoom(adjacentRoom(active, -1), { focus: true, updateURL: true }));
$('#next-room').addEventListener('click', () => renderRoom(adjacentRoom(active, 1), { focus: true, updateURL: true }));
function exitRoom() { if (active) renderRoom(null, { focus: true, updateURL: true }); }
$('#exit-room').addEventListener('click', exitRoom);
document.addEventListener('keydown', event => { if (event.key === 'Escape') exitRoom(); });
$('#motion').addEventListener('click', () => { paused = !paused; applyMotion(); });
station.addEventListener('pointermove', event => {
  if (paused || reduced.matches || event.pointerType === 'touch') return;
  const bounds = station.getBoundingClientRect();
  const tilt = stationTilt(event.clientX - bounds.left, event.clientY - bounds.top, bounds.width, bounds.height);
  station.style.setProperty('--tilt-x', tilt.x + 'deg');
  station.style.setProperty('--tilt-y', tilt.y + 'deg');
  station.style.setProperty('--light-x', ((event.clientX - bounds.left) / bounds.width * 100) + '%');
  station.style.setProperty('--light-y', ((event.clientY - bounds.top) / bounds.height * 100) + '%');
});
station.addEventListener('pointerleave', () => { station.style.setProperty('--tilt-x','0deg'); station.style.setProperty('--tilt-y','0deg'); });
reduced.addEventListener('change',()=>{if(reduced.matches&&starfield){starfield.destroy();starfield=null;canvas.hidden=true;}applyMotion();});
window.addEventListener('popstate', () => renderRoom(roomFromURL(location.href)));
renderRoom(roomFromURL(location.href));


