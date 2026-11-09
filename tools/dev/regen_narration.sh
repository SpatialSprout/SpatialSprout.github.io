#!/usr/bin/env bash
# Regenerate a book's narration and (optionally) deploy it to the live site.
#
# Usage (run on the Linux build box — needs Kokoro at /root/vendor/kok,
# espeak-ng, ffmpeg, python3, and this repo checked out, normally /root/site):
#
#   bash tools/dev/regen_narration.sh grade-1-english           # generate only
#   bash tools/dev/regen_narration.sh grade-1-english --deploy  # generate + commit + push
#
set -euo pipefail

BOOK="${1:?Usage: regen_narration.sh <book-slug> [--deploy]}"
DEPLOY=0
[ "${2:-}" = "--deploy" ] && DEPLOY=1

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"
PORT="${PORT:-8123}"
OUT="$(mktemp -d)"

echo "==> 1/2 Serving books/$BOOK on :$PORT and collecting spoken strings..."
( cd "books/$BOOK" && python3 -m http.server "$PORT" >/dev/null 2>&1 & echo $! > "$OUT/http.pid" )
sleep 2
python3 tools/dev/collect.py "$PORT" "$OUT"

echo "==> 2/2 Synthesizing narration (Kokoro)..."
python3 tools/dev/tts.py "books/$BOOK" "$OUT/strings.json"

# stop the local server
[ -f "$OUT/http.pid" ] && kill "$(cat "$OUT/http.pid")" 2>/dev/null || true

echo "==> Changed files:"
git status --short -- "books/$BOOK/voice" "books/$BOOK/voice.js"

if [ "$DEPLOY" = "1" ]; then
  git add "books/$BOOK/voice" "books/$BOOK/voice.js" 2>/dev/null || true
  git commit -m "$BOOK: regenerate narration" --allow-empty
  git push origin main
  echo "==> Deployed. Live in ~1-2 min at https://spatialsprout.ca"
fi
