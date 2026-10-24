import {test} from 'node:test';import assert from 'node:assert/strict';import {projects,selectProject,adjacentRoom,cameraFor,roomFromURL,stationTilt,portalIndexForKey,shouldEnhanceScene} from '../src/model.js';
test('rooms resolve to distinct public project links',()=>{assert.equal(new Set(projects.map(p=>p.id)).size,3);for(const p of projects){assert.equal(selectProject(p.id),p);assert.ok(p.url.startsWith('https://github.com/manojPragada/'));}});
test('unknown rooms do not resolve',()=>assert.equal(selectProject('unknown'),null));


test('room navigation wraps in both directions',()=>{assert.equal(adjacentRoom('pufferfish',-1),'queue');assert.equal(adjacentRoom('queue',1),'pufferfish');assert.equal(adjacentRoom('unknown',1),null);assert.equal(adjacentRoom('queue',0),null);});
test('camera resets for overview and varies per room',()=>{assert.deepEqual(cameraFor(null),{x:0,yaw:0,scale:1});assert.ok(cameraFor('pufferfish').x>0);assert.ok(cameraFor('queue').x<0);assert.equal(cameraFor('recorder').yaw,0);});
test('deep links accept only known room identifiers',()=>{assert.equal(roomFromURL('https://example.com/?room=queue'),'queue');assert.equal(roomFromURL('/?room=unknown'),null);assert.equal(roomFromURL('/?room=%3Cscript%3E'),null);assert.equal(roomFromURL('/'),null);});
test('station pointer tilt is centered, bounded and rejects invalid geometry',()=>{assert.deepEqual(stationTilt(50,50,100,100),{x:0,y:0});assert.deepEqual(stationTilt(1000,-100,100,100),{x:2.5,y:2.5});assert.deepEqual(stationTilt(1,1,0,100),{x:0,y:0});});
test('spatial portal keyboard navigation wraps and supports boundaries',()=>{assert.equal(portalIndexForKey(0,'ArrowLeft',3),2);assert.equal(portalIndexForKey(2,'ArrowRight',3),0);assert.equal(portalIndexForKey(1,'Home',3),0);assert.equal(portalIndexForKey(1,'End',3),2);assert.equal(portalIndexForKey(1,'Enter',3),null);});
test('WebGL enhancement respects motion, viewport and memory budgets',()=>{assert.equal(shouldEnhanceScene({width:1200,webgl:true}),true);assert.equal(shouldEnhanceScene({width:390,webgl:true}),false);assert.equal(shouldEnhanceScene({width:1200,webgl:true,reducedMotion:true}),false);assert.equal(shouldEnhanceScene({width:1200,webgl:true,deviceMemory:2}),false);});


