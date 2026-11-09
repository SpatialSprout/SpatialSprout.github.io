# tts-pedagogy-pipeline

Layout-aware speech planning + SSML/token rendering for children's educational TTS.

This is the **speech-planning layer** that sits between your vision/OCR layer and your TTS
engine. It fixes three failure modes that produce robotic, flat narration:

| Symptom | Root cause | Where it's fixed |
|---|---|---|
| Staccato / robotic pacing | Literal punctuation & line breaks fed to TTS | `normalizer.ts`, `renderer/ssml.ts` (`<break>`) |
| Flat, monotone tone | No prosody direction | `normalizer.ts` (role prosody), `pipeline.ts` (delivery cards) |
| Awkward phrases like "A two." | Raw z-order / left-to-right reading of UI | `readingOrder.ts` (block clustering + role ordering) |

## Prerequisites

- Node.js **20+** (LTS). Download from https://nodejs.org/

## Setup

```powershell
cd C:\Users\varga\tts-pedagogy-pipeline
npm install
```

> If `npm install` fails with `ECONNRESET`, see the "Network errors" note below.

## Run

```powershell
npm run demo       # prints SSML, structural tokens, and delivery cards
npm test           # runs the unit tests
npm run build      # compiles to dist/
npm run typecheck  # type-checks without emitting
```

## Pipeline flow

```
RawLayoutElement[]          (from your VLM/OCR — see vlmPrompt.ts)
        │  parseVlmLayout()  validates/normalizes VLM JSON
        ▼
buildReadingOrder()          drop non-verbal, cluster, reorder semantically
        │
        ▼
normalizeElement()           blank→prompt, "2."→"Number two", strip glyphs
        │
        ▼
NormalizedUtterance[]
        │
        ├─ toDeliveryCards()  → DeliveryCard[] (for instruction-following engines)
        └─ synthesize()       → SSML  or  structural tokens
```

## Minimal usage

```ts
import { synthesize, parseVlmLayout } from './src/pipeline';
// (parseVlmLayout lives in ./src/vlmPrompt)

const elements = parseVlmLayout({
  elements: [
    { id: 'q2', role: 'question_number', bbox: [10, 10, 60, 34], rawText: '2.' },
    { id: 'ps', role: 'problem_statement', bbox: [10, 50, 700, 90], rawText: 'Count the apples and write the number in the blank' },
    { id: 'b',  role: 'answer_blank',      bbox: [10, 190, 200, 220], rawText: '____' },
  ],
});

console.log(synthesize(elements, { target: 'ssml' }));   // for Polly/Azure/Google
console.log(synthesize(elements, { target: 'tokens' })); // for OpenAI/ElevenLabs
```

## File map

- `src/types.ts` — domain types (layout elements, prosody, delivery cards).
- `src/readingOrder.ts` — filter + vertical block clustering + role-priority ordering.
- `src/normalizer.ts` — text cleanup, number→words, blank→prompt, option counting.
- `src/pipeline.ts` — orchestrator, option resolution, delivery-card mapping.
- `src/renderer/ssml.ts` — SSML output (Polly/Azure/Google).
- `src/renderer/tokens.ts` — structural-token output (OpenAI/ElevenLabs/Gemini).
- `src/vlmPrompt.ts` — VLM system prompt, output JSON schema, and validator.
- `src/index.ts` — runnable demo.
- `test/pipeline.test.ts` — unit tests for the three failure modes.

## Network errors during `npm install`

If you see `TypeError: terminated ... ECONNRESET`:

```powershell
npm install --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000
$env:NODE_OPTIONS = "--dns-result-order=ipv4first"
```

Then retry. A VPN/proxy or flaky Wi-Fi is the usual cause; see the full
troubleshooting steps if the retry still fails.
