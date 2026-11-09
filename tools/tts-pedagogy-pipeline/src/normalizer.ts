import {
  ElementRole,
  NormalizedUtterance,
  Prosody,
  RawLayoutElement,
  ResolvedOptions,
  UtteranceType,
} from './types';

/**
 * Speech normalization: turn raw UI text into natural spoken text.
 *
 * Responsibilities:
 *   - strip markdown/UI glyphs so the engine never "reads punctuation";
 *   - convert question numbers ("2.") into "Number two";
 *   - convert answer blanks ("___") into a natural spoken prompt;
 *   - convert option lists ("A) red  B) blue") into countable phrases;
 *   - assign warm, dynamic prosody defaults per role.
 */

/** Blank markers that must NEVER be read literally. */
const BLANK_DETECT = /_{2,}|\[blank\]|\u2610|\u25a1/i;
const BLANK_REPLACE = /_{2,}|\[blank\]|\u2610|\u25a1/gi;

/** Cardinal words for child-friendly question numbers (small numbers). */
const NUMBER_WORDS: Record<number, string> = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
};

/** Remove UI glyphs that are visual, not verbal. */
export function stripUiGlyphs(text: string): string {
  return text
    .replace(/[\u2022\u00b7\u25aa\u25b6\u25ba\u27a4\u2192\u21d2\u261e]/g, ' ')
    .replace(/^\s*[-–—]\s*/gm, ' ') // leading bullet dashes only
    .replace(/[[\]{}()*#]/g, ' ') // brackets / markdown glyphs
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Replace a fill-in-the-blank marker with a natural spoken prompt. */
export function blankToPrompt(text: string, template: string): string {
  if (!BLANK_DETECT.test(text)) return text;
  return text.replace(BLANK_REPLACE, template).replace(/\s{2,}/g, ' ').trim();
}

/** Convert "2." / "2)" into "Number two". */
export function numberToWords(text: string): string {
  const match = text.match(/(\d+)/);
  if (!match) return text.trim();
  const n = parseInt(match[1], 10);
  const word = NUMBER_WORDS[n];
  return word ? `Number ${word}` : `Number ${n}`;
}

/**
 * Convert "A) red  B) blue" into "A. red. B. blue." so each option is a clear,
 * countable phrase with a sentence break before the next marker.
 */
export function normalizeOptions(text: string): string {
  const parts = text
    .split(/\s{2,}|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const items = parts.map((p) => {
    const item = p
      .replace(/([A-Za-z])\s*[.)]/g, '$1.')
      .replace(/(\d+)\s*[.)]/g, '$1.');
    return item.endsWith('.') ? item : `${item}.`;
  });

  return items.join(' ');
}

/** Prosody defaults that encode the warm-teacher persona per role. */
const ROLE_PROSODY: Record<ElementRole, Prosody> = {
  question_number: { rate: 'slow', pitchDelta: '+8%' },
  problem_statement: { rate: 'slow' },
  phoneme_target: { rate: 'x-slow' },
  instruction_hint: { rate: 'slow' },
  option_list: { rate: 'slow' },
  answer_blank: { rate: 'slow', pitchDelta: '+12%' },
  praise_banner: { rate: 'fast', pitchDelta: '+15%', volume: 'loud' },
  skip: {},
};

/** Trailing pause (ms) after each role, sized for young listeners. */
const ROLE_PAUSE: Record<ElementRole, number> = {
  question_number: 350,
  problem_statement: 450,
  phoneme_target: 300,
  instruction_hint: 400,
  option_list: 500,
  answer_blank: 700,
  praise_banner: 500,
  skip: 0,
};

function utteranceTypeFor(role: ElementRole): UtteranceType {
  switch (role) {
    case 'question_number':
    case 'option_list':
      return 'list_count';
    case 'answer_blank':
      return 'question';
    case 'phoneme_target':
      return 'phoneme_drill';
    case 'praise_banner':
      return 'praise';
    case 'problem_statement':
    case 'instruction_hint':
    default:
      return 'instruction';
  }
}

/** Normalize a single layout element into a ready-to-speak utterance. */
export function normalizeElement(
  el: RawLayoutElement,
  opts: ResolvedOptions,
): NormalizedUtterance {
  let text = el.rawText;

  if (el.role === 'question_number') {
    text = numberToWords(text);
  } else if (el.role === 'answer_blank') {
    text = blankToPrompt(text, opts.blankPrompt);
  } else {
    text = stripUiGlyphs(text);
    if (el.role === 'option_list') text = normalizeOptions(text);
  }

  const prosody: Prosody = { ...ROLE_PROSODY[el.role], ...el.prosody };

  const isPhoneme = el.role === 'phoneme_target';
  const target = el.phonemeTarget ?? (isPhoneme ? text : undefined);
  if (isPhoneme && target) {
    prosody.emphasis = prosody.emphasis ?? [target];
  }

  return {
    id: el.id,
    role: el.role,
    utteranceType: utteranceTypeFor(el.role),
    spokenText: text,
    prosody,
    pauseAfterMs: el.pauseAfterMs ?? ROLE_PAUSE[el.role],
    ipa: el.ipa,
    phonemeTarget: target,
  };
}
