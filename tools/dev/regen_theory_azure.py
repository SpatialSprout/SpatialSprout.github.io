#!/usr/bin/env python3
"""Regenerate theory ("first pages") narration with Azure Speech, using the
rendered theory text collected by collect_theory_win.py.

Env: AZURE_SPEECH_KEY, AZURE_SPEECH_REGION
Usage: python tools/dev/regen_theory_azure.py grade-1-english theory_text.json
"""
import os, sys, re, json, time, urllib.request, urllib.error
from mutagen.mp3 import MP3

KEY = os.environ["AZURE_SPEECH_KEY"]
REGION = os.environ.get("AZURE_SPEECH_REGION", "eastus")
VOICE = "en-GB-SoniaNeural"
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


def xml_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def synth(text, path):
    ssml = ("<speak version='1.0' xml:lang='en-GB'>"
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
    with urllib.request.urlopen(req, timeout=120) as r:
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
            if e.code == 429:
                time.sleep(6 * (attempt + 1))
            else:
                raise
        except Exception as e:
            last = e
            time.sleep(3)
    raise last


def weight(w):
    core = re.sub(r"[^A-Za-z0-9]", "", w)
    x = len(core) * 1.0 + 1.6
    if re.search(r"[,;:][\"\u201d]?$", w):
        x += 3.0
    if re.search(r"[.!?][\"\u201d]?$", w):
        x += 1.0
    return x


def word_times(words, dur):
    wt = [weight(w) for w in words]
    tot = sum(wt)
    c, ends = 0.0, []
    for w in wt:
        c += w
        ends.append(round(dur * c / tot, 3))
    return ends


def main():
    book = sys.argv[1] if len(sys.argv) > 1 else "grade-1-english"
    theory_file = sys.argv[2] if len(sys.argv) > 2 else "theory_text.json"
    bdir = os.path.join("books", book)
    data = json.load(open(theory_file, encoding="utf-8"))

    vd = os.path.join(bdir, "voice")
    vj = os.path.join(bdir, "voice.js")
    tj = os.path.join(bdir, "vtime.js")
    V = json.loads(open(vj, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))
    T = {}
    if os.path.exists(tj):
        T = json.loads(open(tj, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))

    print("theory=%d" % len(data), flush=True)

    ok = 0
    for i, r in enumerate(data):
        speech = r["speech"]
        words = speech.split(" ")
        h = fnv(speech)
        path = os.path.join(vd, h + ".mp3")
        try:
            dur = synth_with_retry(speech, path)
            V[h] = round(dur, 2)
            T[h] = word_times(words, dur)
            ok += 1
        except Exception as e:
            print("FAIL %d %r -> %s" % (i, speech[:60], e), flush=True)
        if i % 5 == 0:
            print("progress %d/%d" % (i, len(data)), flush=True)

    open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
    open(tj, "w", encoding="utf-8").write("window.VTIME=" + json.dumps(T, separators=(",", ":")) + ";")
    print("DONE ok=%d" % ok, flush=True)


if __name__ == "__main__":
    main()
