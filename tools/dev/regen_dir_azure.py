#!/usr/bin/env python3
"""Voice the new, fuller narration for the directed lessons (P.DIR_NEW in story-scripts.js)
with the same Azure voice as the rest of the book.

Each sentence is spoken separately and the clips are joined, so the exact start of every
sentence is known: the book uses that (vsent.js) to pause the voice between sentences while
the 3D scene finishes its action. Word timings go to vtime.js, durations to voice.js.
Until a line has its mp3, the book keeps using the old narration for that page.

Env:   AZURE_SPEECH_KEY, AZURE_SPEECH_REGION (default eastus)
Usage: python tools/dev/regen_dir_azure.py grade-2-science
"""
import os, sys, re, json
sys.path.insert(0, os.path.dirname(__file__))
import regen_stories_azure as az
from mutagen.mp3 import MP3


def load_js_obj(path, name, sep="="):
    src = open(path, encoding="utf-8").read()
    i = src.index(name + sep)
    j = src.index("{", i)
    depth, k, q = 0, j, None
    while k < len(src):
        c = src[k]
        if q:
            if c == "\\":
                k += 2; continue
            if c == q:
                q = None
        elif c in "\"'":
            q = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        k += 1
    body = src[j:k + 1]
    body = re.sub(r"([{,]\s*)([A-Za-z_0-9]+)\s*:", r'\1"\2":', body)
    return json.loads(body)


def sentences(t):
    parts = re.findall(r'.+?[.!?]["”\']?(?=\s|$)|.+$', t.strip())
    return [p.strip() for p in parts if p.strip()]


def main():
    book = sys.argv[1] if len(sys.argv) > 1 else "grade-2-science"
    bdir = os.path.join("books", book)
    new = load_js_obj(os.path.join(bdir, "story-scripts.js"), "P.DIR_NEW")
    if os.path.exists(os.path.join(bdir, "story-scripts2.js")):
        new.update(load_js_obj(os.path.join(bdir, "story-scripts2.js"), "Object.assign(P.DIR_NEW", ","))
    lessons = "".join(open(os.path.join(bdir, f), encoding="utf-8").read()
                      for f in os.listdir(bdir) if re.match(r"lessons-[a-z]\.js$", f))
    texts = []
    for lid, d in new.items():
        if d.get("story"):
            m = re.search(r"id:'%s'.*?story:\{title:'((?:[^'\\]|\\.)*)'" % lid, lessons, re.S)
            title = az.js_unescape(m.group(1))
            texts.append(az.story_speech(title, d["story"]))
        for k, t in (d.get("steps") or {}).items():
            texts.append(t)

    vd = os.path.join(bdir, "voice")
    vj, tj, sj = (os.path.join(bdir, n) for n in ("voice.js", "vtime.js", "vsent.js"))
    rd = lambda p: json.loads(open(p, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";")) if os.path.exists(p) else {}
    V, T, S = rd(vj), rd(tj), rd(sj)

    for n, text in enumerate(texts):
        h = az.fnv(text)
        sents = sentences(text)
        clips, ends, words_t, t0 = [], [], [], 0.0
        for i, s in enumerate(sents):
            tmp = os.path.join(vd, "_tmp_%d.mp3" % i)
            dur = az.synth_with_retry(s, tmp)
            clips.append(open(tmp, "rb").read()); os.remove(tmp)
            ws = s.split()
            lead, tail = min(.15, dur * .1), min(.25, dur * .15)
            for e in az.word_times(ws, max(.2, dur - lead - tail)):
                words_t.append(round(t0 + lead + e, 3))
            t0 += dur
            if i < len(sents) - 1:
                ends.append(round(t0 - tail * .5, 3))
        out = os.path.join(vd, h + ".mp3")
        open(out, "wb").write(b"".join(clips))
        V[h] = round(MP3(out).info.length, 2)
        T[h] = words_t
        S[h] = ends
        print("%d/%d %s %.1fs %d sentences" % (n + 1, len(texts), h, V[h], len(sents)), flush=True)

    open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
    open(tj, "w", encoding="utf-8").write("window.VTIME=" + json.dumps(T, separators=(",", ":")) + ";")
    open(sj, "w", encoding="utf-8").write("window.VSENT=" + json.dumps(S, separators=(",", ":")) + ";")
    print("done: rebuild with  python tools/bookkit/build.py " + bdir)


if __name__ == "__main__":
    main()
