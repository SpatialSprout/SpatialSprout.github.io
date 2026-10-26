# SpatialSprout 3D website

Static website for SpatialSprout 3D interactive books. No build step: every file is served as is.

## Folders
- `index.html` – the home page
- `assets/` – styles, scripts, logos, and `catalog.js` (the list of books)
- `books/<slug>/` – one folder per book (Grade 3 Math lives in `books/grade-3-math/`)
- `tools/add_book.py` – copies a finished book into `books/` and adds its page head

## Add or update a book
1. `python3 tools/add_book.py <book-folder> <slug>`
2. In `assets/catalog.js`, set that book's `status` to `"live"` and fill in its details.
