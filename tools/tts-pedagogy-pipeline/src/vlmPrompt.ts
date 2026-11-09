import { RawLayoutElement } from './types';

/**
 * VLM integration for layout-aware vision parsing.
 *
 * Instead of asking the vision model for raw text (which leads to reading
 * "2." and "___" literally), prompt it for a *speech-aware* structured tree.
 * This module ships the prompt, a JSON schema for its output, and a validator
 * that normalizes the VLM response into `RawLayoutElement[]`.
 */

export const VLM_SYSTEM_PROMPT = `You are analyzing a screenshot of a children's educational exercise.
Return JSON ONLY. Do not describe the image.

For each visual element, classify it and assign a spoken reading order.
Rules:
- Follow the INSTRUCTIONAL flow a teacher would use, NOT top-to-bottom or
  left-to-right z-order.
- Decorative icons, page numbers, progress bars, and background art:
  mark "speak": false and "role": "skip".
- Question number markers (e.g. "2.") are folded into the sentence as
  ordinal text ("Number two"), not spoken as isolated digits.
- Answer blanks ("___", boxes) are converted to a natural prompt like
  "What goes in the blank?" — never "underscore".
- List options (A/B/C) are read in natural counting order with a short
  pause between them.
- A letter/sound being taught is marked with role "phoneme_target".

Return a JSON object with an "elements" array. Each element:
{
  "id": "string",
  "role": "problem_statement | question_number | answer_blank | option_list | instruction_hint | phoneme_target | praise_banner | skip",
  "bbox": [x1, y1, x2, y2],
  "rawText": "string",
  "speak": true | false,
  "ipa": "optional IPA transcription for phoneme_target",
  "phonemeTarget": "optional word/phrase being drilled"
}`;

/** JSON Schema describing the VLM's expected output shape. */
export const VLM_OUTPUT_SCHEMA = {
  type: 'object',
  required: ['elements'],
  properties: {
    elements: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'role', 'bbox', 'rawText'],
        properties: {
          id: { type: 'string' },
          role: {
            enum: [
              'problem_statement',
              'question_number',
              'answer_blank',
              'option_list',
              'instruction_hint',
              'phoneme_target',
              'praise_banner',
              'skip',
            ],
          },
          bbox: {
            type: 'array',
            items: { type: 'number' },
            minItems: 4,
            maxItems: 4,
          },
          rawText: { type: 'string' },
          speak: { type: 'boolean' },
          ipa: { type: 'string' },
          phonemeTarget: { type: 'string' },
        },
      },
    },
  },
} as const;

const ROLES = new Set([
  'problem_statement',
  'question_number',
  'answer_blank',
  'option_list',
  'instruction_hint',
  'phoneme_target',
  'praise_banner',
  'skip',
]);

/**
 * Validate/normalize a VLM response (accepts either the `{ elements }` object
 * or a bare array) into `RawLayoutElement[]`. Throws on malformed input.
 */
export function parseVlmLayout(data: unknown): RawLayoutElement[] {
  const arr = Array.isArray(data)
    ? data
    : (data as { elements?: unknown })?.elements;

  if (!Array.isArray(arr)) {
    throw new Error('VLM layout must be an array or { elements: [...] }');
  }

  return arr.map((item, index) => {
    const e = item as Record<string, unknown>;
    const role = e.role as string;
    const bbox = e.bbox as number[] | undefined;

    if (!role || !ROLES.has(role)) {
      throw new Error(`Invalid role at index ${index}: ${String(role)}`);
    }
    if (!Array.isArray(bbox) || bbox.length !== 4) {
      throw new Error(`Invalid bbox at index ${index}`);
    }

    return {
      id: typeof e.id === 'string' ? e.id : `vlm-${index}`,
      role: role as RawLayoutElement['role'],
      bbox: { x1: bbox[0], y1: bbox[1], x2: bbox[2], y2: bbox[3] },
      rawText: typeof e.rawText === 'string' ? e.rawText : '',
      speak: e.speak !== false,
      ipa: typeof e.ipa === 'string' ? e.ipa : undefined,
      phonemeTarget:
        typeof e.phonemeTarget === 'string' ? e.phonemeTarget : undefined,
    };
  });
}
