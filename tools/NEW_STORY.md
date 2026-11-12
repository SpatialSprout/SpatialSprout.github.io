# Adding a pop-up diorama page (Grade 1 English)

1. **Pictures.** In Gemini, make 1-3 pictures of the story in the same style as page 72
   (soft 3D clay look, plain background, characters side by side with a little space between them,
   one picture per pose set: pulling, laughing, etc.).
2. **Cut-outs.** `python tools/cutout.py picture.png --out books/grade-1-english/dio --names a,b,c --up 2`
   Check `dio/_sheet.png`. Touching figures: re-run with `--boxes '{"name":[x,y,w,h]}'`.
   It prints the `img` entries (`name:[w,h]`) to paste into the spec.
3. **Spec.** In `books/grade-1-english/dioramas.js` copy the `story('e18', ...)` block, change the id, the images,
   the positions (x: -2..2, z: about -2.5) and the cues (story words -> actions).
   Actions: `wobble`, `grow`, `pull:id`, `pullAll`, `say:id:text:ms`, `pop`, `cheer`.
4. Bump the `dioramas.js?v=` number in `index.html`, test, push.
