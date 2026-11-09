#!/usr/bin/env python3
"""Regenerate a SpatialSprout book's narration with edge-tts (Microsoft neural
voices), keeping the SAME FNV-1a mp3 filenames and voice.js format the book
already expects, so the new audio drops in without any book-code changes.

Only the strings actually pre-generated (in voice.js) are regenerated:
speech: steps, the bookkit lines.json, and the cover line. Round prompts,
card questions and lesson openers are browser-TTS'd at runtime, not mp3s.

Usage:
    python tools/dev/regen_voice_edge.py <book-slug> [voice] [rate] [pitch]
"""
import os, sys, re, json, glob, asyncio
import edge_tts
from mutagen.mp3 import MP3

VOICE = "en-GB-SoniaNeural"
RATE = "-10%"
PITCH = "+5Hz"


def fnv(t):
    h = 0x811C9DC5
    b = t.encode("utf-16-le")
    for i in range(0, len(b), 2):
        u = int.from_bytes(b[i : i + 2], "little")
        h ^= u
        h = (h * 0x01000193) & 0xFFFFFFFF
    return "%08x" % h


def norm(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = (t.replace("\u2018", "'").replace("\u2019", "'")
          .replace("\u201c", '"').replace("\u201d", '"')
          .replace("\u2013", ", ").replace("\u2014", ", ")
          .replace("\u2026", ".").replace("\u00a0", " "))
    t = re.sub(r"_{2,}", " blank ", t)
    t = t.replace("*", "")
    return re.sub(r"\s+", " ", t).strip()


def js_unescape(s):
    out, i = [], 0
    while i < len(s):
        c = s[i]
        if c == "\\" and i + 1 < len(s):
            n = s[i + 1]
            if n == "n":
                out.append("\n"); i += 2; continue
            if n in ("'", '"', "\\"):
                out.append(n); i += 2; continue
            out.append(n); i += 2; continue
        out.append(c); i += 1
    return "".join(out)


def extract(js, pattern):
    return [js_unescape(m.group(1)) for m in re.finditer(pattern, js)]


def lines_strings(path):
    L = json.load(open(path, encoding="utf-8"))
    out = []
    for v in L.values():
        if isinstance(v, list):
            for x in v:
                if isinstance(x, str):
                    out.append(x)
        elif isinstance(v, str):
            out.append(v)
    for n in [r[1] for r in L["ranksKid"] + L["ranksOld"]]:
        out.append(L["rankUp"] + " " + ("an" if n[0] in "AEIOU" else "a") + " " + n + "!")
    return out


def main():
    book = sys.argv[1] if len(sys.argv) > 1 else "grade-1-english"
    voice = sys.argv[2] if len(sys.argv) > 2 else VOICE
    rate = sys.argv[3] if len(sys.argv) > 3 else RATE
    pitch = sys.argv[4] if len(sys.argv) > 4 else PITCH

    bdir = os.path.join("books", book)
    sq = r"'((?:[^'\\]|\\.)*)'"
    strings = []

    for f in glob.glob(os.path.join(bdir, "*.js")):
        if os.path.basename(f) in ("voice.js", "vtime.js"):
            continue
        strings += extract(open(f, encoding="utf-8").read(), r"\bspeech:" + sq)

    strings += lines_strings("tools/bookkit/lines.json")
    strings += ["Tap the cover to open the book."]

    strings = list(dict.fromkeys(s for s in strings if s))

    vd = os.path.join(bdir, "voice")
    os.makedirs(vd, exist_ok=True)
    vj = os.path.join(bdir, "voice.js")
    V = {}
    if os.path.exists(vj):
        V = json.loads(open(vj, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))

    print("book=%s voice=%s rate=%s pitch=%s strings=%d" % (book, voice, rate, pitch, len(strings)), flush=True)

    async def run():
        ok = 0
        for i, s in enumerate(strings):
            h = fnv(s)
            path = os.path.join(vd, h + ".mp3")
            try:
                tts = edge_tts.Communicate(norm(s), voice=voice, rate=rate, pitch=pitch)
                await tts.save(path)
                V[h] = round(MP3(path).info.length, 2)
                ok += 1
            except Exception as e:
                print("FAIL %d %r -> %s" % (i, s[:50], e), flush=True)
            if i % 5 == 0:
                print("progress %d/%d" % (i, len(strings)), flush=True)
            await asyncio.sleep(0.3)
        open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
        print("DONE ok=%d total_voice_entries=%d" % (ok, len(V)), flush=True)

    asyncio.run(run())


if __name__ == "__main__":
    main()
