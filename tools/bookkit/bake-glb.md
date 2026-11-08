# Baked 3D models (JK book)

The JK toy models are smoothed (Loop subdivision), recoloured from their texture and prepared for taps.
Doing that on a phone at every page turn froze iPhones, so it is done once, ahead of time:

1. Serve the site on port 8884 and run `python3 tools/bookkit/bake-glb.py` (writes smoothed GLBs to the scratch `baked/` folder).
2. Compress each with gltfpack from meshoptimizer: `gltfpack -i baked/X.glb -o baked2/X.glb -cc -vp 16 -vc 10`.
3. Copy them to `books/kindergarten-jk/models-baked/` (file names as in `BOOK.glb`), keep `glbBaked:true` in book.js.

If a baked file is missing, kj-glb.js falls back to smoothing the original model on the device.
