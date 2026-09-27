const test = require('node:test');
const assert = require('node:assert/strict');
const search = require('../assets/search.js');

test('body-only and code matches link to the exact h2/h3 section, including duplicate titles', () => {
  const entries = search.prepare(search.sections({path:'content/test.md',title:'Overview',group:'Git'}, [
    {text:'Document introduction'},
    {level:2,text:'Recovery'}, {text:'git restore --staged file.txt'},
    {level:3,text:'Recovery'}, {text:'잃어버린 작업은 reflog에서 확인한다.'},
    {level:4,text:'Details'}, {text:'No extra anchor is assigned here.'},
  ]));
  assert.equal(search.find(entries,'RESTORE --STAGED')[0].href,'#content/test.md::section-0');
  assert.equal(search.find(entries,'reflog')[0].href,'#content/test.md::section-1');
  assert.equal(search.find(entries,'Details')[0].href,'#content/test.md::section-1');
  assert.equal(search.find(entries,'Overview')[0].href,'#content/test.md');
  assert.equal(search.find(entries,'introduction')[0].href,'#content/test.md');
  assert.equal(search.find(entries,'missing').length,0);
});

test('all matches are returned without a display limit and title matches rank first', () => {
  const entries = search.prepare(Array.from({length:150},(_,i)=>({title:'Document '+i,text:'contains Needle in body',href:'#'+i})));
  entries.push(...search.prepare([{title:'Needle reference',text:'Reference',href:'#title'}]));
  const results=search.find(entries,'needle');
  assert.equal(results.length,151);
  assert.equal(results[0].href,'#title');
  assert.equal(new Set(results.map(x=>x.href)).size,151);
  assert.equal(search.find(entries,'   ').length,0);
});

test('Unicode, whitespace and literal punctuation are searchable; snippets show the match', () => {
  const entries=search.prepare([{title:'사용법',text:'앞부분 '.repeat(50)+'ＷＯＲＫＴＲＥＥ\n  C++ & <tag> 한글 검색',href:'#doc'}]);
  assert.equal(search.find(entries,'worktree c++').length,1);
  assert.equal(search.find(entries,'<tag>')[0].snippet.includes('<tag>'),true);
  assert.equal(search.find(entries,'한글  검색').length,1);
});
