import { NormalizedUtterance, Prosody, ResolvedOptions } from '../types';

/**
 * SSML renderer — for engines with full SSML support
 * (Amazon Polly, Azure Speech, Google Cloud TTS).
 */

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function prosodyAttrs(p: Prosody): string {
  const parts: string[] = [];
  if (p.rate) parts.push(`rate="${p.rate}"`);
  if (p.pitchDelta) parts.push(`pitch="${p.pitchDelta}"`);
  if (p.volume) parts.push(`volume="${p.volume}"`);
  return parts.join(' ');
}

/**
 * Inject `<emphasis>` around stressed words and a `<phoneme>` around the
 * drill target, operating on already-XML-escaped text.
 */
function decorate(
  escapedText: string,
  emphasis: string[] | undefined,
  ipa: string | undefined,
  phonemeTarget: string | undefined,
): string {
  let out = escapedText;

  for (const word of emphasis ?? []) {
    const re = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
    out = out.replace(re, (m) => `<emphasis level="strong">${m}</emphasis>`);
  }

  if (ipa && phonemeTarget) {
    const re = new RegExp(`\\b${escapeRegExp(phonemeTarget)}\\b`, 'i');
    out = out.replace(
      re,
      (m) => `<phoneme alphabet="ipa" ph="${escapeXml(ipa)}">${m}</phoneme>`,
    );
  }

  return out;
}

/** Render a sequence of utterances as a single SSML document. */
export function renderSSML(
  utterances: NormalizedUtterance[],
  opts: ResolvedOptions,
): string {
  const lines: string[] = [];
  lines.push(
    '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">',
  );
  lines.push(
    `  <prosody rate="${opts.defaultRate}" pitch="+5%" volume="loud">`,
  );

  for (const u of utterances) {
    const attrs = prosodyAttrs(u.prosody);
    const open = attrs ? `<prosody ${attrs}>` : '';
    const close = attrs ? '</prosody>' : '';
    const inner = decorate(
      escapeXml(u.spokenText),
      u.prosody.emphasis,
      u.ipa,
      u.phonemeTarget,
    );
    lines.push(`    <s>${open}${inner}${close}</s>`);
    if (u.pauseAfterMs > 0) {
      lines.push(`    <break time="${u.pauseAfterMs}ms"/>`);
    }
  }

  lines.push('  </prosody>');
  lines.push('</speak>');
  return lines.join('\n');
}
