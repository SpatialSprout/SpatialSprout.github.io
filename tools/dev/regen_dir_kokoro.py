#!/usr/bin/env python3
"""Voice the new narration (P.DIR_NEW) with the SAME voice as the rest of the book:
Kokoro af_heart (tts.py), story speed 0.8 and 0.4 s between sentences (what the lesson 1-6 stories use).
Each sentence is spoken on its own so the exact start of every sentence is known (vsent.js);
word timings go to vtime.js, durations to voice.js.  Needs the Kokoro model (see tts.py, /root/vendor/kok).
Usage: python tools/dev/regen_dir_kokoro.py grade-2-science"""
import os, sys, re, json, subprocess, wave
import numpy as np
os.environ.setdefault("AZURE_SPEECH_KEY", "unused")
sys.path.insert(0, os.path.dirname(__file__))
import tts
import regen_stories_azure as az
import regen_dir_azure as rd

SR = 24000
SPEED = float(os.environ.get("SPEED", ".8"))
GAP = float(os.environ.get("GAP", ".4"))


def trim(a, th=.012):
    idx = np.where(np.abs(a) > th)[0]
    if not len(idx):
        return a
    return a[max(0, idx[0] - int(.03 * SR)):min(len(a), idx[-1] + int(.06 * SR))]


def main():
    book = sys.argv[1] if len(sys.argv) > 1 else "grade-2-science"
    bdir = os.path.join("books", book)
    texts = rd.collect_texts(bdir)
    vd = os.path.join(bdir, "voice")
    vj, tj, sj = (os.path.join(bdir, n) for n in ("voice.js", "vtime.js", "vsent.js"))
    rj = lambda p: json.loads(open(p, encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";")) if os.path.exists(p) else {}
    V, T, S = rj(vj), rj(tj), rj(sj)
    for n, text in enumerate(texts):
        h = az.fnv(text)
        if os.environ.get('SKIP_DONE') and h in V and os.path.exists(os.path.join(vd, h + '.mp3')):
            continue
        sents = rd.sentences(text)
        audio = [np.zeros(int(.12 * SR), dtype=np.float32)]
        t, ends, words_t = .12, [], []
        for i, se in enumerate(sents):
            a = trim(tts.synth(se, speed=SPEED).astype(np.float32))
            dur = len(a) / SR
            ws = se.split()
            wt = [az.weight(w) for w in ws]
            tot, c = sum(wt), 0
            for w in wt:
                c += w
                words_t.append(round(t + dur * c / tot, 3))
            gap = (GAP + .25) if re.search(r'[?!]["”]?$', se) else GAP
            audio += [a, np.zeros(int(gap * SR), dtype=np.float32)]
            if i < len(sents) - 1:
                ends.append(round(t + dur, 3))
            t += dur + gap
        a = np.clip(np.concatenate(audio), -1, 1)
        w = "/tmp/%s.wav" % h
        with wave.open(w, "wb") as f:
            f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
            f.writeframes((a * 32767).astype("<i2").tobytes())
        out = os.path.join(vd, h + ".mp3")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", w, "-ac", "1", "-b:a", "48k", out]); os.remove(w)
        V[h] = round(len(a) / SR, 2); T[h] = words_t; S[h] = ends
        print("%d/%d %s %.1fs %d sentences" % (n + 1, len(texts), h, V[h], len(sents)), flush=True)
        open(vj, "w", encoding="utf-8").write("window.VOICE=" + json.dumps(V, separators=(",", ":")) + ";")
        open(tj, "w", encoding="utf-8").write("window.VTIME=" + json.dumps(T, separators=(",", ":")) + ";")
        open(sj, "w", encoding="utf-8").write("window.VSENT=" + json.dumps(S, separators=(",", ":")) + ";")
    print("done")


if __name__ == "__main__":
    main()
