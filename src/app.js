import {selectProject} from './model.js';
const motion=document.querySelector('#motion');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
function applyMotion(){document.body.classList.toggle('paused',paused);motion.textContent=paused?'Resume ambience':'Pause ambience';motion.setAttribute('aria-pressed',String(paused));}
applyMotion();motion.addEventListener('click',()=>{paused=!paused;applyMotion();});
for(const portal of document.querySelectorAll('[data-room]'))portal.addEventListener('click',event=>{
 const project=selectProject(portal.dataset.room);if(!project)return;event.preventDefault();
 for(const p of document.querySelectorAll('[data-room]'))p.classList.toggle('selected',p===portal);
 document.querySelector('#scene').style.transform=reduced.matches?'none':`translateX(${project.room==='01'?4:project.room==='03'?-4:0}%) scale(1.04)`;
 document.querySelector('#room-type').textContent=`ROOM ${project.room} / ${project.type}`;
 document.querySelector('#room-title').textContent=project.title;document.querySelector('#room-description').textContent=project.description;
 const link=document.querySelector('#room-link');link.href=project.url;link.textContent='Open project repository ↗';
 const room=document.querySelector('#room');room.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});room.focus({preventScroll:true});
});
