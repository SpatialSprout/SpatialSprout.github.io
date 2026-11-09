/**
 * Core domain types for the TTS pedagogy pipeline.
 *
 * The pipeline turns *raw layout elements* (what a vision/OCR layer sees)
 * into *normalized utterances* (what a TTS engine should actually say),
 * then renders them to SSML or structural tokens.
 */

/** Classification assigned to every detected screen region. */
export type ElementRole =
  | 'problem_statement' // the main question text
  | 'question_number' // "2." — folded in as ordinal, never read as a bare digit
  | 'answer_blank' // "___", "☐", input box — becomes a natural prompt
  | 'option_list' // "A) B) C)" — read in counting order with pauses
  | 'instruction_hint' // "Fill it in", "Circle the answer"
  | 'phoneme_target' // letter/word being taught — special slow prosody
  | 'praise_banner' // "Good job!" — high energy
  | 'skip'; // decorative icon, page number, progress bar, background art

/** Delivery intent of a single utterance. */
export type UtteranceType =
  | 'instruction'
  | 'question'
  | 'praise'
  | 'phoneme_drill'
  | 'list_count'
  | 'feedback';

/** Axis-aligned bounding box in screen pixel space. */
export interface BBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** Prosody directives that steer a warm, dynamic, child-directed delivery. */
export interface Prosody {
  /** Speech rate hint. */
  rate?: 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast';
  /** Relative pitch delta, e.g. "+8%" or "-5%". */
  pitchDelta?: string;
  /** Words/phrases that should receive extra stress. */
  emphasis?: string[];
  /** Relative volume, e.g. "loud", "soft", "+20%". */
  volume?: string;
}

/**
 * A region detected on screen by the vision layer, BEFORE speech planning.
 * This is exactly what the VLM/OCR layout parser returns (see vlmPrompt.ts).
 */
export interface RawLayoutElement {
  id: string;
  role: ElementRole;
  bbox: BBox;
  rawText: string;
  /** false = never spoken (decorations, page numbers, progress bars...). */
  speak: boolean;
  prosody?: Prosody;
  pauseAfterMs?: number;
  /** IPA transcription when this is a phoneme/sound drill target. */
  ipa?: string;
  /** The word/phrase being drilled (defaults to rawText for phoneme_target). */
  phonemeTarget?: string;
}

/** A single planned speech unit, ready to render to SSML or tokens. */
export interface NormalizedUtterance {
  id: string;
  role: ElementRole;
  utteranceType: UtteranceType;
  spokenText: string;
  prosody: Prosody;
  pauseAfterMs: number;
  /** IPA if this utterance drills a letter sound. */
  ipa?: string;
  /** The word/phrase being drilled, e.g. "apples". */
  phonemeTarget?: string;
}

export type RenderTarget = 'ssml' | 'tokens';

/** Public, user-facing pipeline options (all optional). */
export interface PipelineOptions {
  target?: RenderTarget;
  includeIntro?: boolean;
  includePraise?: boolean;
  /** Template used to verbalize a fill-in-the-blank. `{word}` is optional. */
  blankPrompt?: string;
  /** Global speech rate for SSML prosody / token pace line. */
  defaultRate?: Prosody['rate'];
  /** Friendly lead-in line prepended when includeIntro is true. */
  introText?: string;
}

/** Options with all defaults resolved (used internally). */
export interface ResolvedOptions {
  target: RenderTarget;
  includeIntro: boolean;
  includePraise: boolean;
  blankPrompt: string;
  defaultRate: NonNullable<Prosody['rate']>;
  introText: string;
}

/**
 * Structured metadata consumed by instruction-following TTS engines and
 * by analytics/prosody validators. This is the "delivery card" from the spec.
 */
export interface DeliveryCard {
  utterance_type: UtteranceType;
  spoken_text: string;
  rate: 'slow' | 'normal' | 'fast';
  energy: 'low' | 'medium' | 'high';
  pitch_contour: 'rise' | 'fall' | 'rise-fall' | 'fall-rise';
  emphasis_words: string[];
  phoneme_target: string | null;
  pause_after_ms: number;
  read_order_hint: 'semantic' | 'list-count' | 'phoneme-isolated';
}
