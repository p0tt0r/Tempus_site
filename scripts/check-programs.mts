import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parsePrograms } from '../src/utils/programs.ts';

const fixture = readFileSync(new URL('./fixtures/obrazovanie.md', import.meta.url), 'utf8');

const one = parsePrograms(fixture);
assert.equal(one.length, 1);
assert.equal(one[0].title, 'Практическая психология и психокоррекция здоровья');
assert.equal(one[0].anchor, 'program-1');
assert.ok(one[0].summary.startsWith('Целью освоения программы «Практическая психология и психокоррекция здоровья» является формирование профессиональных компетенций'));
assert.ok(!one[0].summary.includes(':'));
assert.ok(!one[0].summary.includes('- '));
assert.ok(one[0].summary.length <= 221);
assert.deepEqual(one[0].facts, [
  { value: '540 часов', label: 'объём программы' },
  { value: '1 год', label: 'продолжительность' },
  { value: 'Очно-заочно', label: 'форма обучения' },
  { value: 'Диплом', label: 'о переподготовке' },
]);

const two = parsePrograms(fixture + '\n' + fixture.replace('Практическая психология и психокоррекция здоровья', 'Другая программа'));
assert.equal(two.length, 2);
assert.deepEqual(two.map((p) => p.anchor), ['program-1', 'program-2']);

assert.deepEqual(parsePrograms('Просто текст без заголовков'), []);
assert.deepEqual(parsePrograms(null), []);

const bare = parsePrograms('# Программа «Тест»\nБез фактов.');
assert.equal(bare.length, 1);
assert.deepEqual(bare[0].facts, []);
assert.equal(bare[0].summary, 'Без фактов.');

assert.equal(parsePrograms('# Программа «А», объёмом 72 часа')[0].facts[0].value, '72 часа');
assert.equal(parsePrograms('# Программа «А», объёмом 1 час')[0].facts[0].value, '1 час');

assert.equal(parsePrograms('# Программа повышения квалификации Охрана труда, объёмом 72 часа\nТекст.')[0].title, 'Охрана труда');
assert.equal(parsePrograms('#  Программа  профессиональной   переподготовки  охрана труда')[0].title, 'Охрана труда');
assert.equal(parsePrograms('# Программа Основы медиации')[0].title, 'Основы медиации');

const cert = parsePrograms('# Программа «Т»\nДля дипломированного специалиста. Выдаётся удостоверение о повышении квалификации.')[0].facts;
assert.deepEqual(cert, [{ value: 'Удостоверение', label: 'о повышении квалификации' }]);
assert.deepEqual(parsePrograms('# Программа «Т»\nУдостоверяющий документ.')[0].facts, []);

console.log('check-programs: OK');
console.log('summary:', one[0].summary);
