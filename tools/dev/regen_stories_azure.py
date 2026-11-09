#!/usr/bin/env python3
"""Regenerate the 3D STORY narration for a book with Azure Speech (Sonia),
matching the book's storyToks speech format so filenames/voice.js/vtime.js
stay correct. Word timings are approximated by word length (as tts_story.py did).

Env: AZURE_SPEECH_KEY, AZURE_SPEECH_REGION
Usage: python tools/dev/regen_stories_azure.py grade-1-english
"""
import os, sys, re, json, glob, time, urllib.request, urllib.error
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


def story_speech(title, text):
    title = title.strip()
    plain = re.sub(r"\s+", " ", text.replace("*", "")).strip()
    sep = " " if re.search(r"[.!?]$", title) else ". "
    return title + sep + plain


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
    bdir = os.path.join("books", book)

    pat = re.compile(r"story:\s*\{title:'((?:[^'\\]|\\.)*)',text:'((?:[^'\\]|\\.)*)'")
    stories, seen = [], set()
    for f in glob.glob(os.path.join(bdir, "lessons-*.js")):
        js = open(f, encoding="utf-8").read()
        for m in pat.finditer(js):
            title = js_unescape(m.group(1))
            text = js_unescape(m.group(2))
            speech = story_speech(title, text)
            if speech in seen:
                continue
            seen.add(speech)
            words = title.split() + re.findall(r"\S+", text.replace("*", ""))
            stories.append({"speech": speech, "words": words})

    vd = os.path.join(bdir, "voice")
    vj = os.path.join(bdir, "voice.js")
    tj = os.path.join(bdir, "vtime.js")
    V = json.loads(open(vj, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))
    T = {}
    if os.path.exists(tj):
        T = json.loads(open(tj, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";"))

    print("stories=%d" % len(stories), flush=True)

    ok = 0
    for i, st in enumerate(stories):
        h = fnv(st["speech"])
        path = os.path.join(vd, h + ".mp3")
        try:
            dur = synth_with_retry(st["speech"], path)
            V[h] = round(dur, 2)
            T[h] = word_times(st["words"], dur)
            ok += 1
        except Exception as e:
            print("FAIL %d %r -> %s" % (i, st["speech"][:60], e), flush=True)
        if i % 5 == 0:
            print("progress %d/%d" % (i, len(stories)), flush=True)

    open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
    open(tj, "w", encoding="utf-8").write("window.VTIME=" + json.dumps(T, separators=(",", ":")) + ";")
    print("DONE ok=%d" % ok, flush=True)


if __name__ == "__main__":
    main()
