import { BBox, ElementRole, RawLayoutElement } from './types';

/**
 * Layout-aware reading-order reconstruction.
 *
 * The root cause of "robotic" TTS is reading raw OCR output in z-order.
 * This module rebuilds a *semantic* reading order:
 *
 *   1. DROP non-verbal elements (icons, page numbers, progress bars).
 *   2. CLUSTER regions into vertical "blocks" (a question number + its
 *      content belong together even if they sit side-by-side).
 *   3. ORDER blocks top-to-bottom, and within a block by role priority,
 *      so "2." is always spoken *before* the problem text, and the answer
 *      blank is spoken *after* the options — regardless of horizontal
 *      position. This is what eliminates phrases like "A two."
 */

/**
 * Role priority within a single visual block.
 * Lower = spoken earlier. `skip` is filtered out before this is used.
 */
export const ROLE_PRIORITY: Record<ElementRole, number> = {
  question_number: 0,
  problem_statement: 1,
  phoneme_target: 2,
  instruction_hint: 3,
  option_list: 4,
  answer_blank: 5,
  praise_banner: 6,
  skip: 99,
};

/** Vertical-center of a box (used as its "row" position). */
export function verticalCenter(b: BBox): number {
  return (b.y1 + b.y2) / 2;
}

/** Height of a box. */
export function boxHeight(b: BBox): number {
  return b.y2 - b.y1;
}

/** Median element height — a stable proxy for "one line" of UI. */
export function medianHeight(elements: RawLayoutElement[]): number {
  if (elements.length === 0) return 24;
  const heights = elements.map((e) => boxHeight(e.bbox)).sort((a, b) => a - b);
  const mid = Math.floor(heights.length / 2);
  return heights.length % 2 === 0
    ? (heights[mid - 1] + heights[mid]) / 2
    : heights[mid];
}

/** Remove non-verbal / non-speaking regions before planning. */
export function filterSpeakable(
  elements: RawLayoutElement[],
): RawLayoutElement[] {
  return elements.filter((e) => e.speak && e.role !== 'skip');
}

/**
 * Cluster elements into vertical blocks. A block boundary is introduced when
 * the vertical gap between consecutive (top-to-bottom sorted) elements is
 * large relative to a single line of UI.
 */
export function clusterIntoBlocks(
  elements: RawLayoutElement[],
): RawLayoutElement[][] {
  if (elements.length === 0) return [];

  const sorted = [...elements].sort(
    (a, b) => verticalCenter(a.bbox) - verticalCenter(b.bbox),
  );

  const lineHeight = medianHeight(sorted);
  // A gap larger than ~1.2 lines separates one question block from the next.
  const gapThreshold = lineHeight * 1.2;

  const blocks: RawLayoutElement[][] = [];
  let current: RawLayoutElement[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const cur = sorted[i];
    const gap = verticalCenter(cur.bbox) - verticalCenter(prev.bbox);
    if (gap > gapThreshold) {
      blocks.push(current);
      current = [cur];
    } else {
      current.push(cur);
    }
  }
  blocks.push(current);
  return blocks;
}

/** Sort a single block by role priority, then left-to-right as tiebreak. */
export function sortBlockByRole(
  block: RawLayoutElement[],
): RawLayoutElement[] {
  return [...block].sort((a, b) => {
    const pa = ROLE_PRIORITY[a.role];
    const pb = ROLE_PRIORITY[b.role];
    if (pa !== pb) return pa - pb;
    return a.bbox.x1 - b.bbox.x1;
  });
}

/**
 * Full reading-order pipeline:
 * filter → cluster (top-to-bottom) → sort within block (role, then x).
 */
export function buildReadingOrder(
  elements: RawLayoutElement[],
): RawLayoutElement[] {
  const speakable = filterSpeakable(elements);
  return clusterIntoBlocks(speakable).flatMap(sortBlockByRole);
}
