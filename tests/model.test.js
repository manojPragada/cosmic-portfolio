import {test} from 'node:test';import assert from 'node:assert/strict';import {projects,selectProject,adjacentRoom,cameraFor,roomFromURL} from '../src/model.js';
test('rooms resolve to distinct public project links',()=>{assert.equal(new Set(projects.map(p=>p.id)).size,3);for(const p of projects){assert.equal(selectProject(p.id),p);assert.ok(p.url.startsWith('https://github.com/manojPragada/'));}});
test('unknown rooms do not resolve',()=>assert.equal(selectProject('unknown'),null));


test('room navigation wraps in both directions',()=>{assert.equal(adjacentRoom('pufferfish',-1),'queue');assert.equal(adjacentRoom('queue',1),'pufferfish');assert.equal(adjacentRoom('unknown',1),null);assert.equal(adjacentRoom('queue',0),null);});
test('camera resets for overview and varies per room',()=>{assert.deepEqual(cameraFor(null),{x:0,yaw:0,scale:1});assert.ok(cameraFor('pufferfish').x>0);assert.ok(cameraFor('queue').x<0);assert.equal(cameraFor('recorder').yaw,0);});
test('deep links accept only known room identifiers',()=>{assert.equal(roomFromURL('https://example.com/?room=queue'),'queue');assert.equal(roomFromURL('/?room=unknown'),null);assert.equal(roomFromURL('/?room=%3Cscript%3E'),null);assert.equal(roomFromURL('/'),null);});

