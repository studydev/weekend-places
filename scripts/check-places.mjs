// data/places.json 이 올바른 JSON 인지, 모든 장소에 region·name·indoor 가 있는지 검사한다.
import {readFileSync} from 'node:fs';
const data = JSON.parse(readFileSync('data/places.json', 'utf8'));
const problems = [];
for (const [i, p] of data.places.entries()) {
  for (const key of ['region', 'name', 'indoor']) {
    if (!(key in p)) problems.push(`${i + 1}번째 장소 '${p.name ?? '?'}' 에 ${key} 가 없어요`);
  }
}
if (problems.length) {
  console.error('장소 데이터 검사 실패:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log(`장소 데이터 검사 통과: ${data.places.length}곳`);
