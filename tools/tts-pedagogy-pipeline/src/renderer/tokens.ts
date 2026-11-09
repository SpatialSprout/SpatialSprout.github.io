import { NormalizedUtterance, ResolvedOptions } from '../types';

/**
 * Structural-token renderer — for instruction-following neural TTS without
 * SSML support (OpenAI TTS, ElevenLabs, Gemini Live, PlayHT...).
 *
 * Emits explicit delivery cues the model interprets as directions rather
 * than words. The exact token vocabulary should be tuned per engine.
 */

function cueFor(u: NormalizedUtterance): string | null {
  switch (u.utteranceType) {
    case 'question':
      return '[QUESTION:RISING]';
    case 'phoneme_drill':
      return `[PHONICS: elongate "${u.phonemeTarget ?? ''}"]`;
    case 'praise':
      return '[ENERGY:HIGH]';
    case 'list_count':
      return '[LIST:COUNT]';
    default:
      return null;
  }
}

/** Render a sequence of utterances as a token-annotated plain-text block. */
export function renderTokens(
  utterances: NormalizedUtterance[],
  opts: ResolvedOptions,
): string {
  const lines: string[] = [];
  lines.push('[VOICE: warm teacher, 5-7 year old audience, smiling, gentle, animated]');
  lines.push(`[PACE: ${opts.defaultRate}, ~150wpm]`);
  lines.push('');

  for (const u of utterances) {
    const cue = cueFor(u);
    if (cue) lines.push(`${cue} ${u.spokenText}`);
    else lines.push(u.spokenText);
    if (u.pauseAfterMs > 0) {
      lines.push(`[BREAK:${u.pauseAfterMs}ms]`);
    }
  }

  return lines.join('\n');
}
