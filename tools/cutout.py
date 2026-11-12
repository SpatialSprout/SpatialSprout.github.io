#!/usr/bin/env python3
"""
Cut characters / props out of a Gemini picture for a pop-up diorama page.

  python tools/cutout.py picture.png --out books/grade-1-english/dio --names grandpa,girl,grandma,dog,cat
  python tools/cutout.py picture.png --out dio                       (auto-names s1, s2, ...)
  python tools/cutout.py picture.png --out dio --boxes '{"turnip":[1223,107,822,1161]}'   (x,y,w,h in picture pixels)

How it works: removes the background (rembg), splits what's left into separate figures, left to right,
saves each as a transparent .webp, writes a contact sheet (_sheet.png) so you can check them, and prints
the ready-to-paste "img" entries for a popScene spec, e.g.  grandpa:[356,477]
Figures that touch each other come out as one piece: pass --boxes for those, or draw them apart in the picture.
Setup: pip install rembg onnxruntime pillow numpy scipy
"""
import argparse, json, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi


def matte(img):
    try:
        from rembg import remove
        return np.array(remove(img.convert("RGB")))[..., 3]
    except ImportError:
        sys.exit("pip install rembg onnxruntime  (needed for background removal)")


def crop_save(img, alpha, box, path, up):
    x, y, w, h = box
    rgb = np.array(img.convert("RGB"))[y:y + h, x:x + w]
    a = alpha[y:y + h, x:x + w]
    a = ndi.gaussian_filter(((a > 128) * 255).astype(np.float32), 1.0)  # soft edge, no halo
    out = Image.fromarray(np.dstack([rgb, a.astype(np.uint8)]), "RGBA")
    if up != 1:
        out = out.resize((int(w * up), int(h * up)), Image.LANCZOS)
    out.save(path, quality=92, method=6)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("image"); ap.add_argument("--out", default="dio")
    ap.add_argument("--names", help="comma list, left to right, e.g. grandpa,girl,cat")
    ap.add_argument("--boxes", help='JSON {"name":[x,y,w,h]} to cut exact regions')
    ap.add_argument("--min", type=int, default=2500, help="ignore specks smaller than this many pixels")
    ap.add_argument("--up", type=float, default=1.0, help="upscale factor, e.g. 2")
    a = ap.parse_args()
    img = Image.open(a.image); out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    alpha = matte(img)
    items = {}
    if a.boxes:
        items = {k: v for k, v in json.loads(a.boxes).items()}
    else:
        lab, n = ndi.label(ndi.binary_closing(alpha > 128, iterations=3))
        objs = [(s, i + 1) for i, s in enumerate(ndi.find_objects(lab)) if (lab[s] == i + 1).sum() >= a.min]
        objs.sort(key=lambda t: t[0][1].start)
        names = a.names.split(",") if a.names else [f"s{i + 1}" for i in range(len(objs))]
        if a.names and len(names) != len(objs):
            print(f"warning: found {len(objs)} figures but {len(names)} names; see _sheet.png", file=sys.stderr)
        for nm, (s, k) in zip(names, objs):
            m = ndi.binary_fill_holes(lab == k)
            alpha = np.where(m, alpha, np.where(lab == 0, alpha, 0)) if False else alpha
            items[nm] = [s[1].start, s[0].start, s[1].stop - s[1].start, s[0].stop - s[0].start]
    tiles, spec = [], {}
    for nm, b in items.items():
        t = crop_save(img, alpha, b, out / f"{nm}.webp", a.up)
        tiles.append(t); spec[nm] = [b[2], b[3]]
    H = max(t.height for t in tiles); W = sum(t.width + 12 for t in tiles)
    sheet = Image.new("RGB", (W, H), (90, 140, 200)); x = 0
    for t in tiles:
        sheet.paste(t, (x, H - t.height), t); x += t.width + 12
    sheet.thumbnail((2000, 2000)); sheet.save(out / "_sheet.png")
    print("img entries for your spec (width, height of each cut-out; keep the same --up for every picture of one story):")
    for k, v in spec.items():
        print(f"  {k}:[{round(v[0] * a.up)},{round(v[1] * a.up)}]")


main()
