import test from 'node:test';
import assert from 'node:assert/strict';
import {parseTasks, createTask} from '../src/taskStorage.ts';
test('corrupt and hostile saved records do not become renderable tasks', () => {
  assert.deepEqual(parseTasks('{bad'), []);
  assert.deepEqual(parseTasks('[null,{},4,{"id":1,"text":{}},{"id":2,"text":"safe","done":true},{"id":2,"text":"duplicate"}]'), [{id:2,text:'safe',done:true}]);
  assert.deepEqual(parseTasks('{"length":3}'), []);
});
test('rapid additions and the safe-integer boundary keep unique stable ids', () => {
  const first=createTask([],100),second=createTask([first],100);
  assert.notEqual(first.id,second.id);
  assert.equal(createTask([{id:Number.MAX_SAFE_INTEGER,text:'edge',done:false}],Number.MAX_SAFE_INTEGER).id,0);
  assert.equal(Number.isSafeInteger(createTask([],NaN).id),true);
});
