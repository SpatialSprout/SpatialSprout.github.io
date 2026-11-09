import { parseToUtterances, synthesize, toDeliveryCards } from './pipeline';
import { RawLayoutElement } from './types';
import { parseVlmLayout } from './vlmPrompt';

/**
 * Runnable demo: `npm run demo`
 *
 * Shows the exact failing case ("2. / A / ___") being repaired, plus a fuller
 * exercise, rendered to both SSML and structural tokens.
 */

// The precise failure from the brief: raw z-order gives "A two. Fill it in."
const failingCase: RawLayoutElement[] = [
  {
    id: 'letter-a',
    role: 'problem_statement',
    bbox: { x1: 40, y1: 0, x2: 90, y2: 30 },
    rawText: 'A',
    speak: true,
    ipa: 'eɪ',
    phonemeTarget: 'A',
  },
  {
    id: 'num-2',
    role: 'question_number',
    bbox: { x1: 0, y1: 0, x2: 40, y2: 30 },
    rawText: '2.',
    speak: true,
  },
  {
    id: 'blank',
    role: 'answer_blank',
    bbox: { x1: 0, y1: 60, x2: 200, y2: 90 },
    rawText: '___',
    speak: true,
  },
];

// A fuller exercise with decorative elements that must be dropped.
const fullExample: RawLayoutElement[] = [
  { id: 'page', role: 'skip', bbox: { x1: 700, y1: 10, x2: 760, y2: 30 }, rawText: 'Page 3', speak: false },
  { id: 'icon', role: 'skip', bbox: { x1: 640, y1: 10, x2: 690, y2: 40 }, rawText: '\u{1F41D}', speak: false },
  { id: 'q2', role: 'question_number', bbox: { x1: 10, y1: 10, x2: 60, y2: 34 }, rawText: '2.', speak: true },
  {
    id: 'ps',
    role: 'problem_statement',
    bbox: { x1: 10, y1: 50, x2: 700, y2: 90 },
    rawText: 'Count the apples and write the number in the blank',
    speak: true,
    prosody: { emphasis: ['count', 'write'] },
  },
  {
    id: 'opt',
    role: 'option_list',
    bbox: { x1: 10, y1: 110, x2: 400, y2: 170 },
    rawText: 'A) two  B) three  C) four',
    speak: true,
  },
  { id: 'blank', role: 'answer_blank', bbox: { x1: 10, y1: 190, x2: 200, y2: 220 }, rawText: '____', speak: true },
  { id: 'praise', role: 'praise_banner', bbox: { x1: 10, y1: 240, x2: 200, y2: 270 }, rawText: 'Good job!', speak: true },
];

function printSection(title: string): void {
  console.log(`\n${'='.repeat(64)}`);
  console.log(`  ${title}`);
  console.log(`${'='.repeat(64)}`);
}

printSection('FIXED FAILING CASE (SSML)');
console.log(synthesize(failingCase, { target: 'ssml' }));

printSection('FULL EXERCISE (SSML)');
console.log(synthesize(fullExample, { target: 'ssml' }));

printSection('FULL EXERCISE (STRUCTURAL TOKENS)');
console.log(synthesize(fullExample, { target: 'tokens' }));

printSection('DELIVERY CARDS');
const cards = toDeliveryCards(parseToUtterances(fullExample));
console.log(JSON.stringify(cards, null, 2));

printSection('VLM RESPONSE PARSING');
const vlmResponse = {
  elements: [
    { id: 'q2', role: 'question_number', bbox: [10, 10, 60, 34], rawText: '2.', speak: true },
    { id: 'ps', role: 'problem_statement', bbox: [10, 50, 700, 90], rawText: 'Count the apples and write the number in the blank' },
    { id: 'blank', role: 'answer_blank', bbox: [10, 190, 200, 220], rawText: '____' },
  ],
};
const parsed = parseVlmLayout(vlmResponse);
console.log(JSON.stringify(parsed, null, 2));
