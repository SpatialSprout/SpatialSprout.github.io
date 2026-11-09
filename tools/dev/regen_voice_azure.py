#!/usr/bin/env python3
"""Regenerate a SpatialSprout book's narration with Azure Speech (official
Microsoft API — same voices as edge-tts, but no throttling), keeping the SAME
FNV-1a mp3 filenames and voice.js format the book already expects.

Env vars (never commit these):
    AZURE_SPEECH_KEY     e.g. 7syf...
    AZURE_SPEECH_REGION  e.g. eastus

Usage:
    $env:AZURE_SPEECH_KEY='...'; $env:AZURE_SPEECH_REGION='eastus'
    python tools/dev/regen_voice_azure.py grade-1-english
"""
import os, sys, re, json, glob, time, urllib.request, urllib.error
from mutagen.mp3 import MP3

KEY = os.environ["AZURE_SPEECH_KEY"]
REGION = os.environ.get("AZURE_SPEECH_REGION", "eastus")
VOICE = "en-US-JennyNeural"
RATE = "-10%"
PITCH = "+5Hz"
OUTFMT = "audio-24khz-48kbitrate-mono-mp3"


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
    t = t.replace("\u00d7", " times ").replace("\u00f7", " divided by ")
    t = re.sub(r"\$(\d+)", r"\1 dollars", t)
    t = re.sub(r"(\d)\s*\+\s*(\d)", r"\1 plus \2", t)
    t = re.sub(r"(\d)\s*-\s*(\d)", r"\1 minus \2", t)
    t = re.sub(r"(\d)\s*=\s*(\d)", r"\1 equals \2", t)
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


def xml_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def synth(text, path):
    ssml = ("<speak version='1.0' xml:lang='en-US'>"
            "<voice name='%s'><prosody rate='%s' pitch='%s'>%s</prosody></voice>"
            "</speak>") % (VOICE, RATE, PITCH, xml_escape(text))
    req = urllib.request.Request(
        "https://%s.tts.speech.microsoft.com/cognitiveservices/v1" % REGION,
        data=ssml.encode("utf-8"),
        headers={
            "Ocp-Apim-Subscription-Key": KEY,
            "Content-Type": "application/ssml+xml",
            "X-Microsoft-OutputFormat": OUTFMT,
            "User-Agent": "spatialsprout-tts",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        audio = r.read()
    open(path, "wb").write(audio)
    return MP3(path).info.length


def synth_with_retry(text, path):
    last = None
    for attempt in range(6):
        try:
            return synth(text, path)
        except urllib.error.HTTPError as e:
            last = e
            if e.code == 429:  # rate limit: back off and retry
                time.sleep(6 * (attempt + 1))
            else:
                raise
        except Exception as e:
            last = e
            time.sleep(3)
    raise last


def main():
    book = sys.argv[1] if len(sys.argv) > 1 else "grade-1-english"
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

    print("book=%s voice=%s strings=%d" % (book, VOICE, len(strings)), flush=True)

    ok = 0
    for i, s in enumerate(strings):
        h = fnv(s)
        path = os.path.join(vd, h + ".mp3")
        try:
            V[h] = round(synth_with_retry(norm(s), path), 2)
            ok += 1
        except Exception as e:
            print("FAIL %d %r -> %s" % (i, s[:50], e), flush=True)
        if i % 5 == 0:
            print("progress %d/%d" % (i, len(strings)), flush=True)
        time.sleep(3.5)

    open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
    print("DONE ok=%d total_voice_entries=%d" % (ok, len(V)), flush=True)


if __name__ == "__main__":
    main()
