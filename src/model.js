export const projects=[
{id:'pufferfish',room:'01',title:'PufferFish',type:'API SYSTEMS',description:'JSON API fixtures, offline replay, credential redaction and structural response diffs.',url:'https://github.com/manojPragada/pufferFish',color:'#77f4d2'},
{id:'recorder',room:'02',title:'Flight Recorder',type:'AGENT OBSERVABILITY',description:'Portable agent traces with validation, tool usage, failure and token summaries.',url:'https://github.com/manojPragada/agent-flight-recorder',color:'#bca1ff'},
{id:'queue',room:'03',title:'Queue Lab',type:'BACKGROUND JOBS',description:'A local SQLite queue demonstrating idempotency, retries and dead-letter states.',url:'https://github.com/manojPragada/queue-lab',color:'#ffb77e'}];
export function selectProject(id){return projects.find(project=>project.id===id)??null;}


export function adjacentRoom(id, direction) {
  const index = projects.findIndex(project => project.id === id);
  if (index < 0 || ![-1, 1].includes(direction)) return null;
  return projects[(index + direction + projects.length) % projects.length].id;
}
export function cameraFor(id) {
  const index = projects.findIndex(project => project.id === id);
  if (index < 0) return { x: 0, yaw: 0, scale: 1 };
  return { x: [7, 0, -7][index], yaw: [-6, 0, 6][index], scale: 1.13 };
}
export function roomFromURL(value) {
  try { return selectProject(new URL(value, 'https://portfolio.invalid/').searchParams.get('room'))?.id ?? null; }
  catch { return null; }
}

export function stationTilt(clientX, clientY, width, height, maximum = 2.5) {
  if (![clientX, clientY, width, height, maximum].every(Number.isFinite) || width <= 0 || height <= 0 || maximum < 0) return {x:0,y:0};
  const clamp = value => value === 0 ? 0 : Math.max(-maximum, Math.min(maximum, value));
  return {x:clamp(((clientY / height) - .5) * -2 * maximum), y:clamp(((clientX / width) - .5) * 2 * maximum)};
}


