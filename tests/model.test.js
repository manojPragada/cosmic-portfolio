import {test} from 'node:test';import assert from 'node:assert/strict';import {projects,selectProject} from '../src/model.js';
test('rooms resolve to distinct public project links',()=>{assert.equal(new Set(projects.map(p=>p.id)).size,3);for(const p of projects){assert.equal(selectProject(p.id),p);assert.ok(p.url.startsWith('https://github.com/manojPragada/'));}});
test('unknown rooms do not resolve',()=>assert.equal(selectProject('unknown'),null));
