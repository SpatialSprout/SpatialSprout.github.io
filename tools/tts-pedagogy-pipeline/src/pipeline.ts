import {
  DeliveryCard,
  NormalizedUtterance,
  PipelineOptions,
  RawLayoutElement,
  ResolvedOptions,
} from './types';
import { buildReadingOrder } from './readingOrder';
import { normalizeElement } from './normalizer';
import { renderSSML } from './renderer/ssml';
import { renderTokens } from './renderer/tokens';

/** Defaults that encode the warm, age-appropriate teacher persona. */
export const DEFAULT_OPTIONS: ResolvedOptions = {
  target: 'ssml',
  includeIntro: true,
  includePraise: true,
  blankPrompt: 'What goes in the blank?',
  defaultRate: 'slow',
  introText: "Let's look at the next question!",
};

export function resolveOptions(
  options: PipelineOptions = {},
): ResolvedOptions {
  return { ...DEFAULT_OPTIONS, ...options };
}

/** Full speech-planning pass: layout → normalized, ordered utterances. */
export function parseToUtterances(
  elements: RawLayoutElement[],
  options: PipelineOptions = {},
): NormalizedUtterance[] {
  const opts = resolveOptions(options);
  const ordered = buildReadingOrder(elements);

  const utterances = ordered.map((el) => normalizeElement(el, opts));

  if (!opts.includeIntro) return utterances;

  const intro: NormalizedUtterance = {
    id: 'intro',
    role: 'instruction_hint',
    utteranceType: 'instruction',
    spokenText: opts.introText,
    prosody: { rate: 'slow', pitchDelta: '+10%' },
    pauseAfterMs: 400,
  };
  return [intro, ...utterances];
}

function rateFor(rate: NonNullable<NormalizedUtterance['prosody']['rate']>): DeliveryCard['rate'] {
  if (rate === 'x-slow' || rate === 'slow') return 'slow';
  if (rate === 'fast' || rate === 'x-fast') return 'fast';
  return 'normal';
}

function energyFor(u: NormalizedUtterance): DeliveryCard['energy'] {
  if (u.utteranceType === 'praise') return 'high';
  if (u.utteranceType === 'question') return 'high';
  if (u.utteranceType === 'phoneme_drill') return 'medium';
  return 'medium';
}

function contourFor(u: NormalizedUtterance): DeliveryCard['pitch_contour'] {
  if (u.utteranceType === 'question') return 'rise';
  if (u.utteranceType === 'praise') return 'rise-fall';
  if (u.utteranceType === 'list_count') return 'fall-rise';
  return 'rise-fall';
}

/** Map normalized utterances to structured delivery cards. */
export function toDeliveryCards(
  utterances: NormalizedUtterance[],
): DeliveryCard[] {
  return utterances.map((u) => ({
    utterance_type: u.utteranceType,
    spoken_text: u.spokenText,
    rate: rateFor(u.prosody.rate ?? 'medium'),
    energy: energyFor(u),
    pitch_contour: contourFor(u),
    emphasis_words: u.prosody.emphasis ?? [],
    phoneme_target: u.phonemeTarget ?? null,
    pause_after_ms: u.pauseAfterMs,
    read_order_hint:
      u.utteranceType === 'phoneme_drill'
        ? 'phoneme-isolated'
        : u.utteranceType === 'list_count'
          ? 'list-count'
          : 'semantic',
  }));
}

/** End-to-end: layout elements → SSML or token text. */
export function synthesize(
  elements: RawLayoutElement[],
  options: PipelineOptions = {},
): string {
  const opts = resolveOptions(options);
  let utterances = parseToUtterances(elements, opts);

  if (!opts.includePraise) {
    utterances = utterances.filter((u) => u.role !== 'praise_banner');
  }

  if (opts.target === 'tokens') {
    return renderTokens(utterances, opts);
  }
  return renderSSML(utterances, opts);
}
