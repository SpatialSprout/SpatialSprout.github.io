import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildReadingOrder,
  filterSpeakable,
} from '../src/readingOrder';
import {
  blankToPrompt,
  normalizeOptions,
  numberToWords,
  stripUiGlyphs,
} from '../src/normalizer';
import { parseToUtterances, synthesize } from '../src/pipeline';
import { RawLayoutElement } from '../src/types';

const el = (
  id: string,
  role: RawLayoutElement['role'],
  bbox: [number, number, number, number],
  rawText: string,
  speak = true,
): RawLayoutElement => ({
  id,
  role,
  bbox: { x1: bbox[0], y1: bbox[1], x2: bbox[2], y2: bbox[3] },
  rawText,
  speak,
});

test('filterSpeakable drops skip and speak:false elements', () => {
  const els = [
    el('page', 'skip', [0, 0, 10, 10], 'Page 3', false),
    el('icon', 'skip', [10, 0, 20, 10], 'X', true),
    el('q', 'problem_statement', [0, 20, 100, 40], 'Count the apples', true),
  ];
  assert.deepEqual(
    filterSpeakable(els).map((e) => e.id),
    ['q'],
  );
});

test('reading order fixes the "A two" bug: number before content, blank last', () => {
  // Raw z-order would read "A" then "2." -> "A two". Our role priority inside
  // the block must hoist the question number before the problem statement,
  // even though the letter "A" sits to the LEFT of "2.".
  const els = [
    el('a', 'problem_statement', [40, 0, 90, 30], 'A', true),
    el('n', 'question_number', [0, 0, 40, 30], '2.', true),
    el('b', 'answer_blank', [0, 60, 200, 90], '___', true),
  ];
  assert.deepEqual(
    buildReadingOrder(els).map((e) => e.id),
    ['n', 'a', 'b'],
  );
});

test('numberToWords turns "2." into "Number two"', () => {
  assert.equal(numberToWords('2.'), 'Number two');
  assert.equal(numberToWords('12)'), 'Number twelve');
  assert.equal(numberToWords('42.'), 'Number 42'); // fallback beyond table
});

test('blankToPrompt replaces blanks and never reads "underscore"', () => {
  assert.equal(
    blankToPrompt('____', 'What goes in the blank?'),
    'What goes in the blank?',
  );
  assert.equal(
    blankToPrompt('Write [blank] here', 'What goes in the blank?'),
    'Write What goes in the blank? here',
  );
  // No blank present -> unchanged.
  assert.equal(blankToPrompt('Count the apples', 'x'), 'Count the apples');
});

test('stripUiGlyphs removes bullets and brackets but keeps words', () => {
  assert.equal(stripUiGlyphs('• Count [the] apples'), 'Count the apples');
  assert.equal(stripUiGlyphs('- Circle (the) answer'), 'Circle the answer');
});

test('normalizeOptions converts "A) two" into countable phrases', () => {
  assert.equal(
    normalizeOptions('A) two  B) three  C) four'),
    'A. two. B. three. C. four.',
  );
});

test('end-to-end SSML contains no literal blank or bare "2."', () => {
  const els = [
    el('n', 'question_number', [0, 0, 40, 30], '2.', true),
    el('a', 'problem_statement', [40, 0, 90, 30], 'A', true),
    el('b', 'answer_blank', [0, 60, 200, 90], '___', true),
  ];
  const ssml = synthesize(els, { target: 'ssml', includeIntro: false });

  assert.ok(ssml.includes('Number two'));
  assert.ok(ssml.includes('What goes in the blank?'));
  assert.ok(!ssml.includes('___'));
  assert.ok(!ssml.includes('>2.<'));
  assert.ok(ssml.includes('<break time='));
  assert.ok(ssml.includes('<prosody'));
});

test('token renderer emits delivery cues, not literal UI text', () => {
  const els = [el('b', 'answer_blank', [0, 0, 40, 30], '____', true)];
  const tokens = synthesize(els, { target: 'tokens', includeIntro: false });
  assert.ok(tokens.includes('[QUESTION:RISING]'));
  assert.ok(tokens.includes('What goes in the blank?'));
  assert.ok(tokens.includes('[BREAK:700ms]'));
});

test('includePraise=false filters praise banners', () => {
  const els = [
    el('p', 'praise_banner', [0, 0, 40, 30], 'Good job!', true),
  ];
  const ssml = synthesize(els, { target: 'ssml', includeIntro: false, includePraise: false });
  assert.ok(!ssml.includes('Good job!'));
});
