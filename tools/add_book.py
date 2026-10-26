"""Copy a finished book into the website and give it a standalone page head.

Usage: python3 tools/add_book.py <book-source-folder> <slug>
Example: python3 tools/add_book.py ../book grade-3-math

The book's index.html is written without <!doctype>/<head> (the preview host adds them),
so this script adds the same small head when the book goes on the website.
"""
import os, shutil, sys
HEAD = ('<!doctype html>\n<html lang="en-CA">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<link rel="icon" type="image/png" sizes="32x32" href="../../assets/img/favicon-32.png">\n'
        '<link rel="apple-touch-icon" href="../../assets/img/icon-180.png">\n'
        '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
        'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>\n</head>\n<body>\n')
src, slug = sys.argv[1], sys.argv[2]
dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'books', slug)
if os.path.isdir(dst): shutil.rmtree(dst)
shutil.copytree(src, dst, ignore=shutil.ignore_patterns('.*'))
p = os.path.join(dst, 'index.html')
html = open(p, encoding='utf-8').read()
if not html.lstrip().lower().startswith('<!doctype'):
    html = HEAD + html + '\n</body>\n</html>\n'
open(p, 'w', encoding='utf-8').write(html)
print('Added', slug, '->', os.path.normpath(dst))
