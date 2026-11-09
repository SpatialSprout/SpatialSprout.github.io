import re, json, os, glob

def fnv(t):
    h = 0x811c9dc5
    b = t.encode("utf-16-le")
    for i in range(0, len(b), 2):
        u = int.from_bytes(b[i:i+2], "little")
        h ^= u
        h = (h * 0x01000193) & 0xffffffff
    return "%08x" % h

def js_unescape(s):
    return s.replace("\\'", "'").replace('\\"', '"').replace("\\\\", "\\")

bdir = "books/grade-1-english"
hashes = set(json.loads(open(os.path.join(bdir, "voice.js"), encoding="utf-8").read().split("=", 1)[1].rstrip().rstrip(";")).keys())
print("voice.js entries:", len(hashes))

sq = r"'((?:[^'\\]|\\.)*)'"

speech = []
for f in glob.glob(os.path.join(bdir, "*.js")):
    if os.path.basename(f) in ("voice.js", "vtime.js"):
        continue
    js = open(f, encoding="utf-8").read()
    speech += [js_unescape(m.group(1)) for m in re.finditer(r"\bspeech:" + sq, js)]
speech = list(dict.fromkeys(s for s in speech if s))
hit = sum(1 for s in speech if fnv(s) in hashes)
print("speech(all js) total=%d in_voice=%d orphan=%d" % (len(speech), hit, len(speech) - hit))

L = json.load(open("tools/bookkit/lines.json", encoding="utf-8"))
ls = []
for v in L.values():
    if isinstance(v, list):
        for x in v:
            if isinstance(x, str):
                ls.append(x)
    elif isinstance(v, str):
        ls.append(v)
for n in [r[1] for r in L["ranksKid"] + L["ranksOld"]]:
    ls.append(L["rankUp"] + " " + ("an" if n[0] in "AEIOU" else "a") + " " + n + "!")
ls = list(dict.fromkeys(ls))
hit = sum(1 for s in ls if fnv(s) in hashes)
print("lines.json total=%d in_voice=%d orphan=%d" % (len(ls), hit, len(ls) - hit))

for s in ["Tap the cover to open the book.", "Amazing! You finished all five questions!"]:
    print("fixed %r in_voice=%s" % (s, fnv(s) in hashes))
