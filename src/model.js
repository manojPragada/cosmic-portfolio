export const projects=[
{id:'pufferfish',room:'01',title:'PufferFish',type:'API SYSTEMS',description:'JSON API fixtures, offline replay, credential redaction and structural response diffs.',url:'https://github.com/manojPragada/pufferFish',color:'#77f4d2'},
{id:'recorder',room:'02',title:'Flight Recorder',type:'AGENT OBSERVABILITY',description:'Portable agent traces with validation, tool usage, failure and token summaries.',url:'https://github.com/manojPragada/agent-flight-recorder',color:'#bca1ff'},
{id:'queue',room:'03',title:'Queue Lab',type:'BACKGROUND JOBS',description:'A local SQLite queue demonstrating idempotency, retries and dead-letter states.',url:'https://github.com/manojPragada/queue-lab',color:'#ffb77e'}];
export function selectProject(id){return projects.find(project=>project.id===id)??null;}
